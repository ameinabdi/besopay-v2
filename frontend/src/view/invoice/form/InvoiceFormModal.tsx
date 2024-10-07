import React, { useState } from 'react';
import { Drawer } from 'antd';
import { i18n } from 'src/i18n';
import InvoiceForm from 'src/view/invoice/form/InvoiceForm';
import InvoiceService from 'src/modules/invoice/invoiceService';
import Errors from 'src/modules/shared/error/errors';

const InvoiceFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await InvoiceService.create(data);
      const record = await InvoiceService.find(id);
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
    <Drawer
      style={{ top: 24 }}
      title={i18n('entities.invoice.new.title')}
      visible={props.visible}
      onClose={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <InvoiceForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Drawer>
  );
};

export default InvoiceFormModal;
