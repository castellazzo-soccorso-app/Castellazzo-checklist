const items = [
"Cabina → stampante + 2 rotolini, spray peperoncino, cavo tablet, estintore, pala, torcia, foglio fuori servizio + sostanze nocive",
"Giubbotti anti taglio + DAE + forbici",
"Carrozzino","Cassetto ossigenoterapia","Cassetto medicazione","Cassetto 3",
"Cassetto 4 → giubbotti antivento/pioggia","Box 1 → ragno (x 2) + cinghie + scoop estendibili",
"Aspiratore portatile e fisso + 10 sondini","Kit scasso","Accessori aspiratore → 2 sacchetti + 2 tubi con raccordi",
"Controllo multiparametrico","Vano pulizia → alcool + sgrassatore + sacchetti neri + carta",
"Accessori trauma → cuscinetti fermacapo (x 2) + laccetti fermacapo","Steccobende flessibili + kiddy + telo XXL",
"Controllo bombolini + frigo","Trauma → spinale adulto + pediatrica + cucchiaio","Collari cervicali","Caschetti (3)",
"Sacchi gialli per cestino","Protezione individuale → traverse","Box 3 → kit ebola","Alipack","Box 2 → kit emorragie + fisiologica"
];
const destination='393351444925';
const list=document.getElementById('list'), counter=document.getElementById('counter'), progress=document.getElementById('progress'), operator=document.getElementById('operator'), certify=document.getElementById('certify'), finish=document.getElementById('finish'), hint=document.getElementById('hint');
const checked=new Set();
items.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='item';b.innerHTML=`<span class="check"></span><span class="txt">${text}</span>`;b.addEventListener('click',()=>{checked.has(i)?checked.delete(i):checked.add(i);b.classList.toggle('checked');b.querySelector('.check').textContent=checked.has(i)?'✓':'';update()});list.appendChild(b)});
function update(){counter.textContent=`${checked.size} / ${items.length}`;progress.style.width=`${checked.size/items.length*100}%`;const ok=checked.size===items.length && operator.value.trim().length>=2 && certify.checked;finish.disabled=!ok;hint.textContent=ok?'Checklist completa: puoi aprire WhatsApp.':'Completa tutti i 24 controlli, inserisci il nome e conferma la certificazione.'}
operator.addEventListener('input',update);certify.addEventListener('change',update);
finish.addEventListener('click',()=>{if(finish.disabled)return;const now=new Date();const date=new Intl.DateTimeFormat('it-IT',{dateStyle:'short'}).format(now);const time=new Intl.DateTimeFormat('it-IT',{timeStyle:'short'}).format(now);const msg=`✅ CHECKLIST 75 COMPLETATA
Castellazzo Soccorso

Volontario: ${operator.value.trim()}
Data: ${date}
Ora: ${time}

Tutti i ${items.length} controlli previsti sono stati verificati.
Il volontario certifica di aver eseguito personalmente la checklist.`;window.location.href=`https://wa.me/${destination}?text=${encodeURIComponent(msg)}`});
update();