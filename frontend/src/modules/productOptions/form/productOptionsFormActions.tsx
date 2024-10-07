import ProductOptionsService from 'src/modules/productOptions/productOptionsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PRODUCTOPTIONS_FORM';

const productOptionsFormActions = {
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
        type: productOptionsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProductOptionsService.find(id);
      }

      dispatch({
        type: productOptionsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productOptionsFormActions.INIT_ERROR,
      });

      getHistory().push('/product-options');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: productOptionsFormActions.CREATE_STARTED,
      });

      await ProductOptionsService.create(values);

      dispatch({
        type: productOptionsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.productOptions.create.success'),
      );

      getHistory().push('/product-options');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productOptionsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: productOptionsFormActions.UPDATE_STARTED,
      });

      await ProductOptionsService.update(id, values);

      dispatch({
        type: productOptionsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.productOptions.update.success'),
      );

      getHistory().push('/product-options');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productOptionsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default productOptionsFormActions;
