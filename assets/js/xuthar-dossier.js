/* Xuthar Morvayne RP toolkit.
 * Handles manual copying of prepared text and formatting REAL session notes.
 * No storage, telemetry, game access, API access, or automatic publication. */
(() => {
  'use strict';
  if(document.body.dataset.page !== 'xuthar')return;

  const status=document.getElementById('xu-copy-status');
  const setStatus=(message)=>{
    if(status)status.textContent=message;
  };
  async function copyText(str){
    if(!str||!str.trim())return false;
    try{
      if(navigator.clipboard&&window.isSecureContext){
        await navigator.clipboard.writeText(str);return true;
      }
    }catch{}
    const field=document.createElement('textarea');
    field.value=str;field.setAttribute('readonly','');
    field.style.position='fixed';field.style.opacity='0';field.style.pointerEvents='none';
    document.body.append(field);
    field.select();
    let ok=false;
    try{ok=document.execCommand('copy');}catch{}
    field.remove();return ok;
  }
  document.querySelectorAll('[data-copy]').forEach(button=>{
    button.addEventListener('click',async()=>{
      const code=button.dataset.copy;
      const node=document.querySelector('[data-copy-source="'+code+'"]');
      if(!node)return;
      const content=node.textContent.trim();
      const ok=await copyText(content);
      const previous=button.textContent;
      button.textContent=ok?'Copied!':'Select text';
      if(!ok){const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(node);selection.removeAllRanges();selection.addRange(range);}
      button.setAttribute('aria-label',ok?'Text copied to clipboard':'Select the highlighted text to copy');
      button.addEventListener('blur',()=>{button.textContent=previous},{once:true});
    });
  });
  document.querySelectorAll('[data-copy-line]').forEach(button=>{
    button.addEventListener('click',async()=>{
      const node=button.closest('.xu-line')?.querySelector('code');
      if(!node)return;
      const ok=await copyText(node.textContent);
      button.textContent=ok?'Copied!':'Select text';
      if(!ok){const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(node);selection.removeAllRanges();selection.addRange(range);}
      button.addEventListener('blur',()=>{button.textContent='Copy'},{once:true});
    });
  });
  const form=document.getElementById('xu-session-form');
  const preview=document.getElementById('xu-session-preview');
  const copyButton=document.getElementById('xu-copy-report');
  if(form&&preview&&copyButton){
    const text=(id)=>String(document.getElementById(id)?.value||'').trim();
    form.addEventListener('submit',event=>{
      event.preventDefault();
      const date=text('xu-date'),zone=text('xu-zone'),eventNote=text('xu-event');
      const person=text('xu-person'),mood=text('xu-mood'),question=text('xu-doubt');
      if(!zone&&!eventNote){setStatus('Please describe at least a real location or an event before preparing a report.');return;}
      // All entered notes are the player's claims, not independently verified.
      const lines=[
        'XUTHAR MORVAYNE · SESSION NOTES (PLAYER-REPORTED)',
        'Date: '+(date||'Not provided'),
        'Place actually visited: '+(zone||'Not provided'),
        'What happened: '+(eventNote||'Not provided'),
        'People encountered: '+(person||'Not recorded'),
        'Interpretation / mood: '+(mood||'Reflective'),
        'Open question: '+(question||'None recorded'),
        '',
        'Request: Please turn these notes into the next short chapter of The Last Witness. Keep my reported gameplay events separate from invented roleplay narration. Do not invent quest completions, levels, achievements, names or locations. Preserve continuity with Xuthar Morvayne’s dossier in the Chronicles of Azeroth website.'
      ];
      preview.value=lines.join('\n');
      copyButton.disabled=false;
      setStatus('Report prepared locally. Review and copy it to your conversation.');
    });
    form.addEventListener('reset',()=>{
      preview.value='';copyButton.disabled=true;setStatus('Notes cleared from this form.');
    });
    copyButton.addEventListener('click',async()=>{
      const ok=await copyText(preview.value);
      setStatus(ok?'Session report copied. Paste it into chat when you want the next chapter.':'Copy is not available here. Select and copy the report text manually.');
      if(!ok)preview.select();
    });
  }
  const nav=document.querySelector('.xu-chapter-nav');
  if(nav){
    const links=[...nav.querySelectorAll('a[href^="#"]')];
    links.forEach(link=>link.addEventListener('click',()=>{
      const menu=document.querySelector('#navigation');
      if(menu?.classList.contains('is-open'))document.querySelector('.menu-toggle')?.click();
    }));
  }
})();
