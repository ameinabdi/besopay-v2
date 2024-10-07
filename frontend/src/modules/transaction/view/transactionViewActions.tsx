import TransactionService from 'src/modules/transaction/transactionService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TRANSACTION_VIEW';

const transactionViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: transactionViewActions.FIND_STARTED,
      });

      const record = await TransactionService.find(id);

      dispatch({
        type: transactionViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: transactionViewActions.FIND_ERROR,
      });

      getHistory().push('/transaction');
    }
  },
};

export default transactionViewActions;
