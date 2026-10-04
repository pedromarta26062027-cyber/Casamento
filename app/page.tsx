"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarDays, Camera, MapPin, Trees, Car, BedDouble, Heart, Navigation, Check, Mail, Sparkles, Menu, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { wedding } from "@/lib/wedding";

const programme = [
  ["15h", "Chegada dos convidados", "Vamos começar a juntar a nossa gente."],
  ["15h30", "O nosso sim", "Cerimónia na herdade, ao ar livre."],
  ["16h30", "Cocktail no jardim", "Um brinde, conversas e tempo para aproveitar."],
  ["19h30", "Jantar", "No salão entre as árvores."],
  ["23h", "Corte do bolo", ""],
  ["23h", "Buffet", ""],
  ["23h30", "Abertura da pista", "É tempo de dançar."],
  ["01h", "Ceia", "Para recuperar energias."],
  ["03h", "Fim previsto", "Depois de uma noite de memórias."],
];
const questions = [
  ["Até quando devemos responder?", "Até 30 de abril de 2027. Enviem uma única resposta por convite e incluam todas as pessoas que vão estar presentes. Agradecemos também a resposta se não puderem vir."],
  ["O que devemos vestir?", "Venham com roupa de festa em que se sintam bem. A cerimónia é ao ar livre, na herdade, e o cocktail é no jardim."],
  ["Podemos levar acompanhantes?", "Considerem as pessoas indicadas no vosso convite. Se tiverem alguma dúvida sobre acompanhantes, falem connosco antes de confirmar."],
  ["E as restrições alimentares e alergias?", "Escrevam no RSVP quem tem cada restrição ou alergia e qual é. Partilharemos essa informação com a equipa da quinta para preparar a refeição."],
  ["A que horas acaba a festa?", "O fim está previsto para as 03h do dia 27 de junho."],
  ["Há estacionamento?", "Sim, há estacionamento próprio e gratuito à entrada da Herdade da Emberiza."],
];

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => { const update = () => setRemaining(Math.max(0, Math.floor((Date.parse(wedding.dateISO) - Date.now()) / 1000))); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, []);
  const values = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
  return <div className="countdown" aria-label="Contagem decrescente para o casamento">{values.map((n, i) => <div key={i}><span>{n === null ? "—" : String(n).padStart(2, "0")}</span><small>{["dias", "horas", "minutos", "segundos"][i]}</small></div>)}</div>;
}

