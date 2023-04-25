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
      <div className="grid place-content-center gap-y-10 relative after:absolute after:w-2 after:h-[calc(100%+40px)] after:bg-zinc-400 after:left-1/2 after:-z-50 after:rounded-full after:-translate-y-5">
        {timeline.map((element, index) => element &&
          <div className={`text-sm sm:text-base w-full sm:w-64 md:w-96 p-6 relative bg-zinc-900 rounded-md shadow shadow-zinc-950 sm:after:absolute sm:after:w-6 sm:after:h-6 sm:after:bg-zinc-900 sm:after:rounded-full sm:after:top-1/2 sm:after:outline sm:after:-outline-offset-4 sm:after:outline-zinc-400 ${index % 2 === 0 ? 'sm:mr-3 sm:-translate-x-1/2 sm:after:-translate-y-1/2 sm:after:translate-x-1/2 sm:after:right-0' : 'sm:-mr-2 sm:ml-auto sm:translate-x-1/2 sm:after:-translate-y-1/2 sm:after:-translate-x-1/2 sm:after:left-0'}`} key={element.id}>
            <p className="font-semibold">{element.date}</p>
            <p>{element.description}</p>
          </div>  
        )}
        <svg className="w-12 h-12 fill-zinc-400 absolute top-[calc(100%-5px)] left-1/2 -translate-x-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
      </div>
      <p className="w-2/3 p-6 text-center mx-auto mt-8">Programar não é “algo” tão simples, mas é muito satisfatório! Cada vírgula importa e está ali por algum motivo, sou muito grato por ter esta experiência e poder sonhar com o futuro que me espera!</p>
    </div>
  );
}
