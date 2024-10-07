import { Button,Divider } from 'antd';
import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n, i18nHtml } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import InputFormItem from '../shared/form/items/InputFormItem';


const schema:any = yup.object().shape({
    otpToken: yupFormSchemas.string(i18n('user.fields.otpToken'), {
      required: true,
    }),
   
});

const TwoFAPage = (props) => {
    const dispatch = useAppDispatch();

  const [initialValues] = useState({
    token: '',
  });
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });
  const email = useSelector(
    selectors.selectCurrentUserEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingVerifyTwoFA,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doSubmit = (value) => {
     dispatch(actions.doSendTwoFAConfirmation(value.otpToken));
  };

  const doResendVerification = () => {
    dispatch(actions.doResendTwoFAVerification());
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          '/images/emailUnverified.jpg'
        })`,
      }}
    >
      <Content>
        <Logo>
            <img
              src='/images/logo.png'
              width="240px"
              alt={i18n('app.title')}
            />
        </Logo>
        <h3
          style={{
            textAlign: 'center',
            marginBottom:'20px'
          }}
        >
          {i18nHtml('auth.twoFA.message', email)}
        </h3>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(doSubmit)}>
            <InputFormItem
              name="otpToken"
              placeholder={i18n('user.fields.otpToken')}
              autoComplete="otpToken"
              size="large"
              autoFocus
              layout={null}
            />

        <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={loading}
            >
              {i18n('common.verify')}
            </Button>

            <Divider
              style={{ color: 'white', margin: '24px 0' }}
            >
              {i18n('common.or')}
          </Divider>
        <Button
          type="link"
          size="large"
          block
          onClick={doResendVerification}
          loading={loading}
        >
          {i18n('common.resendVerification')}
        </Button>

        <OtherActions>
          <ButtonLink onClick={doSignout}>
            {i18n('auth.signinWithAnotherAccount')}
          </ButtonLink>
        </OtherActions>
        </form>
        </FormProvider>
      </Content>
    </Wrapper>
  );
};

export default TwoFAPage;
