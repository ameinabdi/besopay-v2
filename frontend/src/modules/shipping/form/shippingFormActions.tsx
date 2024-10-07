import ShippingService from 'src/modules/shipping/shippingService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'SHIPPING_FORM';

const shippingFormActions = {
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
        type: shippingFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ShippingService.find(id);
      }

      dispatch({
        type: shippingFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shippingFormActions.INIT_ERROR,
      });

      getHistory().push('/shipping');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: shippingFormActions.CREATE_STARTED,
      });

      await ShippingService.create(values);

      dispatch({
        type: shippingFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.shipping.create.success'),
      );

      getHistory().push('/shipping');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shippingFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: shippingFormActions.UPDATE_STARTED,
      });

      await ShippingService.update(id, values);

      dispatch({
        type: shippingFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.shipping.update.success'),
      );

      getHistory().push('/shipping');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shippingFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default shippingFormActions;
