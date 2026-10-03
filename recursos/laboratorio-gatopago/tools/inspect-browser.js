async () => {
  await document.fonts.ready;
  const duplicateIds=[...document.querySelectorAll('[id]')].map(n=>n.id).filter((id,i,ids)=>ids.indexOf(id)!==i);
  const images=[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0}));
  return {
    title:document.title,
    width:innerWidth,
    scrollWidth:document.documentElement.scrollWidth,
    noHorizontalOverflow:document.documentElement.scrollWidth<=innerWidth,
    duplicateIds,
    images,
    fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family),
    visibleTiles:[...document.querySelectorAll('.tile')].filter(n=>!n.hidden).length,
    status:document.querySelector('[role=status]')?.textContent,
    iconSize:getComputedStyle(document.querySelector('.icon-stage svg')??document.body).width,
    dark:document.body.classList.contains('dark'),
    motionAnimations:document.querySelector('#stage')?.getAnimations({subtree:true}).map(a=>({playState:a.playState,iterations:a.effect.getTiming().iterations})),
    reduced:document.querySelector('#reduce')?.getAttribute('aria-pressed'),
    comparison:{before:document.querySelector('#before')?.getAttribute('src'),after:document.querySelector('#after')?.getAttribute('src'),phase:document.querySelector('#phase')?.value}
  };
}
