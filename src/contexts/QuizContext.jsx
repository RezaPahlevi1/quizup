import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "selecting",
  category: null,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const categories = ["react", "javascript", "nodejs"];

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "categorySelected":
      return { ...state, category: action.payload, status: "loading" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "gameStart":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer": {
      const curQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curQuestion.correctOption
            ? state.points + curQuestion.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...state,
        status: "selecting",
        index: 0,
        answer: null,
        points: 0,
        category: null,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      category,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(
    function () {
      if (!category) return;

      fetch(`http://localhost:8000/questions`)
        .then((res) => res.json())
        .then((data) => {
          const selectedQuestions = data[category];
          dispatch({ type: "dataReceived", payload: selectedQuestions });
        })
        .catch((err) => dispatch({ type: "dataFailed" }));
    },
    [category]
  );
  return (
    <QuizContext.Provider
      value={{
        questions,
        answer,
        points,
        highscore,
        secondsRemaining,
        category,
        numQuestions,
        maxPoints,
        status,
        categories,
        index,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside QuizProvider");

  return context;
}

export { useQuiz, QuizProvider };
