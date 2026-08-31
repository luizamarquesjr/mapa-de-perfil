/* ============================================================
   NÚCLEO — Instrumento de perfil (inspirado no modelo Hogan)
   Itens 100% originais. Ferramenta educativa; NÃO é o Hogan real,
   não usa suas perguntas, e as pontuações são referenciadas na
   própria escala (não são percentis normatizados).
   ============================================================ */
(function (root) {
  var C = { HPI: '#F2A900', HDS: '#D6001C', MVPI: '#3F6EA5' };

  // ---- Escalas: metadados e textos de interpretação --------------------
  var SCALES = {
    // ===== HPI — Lado claro =====
    AJU:{inv:'HPI',name:'Ajustamento',measures:'Estabilidade emocional e resiliência ao estresse e ao feedback.',
      high:'Calmo e resiliente; lida bem com pressão e crítica.',
      mid:'Equilíbrio entre sensibilidade e estabilidade emocional.',
      low:'Responsivo e autocrítico, porém sensível ao estresse e ao feedback.',
      strength:'Serenidade e resiliência sob pressão.'},
    AMB:{inv:'HPI',name:'Ambição',measures:'Iniciativa, competitividade e desejo de liderar.',
      high:'Assertivo, movido por metas e disposto a liderar.',
      mid:'Equilíbrio entre tomar a frente e cooperar.',
      low:'Bom jogador de equipe; prefere apoiar a competir.',
      strength:'Iniciativa e orientação a metas.'},
    SOC:{inv:'HPI',name:'Sociabilidade',measures:'Extroversão e necessidade de interação.',
      high:'Extrovertido, comunicativo e energizante em grupo.',
      mid:'Sociável na medida certa; transita entre grupo e foco individual.',
      low:'Mais reservado; ouve mais do que fala.',
      strength:'Comunicação e presença que energizam equipes.'},
    SEN:{inv:'HPI',name:'Sensibilidade Interpessoal',measures:'Tato, calor humano e habilidade de manter relações.',
      high:'Caloroso, empático e diplomático; pode evitar conflito.',
      mid:'Equilíbrio entre cordialidade e objetividade.',
      low:'Direto e objetivo; pode ser percebido como duro.',
      strength:'Empatia e construção de relações fortes.'},
    PRU:{inv:'HPI',name:'Prudência',measures:'Autodisciplina, responsabilidade e conformidade a regras.',
      high:'Organizado, confiável e cumpridor; pode ser inflexível.',
      mid:'Disciplina com alguma flexibilidade.',
      low:'Flexível e espontâneo; pode faltar método.',
      strength:'Confiabilidade, disciplina e cumprimento de compromissos.'},
    INQ:{inv:'HPI',name:'Inquisitivo',measures:'Curiosidade, visão e estilo de pensar estratégico e criativo.',
      high:'Curioso, estratégico e gerador de ideias.',
      mid:'Combina praticidade com abertura a ideias.',
      low:'Pragmático e focado no concreto.',
      strength:'Visão estratégica e geração de ideias.'},
    APR:{inv:'HPI',name:'Abordagem a Aprendizagem',measures:'Gosto por aprendizado formal e estudo teórico.',
      high:'Estudioso; valoriza teoria e atualização formal.',
      mid:'Aprende tanto na teoria quanto na prática.',
      low:'Aprende na prática, "mão na massa", mais que pela teoria.',
      strength:'Apreço por conhecimento e atualização.'},

    // ===== HDS — Lado escuro (força que vira risco) =====
    TEM:{inv:'HDS',name:'Temperamental',measures:'Intensidade emocional que pode virar volatilidade.',
      high:'Sob estresse, oscila de humor e reage com intensidade.',
      mid:'Intensidade emocional dentro do esperado.',
      low:'Emocionalmente estável e constante.',
      risk:'Volatilidade de humor sob frustração.',
      tip:'Crie uma pausa entre o gatilho e a reação; nomeie a emoção antes de responder.'},
    CET:{inv:'HDS',name:'Cético',measures:'Perspicácia que pode virar cinismo e desconfiança.',
      high:'Pode desconfiar de motivos e esperar o pior.',
      mid:'Leitura crítica equilibrada.',
      low:'Confiante nas pessoas e no benefício da dúvida.',
      risk:'Cinismo e desconfiança em excesso.',
      tip:'Teste hipóteses negativas com fatos antes de assumir má intenção.'},
    CAU:{inv:'HDS',name:'Cauteloso',measures:'Cuidado que pode virar aversão excessiva a risco.',
      high:'Pode evitar decisões e riscos por medo de errar.',
      mid:'Cautela equilibrada na tomada de decisão.',
      low:'Decide com facilidade, mesmo sob incerteza.',
      risk:'Excesso de cautela e evitação de decisões.',
      tip:'Defina um prazo-limite para decidir e liste o custo de NÃO agir.'},
    RES:{inv:'HDS',name:'Reservado',measures:'Independência que pode virar desconexão e frieza.',
      high:'Pode se manter distante e pouco conectado às pessoas.',
      mid:'Equilíbrio entre autonomia e conexão.',
      low:'Acessível, próximo e conectado.',
      risk:'Desconexão e frieza sob pressão.',
      tip:'Reserve tempo deliberado para ouvir e envolver as pessoas.'},
    PAS:{inv:'HDS',name:'Passivo-Resistente',measures:'Cordialidade que pode virar resistência velada.',
      high:'Pode concordar na frente e resistir por baixo, evitando o confronto.',
      mid:'Expressa discordância de forma razoável.',
      low:'Aberto e direto ao discordar.',
      risk:'Resistência velada e evitação do confronto direto.',
      tip:'Diga o desconforto na hora, com cuidado, em vez de acumular.'},
    ARR:{inv:'HDS',name:'Arrogante',measures:'Confiança que pode virar arrogância e teimosia.',
      high:'Autoconfiança elevada; pode ter dificuldade em admitir erro.',
      mid:'Autoconfiança saudável.',
      low:'Humilde; reconhece limites com facilidade.',
      risk:'Autoconfiança em excesso e resistência a feedback.',
      tip:'Peça feedback ativamente e trate a crítica como dado, não ameaça.'},
    ARD:{inv:'HDS',name:'Ardiloso',measures:'Charme e ousadia que podem virar impulso e manipulação.',
      high:'Ousado e persuasivo; pode assumir riscos por emoção.',
      mid:'Ousadia equilibrada.',
      low:'Ponderado e avesso a riscos desnecessários.',
      risk:'Impulsividade e testes de limite arriscados.',
      tip:'Antes de arriscar, valide as consequências com alguém de confiança.'},
    MEL:{inv:'HDS',name:'Melodramático',measures:'Energia e presença que podem virar busca de holofote.',
      high:'Gosta de destaque; pode centralizar e buscar o palco.',
      mid:'Presença equilibrada.',
      low:'Discreto; não busca os holofotes.',
      risk:'Busca de protagonismo e dispersão do foco.',
      tip:'Delegue protagonismo; celebre as conquistas da equipe antes das suas.'},
    IMA:{inv:'HDS',name:'Imaginativo',measures:'Criatividade que pode virar ideias excêntricas.',
      high:'Muito criativo; ideias podem soar pouco realistas.',
      mid:'Criatividade equilibrada.',
      low:'Prático e convencional.',
      risk:'Ideias fora da realidade e excesso de confiança na intuição.',
      tip:'Traduza ideias em passos concretos e teste com dados antes de escalar.'},
    PER:{inv:'HDS',name:'Perfeccionista',measures:'Capricho que pode virar perfeccionismo e microgestão.',
      high:'Padrões altos; pode se prender a detalhes e microgerir.',
      mid:'Exigência equilibrada.',
      low:'Flexível; entrega "bom o suficiente" sem travar.',
      risk:'Perfeccionismo e microgestão.',
      tip:'Defina o nível de qualidade "suficiente" para cada entrega e delegue o detalhe.'},
    OBS:{inv:'HDS',name:'Obsequioso',measures:'Lealdade que pode virar subserviência e evitação de atrito.',
      high:'Pode ceder demais para agradar e evitar contrariar.',
      mid:'Apoio e lealdade equilibrados.',
      low:'Independente; posiciona-se com facilidade.',
      risk:'Subserviência e dificuldade de dizer não.',
      tip:'Pratique dizer "não" com uma alternativa; separe agradar de ser útil.'},

    // ===== MVPI — Valores =====
    REC:{inv:'MVPI',name:'Reconhecimento',measures:'Valoriza ser reconhecido e elogiado publicamente.',
      high:'Motiva-se por reconhecimento e visibilidade.',
      mid:'Aprecia reconhecimento sem depender dele.',
      low:'Pouco movido por holofote ou elogio público.',
      strength:'Reconhecimento público e visibilidade.'},
    POD:{inv:'MVPI',name:'Poder',measures:'Valoriza estar no comando e ter influência.',
      high:'Busca influência, status e posições de comando.',
      mid:'Gosto moderado por influência.',
      low:'Pouco interesse por status ou controle.',
      strength:'Influência e capacidade de comando.'},
    HED:{inv:'MVPI',name:'Hedonismo',measures:'Valoriza ambientes leves e divertidos.',
      high:'Valoriza leveza, diversão e prazer no trabalho.',
      mid:'Equilíbrio entre seriedade e leveza.',
      low:'Separa diversão de trabalho; foco na tarefa.',
      strength:'Ambiente leve e bom clima.'},
    ALT:{inv:'MVPI',name:'Altruísmo',measures:'Valoriza ajudar os outros e servir com excelência.',
      high:'Realiza-se ajudando e servindo às pessoas.',
      mid:'Equilíbrio entre servir e resultado próprio.',
      low:'Prioriza resultados sobre o servir.',
      strength:'Vocação para servir e cuidar das pessoas.'},
    AFI:{inv:'MVPI',name:'Afiliação',measures:'Valoriza relacionamentos e pertencimento.',
      high:'Valoriza pertencer a um grupo e cultivar relações.',
      mid:'Aprecia relações sem depender do grupo.',
      low:'Trabalha bem de forma autônoma e independente.',
      strength:'Rede de relacionamentos e senso de grupo.'},
    TRA:{inv:'MVPI',name:'Tradição',measures:'Valoriza princípios, cultura sólida e coerência de valores.',
      high:'Valoriza princípios sólidos e coerência de valores.',
      mid:'Respeita tradições com abertura ao novo.',
      low:'Pouco apego a convenções e tradições.',
      strength:'Princípios sólidos e coerência de valores.'},
    SEG:{inv:'MVPI',name:'Segurança',measures:'Valoriza estabilidade, previsibilidade e baixo risco.',
      high:'Prefere ambientes estáveis, previsíveis e seguros.',
      mid:'Busca estabilidade sem evitar todo risco.',
      low:'Confortável com incerteza e mudança.',
      strength:'Estabilidade e confiabilidade.'},
    COM:{inv:'MVPI',name:'Comercial',measures:'Valoriza resultado financeiro e visão de negócio.',
      high:'Forte orientação a resultado financeiro e negócio.',
      mid:'Atenção equilibrada a números e negócio.',
      low:'Pouco interesse por finanças e negócio.',
      strength:'Orientação a resultado e visão de negócio.'},
    EST:{inv:'MVPI',name:'Estética',measures:'Valoriza qualidade, forma e "look & feel".',
      high:'Dá grande importância a design, beleza e qualidade estética.',
      mid:'Aprecia estética sem que ela domine.',
      low:'Função importa mais que forma.',
      strength:'Cuidado com qualidade e estética.'},
    CIE:{inv:'MVPI',name:'Científico',measures:'Valoriza análise, lógica, dados e tecnologia.',
      high:'Gosta de resolver problemas com dados, lógica e análise.',
      mid:'Combina análise com intuição.',
      low:'Prefere decidir pela intuição a analisar dados.',
      strength:'Raciocínio analítico e uso de dados.'}
  };

  var HPI_ORDER=['AJU','AMB','SOC','SEN','PRU','INQ','APR'];
  var HDS_ORDER=['TEM','CET','CAU','RES','PAS','ARR','ARD','MEL','IMA','PER','OBS'];
  var MVPI_ORDER=['REC','POD','HED','ALT','AFI','TRA','SEG','COM','EST','CIE'];
  var ORDER=HPI_ORDER.concat(HDS_ORDER,MVPI_ORDER);

  // ---- Itens (3 por escala; key -1 = pontuação reversa) ----------------
  // Formato: [scale, key, texto]
  var RAW = [
    // HPI
    ['AJU', 1,'Mantenho a calma mesmo quando as coisas dão errado.'],
    ['AJU', 1,'Críticas e feedbacks negativos não me abalam por muito tempo.'],
    ['AJU',-1,'Costumo me preocupar bastante com problemas e possíveis erros.'],
    ['AMB', 1,'Gosto de assumir a liderança em grupos e projetos.'],
    ['AMB', 1,'Estabeleço metas ambiciosas e trabalho duro para alcançá-las.'],
    ['AMB',-1,'Prefiro seguir a agenda dos outros a tomar a frente.'],
    ['SOC', 1,'Sinto energia quando estou cercado de gente.'],
    ['SOC', 1,'Gosto de conhecer pessoas novas e puxar conversa.'],
    ['SOC',-1,'Prefiro passar meu tempo sozinho a em grandes grupos.'],
    ['SEN', 1,'Presto atenção aos sentimentos das pessoas ao meu redor.'],
    ['SEN', 1,'Faço questão de ser gentil e diplomático, mesmo em desacordos.'],
    ['SEN',-1,'Não me incomodo de ser duro ou direto quando acho necessário.'],
    ['PRU', 1,'Sigo regras e procedimentos com cuidado.'],
    ['PRU', 1,'Planejo minhas tarefas e cumpro prazos com disciplina.'],
    ['PRU',-1,'Costumo agir por impulso, sem planejar muito.'],
    ['INQ', 1,'Gosto de pensar em novas ideias e possibilidades.'],
    ['INQ', 1,'Tenho curiosidade por como as coisas funcionam.'],
    ['INQ',-1,'Prefiro o que é prático e concreto a discussões abstratas.'],
    ['APR', 1,'Gosto de estudar e me manter atualizado por meio de leitura e cursos.'],
    ['APR', 1,'Aprecio aprender conceitos teóricos, e não só na prática.'],
    ['APR',-1,'Aprendo muito melhor fazendo do que lendo ou estudando.'],
    // HDS
    ['TEM', 1,'Meu humor pode mudar bastante ao longo de um dia.'],
    ['TEM', 1,'Fico facilmente frustrado quando as coisas não saem como espero.'],
    ['TEM', 1,'Reajo com forte intensidade emocional a contratempos.'],
    ['CET', 1,'Costumo desconfiar das reais intenções das pessoas.'],
    ['CET', 1,'Tendo a esperar o pior das situações.'],
    ['CET',-1,'Dou o benefício da dúvida à maioria das pessoas.'],
    ['CAU', 1,'Evito tomar decisões por medo de errar.'],
    ['CAU', 1,'Fico muito preocupado com a possibilidade de ser criticado.'],
    ['CAU',-1,'Tomo decisões com facilidade, mesmo sob incerteza.'],
    ['RES', 1,'Prefiro resolver as coisas sozinho a envolver outras pessoas.'],
    ['RES', 1,'Tenho pouca paciência para lidar com as emoções alheias.'],
    ['RES',-1,'Faço questão de me manter próximo e conectado às pessoas.'],
    ['PAS', 1,'Quando discordo, prefiro resistir discretamente a confrontar de frente.'],
    ['PAS', 1,'Às vezes concordo na hora, mas depois acabo fazendo do meu jeito.'],
    ['PAS', 1,'Guardo incômodos para mim em vez de expô-los abertamente.'],
    ['ARR', 1,'Confio muito nas minhas capacidades — às vezes mais que os outros.'],
    ['ARR', 1,'Tenho dificuldade em admitir quando estou errado.'],
    ['ARR', 1,'Sinto que muitas vezes sei mais que as pessoas ao meu redor.'],
    ['ARD', 1,'Gosto de correr riscos e testar limites.'],
    ['ARD', 1,'Uso meu charme para conseguir o que quero.'],
    ['ARD',-1,'Penso bastante nas consequências antes de agir.'],
    ['MEL', 1,'Gosto de ser o centro das atenções.'],
    ['MEL', 1,'Sinto-me à vontade e me destaco quando estou em evidência.'],
    ['MEL', 1,'Fico incomodado quando não recebo atenção suficiente.'],
    ['IMA', 1,'Tenho formas de pensar que os outros costumam achar incomuns.'],
    ['IMA', 1,'Confio muito na minha intuição, mesmo sem provas concretas.'],
    ['IMA', 1,'Costumo propor ideias que fogem bastante do convencional.'],
    ['PER', 1,'Tenho padrões muito altos e cobro isso de mim e dos outros.'],
    ['PER', 1,'Presto atenção a detalhes a ponto de isso me atrasar.'],
    ['PER',-1,'Consigo entregar algo "bom o suficiente" sem me prender a detalhes.'],
    ['OBS', 1,'Evito contrariar as pessoas para manter a harmonia.'],
    ['OBS', 1,'Busco bastante a aprovação de quem está acima de mim.'],
    ['OBS', 1,'Tenho dificuldade em dizer "não" a pedidos.'],
    // MVPI
    ['REC', 1,'É importante para mim ser reconhecido publicamente pelo meu trabalho.'],
    ['REC', 1,'Gosto quando meus feitos são notados e elogiados.'],
    ['REC',-1,'Não faço questão de receber crédito pelo que faço.'],
    ['POD', 1,'Quero ter influência e ocupar posições de comando.'],
    ['POD', 1,'Gosto de competir para vencer e crescer.'],
    ['POD',-1,'Não me interesso por status ou por estar no controle.'],
    ['HED', 1,'Valorizo ambientes de trabalho leves e divertidos.'],
    ['HED', 1,'Acho importante que o trabalho também seja prazeroso.'],
    ['HED',-1,'Para mim, diversão e trabalho devem ficar totalmente separados.'],
    ['ALT', 1,'Sinto-me realizado quando ajudo os outros.'],
    ['ALT', 1,'Prestar um serviço excelente às pessoas me motiva muito.'],
    ['ALT',-1,'No trabalho, meus resultados vêm antes das necessidades dos outros.'],
    ['AFI', 1,'Valorizo fazer parte de um grupo unido.'],
    ['AFI', 1,'Gosto de construir e manter uma boa rede de relacionamentos.'],
    ['AFI',-1,'Trabalho bem melhor sozinho do que em equipe.'],
    ['TRA', 1,'Valorizo empresas com princípios e valores sólidos.'],
    ['TRA', 1,'É importante que meus valores pessoais combinem com os da organização.'],
    ['TRA',-1,'Não me importo muito com tradições ou convenções.'],
    ['SEG', 1,'Prefiro ambientes estáveis e previsíveis.'],
    ['SEG', 1,'Valorizo segurança e baixo risco nas minhas escolhas.'],
    ['SEG',-1,'Sinto-me confortável com incerteza e instabilidade.'],
    ['COM', 1,'Tenho forte interesse por resultados financeiros e por negócios.'],
    ['COM', 1,'Gosto de acompanhar metas, números e lucratividade.'],
    ['COM',-1,'Assuntos de dinheiro e finanças me interessam pouco.'],
    ['EST', 1,'Dou grande importância à aparência e à qualidade estética das coisas.'],
    ['EST', 1,'Aprecio design, beleza e bom gosto no que produzo.'],
    ['EST',-1,'Função importa muito mais para mim do que forma.'],
    ['CIE', 1,'Gosto de resolver problemas com dados e análise.'],
    ['CIE', 1,'Valorizo lógica, evidências e raciocínio estruturado.'],
    ['CIE',-1,'Prefiro decidir pela intuição a analisar dados.']
  ];

  var counters={};
  var ITEMS = RAW.map(function(r){
    var sc=r[0]; counters[sc]=(counters[sc]||0)+1;
    return { id: sc+counters[sc], scale:sc, key:r[1], text:r[2] };
  });

  // Ordem de apresentação embaralhada (determinística) para reduzir viés
  function shuffledItems(){
    var a=ITEMS.slice(); var seed=97;
    for(var i=a.length-1;i>0;i--){ seed=(seed*1103515245+12345)&0x7fffffff; var j=seed% (i+1); var t=a[i];a[i]=a[j];a[j]=t;}
    return a;
  }

  // ---- Pontuação -------------------------------------------------------
  function score(answers){
    var sums={},cnts={};
    ITEMS.forEach(function(it){
      var v=answers[it.id]; if(v==null) return;
      v=+v; var adj = it.key<0 ? (6-v) : v;
      sums[it.scale]=(sums[it.scale]||0)+adj; cnts[it.scale]=(cnts[it.scale]||0)+1;
    });
    var out={};
    ORDER.forEach(function(sc){
      if(cnts[sc]){ var mean=sums[sc]/cnts[sc]; out[sc]=Math.round((mean-1)/4*100); }
    });
    return out; // {scale: 0..100}
  }

  function band(v){ return v>=70?'high':(v<=30?'low':'mid'); }

  // ---- Síntese automática ---------------------------------------------
  function analyze(scores){
    function nm(sc){return SCALES[sc].name;}
    var highHPI=HPI_ORDER.filter(function(s){return scores[s]>=70;});
    var lowHPI =HPI_ORDER.filter(function(s){return scores[s]<=30;});
    var risks  =HDS_ORDER.filter(function(s){return scores[s]>=70;}).sort(function(a,b){return scores[b]-scores[a];});
    var highVal=MVPI_ORDER.filter(function(s){return scores[s]>=70;}).sort(function(a,b){return scores[b]-scores[a];});

    // Resumo
    var resumo='';
    if(highHPI.length) resumo+='Estilo marcado por '+list(highHPI.map(nm))+'. ';
    else resumo+='Estilo de liderança equilibrado, sem traços extremos no HPI. ';
    if(highVal.length) resumo+='Valores centrais: '+list(highVal.slice(0,4).map(nm))+'. ';
    if(risks.length) resumo+='Principais riscos sob estresse: '+list(risks.slice(0,3).map(nm))+'.';
    else resumo+='Nenhum risco de descarrilamento em zona alta — bom autocontrole sob pressão.';

    // Fortes
    var fortes=[];
    highHPI.forEach(function(s){fortes.push(SCALES[s].strength+' ('+nm(s)+' '+scores[s]+')');});
    highVal.slice(0,4).forEach(function(s){fortes.push('Valoriza '+SCALES[s].name.toLowerCase()+' ('+scores[s]+') — '+SCALES[s].strength.toLowerCase());});
    if(scores.AJU<=30) fortes.push('Humildade e abertura para aprender e receber orientação.');
    if(!fortes.length) fortes.push('Perfil equilibrado, com forças distribuídas de forma consistente.');

    // Atenção
    var atencao=[];
    risks.forEach(function(s){atencao.push(SCALES[s].risk+' ('+nm(s)+' '+scores[s]+')');});
    if(scores.AJU<=30) atencao.push('Sensibilidade ao estresse e ao feedback (Ajustamento '+scores.AJU+').');
    if(!atencao.length) atencao.push('Sem pontos de atenção marcantes — mantenha a consciência dos próprios limites.');

    // Recomendações
    var recs=[];
    risks.slice(0,5).forEach(function(s){recs.push({t:nm(s),p:SCALES[s].tip});});
    if(scores.AJU<=30) recs.push({t:'Feedback como aliado',p:'Peça feedback ativamente e separe o dado emocional do útil antes de responder.'});
    if(!recs.length) recs.push({t:'Consolidar forças',p:'Aprofunde seus pontos fortes e busque contextos que os exijam plenamente.'});

    // Insights de convergência
    var ins=[];
    if(scores.SEN>=70 && (scores.PAS>=65||scores.OBS>=65))
      ins.push('Aversão ao conflito: alta Sensibilidade Interpessoal somada a '+(scores.PAS>=65?'Passivo-Resistente':'Obsequioso')+' indica tendência a evitar confrontos e acomodar — priorize desenvolver o confronto saudável.');
    if(scores.AJU<=35 && scores.ARR>=65)
      ins.push('Paradoxo sensibilidade × autoconfiança: você tende a sentir a crítica por dentro (Ajustamento baixo) e defender a posição por fora (Arrogante alto).');
    if(scores.INQ>=65 && scores.PRU>=65)
      ins.push('Criatividade com método: alta Curiosidade/Inquisitivo com alta Prudência sugere ideias que costumam aterrissar na execução.');
    if(scores.ALT>=70 && scores.SEG>=70)
      ins.push('Perfil servidor e estável: vocação para servir aliada à busca por segurança favorece ambientes de cuidado, cultura e previsibilidade.');

    // SWOT
    var S=fortes.slice(0,5);
    var W=atencao.slice(0,5);
    var O=[]; var T=[];
    if(scores.SEN>=60||scores.ALT>=60){O.push('Liderança de pessoas, cultura e relacionamento');}
    if(scores.INQ>=60||scores.CIE>=60){O.push('Papéis que unem visão estratégica e análise');}
    if(scores.COM>=60){O.push('Posições com foco em resultado e negócio');}
    if(scores.SEG>=60||scores.TRA>=60){O.push('Ambientes estruturados, de valores sólidos e previsíveis');}
    if(!O.length)O.push('Contextos que aproveitem seu conjunto equilibrado de forças');
    if(scores.SEN>=60||scores.PAS>=60){T.push('Ambientes de alto conflito ou política agressiva');}
    if(scores.SEG>=60){T.push('Contextos de mudança caótica e alto risco');}
    if(scores.AJU<=30){T.push('Feedback duro sem relação de confiança prévia');}
    if(scores.REC>=70){T.push('Falta de reconhecimento pode minar a motivação');}
    if(!T.length)T.push('Culturas frias, impessoais e puramente transacionais');

    return {resumo:resumo,fortes:fortes,atencao:atencao,recs:recs,insights:ins,swot:{S:S,W:W,O:O,T:T}};
  }

  function list(arr){ if(arr.length<=1)return arr.join(''); return arr.slice(0,-1).join(', ')+' e '+arr[arr.length-1]; }

  // ---- Codificação para transporte (unicode-safe base64) ---------------
  function enc(obj){ return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); }
  function dec(s){ return JSON.parse(decodeURIComponent(escape(atob(s)))); }

  root.HOGAN = {
    C:C, SCALES:SCALES, ITEMS:ITEMS, ORDER:ORDER,
    HPI:HPI_ORDER, HDS:HDS_ORDER, MVPI:MVPI_ORDER,
    shuffledItems:shuffledItems, score:score, band:band, analyze:analyze,
    enc:enc, dec:dec,
    LIKERT:['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'],
    VERSION:1
  };
})(window);
