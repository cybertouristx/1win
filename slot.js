const confetti = window.confetti.create(
  document.getElementById('confetti-canvas'),
  { resize: true, useWorker: true }
);

const reels = ['r1','r2','r3'].map(id=>document.getElementById(id));
const spinBtn = document.getElementById('spin');
const claimBtn = document.getElementById('claim');

spinBtn.onclick = async ()=>{
  spinBtn.disabled = true;
  for(let i=0;i<reels.length;i++){
    await spinReel(reels[i], 600 + i*200);
  }
  confetti({ particleCount:100, spread:70, origin:{ y:0.4 } });
  claimBtn.style.display = 'inline-block';
};

claimBtn.onclick = ()=>{
  alert('Вы получили 70 FS 🎉');
};

function spinReel(el, duration){
  return new Promise(res=>{
    const totalFrames = 5;
    const frameHeight = 100;
    let frame = 0;
    const start = performance.now();
    const iv = setInterval(()=>{
      frame = (frame + 1) % totalFrames;
      el.style.backgroundPosition = `0 -${frame*frameHeight}px`;
      if(performance.now() - start > duration){
        clearInterval(iv);
        const finalFrame = Math.floor(Math.random()*totalFrames);
        el.style.backgroundPosition = `0 -${finalFrame*frameHeight}px`;
        setTimeout(res, 200);
      }
    }, 50);
  });
}
