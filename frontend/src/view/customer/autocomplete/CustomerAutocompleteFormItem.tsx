import React, { useState } from 'react';
import CustomerService from 'src/modules/customer/customerService';
import CustomerFormModal from 'src/view/customer/form/CustomerFormModal';
import AutocompleteFormItem from 'src/view/shared/form/items/AutocompleteFormItem';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/customer/customerSelectors';
import { useFormContext } from 'react-hook-form';

const CustomerAutocompleteFormItem = (props) => {
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
    return CustomerService.listAutocomplete(value, limit);
  };

  const mapper = {
    toAutocomplete(value) {
      if (!value) {
        return null;
      }

      const key = value.id;
      let label = value.label;

      if (value.fullname) {
        label = value.fullname;
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

      <CustomerFormModal
        visible={modalVisible}
        onCancel={doCloseModal}
        onSuccess={doCreateSuccess}
      />
    </>
  );
};

export default CustomerAutocompleteFormItem;
