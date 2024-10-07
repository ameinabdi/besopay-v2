import styled from 'styled-components';

const Content = styled.div`
  width: 500px;
  height: 750px;
  min-height: 650px;
  overflow-y: auto;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  position: relative;
  background-color: white;
  color: black;
  margin-top:-15px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: black;
  }

  .ant-checkbox-wrapper {
    color: black;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default Content;
