import type { ReactNode } from "react";

type ProgramData = {
  title: string;
  poster: string;
  synopsis: string;
  country: string;
  year: number;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const poster = formData.get("poster") as string;
          const title = formData.get("title") as string;
          const yearstring = formData.get("year") as string;
          const year = Number.parseInt(yearstring);
          const country = formData.get("country") as string;
          const synopsis = formData.get("synopsis") as string;
          onSubmit({ title, poster, synopsis, year, country });
        }}
      >
        <input
          type="text"
          name="title"
          defaultValue={defaultValue.title}
          placeholder="Title"
        />
        <input
          type="text"
          name="poster"
          defaultValue={defaultValue.poster}
          placeholder="Poster URL"
        />
        <input
          type="text"
          name="synopsis"
          defaultValue={defaultValue.synopsis}
          placeholder="Synopsis"
        />
        <input
          type="text"
          name="year"
          defaultValue={defaultValue.year}
          placeholder="year"
        />
        <input
          type="text"
          name="country"
          defaultValue={defaultValue.country}
          placeholder="country"
        />
        <button type="submit">{children}</button>
      </form>
    </>
  );
}

export default ProgramForm;
