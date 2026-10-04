(() => {
  const endpoint = window.WEDDING_RSVP_ENDPOINT;
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint || '')) return;
  const nativeFetch = window.fetch.bind(window);
  const style = document.createElement('style');
  style.textContent = '.rsvp-enabled .form-paper form{display:block}.rsvp-enabled .pages-rsvp-notice{display:none}';
  document.head.appendChild(style);
  document.documentElement.classList.add('rsvp-enabled');

  function send(payload) {
    return new Promise((resolve, reject) => {
      const random = crypto.getRandomValues(new Uint8Array(16));
      const nonce = Array.from(random, b => b.toString(16).padStart(2,'0')).join('');
      const iframe = document.createElement('iframe');
      iframe.name = 'rsvp-' + nonce; iframe.hidden = true; iframe.setAttribute('aria-hidden','true');
      const form = document.createElement('form');
      form.hidden = true; form.method = 'POST'; form.action = endpoint; form.target = iframe.name;
      for (const [name,value] of Object.entries({payload:JSON.stringify(payload),nonce})) {
        const input = document.createElement('input'); input.type='hidden'; input.name=name; input.value=value; form.appendChild(input);
      }
      let timer;
      function clean() {clearTimeout(timer);window.removeEventListener('message',receive);form.remove();iframe.remove();}
      function receive(event) {
        let hostname; try {hostname=new URL(event.origin).hostname;} catch {return;}
        const trusted = hostname === 'script.google.com' || hostname === 'script.googleusercontent.com' || hostname.endsWith('-script.googleusercontent.com') || hostname.endsWith('.script.googleusercontent.com');
        if (!trusted || event.data?.type !== 'marta-pedro-rsvp' || event.data.nonce !== nonce || typeof event.data.saved !== 'boolean') return;
        clean();
        resolve(new Response(JSON.stringify(event.data),{status:event.data.saved?200:400,headers:{'Content-Type':'application/json'}}));
      }
      window.addEventListener('message',receive);
      timer=setTimeout(() => {clean();reject(new Error('Não conseguimos confirmar a gravação. Usa o mesmo contacto se voltares a enviar.'));},45000);
      document.body.append(iframe,form);
      try { HTMLFormElement.prototype.submit.call(form); } catch(error) {clean();reject(error);}
    });
  }
  window.fetch = (input, options) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input?.url;
    if (url === '/api/rsvp' && options?.method === 'POST') {
      try {return send(JSON.parse(options.body));} catch(error) {return Promise.reject(error);}
    }
    return nativeFetch(input,options);
  };
})();
