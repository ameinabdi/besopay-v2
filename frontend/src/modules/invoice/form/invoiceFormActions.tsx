import InvoiceService from 'src/modules/invoice/invoiceService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'INVOICE_FORM';

const invoiceFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: invoiceFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await InvoiceService.find(id);
      }

      dispatch({
        type: invoiceFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceFormActions.INIT_ERROR,
      });

      getHistory().push('/invoice');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: invoiceFormActions.CREATE_STARTED,
      });

      await InvoiceService.create(values);

      dispatch({
        type: invoiceFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.invoice.create.success'),
      );

      getHistory().push('/invoice');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: invoiceFormActions.UPDATE_STARTED,
      });

      await InvoiceService.update(id, values);

      dispatch({
        type: invoiceFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.invoice.update.success'),
      );

      getHistory().push('/invoice');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default invoiceFormActions;
