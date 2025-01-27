import type { ReactNode } from "react";

interface CategoryData {
  name: string;
}

interface CategoryForm {
  children: ReactNode;
  defaultValue: CategoryData;
  onSubmit: (Category: CategoryData) => void;
}

function CategoryForm({ children, defaultValue, onSubmit }: CategoryForm) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        onSubmit({ name });
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={defaultValue.name}
      />
      <button type="submit">{children}</button>
    </form>
  );
}

export default CategoryForm;
