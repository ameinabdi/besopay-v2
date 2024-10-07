import listActions from 'src/modules/shipping/list/shippingListActions';
import ShippingService from 'src/modules/shipping/shippingService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'SHIPPING_DESTROY';

const shippingDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: shippingDestroyActions.DESTROY_STARTED,
      });

      await ShippingService.destroyAll([id]);

      dispatch({
        type: shippingDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.shipping.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/shipping');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: shippingDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: shippingDestroyActions.DESTROY_ALL_STARTED,
      });

      await ShippingService.destroyAll(ids);

      dispatch({
        type: shippingDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.shipping.destroyAll.success'),
      );

      getHistory().push('/shipping');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: shippingDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default shippingDestroyActions;
