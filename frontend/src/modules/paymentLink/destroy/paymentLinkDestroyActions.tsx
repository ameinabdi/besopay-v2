import listActions from 'src/modules/paymentLink/list/paymentLinkListActions';
import PaymentLinkService from 'src/modules/paymentLink/paymentLinkService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PAYMENTLINK_DESTROY';

const paymentLinkDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentLinkDestroyActions.DESTROY_STARTED,
      });

      await PaymentLinkService.destroyAll([id]);

      dispatch({
        type: paymentLinkDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.paymentLink.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/payment-link');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentLinkDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: paymentLinkDestroyActions.DESTROY_ALL_STARTED,
      });

      await PaymentLinkService.destroyAll(ids);

      dispatch({
        type: paymentLinkDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.paymentLink.destroyAll.success'),
      );

      getHistory().push('/payment-link');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentLinkDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default paymentLinkDestroyActions;
