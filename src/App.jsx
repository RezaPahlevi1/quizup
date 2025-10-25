import "./index.css";
import Header from "./components/Header";
import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";
import ErrorScreen from "./components/ErrorScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import CategorySelect from "./components/CategorySelect";

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

function App() {
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

  useEffect(function () {
    if (!category) return;

    fetch(`http://localhost:8000/${category}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-400 opacity-5 rounded-full blur-3xl"></div>

        <Header />

        <Main>
          {status === "selecting" && <CategorySelect dispatch={dispatch} />}
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorScreen />}
          {status === "ready" && (
            <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
          )}
          {status === "active" && (
            <>
              <Questions
                dispatch={dispatch}
                answer={answer}
                question={questions[index]}
                points={points}
                index={index}
                numQuestions={numQuestions}
                maxPoints={maxPoints}
              />
              <Footer>
                <Timer
                  secondsRemaining={secondsRemaining}
                  dispatch={dispatch}
                />
                <NextButton
                  numQuestions={numQuestions}
                  index={index}
                  dispatch={dispatch}
                  answer={answer}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              maxPoints={maxPoints}
              points={points}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
