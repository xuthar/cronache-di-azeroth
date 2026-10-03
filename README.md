# Cronache di Azeroth

Prima versione di un sito personale dedicato a World of Warcraft Retail e al diario roleplay WoW Forever. Sito statico, senza dipendenze, account visitatori, database o abbonamenti. Titolo e contenuti sono modificabili.

## Sito pubblico

- Sito: https://xuthar.github.io/cronache-di-azeroth/
- Repository: https://github.com/xuthar/cronache-di-azeroth
- Pubblicazione: GitHub Pages, ramo `main`, cartella `/(root)`, HTTPS attivo.

Il sito è stato pubblicato il 3 ottobre 2026. Per aggiornarlo, modifica i file dello stesso repository: GitHub Pages ripubblica automaticamente il contenuto dopo il salvataggio sul ramo `main`. Il link rimane lo stesso.

## Aprire il sito

Apri `index.html` con un browser e naviga con il menu. JavaScript deve essere attivo. Tutti i contenuti e gli stili sono locali: non servono installazioni né un processo di compilazione.

## Pubblicare gratis su GitHub Pages

1. Crea un repository **pubblico** nel tuo account GitHub, per esempio `cronache-di-azeroth`.
2. Carica **il contenuto di questa cartella**, con `index.html` direttamente nella radice del repository. Conserva anche le cartelle `assets` e il file `.nojekyll`.
3. In **Settings → Pages**, scegli **Deploy from a branch**, ramo **main**, cartella **/(root)** e salva.
4. Attendi il completamento della pubblicazione. GitHub mostrerà il link del sito nella stessa pagina; per un repository di progetto sarà normalmente `https://TUO-UTENTE.github.io/cronache-di-azeroth/`.

Non occorre acquistare un dominio. I percorsi relativi funzionano anche nella sottocartella del repository. Non è necessario configurare GitHub Actions manualmente.

Riferimenti ufficiali verificati il 3 ottobre 2026:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Struttura

| File | Contenuto |
| --- | --- |
| `index.html` | Home |
| `retail.html` | Retail Characters |
| `forever.html` | WoW Forever |
| `journal.html` | Travel Journal |
| `campsites.html` | Campsites |
| `stories.html` | Stories & Lore |
| `gallery.html` | Gallery |
| `404.html` | Pagina non trovata |
| `assets/css/style.css` | Colori, tipografia, impaginazione desktop e mobile |
| `assets/js/content.js` | Personaggi, diario, luoghi, racconti e album |
| `assets/js/app.js` | Struttura dei contenuti, menu mobile, lettura e ingrandimento immagini |
| `assets/images/` | Illustrazione e future immagini |

## Aggiornare i contenuti

Apri `assets/js/content.js` in un editor di testo. Ogni voce è un oggetto; per aggiungerne una, duplica una voce dello stesso elenco, separala con una virgola e assegna un `id` unico composto da lettere minuscole, numeri e trattini. I testi sono trattati come testo semplice, non HTML. Usa un editor che conservi UTF-8 e controlla le virgolette.

- `characters`: modifica nome, razza, classe, reame, specializzazione, professioni e biografia.
- `journal`: inserisci le nuove pagine **all’inizio** dell’elenco. `text` contiene un elenco di paragrafi. Il campo facoltativo `camp` deve corrispondere all’`id` di un accampamento.
- `camps`: modifica luoghi, ripari, acqua e note narrative.
- `stories`: aggiungi racconti con paragrafi nell’elenco `text`.
- `gallery`: aggiungi immagini, titoli, categorie e descrizioni alternative (`alt`). Le immagini presenti si aprono in una finestra ingrandita, chiudibile anche con Esc.

Le introduzioni editoriali, la citazione, l’itinerario e la pagina in evidenza della Home sono in `assets/js/app.js`. Quando cambi il viaggio, aggiorna anche questi testi e i relativi link: nella prima versione sono intenzionalmente curati a mano. Il nome del sito nella testata e i metadati sono in ogni file HTML.

## Inserire ritratti e screenshot

1. Copia l’immagine in `assets/images/`, ad esempio `xuthar.webp`.
2. Nella relativa voce di `content.js`, imposta `image: "assets/images/xuthar.webp"`.
3. Per la Gallery, scrivi anche un testo `alt` che descriva il contenuto.

Sono accettati percorsi locali sotto `assets/images/` con estensione PNG, JPG, JPEG, WebP, AVIF o GIF. Usa nomi semplici senza accenti. Lascia `image: ""` per mantenere il segnaposto. Consigliati ritratti 4:5 e screenshot 4:3 o 16:9, compressi per ridurre i tempi di caricamento.

## Personalizzazione iniziale

Il nome **Xuthar Morvayne** deriva dal contesto del progetto; razza, classe, reame e progressi non sono stati inventati. I personaggi Retail sono schede da compilare. Il percorso Locanda della Quercia → Sentiero del Guado → Radura dei Pini e i racconti sono esempi originali: non sono presentati come luoghi ufficiali o attività realmente svolte. Quando inserirai i tuoi contenuti, aggiorna anche le note dimostrative.

L’immagine di apertura è un’illustrazione fantasy originale generata per questo progetto, non uno screenshot del gioco. Non vengono caricati font remoti, librerie esterne, tracker o cookie.

## Controlli dopo una modifica

Apri tutte le pagine, verifica i collegamenti e prova il menu da smartphone. Un link come `journal.html#luce-tra-i-pini` apre direttamente la pagina del diario corrispondente. Prima di cambiare un `id`, cerca tutti i collegamenti che lo usano in `app.js` e `content.js`.

La pagina `404.html` è configurata per GitHub Pages con base `/cronache-di-azeroth/`, così anche gli indirizzi inesistenti in sottocartelle mantengono il menu e il collegamento alla Home. Se rinomini il repository, aggiorna anche quella base. Le altre pagine mantengono percorsi relativi e funzionano anche aprendo i file locali.

Il pacchetto locale conserva una copia del sito e non contiene credenziali. La pubblicazione è gestita dal repository indicato sopra.
