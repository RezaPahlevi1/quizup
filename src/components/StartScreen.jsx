import Button from "./Button";

function StartScreen({ numQuestions, dispatch }) {
  function handleStartGame() {
    dispatch({ type: "gameStart" });
  }
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] px-6 text-center">
      <div className="max-w-2xl">
        <div className="w-28 h-28 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-cyan-500/30">
          <span className="text-6xl">🎯</span>
        </div>
        <h2 className="text-4xl font-bold text-slate-100 mb-6">
          Welcome to QuizUp!
        </h2>
        <p className="text-lg text-slate-400 leading-relaxed mb-10">
          Finish {numQuestions} questions in this quiz and you'll get.. nothing.
          This is just a react training website for me. Leave a feedback for my
          experience.
        </p>
        <Button onClick={handleStartGame}>Start Quiz</Button>
      </div>
    </div>
  );
}

export default StartScreen;
