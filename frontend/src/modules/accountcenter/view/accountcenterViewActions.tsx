import AccountcenterService from 'src/modules/accountcenter/accountcenterService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'ACCOUNTCENTER_VIEW';

const accountcenterViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: accountcenterViewActions.FIND_STARTED,
      });

      const record = await AccountcenterService.find(id);

      dispatch({
        type: accountcenterViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: accountcenterViewActions.FIND_ERROR,
      });

      getHistory().push('/accountcenter');
    }
  },
};

export default accountcenterViewActions;
