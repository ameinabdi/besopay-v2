import styled from 'styled-components';

const FormWrapper = styled.div`
  padding: 24px;
  padding-top: 0;
  padding-bottom: 0;

  .ant-form-item-label {
    white-space: normal;
  }

  .ant-form-item-with-help {
    margin-bottom: 24px;
  }

  .form-buttons {
    .ant-btn {
      margin-top: 8px;
      margin-right: 8px;
    }
  }
`;

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    md: {
      span: 18,
      offset: 6,
    },
    lg: {
      span: 12,
      offset: 4,
    },
  },
};

export default FormWrapper;
