import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/roles/rolesSelectors';

const RolesViewItem = (props) => {
  const hasRolesToRead = useSelector(
    selectors.selectRolesToRead,
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
    if (hasRolesToRead) {
      return (
        <div key={record.id}>
          <Link to={`/roles/${record.id}`}>
            {record.roles}
          </Link>
        </div>
      );
    }

    return <div key={record.id}>{record.roles}</div>;
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

export default RolesViewItem;
