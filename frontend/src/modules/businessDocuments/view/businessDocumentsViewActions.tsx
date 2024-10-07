import BusinessDocumentsService from 'src/modules/businessDocuments/businessDocumentsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BUSINESSDOCUMENTS_VIEW';

const businessDocumentsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: businessDocumentsViewActions.FIND_STARTED,
      });

      const record = await BusinessDocumentsService.find(id);

      dispatch({
        type: businessDocumentsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: businessDocumentsViewActions.FIND_ERROR,
      });

      getHistory().push('/business-documents');
    }
  },
};

export default businessDocumentsViewActions;
