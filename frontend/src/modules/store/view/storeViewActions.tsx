import StoreService from 'src/modules/store/storeService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'STORE_VIEW';

const storeViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: storeViewActions.FIND_STARTED,
      });

      const record = await StoreService.find(id);

      dispatch({
        type: storeViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeViewActions.FIND_ERROR,
      });

      getHistory().push('/store');
    }
  },
};

export default storeViewActions;
