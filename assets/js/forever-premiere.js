/* Chronicles of Azeroth — Forever premiere / 3 November 2026.
 * A click-to-play YouTube feature selected by the site owner.
 * Runs after the existing launcher module; all existing live-countdown nodes
 * stay in Game Status and all live news sources keep updating as before. */
(() => {
  'use strict';
  if(document.body.dataset.page !== 'home') return;
  const main=document.querySelector('#main');
  const hero=main?.querySelector('.hero');
  if(!hero||document.querySelector('#forever-premiere')) return;

  const launchAt=Date.parse('2026-11-04T23:00:00.000Z'); // 5 Nov 2026, 00:00 CET
  const videoId='n2Wg46fwmb0';
  const youtubeUrl='https://www.youtube.com/watch?v='+videoId;
  const $=(tag,className,text)=>{
    const el=document.createElement(tag);
    if(className)el.className=className;
    if(text!==undefined)el.textContent=text;
    return el;
  };

  // Extend, never replace, the existing launch/game-status hero.
  const heroCopy=hero.querySelector('.launcher-hero-copy');
  let heroSignal=null;
  if(heroCopy) {
    heroSignal=$('div','forever-premiere-hero-signal');
    heroSignal.setAttribute('role','status');
    heroSignal.innerHTML='<span class="forever-premiere-hero-pulse" aria-hidden="true"></span><span class="forever-premiere-hero-line">THE FINAL HOURS · THE WORLD IS CALLING</span>';
    const title=heroCopy.querySelector('h1');
    if(title)title.insertAdjacentElement('beforebegin',heroSignal);
    else heroCopy.prepend(heroSignal);
    const actions=heroCopy.querySelector('.buttons');
    if(actions&&!actions.querySelector('a[href="#forever-premiere"]')){
      const watch=$('a','button forever-premiere-hero-watch','▶  Watch the featured video');
      watch.href='#forever-premiere';
      actions.append(watch);
    }
  }

  const section=$('section','forever-premiere wrap');
  section.id='forever-premiere';
  section.setAttribute('aria-labelledby','forever-premiere-title');

  const topline=$('div','forever-premiere-topline');
  const topper=$('div','forever-premiere-topper');
  topper.append($('span','forever-premiere-eyebrow','WORLD OF WARCRAFT: FOREVER'));
  topper.append($('span','forever-premiere-top-title','THE LAUNCH SPOTLIGHT'));
  const status=$('span','forever-premiere-status');
  status.setAttribute('role','status');
  topper.append(status);
  topline.append(topper);
  const topRight=$('span','forever-premiere-top-right','THE COUNTDOWN TO AZEROTH  ✦  05.11.2026');
  topline.append(topRight);
  section.append(topline);

  const content=$('div','forever-premiere-grid');

  const videoPanel=$('div','forever-premiere-video');
  const stage=$('div','forever-premiere-stage');
  const play=$('button','forever-premiere-play');
  play.type='button';
  play.setAttribute('aria-label','Play the featured WoW Forever launch video on YouTube');
  play.title='Play the selected video';
  const poster=$('img','forever-premiere-poster');
  poster.src='https://i.ytimg.com/vi/'+videoId+'/maxresdefault.jpg';
  poster.alt='YouTube preview of the World of Warcraft Forever video selected for the homepage';
  poster.loading='eager';
  poster.decoding='async';
  let posterFallback=0;
  poster.addEventListener('error',()=>{
    if(posterFallback===0){
      posterFallback=1;
      poster.src='https://i.ytimg.com/vi/'+videoId+'/hqdefault.jpg';
    }else if(posterFallback===1){
      posterFallback=2;
      poster.src='assets/images/hero.webp';
      poster.alt='Illustrative World of Warcraft Azeroth artwork; video opens when selected';
    }
  });
  play.append(poster);
  const shade=$('span','forever-premiere-video-shade');
  shade.setAttribute('aria-hidden','true');
  play.append(shade);
  const playButton=$('span','forever-premiere-play-icon','▶');
  playButton.setAttribute('aria-hidden','true');
  play.append(playButton);
  const playRibbon=$('span','forever-premiere-play-ribbon');
  playRibbon.innerHTML='<small>FEATURED VIDEO  /  CLICK TO WATCH</small><strong>The last watch before Forever</strong><em>Play video  ↗</em>';
  play.append(playRibbon);
  stage.append(play);
  play.addEventListener('click',()=>{
    const frame=$('iframe','forever-premiere-iframe');
    frame.src='https://www.youtube-nocookie.com/embed/'+videoId+'?autoplay=1&rel=0';
    frame.title='World of Warcraft Forever — featured video selected by Chronicles of Azeroth';
    frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.setAttribute('allowfullscreen','');
    frame.referrerPolicy='strict-origin-when-cross-origin';
    stage.replaceChildren(frame);
    stage.classList.add('forever-premiere-stage--playing');
  },{once:true});
  videoPanel.append(stage);
  const videoCaption=$('div','forever-premiere-video-caption');
  videoCaption.append($('span','','Selected video · YouTube · Tap the preview to play'));
  const ytLink=$('a','','Open directly on YouTube ↗');
  ytLink.href=youtubeUrl;
  ytLink.target='_blank';ytLink.rel='noopener noreferrer';
  videoCaption.append(ytLink);
  videoPanel.append(videoCaption);

  const story=$('aside','forever-premiere-story');
  const serial=$('div','forever-premiere-serial');
  serial.append($('span','forever-premiere-serial-mark','✦'));
  serial.append($('span','','THE EVE OF A NEW ERA'));
  story.append(serial);
  const title=$('h2','forever-premiere-headline','One last night. A thousand new roads.');
  title.id='forever-premiere-title';
  story.append(title);
  const lead=$('p','forever-premiere-lead','The beta is behind us. The gates are almost open. Soon every quest, every campfire, every forgotten path becomes the beginning of another story.');
  story.append(lead);
  const launchMeter=$('div','forever-premiere-launch-meter');
  launchMeter.innerHTML='<span>GLOBAL OPENING · EUROPE</span><strong>5 NOVEMBER 2026</strong><small>00:00 CET · Italy</small>';
  story.append(launchMeter);
  const facts=$('div','forever-premiere-facts');
  [
    ['1–60','THE JOURNEY'],
    ['1,000+','NEW QUESTS'],
    ['9','NEW DUNGEONS']
  ].forEach(([v,caption])=>{
    const fact=$('div','forever-premiere-fact');
    fact.append($('strong','',v),$('small','',caption));
    facts.append(fact);
  });
  story.append(facts);
  const cta=$('div','forever-premiere-cta');
  const primary=$('a','forever-premiere-primary','Prepare for Forever  ↗');
  primary.href='forever.html';
  const secondary=$('a','forever-premiere-secondary','Xuthar’s first chapter  ↗');
  secondary.href='book.html?character=xuthar';
  cta.append(primary,secondary);
  story.append(cta);
  const source=$('a','forever-premiere-source','Blizzard: What awaits in WoW Forever  ↗');
  source.href='https://worldofwarcraft.blizzard.com/en-us/news/24315643/';
  source.rel='noopener noreferrer';source.target='_blank';
  story.append(source);

  content.append(videoPanel,story);
  section.append(content);
  const note=$('div','forever-premiere-bottom-note');
  note.innerHTML='<span aria-hidden="true">✦</span><strong>RETURN TO THE WORLD. STAY FOR THE STORY.</strong><span aria-hidden="true">✦</span>';
  section.append(note);
  hero.insertAdjacentElement('afterend',section);

  // Short, time-aware launch messages. The real one-second countdown keeps
  // running separately in the existing Game Status panel.
  function updateLaunch(){
    const seconds=Math.ceil((launchAt-Date.now())/1000);
    if(seconds<=0){
      heroSignal?.querySelector('.forever-premiere-hero-line')?.replaceChildren(document.createTextNode('FOREVER IS HERE · YOUR STORY BEGINS NOW'));
      status.textContent='THE GATES ARE OPEN';
      title.textContent='A new world. Your story begins.';
      lead.textContent='The wait is over. Azeroth welcomes a new generation of stories, journeys and extraordinary discoveries. Take the long road—and make it yours.';
      note.querySelector('strong').textContent='THE FOREVER ERA HAS BEGUN';
      topRight.textContent='WELCOME TO FOREVER · 05.11.2026';
    }else{
      const hours=Math.floor(seconds/3600),days=Math.floor(hours/24);
      let label;
      if(seconds<=3600)label='THE FINAL HOUR · AZEROTH IS CALLING';
      else if(seconds<=86400)label='LESS THAN 24 HOURS · THE WORLD IS CALLING';
      else if(days===1)label='ONE DAY TO FOREVER · PREPARE YOUR JOURNEY';
      else label='THE FINAL COUNTDOWN · AZEROTH AWAITS';
      const line=heroSignal?.querySelector('.forever-premiere-hero-line');
      if(line)line.textContent=label;
      status.textContent=seconds<=86400?'FINAL 24 HOURS':'THE FINAL COUNTDOWN';
    }
  }
  updateLaunch();
  const timer=setInterval(updateLaunch,60000);
  window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
})();
