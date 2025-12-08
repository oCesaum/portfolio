interface TechnologyProps {
  technology: string;
}

export function Technology({ technology }: TechnologyProps) {
  return (
    <li className="relative before:absolute before:-left-4 before:top-3 before:block before:h-1 before:w-1 before:rounded-full before:bg-slate-300">
      {technology}
    </li>
  );
}

interface TechnologyItem {
  id: number;
  name: string;
}

export default function AdditionalTechnologiesAndSkills() {
  const technologies: TechnologyItem[] = [
    { id: 1, name: "Git" },
    { id: 2, name: "Vs Code" },
    { id: 3, name: "Inglês" },
    { id: 4, name: "Product Owner" },
    { id: 5, name: "PHP" },
    { id: 6, name: "WordPress" },
    { id: 7, name: "npm" },
  ];
  return (
    <ul className="flex flex-wrap items-center gap-10 pl-6 text-lg uppercase">
      {technologies.map((tec) => (
        <Technology key={tec.id} technology={tec.name} />
      ))}
    </ul>
  );
}
