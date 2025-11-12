function Questions({
  answer,
  dispatch,
  points,
  index,
  numQuestions,
  maxPoints,
  categories,
}) {
  if (!categories) return null;
  if (!numQuestions || !Number.isFinite(index)) return null;
  const hasAnswered = answer !== null;
  return (
    <>
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
        className="w-1/2 h-2.5 appearance-none rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-slate-800 [&::-webkit-progress-value]:bg-linear-to-r [&::-webkit-progress-value]:from-cyan-500 [&::-webkit-progress-value]:to-purple-600 [&::-webkit-progress-value]:shadow-[0_0_8px_rgba(34,211,238,0.4)] [&::-moz-progress-bar]:bg-linear-to-r [&::-moz-progress-bar]:from-cyan-500 [&::-moz-progress-bar]:to-purple-600 shadow"
      />

      <div className="flex flex-row gap-4 justify-between pt-10 mb-12">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📝</span>
          <p className="text-slate-400 text-sm font-medium">
            Question{" "}
            <span className="text-cyan-400 font-bold text-lg">{index + 1}</span>
            <span className="text-slate-600 mx-1.5">/</span>
            <span className="text-slate-500">{numQuestions}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⭐</span>
          <p className="text-slate-400 text-sm font-medium">
            <span className="text-cyan-400 font-bold text-lg">{points}</span>
            <span className="text-slate-600 mx-1.5">/</span>
            <span className="text-slate-500">{maxPoints}</span>
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-100 mb-10 leading-relaxed">
        {categories.question}
      </h2>

      <div className="flex flex-col space-y-4 max-w-md mx-auto w-full">
        {categories.options.map((opt, index) => (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={opt}
            disabled={hasAnswered}
            className={`${answer === index ? "scale-95" : ""} ${
              hasAnswered
                ? index === categories.correctOption
                  ? "bg-green-500/20 border-green-500 text-green-300 shadow-lg shadow-green-500/20"
                  : "bg-red-500/20 border-red-500 text-red-300 shadow-lg shadow-red-500/20"
                : ""
            } py-4 px-6 rounded-lg font-medium transition-all duration-200 text-left border hover:scale-95 bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/20`}
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

export default Questions;
