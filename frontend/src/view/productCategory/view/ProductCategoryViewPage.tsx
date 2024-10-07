import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/productCategory/view/productCategoryViewActions';
import selectors from 'src/modules/productCategory/view/productCategoryViewSelectors';
import ProductCategoryView from 'src/view/productCategory/view/ProductCategoryView';
import ProductCategoryViewToolbar from 'src/view/productCategory/view/ProductCategoryViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProductCategoryPage = (props) => {
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
          [i18n('entities.productCategory.menu'), '/product-category'],
          [i18n('entities.productCategory.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.productCategory.view.title')}
        </PageTitle>

        <ProductCategoryViewToolbar match={match} />

        <ProductCategoryView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default ProductCategoryPage;
