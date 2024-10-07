import CurrencyService from 'src/modules/currency/currencyService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CURRENCY_VIEW';

const currencyViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: currencyViewActions.FIND_STARTED,
      });

      const record = await CurrencyService.find(id);

      dispatch({
        type: currencyViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: currencyViewActions.FIND_ERROR,
      });

      getHistory().push('/currency');
    }
  },
};

export default currencyViewActions;
