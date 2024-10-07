import listActions from 'src/modules/permission/list/permissionListActions';
import PermissionService from 'src/modules/permission/permissionService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PERMISSION_DESTROY';

const permissionDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: permissionDestroyActions.DESTROY_STARTED,
      });

      await PermissionService.destroyAll([id]);

      dispatch({
        type: permissionDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.permission.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/permission');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: permissionDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: permissionDestroyActions.DESTROY_ALL_STARTED,
      });

      await PermissionService.destroyAll(ids);

      dispatch({
        type: permissionDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.permission.destroyAll.success'),
      );

      getHistory().push('/permission');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: permissionDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default permissionDestroyActions;
