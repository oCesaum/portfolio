export default function Timeline() {
  const timeline = [
    {
      id: 1,
      date: "2002",
      description: "Nasce um cara apaixonado por tecnologia!"
    },
    {
      id: 2,
      date: "2019",
      description: "Com 17 anos trabalhei como auxiliar de TI em uma das maiores empresas das cidades onde moro, na Saritur foi onde aprendi, na prática, como é ser um profissional de TI, controlando não só a empresa na cidade de Ipatinga, mas também em cidades vizinhas por meio do protocolo (RDP)."
    },
    {
      id: 3,
      date: "2021",
      description: "Em meio ao caos da pandemia tive uma das melhores oportunidades da minha vida, participei do projeto Best Players Club , onde trabalhei como Administrador e PO, vindo a conhecer pessoas extraordinárias, onde uma delas me incentivou a iniciar na programação."
    },
    {
      id: 4,
      date: "2022",
      description: "Já em 2022 iniciei os estudos em HTML, CSS e Javascript, assim além de Administrador e PO atuei também como programador, fazendo alguns ajustes simples no site. Foi aí que entrei de cabeça e tive o privilégio de poder trabalhar com gosto!"
    },
    {
      id: 5,
      date: "2023",
      description: "Com mais capacidade e experiência estou estudando para dominar React, Typescript e Next, com objetivo de me tornar full-stack."
    }
  ]

  return ( 
    <div>
      <div className="grid place-content-center gap-y-14">
        {timeline.map((element, index) => element &&
          <div className={`w-96 p-6 relative shadow shadow-zinc-950 after:absolute after:w-5 after:h-5 after:bg-zinc-900 after:rounded-full after:top-1/2 after:outline after:-outline-offset-4 after:outline-zinc-300 ${index % 2 === 0 ? '-translate-x-1/2 after:-translate-y-1/2 after:translate-x-1/2 after:right-0' : 'ml-auto translate-x-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:left-0'}`} key={element.id}>
            <p className="font-semibold">{element.date}</p>
            <p>{element.description}</p>
          </div>  
        )}
      </div>
      <p className="w-2/3 p-6 text-center mx-auto">Programar não é “algo” tão simples, mas é muito satisfatório! Cada vírgula importa e está ali por algum motivo, sou muito grato por ter esta experiência e poder sonhar com o futuro que me espera!</p>
    </div>
  );
}
