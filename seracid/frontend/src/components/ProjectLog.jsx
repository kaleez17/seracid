import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchLogs } from '../api';

const TYPE_COLOR = {
  deploy:    '#E63946',
  commit:    '#00D1FF',
  launch:    '#00ff88',
  update:    '#f4a261',
  milestone: '#c77dff',
};
const TYPE_ICON = {
  deploy:'▲', commit:'●', launch:'🚀', update:'↑', milestone:'★'
};

function timeAgo(date) {
  const s = Math.floor((Date.now()-new Date(date))/1000);
  if(s<60)return`${s}s ago`;
  if(s<3600)return`${Math.floor(s/60)}m ago`;
  if(s<86400)return`${Math.floor(s/3600)}h ago`;
  return`${Math.floor(s/86400)}d ago`;
}

export default function ProjectLog() {
  const [logs,    setLogs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 });
  const termRef = useRef(null);

  useEffect(()=>{
    fetchLogs(15)
      .then(r=>setLogs(r.data))
      .catch(()=>setLogs(FALLBACK))
      .finally(()=>setLoading(false));
  },[]);

  useEffect(()=>{
    if(termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  },[logs]);

  return (
    <section id="log" style={{background:'var(--ksl-black)'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div className="eyebrow">Live Activity</div>
        <h2 className="sec-title">PROJECT <span className="blue">LOG</span></h2>
        <p style={{fontFamily:'var(--ksl-mono)',fontSize:'.72rem',color:'var(--ksl-muted)',marginBottom:'3rem'}}>
          // real-time commit &amp; deploy feed — pulled from MongoDB
        </p>

        <motion.div ref={ref} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          {/* terminal header */}
          <div style={{background:'#0a0a0a',border:'1px solid var(--ksl-border)',borderBottom:'none'}}>
            <div style={{padding:'.8rem 1.2rem',borderBottom:'1px solid var(--ksl-border)',display:'flex',alignItems:'center',gap:'1.5rem'}}>
              <div style={{display:'flex',gap:'.5rem'}}>
                <span style={{width:12,height:12,borderRadius:'50%',background:'#E63946',display:'inline-block'}}/>
                <span style={{width:12,height:12,borderRadius:'50%',background:'#f4a261',display:'inline-block'}}/>
                <span style={{width:12,height:12,borderRadius:'50%',background:'#00ff88',display:'inline-block'}}/>
              </div>
              <span style={{fontFamily:'var(--ksl-mono)',fontSize:'.65rem',color:'var(--ksl-muted)',letterSpacing:'.1em'}}>seracid@lab — project-log</span>
              <span style={{marginLeft:'auto',fontFamily:'var(--ksl-mono)',fontSize:'.6rem',color:'var(--ksl-neon-blue)'}}>
                {loading ? '● fetching...' : `● ${logs.length} entries`}
              </span>
            </div>
          </div>

          {/* log body */}
          <div ref={termRef} style={{background:'#0a0a0a',border:'1px solid var(--ksl-border)',maxHeight:480,overflowY:'auto',padding:'1rem 0'}}>
            {loading ? (
              <div style={{padding:'2rem',fontFamily:'var(--ksl-mono)',fontSize:'.72rem',color:'var(--ksl-neon-blue)'}}>
                <span style={{color:'var(--ksl-crimson)'}}>$ </span>fetching logs...
              </div>
            ) : (
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div key={log._id||i}
                    initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.04}}
                    style={{display:'grid',gridTemplateColumns:'140px 80px 160px 1fr 80px',gap:'1rem',
                      padding:'.6rem 1.5rem',borderBottom:'1px solid rgba(255,255,255,0.03)',
                      fontFamily:'var(--ksl-mono)',fontSize:'.68rem',alignItems:'center',
                      transition:'background .2s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <span style={{color:'var(--ksl-muted)'}}>{new Date(log.createdAt||Date.now()).toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</span>
                    <span style={{color:TYPE_COLOR[log.type]||'#fff',letterSpacing:'.08em',textTransform:'uppercase',fontSize:'.6rem'}}>
                      {TYPE_ICON[log.type]} {log.type}
                    </span>
                    <span style={{color:'var(--ksl-neon-blue)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{log.project}</span>
                    <span style={{color:'rgba(255,255,255,.7)'}}>{log.message}</span>
                    <span style={{color:'var(--ksl-muted)',fontSize:'.58rem',textAlign:'right'}}>{timeAgo(log.createdAt||Date.now())}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* terminal prompt */}
          <div style={{background:'#0a0a0a',border:'1px solid var(--ksl-border)',borderTop:'none',padding:'.8rem 1.5rem',fontFamily:'var(--ksl-mono)',fontSize:'.68rem',display:'flex',alignItems:'center',gap:'.5rem'}}>
            <span style={{color:'var(--ksl-neon-blue)'}}>seracid@lab:~$</span>
            <span style={{color:'rgba(255,255,255,.5)'}}>git log --oneline --all</span>
            <motion.span animate={{opacity:[1,0,1]}} transition={{repeat:Infinity,duration:1}} style={{display:'inline-block',width:8,height:14,background:'var(--ksl-crimson)',marginLeft:4}}/>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const FALLBACK = [
  {_id:1,type:'deploy',   project:'seracid-web',         message:'v2.0.0 deployed to production',           createdAt:new Date(Date.now()-3600000)},
  {_id:2,type:'commit',   project:'buddy-sticker-shop',  message:'feat: add UPI checkout integration',       createdAt:new Date(Date.now()-7200000)},
  {_id:3,type:'launch',   project:'smb-ramnad',          message:'client site went live — smb-ramnad.com',   createdAt:new Date(Date.now()-86400000)},
  {_id:4,type:'commit',   project:'memory-keeper',       message:'fix: image upload timeout on mobile',      createdAt:new Date(Date.now()-172800000)},
  {_id:5,type:'milestone',project:'3d-gallery',          message:'40% engagement boost confirmed by client', createdAt:new Date(Date.now()-259200000)},
  {_id:6,type:'commit',   project:'dashboard',           message:'feat: add recharts revenue widget',        createdAt:new Date(Date.now()-345600000)},
  {_id:7,type:'deploy',   project:'flames-predictor',    message:'deployed v1.2 — added score history',      createdAt:new Date(Date.now()-432000000)},
  {_id:8,type:'commit',   project:'seracid-api',         message:'feat: lead capture with nodemailer',       createdAt:new Date(Date.now()-518400000)},
];
