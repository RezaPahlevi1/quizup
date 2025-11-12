import Button from "./Button";

function FinishScreen({ maxPoints, points, highscore, dispatch }) {
  return (
    <div className="text-center flex flex-col gap-5 text-white mt-10">
      <div className="inline-block bg-linear-to-r from-cyan-500/20 via-blue-600/20 to-purple-700/20 border border-cyan-500/40 backdrop-blur-md px-8 py-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <h2 className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Quiz Finished 🎉 Highscore: {highscore}
        </h2>
        <p className="text-xl font-medium text-slate-200">
          Your Points:{" "}
          <span className="text-cyan-400 font-semibold">{points}</span> /{" "}
          <span className="text-blue-400 font-semibold">{maxPoints}</span>
        </p>
      </div>
      <Button onClick={() => dispatch({ type: "reset" })}>Reset Quiz</Button>
    </div>
  );
}

export default FinishScreen;
