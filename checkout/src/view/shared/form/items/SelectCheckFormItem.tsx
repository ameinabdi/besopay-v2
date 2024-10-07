import { Avatar, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import { useFormContext } from 'react-hook-form';
import { CheckCard } from '@ant-design/pro-components';

const SelectCheckFormItem = (props) => {
  const {
    label,
    name,
    hint,
    layout,
    options,
    required,
    externalErrorMessage,
  } = props;

  const {
    register,
    formState: {errors, touchedFields, isSubmitted },
    setValue,
    watch,
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touchedFields,
    isSubmitted,
    externalErrorMessage,
  );


  useEffect(() => {
    register(name);
    setValue(name, '1', { shouldValidate: true, shouldDirty: true });
  }, [register,setValue, name]);

  return (
    <Form.Item
      {...layout}
      label={label}
      labelAlign="left"
      requiredMark={required}
      validateStatus={errorMessage ? 'error' : 'success'}
      required={required}
      help={errorMessage || hint}
    >
          <CheckCard.Group 
          //@ts-ignore
          name={name}
          onChange={(checkedValue:any) => {
            const data:any = []
            setValue(name, checkedValue, { shouldValidate: true, shouldDirty: true });
            props.onChange && props.onChange(data);
          }}
          style={{ width: '100%' }} 
          defaultValue={'1'}
          value={watch(name)}
          >
            <Row>
              {options.map((option, index) => (
                <Col span={8}>
                  <CheckCard
                    title={option?.label}
                    avatar={(
                      <Avatar
                        size={32}
                        shape="square"
                        src={'/images/'+option.icon}
                      />
                    )}
                    value={option?.id}
                    style={{ width: 142, height: 68 }}
                  />
                </Col>
              ))}
              
            </Row>
          </CheckCard.Group>
      
    </Form.Item>
  );
};

SelectCheckFormItem.defaultProps = {
  layout: null,
  required: false,
};

SelectCheckFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  mode: PropTypes.string,
  optionFilterProp: PropTypes.string,
};

export default SelectCheckFormItem;
