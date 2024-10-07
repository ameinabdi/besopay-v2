import InvoiceItemsService from 'src/modules/invoiceItems/invoiceItemsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'INVOICEITEMS_VIEW';

const invoiceItemsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: invoiceItemsViewActions.FIND_STARTED,
      });

      const record = await InvoiceItemsService.find(id);

      dispatch({
        type: invoiceItemsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceItemsViewActions.FIND_ERROR,
      });

      getHistory().push('/invoice-items');
    }
  },
};

export default invoiceItemsViewActions;
