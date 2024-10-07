import { Modal } from 'antd';
import React from 'react';
import { i18n } from 'src/i18n';
import UserEditForm from 'src/view/user/edit/UserEditForm';
import selectors from 'src/modules/user/form/userFormSelectors';
import {  useSelector } from 'react-redux';
import actions from 'src/modules/user/form/userFormActions';
import Spinner from 'src/view/shared/Spinner';
import { useAppDispatch } from 'src/modules/hook';

const UserEditFormModal = (props) => {
    const dispatch = useAppDispatch();

    const initLoading = useSelector(
      selectors.selectInitLoading,
    );

    const saveLoading = useSelector(
        selectors.selectSaveLoading,
    );
    const user = useSelector(selectors.selectUser);

    React.useEffect(() => {
      dispatch(actions.doInit(props.id));
    }, [dispatch, props.id]);

  if (initLoading) {
    return <Spinner />;
  }

  return (
    <Modal
      style={{ top: 24 }}
      title={i18n('user.new.titleModal')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <UserEditForm
        user={user}
        saveLoading={saveLoading}
        onCancel={props.onCancel}
        modal
        single
      />
    </Modal>
  );
};

export default UserEditFormModal;
