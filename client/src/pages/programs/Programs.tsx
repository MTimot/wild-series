import { useEffect, useState } from "react";
interface Program {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  country: string;
  year: number;
}
function Programs() {
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
      {programsTab.map((program: Program) => (
        <ul key={program.id}>
          <li>
            <h2>{program.title}</h2>
            <img src={program.poster} alt={`Poster pour ${program.title}`} />
            <p>Synopsis : {program.synopsis}</p>
            <p>
              {" "}
              country : {program.country}, year : {program.year}
            </p>
          </li>
        </ul>
      ))}
    </>
  );
}
export default Programs;
