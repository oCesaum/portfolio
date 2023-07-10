export function Technology(props: any) {
  return (
    <li className="relative before:absolute before:-left-4 before:top-3 before:block before:h-1 before:w-1 before:rounded-full before:bg-zinc-300">
      {props.technology}
    </li>
  );
}

export default function AdditionalTechnologiesAndSkills() {
  const technologies = [
    { id: 1, name: "Git" },
    { id: 2, name: "Vs Code" },
    { id: 3, name: "Inglês" },
    { id: 4, name: "Product Owner" },
  ];
  return (
    <ul className="flex flex-wrap items-center gap-10 pl-6 text-lg uppercase">
      {technologies.map((tec) => (
        <Technology key={tec.id} technology={tec.name} />
      ))}
    </ul>
  );
}
