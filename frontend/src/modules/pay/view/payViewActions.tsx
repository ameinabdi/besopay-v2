import PayService from 'src/modules/pay/payService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PAY_VIEW';

const payViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,


  FIND_CHECKOUT_STARTED: `${prefix}_FIND_CHECKOUT_STARTED`,
  FIND_CHECKOUT_SUCCESS: `${prefix}_FIND_CHECKOUT_SUCCESS`,
  FIND_CHECKOUT_ERROR: `${prefix}_FIND_CHECKOUT_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: payViewActions.FIND_STARTED,
      });

      const record = await PayService.find(id);

      dispatch({
        type: payViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: payViewActions.FIND_ERROR,
      });

      getHistory().push('/pay');
    }
  },

  doFindCheckout: (token) => async (dispatch) => {
    try {
      dispatch({
        type: payViewActions.FIND_CHECKOUT_STARTED,
      });

      const record = await PayService.findcheckout(token);

      dispatch({
        type: payViewActions.FIND_CHECKOUT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: payViewActions.FIND_CHECKOUT_ERROR,
      });

      getHistory().back();
    }
  },
};

export default payViewActions;
