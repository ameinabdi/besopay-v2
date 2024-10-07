import { Button, Row, Col } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';
import { Link, useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import Content from 'src/view/auth/styles/Content';
import RowLogo from 'src/view/auth/styles/RowLogo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TopbarWrapper from '../layout/styles/TopbarWrapper';
import I18nSelect from '../layout/I18nSelect';
import {
  formItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import PhoneInputFormItem from '../shared/form/items/PhoneInputFormItem';
import CountryAutocompleteFormItem from '../country/autocomplete/CountryAutocompleteFormItem';
const schema:any = yup.object().shape({
  firstName: yupFormSchemas.string(i18n('user.fields.firstName'), {
    required: true,
  }),
  lastName: yupFormSchemas.string(i18n('user.fields.lastName'), {
    required: true,
  }),
  businessName: yupFormSchemas.string(i18n('user.fields.businessName'), {
    required: true,
  }),
  phoneNumber:yupFormSchemas.string(i18n('user.fields.businessName'), {
    required: true,
  }),
  country: yupFormSchemas.relationToOne(i18n('user.fields.country'), {
    required: true,
  }),
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
});

const SignupPage = (props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const loading = useAppSelector(selectors.selectLoading);
  const externalErrorMessage = useAppSelector(
    selectors.selectErrorMessage,
  );
  const backgroundImageUrl = useAppSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useAppSelector(selectors.selectLogoUrl);

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

  const emailFromInvitation = queryString.parse(
    location.search,
  ).email;

  const [initialValues] = useState({
    firstName:'',
    lastName:'',
    businessName:'',
    phoneNumber:'',
    country:null,
    email: emailFromInvitation || '',
    password: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit:any = ({  firstName, lastName, businessName, phoneNumber, country,  email, password}) => {
    dispatch(
      actions.doRegisterEmailAndPassword(firstName, lastName, businessName, phoneNumber, country,  email, password),
    );
  };
  const twoColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style:{
      padding:2,
    }
  };
  const oneColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
    style:{
      padding:2,
    }
  };


  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/signup.jpg'
        })`,
      }}
    >
      <Content>
      <TopbarWrapper>
        <div>
        </div>
          <div style={{justifyContent:'flex-end', float:'right',display:'flex'}}>
              <I18nSelect />
          </div>
        </TopbarWrapper>
        <RowLogo>
          
            <img
              src='/images/logo.png'
              width="60px"
              alt={i18n('app.title')}
            />
            <h1>{i18n('app.title')}</h1>
        </RowLogo>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <Row>
            
            <Col {...twoColumnsResponsiveProps}>
            <InputFormItem
              name="firstName"
              label={i18n('user.fields.firstName')}
              placeholder={i18n('user.fields.firstName')}
              size="large"
              autoFocus
              layout={formItemLayout}
              onChange={handleChange}
            />
            </Col>
            <Col {...twoColumnsResponsiveProps}>
            <InputFormItem
              name="lastName"
              label={i18n('user.fields.lastName')}
              placeholder={i18n('user.fields.lastName')}
              size="large"
              layout={formItemLayout}
              onChange={handleChange}
            />
            </Col> 
           
            
            <Col {...oneColumnsResponsiveProps}>
            <InputFormItem
              name="businessName"
              label={i18n('user.fields.businessName')}
              placeholder={i18n('user.fields.businessName')}
              size="large"
              layout={formItemLayout}
              onChange={handleChange}
            />
            </Col>
            <Col {...oneColumnsResponsiveProps}>
            <PhoneInputFormItem
              name="phoneNumber"
              label={i18n('user.fields.phoneNumber')}
              placeholder={i18n('user.fields.phoneNumber')}
              size="large"
              layout={formItemLayout}
              onChange={handleChange}
            />
            </Col>
            <Col {...oneColumnsResponsiveProps}>
            <CountryAutocompleteFormItem
              name="country"
              label={i18n('user.fields.country')}
              placeholder={i18n('user.fields.country')}
              size="large"
              layout={formItemLayout}
              onChange={handleChange}
            />
            </Col>
            
            <Col {...oneColumnsResponsiveProps}>
            <InputFormItem
              name="email"
              placeholder={i18n('user.fields.email')}
              autoComplete="email"
              size="large"
              
              externalErrorMessage={externalErrorMessage}
              layout={formItemLayout}
              onChange={handleChange}
            />
            </Col>
            <Col {...oneColumnsResponsiveProps}>
            <InputFormItem
              name="password"
              placeholder={i18n('user.fields.password')}
              autoComplete="password"
              type="password"
              size="large"
              layout={formItemLayout}
            />
            </Col>
            
            </Row>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={loading}
            >
              {i18n('auth.signup')}
            </Button>

            <OtherActions>
              <Link to="/auth/signin">
                {i18n('auth.alreadyHaveAnAccount')}
              </Link>
            </OtherActions>
          </form>
        </FormProvider>
      </Content>
    </Wrapper>
  );
};

export default SignupPage;
