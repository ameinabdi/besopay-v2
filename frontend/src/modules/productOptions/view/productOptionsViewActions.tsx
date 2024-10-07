import ProductOptionsService from 'src/modules/productOptions/productOptionsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PRODUCTOPTIONS_VIEW';

const productOptionsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: productOptionsViewActions.FIND_STARTED,
      });

      const record = await ProductOptionsService.find(id);

      dispatch({
        type: productOptionsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productOptionsViewActions.FIND_ERROR,
      });

      getHistory().push('/product-options');
    }
  },
};

export default productOptionsViewActions;
