import listActions from 'src/modules/accountcenter/list/accountcenterListActions';
import AccountcenterService from 'src/modules/accountcenter/accountcenterService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'ACCOUNTCENTER_DESTROY';

const accountcenterDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: accountcenterDestroyActions.DESTROY_STARTED,
      });

      await AccountcenterService.destroyAll([id]);

      dispatch({
        type: accountcenterDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.accountcenter.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/accountcenter');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: accountcenterDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: accountcenterDestroyActions.DESTROY_ALL_STARTED,
      });

      await AccountcenterService.destroyAll(ids);

      dispatch({
        type: accountcenterDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.accountcenter.destroyAll.success'),
      );

      getHistory().push('/accountcenter');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: accountcenterDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default accountcenterDestroyActions;
