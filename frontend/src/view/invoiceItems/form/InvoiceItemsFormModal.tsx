import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import InvoiceItemsForm from 'src/view/invoiceItems/form/InvoiceItemsForm';
import InvoiceItemsService from 'src/modules/invoiceItems/invoiceItemsService';
import Errors from 'src/modules/shared/error/errors';

const InvoiceItemsFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await InvoiceItemsService.create(data);
      const record = await InvoiceItemsService.find(id);
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
      title={i18n('entities.invoiceItems.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <InvoiceItemsForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default InvoiceItemsFormModal;
