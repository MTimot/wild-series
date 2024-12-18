import { useEffect, useState } from "react";
import "./ProgramsIndex.css";
import { Link } from "react-router-dom";

interface Program {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  country: string;
  year: number;
}
function ProgramsIndex() {
  const [programs, setPrograms] = useState([] as Program[]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, []);
  return (
    <>
      <Link to="/programs/new">Ajouter une série</Link>
      <ul className="program-list">
        {programs.map((program: Program) => (
          <li key={program.id} className="program-description">
            <Link to={`/programs/${program.id}`}>
              <h2 className="program-title">{program.title}</h2>
            </Link>
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
          </li>
        ))}
      </ul>
    </>
  );
}
export default ProgramsIndex;
