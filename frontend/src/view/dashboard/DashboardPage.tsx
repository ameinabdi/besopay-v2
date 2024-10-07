import { Card, Col, Row } from 'antd';
import React from 'react';
import { i18n } from 'src/i18n';

const DashboardPage = (props) => {
  const twoColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style: {
      marginBottom: 24,
    },
  };
  const threeColumnsResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    style: {
      marginBottom: 24,
    },
  };

  return (
    <>
      <Row gutter={24}>
        
      </Row>
      <p
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'grey',
        }}
      >
        {i18n('dashboard.message')}
      </p>
    </>
  );
};

export default DashboardPage;
