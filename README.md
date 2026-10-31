# Castellazzo - Checklist 75

Web app statica mobile-first per l'esecuzione della Checklist 75. Non usa database, foto o storico.

## Flusso
1. Inserire nome e cognome del volontario.
2. Verificare tutte le 24 voci.
3. Confermare la dichiarazione finale.
4. Premere il pulsante finale: si apre WhatsApp verso il numero configurato con il messaggio precompilato.

## Deploy con GitHub Pages
1. Crea un repository GitHub (es. `castellazzo`).
2. Carica nella root del repository `index.html`, `style.css`, `app.js` e `README.md`.
3. Vai in **Settings > Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Branch: `main`, cartella: `/ (root)`, quindi **Save**.
6. Attendi la pubblicazione e apri l'URL fornito da GitHub Pages.

## Nota WhatsApp
L'app apre WhatsApp con destinatario e testo precompilati. Per vincoli di WhatsApp/browser, l'utente deve confermare l'invio nell'app WhatsApp.
