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
    // Lista os respondentes (requer chave de admin). Separa os pseudo-registros de
    // ajuste manual de liderança (__ovr) para não poluírem estatísticas: devolve
    //   res.people      -> respondentes reais
    //   res.overrides   -> mapa targetId -> ajuste mais recente {stars,note,by,date,ovrId}
    //   res.overrideAll -> todos os pseudo-registros (para limpeza de versões antigas)
    list: function(adminKey){ return post({action:'list', adminKey:adminKey}).then(function(res){
      if(res && res.ok && res.people){
        var real=[], all=[], latest={};
        res.people.forEach(function(p){
          var o=p.answers;
          if(o && o.__ovr){
            var entry={ovrId:p.id, targetId:o.targetId, targetName:o.targetName||'', stars:(o.stars==null?null:+o.stars), note:o.note||'', by:o.by||'', date:o.date||p.date||''};
            all.push(entry);
            var cur=latest[entry.targetId];
            if(!cur || (entry.date||'')>=(cur.date||'')) latest[entry.targetId]=entry;
          } else { real.push(p); }
        });
        res.people=real; res.overrides=latest; res.overrideAll=all;
      }
      return res;
    }); },
    // Grava um ajuste manual de liderança (sem autenticação; página é admin-gated).
    // ovr = {targetId, targetName, stars:1..5|null, note, by}
    saveOverride: function(ovr){
      return post({action:'save', record:{ name:'[ajuste de liderança]', email:'', lider:'__ovr',
        date:new Date().toISOString(),
        answers:{ __ovr:true, targetId:ovr.targetId, targetName:ovr.targetName||'',
                  stars:(ovr.stars==null?null:+ovr.stars), note:ovr.note||'', by:ovr.by||'' } }});
    },
    // Apaga um respondente pelo id (requer chave de admin). Serve também para
    // remover pseudo-registros de ajuste antigos (mesmo endpoint).
    remove: function(id, adminKey){ return post({action:'delete', id:id, adminKey:adminKey}); },
    // Envia o relatório por e-mail com PDF em anexo (requer chave de admin).
    // payload: {to, name, subject, intro, pdfBase64, filename}
    send: function(payload, adminKey){ payload.action='send'; payload.adminKey=adminKey; return post(payload); }
  };
  root.API = API;
})(window);
