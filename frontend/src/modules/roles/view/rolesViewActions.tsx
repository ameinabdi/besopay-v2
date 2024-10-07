import RolesService from 'src/modules/roles/rolesService';
import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'ROLES_VIEW';

const rolesViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: rolesViewActions.FIND_STARTED,
      });

      const record = await RolesService.find(id);

      dispatch({
        type: rolesViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: rolesViewActions.FIND_ERROR,
      });
      getHistory().push('/roles');
    }
  },
};

export default rolesViewActions;
