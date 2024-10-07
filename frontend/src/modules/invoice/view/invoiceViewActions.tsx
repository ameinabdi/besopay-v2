import InvoiceService from 'src/modules/invoice/invoiceService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'INVOICE_VIEW';

const invoiceViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: invoiceViewActions.FIND_STARTED,
      });

      const record = await InvoiceService.find(id);

      dispatch({
        type: invoiceViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: invoiceViewActions.FIND_ERROR,
      });

      getHistory().push('/invoice');
    }
  },
};

export default invoiceViewActions;
