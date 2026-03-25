import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const WA = 'https://wa.me/916379953691?text=Hi%20SERACID%20Solutions!%20I%27d%20like%20a%20free%20audit.';
const TIDEL = 'https://www.google.com/maps/search/ELCOT+SEZ+Chennai';
const MAIL_AUDIT = 'mailto:Kaleessultan415@gmail.com?subject=Free%20Audit%20Request%20-%20SERACID%20Solutions&body=Hi%20SERACID%20Team%2C%0A%0AI%27d%20like%20to%20request%20a%20free%20audit%20for%20my%20website%2Fbusiness.%0A%0AName%3A%20%0AWebsite%2FBusiness%3A%20%0APhone%3A%20';

export default function Hero() {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);

  // Animated line counter
  useEffect(() => {
    const target = 42718; let c = 0;
    const id = setInterval(() => {
      c += Math.floor(Math.random() * 400) + 80;
      if (c >= target) { setCount(target); clearInterval(id); }
      else setCount(c);
    }, 30);
    return () => clearInterval(id);
  }, []);

  // Wireframe grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, pts = [], rafId;
    let mouseX = 0, mouseY = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      mouseX = W/2; mouseY = H/2;
      pts = [];
      const cols = Math.ceil(W/90)+2, rows = Math.ceil(H/90)+2;
      for (let r=0;r<rows;r++) for (let c=0;c<cols;c++)
        pts.push({x:c*90-90,y:r*90-90,ox:c*90-90,oy:r*90-90,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});
    };

    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if (Math.abs(p.x-p.ox)>25||Math.abs(p.y-p.oy)>25){p.vx*=-1;p.vy*=-1;}
        const md = Math.hypot(p.x-mouseX,p.y-mouseY);
        if (md<120){p.x+=(p.x-mouseX)/md*.5;p.y+=(p.y-mouseY)/md*.5;}
      });
      ctx.strokeStyle='rgba(0,209,255,0.12)'; ctx.lineWidth=.5;
      pts.forEach((p,i)=>{
        pts.forEach((q,j)=>{
          if(j<=i)return;
          const d=Math.hypot(p.x-q.x,p.y-q.y);
          if(d<130){ctx.globalAlpha=(1-d/130)*.4;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
        });
      });
      ctx.globalAlpha=1;
      pts.forEach(p=>{ctx.fillStyle='rgba(230,57,70,0.6)';ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fill();});
      rafId=requestAnimationFrame(draw);
    };

    const onMouse = e=>{mouseX=e.clientX;mouseY=e.clientY;};
    window.addEventListener('resize',resize);
    canvas.addEventListener('mousemove',onMouse);
    resize(); draw();
    return ()=>{cancelAnimationFrame(rafId);window.removeEventListener('resize',resize);};
  }, []);

  const fadeUp = (delay=0) => ({ hidden:{opacity:0,y:30}, show:{opacity:1,y:0,transition:{duration:.8,delay}} });

  return (
    <section id="home" style={{height:'100vh',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:0}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.7}}/>
      {/* noise */}
      <div style={{position:'absolute',inset:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",pointerEvents:'none'}}/>

      <motion.div initial="hidden" animate="show" style={{position:'relative',textAlign:'center',maxWidth:1000,padding:'0 2rem'}}>
        <motion.div variants={fadeUp(0.2)} style={{fontFamily:'var(--ksl-mono)',fontSize:'0.7rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'var(--ksl-neon-blue)',marginBottom:'2rem',display:'flex',alignItems:'center',justifyContent:'center',gap:'1rem'}}>
          <span style={{flex:'0 0 40px',height:1,background:'linear-gradient(to right,transparent,var(--ksl-neon-blue))'}}/>
          Software Engineering Research Agency
          <span style={{flex:'0 0 40px',height:1,background:'linear-gradient(to left,transparent,var(--ksl-neon-blue))'}}/>
        </motion.div>

        <motion.h1 variants={fadeUp(0.35)} style={{fontFamily:'var(--ksl-header)',fontSize:'clamp(3rem,8vw,7.5rem)',lineHeight:.95,letterSpacing:'0.02em',marginBottom:'1.5rem'}}>
          SERACID<br/>
          <span style={{color:'var(--ksl-crimson)'}}>SOLUTIONS</span><span style={{color:'var(--ksl-neon-blue)'}}>.</span>
        </motion.h1>

        <motion.p variants={fadeUp(0.5)} style={{fontFamily:'var(--ksl-mono)',fontSize:'0.8rem',color:'var(--ksl-muted)',letterSpacing:'0.1em',maxWidth:600,margin:'0 auto 3rem',lineHeight:1.8}}>
          <span style={{color:'#fff',fontWeight:700}}>Complex Integrated Development</span> — MERN Stack, 3D Web Experiences &amp; Digital Transformation for ambitious businesses in Chennai &amp; beyond.
        </motion.p>

        <motion.div variants={fadeUp(0.65)} style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <a href={TIDEL} target="_blank" rel="noreferrer" className="btn-red">View Our Lab</a>
          <a href={MAIL_AUDIT} className="btn-ghost">Get a Free Audit</a>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <div style={{position:'absolute',bottom:'2.5rem',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'.5rem',fontFamily:'var(--ksl-mono)',fontSize:'.55rem',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--ksl-muted)'}}>
        Scroll
        <span style={{width:1,height:36,background:'linear-gradient(var(--ksl-crimson),transparent)'}}/>
      </div>

      {/* counter */}
      <div style={{position:'absolute',right:'4rem',bottom:'3rem',fontFamily:'var(--ksl-mono)',fontSize:'0.6rem',color:'var(--ksl-muted)',letterSpacing:'0.1em',borderLeft:'1px solid var(--ksl-crimson)',paddingLeft:'1rem'}}>
        <span style={{color:'#fff',display:'block',fontSize:'1.4rem',fontFamily:'var(--ksl-header)'}}>{count.toLocaleString()}+</span>
        Lines of passion
      </div>

      {/* floating WA */}
      <a href={WA} target="_blank" rel="noreferrer" className="wa-float">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Chat with us
      </a>
    </section>
  );
}
