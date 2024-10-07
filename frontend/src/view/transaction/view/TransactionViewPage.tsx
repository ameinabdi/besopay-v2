import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import actions from 'src/modules/transaction/view/transactionViewActions';
import selectors from 'src/modules/transaction/view/transactionViewSelectors';
import TransactionView from 'src/view/transaction/view/TransactionView';

const TransactionPage = (props) => {
 const dispatch = useAppDispatch();
  const match =useParams();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.id || props.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
     <TransactionView loading={loading} record={record} />
  );
};

export default TransactionPage;
