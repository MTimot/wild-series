import { useEffect, useState } from "react";
import "./ProgramsIndex.css";

interface Program {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  country: string;
  year: number;
}
function ProgramsIndex() {
  const [programsTab, setProgramsTab] = useState<Program[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((result) => result.json())
      .then((data) => {
        setProgramsTab(data);
      });
  }, []);
  return (
    <>
      <ul className="program-list">
        {programsTab.map((program: Program) => (
          <li key={program.id} className="program-description">
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
          </li>
        ))}
      </ul>
    </>
  );
}
export default ProgramsIndex;
