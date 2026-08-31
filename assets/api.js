/* ============================================================
   Cliente da API (Google Apps Script Web App).
   Usa POST text/plain para evitar preflight de CORS.
   ============================================================ */
(function (root) {
  function url(){
    var u = (root.APP_CONFIG && root.APP_CONFIG.SCRIPT_URL) || '';
    return u;
  }
  function configured(){ var u=url(); return u && u.indexOf('/exec')>-1 && u.indexOf('COLE_AQUI')<0; }

  function post(payload){
    return fetch(url(), {
      method:'POST',
      headers:{'Content-Type':'text/plain;charset=utf-8'},
      body: JSON.stringify(payload)
    }).then(function(r){ return r.json(); });
  }

  var API = {
    configured: configured,
    // Salva a resposta de um participante (sem autenticação).
    save: function(record){ return post({action:'save', record:record}); },
    // Lista todos os respondentes (requer chave de admin).
    list: function(adminKey){ return post({action:'list', adminKey:adminKey}); },
    // Apaga um respondente pelo id (requer chave de admin).
    remove: function(id, adminKey){ return post({action:'delete', id:id, adminKey:adminKey}); },
    // Envia o relatório por e-mail com PDF em anexo (requer chave de admin).
    // payload: {to, name, subject, intro, pdfBase64, filename}
    send: function(payload, adminKey){ payload.action='send'; payload.adminKey=adminKey; return post(payload); }
  };
  root.API = API;
})(window);
