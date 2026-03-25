export default function Ticker() {
  const items = ['MERN STACK','FULL-STACK DEV','THREE.JS','3D WEB','REACT · NODE · MONGO','SMB DIGITAL TRANSFORMATION','API AUTOMATION','UPI · STRIPE','SEO · HOSTING','SERACID SOLUTIONS'];
  const doubled = [...items,...items];
  return (
    <div style={{overflow:'hidden',whiteSpace:'nowrap',borderTop:'1px solid var(--ksl-border)',borderBottom:'1px solid var(--ksl-border)',background:'var(--ksl-surface)',padding:'.75rem 0'}}>
      <div style={{display:'inline-flex',animation:'ticker 28s linear infinite'}}>
        {doubled.map((t,i)=>(
          <span key={i} style={{fontFamily:'var(--ksl-header)',fontSize:'1rem',letterSpacing:'0.1em',padding:'0 2.5rem',borderRight:'1px solid var(--ksl-border)',color:i%3===0?'var(--ksl-crimson)':i%3===1?'var(--ksl-muted)':'var(--ksl-neon-blue)'}}>{t}</span>
        ))}
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
