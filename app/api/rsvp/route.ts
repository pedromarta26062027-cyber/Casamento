import { env } from "cloudflare:workers";
import { wedding } from "@/lib/wedding";
import { validateRSVP } from "@/lib/rsvp";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "Abre o formulário no site do casamento." }, 403);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Origem inválida." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Pedido inválido." }, 415);
  if (Date.now() > Date.parse(wedding.rsvpDeadlineISO)) return json({ error: "O prazo terminou. Fala diretamente com os noivos." }, 410);
  let raw;
  try { const body = await request.text(); if (body.length > 20000) return json({ error: "A resposta é demasiado longa." }, 413); raw = JSON.parse(body); } catch { return json({ error: "Não foi possível ler a resposta." }, 400); }
  if (raw?.website) return json({ error: "Não foi possível aceitar este pedido." }, 400);
  let data;
  try { data = validateRSVP(raw); } catch (e) { return json({ error: e instanceof Error ? e.message : "Verifica o formulário." }, 400); }
  try {
    if (!env.DB) throw new Error("DB unavailable");
    const existing = await env.DB.prepare("SELECT id FROM rsvps WHERE contact_key = ?").bind(data.contactKey).first<{ id: string }>();
    const id = existing?.id || crypto.randomUUID();
    await env.DB.prepare("INSERT INTO rsvps (id, contact_key, full_name, contact, attending, total, companions, children, dietary, rides, message, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(contact_key) DO UPDATE SET full_name = excluded.full_name, contact = excluded.contact, attending = excluded.attending, total = excluded.total, companions = excluded.companions, children = excluded.children, dietary = excluded.dietary, rides = excluded.rides, message = excluded.message, comments = excluded.comments, updated_at = CURRENT_TIMESTAMP")
      .bind(id, data.contactKey, data.fullName, data.contact, data.attending ? 1 : 0, data.total, data.companions, data.children, data.dietary, data.rides, data.message, data.comments).run();
    return json({ saved: true, total: data.total, updated: !!existing });
  } catch (e) { console.error("RSVP storage unavailable", e instanceof Error ? e.message : "unknown"); return json({ error: "Não foi possível guardar a tua resposta neste momento." }, 503); }
}
