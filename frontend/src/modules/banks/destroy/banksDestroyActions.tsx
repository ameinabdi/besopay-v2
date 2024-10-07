import listActions from 'src/modules/banks/list/banksListActions';
import BanksService from 'src/modules/banks/banksService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BANKS_DESTROY';

const banksDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: banksDestroyActions.DESTROY_STARTED,
      });

      await BanksService.destroyAll([id]);

      dispatch({
        type: banksDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.banks.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/banks');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: banksDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: banksDestroyActions.DESTROY_ALL_STARTED,
      });

      await BanksService.destroyAll(ids);

      dispatch({
        type: banksDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.banks.destroyAll.success'),
      );

      getHistory().push('/banks');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: banksDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default banksDestroyActions;
