# Mapa de Perfil — app web (GitHub Pages + Google Apps Script)

Teste de personalidade **inspirado** no modelo de três dimensões (estilo / riscos / valores), com itens 100% originais. Site estático + backend gratuito no Google Apps Script.

> ⚠️ **Ferramenta educativa.** Não é o Hogan Assessment, não reproduz suas perguntas nem suas normas. Pontuações 0–100 referenciadas na própria escala. Uso para autoconhecimento e desenvolvimento — não para seleção de pessoal ou fins clínicos.

## Como funciona

1. A pessoa abre o link e responde em **`responder.html`**.
2. Ao concluir, as respostas são **salvas automaticamente** na sua Planilha Google (via Apps Script).
3. Você entra em **`admin.html`** com sua chave e vê a lista de respondentes. Pode:
   - **Ver respostas** (item a item)
   - **Ver relatório** individual (o respondente nunca vê)
   - **Enviar** o relatório em PDF por e-mail — individual ou **em massa** (selecionar todos)
   - **Comparar** perfis selecionados (`comparativo.html`)
   - **Resumo do time** com estatísticas agregadas (`resumo-time.html`)

## Estrutura

```
index.html          Página inicial (participante) + link discreto do aplicador
responder.html      Questionário (salva no backend ao concluir)
admin.html          Painel do aplicador (lista, ver, enviar, em massa)
resultado.html      Relatório individual
comparativo.html    Comparativo entre respondentes
resumo-time.html    Estatísticas do time
assets/
  core.js               Itens, escalas, pontuação e análise
  report.js             Renderização do relatório
  api.js                Comunicação com o Apps Script
  config.js             ← EDITE: cole aqui a URL do seu Apps Script
  html2pdf.bundle.min.js Gera o PDF no navegador (para anexar no e-mail)
apps-script/
  Code.gs               Backend para colar no Apps Script
  INSTRUCOES.md         Passo a passo do backend
```

## Passo a passo de publicação

### A) Backend (uma vez)
Siga **`apps-script/INSTRUCOES.md`**. Ao final você terá a **URL do Web App** e terá colado em `assets/config.js`.

### B) Publicar no GitHub Pages
1. Crie um repositório no GitHub (ex.: `mapa-de-perfil`).
2. Suba **todo o conteúdo desta pasta** para o repositório (arrastar-e-soltar em *Add file → Upload files*, ou via `git`).
3. No repositório: **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**; branch **main** / pasta **/ (root)**; **Save**.
5. Aguarde ~1 min. O link ficará algo como `https://SEU-USUARIO.github.io/mapa-de-perfil/`.

### C) Compartilhar
- **Participantes:** envie `https://.../responder.html`
- **Você (aplicador):** acesse `https://.../admin.html` e entre com sua `ADMIN_KEY`.

> Importante: só edite `assets/config.js` **depois** de ter a URL do Apps Script. Enquanto não configurar, o questionário oferece baixar as respostas em arquivo (modo de contingência).

## Via git (alternativa ao upload manual)

```bash
cd "Teste-Personalidade-Web"
git init
git add .
git commit -m "Mapa de Perfil"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/mapa-de-perfil.git
git push -u origin main
```

Depois ative o Pages como no passo B.


Chave administrativa - mp-e8wrq5w3ti-fimn
