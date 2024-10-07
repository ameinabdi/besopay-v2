import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ErrorWrapper from 'src/view/shared/errors/styles/ErrorWrapper';
import { i18n } from 'src/i18n';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const Error400Page = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);

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
          <h1>400</h1>
 
          <div className="desc">{query?.msg}</div>
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

export default Error400Page;
