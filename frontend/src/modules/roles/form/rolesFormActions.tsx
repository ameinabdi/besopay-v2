import RolesService from 'src/modules/roles/rolesService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';

const prefix = 'ROLES_FORM';

const rolesFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: rolesFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await RolesService.find(id);
      }

      dispatch({
        type: rolesFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: rolesFormActions.INIT_ERROR,
      });

      getHistory().push('/roles');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: rolesFormActions.CREATE_STARTED,
      });

      await RolesService.create(values);

      dispatch({
        type: rolesFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.roles.create.success'),
      );

      getHistory().push('/roles');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: rolesFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: rolesFormActions.UPDATE_STARTED,
      });

      await RolesService.update(id, values);

      dispatch({
        type: rolesFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.roles.update.success'),
      );

      getHistory().push('/roles');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: rolesFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default rolesFormActions;
