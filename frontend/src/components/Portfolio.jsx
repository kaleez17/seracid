import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchProjects } from '../api';

function PortCard({ p, i }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay: i * 0.08 }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{position:'relative',overflow:'hidden',aspectRatio:'4/3',cursor:'none',background:'var(--ksl-surface)'}}>
      <img src={p.image||'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format'} alt={p.title}
        style={{width:'100%',height:'100%',objectFit:'cover',display:'block',
          filter:`grayscale(${hovered?0:60}%) brightness(${hovered?.55:.7})`,
          transform:`scale(${hovered?1.06:1})`,transition:'all .6s ease'}}/>
      <div style={{position:'absolute',inset:0,padding:'2rem',display:'flex',flexDirection:'column',justifyContent:'flex-end',
        background:'linear-gradient(transparent,rgba(8,8,8,0.9))',
        transform:`translateY(${hovered?0:20}px)`,transition:'transform .4s ease'}}>
        <div style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-crimson)',marginBottom:'.4rem'}}>{p.tag}</div>
        <div style={{fontFamily:'var(--ksl-header)',fontSize:'1.6rem',letterSpacing:'.04em',marginBottom:'.4rem'}}>{p.title}</div>
        <p style={{fontSize:'.75rem',color:'rgba(255,255,255,.55)',lineHeight:1.6,marginBottom:'1rem',opacity:hovered?1:0,transition:'opacity .4s .1s'}}>{p.description}</p>
        <div style={{display:'flex',gap:'1rem',opacity:hovered?1:0,transition:'opacity .4s .15s'}}>
          {p.techs?.slice(0,3).map(t=>(
            <span key={t} style={{fontFamily:'var(--ksl-mono)',fontSize:'.55rem',letterSpacing:'.1em',padding:'.2rem .6rem',border:'1px solid rgba(0,209,255,.3)',color:'var(--ksl-neon-blue)'}}>{t}</span>
          ))}
        </div>
        <div style={{display:'flex',gap:'1.5rem',marginTop:'.8rem',opacity:hovered?1:0,transition:'opacity .4s .2s'}}>
          {p.liveUrl && p.liveUrl!=='#' && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{fontFamily:'var(--ksl-mono)',fontSize:'.62rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ksl-neon-blue)',textDecoration:'none'}}>Live →</a>}
          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{fontFamily:'var(--ksl-mono)',fontSize:'.62rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ksl-muted)',textDecoration:'none'}}>GitHub →</a>}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(()=>{
    fetchProjects()
      .then(r => setProjects(Array.isArray(r.data) ? r.data : []))
      .catch(()=> setError('Could not load projects'))
      .finally(()=> setLoading(false));
  },[]);

  // Fallback static data if API not connected
  const fallback = [
    {_id:1,title:'Buddy Sticker Shop',tag:'E-Commerce · MERN',description:'Full e-commerce with cart, checkout, and order management.',image:'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&auto=format&fit=crop',liveUrl:'#',githubUrl:'https://github.com/kaleez17',techs:['React','Node.js','MongoDB']},
    {_id:2,title:'3D Immersive Gallery',tag:'Three.js · WebGL',description:'Interactive 3D product showcase with React Three Fiber.',image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop',liveUrl:'#',githubUrl:'https://github.com/kaleez17',techs:['Three.js','R3F','WebGL']},
    {_id:3,title:'Business Dashboard',tag:'Analytics · React',description:'Real-time analytics with role-based auth and live data.',image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop',liveUrl:'#',githubUrl:'https://github.com/kaleez17',techs:['React','MongoDB','Recharts']},
    {_id:4,title:'Appointment Booking',tag:'SaaS · Node.js',description:'Booking platform with WhatsApp notifications & UPI.',image:'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&auto=format&fit=crop',liveUrl:'#',githubUrl:'https://github.com/kaleez17',techs:['Node.js','Express','WhatsApp API']},
    {_id:5,title:'Memory Keeper',tag:'React · MongoDB',description:'Personal journal with media uploads and timeline view.',image:'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&auto=format&fit=crop',liveUrl:'#',githubUrl:'https://github.com/kaleez17',techs:['React','MongoDB','Cloudinary']},
    {_id:6,title:'SMB Digital Launch',tag:'SMB · SEO',description:'Zero to live in 5 days with GMB integration and SEO.',image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop',liveUrl:'#',githubUrl:'https://github.com/kaleez17',techs:['Next.js','SEO','GMB']},
  ];

  const display = projects.length > 0 ? projects : fallback;

  return (
    <section id="portfolio" style={{background:'var(--ksl-surface)'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div className="eyebrow">Proof of Work</div>
        <h2 className="sec-title">THE <span className="red">LAB</span></h2>
        <p style={{fontFamily:'var(--ksl-mono)',fontSize:'.72rem',color:'var(--ksl-muted)',marginBottom:'3rem',letterSpacing:'.05em'}}>
          {loading ? '// loading projects from database...' : `// ${display.length} projects loaded from ${error?'static fallback':'MongoDB'}`}
        </p>

        {loading ? (
          <div style={{textAlign:'center',fontFamily:'var(--ksl-mono)',fontSize:'.75rem',color:'var(--ksl-neon-blue)',padding:'4rem 0'}}>
            <span style={{color:'var(--ksl-crimson)'}}>→ </span>fetching projects from database...
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5px',background:'var(--ksl-border)'}}>
            {display.map((p,i)=><PortCard key={p._id} p={p} i={i}/>)}
          </div>
        )}

        <div style={{textAlign:'center',marginTop:'3rem'}}>
          <a href="https://github.com/kaleez17" target="_blank" rel="noreferrer" className="btn-ghost">View All on GitHub →</a>
        </div>
      </div>
      <style>{`@media(max-width:900px){#portfolio .port-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:600px){#portfolio .port-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
