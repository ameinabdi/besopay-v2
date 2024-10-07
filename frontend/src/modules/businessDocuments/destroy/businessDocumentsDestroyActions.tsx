import listActions from 'src/modules/businessDocuments/list/businessDocumentsListActions';
import BusinessDocumentsService from 'src/modules/businessDocuments/businessDocumentsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BUSINESSDOCUMENTS_DESTROY';

const businessDocumentsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: businessDocumentsDestroyActions.DESTROY_STARTED,
      });

      await BusinessDocumentsService.destroyAll([id]);

      dispatch({
        type: businessDocumentsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.businessDocuments.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/business-documents');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: businessDocumentsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: businessDocumentsDestroyActions.DESTROY_ALL_STARTED,
      });

      await BusinessDocumentsService.destroyAll(ids);

      dispatch({
        type: businessDocumentsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.businessDocuments.destroyAll.success'),
      );

      getHistory().push('/business-documents');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: businessDocumentsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default businessDocumentsDestroyActions;
