import listActions from 'src/modules/invoice/list/invoiceListActions';
import InvoiceService from 'src/modules/invoice/invoiceService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'INVOICE_DESTROY';

const invoiceDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: invoiceDestroyActions.DESTROY_STARTED,
      });

      await InvoiceService.destroyAll([id]);

      dispatch({
        type: invoiceDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.invoice.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/invoice');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: invoiceDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: invoiceDestroyActions.DESTROY_ALL_STARTED,
      });

      await InvoiceService.destroyAll(ids);

      dispatch({
        type: invoiceDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.invoice.destroyAll.success'),
      );

      getHistory().push('/invoice');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: invoiceDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default invoiceDestroyActions;
