import InvoiceItemsService from 'src/modules/invoiceItems/invoiceItemsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'INVOICEITEMS_FORM';

const invoiceItemsFormActions = {
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
        type: invoiceItemsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await InvoiceItemsService.find(id);
      }

      dispatch({
        type: invoiceItemsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceItemsFormActions.INIT_ERROR,
      });

      getHistory().push('/invoice-items');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: invoiceItemsFormActions.CREATE_STARTED,
      });

      await InvoiceItemsService.create(values);

      dispatch({
        type: invoiceItemsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.invoiceItems.create.success'),
      );

      getHistory().push('/invoice-items');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceItemsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: invoiceItemsFormActions.UPDATE_STARTED,
      });

      await InvoiceItemsService.update(id, values);

      dispatch({
        type: invoiceItemsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.invoiceItems.update.success'),
      );

      getHistory().push('/invoice-items');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceItemsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default invoiceItemsFormActions;
