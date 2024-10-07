import CountryService from 'src/modules/country/countryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'COUNTRY_VIEW';

const countryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: countryViewActions.FIND_STARTED,
      });

      const record = await CountryService.find(id);

      dispatch({
        type: countryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: countryViewActions.FIND_ERROR,
      });

      getHistory().push('/country');
    }
  },
};

export default countryViewActions;
