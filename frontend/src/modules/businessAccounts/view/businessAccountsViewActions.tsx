import BusinessAccountsService from 'src/modules/businessAccounts/businessAccountsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BUSINESSACCOUNTS_VIEW';

const businessAccountsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: businessAccountsViewActions.FIND_STARTED,
      });

      const record = await BusinessAccountsService.find(id);

      dispatch({
        type: businessAccountsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: businessAccountsViewActions.FIND_ERROR,
      });

      getHistory().push('/business-accounts');
    }
  },
};

export default businessAccountsViewActions;
