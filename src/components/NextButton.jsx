import Button from "./Button";

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <Button onClick={() => dispatch({ type: "nextQuestion" })}>
        Next Question →
      </Button>
    );

  if (index === numQuestions - 1)
    return <Button onClick={() => dispatch({ type: "finish" })}>Finish</Button>;
}

export default NextButton;
