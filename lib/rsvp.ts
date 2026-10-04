export type RSVPInput = { fullName: string; contact: string; contactKey: string; attending: boolean; total: number; companions: string; children: string; dietary: string; rides: string; message: string; comments: string };
export function validateRSVP(raw: unknown): RSVPInput {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Resposta inválida.");
  const d = raw as Record<string, unknown>;
  function value(key: string, max: number, required = false): string {
    const v = d[key] === undefined ? "" : d[key];
    if (typeof v !== "string") throw new Error("Verifica os campos do formulário.");
    const result = v.trim(); if (result.length > max || (required && result.length < 2)) throw new Error(`Verifica o campo ${key === "fullName" ? "nome completo" : "contacto"}.`); return result;
  }
  const fullName = value("fullName", 150, true), contact = value("contact", 180, true);
  if (typeof d.attending !== "boolean") throw new Error("Indica se vais estar presente.");
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const phone = /^\+?[\d\s()\-]{7,25}$/.test(contact) && contact.replace(/\D/g, "").length >= 7;
  if (!email && !phone) throw new Error("Indica um email ou telemóvel válido.");
  const contactKey = email ? contact.toLowerCase() : contact.replace(/\D/g, "").replace(/^(00351|351)(?=\d{9}$)/, "");
  const total = d.attending ? Number(d.total) : 0;
  if (d.attending && (!Number.isInteger(total) || total < 1 || total > 30)) throw new Error("O número total de pessoas deve estar entre 1 e 30.");
  const fields = d.attending ? { companions: value("companions", 1500), children: value("children", 1500), dietary: value("dietary", 2000), rides: value("rides", 1000), message: value("message", 2000) } : { companions: "", children: "", dietary: "", rides: "", message: "" };
  if (d.attending && total > 1 && !fields.companions && !fields.children) throw new Error("Indica os nomes dos acompanhantes ou das crianças incluídos no total.");
  return { fullName, contact, contactKey, attending: d.attending, total, ...fields, comments: value("comments", 2000) };
}
