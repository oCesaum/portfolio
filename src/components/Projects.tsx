import Project from "./Project";

export default function Projects() {
  return (
    <div className="md:grid md:grid-cols-2 gap-0 md:gap-10 lg:gap-20 mx-auto w-fit">
      <Project />
      <Project />
      <Project />
      <Project />
    </div>
  );
};
