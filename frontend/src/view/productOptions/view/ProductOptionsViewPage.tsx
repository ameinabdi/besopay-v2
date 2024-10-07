import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/productOptions/view/productOptionsViewActions';
import selectors from 'src/modules/productOptions/view/productOptionsViewSelectors';
import ProductOptionsView from 'src/view/productOptions/view/ProductOptionsView';
import ProductOptionsViewToolbar from 'src/view/productOptions/view/ProductOptionsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProductOptionsPage = (props) => {
 const dispatch = useAppDispatch();
  const match =useParams();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.productOptions.menu'), '/product-options'],
          [i18n('entities.productOptions.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.productOptions.view.title')}
        </PageTitle>

        <ProductOptionsViewToolbar match={match} />

        <ProductOptionsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default ProductOptionsPage;
