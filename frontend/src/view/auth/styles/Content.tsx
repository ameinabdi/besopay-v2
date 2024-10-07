import styled from 'styled-components';

const Content = styled.div`
  width: 550px;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 60px;
  position: relative;
  background-color: white;
  color: white;

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
