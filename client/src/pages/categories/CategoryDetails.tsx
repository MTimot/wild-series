import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryFormDelete from "../../components/CategoryFormDelete";
interface Category {
  id: number;
  name: string;
}
function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null as null | Category);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    category && (
      <>
        <h2> {category.name}</h2>
        <Link to={`/categories/${category.id}/edit`}>Modifier</Link>
        <CategoryFormDelete id={category.id}>Supprimer</CategoryFormDelete>
      </>
    )
  );
}

export default CategoryDetails;
