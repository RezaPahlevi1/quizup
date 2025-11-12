import { useQuiz } from "../contexts/QuizContext";
import Button from "./Button";

function Questions() {
  const {
    answer,
    dispatch,
    points,
    index,
    numQuestions,
    maxPoints,
    categories,
    questions,
  } = useQuiz();

  if (!categories) return null;
  if (!numQuestions || !Number.isFinite(index)) return null;
  const hasAnswered = answer !== null;

  const question = questions[index];
  if (!question) return null;

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      {/* Progress bar */}
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
        className="w-full h-2.5 appearance-none rounded-full overflow-hidden 
          [&::-webkit-progress-bar]:bg-slate-800 
          [&::-webkit-progress-value]:bg-linear-to-r 
          [&::-webkit-progress-value]:from-cyan-500 
          [&::-webkit-progress-value]:to-purple-600 
          [&::-webkit-progress-value]:shadow-[0_0_8px_rgba(34,211,238,0.4)] 
          [&::-moz-progress-bar]:bg-linear-to-r 
          [&::-moz-progress-bar]:from-cyan-500 
          [&::-moz-progress-bar]:to-purple-600 shadow"
      />

      {/* Header Info */}
      <div className="flex flex-row justify-between items-center pt-8 mb-10">
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

      {/* Pertanyaan */}
      <h2 className="text-3xl font-bold text-slate-100 mb-8 leading-relaxed text-center">
        {question.question}
      </h2>

      {/* Opsi jawaban */}
      <div className="flex flex-col gap-4 items-stretch">
        {question.options.map((opt, i) => (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            key={opt}
            disabled={hasAnswered}
            className={`w-full py-5 px-6 rounded-xl font-medium text-left transition-all duration-200 
              border hover:scale-[0.98] 
              ${
                hasAnswered
                  ? i === question.correctOption
                    ? "bg-green-500/20 border-green-500 text-green-300 shadow-md shadow-green-500/20"
                    : "bg-red-500/20 border-red-500 text-red-300 shadow-md shadow-red-500/20"
                  : "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/20"
              }
              ${answer === i ? "scale-[0.97]" : ""}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Tombol next (spasi dijaga biar gak shifting) */}
      <div className="flex justify-end mt-8 min-h-[64px]">
        {hasAnswered && (
          <Button
            onClick={() =>
              index < questions.length - 1
                ? dispatch({ type: "nextQuestion" })
                : dispatch({ type: "finish" })
            }
          >
            {index < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Questions;
