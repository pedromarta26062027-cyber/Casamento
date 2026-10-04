/* ============================================================
   Casamento Marta & Pedro — lógica do site
   Lê tudo de js/config.js. Normalmente não precisas de tocar aqui.
   ============================================================ */

(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /** Escapa texto antes de o injetar como HTML. */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));


  /* ──────────────── 1. Preencher campos simples ──────────────── */

  function preencherBasicos() {
    const mapa = {
      "[data-noiva]":       CONFIG.noiva,
      "[data-noivo]":       CONFIG.noivo,
      "[data-data-texto]":  CONFIG.dataTexto,
      "[data-data-curta]":  CONFIG.dataCurta,
      "[data-local]":       CONFIG.local,
      "[data-localidade]":  CONFIG.localidade,
      "[data-prazo]":       CONFIG.rsvpPrazo,
      "[data-traje-titulo]": CONFIG.dressCode.titulo,
      "[data-traje-texto]":  CONFIG.dressCode.texto,
      "[data-historia-intro]": CONFIG.historia.intro,
      "[data-herdade-intro]":  CONFIG.herdade.intro
    };
    for (const [sel, valor] of Object.entries(mapa)) {
      $$(sel).forEach((el) => { el.textContent = valor; });
    }

    document.title = `${CONFIG.noiva} & ${CONFIG.noivo} · ${CONFIG.dataTexto}`;
  }


  /* ──────────────── 2. Navegação ──────────────── */

  function navegacao() {
    const nav    = $("#nav");
    const toggle = $("#navToggle");
    const menu   = $("#navMenu");

    // fundo sólido assim que se faz scroll
    const aoScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 24);
    aoScroll();
    window.addEventListener("scroll", aoScroll, { passive: true });

    // menu mobile
    toggle.addEventListener("click", () => {
      const aberto = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(aberto));
      toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    // fecha ao clicar num link
    $$("a", menu).forEach((a) => a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }


  /* ──────────────── 3. Contagem decrescente ──────────────── */

  function contagem() {
    const caixa = $("#countdown");
    if (!caixa) return;

    const alvo = CONFIG.dataCerimonia.getTime();
    let timer = null;
    const campos = {
      d: $('[data-c="d"]', caixa),
      h: $('[data-c="h"]', caixa),
      m: $('[data-c="m"]', caixa),
      s: $('[data-c="s"]', caixa)
    };

    function tick() {
      const falta = alvo - Date.now();

      if (falta <= 0) {
        caixa.innerHTML =
          '<p style="font-family:var(--serif);font-style:italic;font-size:1.5rem;color:var(--gold);margin:0">' +
          "É hoje. Vemo-nos na Emberiza." +
          "</p>";
        if (timer) clearInterval(timer);
        return;
      }

      const seg = Math.floor(falta / 1000);
      campos.d.textContent = Math.floor(seg / 86400);
      campos.h.textContent = String(Math.floor(seg / 3600) % 24).padStart(2, "0");
      campos.m.textContent = String(Math.floor(seg / 60) % 60).padStart(2, "0");
      campos.s.textContent = String(seg % 60).padStart(2, "0");
    }

    tick();
    timer = setInterval(tick, 1000);
  }


  /* ──────────────── 4. A nossa história ──────────────── */

  function historia() {
    const lista = $("#story");
    if (!lista) return;

    lista.innerHTML = CONFIG.historia.capitulos.map((c) => `
      <li class="story__item reveal">
        <span class="story__ano">${esc(c.ano)}</span>
        <h3 class="story__titulo">${esc(c.titulo)}</h3>
        <p class="story__texto">${esc(c.texto)}</p>
      </li>`).join("");
  }


  /* ──────────────── 5. Programa do dia ──────────────── */

  function programa() {
    const lista  = $("#timeline");
    const secao  = $("#dia");
    if (!lista) return;

    if (!CONFIG.programa || !CONFIG.programa.length) {
      secao.hidden = true;
      $$('a[href="#dia"]').forEach((a) => a.remove());
      return;
    }

    if (CONFIG.programaProvisorio) $("#avisoPrograma").hidden = false;

    lista.innerHTML = CONFIG.programa.map((p) => `
      <li class="timeline__item reveal">
        <time class="timeline__hora">${esc(p.hora)}</time>
        <span class="timeline__spine" aria-hidden="true"></span>
        <div>
          <h3 class="timeline__titulo">${esc(p.titulo)}</h3>
          ${p.texto ? `<p class="timeline__texto">${esc(p.texto)}</p>` : ""}
        </div>
      </li>`).join("");
  }


  /* ──────────────── 6. Local, mapa e como chegar ──────────────── */

  function local() {
    const morada = encodeURIComponent(CONFIG.morada);

    const mapa = $("#mapa");
    if (mapa) mapa.src = `https://www.google.com/maps?q=${morada}&z=13&output=embed`;

    const btn = $("#btnMapa");
    if (btn) btn.href = `https://www.google.com/maps/search/?api=1&query=${morada}`;

    const lista = $("#comoChegar");
    if (lista) {
      lista.innerHTML = CONFIG.comoChegar.map((c) => `
        <li class="reveal">
          <h3 class="cards__titulo">${esc(c.titulo)}</h3>
          <p class="cards__texto">${esc(c.texto)}</p>
        </li>`).join("");
    }

    // números sobre a herdade
    const factos = $("#factos");
    if (factos) {
      factos.innerHTML = CONFIG.herdade.factos.map((f) => `
        <li>
          <b class="factos__numero">${esc(f.numero)}</b>
          <span class="factos__label">${esc(f.label)}</span>
        </li>`).join("");
    }

    // os espaços da herdade
    const espacos = $("#espacos");
    if (espacos) {
      espacos.innerHTML = CONFIG.herdade.espacos.map((e) => `
        <li class="espacos__item reveal">
          <h3 class="espacos__titulo">${esc(e.titulo)}</h3>
          <p class="espacos__texto">${esc(e.texto)}</p>
        </li>`).join("");
    }
  }


  /* ──────────────── 6b. Galeria ──────────────── */

  function galeria() {
    const lista = $("#galeria");
    if (!lista) return;

    if (!CONFIG.galeria || !CONFIG.galeria.length) {
      $("#galeria").closest("section").hidden = true;
      $$('a[href="#galeria"]').forEach((a) => a.remove());
      return;
    }

    lista.innerHTML = CONFIG.galeria.map((f) => `
      <li class="galeria__item${f.destaque ? " galeria__item--wide" : ""} reveal">
        <img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy" decoding="async">
      </li>`).join("");
  }


  /* ──────────────── 7. Traje e paleta ──────────────── */

  function traje() {
    const dicas = $("#dicas");
    if (dicas) {
      dicas.innerHTML = CONFIG.dressCode.dicas
        .map((d) => `<li>${esc(d)}</li>`).join("");
    }

    const paleta = $("#paleta");
    if (paleta) {
      paleta.innerHTML = CONFIG.paleta.map((c) => `
        <li>
          <span class="paleta__swatch" style="background:${esc(c.hex)}"></span>
          <span class="paleta__nome">${esc(c.nome)}</span>
          <span class="paleta__hex">${esc(c.hex)}</span>
        </li>`).join("");
    }
  }


  /* ──────────────── 8. Músicas ──────────────── */

  function musicas() {
    const lista = $("#musicas");
    if (!lista) return;

    lista.innerHTML = CONFIG.musicas.map((m) => `
      <li class="reveal">
        <span class="musicas__momento">${esc(m.momento)}</span>
        <span class="musicas__titulo">${esc(m.musica)}</span>
      </li>`).join("");
  }


  /* ──────────────── 9. RSVP ──────────────── */

  function rsvp() {
    const caixa = $("#rsvpBox");
    if (!caixa) return;

    const url = (CONFIG.googleFormUrl || "").trim();

    // Ainda não configurado → instruções (visíveis só até colares o link)
    if (!url) {
      caixa.className = "rsvp rsvp--todo";
      caixa.innerHTML = `
        <h3>Falta ligar o formulário</h3>
        <p><strong>Esta caixa só aparece porque ainda não colaste o link do Google Forms.</strong>
           Assim que o fizeres, o formulário aparece aqui e esta mensagem desaparece.</p>
        <ol>
          <li>Cria o formulário em <code>forms.google.com</code> (as perguntas sugeridas estão no <code>README.md</code>).</li>
          <li>Clica em <strong>Enviar</strong> &rarr; separador <code>&lt; &gt;</code> (incorporar HTML).</li>
          <li>Copia <em>apenas</em> o endereço que está dentro de <code>src="..."</code>.</li>
          <li>Abre <code>js/config.js</code> e cola-o em <code>googleFormUrl</code>.</li>
        </ol>
        <a class="btn btn--line" href="https://forms.google.com" target="_blank" rel="noopener">Criar formulário</a>`;
      return;
    }

    caixa.className = "rsvp";
    caixa.innerHTML = `
      <iframe
        src="${esc(url)}"
        height="${Number(CONFIG.googleFormAltura) || 1400}"
        title="Formulário de confirmação de presença"
        loading="lazy">A carregar o formulário&hellip;</iframe>`;
  }


  /* ──────────────── 10. FAQ ──────────────── */

  function faq() {
    const lista = $("#faqList");
    if (!lista) return;

    lista.innerHTML = CONFIG.faq.map((f) => `
      <details class="reveal">
        <summary>${esc(f.p)}</summary>
        <p class="faq__resposta">${esc(f.r)}</p>
      </details>`).join("");
  }


  /* ──────────────── 11. Contactos ──────────────── */

  function contactos() {
    const lista = $("#contactos");
    if (!lista) return;

    const itens = CONFIG.contactos.map((c) => {
      const tel = c.telefone.replace(/\s+/g, "");
      return `<li>${esc(c.nome)} &middot; <a href="tel:${esc(tel)}">${esc(c.telefone)}</a></li>`;
    });

    if (CONFIG.email) {
      itens.push(`<li><a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a></li>`);
    }

    lista.innerHTML = itens.join("");
  }


  /* ──────────────── 12. Revelar ao fazer scroll ──────────────── */

  function revelar() {
    const alvos = $$(".reveal");
    if (!alvos.length) return;

    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      alvos.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e, i) => {
        if (!e.isIntersecting) return;
        // pequeno desfasamento entre elementos vizinhos
        setTimeout(() => e.target.classList.add("is-in"), i * 70);
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    alvos.forEach((el) => obs.observe(el));
  }


  /* ──────────────── Arranque ──────────────── */

  function iniciar() {
    if (typeof CONFIG === "undefined") {
      console.error("config.js não foi carregado.");
      return;
    }
    preencherBasicos();
    navegacao();
    contagem();
    historia();
    programa();
    local();
    galeria();
    traje();
    musicas();
    rsvp();
    faq();
    contactos();
    revelar();   // por último: já existem os elementos criados acima
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
