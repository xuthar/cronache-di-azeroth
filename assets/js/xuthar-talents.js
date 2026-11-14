/* Recommended Shadow-first leveling plan; never reads or changes game talents. */
(() => {
 'use strict';
 const root=document.getElementById('xuthar-talents');if(!root)return;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 fetch('assets/data/xuthar-shadow-talents.json?v=20261114-wowhead-icons',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Talent data unavailable');return r.json();}).then(data=>{
  const slider=root.querySelector('#xt-level'),trees=root.querySelector('#xt-trees'),body=root.querySelector('#xt-order'),detail=root.querySelector('#xt-detail');
  const lookup=new Map();data.trees.forEach(tree=>tree.talents.forEach(t=>lookup.set(t.name,{...t,tree:tree.name})));
  let selected='Mind Flay';
  const ranksAt=level=>{const ranks={};data.order.slice(0,level-9).forEach(name=>ranks[name]=(ranks[name]||0)+1);return ranks;};
  function describe(){
   const t=lookup.get(selected),level=Number(slider.value),ranks=ranksAt(level);
   detail.replaceChildren(el('h3','',t.name+' · '+(ranks[t.name]||0)+'/'+t.max),el('p','',t.tree+' · Row '+t.row+' · Column '+t.col+(t.requires?' · Requires '+t.requires+' '+t.requiredRank+'/'+lookup.get(t.requires).max+'.':'.')));
   const levels=data.order.flatMap((name,i)=>name===t.name?[i+10]:[]);
   const source=el('a','xt-wowhead-link','View this talent on Wowhead ↗');source.href=t.wowhead;source.target='_blank';source.rel='noopener';detail.append(source);
   detail.append(el('p','',levels.length?'Spend points at levels '+levels.join(', ')+'. Final planned rank: '+levels.length+'/'+t.max+'.':'Leave this talent at 0/'+t.max+' throughout this plan.'));
  }
  function render(){
   const level=Number(slider.value),ranks=ranksAt(level);root.querySelector('#xt-level-value').textContent=level;
   const totals={};data.trees.forEach(tree=>totals[tree.name]=tree.talents.reduce((sum,t)=>sum+(ranks[t.name]||0),0));
   root.querySelector('#xt-summary').textContent='Level '+level+' · '+(level-9)+' points · '+totals.Discipline+' Discipline / 0 Holy / '+totals['Shadow Magic']+' Shadow Magic';
   const next=data.order[level-9];root.querySelector('#xt-next').textContent=next?'Next at level '+(level+1)+': '+next+' → '+((ranks[next]||0)+1)+'/'+lookup.get(next).max: 'All 51 standard points assigned. Final build: 17 / 0 / 34.';
   trees.replaceChildren();
   // Match the game’s tab order, including the unused Holy tree.
   data.trees.forEach(tree=>{
    const panel=el('article','xt-tree'),heading=el('h3','',tree.name+' · '+totals[tree.name]+' points'),scroll=el('div','xt-grid-scroll'),grid=el('div','xt-grid');grid.setAttribute('aria-label',tree.name+' talent grid');
    tree.talents.forEach(t=>{
     const rank=ranks[t.name]||0,button=el('button','xt-talent'+(rank?' is-spent':'')+(rank===t.max?' is-max':''));button.type='button';button.style.gridRow=t.row;button.style.gridColumn=t.col;
     button.setAttribute('aria-label',t.name+', '+rank+' of '+t.max+', row '+t.row+', column '+t.col);button.setAttribute('aria-pressed',String(selected===t.name));
     const icon=el('img','xt-game-icon');icon.src='assets/images/talent-icons/'+t.icon+'.jpg';icon.alt='';icon.width=56;icon.height=56;icon.loading='lazy';button.append(icon);
     button.append(el('span','xt-position','R'+t.row+' · C'+t.col),el('span','xt-name',t.name),el('strong','xt-rank',rank+'/'+t.max));
     button.addEventListener('click',()=>{selected=t.name;render();});grid.append(button);
    });scroll.append(grid);panel.append(heading,scroll);trees.append(panel);
   });
   body.replaceChildren();const running={};
   data.order.forEach((name,i)=>{const t=lookup.get(name),rank=running[name]=(running[name]||0)+1,tr=el('tr',i+10<=level?'xt-earned':'');if(i+10===level)tr.classList.add('xt-at-level');[String(i+10),t.tree+' · R'+t.row+' / C'+t.col,name,rank+'/'+t.max].forEach(text=>tr.append(el('td','',text)));body.append(tr);});
   root.querySelectorAll('[data-xt-level]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.xtLevel)===level)));describe();
  }
  slider.addEventListener('input',render);root.querySelectorAll('[data-xt-level]').forEach(button=>button.addEventListener('click',()=>{slider.value=button.dataset.xtLevel;render();}));render();
 }).catch(()=>{root.querySelector('#xt-summary').textContent='Interactive tree unavailable. The exact level-20 allocation remains visible above; use the linked calculator for the full tree.';});
})();