function RSVP() {
  const [attendance, setAttendance] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ attending: boolean; total: number; updated: boolean } | null>(null);
  const [error, setError] = useState("");
  const [closed, setClosed] = useState(false);
  const status = useRef<HTMLDivElement>(null);
  useEffect(() => { setClosed(Date.now() > Date.parse(wedding.rsvpDeadlineISO)); }, []);
  useEffect(() => { if (result || error) status.current?.focus(); }, [result, error]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); if (!attendance) { setError("Indica se vais estar presente."); return; }
    setSending(true);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, attending: attendance === "yes" }) });
      const saved = await response.json() as { error?: string; total: number; updated: boolean };
      if (!response.ok) throw new Error(saved.error || "Não foi possível guardar a resposta.");
      setResult({ attending: attendance === "yes", total: saved.total, updated: saved.updated });
    } catch (e) { setError((e instanceof Error ? e.message : "Não conseguimos guardar a resposta.") + " Os teus dados continuam no formulário. Tenta novamente."); }
    finally { setSending(false); }
  }
  return <section id="rsvp" className="rsvp-section section-pad"><div className="rsvp-layout wrap">
    <div className="rsvp-intro"><span className="eyebrow">O teu lugar na nossa história</span><h2>Vens celebrar<br />connosco?</h2><p>Vai ser ainda mais bonito contigo.<br />Conta-nos quem vem no teu convite.</p><div className="deadline"><CalendarDays size={25} /><div><span>Responde até</span><strong>30 de abril de 2027</strong></div></div><p className="photo-caption">A vida é mais doce quando partilhada.</p></div>
    <div className="form-paper">{result ? <div className="form-success" ref={status} tabIndex={-1} role="status"><span className="success-icon"><Check /></span><span className="eyebrow">Resposta {result.updated ? "atualizada" : "guardada"}</span><h3>{result.attending ? "Temos encontro marcado!" : "Obrigada por nos avisares."}</h3><p>{result.attending ? `Contamos com ${result.total === 1 ? "a tua presença" : `${result.total} pessoas do teu convite`}. Até 26 de junho!` : "Vamos sentir a tua falta. Obrigada por fazeres parte da nossa história."}</p><button className="button secondary" onClick={() => setResult(null)}>Corrigir a resposta</button><p className="fine">Usa o mesmo email ou telemóvel para atualizar a tua resposta.</p></div> : closed ? <div className="form-success"><Mail size={30} /><h3>O prazo de resposta terminou.</h3><p>Para confirmar ou alterar a tua presença, fala diretamente connosco.</p></div> : <form onSubmit={submit}>
      <div className="form-heading"><span className="eyebrow">Confirmação de presença</span><span className="fine">* Campos obrigatórios</span></div>
      <label htmlFor="fullName">Nome completo *</label><input id="fullName" name="fullName" autoComplete="name" maxLength={150} required placeholder="O teu nome" />
      <label htmlFor="contact">Email ou telemóvel *</label><input id="contact" name="contact" autoComplete="email" maxLength={180} required placeholder="Para conseguirmos falar contigo" /><p className="field-hint">Usa o mesmo contacto se precisares de corrigir a resposta.</p>
      <fieldset className="attendance"><legend>Vais estar presente? *</legend><RadioGroup value={attendance} onValueChange={setAttendance} className="attendance-options" aria-label="Vais estar presente?" required>
        <label className={attendance === "yes" ? "selected" : ""} htmlFor="yes"><RadioGroupItem id="yes" value="yes" /><span>Sim, vou celebrar!</span></label>
        <label className={attendance === "no" ? "selected" : ""} htmlFor="no"><RadioGroupItem id="no" value="no" /><span>Não vou conseguir ir</span></label>
      </RadioGroup></fieldset>
      {attendance === "yes" && <div className="guest-fields">
        <label htmlFor="total">Número total de pessoas *</label><input id="total" name="total" type="number" min="1" max="30" defaultValue="1" required /><p className="field-hint">Conta-te a ti, aos acompanhantes e às crianças.</p>
        <label htmlFor="companions">Nomes dos acompanhantes</label><textarea id="companions" name="companions" rows={2} maxLength={1500} placeholder="Nome completo de cada acompanhante" />
        <label htmlFor="children">Crianças: nome e idade</label><textarea id="children" name="children" rows={2} maxLength={1500} placeholder="Por exemplo: Maria, 5 anos; João, 2 anos" />

        <label htmlFor="message">Mensagem para os noivos</label><textarea id="message" name="message" rows={3} maxLength={2000} placeholder="Deixa-nos umas palavras, se te apetecer…" />
      </div>}
      {attendance !== "no" && <fieldset className="dietary-fields"><legend>Alimentação</legend><label htmlFor="dietary">Há intolerâncias, alergias ou preferências alimentares no teu convite?</label><p id="dietary-hint" className="field-hint">Indica o nome de cada pessoa e o que devemos ter em conta: intolerâncias, alergias, alimentação vegan, vegetariana ou outras necessidades.</p><textarea id="dietary" name="dietary" rows={4} maxLength={2000} aria-describedby="dietary-hint" placeholder="Por exemplo: Ana — vegetariana; Pedro — intolerância à lactose; Maria — alergia a frutos secos. Se não houver, escreve “Nenhuma”." /></fieldset>}
      {attendance === "no" && <p className="decline-note">Basta enviares o teu nome e contacto. Obrigada por nos avisares.</p>}
      <label htmlFor="comments">Outros comentários</label><textarea id="comments" name="comments" rows={3} maxLength={2000} placeholder="Há mais alguma coisa que queiras partilhar connosco? (Opcional)" />
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      {error && <div className="form-error" ref={status} tabIndex={-1} role="alert">{error}</div>}
      <button className="button form-submit" type="submit" disabled={sending || !attendance}>{sending ? "A guardar a tua resposta…" : attendance === "no" ? "Enviar resposta" : "Confirmar presença"}</button>
      <p className="privacy-note">Os noivos usam estes dados para organizar o casamento. As informações alimentares são partilhadas apenas com a equipa responsável pela refeição.</p>
    </form>}</div>
  </div></section>;
}

