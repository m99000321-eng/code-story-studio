"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StudioScene from "./StudioScene";
import { ArrowRight, ArrowUpRight, Check, Code2, Layers3, Sparkles, WandSparkles, Zap } from "lucide-react";

const steps = [
  { n:"01", title:"Find the shape", text:"Turn a fuzzy idea into a plan with clear, achievable next steps.", icon:Layers3 },
  { n:"02", title:"Design with purpose", text:"Create a thoughtful experience before getting lost in the details.", icon:WandSparkles },
  { n:"03", title:"Build what matters", text:"Keep your work organized and move toward a product you can share.", icon:Code2 }
];

export default function Home() {
 const [idea,setIdea]=useState("");
 const [message,setMessage]=useState("");
 useEffect(() => {
   gsap.registerPlugin(ScrollTrigger);
   const ctx = gsap.context(() => {
     gsap.fromTo(".hero-copy > *", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: "power3.out" });
     gsap.fromTo(".step", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.14, ease: "power2.out", scrollTrigger: { trigger: ".steps", start: "top 82%" } });
     gsap.fromTo(".feature > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.16, ease: "power2.out", scrollTrigger: { trigger: ".feature", start: "top 80%" } });
     gsap.fromTo(".start-card", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: ".start", start: "top 82%" } });
     gsap.fromTo(".project-card", { y: 24, rotate: -10, scale: 0.92, opacity: 0 }, { y: 0, rotate: -5, scale: 1, opacity: 1, duration: 1.15, delay: 0.25, ease: "elastic.out(1, 0.65)" });
     gsap.to(".floating.top", { y: -9, rotate: 2, duration: 2.1, repeat: -1, yoyo: true, ease: "sine.inOut" });
     gsap.to(".floating.bottom", { y: 8, rotate: -2, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
     gsap.to(".orbit.o1", { rotation: 360, duration: 32, repeat: -1, ease: "none" });
     gsap.to(".orbit.o2", { rotation: -360, duration: 42, repeat: -1, ease: "none" });
     gsap.to(".ticker div", { xPercent: -25, duration: 28, repeat: -1, ease: "none" });
     gsap.fromTo(".mock", { rotate: 5, y: 24 }, { rotate: 2, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".mock", start: "top 85%" } });
     gsap.utils.toArray<HTMLElement>(".step, .mock-cards > div").forEach((el) => {
       const enter = () => gsap.to(el, { y: -6, duration: 0.25, ease: "power2.out" });
       const leave = () => gsap.to(el, { y: 0, duration: 0.35, ease: "power2.out" });
       el.addEventListener("pointerenter", enter);
       el.addEventListener("pointerleave", leave);
       ctx.add(() => { el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); });
     });
   });
   return () => ctx.revert();
 }, []);
 function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault(); if(!idea.trim()){setMessage("Write a few words about your idea first.");return;} setMessage("Your idea is captured in this preview. The project-planning workspace is the next feature to build.");}
 return <main>
  <nav className="nav wrap"><a className="brand" href="#"><span className="brand-icon"><Code2 size={20}/></span><span>code story <i>studio</i></span></a><div className="navlinks"><a href="#process">How it works</a><a href="#studio">The studio</a><a href="#start">Your idea</a></div><a className="navbutton" href="#start">Start a project <ArrowUpRight size={15}/></a></nav>
  <section className="hero wrap"><div className="hero-copy"><div className="eyebrow"><span/> A CREATIVE SPACE FOR WHAT'S NEXT</div><h1>Big ideas deserve<br/><em>a better beginning.</em></h1><p className="lead">From the first “what if?” to something real. Find clarity, shape the experience, and build your next big thing — one thoughtful step at a time.</p><div className="actions"><a className="primary" href="#start">Bring your idea <ArrowRight size={17}/></a><a className="secondary" href="#process">Explore the process <span>↘</span></a></div><div className="proof"><div className="bubbles"><span>C</span><span>S</span><span>+</span></div><span>For makers, learners, and curious minds<br/>ready to make something meaningful.</span></div></div>
  <div className="art" aria-label="Abstract project concept illustration"><StudioScene /><div className="orbit o1"></div><div className="orbit o2"></div><div className="floating top"><span className="dot"></span> Idea captured <Check size={14}/></div><div className="project-card"><div className="card-top"><span className="traffic"><i/><i/><i/></span><small>PROJECT / 001</small><span className="status"></span></div><div className="symbol"><Code2 size={39}/></div><h2>Something<br/><em>remarkable.</em></h2><div className="mini-lines"><i/><i/><i/></div><div className="card-foot"><span>IDEA → REALITY</span><Sparkles size={15}/></div></div><div className="floating bottom"><Zap size={15}/><span>Progress, made visible.</span></div><p className="art-caption">A little structure changes everything.</p></div><div className="hero-count">01 <span></span> START WITH AN IDEA</div></section>
  <div className="ticker"><div>THINK CLEARER <b>✳</b> DESIGN SMARTER <b>✳</b> BUILD BETTER <b>✳</b> SHIP WITH PURPOSE <b>✳</b> THINK CLEARER <b>✳</b> DESIGN SMARTER <b>✳</b></div></div>
  <section className="intro wrap" id="studio"><div className="kicker">A STUDIO FOR WHAT'S NEXT</div><div className="intro-grid"><h2>You bring the spark.<br/><em>We help shape the story.</em></h2><p>Starting something new can feel messy. Too many tabs, too many decisions, no clear next step. Code Story Studio gives your ideas a home — and a practical path from possibility to progress.</p></div></section>
  <section className="process wrap" id="process"><div className="section-head"><div><div className="kicker">A CLEARER WAY FORWARD</div><h2>Make the leap.<br/><em>Keep the clarity.</em></h2></div><p>No mystery process. Just a thoughtful workflow that turns “I have an idea” into “I know what to do next.”</p></div><div className="steps">{steps.map(({n,title,text,icon:Icon})=><article className="step" key={n}><div className="step-meta">{n} / 03 <Icon size={20}/></div><div className="step-icon"><Icon size={25}/></div><h3>{title}</h3><p>{text}</p><ArrowUpRight className="step-arrow" size={18}/></article>)}</div></section>
  <section className="dark-band"><div className="feature wrap"><div><div className="kicker light">BUILT AROUND YOUR VISION</div><h2>Less guesswork.<br/><em>More making.</em></h2><p className="feature-lead">A focused workspace for the important parts of bringing a digital product to life: understanding the problem, making design decisions, and keeping the build organized.</p><ul><li><Check size={16}/> A project plan that makes sense</li><li><Check size={16}/> Design direction with purpose</li><li><Check size={16}/> A clear path to working software</li></ul><a className="light-button" href="#start">Explore your idea <ArrowRight size={17}/></a></div><div className="mock"><div className="mock-bar"><span/><span/><span/><small>your-project / overview</small></div><div className="mock-body"><aside><b><Code2 size={14}/></b><i/><i/><i/><i/></aside><div className="mock-main"><small>PROJECT OVERVIEW</small><h3>Your next chapter.</h3><p>Everything starts with a plan.</p><div className="progress"><div>Project clarity <b>78%</b></div><span><i/></span><small>You're finding your direction.</small></div><div className="mock-cards"><div><Layers3/><b>Plan</b><small>4 milestones</small></div><div><WandSparkles/><b>Design</b><small>In progress</small></div><div><Code2/><b>Build</b><small>Up next</small></div></div><div className="mock-foot"><Check size={13}/> First steps, all in one place</div></div></div></div></div></section>
  <section className="start wrap" id="start"><div className="start-card"><div className="start-main"><div className="kicker">EVERYTHING STARTS SOMEWHERE</div><h2>What are you<br/><em>thinking of building?</em></h2><p>Give your idea a name. It doesn't need to be perfect — it just needs a place to start.</p><form onSubmit={submit}><label htmlFor="idea">YOUR IDEA IN A FEW WORDS</label><div className="input-row"><input id="idea" value={idea} onChange={e=>{setIdea(e.target.value);setMessage("");}} maxLength={240} placeholder="A learning app, a creative portfolio…"/><button aria-label="Submit idea" type="submit"><ArrowRight size={19}/></button></div><div className="input-meta"><span>{idea.length}/240 characters</span><span>Start small. Think big.</span></div>{message&&<p className="message" role="status">{message}</p>}</form></div><div className="quote"><div className="quote-tag"><Sparkles size={15}/> THE FIRST STEP</div><blockquote>“Every great product started as a thought someone decided to take seriously.”</blockquote><div className="signature"><span><Code2 size={16}/></span><div>CODE STORY STUDIO<small>IDEAS INTO SOMETHING REAL</small></div></div></div></div></section>
  <footer className="footer wrap"><a className="brand" href="#"><span className="brand-icon"><Code2 size={18}/></span><span>code story <i>studio</i></span></a><span>Good things start with a story.</span><small>© {new Date().getFullYear()} Code Story Studio</small></footer>
 </main>;
}