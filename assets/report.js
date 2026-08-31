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
  function list(arr){if(arr.length<=1)return arr.join('');return arr.slice(0,-1).join(', ')+' e '+arr[arr.length-1];}

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
      + '<div class="card"><h2>Resumo do perfil</h2>'
        + a.resumoParas.map(function(x){return '<p class="lead">'+esc(x)+'</p>';}).join('')
        + '<div class="insight" style="margin-top:10px;"><b>Em uma frase:</b> '+esc(a.frase)+'</div></div>'
      + '<div class="card"><h2>O que essa análise diz sobre você</h2><p class="lead">'+esc(a.oQueDiz)+'</p></div>'
      + '<div class="card"><h2>Estilo no dia a dia <span class="tag" style="background:#F2A900">HPI</span></h2>'+bars(H.HPI,'HPI',scores)+'</div>'
      + '<div class="card"><h2>Riscos sob estresse <span class="tag" style="background:#D6001C">HDS</span></h2>'+bars(H.HDS,'HDS',scores)+'</div>'
      + '<div class="card"><h2>Valores e motivações <span class="tag" style="background:#3F6EA5">MVPI</span></h2>'+bars(H.MVPI,'MVPI',scores)+'</div>'
      + '<div class="card"><h2>Pontos fortes e de atenção</h2><div class="two">'
        + '<div class="kard pos"><h3>Pontos fortes</h3><ul class="clean pos">'+a.fortes.map(function(x){return '<li><b>'+esc(x.t)+'.</b> '+esc(x.p)+'</li>';}).join('')+'</ul></div>'
        + '<div class="kard neg"><h3>Pontos de atenção</h3><ul class="clean neg">'+a.atencao.map(function(x){return '<li><b>'+esc(x.t)+'.</b> '+esc(x.p)+'</li>';}).join('')+'</ul></div>'
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
      + '</div><div class="insight" style="margin-top:12px;"><b>Síntese:</b> '+esc(a.swotSintese)+'</div></div>';
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

  // ====================================================================
  //  RELATÓRIO GERENCIAL (uso exclusivo do líder/administrador)
  //  Orienta o líder sobre a melhor forma de atuar com esta pessoa.
  // ====================================================================
  var MGR_TIP = {
    TEM:'ajude a antecipar gatilhos e dê espaço para a pessoa se recompor antes de decisões importantes.',
    CET:'seja transparente com informações e o "porquê" das decisões para reduzir a desconfiança.',
    CAU:'encoraje decisões com uma rede de segurança; reduza o medo de errar celebrando tentativas.',
    RES:'traga a pessoa para as interações e não interprete a distância como desinteresse.',
    PAS:'explicite os acordos por escrito e verifique a adesão real — não apenas o "sim" inicial.',
    ARR:'corrija com dados e exemplos concretos; escolha bem as batalhas e reconheça os acertos.',
    ARD:'valide riscos antes de aprovar; canalize a ousadia em experimentos controlados.',
    MEL:'dê palco de forma estruturada e ajude a redistribuir o protagonismo no time.',
    IMA:'peça o passo a passo prático das ideias antes de escalá-las.',
    PER:'defina o nível de qualidade "suficiente" e proteja os prazos do excesso de detalhe.',
    OBS:'incentive a pessoa a discordar; deixe claro que dizer "não" é bem-vindo.'
  };
  var MOTIV = {
    REC:'Reconheça publicamente as entregas; elogie na frente do time.',
    POD:'Ofereça autonomia e projetos com visibilidade e influência.',
    HED:'Mantenha um clima leve e celebre as conquistas.',
    ALT:'Conecte as tarefas ao impacto positivo em pessoas e clientes.',
    AFI:'Favoreça o trabalho em equipe e a integração ao grupo.',
    TRA:'Reforce propósito, valores e a coerência da empresa.',
    SEG:'Ofereça clareza, estabilidade e previsibilidade de expectativas.',
    COM:'Ligue as metas a resultado de negócio e a números.',
    EST:'Valorize a qualidade e o capricho no que a pessoa entrega.',
    CIE:'Traga dados e lógica para justificar decisões.'
  };

  function managerInnerHTML(record){
    var sc=H.score(record.answers);
    var hi=function(s){return sc[s]>=70;}, lo=function(s){return sc[s]<=30;};

    // Motivadores
    var motiv=H.MVPI.filter(hi).sort(function(a,b){return sc[b]-sc[a];}).map(function(s){return '<li><b>'+H.SCALES[s].name+':</b> '+MOTIV[s]+'</li>';});
    if(!motiv.length) motiv.push('<li>Perfil de motivação equilibrado — combine reconhecimento, propósito e resultado conforme o momento.</li>');

    // Comunicação e feedback
    var com=[];
    if(lo('AJU')) com.push('<li><b>Sensível a crítica:</b> dê feedback em privado, comece pelo reforço positivo, foque em comportamentos e combine próximos passos. Evite correções duras em público.</li>');
    if(hi('AJU')) com.push('<li><b>Resiliente:</b> aguenta bem pressão e feedback direto e objetivo, sem rodeios.</li>');
    if(hi('SEN')) com.push('<li><b>Preza harmonia e evita conflito:</b> crie segurança psicológica e puxe divergências à tona com cuidado — pode engolir discordâncias.</li>');
    if(lo('SEN')) com.push('<li><b>Direto e objetivo:</b> não leva feedback para o pessoal; ajude a calibrar o tom com os colegas.</li>');
    if(hi('ARR')) com.push('<li><b>Autoconfiança alta:</b> convença pela lógica e por dados, não pela autoridade; traga exemplos concretos ao corrigir.</li>');
    if(hi('PAS')) com.push('<li><b>Resistência velada possível:</b> confirme combinados por escrito e acompanhe a execução de perto.</li>');
    if(!com.length) com.push('<li>Comunicação padrão funciona bem; mantenha clareza e regularidade nos feedbacks.</li>');

    // Delegar e desenvolver
    var dev=[];
    if(hi('PRU')) dev.push('<li><b>Confiável com processos e prazos:</b> ideal para tarefas que exigem consistência. Dê regras claras; ao inovar, apresente o novo processo.</li>');
    if(lo('PRU')) dev.push('<li><b>Flexível e espontânea:</b> boa em ambientes ambíguos; defina checkpoints para garantir consistência.</li>');
    if(hi('INQ')) dev.push('<li><b>Curiosa e estratégica:</b> envolva em brainstorms e visão; peça para aterrissar ideias em planos concretos.</li>');
    if(hi('AMB')) dev.push('<li><b>Ambiciosa:</b> ofereça metas desafiadoras e um caminho claro de crescimento.</li>');
    if(lo('AMB')) dev.push('<li><b>Jogadora de equipe:</b> incentive a assumir a frente aos poucos, com apoio.</li>');
    if(hi('SOC')) dev.push('<li><b>Comunicativa e energizante:</b> aproveite em papéis de relacionamento e apresentações.</li>');
    if(hi('APR')) dev.push('<li><b>Gosta de estudar:</b> ofereça treinamentos e conteúdos formais.</li>');
    if(lo('APR')) dev.push('<li><b>Aprende na prática:</b> prefira job rotation, mentoria e "mão na massa" a cursos teóricos.</li>');
    if(!dev.length) dev.push('<li>Desenvolva com uma mistura equilibrada de desafio, autonomia e acompanhamento.</li>');

    // Riscos a gerenciar
    var risks=H.HDS.filter(hi).sort(function(a,b){return sc[b]-sc[a];}).map(function(s){
      return '<li><b>'+H.SCALES[s].name+' ('+sc[s]+'):</b> '+H.SCALES[s].risk+' <i>Como líder:</i> '+MGR_TIP[s]+'</li>';
    });
    if(!risks.length) risks.push('<li>Sem riscos de descarrilamento em zona alta — bom autocontrole sob pressão.</li>');

    // Ambiente ideal
    var amb=[];
    if(hi('SEG')) amb.push('estável e previsível');
    if(hi('TRA')) amb.push('com valores e propósito claros');
    if(hi('AFI')) amb.push('colaborativo e com senso de grupo');
    if(hi('HED')) amb.push('de clima leve');
    if(hi('COM')) amb.push('orientado a resultado');
    if(hi('CIE')) amb.push('baseado em dados');
    var ambTxt = amb.length ? 'Rende mais num ambiente '+list(amb)+'.' : 'Adapta-se a diferentes ambientes de trabalho.';

    // Do / Don't
    var dos=[], donts=[];
    if(hi('REC')) dos.push('“Excelente entrega — e quero que o time todo saiba disso.”');
    if(hi('ALT')) dos.push('“Olha o impacto que o seu trabalho teve para [cliente/colega].”');
    if(hi('COM')) dos.push('“Sua entrega moveu [meta/número] — parabéns pelo resultado.”');
    if(!dos.length) dos.push('Reconheça esforços específicos e conecte-os ao propósito do time.');
    if(lo('AJU')) donts.push('Corrigir de forma dura ou em público (“de novo isso errado?”).');
    if(hi('SEN')) donts.push('Forçar um confronto aberto sem preparar o terreno.');
    if(hi('ARR')) donts.push('Apelar só para a hierarquia (“porque eu mandei”) sem argumentos.');
    if(!donts.length) donts.push('Feedback vago ou tardio — prefira específico e no momento.');

    // Retrato para o líder + cenários
    var a=H.analyze(sc);
    var topVal=H.MVPI.filter(hi).sort(function(x,y){return sc[y]-sc[x];})[0];
    var topRisk=H.HDS.filter(hi).sort(function(x,y){return sc[y]-sc[x];})[0];
    var retrato='<b>Em uma frase:</b> '+esc(a.frase)+'<br><b>Para você, líder:</b> '
      +(topVal?'o que mais engaja esta pessoa é '+H.SCALES[topVal].name.toLowerCase():'ela responde a uma combinação de reconhecimento, propósito e resultado')
      +(topRisk?'; e o principal cuidado sob pressão é '+H.SCALES[topRisk].name.toLowerCase()+'.':'; e não há riscos marcantes sob pressão.')
      +' As seções abaixo trazem o “como” no dia a dia.';

    var oneone=[];
    if(lo('AJU')) oneone.push('1:1s mais frequentes e previsíveis: a estabilidade reduz a ansiedade e dá espaço para processar pressões.');
    else if(hi('AJU')) oneone.push('1:1s podem ser mais espaçados e diretos ao ponto — foque em metas e obstáculos.');
    if(hi('SEN')||hi('AFI')) oneone.push('Comece pelo lado pessoal antes das tarefas: cria conexão e abre a conversa.');
    if(hi('PAS')||hi('OBS')) oneone.push('Abra espaço explícito para discordar (“o que você faria diferente?”) — senão o desacordo fica submerso.');
    if(hi('AMB')||hi('POD')) oneone.push('Dedique parte do encontro a carreira e crescimento: próximos desafios e visibilidade.');
    if(hi('REC')) oneone.push('Reserve um momento para reconhecer conquistas específicas desde o último 1:1.');
    if(!oneone.length) oneone.push('Mantenha 1:1s regulares, com metas claras, feedback específico e espaço para dúvidas.');

    var cen=[];
    var fb=lo('AJU')?'Em privado. Comece pelo reforço positivo, seja específico sobre o comportamento (não a pessoa) e feche com um combinado claro.'
      :hi('ARR')?'Traga dados e exemplos concretos e peça a visão dela antes de concluir — ela se convence pela lógica, não pela hierarquia.'
      :'Seja direto e específico, focando no comportamento e no próximo passo.';
    if(hi('SEN')) fb+=' Deixe claro que o objetivo é ajudar, não criticar.';
    cen.push({t:'Ao dar um feedback difícil',p:fb});
    var dg=(hi('CAU')||lo('AJU'))?'Reduza o medo de errar: diga que tentativa faz parte, ofereça uma rede de segurança e comece com um passo pequeno.'
      :hi('PRU')?'Entregue com clareza de processo, critérios e prazo — ela executa muito bem o que está bem definido.'
      :(hi('AMB')||hi('POD'))?'Enquadre como oportunidade de crescimento e visibilidade; dê autonomia sobre o “como”.'
      :'Combine objetivo, prazo e checkpoints, e pergunte como ela pretende fazer.';
    if(hi('IMA')||hi('INQ')) dg+=' Dê espaço para propor o caminho, mas peça um plano concreto.';
    cen.push({t:'Ao delegar algo novo ou desafiador',p:dg});
    var er=lo('AJU')?'Ela já se cobra bastante: foque no aprendizado e no próximo passo, sem dureza e sem plateia.'
      :hi('ARR')?'Traga os fatos para que ela mesma enxergue o ponto; evite o “eu avisei”.'
      :'Separe o erro da pessoa e transforme em aprendizado concreto.';
    if(hi('PER')) er+=' Ajude a dimensionar — nem todo erro é catástrofe.';
    cen.push({t:'Quando erra ou falha',p:er});
    var mm={REC:'verifique se o esforço dela tem sido reconhecido — reconhecimento é combustível aqui.',ALT:'reconecte a tarefa ao impacto real em pessoas e clientes.',SEG:'traga previsibilidade e reduza as incertezas do momento.',POD:'ofereça um novo desafio e mais autonomia.',HED:'cheque o clima e a carga de trabalho.',AFI:'reforce o pertencimento e a conexão com o grupo.',TRA:'reconecte ao propósito e aos valores da empresa.',COM:'mostre concretamente como o trabalho dela move os resultados.',CIE:'traga dados que deem sentido ao esforço.',EST:'reconheça a qualidade e o capricho do que ela entrega.'};
    cen.push({t:'Quando parece desmotivada',p:(topVal&&mm[topVal]?'Comece por aqui: '+mm[topVal]:'Converse abertamente sobre o que mudou e o que ela precisa.')+' Depois, pergunte diretamente o que faria diferença para ela agora.'});
    var cenHTML=cen.map(function(c){return '<div class="rec"><div class="t">'+esc(c.t)+'</div><div class="p">'+esc(c.p)+'</div></div>';}).join('');

    var resumoLider='Para tirar o melhor desta pessoa, '+(topVal?'alimente '+H.SCALES[topVal].name.toLowerCase():'reconheça o esforço específico')+', dê clareza de expectativas e '+(topRisk?'fique atento a '+H.SCALES[topRisk].name.toLowerCase()+' sob pressão':'mantenha um feedback regular e honesto')+'. A regra de ouro aqui: <b>firme no combinado, caloroso na relação.</b>';

    var lider = record.lider ? ' · Líder: '+esc(record.lider) : '';

    return ''
      + '<div class="band" style="background:linear-gradient(125deg,#3a2f1b,#5c4a2a);"><div class="kick">Relatório gerencial · Confidencial (uso do líder)</div>'
        + '<h1>'+esc(record.name||'Respondente')+'</h1>'
        + '<div class="who">Como liderar melhor esta pessoa'+lider+'</div></div>'
      + '<div class="disc"><b>Documento de gestão — não compartilhar com o avaliado.</b> Orientações para o líder direto atuar melhor com esta pessoa, a partir do seu perfil. Ferramenta educativa; não é o Hogan Assessment.</div>'
      + '<div class="card"><h2>Retrato para o líder</h2><p class="lead" style="font-size:13px;">'+retrato+'</p></div>'
      + '<div class="card"><h2>✔ Como liderar &amp; motivar</h2><ul class="clean pos">'+motiv.join('')+'</ul>'
        + '<p style="font-size:12.5px;color:var(--muted);margin-top:10px;">'+ambTxt+'</p></div>'
      + '<div class="card"><h2>💬 Como comunicar e dar feedback</h2><ul class="clean" style="list-style:none;">'+com.join('')+'</ul></div>'
      + '<div class="card"><h2>🎯 Como delegar e desenvolver</h2><ul class="clean" style="list-style:none;">'+dev.join('')+'</ul></div>'
      + '<div class="card"><h2>🗓 Reuniões 1:1 &amp; acompanhamento</h2><ul class="clean" style="list-style:none;">'+oneone.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div>'
      + '<div class="card"><h2>Cenários comuns — o que fazer</h2><div class="recg">'+cenHTML+'</div></div>'
      + '<div class="card"><h2>⚠ Riscos a gerenciar (sinais sob estresse)</h2><ul class="clean neg">'+risks.join('')+'</ul></div>'
      + '<div class="card"><h2>Frases que funcionam × o que evitar</h2><div class="two">'
        + '<div class="kard pos"><h3>Use</h3><ul class="clean pos">'+dos.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div>'
        + '<div class="kard neg"><h3>Evite</h3><ul class="clean neg">'+donts.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div>'
      + '</div></div>'
      + '<div class="card"><h2>Em resumo, para o líder</h2><p class="lead" style="font-size:13px;">'+resumoLider+'</p></div>';
  }
  function renderManager(container, record){ ensureCSS(); container.classList.add('rep'); container.innerHTML=managerInnerHTML(record); }

  root.REPORT = { CSS:REPORT_CSS, innerHTML:reportInnerHTML, render:render, standaloneHTML:standaloneHTML,
                  managerInnerHTML:managerInnerHTML, renderManager:renderManager };
})(window);
