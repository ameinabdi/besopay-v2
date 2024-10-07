import listActions from 'src/modules/store/list/storeListActions';
import StoreService from 'src/modules/store/storeService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'STORE_DESTROY';

const storeDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: storeDestroyActions.DESTROY_STARTED,
      });

      await StoreService.destroyAll([id]);

      dispatch({
        type: storeDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.store.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/store');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: storeDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: storeDestroyActions.DESTROY_ALL_STARTED,
      });

      await StoreService.destroyAll(ids);

      dispatch({
        type: storeDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.store.destroyAll.success'),
      );

      getHistory().push('/store');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: storeDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default storeDestroyActions;
