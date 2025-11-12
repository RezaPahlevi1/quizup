function CategorySelect({ dispatch, categories }) {
  return (
    <div className="text-center text-white space-y-6">
      <h2 className="text-3xl font-bold">Choose a Quiz Category</h2>
      <div className="flex justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch({ type: "categorySelected", payload: cat })}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelect;
