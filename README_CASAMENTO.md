# Marta & Pedro · 26 de junho de 2027

Website de casamento com convite em envelope animado, contagem decrescente, programa, mapas, RSVP e perguntas frequentes. Texto em português de Portugal.

## Confirmado

- Nomes e data: Marta e Pedro, 26/06/2027, conforme o PowerPoint enviado.
- Herdade da Emberiza, Alenquer.
- Chegada às 15h; cerimónia às 15h30 na herdade, ao ar livre.
- Prazo de resposta: 30/04/2027, até às 23:59, hora de Lisboa.
- Paleta inspirada no PowerPoint: verde, azul, dourado/amarelo e branco.
- Aguarela da Herdade criada a partir das fotografias reais do jardim e da cerimónia. Fotografias da Herdade e dos bouquets retiradas da página.
- Três espaços reservados para a sessão de noivado, em `lib/wedding.ts` → `engagementPhotos`.
- Referência tipográfica: New Icon Script e New Icon Serif. Por serem fontes comerciais cujos ficheiros ainda não foram fornecidos, o site usa provisoriamente Great Vibes e Instrument Serif, com Montserrat nos botões e na navegação. Monograma M&P fornecido pelos noivos aplicado no cabeçalho.

## Antes de enviar aos convidados

1. Preencher os contactos de Marta e Pedro em `lib/wedding.ts`.
2. Confirmar com a quinta as coordenadas do portão e as instruções do último quilómetro. Os mapas usam as coordenadas publicadas 39.06388, -9.01451; o aviso sobre o último quilómetro foi mantido a pedido dos noivos. Referência: https://portugal.worldplaces.me/view-place/52265056-herdade-da-emberiza-cottage-weddings.html
3. Horários atualizados pelos noivos: cocktail às 16h30, corte do bolo às 23h, abertura da pista às 23h30 e fim às 03h. O buffet mantém-se às 23h e a ceia à 01h. Os avisos de horários pendentes foram retirados a pedido dos noivos.
4. Rever a resposta sobre acompanhantes. As perguntas sobre crianças, fotografias e prendas foram retiradas a pedido dos noivos.
5. Alterar o acesso do site para os convidados quando estiver pronto. A primeira publicação é privada.

## Respostas de presença

A publicação online guarda as respostas numa base de dados D1, na tabela `rsvps`. Não usa armazenamento do navegador para confirmar presença. Não existe uma página pública que liste respostas ou dados de outros convidados.

Uma resposta por convite. O mesmo email/telemóvel atualiza a resposta existente. Responder “Não vou conseguir ir” omite os acompanhantes, crianças, alergias, boleias e mensagem. O servidor ignora esses campos mesmo que um pedido os inclua. As respostas só são confirmadas depois de gravadas com sucesso.

Para consultar ou exportar as respostas, pedir ao ChatGPT a listagem de RSVP deste site. Nenhuma resposta é enviada automaticamente por email.

## Ficheiros principais

- `app/page.tsx`: conteúdo e interações da página; gera o HTML do site.
- `app/globals.css`: estilos, envelope, animações e adaptação a telemóvel.
- `lib/wedding.ts`: data, prazo, coordenadas e contactos.
- `lib/rsvp.ts`: validação das respostas.
- `app/api/rsvp/route.ts`: gravação segura e tratamento de erros.
- `db/schema.ts` e `drizzle/`: estrutura e migrações da base de dados.
- `public/`: imagens e ícone.
- `html/index.html`, `html/styles.css` e `html/app.js`: cópia visual para pré-visualização por servidor HTTP. O RSVP desta cópia só funciona se for servido com o backend.

## Executar o projeto

Node.js 22 ou superior e pnpm. Instalar com `pnpm install --frozen-lockfile` e iniciar com `pnpm dev`. Para compilar: `pnpm build`. O servidor e a base de dados devem estar configurados para receber respostas; servir apenas HTML/CSS não substitui o backend.

A hora do casamento e o prazo incluem o fuso de verão de Lisboa (+01:00). O envelope respeita a preferência de redução de movimento. O formulário e o menu são utilizáveis por teclado, com erros e confirmações acessíveis.

## Pré-visualização HTML

A pasta `html` contém HTML, CSS e JavaScript autónomos. Nessa pasta, iniciar `python -m http.server 8000` e abrir http://localhost:8000. O envelope, a contagem, o menu e as perguntas funcionam nesta pré-visualização. A gravação do RSVP requer o backend do projeto, não incluído no servidor estático de Python.

## Fotografias do espaço

Fotografias usadas apenas como referência para a aguarela: página oficial https://herdadedaemberiza.pt/

- Cerimónia: https://herdadedaemberiza.pt/esinsagy/2024/01/slider-4.webp
- Jardim: https://herdadedaemberiza.pt/esinsagy/2024/01/festa_casamento_diferente_.webp

A aguarela é uma interpretação artística gerada com imagegen do jardim, pinheiros, piscina, luzes e paisagem real da Herdade. Não representa a decoração final do casamento. Ficheiro: `public/emberiza-aguarela.webp`.

Os passarinhos são a imagem original enviada pelos noivos, apresentada com enquadramento CSS sem alterar o desenho. “Once upon a time...” é texto HTML editável. A galeria de noivado mantém os três espaços para fotos, sem título visível.

## Tipografia

Fontes alojadas localmente em `public/fonts/`, obtidas no Google Fonts. Licenças SIL Open Font License incluídas nessa pasta.

- Great Vibes: https://github.com/google/fonts/tree/main/ofl/greatvibes
- Instrument Serif: https://github.com/google/fonts/tree/main/ofl/instrumentserif
- Montserrat: https://github.com/google/fonts/tree/main/ofl/montserrat

Fontes exatas pendentes: New Icon Script e New Icon Serif, https://setsailstudios.com/downloads/new-icon-font-duo/ . Integrar os ficheiros licenciados quando forem enviados.

## V2

A aguarela está aplicada como fundo da secção inicial, por detrás dos nomes, detalhes e contagem decrescente. Uma camada clara mantém a leitura dos textos. A V1 está preservada no Google Drive; alterações seguintes são guardadas apenas na V2.

O campo opcional “Outros comentários” é guardado com a resposta de presença, incluindo quando o convidado não pode vir.

O RSVP inclui uma secção “Alimentação”, visível logo ao abrir o formulário e omitida apenas quando se escolhe não comparecer, que pede intolerâncias, alergias, alimentação vegan, vegetariana e outras necessidades por pessoa. Usa o campo `dietary` existente.

O fundo da secção inicial usa a aguarela horizontal enviada pelos noivos (`public/emberiza-aguarela-inicio.png`), mantendo a imagem atrás dos nomes e do timer. O monograma foi reduzido cerca de 20% no computador e no telemóvel.
