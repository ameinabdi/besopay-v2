import ShippingService from 'src/modules/shipping/shippingService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'SHIPPING_VIEW';

const shippingViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: shippingViewActions.FIND_STARTED,
      });

      const record = await ShippingService.find(id);

      dispatch({
        type: shippingViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shippingViewActions.FIND_ERROR,
      });

      getHistory().push('/shipping');
    }
  },
};

export default shippingViewActions;
