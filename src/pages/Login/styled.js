import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 300px;

  input {
    margin-left: 5px;
  }
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  `;

export const ButtonsContainer = styled.section`
  display: flex;
  justify-content: space-around;
  width: 90%;
  `;
