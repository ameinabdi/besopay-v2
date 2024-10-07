import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import { Button, Form, Row,Input, Col,Typography,Card} from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  tailFormItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import moment from 'moment';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';
import  _  from 'lodash';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import CurrencyAutocompleteFormItem from 'src/view/currency/autocomplete/CurrencyAutocompleteFormItem';
const  { Text } = Typography;

const schema = yup.object().shape({
  customer: yupFormSchemas.relationToMany(
    i18n('entities.invoice.fields.customer'),
    {},
  ),
  dueDate: yupFormSchemas.date(
    i18n('entities.invoice.fields.dueDate'),
    {},
  ),
  currency: yupFormSchemas.relationToOne(
    i18n('entities.invoice.fields.currency'),
    {},
  ),
  invoiceNote: yupFormSchemas.string(
    i18n('entities.invoice.fields.invoiceNote'),
    {},
  ),
  shippingFee: yupFormSchemas.decimal(
    i18n('entities.invoice.fields.shippingFee'),
    {
      "scale": 2
    },
  ),
  discount: yupFormSchemas.decimal(
    i18n('entities.invoice.fields.discount'),
    {
      "scale": 2
    },
  ),
  tax: yupFormSchemas.decimal(
    i18n('entities.invoice.fields.tax'),
    {
      "scale": 2
    },
  ),
  otherEmails: yupFormSchemas.string(
    i18n('entities.invoice.fields.otherEmails'),
    {},
  ),
  Items:yup
  .array()
  .of(
    yup
      .object().shape({
        id: yupFormSchemas.string(
          i18n('entities.route.fields.id'),
          {},
        ),
        item: yupFormSchemas.string(
          i18n('entities.invoiceItems.fields.item'),
          {},
        ),
        quantity: yupFormSchemas.integer(
          i18n('entities.invoiceItems.fields.quantity'),
          {},
        ),
        unitPrice: yupFormSchemas.decimal(
          i18n('entities.invoiceItems.fields.unitPrice'),
          {},
        ),
        totalAmount: yupFormSchemas.decimal(
          i18n('entities.invoiceItems.fields.totalAmount'),
          {},
        ),
      }) 
  ),
});

