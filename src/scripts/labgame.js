/* Exp.000 — ambient flask game in the footer background.
   Canvas is pointer-events:none: links are never blocked. We listen on the
   footer itself and only react to clicks landing on the flask.
   Idle: ember raindrops fall and splash; flask sits quietly at bottom center.
   Click the flask -> timed run: catch drops in the narrow neck, fill it,
   beat your best time. Success -> neon slime floods the footer. */
(function(){
  var foot=document.querySelector('footer.site'),cv=document.getElementById('lgcv');
  if(!foot||!cv)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){cv.remove();return}
  var EMBER='#F15722',GREY='#6d7076',SLIME='#39FF14',INK='rgba(28,32,26,.92)';
  var ctx,W,H,raf=0,on=false,last=0;
  var mode='idle',bx=300,mx=null,my=null,hover=false;
  var t=0,pt=0,fill=0,spawnT=.3,drops=[],splashes=[],bubbles=[],bubT=0;
  var slime=null,doneT=0,best=0,newBest=false,msg=0,wins=0,buf='';
  try{wins=parseInt(localStorage.getItem('ol_exp000_wins'))||0}catch(e){}
  var winsEl=document.getElementById('lgwins');
  function showWins(){
    if(wins>=3&&winsEl&&winsEl.hidden){winsEl.hidden=false;winsEl.textContent="Can't wait to see what you accomplish in the Lab!"}
  }
  showWins();
  function recordWin(){wins++;try{localStorage.setItem('ol_exp000_wins',wins)}catch(e){}showWins()}
  // Erlenmeyer flask: narrow neck, wide conical body
  var NW=9,NH=18,FW=30,FH=54;
  try{best=parseFloat(localStorage.getItem('ol_exp000_best'))||0}catch(e){}
  function size(){
    var d=Math.min(window.devicePixelRatio||1,2);
    W=foot.clientWidth;H=foot.clientHeight;
    cv.width=W*d;cv.height=H*d;
    ctx=cv.getContext('2d');ctx.setTransform(d,0,0,d,0,0);
    if(mode==='idle')bx=W/2;
  }
  window.addEventListener('resize',function(){if(on)size()});
  function rimY(){return H-64}
  function overBeaker(){return mx!=null&&Math.abs(mx-bx)<FW+8&&my>rimY()-18}
  foot.addEventListener('mousemove',function(e){
    var r=foot.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;
    hover=overBeaker();
    foot.style.cursor=(hover&&mode==='idle')?'pointer':'';
  });
  foot.addEventListener('mouseleave',function(){mx=my=null;hover=false;foot.style.cursor=''});
  foot.addEventListener('click',function(){
    if(mode==='idle'&&overBeaker())startRun();
  });
  foot.addEventListener('touchstart',function(e){
    var r=foot.getBoundingClientRect();
    mx=e.touches[0].clientX-r.left;my=e.touches[0].clientY-r.top;
    if(mode==='idle'&&overBeaker())startRun();
  },{passive:true});
  foot.addEventListener('touchmove',function(e){
    var r=foot.getBoundingClientRect();mx=e.touches[0].clientX-r.left;my=e.touches[0].clientY-r.top;
  },{passive:true});
  function startRun(){mode='play';fill=0;pt=0;newBest=false;foot.style.cursor=''}
  // ship it: typing "ship" anywhere completes the experiment (no best-time credit)
  window.addEventListener('keydown',function(e){
    if(e.key&&e.key.length===1){
      buf=(buf+e.key.toLowerCase()).slice(-4);
      if(buf==='ship'&&on&&mode!=='win'){
        fill=100;newBest=false;mode='win';recordWin();winSlime();
      }
    }
  });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){if(!on){on=true;size();last=0;raf=requestAnimationFrame(loop)}}
      else if(on){on=false;cancelAnimationFrame(raf)}
    });
  },{threshold:.05});
  io.observe(foot);
  function winSlime(){
    var sw=22,n=Math.ceil(W/sw)+2,cols=[],vel=[];
    for(var i=0;i<n;i++){cols.push(.5+Math.random()*.55);vel.push(.06+Math.random()*.16)}
    slime={p:0,cols:cols,vel:vel,sw:sw};doneT=7;
  }
  function loop(ts){
    if(!on)return;
    raf=requestAnimationFrame(loop);
    if(!last)last=ts;
    var dt=Math.min((ts-last)/1000,.05);last=ts;t+=dt;
    if(mode==='play'){
      pt+=dt;
      if(mx!=null)bx+=(Math.max(40,Math.min(W-40,mx))-bx)*Math.min(1,dt*10);
    } else {
      bx+=(W/2-bx)*Math.min(1,dt*1.2);
    }
    if(mode==='win'){
      doneT-=dt;slime.p+=dt;
      if(doneT<=0){slime=null;fill=0;mode='idle'}
    }
    spawnT-=dt;
    if(spawnT<=0){
      spawnT=(mode==='play'?.7+Math.random()*.7:1.3+Math.random()*1.2);
      var roll=Math.random();
      drops.push({x:24+Math.random()*(W-48),y:-10,v:80+Math.random()*60,ph:Math.random()*6,
        bad:mode==='play'&&roll<.18,
        sig:mode==='play'&&roll>=.18&&roll<.25}); // rare "clear signal" drop
    }
    var ry=rimY();
    for(var i=drops.length-1;i>=0;i--){
      var d=drops[i];d.y+=d.v*dt;d.x+=Math.sin(t*1.7+d.ph)*7*dt;
      if(mode==='play'&&d.y>ry-4&&d.y<ry+10&&Math.abs(d.x-bx)<NW+3){
        if(d.bad){fill=Math.max(0,fill-10)}
        else{
          if(d.sig){fill+=21;msg=1.4}
          else fill+=7;
          if(fill>=100){
            fill=100;mode='win';
            if(!best||pt<best){best=pt;newBest=true;try{localStorage.setItem('ol_exp000_best',best)}catch(e){}}
            recordWin();winSlime();
          }
        }
        drops.splice(i,1);
      } else if(d.y>H-6){
        splashes.push({x:d.x,p:0,bad:d.bad});
        drops.splice(i,1);
      }
    }
    for(var i=splashes.length-1;i>=0;i--){splashes[i].p+=dt;if(splashes[i].p>.5)splashes.splice(i,1)}
    if(msg>0)msg-=dt;
    if(mode==='play'&&fill>15){
      bubT-=dt;
      if(bubT<=0){bubT=.4+Math.random()*.5;bubbles.push({x:bx+(Math.random()*2-1)*(FW-14),y:ry+FH-6,r:1+Math.random()*1.6})}
    }
    for(var i=bubbles.length-1;i>=0;i--){
      var b=bubbles[i];b.y-=22*dt;b.x+=Math.sin(t*4+b.r*9)*4*dt;
      var sy=ry+FH-4-(fill/100)*(FH-10);
      if(b.y<Math.max(sy+3,ry+NH+2)||mode!=='play')bubbles.splice(i,1);
    }
    draw(ry);
  }
  function teardrop(x,y,r){
    ctx.beginPath();
    ctx.moveTo(x,y-r*1.9);
    ctx.quadraticCurveTo(x+r,y-r*.4,x+r,y+r*.15);
    ctx.arc(x,y+r*.15,r,0,Math.PI);
    ctx.quadraticCurveTo(x-r,y-r*.4,x,y-r*1.9);
    ctx.closePath();
  }
  // Erlenmeyer: flared lip, straight narrow neck, conical body, rounded base
  function vesselPath(ry,close){
    ctx.beginPath();
    ctx.moveTo(bx-NW-4,ry-3);
    ctx.lineTo(bx-NW,ry);
    ctx.lineTo(bx-NW,ry+NH);
    ctx.lineTo(bx-FW+5,ry+FH-9);
    ctx.quadraticCurveTo(bx-FW-1,ry+FH,bx-FW+11,ry+FH);
    ctx.lineTo(bx+FW-11,ry+FH);
    ctx.quadraticCurveTo(bx+FW+1,ry+FH,bx+FW-5,ry+FH-9);
    ctx.lineTo(bx+NW,ry+NH);
    ctx.lineTo(bx+NW,ry);
    ctx.lineTo(bx+NW+4,ry-3);
    if(close)ctx.closePath();
  }
  function wallX(y,ry){ // right wall x at height y (for graduation ticks)
    if(y<=ry+NH)return bx+NW;
    var f=(y-(ry+NH))/((FH-9)-NH);
    return bx+NW+(FW-5-NW)*f;
  }
  function draw(ry){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<drops.length;i++){
      var d=drops[i];
      ctx.globalAlpha=d.sig?.9:.55;
      if(d.sig){ctx.shadowColor='rgba(255,194,75,.9)';ctx.shadowBlur=12}
      ctx.fillStyle=d.bad?GREY:(d.sig?'#FFC24B':EMBER);
      teardrop(d.x,d.y,d.sig?6:5);ctx.fill();
      ctx.shadowBlur=0;
      if(d.bad){
        ctx.strokeStyle='rgba(34,37,42,.9)';ctx.lineWidth=1.4;ctx.lineCap='round';
        ctx.beginPath();
        ctx.moveTo(d.x-2,d.y-1);ctx.lineTo(d.x+2,d.y+3);
        ctx.moveTo(d.x+2,d.y-1);ctx.lineTo(d.x-2,d.y+3);
        ctx.stroke();
      } else {
        ctx.beginPath();ctx.arc(d.x-1.6,d.y-1.6,1.3,0,7);ctx.fillStyle='rgba(249,249,248,.7)';ctx.fill();
      }
      ctx.globalAlpha=1;
    }
    for(var i=0;i<splashes.length;i++){
      var s=splashes[i],a=.3*(1-s.p/.5);
      ctx.globalAlpha=a;ctx.strokeStyle=s.bad?GREY:EMBER;ctx.lineWidth=1.4;
      ctx.beginPath();ctx.arc(s.x,H-4,3+s.p*22,Math.PI,0,true);ctx.stroke();
      ctx.globalAlpha=1;
    }
    var glassA=mode==='play'?.42:(hover&&mode==='idle'?.4:.26);
    if(fill>0){
      var sy=ry+FH-4-(fill/100)*(FH-10);
      ctx.save();
      vesselPath(ry,true);ctx.clip();
      ctx.beginPath();
      ctx.moveTo(bx-FW-6,H);ctx.lineTo(bx-FW-6,sy);
      for(var x=-FW-6;x<=FW+6;x+=4){ctx.lineTo(bx+x,sy+Math.sin(t*5+x*.3)*1.5)}
      ctx.lineTo(bx+FW+6,H);ctx.closePath();
      ctx.fillStyle=mode==='win'?SLIME:EMBER;ctx.globalAlpha=mode==='win'?.65:.38;ctx.fill();
      ctx.strokeStyle='rgba(249,249,248,.5)';ctx.lineWidth=1;
      for(var i=0;i<bubbles.length;i++){ctx.beginPath();ctx.arc(bubbles[i].x,bubbles[i].y,bubbles[i].r,0,7);ctx.stroke()}
      ctx.globalAlpha=1;
      ctx.restore();
    }
    ctx.strokeStyle='rgba(249,249,248,'+glassA+')';ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';
    vesselPath(ry,false);ctx.stroke();
    // graduation ticks marching down the right side, like the clipart
    ctx.strokeStyle='rgba(249,249,248,'+(glassA*.75)+')';ctx.lineWidth=1.6;
    ctx.beginPath();
    var tys=[ry+8,ry+16,ry+27,ry+38];
    for(var i=0;i<tys.length;i++){
      var wx=wallX(tys[i],ry);
      ctx.moveTo(wx-7,tys[i]);ctx.lineTo(wx+2,tys[i]);
    }
    ctx.stroke();
    ctx.textAlign='center';
    if(mode==='idle'&&hover){
      ctx.font='10px ui-monospace,Menlo,monospace';
      ctx.fillStyle='rgba(180,182,186,.75)';
      ctx.fillText(best?('RUN IT BACK? BEST '+best.toFixed(1)+'S'):'RUN EXPERIMENT?',bx,ry-14);
    }
    if(mode==='play'){
      ctx.font='10px ui-monospace,Menlo,monospace';
      ctx.fillStyle='rgba(180,182,186,.6)';
      ctx.fillText(Math.round(fill)+'% · '+pt.toFixed(1)+'S',bx,ry-14);
      if(msg>0){
        ctx.fillStyle='rgba(255,194,75,'+Math.min(1,msg)+')';
        ctx.fillText('A CLEAR SIGNAL THROUGH THE NOISE +21%',bx,ry-30);
      }
    }
    if(slime){
      var p=slime.p,e=1-Math.pow(1-Math.min(p/2.2,1),3);
      var a=p<4.6?.78:Math.max(0,.78*(1-(p-4.6)/2.2));
      if(a>0){
        var sw=slime.sw,cols=slime.cols,vel=slime.vel;
        ctx.globalAlpha=a;ctx.fillStyle=SLIME;
        function len(i){return Math.min(cols[i]*e+vel[i]*Math.max(0,p-1.2),1.12)*H}
        ctx.beginPath();
        ctx.moveTo(0,0);ctx.lineTo(0,len(0));
        for(var i=0;i<cols.length-1;i++){
          var x1=i*sw,x2=(i+1)*sw;
          ctx.quadraticCurveTo(x1+sw/2,Math.max(len(i),len(i+1))+20*e,x2,len(i+1));
        }
        ctx.lineTo(W,0);ctx.closePath();ctx.fill();
        // tapered goo drips, no dots — like slime sliding down glass
        for(var i=1;i<cols.length-1;i+=2){
          var x=i*sw,L=len(i),D=(28+((i*7)%26))*e+Math.sin(t*1.4+i)*4;
          ctx.beginPath();
          ctx.moveTo(x-6,L-6);
          ctx.bezierCurveTo(x-6,L+D*.4,x-2,L+D*.8,x,L+D);
          ctx.bezierCurveTo(x+2,L+D*.8,x+6,L+D*.4,x+6,L-6);
          ctx.closePath();ctx.fill();
        }
        if(p>1){
          ctx.fillStyle=INK;
          ctx.font='700 42px Rajdhani,sans-serif';
          ctx.fillText('WINNER!',W/2,H*.34);
          ctx.font='10px ui-monospace,Menlo,monospace';
          ctx.fillText((pt>0?'FILLED IN '+pt.toFixed(1)+'S':'SHIPPED IT')+(newBest?' · NEW BEST!':best?' · BEST '+best.toFixed(1)+'S':''),W/2,H*.34+22);
        }
        ctx.globalAlpha=1;
      }
    }
  }
})();
