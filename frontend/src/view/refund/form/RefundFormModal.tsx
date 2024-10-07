import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import RefundForm from 'src/view/refund/form/RefundForm';
import RefundService from 'src/modules/refund/refundService';
import Errors from 'src/modules/shared/error/errors';

const RefundFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await RefundService.create(data);
      const record = await RefundService.find(id);
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
      title={i18n('entities.refund.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <RefundForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default RefundFormModal;