const InvoiceForm = (props) => {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const [initialValues] = useState(() => {
    const record = props.record || {};
    if(record.Items){
      const index:any =record?.Items.map((_,index)=>{return index})
      setIndexes(index);
      setCounter(record?.Items?.length);
     }
    return {
      customer: record.customer || [],
      dueDate: record.dueDate ? moment(record.dueDate, 'YYYY-MM-DD') : null,
      currency: record.currency,
      invoiceNote: record.invoiceNote,
      shippingFee: record.shippingFee,
      discount: record.discount,
      tax: record.tax,
      otherEmails: record.otherEmails,
      Items: record?.Items?.map((item)=>{
        return {
          id: item.id,
          item: item.item,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalAmount: item.totalAmount,
        }
      }) || []
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  });

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };
  const Items = _.compact(form.watch()?.Items);
  const totalAmount:any = _.sumBy(Items, function(item:any) { return (parseFloat(item?.quantity) *parseFloat(item.unitPrice)); }); 
  const grantTotal:any = totalAmount+parseFloat(form.watch()?.shippingFee)+parseFloat(form.watch()?.tax)-parseFloat(form.watch()?.discount)


  const onSubmit = (values) => {
    const Items = _.compact(values.Items);
    const updatedValue = {
      ...values,
      grantTotal:grantTotal.toFixed(2),
      Items
    }
    props.onSubmit(props?.record?.id, updatedValue);  
  };


    const addFriend = () => {
      /* @ts-ignore */
      setIndexes((prevIndexes) => [...prevIndexes, counter]);
      setCounter((prevCounter) => prevCounter + 1);
    };
  
    const removeFriend = (index) => () => {
      setIndexes((prevIndexes) => [
        ...prevIndexes.filter((item) => item !== index)
      ]);
      form.unregister(`Items[${index}].id`);
      form.unregister(`Items[${index}].item`);
      form.unregister(`Items[${index}].quantity`);
      form.unregister(`Items[${index}].unitPrice`);
      form.unregister(`Items[${index}].totalAmount`);
      form.unregister(`Items[${index}]`);
    };
  
 
  const { saveLoading } = props;
  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Row gutter={24}>
          <Col className="gutter-row" span={8}>
            <Text>{i18n('entities.invoice.fields.customer')}</Text>
            <CustomerAutocompleteFormItem  
            name="customer"
            required={false}
            showCreate={!props.modal}
            mode="multiple"
          />
          </Col>
          <Col className="gutter-row" span={8}></Col>
          <Col className="gutter-row" span={8}>
            <Text>{i18n('entities.invoice.fields.dueDate')}</Text>
            <DatePickerFormItem
            name="dueDate"
            required={false}
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <Text>{i18n('entities.invoice.fields.currency')} </Text>
            <CurrencyAutocompleteFormItem
            name="currency"
            required={false}
            />
          </Col>
          <Col className="gutter-row" span={8}></Col>
          <Col className="gutter-row" span={8}>
            <Text>{i18n('entities.invoice.fields.otherEmails')}</Text>
            <InputFormItem
            name="otherEmails"
            required={false}
            />
          </Col>
        </Row>
        <Card title={ <Row>
          <Col className="gutter-row" span={10}>
            <Text>{i18n('entities.invoiceItems.fields.item')} </Text>
          </Col>
          <Col className="gutter-row" span={4}>
            <Text>{i18n('entities.invoiceItems.fields.quantity')}</Text>
          </Col>
          <Col className="gutter-row" span={4}>
            <Text>{i18n('entities.invoiceItems.fields.unitPrice')} </Text>
          </Col>
          <Col className="gutter-row" span={4}>
            <Text>{i18n('entities.invoiceItems.fields.totalAmount')} </Text>
          </Col>
          <Col span={2}><Button type="primary" style={{}} onClick={addFriend} block icon={<PlusOutlined />} /></Col></Row>} bordered={false}>
        {indexes.map((index) => {
        const fieldName = `Items[${index}]`;
        const itemtotalAmount = parseFloat(form.watch(`${fieldName}.quantity`))*parseFloat(form.watch(`${fieldName}.unitPrice`))

        return (
          <Row className="flex flex-wrap -mx-3 mb-10 " key={index}>
            <InputFormItem
              name={`${fieldName}.id`}
              required={false}
              hidden={true}
            />
           <Col span={10} style={{paddingRight:5, paddingLeft:5}}>
           <InputFormItem
            name={`${fieldName}.item`}
            placeholder={i18n('entities.invoiceItems.fields.item')}
            required={false}
          />
          </Col>
           <Col span={4} style={{paddingRight:5, paddingLeft:5}}>
            <InputNumberFormItem
            name={`${fieldName}.quantity`}
            placeholder={i18n('entities.invoiceItems.fields.quantity')}
            required={false}
            />
           </Col>
           <Col span={4} style={{paddingRight:5, paddingLeft:5}}>
            <InputFormItem
            name={`${fieldName}.unitPrice`}
            placeholder={i18n('entities.invoiceItems.fields.unitPrice')}
            required={false}
            />   
            </Col>
            <Col span={4} style={{paddingRight:5, paddingLeft:5}}>
            <Input
              name={`${fieldName}.totalAmount`}
              required={false}
              placeholder={i18n('entities.invoiceItems.fields.totalAmount')}
              value={itemtotalAmount.toFixed(2)}
              disabled
            />    
            </Col>
            <Col className="gutter-row" span={2}>
                <Button type="primary" style={{ justifyContent:'center'}} onClick={removeFriend(index)} block icon={<MinusCircleOutlined />} />
            </Col>
            </Row>
            );
          })}
          </Card>
          <Row gutter={24}>
          <Col className="gutter-row" span={18}>
            <Text>{i18n('entities.invoice.fields.invoiceNote')}</Text>
            <TextAreaFormItem
            name="invoiceNote"
            placeholder={i18n('entities.invoice.fields.invoiceNote')}  
            required={true}
          />
          </Col>
          <Col className="gutter-row" span={6}>
            <Row className="h-10 border-b-2 border-gray-300 m-1" gutter={24}>
            <Col  span={12}>
            <Text strong>{i18n('entities.invoice.fields.totalAmount')} : </Text>
            </Col>
            <Col  span={12}>
            <Input
            name="totalAmount"
            required={false}
            disabled={true}
            value={totalAmount.toFixed(2)}
            />
            </Col>
            </Row>
            <br />
            <Row className="h-10 border-b-2 border-gray-300 m-1" gutter={24}>
            <Col  span={12}>
            <Text strong>{i18n('entities.invoice.fields.shippingFee')} : </Text>
            </Col>
            <Col span={12}>
            <InputFormItem
            name="shippingFee"
            required={false}
            />
            </Col>
            </Row>
            <Row className="h-10 border-b-2 border-gray-300 m-1" gutter={24}>
            <Col  span={12}>
            <Text strong>{i18n('entities.invoice.fields.tax')} : </Text>
            </Col>
            <Col span={12}>
            <InputFormItem
            name="tax"
            required={false}
            />
            </Col>
            </Row>
            <Row className="h-10 border-b-2 border-gray-300 m-1" gutter={24}>
            <Col  span={12}>
            <Text strong>{i18n('entities.invoice.fields.discount')} : </Text>
            </Col>
            <Col span={12}>
            <InputFormItem
            name="discount"
            required={false}
            />
            </Col>
            </Row>
           
            <Row className="h-10 border-b-2 border-gray-300 m-1" gutter={24}>
            <Col  span={12}>
            <Text strong>{i18n('entities.invoice.fields.grantTotal')} : </Text>
            </Col>
            <Col  span={12}>
            <Input
            name="grantTotal"
            required={false}
            disabled={true}
            value={grantTotal.toFixed(2)}
            />
            </Col>
            </Row>
          </Col>
        </Row> 
          <Form.Item
            className="form-buttons"
            {...tailFormItemLayout}
          >
            <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              icon={<SaveOutlined />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined />}
              >
                {i18n('common.cancel')}
              </Button>
            )}
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default InvoiceForm;
