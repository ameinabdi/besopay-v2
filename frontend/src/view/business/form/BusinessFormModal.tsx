import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import BusinessForm from 'src/view/business/form/BusinessForm';
import BusinessService from 'src/modules/business/businessService';
import Errors from 'src/modules/shared/error/errors';

const BusinessFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await BusinessService.create(data);
      const record = await BusinessService.find(id);
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
      title={i18n('entities.business.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <BusinessForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default BusinessFormModal;
