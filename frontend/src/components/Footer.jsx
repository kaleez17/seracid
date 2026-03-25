const links = [
  {num:'01',label:'Services',href:'#services'},
  {num:'02',label:'Team',href:'#team'},
  {num:'03',label:'Work',href:'#portfolio'},
  {num:'04',label:'Lab Log',href:'#log'},
  {num:'05',label:'Contact',href:'#contact'},
];

export default function Footer() {
  return (
    <footer style={{background:'#050505',padding:'3.5rem 5rem 2rem',borderTop:'1px solid var(--ksl-border)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:'2.5rem',borderBottom:'1px solid var(--ksl-border)',marginBottom:'2rem',flexWrap:'wrap',gap:'2rem'}}>
        <div>
          <div style={{fontFamily:'var(--ksl-header)',fontSize:'1.8rem',letterSpacing:'.05em',color:'#fff'}}>
            <span style={{color:'var(--ksl-crimson)'}}>S</span>ERACID<span style={{color:'var(--ksl-neon-blue)'}}>.</span>
          </div>
          <div style={{fontFamily:'var(--ksl-mono)',fontSize:'.65rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ksl-muted)',marginTop:'.2rem'}}>
            Software Engineering Research Agency for Complex Integrated Development
          </div>
        </div>
        <ul style={{display:'flex',gap:'2rem',listStyle:'none',flexWrap:'wrap'}}>
          {links.map(l=>(
            <li key={l.href}><a href={l.href} style={{textDecoration:'none',fontFamily:'var(--ksl-mono)',fontSize:'.62rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ksl-muted)',transition:'color .2s'}}
              onMouseEnter={e=>e.target.style.color='var(--ksl-crimson)'} onMouseLeave={e=>e.target.style.color='var(--ksl-muted)'}>{l.label}</a></li>
          ))}
        </ul>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
        <div style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.1em',color:'rgba(255,255,255,.2)'}}>© 2025 SERACID Solutions. All rights reserved. · Chennai, Tamil Nadu</div>
        <div style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.1em',color:'rgba(255,255,255,.2)'}}>
          Built with <span style={{color:'var(--ksl-crimson)'}}>♥</span> using <span style={{color:'var(--ksl-neon-blue)'}}>MERN</span> &amp; Three.js
        </div>
      </div>
      <style>{`@media(max-width:768px){footer{padding:3rem 1.5rem 2rem!important;}}`}</style>
    </footer>
  );
}
