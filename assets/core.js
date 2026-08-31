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

  // ---- Bibliotecas de texto (relatório aprofundado) -------------------
  var FORTE_LONG = {
    AJU:{t:'Firmeza emocional',p:'Mantém a serenidade sob pressão e transforma a crítica em aprendizado, sem se abalar por muito tempo.'},
    AMB:{t:'Motor de iniciativa',p:'Assume a frente, define metas ambiciosas e mobiliza esforço próprio e do time para alcançá-las.'},
    SOC:{t:'Presença que engaja',p:'Comunica com naturalidade, cria conexão rápida e energiza o grupo à sua volta.'},
    SEN:{t:'Inteligência relacional',p:'Lê o clima, acolhe e constrói relações de confiança — um talento raro para lidar com pessoas.'},
    PRU:{t:'Confiabilidade em ação',p:'Organiza, cumpre prazos e respeita processos; é a pessoa em quem o time pode contar.'},
    INQ:{t:'Mente estratégica',p:'Curiosa e fértil em ideias, enxerga o quadro geral e propõe caminhos novos.'},
    APR:{t:'Sede de aprender',p:'Valoriza estudo e atualização, o que sustenta um crescimento contínuo.'},
    REC:{t:'Movida a reconhecimento',p:'Entrega o seu melhor quando o bom trabalho é notado e celebrado.'},
    POD:{t:'Vontade de influenciar',p:'Busca protagonismo e ocupa com desenvoltura espaços de decisão.'},
    HED:{t:'Leveza produtiva',p:'Valoriza um bom clima e ajuda a manter o astral e a energia do time.'},
    ALT:{t:'Vocação de servir',p:'Realiza-se ao ajudar pessoas e clientes e ao entregar um serviço de excelência.'},
    AFI:{t:'Construtor de vínculos',p:'Cultiva relações e fortalece o senso de pertencimento do grupo.'},
    TRA:{t:'Bússola de valores',p:'Age por princípios e preza a coerência entre discurso, prática e propósito.'},
    SEG:{t:'Âncora de estabilidade',p:'Traz consistência e reduz a ansiedade do time diante da incerteza.'},
    COM:{t:'Foco em resultado',p:'Conecta o trabalho a metas, números e à saúde do negócio.'},
    EST:{t:'Padrão de qualidade',p:'Cuida da forma, do acabamento e da experiência final do que entrega.'},
    CIE:{t:'Rigor analítico',p:'Decide com dados, lógica e evidências, evitando achismos.'}
  };
  var ATTN_LONG = {
    TEM:{t:'Volatilidade sob pressão',p:'O humor oscila e as reações ganham intensidade, o que pode contaminar o clima e decisões tomadas no calor do momento.'},
    CET:{t:'Desconfiança',p:'A leitura crítica pode virar suspeita de segundas intenções onde não há, minando a colaboração.'},
    CAU:{t:'Excesso de cautela',p:'O medo de errar adia decisões e faz perder oportunidades.'},
    RES:{t:'Distanciamento',p:'Resolver tudo sozinho e afastar-se das pessoas enfraquece o vínculo com o time.'},
    PAS:{t:'Resistência velada',p:'Concordar na frente e resistir por baixo gera ruído, retrabalho e mágoas não ditas.'},
    ARR:{t:'Autoconfiança em excesso',p:'Pode fechar os ouvidos, dificultando admitir erro e absorver feedback.'},
    ARD:{t:'Impulsividade',p:'A ousadia pode levar a assumir riscos pela emoção, sem medir consequências.'},
    MEL:{t:'Busca por holofote',p:'Querer o centro das atenções pode centralizar e tirar espaço e foco do time.'},
    IMA:{t:'Ideias fora da realidade',p:'A criatividade pode descolar do prático, com confiança excessiva na própria intuição.'},
    PER:{t:'Perfeccionismo',p:'Prender-se a detalhes e microgerir atrasa entregas e sufoca a autonomia da equipe.'},
    OBS:{t:'Dificuldade de se posicionar',p:'A necessidade de agradar leva a ceder demais e a evitar dizer não.'},
    AJU_LOW:{t:'Sensibilidade ao estresse e ao feedback',p:'A crítica dura desestabiliza e pode gerar ruminação ou reação emocional.'},
    APR_LOW:{t:'Aprendizado formal',p:'Menos à vontade com teoria e estudo estruturado; prefere a prática — o que pode limitar a absorção de conteúdos formais.'}
  };
  var REC_LONG = {
    TEM:{t:'Regular a reação emocional',p:'Crie um intervalo deliberado entre o gatilho e a resposta: respire, nomeie a emoção e só então aja. Decisões importantes, deixe para quando o humor estiver estável.'},
    CET:{t:'Confiar com base em fatos',p:'Antes de assumir má intenção, teste a hipótese negativa com dados concretos. Pergunte diretamente em vez de supor — a maioria das pessoas merece o benefício da dúvida.'},
    CAU:{t:'Decidir com rede de segurança',p:'Defina um prazo-limite para cada decisão e liste o custo de NÃO agir. Comece por escolhas reversíveis para treinar a decisão sob incerteza.'},
    RES:{t:'Aproximar-se de propósito',p:'Reserve tempo na agenda para ouvir e envolver as pessoas, mesmo quando resolveria mais rápido sozinho. Delegar também é uma forma de conectar.'},
    PAS:{t:'Praticar o confronto saudável',p:'Diga o desconforto na hora, com cuidado, em vez de acumular. Combine e registre acordos por escrito e trate a divergência como dado, não como ameaça à relação.'},
    ARR:{t:'Feedback como aliado',p:'Peça feedback ativamente a fontes confiáveis e trate a crítica como informação, não como ataque. Antes de defender a sua posição, repita com suas palavras o ponto do outro.'},
    ARD:{t:'Risco calculado',p:'Antes de arriscar, valide as consequências com alguém de confiança e transforme a ousadia em experimentos pequenos e controlados, com critério de parada.'},
    MEL:{t:'Dar o palco',p:'Delegue protagonismo e celebre as conquistas do time antes das suas. Em reuniões, fale por último e pergunte mais do que afirma.'},
    IMA:{t:'Aterrissar as ideias',p:'Traduza cada ideia em passos concretos e um teste pequeno com dados antes de escalar. Peça a alguém pragmático para pressionar a viabilidade.'},
    PER:{t:'Definir o "bom o suficiente"',p:'Combine o nível de qualidade necessário para cada entrega e proteja os prazos do excesso de detalhe. Delegue o detalhe e resista à vontade de refazer.'},
    OBS:{t:'Aprender a dizer não',p:'Pratique recusar com uma alternativa ("isto não consigo, mas aquilo sim"). Separe agradar de ser útil: às vezes o mais útil é discordar.'},
    AJU:{t:'Fortalecer a resiliência',p:'Construa uma rotina de descompressão e um par de confiança para validar percepções sob estresse. Separe o dado emocional do dado útil antes de responder a uma crítica.'},
    APR:{t:'Aprender pela prática',p:'Prefira job rotation, mentoria e projetos reais a cursos teóricos; peça para "colocar a mão" e transforme a experiência em aprendizado deliberado.'}
  };

  // ---- Síntese automática (aprofundada) -------------------------------
  function analyze(scores){
    function nm(sc){return SCALES[sc].name;}
    function av(a){var s=0,n=0;a.forEach(function(x){if(scores[x]!=null){s+=scores[x];n++;}});return n?s/n:0;}
    var highHPI=HPI_ORDER.filter(function(s){return scores[s]>=70;}).sort(function(a,b){return scores[b]-scores[a];});
    var risks  =HDS_ORDER.filter(function(s){return scores[s]>=70;}).sort(function(a,b){return scores[b]-scores[a];});
    var highVal=MVPI_ORDER.filter(function(s){return scores[s]>=70;}).sort(function(a,b){return scores[b]-scores[a];});

    var themes=[
      {k:'relacional',v:av(['SEN','ALT','AFI','SOC']),label:'de perfil relacional e voltado(a) a pessoas',desc:'atua pelo vínculo, pelo acolhimento e pela construção de relações de confiança'},
      {k:'estrutura',v:av(['PRU','TRA','SEG']),label:'estruturado(a) e confiável',desc:'traz método, consistência e segurança, entregando o que promete'},
      {k:'resultado',v:av(['AMB','POD','COM','REC']),label:'orientado(a) a resultado',desc:'move-se por metas, entrega e impacto no negócio'},
      {k:'estrategico',v:av(['INQ','CIE','IMA']),label:'de perfil estratégico e criativo',desc:'pensa o quadro geral, gera ideias e resolve problemas com análise'}
    ].sort(function(a,b){return b.v-a.v;});

    // ----- Resumo (parágrafos) -----
    var p1='No conjunto, este é o perfil de um(a) profissional '+themes[0].label
      +(themes[1].v>=55?', também '+themes[1].label:'')
      +'. Na prática, '+themes[0].desc+(themes[1].v>=55?'; ao mesmo tempo, '+themes[1].desc:'')+'.';
    var nucleo=highHPI.slice(0,4).map(function(s){return nm(s)+' ('+scores[s]+')';});
    var p2='';
    if(nucleo.length) p2+='O núcleo de forças aparece em '+list(nucleo)+'. ';
    if(highVal.length) p2+='No que o motiva, os valores centrais são '+list(highVal.slice(0,4).map(function(s){return nm(s)+' ('+scores[s]+')';}))+' — é o tipo de ambiente e de propósito em que essa pessoa rende mais.';
    if(!p2) p2='As forças estão distribuídas de forma equilibrada, sem um traço dominante — um perfil versátil, que se adapta a diferentes contextos.';
    var p3='';
    if(scores.AJU<=30) p3+='O Ajustamento baixo ('+scores.AJU+') indica alguém responsivo e aberto a aprender, porém sensível ao estresse e ao feedback. ';
    else if(scores.AJU>=70) p3+='O Ajustamento alto ('+scores.AJU+') sustenta calma e resiliência sob pressão. ';
    if(risks.length) p3+='Sob estresse, os pontos a vigiar são '+list(risks.slice(0,3).map(function(s){return nm(s)+' ('+scores[s]+')';}))+(risks.length>3?', entre outros':'')+'.';
    else p3+='Não há riscos de descarrilamento em zona alta — sinal de bom autocontrole sob pressão.';
    var resumoParas=[p1,p2,p3].filter(function(x){return x;});

    // ----- O que essa análise diz sobre você -----
    var tensoes=[];
    if((scores.ALT>=70||scores.SEN>=70)&&(scores.POD>=65||scores.COM>=65||scores.REC>=70)) tensoes.push('querer servir e agradar e, ao mesmo tempo, querer reconhecimento e protagonismo');
    if((scores.PRU>=65||scores.SEG>=70)&&(scores.INQ>=65||scores.IMA>=70)) tensoes.push('ser prudente e avesso a risco e, ao mesmo tempo, ter mente criativa e inquieta');
    if(scores.AJU<=35&&scores.ARR>=65) tensoes.push('ser sensível ao que pensam de você e, ao mesmo tempo, confiante nas próprias convicções');
    if(scores.SEN>=70&&scores.AMB>=65) tensoes.push('cuidar das relações e, ao mesmo tempo, cobrar e puxar resultados');
    var vem=themes[0].k==='relacional'?'da relação, do exemplo e da dedicação às pessoas'
      :themes[0].k==='estrutura'?'da confiabilidade, da coerência e da consistência das entregas'
      :themes[0].k==='resultado'?'da capacidade de entregar e de mobilizar em torno de metas'
      :'da visão, das ideias e da clareza de raciocínio';
    var foco=(scores.SEN>=75||risks.indexOf('PAS')>=0)?'sustentar o desconforto do conflito e do feedback sem perder o calor humano'
      :scores.ARR>=70?'manter os ouvidos abertos ao feedback, mesmo quando confia na própria posição'
      :risks.length?'transformar o principal risco ('+nm(risks[0])+') em consciência e autocontrole'
      :'aprofundar suas forças e buscar contextos que as exijam plenamente';
    var oQueDiz='Essa análise sugere que sua força vem menos da imposição e mais '+vem+'. '
      +(tensoes.length?'Você carrega tensões produtivas — '+list(tensoes)+'. Bem administradas, tornam sua atuação mais completa; mal administradas, viram os pontos de atenção acima. ':'')
      +'O maior salto de desenvolvimento tende a estar em '+foco+'.';

    var fraseCore=themes[0].k==='relacional'?'conquista pelo cuidado, pela relação e pela confiança'
      :themes[0].k==='estrutura'?'conquista pela confiabilidade, pela consistência e pela palavra cumprida'
      :themes[0].k==='resultado'?'conquista pela entrega, pela ambição e pelo foco em resultado'
      :'conquista pela visão, pelas ideias e pela clareza de raciocínio';
    var fraseRisco=risks.length?' — cujo maior desafio é '+((scores.SEN>=75||risks.indexOf('PAS')>=0)?'encarar o conflito e o feedback de frente':scores.ARR>=70?'manter os ouvidos abertos ao feedback':'gerir '+nm(risks[0]).toLowerCase()+' sob pressão'):' — com bom equilíbrio entre forças e autocontrole';
    var frase='Um(a) profissional que '+fraseCore+fraseRisco+'.';

    // ----- Pontos fortes (título + explicação) -----
    var fortes=[];
    highHPI.forEach(function(s){if(FORTE_LONG[s])fortes.push({t:FORTE_LONG[s].t+' — '+nm(s)+' '+scores[s],p:FORTE_LONG[s].p});});
    highVal.slice(0,5).forEach(function(s){if(FORTE_LONG[s])fortes.push({t:FORTE_LONG[s].t+' — '+nm(s)+' '+scores[s],p:FORTE_LONG[s].p});});
    if(scores.AJU<=30) fortes.push({t:'Humildade e abertura — Ajustamento '+scores.AJU,p:'Recebe orientação com facilidade e está sempre disposto a aprender; um solo fértil para desenvolvimento.'});
    if(!fortes.length) fortes.push({t:'Perfil equilibrado',p:'Forças distribuídas de forma consistente, sem um traço dominante — versatilidade para atuar em contextos variados.'});

    // ----- Pontos de atenção -----
    var atencao=[];
    risks.forEach(function(s){if(ATTN_LONG[s])atencao.push({t:ATTN_LONG[s].t+' — '+nm(s)+' '+scores[s],p:ATTN_LONG[s].p});});
    if(scores.AJU<=30) atencao.push({t:ATTN_LONG.AJU_LOW.t+' — Ajustamento '+scores.AJU,p:ATTN_LONG.AJU_LOW.p});
    if(scores.APR<=30 && atencao.length<5) atencao.push({t:ATTN_LONG.APR_LOW.t+' — Abordagem a Aprendizagem '+scores.APR,p:ATTN_LONG.APR_LOW.p});
    if(!atencao.length) atencao.push({t:'Sem pontos de atenção marcantes',p:'Nenhum traço em zona de risco. Mantenha a autoconsciência e o hábito de pedir feedback para não desenvolver pontos cegos.'});

    // ----- Recomendações -----
    var recs=[];
    risks.slice(0,5).forEach(function(s){if(REC_LONG[s])recs.push(REC_LONG[s]);});
    if(scores.AJU<=30) recs.push(REC_LONG.AJU);
    if(scores.APR<=30 && recs.length<6) recs.push(REC_LONG.APR);
    if(!recs.length) recs.push({t:'Consolidar e ampliar forças',p:'Aprofunde seus pontos fortes, assuma desafios que os exijam plenamente e busque um feedback estruturado a cada ciclo para acelerar o desenvolvimento.'});

    // ----- Insights de convergência -----
    var ins=[];
    if(scores.SEN>=70 && (scores.PAS>=65||scores.OBS>=65))
      ins.push('Aversão ao conflito: a alta Sensibilidade Interpessoal somada a '+(scores.PAS>=65?'Passivo-Resistente':'Obsequioso')+' indica tendência a evitar confrontos e acomodar. Como nada no perfil compensa isso naturalmente, é a prioridade nº 1 — mas a boa notícia é que se resolve com prática de conversas diretas.');
    if(scores.AJU<=35 && scores.ARR>=65)
      ins.push('Paradoxo sensibilidade × autoconfiança: tende a sentir a crítica por dentro (Ajustamento baixo) e a defender a posição por fora (Arrogante alto). Reconhecer essa dinâmica é o que transforma feedback em desenvolvimento, em vez de defesa ou ruminação.');
    if(scores.INQ>=65 && scores.PRU>=65)
      ins.push('Criatividade com método: alta Curiosidade com alta Prudência sugere ideias que costumam aterrissar na execução — uma combinação valiosa e incomum.');
    if(scores.ALT>=70 && scores.SEG>=70)
      ins.push('Perfil servidor e estável: a vocação para servir aliada à busca por segurança favorece ambientes de cuidado, cultura forte e previsibilidade.');
    if(scores.ARD>=70 && scores.PRU>=65)
      ins.push('Ousadia com freio: o gosto por risco convive com a prudência, o que tende a produzir inovação sem imprudência — cuide para o freio não virar imobilismo.');

    // ----- SWOT (aprofundada) -----
    var S=fortes.slice(0,6).map(function(f){return f.t.replace(/ — .*$/,'')+' — '+f.p.replace(/\.$/,'').split(';')[0];});
    var W=atencao.slice(0,6).map(function(f){return f.t.replace(/ — .*$/,'')+' — '+f.p.replace(/\.$/,'').split(';')[0];});
    var O=[]; var T=[];
    if(scores.SEN>=60||scores.ALT>=60) O.push('Liderar pessoas, cultura e experiência do cliente, onde o vínculo humano é diferencial');
    if(scores.INQ>=60||scores.CIE>=60) O.push('Projetos que unam visão estratégica e análise de dados');
    if(scores.COM>=60||scores.POD>=60) O.push('Posições de resultado e de influência no negócio');
    if(scores.PRU>=60||scores.SEG>=60||scores.TRA>=60) O.push('Ambientes estruturados, de valores sólidos e previsíveis, onde a confiabilidade rende');
    if(scores.AMB>=65) O.push('Trilhas de crescimento e metas desafiadoras que canalizem a ambição');
    if(scores.SOC>=65) O.push('Papéis de porta-voz, mentoria e integração de equipes');
    if(!O.length) O.push('Contextos que aproveitem seu conjunto equilibrado de forças');
    if(scores.SEN>=60||scores.PAS>=60||scores.OBS>=60) T.push('Ambientes de alto conflito ou política agressiva, que exigem confronto constante');
    if(scores.SEG>=60) T.push('Mudança caótica e decisões de alto risco sob incerteza');
    if(scores.AJU<=30) T.push('Feedback duro e impessoal, sem relação de confiança prévia');
    if(scores.REC>=70) T.push('Falta de reconhecimento, que tende a minar a motivação');
    if(scores.ARR>=70) T.push('Contextos que exigem ceder e admitir erro com frequência');
    if(!T.length) T.push('Culturas frias, impessoais e puramente transacionais');
    var swotSintese='Forças e riscos costumam apontar para a mesma fronteira: '+foco+'. Feito isso, o ambiente que mais favorece é '+(O[0]||'aquele que exige suas forças').toLowerCase()+'.';

    return {resumoParas:resumoParas, oQueDiz:oQueDiz, frase:frase,
            fortes:fortes, atencao:atencao, recs:recs, insights:ins,
            swot:{S:S,W:W,O:O,T:T}, swotSintese:swotSintese};
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
