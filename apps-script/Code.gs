/* ============================================================
   BACKEND — Google Apps Script (Web App)
   Guarda as respostas numa Planilha e envia os relatórios por e-mail.
   Veja INSTRUCOES.md para publicar. NÃO coloque a chave de admin aqui;
   ela fica em "Propriedades do script" (Configurações do projeto).
   ============================================================ */

var SHEET_NAME = 'Respostas';

// Deixe vazio se o script estiver VINCULADO à planilha (Extensões → Apps Script).
// Se for um projeto INDEPENDENTE, cole aqui o ID da planilha (parte da URL entre /d/ e /edit).
var SHEET_ID = '';

function ss_() {
  return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_() {
  var ss = ss_();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'timestamp', 'nome', 'email', 'lider', 'respostas_json']);
  }
  return sh;
}

function adminKey_() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_KEY') || '';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('Mapa de Perfil — backend ativo.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');
    var action = body.action;

    if (action === 'save') return handleSave_(body);

    // Ações de administrador exigem a chave correta:
    var key = adminKey_();
    if (!key) return json_({ ok: false, error: 'ADMIN_KEY não configurada no script.' });
    if (body.adminKey !== key) return json_({ ok: false, error: 'Chave de administrador inválida.' });

    if (action === 'list')   return handleList_();
    if (action === 'delete') return handleDelete_(body);
    if (action === 'send')   return handleSend_(body);

    return json_({ ok: false, error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function handleSave_(body) {
  var rec = body.record || {};
  if (!rec.answers || typeof rec.answers !== 'object') {
    return json_({ ok: false, error: 'Respostas ausentes.' });
  }
  var id = Utilities.getUuid();
  var sh = getSheet_();
  sh.appendRow([
    id,
    rec.date || new Date().toISOString(),
    rec.name || '',
    rec.email || '',
    rec.lider || '',
    JSON.stringify(rec.answers)
  ]);
  return json_({ ok: true, id: id });
}

function handleList_() {
  var sh = getSheet_();
  var values = sh.getDataRange().getValues();
  var people = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (!row[0]) continue;
    var answers = {};
    try { answers = JSON.parse(row[5]); } catch (e) {}
    people.push({
      id: row[0],
      date: row[1] ? new Date(row[1]).toISOString() : '',
      name: row[2],
      email: row[3],
      lider: row[4],
      answers: answers
    });
  }
  return json_({ ok: true, people: people });
}

function handleDelete_(body) {
  var sh = getSheet_();
  var values = sh.getDataRange().getValues();
  for (var i = values.length - 1; i >= 1; i--) {
    if (values[i][0] === body.id) { sh.deleteRow(i + 1); return json_({ ok: true }); }
  }
  return json_({ ok: false, error: 'Registro não encontrado.' });
}

function handleSend_(body) {
  if (!body.to) return json_({ ok: false, error: 'Destinatário ausente.' });
  var bytes = Utilities.base64Decode(body.pdfBase64 || '');
  var blob = Utilities.newBlob(bytes, 'application/pdf', body.filename || 'relatorio.pdf');
  var subject = body.subject || 'Seu relatório';
  var intro = body.intro || 'Segue em anexo o seu relatório.';
  GmailApp.sendEmail(body.to, subject, intro, {
    name: body.senderName || 'Mapa de Perfil',
    htmlBody: '<p style="font-family:Arial,sans-serif;font-size:14px;color:#1c2430;">' +
              intro.replace(/</g, '&lt;') + '</p>',
    attachments: [blob]
  });
  return json_({ ok: true });
}
