import listActions from 'src/modules/business/list/businessListActions';
import BusinessService from 'src/modules/business/businessService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BUSINESS_DESTROY';

const businessDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: businessDestroyActions.DESTROY_STARTED,
      });

      await BusinessService.destroyAll([id]);

      dispatch({
        type: businessDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.business.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/business');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: businessDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: businessDestroyActions.DESTROY_ALL_STARTED,
      });

      await BusinessService.destroyAll(ids);

      dispatch({
        type: businessDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.business.destroyAll.success'),
      );

      getHistory().push('/business');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: businessDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default businessDestroyActions;
