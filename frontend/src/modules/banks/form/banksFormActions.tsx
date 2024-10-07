import BanksService from 'src/modules/banks/banksService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'BANKS_FORM';

const banksFormActions = {
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
        type: banksFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await BanksService.find(id);
      }

      dispatch({
        type: banksFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: banksFormActions.INIT_ERROR,
      });

      getHistory().push('/banks');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: banksFormActions.CREATE_STARTED,
      });

      await BanksService.create(values);

      dispatch({
        type: banksFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.banks.create.success'),
      );

      getHistory().push('/banks');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: banksFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: banksFormActions.UPDATE_STARTED,
      });

      await BanksService.update(id, values);

      dispatch({
        type: banksFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.banks.update.success'),
      );

      getHistory().push('/banks');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: banksFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default banksFormActions;
