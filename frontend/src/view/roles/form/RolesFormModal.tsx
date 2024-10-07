import React, { useState } from 'react';
import { Drawer } from 'antd';
import { i18n } from 'src/i18n';
import RolesForm from 'src/view/roles/form/RolesForm';
import RolesService from 'src/modules/roles/rolesService';
import Errors from 'src/modules/shared/error/errors';

const RolesFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await RolesService.create(data);
      const record = await RolesService.find(id);
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
      placement="right"
      title={i18n('entities.roles.new.title')}
      open={props.visible}
      onClose={() => props.onCancel()}
      footer={false}
      width="60%"
    >
      <RolesForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Drawer>
  );
};

export default RolesFormModal;
