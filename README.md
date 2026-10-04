# Site do Casamento — Marta & Pedro

Site estático (HTML/CSS/JS). Sem servidor, sem base de dados, sem custos.

```
Site Casamento/
├── index.html          ← a página
├── css/style.css       ← o design
├── js/config.js        ← ⭐ TODOS os textos, horários e links. É só aqui que mexes.
├── js/main.js          ← lógica (não precisas de tocar)
├── assets/img/         ← ilustrações florais tiradas do PPT
├── assets/fotos/       ← (vazio) para as vossas fotografias
└── .nojekyll           ← necessário para o GitHub Pages
```

**Para ver o site agora:** faz duplo-clique no `index.html`.

---

## PASSO 1 — Criar o formulário de RSVP (10 min)

1. Vai a **[forms.google.com](https://forms.google.com)** → **Em branco**.
2. Título: `Confirmação de Presença — Marta & Pedro` · Descrição: `26 de Junho de 2027 · Herdade da Emberiza, Alenquer`
3. Cria estas perguntas (copia tal e qual):

| # | Pergunta | Tipo | Obrigatória |
|---|----------|------|-------------|
| 1 | Nome completo | Resposta curta | ✅ |
| 2 | Email ou telemóvel | Resposta curta | ✅ |
| 3 | Vais estar connosco? | Escolha múltipla: `Sim, não perco por nada` / `Infelizmente não posso` | ✅ |
| 4 | Quantas pessoas vêm no total (incluindo-te)? | Resposta curta | — |
| 5 | Nome dos acompanhantes | Parágrafo | — |
| 6 | Crianças (nome e idade) | Parágrafo | — |
| 7 | Restrições alimentares ou alergias | Parágrafo | — |
| 8 | Uma música que não pode faltar na pista | Resposta curta | — |
| 9 | Precisas de boleia / tens lugares a oferecer? | Escolha múltipla: `Preciso de boleia` / `Tenho lugares` / `Não se aplica` | — |
| 10 | Mensagem para os noivos | Parágrafo | — |

> **Dica:** na pergunta 3 usa **"Ir para a secção com base na resposta"** para quem responde "não" saltar as perguntas 4–9.

4. **Design** (ícone da paleta 🎨, canto superior direito):
   - Cor de destaque → personalizada → `#FFD43A`
   - Cor de fundo → `Branco`
   - Estilo de letra → `Formal`
5. **Respostas** (separador) → ícone verde do Sheets → cria a folha de cálculo. É aí que vais ver tudo.
6. **Enviar** → separador **`< >`** (incorporar HTML) → copia **apenas** o endereço dentro de `src="..."`.
   Fica parecido com:
   `https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true`
7. Abre **`js/config.js`** e cola esse endereço:

```js
googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true",
```

Guarda e recarrega o `index.html`. O formulário aparece dentro do site.

> Se o formulário aparecer cortado no fundo, aumenta `googleFormAltura` no mesmo ficheiro.

---

## PASSO 2 — Pôr o site online no GitHub Pages (10 min)

### 2.1 Criar conta e repositório

1. Cria conta em **[github.com](https://github.com)** (gratuita).
2. Clica no **`+`** (canto superior direito) → **New repository**.
3. Preenche:
   - **Repository name:** `martaepedro`
   - Visibilidade: **Public** ← *tem de ser público para o Pages gratuito funcionar*
   - **Não** marques nenhuma das caixas (`Add a README`, etc.)
4. **Create repository**.

### 2.2 Carregar os ficheiros

Na página que aparece a seguir, clica em **uploading an existing file**.

> ⚠️ **Importante:** arrasta o **conteúdo** da pasta, não a pasta em si.
> Seleciona `index.html`, as pastas `css`, `js`, `assets` e o ficheiro `.nojekyll` — e arrasta tudo para a janela do browser.
>
> Se o `.nojekyll` não aparecer no explorador do Windows: **Ver → Mostrar → Itens ocultos**.
>
> **Não carregues** os ficheiros `.pptx` (são pesados e não fazem falta no site).

Escreve `primeira versão` na caixa de baixo → **Commit changes**.

### 2.3 Ligar o Pages

1. No repositório: **Settings** (menu de cima) → **Pages** (menu da esquerda).
2. Em **Source**, escolhe **Deploy from a branch**.
3. Branch: **`main`** · pasta: **`/ (root)`** → **Save**.
4. Espera 1–2 minutos e atualiza a página. Aparece em cima:

   **Your site is live at `https://<o-teu-utilizador>.github.io/martaepedro/`**

Esse é o link para mandar aos convidados. 🎉

### 2.4 Alterar qualquer coisa mais tarde

No GitHub, clica no ficheiro (ex.: `js/config.js`) → ícone do **lápis** ✏️ → edita → **Commit changes**.
O site atualiza-se sozinho em ~1 minuto.

---

## PASSO 3 (opcional) — Domínio próprio

Se quiserem `martaepedro.pt` em vez do endereço do GitHub:

1. Compra o domínio (ex.: [Amen.pt](https://amen.pt), [PTisp](https://ptisp.pt), [Namecheap](https://namecheap.com)) — ~10–20 €/ano.
2. No painel do registador, nos **registos DNS**, cria:

   | Tipo | Nome | Valor |
   |------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<o-teu-utilizador>.github.io` |

3. No GitHub: **Settings → Pages → Custom domain** → escreve `martaepedro.pt` → **Save**.
4. Espera (pode demorar até 24 h) e depois marca **Enforce HTTPS**.

---

## O que ainda falta preencher

Estes pontos ficaram com texto de exemplo porque a informação não estava no PPT:

- [ ] **`programa`** — já está com o alinhamento do `Timeline.png`, mas três coisas continuam em aberto nesse documento. Escolhi uma de cada:
  - Cerimónia `15h00` **ou** `16h00` → está **16h00**
  - Corte do bolo (3 hipóteses) → está **22h00**
  - Final da festa `02h` / `04h` / `06h` → está **04h00**

  Quando fecharem com a quinta, corrige e mete `programaProvisorio: false` para o aviso amarelo desaparecer.
- [ ] **`historia`** — os três capítulos têm texto de exemplo. Escrevam a vossa história.
- [ ] **`contactos`** — os telemóveis estão a `+351 900 000 000`.
- [ ] **`googleFormUrl`** — ver Passo 1.
- [ ] **Fotografias** — quando tiverem fotos vossas, põem-nas em `assets/fotos/`. Digam-me e eu acrescento uma galeria.

Tudo isto se edita em **`js/config.js`**.

---

## De onde veio o design

Tudo retirado de `Casamento Marta e Pedro_v2.pptx`:

- **Cores** (hex exatos do moodboard): `#FFD43A` girassol · `#9EB7D1` azul hortênsia · `#80968B` verde sálvia
- **Tipos de letra:** *Italiana* e *Lato* — as mesmas da apresentação (+ *Cormorant Garamond* para os textos corridos)
- **Ilustrações:** as florais a traço azul e dourado, extraídas dos slides
- **Tema:** *"Once upon a time…"* / *"…and they lived happily ever after"*
- **Músicas da cerimónia:** o alinhamento do slide 9

> Nota: as fotografias de inspiração do PPT (mesas, buquês, espelhos) **não** foram usadas no site — são imagens de casamentos de outras pessoas, retiradas do Pinterest. Não devem ir para um site público.
