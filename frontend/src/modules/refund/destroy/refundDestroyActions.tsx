import listActions from 'src/modules/refund/list/refundListActions';
import RefundService from 'src/modules/refund/refundService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'REFUND_DESTROY';

const refundDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: refundDestroyActions.DESTROY_STARTED,
      });

      await RefundService.destroyAll([id]);

      dispatch({
        type: refundDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.refund.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/refund');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: refundDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: refundDestroyActions.DESTROY_ALL_STARTED,
      });

      await RefundService.destroyAll(ids);

      dispatch({
        type: refundDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.refund.destroyAll.success'),
      );

      getHistory().push('/refund');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: refundDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default refundDestroyActions;
