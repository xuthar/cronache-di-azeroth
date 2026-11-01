/* Reserved companion roleplay toolkits.
 * Copy buttons and local-only session note formatter. No game access,
 * tracking, storage, gameplay fabrication, upload or scheduled publishing. */
(() => {
 'use strict';
 if(!['thorgar','aelyndra'].includes(document.body.dataset.page))return;
 const root=document.querySelector('.companion-dossier');
 if(!root)return;
 async function copy(text){
   if(!text.trim())return false;
   try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);return true;}}catch{}
   const area=document.createElement('textarea');area.value=text;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.append(area);area.select();
   let ok=false;try{ok=document.execCommand('copy');}catch{}
   area.remove();return ok;
 }
 function highlight(el){const range=document.createRange(),selection=window.getSelection();range.selectNodeContents(el);selection.removeAllRanges();selection.addRange(range);}
 root.querySelectorAll('[data-copy-target]').forEach(button=>{
   button.addEventListener('click',async()=>{
     const target=root.querySelector('#'+button.dataset.copyTarget);
     if(!target)return;
     const ok=await copy(target.textContent.trim());
     button.textContent=ok?'Copied!':'Select text';
     if(!ok)highlight(target);
     button.addEventListener('blur',()=>{button.textContent='Copy';},{once:true});
   });
 });
 root.querySelectorAll('[data-copy-line]').forEach(button=>{
   button.addEventListener('click',async()=>{
     const el=button.closest('div')?.querySelector('code');if(!el)return;
     const ok=await copy(el.textContent.trim());
     button.textContent=ok?'Copied!':'Select text';if(!ok)highlight(el);
     button.addEventListener('blur',()=>{button.textContent='Copy';},{once:true});
   });
 });
 const form=root.querySelector('.cd-session-form');
 const report=root.querySelector('.cd-report');
 const preview=report?.querySelector('textarea');
 const copyButton=report?.querySelector('[data-copy-report]');
 const status=report?.querySelector('span[aria-live]');
 if(form&&preview&&copyButton&&status){
   form.addEventListener('submit',ev=>{
     ev.preventDefault();
     const data=new FormData(form);
     const clean=key=>String(data.get(key)||'').trim();
     const place=clean('zone'),occurrence=clean('event');
     if(!place&&!occurrence){status.textContent='Add a real place or an observed event before preparing your notes.';return;}
     preview.value=[
       String(form.dataset.character||'Companion')+' — PLAYER-REPORTED SESSION NOTES',
       'Date: '+(clean('date')||'Not provided'),
       'Place actually visited: '+(place||'Not provided'),
       'Observed event or quest: '+(occurrence||'Not provided'),
       'People / companions actually met: '+(clean('people')||'None reported'),
       'Open question: '+(clean('question')||'None recorded'),
       '',
       'Please write the next roleplay chapter based on these player-reported facts. Keep all original roleplay fiction clearly separate from real game progress. Do not invent levels, quests, faction choices, achievements, pets, locations or other characters’ actions. Xuthar Morvayne remains the current main protagonist; develop this companion only after actual play.'
     ].join('\n');
     copyButton.disabled=false;status.textContent='Report prepared locally. Review before copying.';
   });
   copyButton.addEventListener('click',async()=>{
     const ok=await copy(preview.value);
     status.textContent=ok?'Session notes copied. Paste them into chat whenever you want to write this character’s next chapter.':'Select the report and copy it manually.';
     if(!ok)preview.select();
   });
 }
})();
