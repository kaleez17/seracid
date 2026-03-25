import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { submitLead } from '../api';

const WA_BASE = 'https://wa.me/916379953691?text=';

const SOCIALS = [
  { label:'WhatsApp',  color:'#25D366', href:'https://wa.me/916379953691', icon:<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label:'GitHub',    color:'#fff',    href:'https://github.com/kaleez17', icon:<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg> },
  { label:'LinkedIn',  color:'#0A66C2', href:'https://linkedin.com/in/kaleeswaran-irulaiya-293414214', icon:<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM3.56 20.45h3.55V9H3.56v11.45z"/></svg> },
  { label:'Instagram', color:'#E1306C', href:'https://instagram.com/kaleez', icon:<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { label:'Email',     color:'var(--ksl-crimson)', href:'mailto:Kaleessultan415@gmail.com', icon:<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> },
  { label:'Portfolio', color:'var(--ksl-neon-blue)', href:'https://kaleez-dev.netlify.app', icon:<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', budget:'Under ₹25,000', service:'Full-Stack Web Development', message:'' });
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.05 });

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { toast.error('Name, email & message required'); return; }
    setLoading(true);
    try {
      await submitLead(form);
      toast.success('Lead captured! We\'ll reach out within 2 hours 🚀');
      setForm({ name:'', email:'', phone:'', budget:'Under ₹25,000', service:'Full-Stack Web Development', message:'' });
    } catch {
      // Fallback to WhatsApp if API offline
      const text = `Hi SERACID Solutions! 👋\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone||'—'}\n*Budget:* ${form.budget}\n*Service:* ${form.service}\n\n*Project Brief:*\n${form.message}`;
      window.open(WA_BASE + encodeURIComponent(text), '_blank');
      toast.success('Redirected to WhatsApp!');
    }
    setLoading(false);
  };

  const inp = { background:'var(--ksl-glass)', border:'1px solid var(--ksl-border)', color:'#fff', padding:'.85rem 1rem', fontFamily:'var(--ksl-mono)', fontSize:'.75rem', outline:'none', width:'100%', transition:'border-color .2s' };

  return (
    <section id="contact" style={{background:'var(--ksl-surface)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 50%,rgba(230,57,70,.07) 0%,transparent 55%),radial-gradient(ellipse at 70% 50%,rgba(0,209,255,.06) 0%,transparent 55%)',pointerEvents:'none'}}/>
      <div ref={ref} style={{maxWidth:1280,margin:'0 auto',position:'relative'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'start'}}>
          {/* LEFT */}
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7}}>
            <div className="eyebrow">Let's Build</div>
            <h2 style={{fontFamily:'var(--ksl-header)',fontSize:'clamp(3rem,5vw,5.5rem)',lineHeight:.95,marginBottom:'2rem'}}>
              START A <span style={{color:'var(--ksl-crimson)'}}>PROJECT</span><span style={{color:'var(--ksl-neon-blue)'}}>.</span>
            </h2>
            <p style={{fontSize:'.9rem',color:'var(--ksl-muted)',lineHeight:1.8,marginBottom:'2.5rem'}}>First consultation is always free. We'll audit your current digital presence and tell you exactly what needs to change.</p>

            {/* Contact rows */}
            <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'2.5rem'}}>
              {[
                ['📍','Location','Ramanathapuram & Chennai, Tamil Nadu'],
                ['📞','Call / WhatsApp',<a href="tel:+916379953691" style={{color:'#fff',textDecoration:'none'}}>+91 63799 53691</a>],
                ['✉️','Email',<a href="mailto:Kaleessultan415@gmail.com" style={{color:'#fff',textDecoration:'none'}}>Kaleessultan415@gmail.com</a>],
                ['🌐','Portfolio',<a href="https://kaleez-dev.netlify.app" target="_blank" rel="noreferrer" style={{color:'#fff',textDecoration:'none'}}>kaleez-dev.netlify.app</a>],
              ].map(([icon,label,val])=>(
                <div key={label} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1rem 1.2rem',border:'1px solid var(--ksl-border)',transition:'border-color .3s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(0,209,255,.3)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='var(--ksl-border)'}>
                  <span style={{fontSize:'1.1rem',flexShrink:0}}>{icon}</span>
                  <div>
                    <div style={{fontFamily:'var(--ksl-mono)',fontSize:'.55rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-neon-blue)'}}>{label}</div>
                    <div style={{fontSize:'.85rem',color:'#fff',marginTop:'.1rem'}}>{val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{display:'flex',gap:'.7rem',flexWrap:'wrap'}}>
              {SOCIALS.map(s=>(
                <a key={s.label} href={s.href} target={s.label==='Email'?'_self':'_blank'} rel="noreferrer" title={s.label}
                  style={{width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid var(--ksl-border)',color:'var(--ksl-muted)',textDecoration:'none',transition:'all .25s',background:'var(--ksl-glass)'}}
                  onMouseEnter={e=>{e.currentTarget.style.background=s.color;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=s.color;e.currentTarget.style.transform='translateY(-3px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='var(--ksl-glass)';e.currentTarget.style.color='var(--ksl-muted)';e.currentTarget.style.borderColor='var(--ksl-border)';e.currentTarget.style.transform='translateY(0)';}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT - FORM */}
          <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7,delay:.15}}>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div>
                  <label style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-muted)',display:'block',marginBottom:'.4rem'}}>Your Name *</label>
                  <input style={inp} placeholder="John Doe" value={form.name} onChange={e=>set('name',e.target.value)} onFocus={e=>e.target.style.borderColor='var(--ksl-crimson)'} onBlur={e=>e.target.style.borderColor='var(--ksl-border)'}/>
                </div>
                <div>
                  <label style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-muted)',display:'block',marginBottom:'.4rem'}}>Email *</label>
                  <input style={inp} type="email" placeholder="john@company.com" value={form.email} onChange={e=>set('email',e.target.value)} onFocus={e=>e.target.style.borderColor='var(--ksl-crimson)'} onBlur={e=>e.target.style.borderColor='var(--ksl-border)'}/>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div>
                  <label style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-muted)',display:'block',marginBottom:'.4rem'}}>Phone / WhatsApp</label>
                  <input style={inp} type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>set('phone',e.target.value)} onFocus={e=>e.target.style.borderColor='var(--ksl-crimson)'} onBlur={e=>e.target.style.borderColor='var(--ksl-border)'}/>
                </div>
                <div>
                  <label style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-muted)',display:'block',marginBottom:'.4rem'}}>Budget</label>
                  <select style={{...inp,cursor:'none'}} value={form.budget} onChange={e=>set('budget',e.target.value)}>
                    {['Under ₹25,000','₹25,000 – ₹75,000','₹75,000 – ₹2,00,000','₹2,00,000+'].map(o=><option key={o} style={{background:'var(--ksl-black)'}}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-muted)',display:'block',marginBottom:'.4rem'}}>Service Needed</label>
                <select style={{...inp,cursor:'none'}} value={form.service} onChange={e=>set('service',e.target.value)}>
                  {['Full-Stack Web Development','3D Brand Experience','SMB Digital Transformation','API Integration & Automation','Not Sure – Need Consultation'].map(o=><option key={o} style={{background:'var(--ksl-black)'}}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ksl-muted)',display:'block',marginBottom:'.4rem'}}>Project Brief *</label>
                <textarea style={{...inp,resize:'none'}} rows={5} placeholder="Describe your business, what you need, and your timeline..." value={form.message} onChange={e=>set('message',e.target.value)} onFocus={e=>e.target.style.borderColor='var(--ksl-crimson)'} onBlur={e=>e.target.style.borderColor='var(--ksl-border)'}/>
              </div>
              <button onClick={handleSubmit} disabled={loading} className="btn-red" style={{width:'100%',textAlign:'center',padding:'1.1rem',fontSize:'.75rem',opacity:loading?.7:1}}>
                {loading ? 'SENDING...' : 'SEND PROJECT BRIEF →'}
              </button>
              <p style={{fontFamily:'var(--ksl-mono)',fontSize:'.6rem',color:'var(--ksl-muted)',textAlign:'center'}}>
                Or DM directly: <a href="https://wa.me/916379953691" target="_blank" rel="noreferrer" style={{color:'#25D366',textDecoration:'none'}}>WhatsApp</a> · <a href="https://instagram.com/kaleez" target="_blank" rel="noreferrer" style={{color:'var(--ksl-neon-blue)',textDecoration:'none'}}>Instagram</a> · <a href="https://github.com/kaleez17" target="_blank" rel="noreferrer" style={{color:'#fff',textDecoration:'none'}}>GitHub</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:900px){#contact>div>div{grid-template-columns:1fr!important;gap:3rem!important;}}`}</style>
    </section>
  );
}
