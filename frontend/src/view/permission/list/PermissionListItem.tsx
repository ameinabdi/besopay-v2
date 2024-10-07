import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/permission/permissionSelectors';
import { Tag } from 'antd'
const PermissionListItem = (props) => {
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <div key={record.id}>
              <Tag color="cyan" > {record.entity}</Tag>
        </div>
      );
    }

    return <Tag key={record.id}>{record.entity}</Tag>;
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </>
  );
};

PermissionListItem.propTypes = {
  value: PropTypes.any,
};

export default PermissionListItem;
