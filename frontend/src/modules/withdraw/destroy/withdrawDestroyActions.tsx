import listActions from 'src/modules/withdraw/list/withdrawListActions';
import WithdrawService from 'src/modules/withdraw/withdrawService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'WITHDRAW_DESTROY';

const withdrawDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: withdrawDestroyActions.DESTROY_STARTED,
      });

      await WithdrawService.destroyAll([id]);

      dispatch({
        type: withdrawDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.withdraw.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/withdraw');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: withdrawDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: withdrawDestroyActions.DESTROY_ALL_STARTED,
      });

      await WithdrawService.destroyAll(ids);

      dispatch({
        type: withdrawDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.withdraw.destroyAll.success'),
      );

      getHistory().push('/withdraw');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: withdrawDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default withdrawDestroyActions;
