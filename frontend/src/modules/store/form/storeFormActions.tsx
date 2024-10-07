import StoreService from 'src/modules/store/storeService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'STORE_FORM';

const storeFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: storeFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await StoreService.find(id);
      }

      dispatch({
        type: storeFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeFormActions.INIT_ERROR,
      });

      getHistory().push('/store');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: storeFormActions.CREATE_STARTED,
      });

      await StoreService.create(values);

      dispatch({
        type: storeFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.store.create.success'),
      );

      getHistory().push('/store');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: storeFormActions.UPDATE_STARTED,
      });

      await StoreService.update(id, values);

      dispatch({
        type: storeFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.store.update.success'),
      );

      getHistory().push('/store');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default storeFormActions;
