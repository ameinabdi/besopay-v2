import RefundService from 'src/modules/refund/refundService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'REFUND_VIEW';

const refundViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: refundViewActions.FIND_STARTED,
      });

      const record = await RefundService.find(id);

      dispatch({
        type: refundViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: refundViewActions.FIND_ERROR,
      });

      getHistory().push('/refund');
    }
  },
};

export default refundViewActions;
