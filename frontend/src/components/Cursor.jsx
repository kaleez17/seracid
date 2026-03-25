import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  let rx = 0, ry = 0, mx = 0, my = 0;

  useEffect(() => {
    const move = e => { mx = e.clientX; my = e.clientY;
      dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px'; };
    document.addEventListener('mousemove', move);

    const animate = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      requestAnimationFrame(animate);
    };
    animate();

    const hover = () => { dot.current.style.width='20px'; dot.current.style.height='20px'; dot.current.style.background='var(--ksl-neon-blue)'; };
    const leave = () => { dot.current.style.width='10px'; dot.current.style.height='10px'; dot.current.style.background='var(--ksl-crimson)'; };
    const els = document.querySelectorAll('a,button,[data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', leave); });

    return () => { document.removeEventListener('mousemove', move); };
  }, []);

  return (
    <>
      <div ref={dot}  style={{position:'fixed',width:10,height:10,borderRadius:'50%',background:'var(--ksl-crimson)',pointerEvents:'none',zIndex:9999,transform:'translate(-50%,-50%)',transition:'width .2s,height .2s,background .2s'}}/>
      <div ref={ring} style={{position:'fixed',width:32,height:32,borderRadius:'50%',border:'1px solid rgba(0,209,255,0.5)',pointerEvents:'none',zIndex:9998,transform:'translate(-50%,-50%)'}}/>
    </>
  );
}
