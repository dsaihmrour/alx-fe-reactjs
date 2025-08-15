import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split("\n").length < 2)
      newErrors.ingredients = "Enter at least 2 ingredients (one per line)";
    if (!instructions.trim() || instructions.split("\n").length < 2)
      newErrors.instructions = "Enter at least 2 steps (one per line)";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      summary: instructions.split("\n")[0],
      image: "https://via.placeholder.com/150",
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
    };

    if (onAddRecipe) onAddRecipe(newRecipe);

    setTitle("");
    setIngredients("");
    setInstructions("");
    setErrors({});

    alert("Recipe submitted!");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 max-w-2xl">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        &larr; Back to Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">Add New Recipe</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredients (one per line)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="5"
            className={`w-full px-3 py-2 border rounded ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Instructions (one per line)</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="5"
            className={`w-full px-3 py-2 border rounded ${
              errors.instructions ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
