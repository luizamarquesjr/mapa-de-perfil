# Backend no Google Apps Script — passo a passo (~10 min)

Isto cria o "cérebro" que **guarda as respostas numa Planilha** e **envia os relatórios por e-mail pelo seu Gmail**. Feito uma vez.

## 1. Criar a Planilha
1. Acesse https://sheets.google.com e crie uma **planilha em branco**.
2. Dê um nome (ex.: `Mapa de Perfil — Respostas`). Pode deixar a aba vazia; o script cria a estrutura sozinho.

## 2. Abrir o editor de script
1. Na planilha, menu **Extensões → Apps Script**.
2. Apague qualquer conteúdo de `Código.gs`.
3. Cole **todo** o conteúdo do arquivo [`Code.gs`](Code.gs) (que está nesta pasta).
4. Clique no ícone de **salvar** (💾).

## 3. Definir a chave de administrador (senha do painel)
1. No editor, clique na engrenagem **⚙ Configurações do projeto** (menu à esquerda).
2. Role até **Propriedades do script → Adicionar propriedade do script**.
3. Propriedade: `ADMIN_KEY`  ·  Valor: **uma senha forte à sua escolha** (ex.: `time2026#luiz`).
4. Salvar. *(Essa é a chave que você digitará no painel do aplicador. Nunca vai para o site público.)*

## 4. Publicar como aplicativo da web
1. Botão azul **Implantar → Nova implantação**.
2. Em "Tipo", escolha **App da Web**.
3. Configurações:
   - **Executar como:** Eu (seu e-mail)
   - **Quem pode acessar:** **Qualquer pessoa**
4. Clique **Implantar**. Autorize os acessos quando pedir (é seguro — é o seu próprio script). Vai aparecer um aviso do Google ("app não verificado"): clique em **Avançado → Acessar o projeto (não seguro)** e permita. Isso acontece porque o app é seu e ainda não passou por revisão pública — pode prosseguir.
5. **Copie a "URL do app da web"** (termina em `/exec`).

## 5. Conectar o site à URL
1. Abra o arquivo **`assets/config.js`** do site.
2. Substitua o valor de `SCRIPT_URL` pela URL que você copiou. Salve.

Pronto! Ao publicar o site (ver `README.md`), as respostas passam a cair na planilha automaticamente e o botão **Enviar** dispara os e-mails.

---

## Atualizações do script
Se editar o `Code.gs` depois, publique de novo em **Implantar → Gerenciar implantações → (editar) → Nova versão**. A URL `/exec` continua a mesma.

## Limites de envio de e-mail
Contas Gmail comuns enviam até ~100 e-mails/dia (Google Workspace, ~1.500). Para turmas grandes, envie em lotes ao longo do dia.

## Segurança
- A ação de **salvar respostas** é aberta (é um formulário público) — qualquer um com o link pode responder.
- As ações de **listar** e **enviar** exigem a `ADMIN_KEY`, que só você conhece.
- Os dados ficam na **sua** Planilha, na sua conta Google.
