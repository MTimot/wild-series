import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../components/CategoryForm";

function CategoryEdit() {
  interface Category {
    id: number;
    name: string;
  }
  const { id } = useParams();
  const navigate = useNavigate();

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
      <CategoryForm
        defaultValue={category}
        onSubmit={(categorydata) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categorydata),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/categories/${category.id}`);
            }
          });
        }}
      >
        Modifier
      </CategoryForm>
    )
  );
}

export default CategoryEdit;
