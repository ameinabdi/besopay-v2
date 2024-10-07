import LocationsService from 'src/modules/locations/locationsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'LOCATIONS_FORM';

const locationsFormActions = {
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
        type: locationsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await LocationsService.find(id);
      }

      dispatch({
        type: locationsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: locationsFormActions.INIT_ERROR,
      });

      getHistory().push('/locations');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: locationsFormActions.CREATE_STARTED,
      });

      await LocationsService.create(values);

      dispatch({
        type: locationsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.locations.create.success'),
      );

      getHistory().push('/locations');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: locationsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: locationsFormActions.UPDATE_STARTED,
      });

      await LocationsService.update(id, values);

      dispatch({
        type: locationsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.locations.update.success'),
      );

      getHistory().push('/locations');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: locationsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default locationsFormActions;
