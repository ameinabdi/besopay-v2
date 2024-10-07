import React, { useState } from 'react';
import { Drawer } from 'antd';
import { i18n } from 'src/i18n';
import PaymentLinkForm from 'src/view/paymentLink/form/PaymentLinkForm';
import PaymentLinkService from 'src/modules/paymentLink/paymentLinkService';
import Errors from 'src/modules/shared/error/errors';

const PaymentLinkFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await PaymentLinkService.create(data);
      const record = await PaymentLinkService.find(id);
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
      title={i18n('entities.paymentLink.new.title')}
      visible={props.visible}
      onClose={() => props.onCancel()}
      footer={false}
      width="50%"
    >
      <PaymentLinkForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Drawer>
  );
};

export default PaymentLinkFormModal;
