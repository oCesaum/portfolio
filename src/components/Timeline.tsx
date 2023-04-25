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
      description: "Com 17 anos trabalho como auxiliar no TI de uma das maiores empresas das cidades de onde moro. Na Saritur foi onde aprendi na prática como é ser um profícional de TI, controlando não só a empresa na cidade, mas também nas cidades vizinhas por meio de RDP"
    },
    {
      id: 3,
      date: "2021",
      description: "Em meio ao chaos da pandemia tive uma das melhores oportunidades da minha vida, participei do projeto Best Players Club , onde trabalhei como Administrador e PO, vindo a conhecer meu futuro chefe e amigo, quem me insentivou a iniciar na programação."
    },
    {
      id: 4,
      date: "2022",
      description: "Já em 2022 iniciei os estudos em HTML, CSS e Javascript, assim além de Administrador e PO atuei também como programador, fazendo alguns ajustes simples no site. Foi aí que entrei de cabeça e tive o privilégio de poder trabalhar com gosto!"
    },
    {
      id: 5,
      date: "2023",
      description: "Com mais capacidade e experiência estou estudando para dominar o React, Typescript e Next, estudando para me tornar full-stack."
    }
  ]

  return ( 
    <div>
      {timeline.map(element => element &&
        <div className="w-96 p-6 shadow relative shadow-zinc-950 after:absolute after:w-4 after:h-4 after:bg-zinc-950 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2 after:translate-x-1/2 after:border after:border-zinc-300" key={element.id}>
          <p className="font-semibold">{element.date}</p>
          <p>{element.description}</p>
        </div>  
      )}
      <p className="w-2/3 p-6 text-center mx-auto">Programar não é algo tão simples mas é muito satisfatório. Cada vírgula importa e está ali por algum motivo. Sou muito grato de ter esta experiência e poder sonhar com o futuro que me espera, obrigado pela atenção!</p>
    </div>
  );
}
