/* ============================================================
   CONFIGURAÇÃO DO SITE — Casamento Marta & Pedro
   ------------------------------------------------------------
   É AQUI que editas tudo. Não precisas de mexer em mais nenhum
   ficheiro para mudar textos, horários, músicas ou o link do RSVP.
   Guarda o ficheiro e atualiza a página no browser.
   ============================================================ */

const CONFIG = {

  /* ---------- NOIVOS E DATA ---------- */
  noiva: "Marta",
  noivo: "Pedro",

  // Data e hora do início da cerimónia (formato: ano, mês-1, dia, hora, minuto)
  // ATENÇÃO: o mês começa em 0 → Junho = 5
  dataCerimonia: new Date(2027, 5, 26, 16, 0),
  dataTexto: "26 de Junho de 2027",
  dataCurta: "26.06.2027",

  local: "Herdade da Emberiza",
  localidade: "Alenquer",

  // Morada completa para o mapa e para o botão "Como chegar"
  morada: "Herdade da Emberiza, Alenquer, Portugal",


  /* ---------- RSVP ----------------------------------------
     Cola aqui o link do teu Formulário Google.
     Como obter: no Google Forms → botão "Enviar" → separador < >
     (incorporar HTML) → copia só o endereço que está em src="..."
     Fica com este aspeto:
     https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true

     Enquanto estiver vazio (""), o site mostra um aviso só para ti.
     Vê o README.md para as perguntas sugeridas do formulário.
  --------------------------------------------------------- */
  googleFormUrl: "",

  // Altura do formulário embutido, em pixéis. Se o formulário ficar
  // cortado no fim, aumenta este número.
  googleFormAltura: 1400,

  // Data limite para confirmar presença
  rsvpPrazo: "30 de Abril de 2027",


  /* ---------- CONTACTOS (rodapé e dúvidas) ---------- */
  contactos: [
    { nome: "Marta",  telefone: "+351 900 000 000" },
    { nome: "Pedro",  telefone: "+351 900 000 000" }
  ],
  email: "",   // opcional, ex: "martaepedro2027@gmail.com"


  /* ---------- A NOSSA HISTÓRIA ----------------------------
     Edita os textos à vontade. Podes acrescentar ou apagar
     capítulos — o site adapta-se sozinho.
  --------------------------------------------------------- */
  historia: {
    intro: "Era uma vez dois miúdos que não faziam ideia de onde é que isto ia dar.",
    capitulos: [
      {
        ano: "O primeiro capítulo",
        titulo: "Como nos conhecemos",
        texto: "Escreve aqui a vossa história — onde se conheceram, o que aconteceu, aquele detalhe que ainda hoje dá vontade de rir."
      },
      {
        ano: "O nó da história",
        titulo: "O pedido",
        texto: "Conta como foi o pedido de casamento: onde, quando, quem chorou primeiro."
      },
      {
        ano: "26.06.2027",
        titulo: "E viveram felizes para sempre",
        texto: "E agora queremos ter-vos connosco no dia em que começa o resto da história."
      }
    ]
  },


  /* ---------- PROGRAMA DO DIA ------------------------------
     Baseado no Timeline.png (sugestão da Herdade da Emberiza).

     ⚠️ Há três coisas ainda por fechar nesse documento:
        · Cerimónia: 15h00 OU 16h00   → aqui está 16h00
        · Corte do bolo: logo após a cerimónia, 22h00 ou 24h00
                                      → aqui está 22h00
        · Final da festa: 02h00 / 04h00 / 06h00
                                      → aqui está 04h00
     Quando fecharem, corrige em baixo e mete
     programaProvisorio: false  (faz desaparecer o aviso amarelo).

     Nota: o check-in (12h00) e a preparação dos noivos (12h00–15h00)
     não entram aqui de propósito — são só para vocês, não para os
     convidados. Se quiserem mostrar, é só acrescentar à lista.

     Para esconder a secção toda, mete: programa: []
  --------------------------------------------------------- */
  programaProvisorio: true,   // mete false quando confirmares as horas
  programa: [
    { hora: "15:30", titulo: "Chegada dos convidados", texto: "Venham com tempo. Há sombra, há água fresca e há abraços." },
    { hora: "16:00", titulo: "Cerimónia no pinhal",    texto: "O momento. Pedimos-vos só uma coisa: telemóveis no bolso." },
    { hora: "17:00", titulo: "Cocktail de boas-vindas", texto: "Até às 19h00. Copo na mão, pés na relva, fotografias com toda a gente." },
    { hora: "19:30", titulo: "Jantar",                 texto: "Até às 21h30. Procurem o vosso nome no espelho à entrada da sala." },
    { hora: "22:00", titulo: "Corte do bolo",          texto: "Com fogo de chão. Vale muito a pena estar lá fora." },
    { hora: "22:30", titulo: "Abertura da pista",      texto: "Sapatos confortáveis recomendam-se." },
    { hora: "23:00", titulo: "Mesas de buffet",        texto: "Para quem precisar de combustível a meio da noite." },
    { hora: "01:00", titulo: "Ceia",                   texto: "A última paragem antes da reta final." },
    { hora: "04:00", titulo: "Final da festa",         texto: "Ou quando o último convidado desistir." }
  ],


  /* ---------- DRESS CODE ---------- */
  dressCode: {
    titulo: "Traje de cerimónia",
    texto: "Um casamento de conto de fadas no meio de um pinhal. Vistam-se a preceito, mas pensem nos pés: a cerimónia e o cocktail são ao ar livre, em terra batida e relva.",
    dicas: [
      "Senhoras: cuidado com saltos muito finos — ao ar livre afundam.",
      "Junho em Alenquer é quente de dia e fresco à noite. Tragam um casaco leve.",
      "Deixem o branco para a noiva. O resto da paleta é toda vossa."
    ]
  },


  /* ---------- PALETA DE CORES (do PPT) ---------- */
  paleta: [
    { hex: "#FFD43A", nome: "Girassol" },
    { hex: "#9EB7D1", nome: "Azul hortênsia" },
    { hex: "#80968B", nome: "Verde sálvia" },
    { hex: "#F6EFD9", nome: "Creme" },
    { hex: "#BE9254", nome: "Dourado" }
  ],


  /* ---------- MÚSICAS DA CERIMÓNIA (do PPT) ---------- */
  musicas: [
    { momento: "Entrada do noivo",                          musica: "Oceans" },
    { momento: "Pai do noivo e mãe da noiva / Padrinhos",   musica: "Holy — Justin Bieber" },
    { momento: "Cavalheiros e damas de honor",              musica: "Viva La Vida — Coldplay" },
    { momento: "Menina das flores",                         musica: "Viva La Vida — Coldplay" },
    { momento: "Entrada da noiva",                          musica: "This Is How You Fall In Love — Jeremy Zucker" },
    { momento: "Saída dos noivos",                          musica: "Accidentally In Love — Counting Crows" },
    { momento: "Entrada na sala",                           musica: "Best Day Of My Life — American Authors" },
    { momento: "Corte do bolo",                             musica: "All My Love — Coldplay" },
    { momento: "Primeira dança",                            musica: "I Won't Give Up — Jason Mraz" },
    { momento: "Buquê",                                     musica: "You've Got The Love — Florence + The Machine" }
  ],


  /* ---------- PERGUNTAS FREQUENTES ---------- */
  faq: [
    {
      p: "Posso levar acompanhante?",
      r: "O convite indica quantos lugares estão reservados em vosso nome. Se tiverem dúvidas, liguem-nos — resolve-se numa conversa."
    },
    {
      p: "E as crianças?",
      r: "São bem-vindas. Indiquem-nas no RSVP com a idade, para prepararmos a refeição e a mesa delas."
    },
    {
      p: "Tenho restrições alimentares.",
      r: "Escrevam tudo no RSVP — vegetariano, alergias, intolerâncias. Passamos ao catering."
    },
    {
      p: "Há estacionamento?",
      r: "Sim, a herdade tem estacionamento próprio e gratuito no local."
    },
    {
      p: "Posso tirar fotografias na cerimónia?",
      r: "Durante a cerimónia, não. Temos fotógrafo e queremos ver as vossas caras, não os vossos telemóveis. Depois disso, fotografem tudo."
    },
    {
      p: "Que prendas?",
      r: "A vossa presença já é muito. Se insistirem, falem connosco."
    }
  ],


  /* ---------- COMO CHEGAR ---------- */
  comoChegar: [
    { titulo: "De carro",  texto: "A 38 km de Lisboa, cerca de 40 minutos pela A1 (saída Carregado) ou A8. Morada para o GPS: Estrada da Quinta do Barreiro n.º 11, 2580-377 Alenquer." },
    { titulo: "Estacionamento", texto: "A herdade tem estacionamento próprio e gratuito à entrada. Não é preciso chegar cedo por causa de lugares." },
    { titulo: "Boleias",   texto: "Se vierem de Lisboa e tiverem lugares a mais no carro, digam-nos no RSVP. Ajudamos a combinar boleias." },
    { titulo: "Dormida",   texto: "Alenquer, Carregado e Vila Franca de Xira têm alojamento a poucos minutos. Se precisarem de sugestões, falem connosco." }
  ],


  /* ---------- SOBRE A HERDADE ----------------------------
     Informação recolhida do site oficial herdadedaemberiza.pt
  --------------------------------------------------------- */
  herdade: {
    intro: "Vinte e cinco hectares na Paisagem Protegida da Serra de Montejunto, na mesma família desde 1881. A casa principal é de 1932 e foi recuperada sem perder o que tinha de bom. Lá de cima vê-se o Tejo e a lezíria ribatejana toda — e é precisamente ali, ao fim da tarde, que nos vamos casar.",
    factos: [
      { numero: "25",   label: "hectares de herdade" },
      { numero: "1881", label: "na mesma família desde" },
      { numero: "38",   label: "km até Lisboa" },
      { numero: "1",    label: "casamento por dia. O nosso." }
    ],
    espacos: [
      { titulo: "O pinhal",            texto: "Onde vai ser a cerimónia. Relva, pinheiros e a lezíria inteira em pano de fundo." },
      { titulo: "O salão envidraçado", texto: "Vista panorâmica de 360º. É onde se janta, quando o sol se começa a pôr." },
      { titulo: "O jardim e a piscina", texto: "O cocktail é aqui, debaixo das oliveiras. À noite acendem-se as luzes de festão." },
      { titulo: "O picadeiro",         texto: "A Emberiza cria cavalos lusitanos puro-sangue. Fazem parte da casa." }
    ]
  },


  /* ---------- GALERIA ------------------------------------
     Fotografias da Herdade da Emberiza (site oficial).
     Para acrescentar fotos vossas: põe o ficheiro em
     assets/fotos/ e junta uma linha aqui com o caminho.
  --------------------------------------------------------- */
  galeria: [
    { src: "assets/herdade/altar-vista.webp",      alt: "O altar hexagonal de madeira com vista sobre a lezíria", destaque: true },
    { src: "assets/herdade/festa-piscina.webp",    alt: "Convidados junto à piscina ao anoitecer, com luzes de festão", destaque: true },
    { src: "assets/herdade/chapeus-oliveira.webp", alt: "Chapéus de palha pendurados numa oliveira" },
    { src: "assets/herdade/mesa-posta.webp",       alt: "Mesa posta com eucalipto e menu" },
    { src: "assets/herdade/picadeiro.webp",        alt: "Cavalo lusitano no picadeiro da herdade" },
    { src: "assets/herdade/buque-piano.webp",      alt: "Buquê de noiva pousado num piano antigo" },
    { src: "assets/herdade/aliancas-piano.webp",   alt: "Alianças sobre as teclas de um piano" },
    { src: "assets/herdade/livro-memorias.webp",   alt: "Globo dourado e livro de memórias" }
  ]
};
