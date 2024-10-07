import BanksService from 'src/modules/banks/banksService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BANKS_VIEW';

const banksViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: banksViewActions.FIND_STARTED,
      });

      const record = await BanksService.find(id);

      dispatch({
        type: banksViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: banksViewActions.FIND_ERROR,
      });

      getHistory().push('/banks');
    }
  },
};

export default banksViewActions;
