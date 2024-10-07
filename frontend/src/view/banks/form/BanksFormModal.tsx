import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import BanksForm from 'src/view/banks/form/BanksForm';
import BanksService from 'src/modules/banks/banksService';
import Errors from 'src/modules/shared/error/errors';

const BanksFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await BanksService.create(data);
      const record = await BanksService.find(id);
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
      title={i18n('entities.banks.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <BanksForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default BanksFormModal;
