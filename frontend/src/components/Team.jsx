import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TEAM = [
  {
    name:       'KALEESWARAN I.',
    role:       'Lead Architect & Full-Stack Engineer',
    credential: 'M.Sc IT · Madurai Kamaraj University · 4× Microsoft Certified',
    bio:        'The engineer who ships. Kaleeswaran architects and builds the full stack — from MongoDB schemas to React frontends and Three.js 3D engines. With 2+ years freelancing across 10+ clients remotely, he brings battle-tested experience in MERN, Next.js, and immersive web technologies. Azure AI & Data certified.',
    skills:     ['MERN Stack', 'Three.js', 'Next.js', 'React Three Fiber', 'Azure AI', 'MySQL'],
    accent:     'var(--ksl-crimson)',
    image:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    links: {
      github:    'https://github.com/kaleez17',
      linkedin:  'https://linkedin.com/in/kaleeswaran-irulaiya-293414214',
      instagram: 'https://instagram.com/kaleez',
      whatsapp:  'https://wa.me/916379953691',
      email:     'mailto:Kaleessultan415@gmail.com',
    }
  },
  {
    name:       'SHANMUGA SUDHAN K.',
    role:       'Head of Client Relations & Strategy',
    credential: 'Strategy · Business Development · 24/7 Support',
    bio:        'The bridge between your goals and our execution. Shanmuga translates business requirements into technical briefs, manages client relationships end-to-end, and ensures every project is delivered on time and on budget. Your direct line — always available.',
    skills:     ['Client Strategy', 'Project Management', 'Business Analysis', 'Digital Marketing', '24/7 Support'],
    accent:     'var(--ksl-neon-blue)',
    image:      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    links: {
      whatsapp:  'https://wa.me/916379953691',
      email:     'mailto:Kaleessultan415@gmail.com',
    }
  },
  {
    name:       'RAHUL.',
    role:       'Head of Client Relations & Strategy',
    credential: 'Strategy · Business Development · 24/7 Support',
    bio:        'Another key connector on the SERACID team. Rahul works alongside Shanmuga in managing client relationships, onboarding new projects, and translating business goals into execution-ready briefs. He ensures every client feels heard, supported, and delivered for — from first call to final deployment.',
    skills:     ['Client Relations', 'Project Strategy', 'Business Development', 'Onboarding', '24/7 Support'],
    accent:     '#c77dff',
    image:      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    links: {
      whatsapp:  'https://wa.me/916379953691',
      email:     'mailto:Kaleessultan415@gmail.com',
    }
  },
];

const SOCIAL_ICONS = {
  github:    { label: 'GitHub',    icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>) },
  linkedin:  { label: 'LinkedIn',  icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM3.56 20.45h3.55V9H3.56v11.45z"/></svg>) },
  instagram: { label: 'Instagram', icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>) },
  whatsapp:  { label: 'WhatsApp',  icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>) },
  email:     { label: 'Email',     icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>) },
};

function TeamCard({ member, i }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? member.accent : 'var(--ksl-border)'}`,
        transition: 'border-color 0.3s',
        overflow: 'hidden',
        background: 'var(--ksl-black)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: `grayscale(100%) contrast(1.1) brightness(${hovered ? 0.6 : 0.75})`,
            transform: `scale(${hovered ? 1.04 : 1})`,
            transition: 'all 0.6s ease',
          }}
        />
        {/* gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 45%, rgba(8,8,8,0.95))' }} />

        {/* animated accent line */}
        <motion.div
          animate={{ height: hovered ? '100%' : 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', top: 0, left: 0, width: 3, background: member.accent }}
        />

        {/* role badge on image */}
        <div style={{
          position: 'absolute', bottom: '1.2rem', left: '1.5rem',
          fontFamily: 'var(--ksl-mono)', fontSize: '0.58rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: member.accent, marginBottom: '0.3rem',
        }}>
          {member.role}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '1.8rem 2rem' }}>
        <h3 style={{
          fontFamily: 'var(--ksl-header)', fontSize: '2rem',
          letterSpacing: '0.04em', marginBottom: '0.3rem',
        }}>
          {member.name}
        </h3>
        <p style={{
          fontFamily: 'var(--ksl-mono)', fontSize: '0.62rem',
          color: 'var(--ksl-muted)', marginBottom: '1rem', lineHeight: 1.6,
        }}>
          {member.credential}
        </p>
        <p style={{
          fontSize: '0.84rem', color: 'var(--ksl-muted)',
          lineHeight: 1.75, marginBottom: '1.4rem',
        }}>
          {member.bio}
        </p>

        {/* Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {member.skills.map(s => (
            <span key={s} style={{
              fontFamily: 'var(--ksl-mono)', fontSize: '0.55rem',
              letterSpacing: '0.1em', padding: '0.25rem 0.7rem',
              background: 'var(--ksl-glass)',
              border: `1px solid ${hovered ? member.accent + '44' : 'var(--ksl-border)'}`,
              color: hovered ? '#fff' : 'var(--ksl-muted)',
              transition: 'all 0.3s',
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {Object.entries(member.links).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target={key === 'email' ? '_self' : '_blank'}
              rel="noreferrer"
              title={SOCIAL_ICONS[key]?.label}
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${hovered ? member.accent + '66' : 'var(--ksl-border)'}`,
                color: hovered ? member.accent : 'var(--ksl-muted)',
                textDecoration: 'none',
                transition: 'all 0.25s',
                background: 'var(--ksl-glass)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = member.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = member.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--ksl-glass)'; e.currentTarget.style.color = hovered ? member.accent : 'var(--ksl-muted)'; e.currentTarget.style.borderColor = hovered ? member.accent+'66' : 'var(--ksl-border)'; }}
            >
              {SOCIAL_ICONS[key]?.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" style={{ background: 'var(--ksl-black)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="eyebrow">The Minds Behind It</div>
        <h2 className="sec-title">THE <span className="blue">CORE</span></h2>
        <p style={{
          fontFamily: 'var(--ksl-mono)', fontSize: '0.8rem',
          color: 'var(--ksl-muted)', marginBottom: '4rem', maxWidth: 540,
        }}>
          Three specialists. One shared mission — engineer products that actually move the needle.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {TEAM.map((m, i) => <TeamCard key={m.name} member={m} i={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          #team > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 650px) {
          #team > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
