import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { num:'01', label:'Services',  href:'#services'  },
  { num:'02', label:'Team',      href:'#team'       },
  { num:'03', label:'Work',      href:'#portfolio'  },
  { num:'04', label:'Lab Log',   href:'#log'        },
  { num:'05', label:'Contact',   href:'#contact'    },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const WA = 'https://wa.me/916379953691?text=Hi%20SERACID%20Solutions!%20I%27d%20like%20to%20start%20a%20project.';

  return (
    <>
      <nav style={{
        position:'fixed',top:0,left:0,width:'100%',zIndex:100,
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'1.2rem 5rem',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0.5)',
        backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--ksl-border)',
        transition:'background 0.3s',
      }}>
        <a href="#home" style={{fontFamily:'var(--ksl-header)',fontSize:'1.5rem',letterSpacing:'0.05em',textDecoration:'none',color:'#fff',display:'flex',alignItems:'center',gap:'0.3rem'}}>
          <span style={{color:'var(--ksl-crimson)'}}>S</span>ERACID<span style={{color:'var(--ksl-neon-blue)'}}>.</span>
        </a>

        <ul style={{display:'flex',gap:'2.5rem',listStyle:'none'}} className="nav-desktop">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{textDecoration:'none',color:'var(--ksl-muted)',fontFamily:'var(--ksl-mono)',fontSize:'0.65rem',letterSpacing:'0.15em',textTransform:'uppercase',transition:'color 0.2s',display:'flex',alignItems:'center',gap:'0.4rem'}}>
                <span style={{color:'var(--ksl-crimson)',fontSize:'0.6rem'}}>{l.num}.</span>{l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={WA} target="_blank" rel="noreferrer" className="btn-red" style={{fontSize:'0.65rem',padding:'0.5rem 1.4rem'}}>
          Start a Project
        </a>

        <button onClick={()=>setOpen(true)} style={{display:'none',background:'none',border:'none',cursor:'none',flexDirection:'column',gap:5}} className="hamburger" aria-label="Menu">
          <span style={{display:'block',width:24,height:1,background:'#fff'}}/>
          <span style={{display:'block',width:24,height:1,background:'#fff'}}/>
          <span style={{display:'block',width:24,height:1,background:'#fff'}}/>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:99,background:'rgba(8,8,8,0.97)',backdropFilter:'blur(20px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2.5rem'}}>
            <button onClick={()=>setOpen(false)} style={{position:'absolute',top:'1.5rem',right:'2rem',background:'none',border:'none',fontFamily:'var(--ksl-mono)',fontSize:'0.65rem',letterSpacing:'0.2em',color:'var(--ksl-muted)',cursor:'none'}}>[ CLOSE ]</button>
            {links.map(l => (
              <motion.a key={l.href} href={l.href} onClick={()=>setOpen(false)}
                initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.05}}
                style={{fontFamily:'var(--ksl-header)',fontSize:'3rem',letterSpacing:'0.05em',color:'#fff',textDecoration:'none'}}>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width:1024px){
          .nav-desktop{display:none !important;}
          .hamburger{display:flex !important;}
          nav{padding:1.2rem 1.5rem !important;}
        }
      `}</style>
    </>
  );
}
