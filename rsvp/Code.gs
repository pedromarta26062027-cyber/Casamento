const RSVP_SHEET_ID = '1tBRx5AE-YUx45vUgRXRA6agPOi1IvIx6vrD2IBRmU_o';
const RSVP_ORIGIN = 'https://pedromarta26062027-cyber.github.io';
const RSVP_DEADLINE = '2027-04-30T23:59:59+01:00';

function doGet() {
  return HtmlService.createHtmlOutput('Ligação das confirmações de presença da Marta e do Pedro.');
}

function validateRSVP_(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Resposta inválida.');
  function text(key, max, required) {
    const v = raw[key] === undefined ? '' : raw[key];
    if (typeof v !== 'string') throw new Error('Verifica os campos do formulário.');
    const s = v.trim();
    if (s.length > max || (required && s.length < 2)) throw new Error('Verifica o nome e o contacto.');
    return s;
  }
  if (raw.website) throw new Error('Não foi possível aceitar esta resposta.');
  const fullName = text('fullName', 150, true), contact = text('contact', 180, true);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const digits = contact.replace(/\D/g, '');
  const phone = /^\+?[\d\s()\-]{7,25}$/.test(contact) && digits.length >= 7;
  if (!email && !phone) throw new Error('Indica um email ou telemóvel válido.');
  if (typeof raw.attending !== 'boolean') throw new Error('Indica se vais estar presente.');
  const attending = raw.attending, total = attending ? Number(raw.total) : 0;
  if (attending && (!Number.isInteger(total) || total < 1 || total > 30)) throw new Error('O total de pessoas deve estar entre 1 e 30.');
  const result = {fullName, contact, attending, total, contactKey: email ? contact.toLowerCase() : digits.replace(/^(00351|351)(?=\d{9}$)/, '')};
  for (const [key, max] of [['companions',1500],['children',1500],['dietary',2000],['rides',1000],['message',2000]]) result[key] = attending ? text(key,max,false) : '';
  result.comments = text('comments',2000,false);
  if (attending && total > 1 && !result.companions && !result.children) throw new Error('Indica os nomes dos acompanhantes ou das crianças.');
  return result;
}

function safeCell_(value) {
  return typeof value === 'string' && /^[=+@\-]/.test(value) ? "'" + value : value;
}

function saveRSVP_(data) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) throw new Error('Há outra resposta a ser guardada. Tenta novamente.');
  try {
    const sheet = SpreadsheetApp.openById(RSVP_SHEET_ID).getSheetByName('Respostas');
    if (!sheet) throw new Error('A folha de respostas não está disponível.');
    const last = sheet.getLastRow();
    const keys = last > 1 ? sheet.getRange(2,13,last-1,1).getValues() : [];
    const match = keys.findIndex(row => String(row[0]).replace(/^'/,'') === data.contactKey);
    const row = match >= 0 ? match + 2 : last + 1;
    const now = new Date();
    const created = match >= 0 ? sheet.getRange(row,1).getValue() : now;
    const values = [created,now,data.fullName,data.contact,data.attending?'Sim':'Não',data.total,data.companions,data.children,data.dietary,data.rides,data.message,data.comments,data.contactKey].map(safeCell_);
    sheet.getRange(row,1,1,13).setValues([values]);
    sheet.getRange(row,1,1,2).setNumberFormat('dd/MM/yyyy HH:mm');
    SpreadsheetApp.flush();
    return {saved:true,total:data.total,updated:match>=0};
  } finally { lock.releaseLock(); }
}

function doPost(e) {
  const nonce = String(e && e.parameter && e.parameter.nonce || '');
  let response;
  try {
    if (!/^[a-f0-9]{32}$/.test(nonce)) throw new Error('Pedido inválido.');
    if (new Date() > new Date(RSVP_DEADLINE)) throw new Error('O prazo terminou. Fala diretamente com os noivos.');
    const body = e && e.parameter && e.parameter.payload;
    if (typeof body !== 'string' || body.length > 20000) throw new Error('Resposta inválida ou demasiado longa.');
    response = saveRSVP_(validateRSVP_(JSON.parse(body)));
  } catch (error) {
    response = {saved:false,error: error instanceof SyntaxError ? 'Não foi possível ler a resposta.' : String(error.message || 'Não foi possível guardar a resposta.')};
  }
  // Only a receipt is returned. Guest data and the response list are never exposed.
  const message = JSON.stringify({type:'marta-pedro-rsvp',nonce,...response}).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body><script>window.top.postMessage('+message+','+JSON.stringify(RSVP_ORIGIN)+');</script></body></html>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
