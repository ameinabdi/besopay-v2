import PermissionService from 'src/modules/permission/permissionService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PERMISSION_VIEW';

const permissionViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: permissionViewActions.FIND_STARTED,
      });

      const record = await PermissionService.find(id);

      dispatch({
        type: permissionViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: permissionViewActions.FIND_ERROR,
      });

      getHistory().push('/permission');
    }
  },
};

export default permissionViewActions;
