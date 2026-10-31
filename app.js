const items=["Cabina → stampante + 2 rotolini, spray peperoncino, cavo tablet, estintore, pala, torcia, foglio fuori servizio + sostanze nocive",
"Giubbotti anti taglio + DAE + forbici",
"Carrozzino",
"Cassetto ossigenoterapia",
"Cassetto medicazione",
"Cassetto 3",
"Cassetto 4 → giubbotti antivento/pioggia",
"Box 1 → ragno (x 2) + cinghie + scoop estendibili",
"Aspiratore portatile e fisso + 10 sondini",
"Kit scasso",
"Accessori aspiratore → 2 sacchetti + 2 tubi con raccordi",
"Controllo multiparametrico",
"Vano pulizia → alcool + sgrassatore + sacchetti neri + carta",
"Accessori trauma → cuscinetti fermacapo (x 2) + laccetti fermacapo",
"Steccobende flessibili + kiddy + telo XXL",
"Controllo bombolini + frigo",
"Trauma → spinale adulto + pediatrica + cucchiaio",
"Collari cervicali",
"Caschetti (3)",
"Sacchi gialli per cestino",
"Protezione individuale → traverse",
"Box 3 → kit ebola",
"Alipack",
"Box 2 → kit emorragie + fisiologica"];
const destination='393351444925'; const state=items.map(()=>({status:null,note:''}));
const list=document.getElementById('list'),counter=document.getElementById('counter'),progress=document.getElementById('progress'),summary=document.getElementById('summary'),operator=document.getElementById('operator'),certify=document.getElementById('certify'),finish=document.getElementById('finish'),hint=document.getElementById('hint');
items.forEach((text,i)=>{const d=document.createElement('div');d.className='item';d.innerHTML=`<div class="txt">${i+1}. ${text}</div><div class="choices"><button type="button" class="ok">✓ OK</button><button type="button" class="ko">✕ KO</button></div><div class="note-wrap" hidden><label>Nota obbligatoria per il KO</label><textarea class="note" rows="2" placeholder="Descrivi l'anomalia riscontrata"></textarea></div>`;const ok=d.querySelector('.ok'),ko=d.querySelector('.ko'),wrap=d.querySelector('.note-wrap'),note=d.querySelector('.note'); ok.onclick=()=>{state[i].status='OK';state[i].note='';wrap.hidden=true;note.classList.remove('invalid');ok.classList.add('selected');ko.classList.remove('selected');update()};ko.onclick=()=>{state[i].status='KO';wrap.hidden=false;ko.classList.add('selected');ok.classList.remove('selected');update();note.focus()};note.oninput=()=>{state[i].note=note.value.trim();note.classList.toggle('invalid',!state[i].note);update()};list.appendChild(d)});
function update(){const done=state.filter(x=>x.status).length,kos=state.filter(x=>x.status==='KO'),missingNotes=kos.filter(x=>!x.note).length;counter.textContent=`${done} / ${items.length}`;progress.style.width=`${done/items.length*100}%`;summary.textContent=`OK: ${state.filter(x=>x.status==='OK').length} · KO: ${kos.length}`;const complete=done===items.length&&missingNotes===0&&operator.value.trim().length>=2&&certify.checked;finish.disabled=!complete;finish.classList.toggle('warning',kos.length>0);if(done<items.length)hint.textContent=`Mancano ${items.length-done} controlli.`;else if(missingNotes)hint.textContent=`Inserisci la nota obbligatoria per ${missingNotes} KO.`;else if(operator.value.trim().length<2)hint.textContent='Inserisci il nome del volontario.';else if(!certify.checked)hint.textContent='Conferma la certificazione finale.';else hint.textContent=kos.length?'Checklist completa con anomalie: puoi aprire WhatsApp.':'Checklist completa senza anomalie: puoi aprire WhatsApp.'}
operator.oninput=update;certify.onchange=update;
finish.onclick=()=>{if(finish.disabled)return;const now=new Date(),date=new Intl.DateTimeFormat('it-IT',{dateStyle:'short'}).format(now),time=new Intl.DateTimeFormat('it-IT',{timeStyle:'short'}).format(now),kos=state.map((x,i)=>({...x,i})).filter(x=>x.status==='KO');let msg=kos.length?'⚠️ CHECKLIST 75 COMPLETATA CON ANOMALIE':'✅ CHECKLIST 75 COMPLETATA';msg+=`
Castellazzo Soccorso

Volontario: ${operator.value.trim()}
Data: ${date}
Ora: ${time}

Controlli eseguiti: ${items.length}/${items.length}
Anomalie: ${kos.length}`;if(kos.length){msg+=`\n\n❌ ANOMALIE RISCONTRATE:`;kos.forEach(x=>msg+=`
• ${items[x.i]}
  Nota: ${x.note}`)}else msg+=`\n\nTutti i controlli risultano OK.`;msg+=`\n\nIl volontario certifica di aver eseguito personalmente la checklist.`;location.href=`https://wa.me/${destination}?text=${encodeURIComponent(msg)}`};update();