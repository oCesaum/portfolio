export default function Timeline() {
  const timeline = [
    {
      id: 1,
      date: "2002",
      description: "Nasce um cara apaixonado por tecnologia!",
    },
    {
      id: 2,
      date: "2020",
      description:
        "Com 18 anos trabalhei como auxiliar de TI em uma das maiores empresas das cidades onde moro, na Saritur tive a oportunidade de aprender, na prática, o trabalho de um profissional de TI, infelizmente fiquei apenas alguns meses, pois, estava no fim do meu contrato e, ao mesmo tempo, a pandemia chegou.",
    },
    {
      id: 3,
      date: "2021",
      description:
        "Em meio ao caos da pandemia tive uma das melhores oportunidades da minha vida, participei do projeto Best Players Club, onde trabalhei como Administrador e PO, vindo a conhecer pessoas extraordinárias, uma delas me incentivou a iniciar na programação, vendo a paixão que demonstrava durante as reuniões.",
    },
    {
      id: 4,
      date: "2022",
      description:
        "Iniciei os estudos em HTML, CSS e Javascript, assim além de Administrador e PO atuei também como Programador Junior, fazendo alguns ajustes simples no site. Foi aí que entrei de cabeça e tive o privilégio de poder iniciar na carreira que sempre foi meu sonho!",
    },
    {
      id: 5,
      date: "2023",
      description:
        "Com mais capacidade e experiência estou estudando para dominar React, Typescript e Next, com objetivo de me tornar inicialmente front-end, e no futuro full-stack.",
    },
  ];

  return (
    <div>
      <div className="relative grid place-content-center gap-y-10 after:absolute after:left-1/2 after:-z-50 after:h-[calc(100%+40px)] after:w-1 after:-translate-y-5 after:rounded-full after:bg-slate-400">
        {timeline.map(
          (element) =>
            element && (
              <div
                className="w-full rounded-md bg-slate-200/95 p-6 text-zinc-900 shadow sm:w-64 md:w-96"
                key={element.id}
              >
                <p className="text-xl font-bold">{element.date}</p>
                <p className="text-center text-lg">{element.description}</p>
              </div>
            )
        )}
        <svg
          className="top-[calc(100%-5px)] h-12 w-12 absolute left-1/2 -translate-x-[1.35rem] fill-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
      </div>
    </div>
  );
}
