import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import BusinessDocumentsForm from 'src/view/businessDocuments/form/BusinessDocumentsForm';
import BusinessDocumentsService from 'src/modules/businessDocuments/businessDocumentsService';
import Errors from 'src/modules/shared/error/errors';

const BusinessDocumentsFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await BusinessDocumentsService.create(data);
      const record = await BusinessDocumentsService.find(id);
      props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      style={{ top: 24 }}
      title={i18n('entities.businessDocuments.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <BusinessDocumentsForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default BusinessDocumentsFormModal;
