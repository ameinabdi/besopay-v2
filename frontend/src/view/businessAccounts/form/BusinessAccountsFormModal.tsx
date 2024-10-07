import React, { useState } from 'react';
import {Drawer } from 'antd';
import { i18n } from 'src/i18n';
import BusinessAccountsForm from 'src/view/businessAccounts/form/BusinessAccountsForm';
import BusinessAccountsService from 'src/modules/businessAccounts/businessAccountsService';
import Errors from 'src/modules/shared/error/errors';

const BusinessAccountsFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await BusinessAccountsService.create(data);
      const record = await BusinessAccountsService.find(id);
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
      title={i18n('entities.businessAccounts.new.title')}
      visible={props.visible}
      onClose={() => props.onCancel()}
      footer={false}
      width="40%"
    >
      <BusinessAccountsForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        record={props.record}
        modal
      />
    </Drawer>
  );
};

export default BusinessAccountsFormModal;
