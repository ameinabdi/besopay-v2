import React, { useState } from 'react';
import ShippingService from 'src/modules/shipping/shippingService';
import ShippingFormModal from 'src/view/shipping/form/ShippingFormModal';
import AutocompleteFormItem from 'src/view/shared/form/items/AutocompleteFormItem';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/shipping/shippingSelectors';
import { useFormContext } from 'react-hook-form';

const ShippingAutocompleteFormItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { setValue, getValues } = useFormContext();

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = () => {
    setModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    const { name, mode } = props;

    if (mode && mode === 'multiple') {
      setValue(name, [
        ...(getValues()[name] || []),
        record,
      ], {shouldValidate: true, shouldDirty: true});
    } else {
      setValue(name, record, {shouldValidate: true, shouldDirty: true});
    }

    doCloseModal();
  };

  const fetchFn = (value, limit) => {
    return ShippingService.listAutocomplete(value, limit);
  };

  const mapper = {
    toAutocomplete(value) {
      if (!value) {
        return null;
      }

      const key = value.id;
      let label = value.label;

      if (value.region) {
        label = value.region;
      }

      return {
        key,
        label,
      };
    },

    toValue(value) {
      if (!value) {
        return null;
      }

      return {
        id: value.key,
        label: value.label,
      };
    },
  };

  const { form, ...rest } = props;
  return (
    <>
      <AutocompleteFormItem
        {...rest}
        fetchFn={fetchFn}
        mapper={mapper}
        onOpenModal={doOpenModal}
        inMemoryFilter
        hasPermissionToCreate={hasPermissionToCreate}
      />

      <ShippingFormModal
        visible={modalVisible}
        onCancel={doCloseModal}
        onSuccess={doCreateSuccess}
      />
    </>
  );
};

export default ShippingAutocompleteFormItem;
