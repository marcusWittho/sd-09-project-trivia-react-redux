import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ScoreContainer = styled.section`
  display: grid;
  margin: 2rem;

  p {
    margin-bottom: .5rem;
  }
`;

export const GravatarImage = styled.img`
  border-radius: 15rem;
`;

export const ButtonsAnswers = styled.section`
  display: flex;
  min-width: 50%;
  max-width: 50%;
  flex-direction: column;
  justify-content: space-around;
  background-color: #555;
  padding: 1rem;
  button {
    margin-bottom: 1rem;
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const FlexConteiner = styled.section`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const QuestionConteiner = styled.section`
height: 70vh;
`;

export const TopBar = styled.section`
  background-color: blueviolet;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    background-color: white;
    padding: 1rem;
    border-radius: 5rem;
    color: black;
  }
`;

export const TextQuestion = styled.p`
  margin-top: 5rem;
  padding: 1rem;
  align-items: center;
  min-height: 60%;
  max-height: 60%;
  text-align: center;
  font-size: 27px;
`;

export const NextButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  button {
    margin-bottom: 1rem;
    padding: 1rem;
    position: relative;
    margin: 3rem;
    font-size: 1rem;
  }
`;
