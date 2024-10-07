import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ErrorWrapper from 'src/view/shared/errors/styles/ErrorWrapper';
import { i18n } from 'src/i18n';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';

const Error500Page = () => {
  return (
    <Wrapper >
    <Content>
    <ErrorWrapper>
      <div className="exception">
        <div className="imgBlock">
          <div
            className="imgEle"
            style={{
              backgroundImage: `url(/images/500.svg)`,
            }}
          />
        </div>
        <div className="content">
          <h1>500</h1>
          <div className="desc">{i18n('errors.500')}</div>
          <div className="actions">
            <Link to="/">
              <Button type="primary">
                {i18n('errors.backToHome')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ErrorWrapper>
    </Content>
    </Wrapper>
  );
};

export default Error500Page;
