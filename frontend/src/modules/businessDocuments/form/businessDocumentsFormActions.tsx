import BusinessDocumentsService from 'src/modules/businessDocuments/businessDocumentsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'BUSINESSDOCUMENTS_FORM';

const businessDocumentsFormActions = {
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
        type: businessDocumentsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await BusinessDocumentsService.find(id);
      }

      dispatch({
        type: businessDocumentsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: businessDocumentsFormActions.INIT_ERROR,
      });

      getHistory().push('/business-documents');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: businessDocumentsFormActions.CREATE_STARTED,
      });

      await BusinessDocumentsService.create(values);

      dispatch({
        type: businessDocumentsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.businessDocuments.create.success'),
      );

      getHistory().push('/business-documents');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: businessDocumentsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: businessDocumentsFormActions.UPDATE_STARTED,
      });

      await BusinessDocumentsService.update(id, values);

      dispatch({
        type: businessDocumentsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.businessDocuments.update.success'),
      );

      getHistory().push('/business-documents');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: businessDocumentsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default businessDocumentsFormActions;
