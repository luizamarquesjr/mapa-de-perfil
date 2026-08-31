/* ============================================================
   Renderização compartilhada do RELATÓRIO individual.
   Usado por: resultado.html (visualização), admin.html (PDF/e-mail).
   Depende de core.js (window.HOGAN).
   ============================================================ */
(function (root) {
  var H = root.HOGAN;

  var REPORT_CSS = ''
    + '.rep{--ink:#1c2430;--muted:#5c6675;--line:#e4e8ee;--soft:#f5f7f9;--navy:#1f2d3d;--gold:#b8860b;'
    + '--hpi:#F2A900;--hds:#D6001C;--mvpi:#3F6EA5;--s:#2e7d5b;--w:#b5462f;--o:#2f6ea5;--t:#8a6d1f;'
    + 'font-family:"Helvetica Neue",Arial,sans-serif;color:var(--ink);line-height:1.5;background:#fff;}'
    + '.rep *{box-sizing:border-box;}'
    + '.rep .band{background:linear-gradient(125deg,#1b2836,#33475e);color:#fff;padding:24px 26px;border-radius:14px;margin-bottom:18px;}'
    + '.rep .band .kick{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#9fb6d0;font-weight:700;}'
    + '.rep .band h1{font-size:26px;font-weight:800;margin:6px 0 3px;}'
    + '.rep .band .who{font-size:13px;color:#c7d4e2;}'
    + '.rep .card{background:#fff;border:1px solid var(--line);border-radius:13px;padding:18px 22px;margin-bottom:16px;}'
    + '.rep h2{font-size:16px;color:var(--navy);margin-bottom:11px;padding-bottom:7px;border-bottom:2px solid var(--line);}'
    + '.rep h2 .tag{font-size:10px;font-weight:800;color:#fff;padding:2px 8px;border-radius:5px;vertical-align:middle;margin-left:8px;}'
    + '.rep .disc{background:#fff8e8;border:1px solid #f0e2bf;border-radius:9px;padding:10px 13px;font-size:11px;color:#6b5a2a;margin-bottom:14px;}'
    + '.rep .lead{font-size:14px;line-height:1.6;}'
    + '.rep .scalehead{display:grid;grid-template-columns:185px 1fr 34px;gap:10px;font-size:9.5px;color:var(--muted);margin-bottom:3px;}'
    + '.rep .scalehead .rng{display:flex;justify-content:space-between;}'
    + '.rep .sbar{display:grid;grid-template-columns:185px 1fr 34px;align-items:center;gap:10px;margin:6px 0;}'
    + '.rep .sbar .lab{font-size:12.5px;font-weight:600;text-align:right;}'
    + '.rep .track{position:relative;height:15px;background:#eef1f5;border-radius:8px;overflow:hidden;}'
    + '.rep .fill{position:absolute;left:0;top:0;bottom:0;border-radius:8px;}'
    + '.rep .fill.hpi{background:var(--hpi);}.rep .fill.hds{background:var(--hds);}.rep .fill.mvpi{background:var(--mvpi);}'
    + '.rep .zone{position:absolute;top:0;bottom:0;width:1px;background:rgba(0,0,0,.14);}'
    + '.rep .sbar .val{font-size:13px;font-weight:800;color:var(--navy);}'
    + '.rep .sbar .val.mk{color:#8a94a3;}'
    + '.rep .read{font-size:11px;line-height:1.45;color:var(--muted);margin:1px 0 4px 195px;}'
    + '.rep .two{display:grid;grid-template-columns:1fr 1fr;gap:16px;}'
    + '.rep .kard{border:1px solid var(--line);border-radius:11px;padding:15px 18px;}'
    + '.rep .kard.pos{border-top:4px solid var(--s);}.rep .kard.neg{border-top:4px solid var(--w);}'
    + '.rep .kard h3{font-size:14px;margin-bottom:8px;}.rep .kard.pos h3{color:var(--s);}.rep .kard.neg h3{color:var(--w);}'
    + '.rep ul.clean{list-style:none;padding:0;margin:0;}'
    + '.rep ul.clean li{position:relative;padding:5px 0 5px 16px;font-size:12.5px;line-height:1.4;border-bottom:1px solid var(--soft);}'
    + '.rep ul.clean li:last-child{border-bottom:none;}'
    + '.rep ul.clean li:before{content:"";position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;}'
    + '.rep ul.pos li:before{background:var(--s);}.rep ul.neg li:before{background:var(--w);}'
    + '.rep .insight{background:var(--soft);border-left:4px solid var(--gold);border-radius:0 8px 8px 0;padding:10px 14px;margin:8px 0;font-size:12.5px;line-height:1.5;}'
    + '.rep .recg{display:grid;grid-template-columns:1fr 1fr;gap:11px;}'
    + '.rep .rec{background:var(--soft);border-radius:9px;padding:11px 14px;border-left:3px solid var(--navy);}'
    + '.rep .rec .t{font-size:12px;font-weight:800;color:var(--navy);}.rep .rec .p{font-size:11.5px;color:var(--muted);margin-top:3px;line-height:1.4;}'
    + '.rep .swot{display:grid;grid-template-columns:1fr 1fr;gap:12px;}'
    + '.rep .qd{border-radius:11px;padding:14px 17px;color:#fff;}'
    + '.rep .qd h3{font-size:14px;margin-bottom:7px;display:flex;align-items:center;gap:8px;}'
    + '.rep .qd h3 .l{width:22px;height:22px;border-radius:6px;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;}'
    + '.rep .qd ul{list-style:none;padding:0;margin:0;}.rep .qd li{position:relative;padding:3px 0 3px 14px;font-size:11.5px;line-height:1.4;}'
    + '.rep .qd li:before{content:"\\203A";position:absolute;left:0;font-weight:800;opacity:.7;}'
    + '.rep .qd.s{background:linear-gradient(135deg,#2e7d5b,#245f45);}.rep .qd.w{background:linear-gradient(135deg,#b5462f,#8f3722);}'
    + '.rep .qd.o{background:linear-gradient(135deg,#2f6ea5,#255a86);}.rep .qd.t{background:linear-gradient(135deg,#8a6d1f,#6f571a);}'
    + '@media(max-width:600px){.rep .two,.rep .recg,.rep .swot{grid-template-columns:1fr;}.rep .read{margin-left:0;}.rep .sbar,.rep .scalehead{grid-template-columns:120px 1fr 30px;}}';

  function esc(s){return (s||'').toString().replace(/[<>&]/g,function(c){return{'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});}
  function fmtDate(d){if(!d)return '';try{return new Date(d).toLocaleDateString('pt-BR');}catch(e){return d;}}

  function barRow(sc, v, inv){
    var meta=H.SCALES[sc], b=H.band(v), invc=inv.toLowerCase();
    var zones = inv==='HDS'
      ? '<div class="zone" style="left:70%"></div><div class="zone" style="left:90%"></div>'
      : '<div class="zone" style="left:30%"></div><div class="zone" style="left:70%"></div>';
    var txt = b==='high'?meta.high:(b==='low'?meta.low:meta.mid);
    var mk = (b==='mid')?' mk':'';
    return '<div class="sbar"><div class="lab">'+meta.name+'</div><div class="track">'+zones
      +'<div class="fill '+invc+'" style="width:'+v+'%"></div></div><div class="val'+mk+'">'+v+'</div></div>'
      +'<div class="read"><b>'+txt+'</b> '+meta.measures+'</div>';
  }
  function bars(list, inv, scores){
    var head='<div class="scalehead"><div></div><div class="rng"><span>'+(inv==='HDS'?'sem risco':'baixo')
      +'</span><span>'+(inv==='HDS'?'moderado':'médio')+'</span><span>alto</span></div><div></div></div>';
    return head+list.map(function(s){return barRow(s, scores[s], inv);}).join('');
  }

  // Retorna o HTML interno do relatório (sem <style>). Envolver em <div class="rep">.
  function reportInnerHTML(record){
    var scores=H.score(record.answers), a=H.analyze(scores);
    var insHTML = a.insights.length
      ? '<div class="card"><h2>O que a combinação revela</h2>'+a.insights.map(function(x){return '<div class="insight">'+esc(x)+'</div>';}).join('')+'</div>'
      : '';
    return ''
      + '<div class="band"><div class="kick">Mapa de Perfil · Relatório individual</div>'
        + '<h1>'+esc(record.name||'Respondente')+'</h1>'
        + '<div class="who">'+(record.email?esc(record.email)+' · ':'')+'Respondido em '+fmtDate(record.date)+'</div></div>'
      + '<div class="disc"><b>Importante:</b> ferramenta educativa inspirada no modelo de três dimensões (estilo, riscos e valores). Não é o Hogan Assessment nem usa suas perguntas. Pontuações de 0–100 referenciadas na própria escala — não são percentis normatizados. Leitura: abaixo de 30 ou acima de 70 = traço marcante; entre 30 e 70 = média.</div>'
      + '<div class="card"><h2>Resumo do perfil</h2><p class="lead">'+esc(a.resumo)+'</p></div>'
      + '<div class="card"><h2>Estilo no dia a dia <span class="tag" style="background:#F2A900">HPI</span></h2>'+bars(H.HPI,'HPI',scores)+'</div>'
      + '<div class="card"><h2>Riscos sob estresse <span class="tag" style="background:#D6001C">HDS</span></h2>'+bars(H.HDS,'HDS',scores)+'</div>'
      + '<div class="card"><h2>Valores e motivações <span class="tag" style="background:#3F6EA5">MVPI</span></h2>'+bars(H.MVPI,'MVPI',scores)+'</div>'
      + '<div class="card"><h2>Pontos fortes e de atenção</h2><div class="two">'
        + '<div class="kard pos"><h3>Pontos fortes</h3><ul class="clean pos">'+a.fortes.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div>'
        + '<div class="kard neg"><h3>Pontos de atenção</h3><ul class="clean neg">'+a.atencao.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div>'
      + '</div></div>'
      + insHTML
      + '<div class="card"><h2>Recomendações de desenvolvimento</h2><div class="recg">'
        + a.recs.map(function(r){return '<div class="rec"><div class="t">'+esc(r.t)+'</div><div class="p">'+esc(r.p)+'</div></div>';}).join('')
      + '</div></div>'
      + '<div class="card"><h2>Análise SWOT</h2><div class="swot">'
        + '<div class="qd s"><h3><span class="l">S</span>Forças</h3><ul>'+a.swot.S.map(li).join('')+'</ul></div>'
        + '<div class="qd w"><h3><span class="l">W</span>Fraquezas</h3><ul>'+a.swot.W.map(li).join('')+'</ul></div>'
        + '<div class="qd o"><h3><span class="l">O</span>Oportunidades</h3><ul>'+a.swot.O.map(li).join('')+'</ul></div>'
        + '<div class="qd t"><h3><span class="l">T</span>Ameaças</h3><ul>'+a.swot.T.map(li).join('')+'</ul></div>'
      + '</div></div>';
    function li(x){return '<li>'+esc(x)+'</li>';}
  }

  // Injeta CSS (uma vez) e renderiza dentro de um container.
  function ensureCSS(){
    if(document.getElementById('rep-css'))return;
    var st=document.createElement('style'); st.id='rep-css'; st.textContent=REPORT_CSS; document.head.appendChild(st);
  }
  function render(container, record){
    ensureCSS();
    container.classList.add('rep');
    container.innerHTML = reportInnerHTML(record);
  }

  // Documento HTML completo e standalone (para e-mail).
  function standaloneHTML(record){
    return '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><style>body{margin:0;background:#fff;padding:16px;}'
      + REPORT_CSS + '</style></head><body><div class="rep">'+reportInnerHTML(record)+'</div></body></html>';
  }

  root.REPORT = { CSS:REPORT_CSS, innerHTML:reportInnerHTML, render:render, standaloneHTML:standaloneHTML };
})(window);
