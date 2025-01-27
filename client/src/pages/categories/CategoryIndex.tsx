import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Category {
  id: number;
  name: string;
}
function CategoryIndex() {
  const [category, setCategory] = useState([] as Category[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategory(data);
      });
  }, []);

  return (
    <>
      <Link to="/categories/new">Ajouter une catégorie</Link>
      <ul>
        {category.map((category: Category) => (
          <Link to={`/categories/${category.id}`} key={category.id}>
            <li>
              <h2>{category.name}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default CategoryIndex;
