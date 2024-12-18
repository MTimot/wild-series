import { useNavigate } from "react-router-dom";
import ProgramForm from "./ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();
  const newprogram = {
    title: "",
    poster: "",
    synopsis: "",
    year: 0,
    country: "",
  };
  return (
    <>
      <ProgramForm
        defaultValue={newprogram}
        onSubmit={(programData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(programData),
          })
            .then((response) => response.json())
            .then((data) => {
              navigate(`/programs/${data.insertId}`);
            });
        }}
      >
        Ajouter
      </ProgramForm>
    </>
  );
}
export default ProgramNew;
