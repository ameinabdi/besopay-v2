import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import LocationsForm from 'src/view/locations/form/LocationsForm';
import LocationsService from 'src/modules/locations/locationsService';
import Errors from 'src/modules/shared/error/errors';

const LocationsFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await LocationsService.create(data);
      const record = await LocationsService.find(id);
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
      title={i18n('entities.locations.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <LocationsForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default LocationsFormModal;
