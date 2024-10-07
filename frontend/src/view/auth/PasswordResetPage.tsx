import { Button } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { i18n } from 'src/i18n';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';

import { Link } from 'react-router-dom';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import Wrapper from 'src/view/auth/styles/Wrapper';
import { useLocation } from 'react-router-dom';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema:any = yup.object().shape({
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
});

const PasswordResetPage = (props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const backgroundImageUrl = useAppSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useAppSelector(selectors.selectLogoUrl);

  const loading = useAppSelector(
    selectors.selectLoadingPasswordReset,
  );
  const externalErrorMessage = useAppSelector(
    selectors.selectErrorMessage,
  );

  const clearErrorMessage = () => {
    dispatch(actions.doClearErrorMessage());
  };

  useEffect(() => {
    clearErrorMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = () => {
    if (externalErrorMessage) {
      clearErrorMessage();
    }
  };

  const [initialValues] = useState({
    password: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const token = queryString.parse(location.search).token;

  const onSubmit:any = ({ password }) => {
    dispatch(actions.doResetPassword(token, password));
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/forgotPassword.jpg'
        })`,
      }}
    >
      <Content>
        <Logo>
          {logoUrl ? (
            <img
              src={logoUrl}
              width="240px"
              alt={i18n('app.title')}
            />
          ) : (
            <h1>{i18n('app.title')}</h1>
          )}
        </Logo>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              name="password"
              placeholder={i18n('user.fields.password')}
              autoComplete="password"
              type="password"
              size="large"
              layout={null}
              onChange={handleChange}
              externalErrorMessage={externalErrorMessage}
            />

            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={loading}
            >
              {i18n('auth.passwordReset.message')}
            </Button>

            <OtherActions>
              <Link to="/auth/signin">
                {i18n('common.cancel')}
              </Link>
            </OtherActions>
          </form>
        </FormProvider>
      </Content>
    </Wrapper>
  );
};

export default PasswordResetPage;
