import React, { useState } from 'react';
import RolesService from 'src/modules/roles/rolesService';
import RolesFormModal from 'src/view/roles/form/RolesFormModal';
import AutocompleteFormItem from 'src/view/shared/form/items/AutocompleteFormItem';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/roles/rolesSelectors';
import { useFormContext } from 'react-hook-form';

const RolesAutocompleteFormItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { setValue, getValues } = useFormContext();

  const hasRolesToCreate = useSelector(
    selectors.selectRolesToCreate,
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
    return RolesService.listAutocomplete(value, limit);
  };

  const mapper = {
    toAutocomplete(value) {
      if (!value) {
        return null;
      }

      const key = value.id;
      let label = value.label;

      if (value.roles) {
        label = value.roles;
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
        hasRolesToCreate={hasRolesToCreate}
      />

      <RolesFormModal
        visible={modalVisible}
        onCancel={doCloseModal}
        onSuccess={doCreateSuccess}
      />
    </>
  );
};

export default RolesAutocompleteFormItem;
