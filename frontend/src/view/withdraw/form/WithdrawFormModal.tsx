import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import WithdrawForm from 'src/view/withdraw/form/WithdrawForm';
import WithdrawService from 'src/modules/withdraw/withdrawService';
import Errors from 'src/modules/shared/error/errors';

const WithdrawFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await WithdrawService.create(data);
      const record = await WithdrawService.find(id);
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
      title={i18n('entities.withdraw.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <WithdrawForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default WithdrawFormModal;
