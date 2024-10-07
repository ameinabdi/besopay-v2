import listActions from 'src/modules/businessAccounts/list/businessAccountsListActions';
import BusinessAccountsService from 'src/modules/businessAccounts/businessAccountsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BUSINESSACCOUNTS_DESTROY';

const businessAccountsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: businessAccountsDestroyActions.DESTROY_STARTED,
      });

      await BusinessAccountsService.destroyAll([id]);

      dispatch({
        type: businessAccountsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.businessAccounts.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/business-accounts');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: businessAccountsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: businessAccountsDestroyActions.DESTROY_ALL_STARTED,
      });

      await BusinessAccountsService.destroyAll(ids);

      dispatch({
        type: businessAccountsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.businessAccounts.destroyAll.success'),
      );

      getHistory().push('/business-accounts');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: businessAccountsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default businessAccountsDestroyActions;
