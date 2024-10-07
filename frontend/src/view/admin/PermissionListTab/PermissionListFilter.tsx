import { Tag} from 'antd';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import actions from 'src/modules/permission/list/permissionListActions';
import selectors from 'src/modules/permission/list/permissionListSelectors';
import FilterWrapper, {
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import actionsRoles from 'src/modules/roles/list/rolesListActions';
import selectorsRoles from 'src/modules/roles/list/rolesListSelectors';
const { CheckableTag } = Tag;

const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('entities.permission.fields.name'),
  ),
  description: yupFilterSchemas.string(
    i18n('entities.permission.fields.description'),
  ),
});

const emptyValues = {
  name: null,
  description: null,
}

const previewRenders = {
  name: {
    label: i18n('entities.permission.fields.name'),
    render: filterRenders.generic(),
  },
  description: {
    label: i18n('entities.permission.fields.description'),
    render: filterRenders.generic(),
  },
}

const PermissionListFilter = (props) => {
  const dispatch = useAppDispatch();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(false);
  const rows = useSelector(selectorsRoles.selectRows);
  const [tag, setTag] = useState([rows[0]?.roles]);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });
  useEffect(() => {
    dispatch(actions.doFetch({InRole:rows[0]?.id}, rawFilter));
    dispatch(actionsRoles.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };


  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const handleChange = (roleId, taged, checked)=> {
    const rawValues = form.getValues();
    setTag(taged)
    dispatch(actions.doFetch({InRole:roleId}, rawValues));
  }

  return (
    <FilterWrapper>
      <Collapse
        activeKey={'filter'}
        expandIconPosition="right"
        ghost
      >
        <Collapse.Panel
          header={
            <FilterPreview             
              renders={previewRenders}
              values={rawFilter}
              expanded={expanded}
              onRemove={onRemove}
            />
          }
          key="filter"
        >
          {rows.map(role => (
            <CheckableTag
              key={role.id}
              checked={tag.indexOf(role.roles)>-1}
              onChange={checked => handleChange(role.id, role.roles, checked)}
              >
              {role.roles}
            </CheckableTag>
            ))}
         </Collapse.Panel>
      </Collapse>
    </FilterWrapper>
  );
};

export default PermissionListFilter;