import CountryService from 'src/modules/country/countryService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'COUNTRY_FORM';

const countryFormActions = {
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
        type: countryFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await CountryService.find(id);
      }

      dispatch({
        type: countryFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: countryFormActions.INIT_ERROR,
      });

      getHistory().push('/country');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: countryFormActions.CREATE_STARTED,
      });

      await CountryService.create(values);

      dispatch({
        type: countryFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.country.create.success'),
      );

      getHistory().push('/country');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: countryFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: countryFormActions.UPDATE_STARTED,
      });

      await CountryService.update(id, values);

      dispatch({
        type: countryFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.country.update.success'),
      );

      getHistory().push('/country');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: countryFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default countryFormActions;
