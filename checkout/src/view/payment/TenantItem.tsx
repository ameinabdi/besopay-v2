import { Row,Col, Avatar, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
const { Text, Title, } = Typography;
const TenantItem = (props) => {
  
  const {value } = props;

  return (
    <Row style={{margin:0, padding:0}}>
      <Col span={6}>
      <Avatar
        src='/images/logo.png'
        size={90}
      />
      </Col>
      <Col span={18}>
      <Title style={{color:'#3f3f3f'}} level={2}>Besopay Checkout</Title>
      <Text strong style={{color:'#01be63'}}>{value?.name}</Text>
      </Col>
    </Row>
  );
};

TenantItem.propTypes = {
  value: PropTypes.any,
};

export default TenantItem;
