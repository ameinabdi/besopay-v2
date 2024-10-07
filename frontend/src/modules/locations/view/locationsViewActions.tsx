import LocationsService from 'src/modules/locations/locationsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'LOCATIONS_VIEW';

const locationsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: locationsViewActions.FIND_STARTED,
      });

      const record = await LocationsService.find(id);

      dispatch({
        type: locationsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: locationsViewActions.FIND_ERROR,
      });

      getHistory().push('/locations');
    }
  },
};

export default locationsViewActions;
