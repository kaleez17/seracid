import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const POINTS = [
  { icon:'⚡', title:'Built by Engineers, Not Agencies', body:'Both founders are active developers with M.Sc IT background. You talk directly to the people writing your code — no middlemen.' },
  { icon:'🧠', title:'Chennai-Rooted, Globally Capable', body:'We understand local SMB challenges in Ramanathapuram and Tamil Nadu, while delivering standards that compete with global studios.' },
  { icon:'🎯', title:'3D Capability Nobody Else Offers', body:'Interactive Three.js experiences are our signature. Most agencies can\'t touch this — we\'ve built it, shipped it, and have the receipts.' },
  { icon:'🔒', title:'Full Ownership, Zero Lock-in', body:'You own 100% of your codebase, domain, and hosting. We hand over clean, documented code. No hostage situations.' },
];

export default function WhyUs() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 });
  return (
    <section id="why" style={{background:'var(--ksl-surface)'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div className="eyebrow">Why SERACID</div>
        <h2 className="sec-title">WE SHIP. <span className="red">PERIOD</span><span className="blue">.</span></h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'center',marginTop:'4rem'}}>
          <motion.div ref={ref} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
            <div style={{background:'#0a0a0a',border:'1px solid var(--ksl-border)',padding:'2rem',fontFamily:'var(--ksl-mono)',fontSize:'.75rem',lineHeight:2,color:'rgba(255,255,255,.5)'}}>
              <div style={{marginBottom:'1.5rem',borderBottom:'1px solid var(--ksl-border)',paddingBottom:'.8rem',fontSize:'.6rem',color:'rgba(255,255,255,.2)',letterSpacing:'.5rem'}}>● ● ●</div>
              {[
                ['kuttystack@lab:~$','npm run build','✓ Compiled in 2.1s — 47 modules','#00ff88'],
                ['kuttystack@lab:~$','deploy --prod','✓ Live at https://yourclient.com','#00ff88'],
                ['kuttystack@lab:~$','lighthouse audit','Performance: 98 | SEO: 100','#00ff88'],
                ['client@biz:~$','revenue --q3','📈 +340% online inquiries','#c77dff'],
              ].map(([prompt,cmd,out,color],i)=>(
                <div key={i} style={{marginBottom:'1rem'}}>
                  <span style={{color:'var(--ksl-neon-blue)'}}>{prompt} </span><span style={{color:'#fff'}}>{cmd}</span><br/>
                  <span style={{color}}>{out}</span>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--ksl-border)',marginTop:'1.5px'}}>
              {[['10+','Clients Served'],['2+','Years Experience'],['40%','Engagement Boost'],['24/7','Client Support']].map(([n,l],i)=>(
                <div key={l} style={{background:'var(--ksl-black)',padding:'1.5rem',textAlign:'center'}}>
                  <div style={{fontFamily:'var(--ksl-header)',fontSize:'2.8rem',color:i%2===0?'var(--ksl-crimson)':'var(--ksl-neon-blue)',lineHeight:1}}>{n}</div>
                  <div style={{fontFamily:'var(--ksl-mono)',fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ksl-muted)',marginTop:'.3rem'}}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
            {POINTS.map((p,i)=>(
              <motion.div key={p.title} initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:i*.1+.3}}
                style={{display:'flex',gap:'1.2rem',alignItems:'flex-start',padding:'1.5rem',border:'1px solid var(--ksl-border)',transition:'border-color .3s,background .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(230,57,70,.3)';e.currentTarget.style.background='var(--ksl-glass)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--ksl-border)';e.currentTarget.style.background='transparent';}}>
                <div style={{width:40,height:40,flexShrink:0,border:'1px solid var(--ksl-crimson)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem'}}>{p.icon}</div>
                <div>
                  <div style={{fontFamily:'var(--ksl-mono)',fontSize:'.75rem',fontWeight:700,color:'#fff',marginBottom:'.4rem'}}>{p.title}</div>
                  <div style={{fontSize:'.82rem',color:'var(--ksl-muted)',lineHeight:1.7}}>{p.body}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){#why .grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
