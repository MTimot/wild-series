import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgramDeleteForm from "../../components/ProgramDeleteForm";

interface Program {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  country: string;
  year: number;
}
function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <ul>
          <h2>{program.title}</h2>
          <div className="poster-container">
            <img
              src={program.poster}
              alt={`Poster pour ${program.title}`}
              className="poster"
            />
          </div>
          <p className="synopsis">Synopsis : {program.synopsis}</p>
          <p>
            {" "}
            country : {program.country}, year : {program.year}
          </p>
        </ul>
        <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
        <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
      </>
    )
  );
}
export default ProgramDetail;
