import React from 'react';
import { Toaster } from 'react-hot-toast';
import Nav        from './components/Nav';
import Hero       from './components/Hero';
import Ticker     from './components/Ticker';
import Services   from './components/Services';
import WhyUs      from './components/WhyUs';
import Team       from './components/Team';
import Portfolio  from './components/Portfolio';
import ProjectLog from './components/ProjectLog';
import Contact    from './components/Contact';
import Footer     from './components/Footer';
import Cursor     from './components/Cursor';
import './index.css';

export default function App() {
  return (
    <>
      <Cursor />
      <Toaster position="bottom-right" toastOptions={{
        style:{ background:'#0f0f0f', color:'#fff', border:'1px solid rgba(255,255,255,0.08)',
                fontFamily:"'Space Mono', monospace", fontSize:'0.72rem' }
      }}/>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <WhyUs />
        <Team />
        <Portfolio />
        <ProjectLog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
