import { Link } from "react-router-dom";

// Inside the map function:
<Link
  to={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
>
  View Recipe
</Link>
