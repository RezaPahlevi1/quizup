function Button({ onClick, children, variant = "primary" }) {
  const baseStyles =
    "px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 transform hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40",
    secondary:
      "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
