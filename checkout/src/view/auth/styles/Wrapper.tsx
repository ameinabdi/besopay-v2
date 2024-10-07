import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: cover;
  padding-top: 0vh;
  padding-bottom: 0vh;
  
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #F1F2F1;
    position: absolute;
  }
`;

export default Wrapper;
