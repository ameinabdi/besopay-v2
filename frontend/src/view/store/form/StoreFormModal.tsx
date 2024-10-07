import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import StoreForm from 'src/view/store/form/StoreForm';
import StoreService from 'src/modules/store/storeService';
import Errors from 'src/modules/shared/error/errors';

const StoreFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await StoreService.create(data);
      const record = await StoreService.find(id);
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
      title={i18n('entities.store.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <StoreForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default StoreFormModal;