export default function Home() {
  const [invite, setInvite] = useState<"closed" | "opening" | "opened">("closed");
  const [mobileMenu, setMobileMenu] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const main = useRef<HTMLElement>(null);
  useEffect(() => { document.body.style.overflow = invite === "opened" ? "" : "hidden"; if (invite === "closed") opener.current?.focus(); return () => { document.body.style.overflow = ""; }; }, [invite]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function openInvite() { if (invite !== "closed") return; setInvite("opening"); timer.current = setTimeout(() => { setInvite("opened"); main.current?.focus({ preventScroll: true }); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1250); }
  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool: (tool: unknown, options: { signal: AbortSignal }) => unknown } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try { Promise.resolve(context.registerTool({ name: "open_wedding_invitation", title: "Abrir o convite de casamento", description: "Abre o envelope e mostra os detalhes do casamento. Não envia nenhuma resposta de presença.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: false }, execute: async (input: unknown) => { if (!input || typeof input !== "object" || Object.keys(input).length) throw new Error("Este convite não requer argumentos."); openInvite(); await new Promise(resolve => setTimeout(resolve, 1400)); return { opened: true, date: wedding.dateISO }; } }, { signal: lifecycle.signal })).catch(() => {}); } catch {};
    return () => lifecycle.abort();
  }, [invite]);
  const closeMenu = () => setMobileMenu(false);
  const coords = `${wedding.latitude},${wedding.longitude}`;
  return <>
    {invite !== "opened" && <div className={`invitation-screen ${invite}`} role="dialog" aria-modal="true" aria-label="Convite para o casamento de Marta e Pedro">
      <img className="invitation-background" src="/emberiza-aguarela.webp" alt="" />
      <div className="invitation-intro"><span className="eyebrow">Um dia. Uma história. A nossa gente.</span><p>Há um convite para ti.</p></div>
      <button ref={opener} className="envelope" onClick={openInvite} aria-label="Abrir o convite de Marta e Pedro" disabled={invite === "opening"}>
        <span className="envelope-back" />
        <span className="invitation-card"><span className="eyebrow">Vamos casar</span><span className="card-names">Marta <i>&</i> Pedro</span><span>26 de junho de 2027</span></span>
        <span className="envelope-front" /><span className="envelope-flap" /><span className="wax-seal"><Heart size={26} strokeWidth={1} aria-hidden="true" /></span>
      </button><p className="open-caption">Toca no selo para abrir</p><span className="intro-date">26 · 06 · 2027</span>
    </div>}
    <div className={`site-content ${invite === "opened" ? "is-open" : ""}`} inert={invite !== "opened"}>
      <a className="skip-link" href="#inicio">Saltar para o conteúdo</a>
      <header className="site-header"><a href="#inicio" className="couple-brand monogram-brand" onClick={closeMenu} aria-label="Marta e Pedro — início"><img src="/monograma-mp.png" alt="Monograma M&P em verde e dourado, com ramos de oliveira" width={1254} height={1254} /></a><nav className={mobileMenu ? "nav-links expanded" : "nav-links"} aria-label="Navegação principal"><a href="#programa" onClick={closeMenu}>O nosso dia</a><a href="#local" onClick={closeMenu}>Como chegar</a><a href="#duvidas" onClick={closeMenu}>Dúvidas</a><a className="nav-rsvp" href="#rsvp" onClick={closeMenu}>Confirmar presença</a></nav><button className="menu-toggle" aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button></header>
      <main id="inicio" ref={main} tabIndex={-1}>
        <section className="hero"><img className="hero-photo" src="/emberiza-aguarela-inicio.png" alt="Aguarela da Herdade da Emberiza vista de cima, com o salão, a piscina, o jardim e a paisagem de Alenquer" fetchPriority="high" /><div className="hero-shade" /><div className="hero-content"><p className="storybook-title">Once upon a time...</p><h1>Marta <span>&</span> Pedro</h1><p className="hero-invitation">Vamos casar! E queremos viver este dia contigo.</p><div className="event-facts"><div><CalendarDays size={20} /><span>Quando</span><strong>26 de junho de 2027</strong><small>Sábado · chegada às 15h</small></div><div><Trees size={22} /><span>Cerimónia</span><strong>15h30 · Na herdade</strong><small>Ao ar livre, entre as árvores</small></div><div><MapPin size={21} /><span>Onde</span><strong>Herdade da Emberiza</strong><small>Alenquer</small></div></div><Countdown /><a className="button hero-button" href="#rsvp">Confirmar presença</a><a className="discover" href="#programa">Descobre o nosso dia</a></div></section>
        <section id="noivado" className="engagement-section section-pad" aria-label="Fotografias da sessão de noivado"><div className="wrap"><div className="engagement-gallery">{wedding.engagementPhotos.map((source, index) => source ? <img key={index} className="engagement-image" src={source} alt={`Marta e Pedro na sessão de noivado · fotografia ${index + 1}`} loading="lazy" /> : <div key={index} className="engagement-placeholder" aria-label={`Espaço reservado para a fotografia ${index + 1} da sessão de noivado`}><Camera size={28} strokeWidth={1} aria-hidden="true" /><span>Em breve</span></div>)}</div></div></section>
        <section id="programa" className="programme-section section-pad"><div className="wrap programme-layout"><div className="programme-aside"><span className="eyebrow">Capítulo I · O nosso dia</span><h2>Do primeiro abraço<br />à última dança.</h2><p>Um dia no campo, rodeados de quem gostamos. Sem pressa para os abraços, com tempo para criar memórias.</p><div className="programme-photo"><img src="/emberiza-aguarela.webp" alt="Aguarela do jardim da Herdade da Emberiza com pinheiros e luzes junto à piscina" loading="lazy" /><span>Que a noite demore a acabar.</span></div></div><ol className="timeline">{programme.map(([time, title, subtitle], i) => <li key={title} className={i === 1 ? "ceremony-moment" : ""}><time>{time}</time><div className="timeline-dot" /><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div></li>)}</ol></div></section>
        <div className="story-ribbon"><Sparkles size={22} /><p>A vida é mais doce quando partilhada.</p><Sparkles size={22} /></div>
        <section id="local" className="location-section section-pad"><div className="wrap"><div className="section-heading"><span className="eyebrow">Capítulo II · O caminho até nós</span><h2>Todos os caminhos<br />levam ao nosso sim.</h2></div><div className="route-warning"><Navigation size={29} /><div><span className="eyebrow">Atenção ao último quilómetro</span><h3>O GPS pode enganar-se perto do fim.</h3><p>Ao aproximar-te da quinta, segue a sinalização para a Herdade da Emberiza. Não entres em caminhos de terra ou acessos privados sugeridos pelo GPS. Se tiveres dúvidas, pára num local seguro e fala connosco antes de continuar.</p><p className="route-pending">O ponto de entrada e as indicações finais serão confirmados com a quinta antes do casamento.</p></div></div><div className="location-layout"><div className="venue-info"><MapPin className="venue-icon" /><h3>Herdade da Emberiza</h3><p>Estrada da Quinta do Barreiro, n.º 11<br />2580-377 Alenquer</p><div className="map-buttons"><a className="button" href={`https://www.google.com/maps/dir/?api=1&destination=${coords}`} target="_blank" rel="noopener noreferrer">Google Maps</a><a className="button secondary" href={`https://www.waze.com/ul?ll=${coords}&navigate=yes`} target="_blank" rel="noopener noreferrer">Waze</a></div></div><iframe title="Mapa da Herdade da Emberiza" src={`https://maps.google.com/maps?q=${coords}&z=15&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="travel-notes"><div><Navigation /><h3>De Lisboa</h3><p>Cerca de 38 km · ~40 min.<br />A1, saída Carregado, ou A8, saída Alenquer. Conta com uma margem para o trânsito.</p></div><div><Car /><h3>Estacionamento</h3><p>Próprio e gratuito,<br />à entrada da herdade.</p></div><div><BedDouble /><h3>Para ficar por perto</h3><p>Procura dormida em Alenquer, Carregado ou Vila Franca de Xira e aproveita a festa com calma.</p></div></div></div></section>
        <RSVP />
        <section id="duvidas" className="faq-section section-pad"><div className="wrap faq-layout"><div><span className="eyebrow">Capítulo III · Antes do grande dia</span><h2>Pequenas dúvidas,<br />respostas com carinho.</h2></div><div className="faq-list">{questions.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
      </main>
      <footer><div className="closing-art"><img src="/happily-ever-after-original.png" alt="and they lived happily ever after — dois passarinhos seguram uma fita" width={736} height={736} loading="lazy" /></div><p className="footer-names">Marta <i>&</i> Pedro</p><p>26 de junho de 2027 · Herdade da Emberiza · Alenquer</p><div className="contacts"><Mail size={18} /><span>{wedding.contacts.marta || wedding.contacts.pedro ? <>{wedding.contacts.marta && <a href={`tel:${wedding.contacts.marta.replace(/\s/g, "")}`}>Marta · {wedding.contacts.marta}</a>}{wedding.contacts.pedro && <a href={`tel:${wedding.contacts.pedro.replace(/\s/g, "")}`}>Pedro · {wedding.contacts.pedro}</a>}</> : "Contactos da Marta e do Pedro · a disponibilizar"}</span></div><button className="reopen" onClick={() => { window.scrollTo({ top: 0 }); setInvite("closed"); }}>Voltar a abrir o convite</button><span className="footer-mark"><Heart size={15} /> Com amor, para a nossa gente.</span></footer>
    </div>
    <noscript><style>{`.invitation-screen{display:none}.site-content{visibility:visible;opacity:1}`}</style><div className="noscript-notice">Ativa o JavaScript para abrir o convite e enviar a confirmação de presença.</div></noscript>
  </>;
}
