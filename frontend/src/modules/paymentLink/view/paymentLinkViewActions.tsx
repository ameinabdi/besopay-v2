import PaymentLinkService from 'src/modules/paymentLink/paymentLinkService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PAYMENTLINK_VIEW';

const paymentLinkViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentLinkViewActions.FIND_STARTED,
      });

      const record = await PaymentLinkService.find(id);

      dispatch({
        type: paymentLinkViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentLinkViewActions.FIND_ERROR,
      });

      getHistory().push('/payment-link');
    }
  },
};

export default paymentLinkViewActions;
