import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SERVICES = [
  {
    num:'01', icon:'⚙️', tag:'The Core', accent:'var(--ksl-crimson)',
    name:'FULL-STACK WEB DEV',
    desc:'End-to-end application development from database architecture to pixel-perfect UI. We own every layer of your stack.',
    techs:['MongoDB','Express.js','React','Node.js','REST APIs','JWT Auth'],
    quote:'"We build scalable, secure, and lightning-fast web applications tailored to your business logic. From initial database schema to the final responsive UI."'
  },
  {
    num:'02', icon:'🎮', tag:'The Flex', accent:'var(--ksl-neon-blue)',
    name:'3D BRAND EXPERIENCES',
    desc:'Interactive 3D product showcases, immersive galleries, and animated interfaces that make users stop scrolling.',
    techs:['Three.js','React Three Fiber','Framer Motion','WebGL','GSAP'],
    quote:'"Don\'t just show your products — let customers interact with them. We create immersive 3D galleries that increase user engagement by 40%."'
  },
  {
    num:'03', icon:'🚀', tag:'The Bread Earner', accent:'var(--ksl-neon-blue)',
    name:'SMB DIGITAL TRANSFORMATION',
    desc:'For businesses offline or stuck with outdated sites. We take you online, fully set up, and found on Google — fast.',
    techs:['Domain + Hosting','On-Page SEO','Google My Business','Mobile-First'],
    quote:'"We take your offline business online. Domain, Hosting, SEO, and Google My Business integration so customers can find you instantly."'
  },
  {
    num:'04', icon:'🔗', tag:'The Automation', accent:'var(--ksl-crimson)',
    name:'API INTEGRATION & AUTOMATION',
    desc:'Connect your tools. Automate your workflow. Payment gateways, WhatsApp bots, and notification pipelines so your business runs 24/7.',
    techs:['UPI / Razorpay','Stripe','WhatsApp API','Webhooks','Cron Jobs'],
    quote:'"We automate your workflow. Payment gateways, automated notifications — make your business run while you sleep."'
  },
];

function ServiceCard({ s, i }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hov, setHov] = useState(false);
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay: i*0.1 }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? 'var(--ksl-surface)' : 'var(--ksl-black)',
        border:'1px solid var(--ksl-border)', padding:'3rem', position:'relative',
        overflow:'hidden', transition:'background .35s',
      }}>
      <div style={{position:'absolute',top:'1.5rem',right:'2rem',fontFamily:'var(--ksl-header)',fontSize:'4rem',color:hov?'rgba(230,57,70,0.1)':'rgba(255,255,255,0.04)',transition:'color .3s',lineHeight:1}}>{s.num}</div>
      <div style={{fontSize:'2rem',marginBottom:'1.5rem'}}>{s.icon}</div>
      <div style={{fontFamily:'var(--ksl-mono)',fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase',color:s.accent,marginBottom:'.6rem'}}>{s.tag}</div>
      <div style={{fontFamily:'var(--ksl-header)',fontSize:'2rem',letterSpacing:'0.03em',marginBottom:'1rem'}}>{s.name}</div>
      <p style={{fontSize:'.85rem',lineHeight:1.85,color:'var(--ksl-muted)',marginBottom:'1.8rem'}}>{s.desc}</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',marginBottom:'1.8rem'}}>
        {s.techs.map(t=>(
          <span key={t} style={{fontFamily:'var(--ksl-mono)',fontSize:'0.6rem',letterSpacing:'0.1em',padding:'.3rem .8rem',border:`1px solid ${hov?s.accent+'44':'var(--ksl-border)'}`,color:hov?'rgba(255,255,255,.7)':'var(--ksl-muted)',transition:'all .3s'}}>{t}</span>
        ))}
      </div>
      <div style={{padding:'1.2rem 1.4rem',background:'var(--ksl-glass)',borderLeft:`2px solid ${s.accent}`,fontFamily:'var(--ksl-mono)',fontSize:'.7rem',lineHeight:1.8,color:'rgba(255,255,255,.55)',fontStyle:'italic'}}>{s.quote}</div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{background:'var(--ksl-black)'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'5rem',flexWrap:'wrap',gap:'2rem'}}>
          <div>
            <div className="eyebrow">What We Build</div>
            <h2 className="sec-title">OUR <span className="red">SERVICES</span></h2>
          </div>
          <p style={{maxWidth:420,fontSize:'.9rem',lineHeight:1.8,color:'var(--ksl-muted)'}}>Four focused disciplines. One team. Zero compromise. We deliver production-grade digital products.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1.5px',background:'var(--ksl-border)'}}>
          {SERVICES.map((s,i)=><ServiceCard key={s.num} s={s} i={i}/>)}
        </div>
      </div>
      <style>{`@media(max-width:900px){#services .grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
