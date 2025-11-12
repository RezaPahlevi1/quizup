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
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status } = useQuiz();
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-400 opacity-5 rounded-full blur-3xl"></div>

        <Header />

        <Main>
          {status === "selecting" && <CategorySelect />}
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorScreen />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <Questions />

              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}
          {status === "finished" && <FinishScreen />}
        </Main>
      </div>
    </>
  );
}

export default App;
