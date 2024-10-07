import PaymentService from 'src/modules/payment/paymentService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PAYMENT_FORM';

const paymentFormActions = {
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
        type: paymentFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PaymentService.find(id);
      }

      dispatch({
        type: paymentFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentFormActions.INIT_ERROR,
      });

      getHistory().push('/payment');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: paymentFormActions.CREATE_STARTED,
      });

      await PaymentService.create(values);

      dispatch({
        type: paymentFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.payment.create.success'),
      );

      getHistory().push('/payment');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: paymentFormActions.UPDATE_STARTED,
      });

      await PaymentService.update(id, values);

      dispatch({
        type: paymentFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.payment.update.success'),
      );

      getHistory().push('/payment');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default paymentFormActions;
