import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════════ */
const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{typeof d === "string" ? <path d={d}/> : d}</svg>
);
const ChevronRight = ({size=20}) => <Icon size={size} d="M9 18l6-6-6-6"/>;
const MenuIcon = ({size=26}) => <Icon size={size} d={<><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}/>;
const XIcon = ({size=26}) => <Icon size={size} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}/>;
const MailIcon = ({size=20}) => <Icon size={size} d={<><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></>}/>;
const CalendarIcon = ({size=28}) => <Icon size={size} d={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>}/>;
const ExternalLinkIcon = ({size=13}) => <Icon size={size} d={<><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>}/>;
const ClipboardCheckIcon = () => <Icon size={24} stroke="#60a5fa" d={<><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></>}/>;
const TrendingUpIcon = () => <Icon size={24} stroke="#2dd4bf" d={<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>}/>;
const SettingsIcon = () => <Icon size={24} stroke="#a78bfa" d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>}/>;
const BriefcaseIcon = () => <Icon size={24} stroke="#fbbf24" d={<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>}/>;
const LinkedinIcon = ({size=20}) => <Icon size={size} d={<><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>}/>;
const InstagramIcon = ({size=20}) => <Icon size={size} d={<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}/>;

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const engagementStructures = [
  { icon: <ClipboardCheckIcon/>, title: "Assessments", items: ["Pre-Launch IT & Security Checklist","Risk & Vulnerability Analysis","Simulated Phishing Tests","HIPAA & SOC2 Compliance Preparation"] },
  { icon: <TrendingUpIcon/>, title: "Development", items: ["Organizational IT Planning","Role Scoping & Hiring","Policy & Process Implementation","Cross-Team Collaboration","Daily IT Support"] },
  { icon: <SettingsIcon/>, title: "Implementations", items: ["Password & Device Management","IT Security Training","Telephony Management","SaaS Control & Cost Tracking"] },
  { icon: <BriefcaseIcon/>, title: "Projects", items: ["Call Center Development","New Location Buildouts","Platform Migrations","Building IT for Scale"] },
];

const complianceColumns = [
  { label: "Checklists", items: ["Pre-Launch","New Markets","Policies","Trainings","SaaS Configuration"] },
  { label: "Assessments", items: ["Vulnerability Assessment","IT Risk Assessment","HIPAA Compliance","PCI-DSS, SOC2","NIST, ISO 27001"] },
  { label: "Materials", items: ["Risk & Remediation Tracker","Policy Template","Data Flow Diagrams","Cybersecurity Insurance Guidance","Training Decks"] },
];

const processColumns = [
  { label: "IT Services", items: ["Automated Device Management","Identity & Single-Sign On","Ticketing & Issue Management","Data Sharing & Loss Prevention","Staff Training"] },
  { label: "Org Wide", items: ["Call Center & Telephony","New Site Construction","Cameras, Alarms, & Suite Access","WiFi and Networking","Conference Rooms & AV"] },
  { label: "Governance", items: ["IT Leadership & Representation","Strategic Guidance & Roadmaps","Fiscal Responsibility & Budgeting","Vendor Relationship Management"] },
];

const clientNames = [
  "Marley Medical","MealPal","BetterHealth","The Harvard Crimson","Mashable",
  "Y7 Studio","Boost Insurance","Grovo","Blissfully","Vivorcare",
  "JECT","WorkHeights","Peachy Studio"
];

const clientColors = [
  "#3b82f6","#10b981","#8b5cf6","#f59e0b","#ec4899",
  "#06b6d4","#ef4444","#84cc16","#6366f1","#14b8a6",
  "#f97316","#a855f7","#0ea5e9"
];

const engagementTypes = [
  { title: "Fractional IT\nLeadership & Support", desc: "Ongoing IT leadership and technical guidance without the full-time cost. I act as your IT director — attending leadership meetings, setting roadmaps, and managing vendors." },
  { title: "Projects & Initiatives\nto Erase IT Debt", desc: "Targeted engagements to resolve specific IT gaps: building out a call center, standing up a new office, migrating infrastructure, or addressing compliance gaps." },
  { title: "Assessments to Create\nYour IT Roadmap", desc: "A full picture of your current IT posture with a prioritized remediation roadmap. Covers risk, vulnerability, HIPAA, PCI-DSS, SOC2, NIST, and ISO 27001." },
  { title: "Consultations to\nEnable Your Team", desc: "One-time or recurring advisory sessions. Perfect for teams who have IT staff but need senior guidance on architecture decisions, vendor selection, or audit prep." },
];

const caseStudies = [
  {
    title: "Call Center Build-Out for Multi-Location Healthcare Provider",
    client: "Healthcare / Wellness",
    tags: ["Telephony", "Call Center", "HIPAA"],
    challenge: "A fast-growing healthcare company with 15+ locations needed a centralized call center to handle patient intake, scheduling, and follow-ups — but had no existing telephony infrastructure or internal IT leadership to guide the project.",
    approach: "Conducted a full telephony needs assessment across all markets, evaluated platforms against HIPAA BAA requirements, and led the migration to a unified cloud-based system with custom call flows, IVR menus, and reporting dashboards.",
    outcome: "Launched a fully operational call center within 8 weeks. Call routing accuracy improved dramatically, patient wait times dropped, and the platform scaled seamlessly as new locations opened.",
  },
  {
    title: "SOC2 Compliance from Zero to Audit-Ready",
    client: "SaaS / Insurance Tech",
    tags: ["SOC2", "Compliance", "Risk Assessment"],
    challenge: "An early-stage SaaS company needed SOC2 Type II certification to close enterprise deals but had no formal security policies, risk assessments, or compliance documentation in place.",
    approach: "Built the entire compliance program from scratch — risk assessments, policy library, access controls, vendor management, and employee training. Implemented continuous monitoring tools and prepared all evidence for the audit.",
    outcome: "Passed SOC2 Type II audit on the first attempt with zero exceptions. The company closed two enterprise contracts within 60 days of certification.",
  },
  {
    title: "New Office IT Build for Expanding Startup",
    client: "Consumer Tech",
    tags: ["Office Build", "Networking", "Device Management"],
    challenge: "A Series B startup was opening a new headquarters and needed end-to-end IT infrastructure — networking, conference rooms, access control, device management — on a tight timeline with no internal IT team.",
    approach: "Managed the full IT scope of the office build: vendor selection for ISP, WiFi, and security systems; device procurement and MDM enrollment; conference room AV setup; and secure guest network configuration.",
    outcome: "Office was fully operational on move-in day. Zero IT tickets in the first two weeks. The setup became the template for subsequent office expansions.",
  },
  {
    title: "IT Function Development for Pre-Series A",
    client: "Digital Media",
    tags: ["IT Leadership", "Hiring", "Roadmap"],
    challenge: "A growing media company had outgrown ad-hoc IT management. They needed a structured IT function but couldn't justify a full-time hire at their stage.",
    approach: "Stepped in as fractional IT director — assessed the current state, built a prioritized roadmap, implemented core systems (SSO, MDM, ticketing), created documentation, and eventually scoped and hired their first internal IT role.",
    outcome: "Transformed IT from a reactive pain point into a proactive function. The internal hire onboarded with clear documentation, established processes, and a 12-month roadmap.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
  :root { --font-display: 'DM Serif Display', Georgia, serif; --font-body: 'DM Sans', system-ui, sans-serif; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { font-family: var(--font-body); }

  @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
  @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
  @keyframes pulseRing { 0% { transform:scale(.85); opacity:.6; } 70% { transform:scale(1.15); opacity:0; } 100% { transform:scale(.85); opacity:0; } }
  @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  @keyframes dash { to { stroke-dashoffset:-60; } }
  @keyframes cardIn { from { opacity:0; transform:translateY(12px) scale(.96); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.3; } }
  @keyframes scan { 0% { transform:translateY(0%); opacity:.7; } 100% { transform:translateY(220px); opacity:0; } }
  @keyframes tick { 0% { stroke-dashoffset:24; opacity:0; } 60% { opacity:1; } 100% { stroke-dashoffset:0; opacity:1; } }

  .anim-fade { animation: fadeIn .6s ease-out both; }
  .anim-slide-down { animation: slideDown .35s ease-out both; }
  .stagger-1 { animation-delay:.05s; } .stagger-2 { animation-delay:.12s; }
  .stagger-3 { animation-delay:.2s; } .stagger-4 { animation-delay:.28s; }

  .marquee-wrap { overflow:hidden; width:100%;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }
  .marquee-track { display:flex; width:max-content; animation:marquee 36s linear infinite; }
  .marquee-track:hover { animation-play-state:paused; }

  .section-rule { border:none; border-top:1px solid rgb(51 65 85); margin:.75rem 0 2.5rem; }
  .circle-list { list-style:none; padding:0; }
  .circle-list li { padding:.2rem 0; color:rgb(148 163 184); }
  .circle-list li::before { content:'○  '; color:rgb(100 116 139); }

  .hg-root { width:100%; max-width:520px; height:480px; position:relative; user-select:none; }
  .hg-float { animation: float 5s ease-in-out infinite; }
  .hg-card { background:rgba(15,23,42,.92); border:1px solid rgba(59,130,246,.22); border-radius:14px;
    backdrop-filter:blur(12px); box-shadow:0 4px 32px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05);
    animation: cardIn .6s cubic-bezier(.22,1,.36,1) both; overflow:hidden; position:absolute; }
  .hg-card-glow { position:absolute; inset:0; border-radius:14px; pointer-events:none; }

  .scroll-reveal { opacity:0; transform:translateY(24px); transition: opacity .6s ease, transform .6s ease; }
  .scroll-reveal.visible { opacity:1; transform:translateY(0); }

  a { text-decoration:none; }
  .nav-link { color:#94a3b8; font-size:14px; font-weight:500; cursor:pointer; transition:color .2s; background:none; border:none; font-family:inherit; }
  .nav-link:hover { color:#fff; }
`;

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
═══════════════════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const Reveal = ({ children, className = "", delay = 0 }) => {
  const [ref, vis] = useScrollReveal();
  return <div ref={ref} className={`scroll-reveal ${vis ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
};

/* ═══════════════════════════════════════════════════════════════
   HERO GRAPHIC
═══════════════════════════════════════════════════════════════ */
const CheckRow = ({ label, done, delay }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8, animation:"cardIn .5s ease both", animationDelay:delay }}>
    <svg width={16} height={16} viewBox="0 0 16 16">
      <circle cx={8} cy={8} r={7} fill={done?"#1d4ed8":"rgba(30,41,59,.8)"} stroke={done?"#3b82f6":"#334155"} strokeWidth={1.5}/>
      {done && <polyline points="4.5,8 7,10.5 11.5,6" fill="none" stroke="#93c5fd" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={24} style={{animation:`tick .4s ease ${delay} both`}}/>}
    </svg>
    <span style={{fontSize:11, color:done?"#cbd5e1":"#475569"}}>{label}</span>
  </div>
);

const HeroGraphic = () => (
  <div className="hg-root" aria-hidden="true">
    <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",top:"10%",left:"20%",background:"radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
    <div style={{position:"absolute",width:160,height:160,borderRadius:"50%",bottom:"15%",right:"25%",background:"radial-gradient(circle,rgba(139,92,246,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
    {[{r:110,dur:18,rev:false,col:"#3b82f6"},{r:150,dur:28,rev:true,col:"#10b981"}].map((o,i) => (
      <svg key={i} width={o.r*2+20} height={o.r*2+20} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:`spinSlow ${o.dur}s linear infinite${o.rev?" reverse":""}`,pointerEvents:"none"}} viewBox={`0 0 ${o.r*2+20} ${o.r*2+20}`}>
        <circle cx={o.r+10} cy={o.r+10} r={o.r} fill="none" stroke="rgba(59,130,246,.12)" strokeWidth="1" strokeDasharray="4 8"/>
        <circle cx={o.r+10} cy={10} r={4} fill={o.col} opacity={.8}/>
      </svg>
    ))}
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 520 480">
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" stopOpacity=".7"/><stop offset="100%" stopColor="#3b82f6" stopOpacity=".08"/></linearGradient>
        <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#10b981" stopOpacity=".7"/><stop offset="100%" stopColor="#10b981" stopOpacity=".08"/></linearGradient>
        <linearGradient id="lg3" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8b5cf6" stopOpacity=".7"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity=".08"/></linearGradient>
      </defs>
      <line x1="190" y1="110" x2="258" y2="238" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="6 5" style={{animation:"dash 2s linear infinite"}}/>
      <line x1="330" y1="185" x2="262" y2="242" stroke="url(#lg2)" strokeWidth="1.5" strokeDasharray="6 5" style={{animation:"dash 2s linear infinite",animationDelay:".6s"}}/>
      <line x1="260" y1="390" x2="260" y2="272" stroke="url(#lg3)" strokeWidth="1.5" strokeDasharray="6 5" style={{animation:"dash 2s linear infinite",animationDelay:"1.2s"}}/>
      {[{cx:190,cy:110,c:"#3b82f6",d:"0s"},{cx:330,cy:185,c:"#10b981",d:".6s"},{cx:260,cy:390,c:"#8b5cf6",d:"1.2s"}].map((p,i)=><circle key={i} cx={p.cx} cy={p.cy} r={3} fill={p.c} opacity={.8} style={{animation:"blink 2s ease-in-out infinite",animationDelay:p.d}}/>)}
    </svg>
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:64,height:64,zIndex:10}}>
      {[0,.8,1.6].map((d,i) => <div key={i} style={{position:"absolute",inset:-8,borderRadius:"50%",border:"1.5px solid rgba(59,130,246,.35)",animation:"pulseRing 3s ease-out infinite",animationDelay:`${d}s`}}/>)}
      <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#1e3a8a,#1d4ed8)",border:"2px solid rgba(96,165,250,.5)",boxShadow:"0 0 32px rgba(59,130,246,.35)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg width={28} height={28} viewBox="0 0 28 28" fill="none"><rect x={4} y={7} width={8} height={14} rx={2} stroke="#93c5fd" strokeWidth={1.5}/><rect x={8} y={7} width={2} height={3} fill="#93c5fd"/><rect x={8} y={18} width={2} height={3} fill="#93c5fd"/><path d="M17 9L17 19M14 9L20 9M14 19L20 19" stroke="#93c5fd" strokeWidth={1.5} strokeLinecap="round"/></svg>
      </div>
    </div>
    {/* Readiness Card */}
    <div className="hg-card hg-float" style={{width:190,left:0,top:20,padding:"14px 14px 12px"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#3b82f6,transparent)",animation:"scan 2.8s ease-in infinite",animationDelay:"1s",pointerEvents:"none"}}/>
      <div className="hg-card-glow" style={{background:"radial-gradient(ellipse at top left,rgba(59,130,246,.12) 0%,transparent 70%)"}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:26,height:26,borderRadius:7,background:"linear-gradient(135deg,#1d4ed8,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width={13} height={13} viewBox="0 0 13 13" fill="none"><rect x={1} y={1} width={11} height={11} rx={2} stroke="#93c5fd" strokeWidth={1.2}/><polyline points="3.5,6.5 5.5,8.5 9.5,4.5" stroke="#93c5fd" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{fontSize:10,fontWeight:700,color:"#e2e8f0",letterSpacing:".05em",textTransform:"uppercase"}}>Readiness</span>
        </div>
        <span style={{fontSize:9,color:"#22c55e",fontWeight:600,background:"rgba(34,197,94,.1)",borderRadius:4,padding:"2px 6px",border:"1px solid rgba(34,197,94,.2)"}}>LIVE</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{position:"relative",width:48,height:48,flexShrink:0}}>
          <svg width={48} height={48} viewBox="0 0 48 48"><circle cx={24} cy={24} r={20} fill="none" stroke="rgba(51,65,85,.6)" strokeWidth={5}/><circle cx={24} cy={24} r={20} fill="none" stroke="#3b82f6" strokeWidth={5} strokeDasharray={`${Math.PI*40*.82} ${Math.PI*40}`} strokeDashoffset={Math.PI*40*.25} strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}/></svg>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#93c5fd"}}>82%</div>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:"#94a3b8",marginBottom:4}}>IT Readiness Score</div>
          <div style={{height:4,background:"rgba(51,65,85,.6)",borderRadius:2,overflow:"hidden"}}><div style={{width:"82%",height:"100%",background:"linear-gradient(90deg,#1d4ed8,#60a5fa)",borderRadius:2}}/></div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        <CheckRow label="SOC2 Readiness" done delay=".3s"/>
        <CheckRow label="HIPAA Assessment" done delay=".5s"/>
        <CheckRow label="Risk Analysis" done delay=".7s"/>
        <CheckRow label="PCI-DSS Review" done={false} delay=".9s"/>
      </div>
    </div>
    {/* Projects Card */}
    <div className="hg-card hg-float" style={{width:188,right:0,top:60,padding:"14px 14px 12px",animationDelay:"1.2s",animationDuration:"5.5s"}}>
      <div className="hg-card-glow" style={{background:"radial-gradient(ellipse at top right,rgba(16,185,129,.1) 0%,transparent 70%)"}}/>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
        <div style={{width:26,height:26,borderRadius:7,background:"linear-gradient(135deg,#047857,#10b981)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width={13} height={13} viewBox="0 0 13 13" fill="none"><rect x={1} y={5} width={4} height={7} rx={1} fill="#6ee7b7"/><rect x={5.5} y={3} width={4} height={9} rx={1} fill="#6ee7b7" opacity={.7}/><rect x={10} y={1} width={2} height={11} rx={1} fill="#6ee7b7" opacity={.5}/></svg>
        </div>
        <span style={{fontSize:10,fontWeight:700,color:"#e2e8f0",letterSpacing:".05em",textTransform:"uppercase"}}>Projects</span>
        <span style={{marginLeft:"auto",fontSize:9,color:"#10b981",fontWeight:600}}>4 Active</span>
      </div>
      {[{l:"Call Center Setup",p:100,c:"#22c55e"},{l:"SSO Migration",p:73,c:"#3b82f6"},{l:"New Site Build",p:45,c:"#f59e0b"},{l:"WiFi Rollout",p:20,c:"#64748b"}].map((t,i)=>(
        <div key={i} style={{marginBottom:8,animation:"cardIn .5s ease both",animationDelay:`${.2+i*.12}s`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:10,color:"#94a3b8"}}>{t.l}</span><span style={{fontSize:10,color:t.c,fontWeight:600}}>{t.p}%</span></div>
          <div style={{height:4,background:"rgba(51,65,85,.7)",borderRadius:2,overflow:"hidden"}}><div style={{width:`${t.p}%`,height:"100%",background:t.c,borderRadius:2}}/></div>
        </div>
      ))}
      <div style={{display:"flex",gap:6,marginTop:4}}>
        {[{c:"#22c55e",l:"On track"},{c:"#f59e0b",l:"In progress"}].map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:7,height:7,borderRadius:"50%",background:s.c,animation:"blink 2s ease-in-out infinite",animationDelay:`${i*.4}s`}}/><span style={{fontSize:10,color:"#64748b"}}>{s.l}</span></div>
        ))}
      </div>
    </div>
    {/* Support Card */}
    <div className="hg-card hg-float" style={{width:210,left:"50%",bottom:10,transform:"translateX(-50%)",padding:"12px 14px",animationDelay:".6s",animationDuration:"6s"}}>
      <div className="hg-card-glow" style={{background:"radial-gradient(ellipse at bottom,rgba(139,92,246,.1) 0%,transparent 70%)"}}/>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
        <div style={{width:26,height:26,borderRadius:7,background:"linear-gradient(135deg,#5b21b6,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width={13} height={13} viewBox="0 0 13 13" fill="none"><circle cx={6.5} cy={6.5} r={5.5} stroke="#c4b5fd" strokeWidth={1.2}/><path d="M4 5.5C4 4.1 9 4.1 9 6C9 7.5 6.5 7.5 6.5 9" stroke="#c4b5fd" strokeWidth={1.2} strokeLinecap="round" fill="none"/><circle cx={6.5} cy={10.5} r={.7} fill="#c4b5fd"/></svg>
        </div>
        <span style={{fontSize:10,fontWeight:700,color:"#e2e8f0",letterSpacing:".05em",textTransform:"uppercase"}}>Everyday Support</span>
        <span style={{marginLeft:"auto",fontSize:9,fontWeight:600,color:"#a78bfa",background:"rgba(139,92,246,.12)",borderRadius:4,padding:"2px 6px",border:"1px solid rgba(139,92,246,.25)"}}>Ongoing</span>
      </div>
      {[{id:"#104",l:"Device onboarding",s:"Resolved",sc:"#22c55e",d:".2s"},{id:"#105",l:"SSO access request",s:"Open",sc:"#3b82f6",d:".35s"},{id:"#106",l:"Vendor renewal review",s:"In review",sc:"#f59e0b",d:".5s"}].map(t=>(
        <div key={t.id} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 7px",background:"rgba(30,41,59,.5)",borderRadius:7,border:"1px solid rgba(51,65,85,.5)",animation:"cardIn .5s ease both",animationDelay:t.d,marginBottom:4}}>
          <span style={{fontSize:9,color:"#475569",flexShrink:0}}>{t.id}</span>
          <span style={{fontSize:10,color:"#94a3b8",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.l}</span>
          <span style={{fontSize:9,fontWeight:600,color:t.sc,flexShrink:0,background:`${t.sc}18`,borderRadius:4,padding:"1px 5px"}}>{t.s}</span>
        </div>
      ))}
      <div style={{marginTop:8,display:"flex",alignItems:"center",gap:6}}>
        <svg width={80} height={22} viewBox="0 0 80 22"><defs><linearGradient id="hgsg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity=".4"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient></defs><polyline points="0,18 13,14 26,16 39,8 52,12 65,5 78,3" fill="none" stroke="#8b5cf6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/><polyline points="0,18 13,14 26,16 39,8 52,12 65,5 78,3 78,22 0,22" fill="url(#hgsg)" stroke="none" opacity={.3}/></svg>
        <span style={{fontSize:9,color:"#64748b"}}>Ticket velocity ↑ 18%</span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════════ */
const SectionHeading = ({ children, intro }) => (
  <div style={{marginBottom:8}}>
    <h2 style={{fontSize:32,color:"#fff",marginBottom:4,fontFamily:"var(--font-display)"}}>{children}</h2>
    <hr className="section-rule"/>
    {intro && <p style={{color:"#94a3b8",maxWidth:640,lineHeight:1.7,marginBottom:32}}>{intro}</p>}
  </div>
);

const CircleList = ({ items }) => (
  <ul className="circle-list">{items.map(item => <li key={item} style={{fontSize:14}}>{item}</li>)}</ul>
);

const ClientMarquee = () => {
  const data = [...clientNames,...clientNames].map(nm => ({
    name: nm,
    initials: nm.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()
  }));
  return (
    <div className="marquee-wrap">
      <div className="marquee-track" style={{gap:40}}>
        {data.map((c,i) => (
          <div key={i} style={{flexShrink:0,padding:"8px 12px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
            <div style={{width:40,height:40,borderRadius:10,background:`${clientColors[i % clientColors.length]}18`,border:`1px solid ${clientColors[i % clientColors.length]}30`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:14,fontWeight:700,color:clientColors[i % clientColors.length]}}>{c.initials}</span>
            </div>
            <span style={{color:"#475569",fontSize:11,fontWeight:600,whiteSpace:"nowrap",letterSpacing:".02em"}}>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════ */
const Navigation = ({ page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const navTo = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <nav style={{position:"fixed",width:"100%",zIndex:50,transition:"all .3s",background:scrolled?"rgba(15,23,42,.95)":"transparent",backdropFilter:scrolled?"blur(12px)":"none",padding:scrolled?"12px 0":"20px 0",boxShadow:scrolled?"0 4px 12px rgba(0,0,0,.2)":"none"}}>
      <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div onClick={()=>navTo("home")} style={{cursor:"pointer",display:"flex",flexDirection:"column",lineHeight:1}}>
          <span style={{fontSize:11,fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",color:"#60a5fa",marginBottom:2}}>The</span>
          <span style={{fontSize:24,fontWeight:700,color:"#fff",letterSpacing:"-.02em",fontFamily:"var(--font-display)"}}>IT Plan</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:32}} className="nav-desktop">
          <button onClick={()=>navTo("services")} className="nav-link">Services</button>
          <button onClick={()=>navTo("case-studies")} className="nav-link">Case Studies</button>
          <button onClick={()=>navTo("about")} className="nav-link">About</button>
          <button onClick={()=>navTo("engagements")} style={{background:"#2563eb",color:"#fff",fontSize:14,padding:"10px 20px",borderRadius:8,fontWeight:600,border:"none",cursor:"pointer",transition:"background .2s",fontFamily:"inherit"}}>Start an Engagement</button>
        </div>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",padding:4}} className="nav-mobile-btn">{menuOpen ? <XIcon/> : <MenuIcon/>}</button>
      </div>
      {menuOpen && (
        <div className="anim-slide-down" style={{background:"#0f172a",borderTop:"1px solid #1e293b",padding:"16px 24px",display:"flex",flexDirection:"column",gap:4}}>
          <span onClick={()=>navTo("services")} style={{display:"block",padding:"12px",color:"#cbd5e1",borderRadius:8,cursor:"pointer"}}>Services</span>
          <span onClick={()=>navTo("case-studies")} style={{display:"block",padding:"12px",color:"#cbd5e1",borderRadius:8,cursor:"pointer"}}>Case Studies</span>
          <span onClick={()=>navTo("about")} style={{display:"block",padding:"12px",color:"#cbd5e1",borderRadius:8,cursor:"pointer"}}>About</span>
          <button onClick={()=>navTo("engagements")} style={{marginTop:8,background:"#2563eb",color:"#fff",padding:"12px 20px",borderRadius:8,fontWeight:600,border:"none",cursor:"pointer",width:"100%",textAlign:"center",fontFamily:"inherit"}}>Start an Engagement</button>
        </div>
      )}
      <style>{`
        .nav-desktop { display:flex!important; }
        .nav-mobile-btn { display:none!important; }
        @media(max-width:768px) { .nav-desktop{display:none!important;} .nav-mobile-btn{display:block!important;} }
      `}</style>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE SECTIONS
═══════════════════════════════════════════════════════════════ */
const Hero = ({ setPage }) => (
  <section style={{position:"relative",paddingTop:144,paddingBottom:96,background:"#0f172a",overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,opacity:.03,backgroundImage:"linear-gradient(rgb(148 163 184) 1px,transparent 1px),linear-gradient(90deg,rgb(148 163 184) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
    <div style={{position:"relative",zIndex:10,maxWidth:1152,margin:"0 auto",padding:"0 24px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}} className="hero-grid">
        <div className="anim-fade">
          <p style={{color:"#60a5fa",fontSize:13,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",marginBottom:16}}>All-In-One IT Development</p>
          <h1 style={{fontSize:56,color:"#fff",lineHeight:1.05,marginBottom:24,fontFamily:"var(--font-display)"}}>IT-in-a-Box<br/><span style={{color:"#60a5fa"}}>for Early Stage</span></h1>
          <p style={{color:"#94a3b8",fontSize:18,marginBottom:16}}>Pre-Seed to Series&nbsp;C</p>
          <ul style={{listStyle:"none",padding:0,marginBottom:40}}>
            {["Readiness Checklists & Roadmap","Security, Risk, & Compliance Assessments","Stage-Appropriate Solutions","Hands-On, Customized Training","New Location Buildouts & Construction"].map((item,i)=>(
              <li key={item} style={{display:"flex",alignItems:"center",gap:12,color:"#cbd5e1",padding:"4px 0"}}>
                <span style={{width:20,height:20,borderRadius:"50%",background:"rgba(59,130,246,.15)",border:"1px solid rgba(59,130,246,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:"#60a5fa",flexShrink:0}}>{i+1}</span>
                {item}
              </li>
            ))}
          </ul>
          <button onClick={()=>{setPage("engagements");window.scrollTo(0,0);}} style={{display:"inline-flex",alignItems:"center",gap:8,background:"#2563eb",color:"#fff",fontWeight:600,padding:"16px 32px",borderRadius:12,fontSize:18,border:"none",cursor:"pointer",transition:"background .2s",fontFamily:"inherit"}}>
            Start an Engagement <ChevronRight/>
          </button>
        </div>
        <div className="hero-graphic-col anim-fade stagger-2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <HeroGraphic/>
        </div>
      </div>
    </div>
    <style>{`@media(max-width:680px){.hero-grid{grid-template-columns:1fr!important;} .hero-graphic-col{display:none!important;}}`}</style>
  </section>
);

const Clients = () => (
  <section id="clients" style={{padding:"80px 0",background:"#020617"}}>
    <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px"}}><Reveal><SectionHeading>Clients</SectionHeading></Reveal></div>
    <ClientMarquee/>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
const Footer = () => (
  <footer style={{background:"#020617",borderTop:"1px solid #1e293b",padding:"56px 0"}}>
    <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:40,marginBottom:40}} className="three-col">
        <div>
          <h4 style={{color:"#fff",fontWeight:600,marginBottom:12,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>About</h4>
          <p style={{color:"#94a3b8",fontSize:14,lineHeight:1.6}}>The IT Plan specializes in all aspects of early stage functional and secure IT development, market expansion, and compliance needs.</p>
        </div>
        <div>
          <h4 style={{color:"#fff",fontWeight:600,marginBottom:12,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Resources</h4>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <a href="https://www.udemy.com/course/how-to-transition-from-an-individual-contributor-to-manager/" target="_blank" rel="noreferrer" style={{color:"#94a3b8",fontSize:14,display:"flex",alignItems:"center",gap:4}}><ExternalLinkIcon/> IT Management Course on Udemy</a>
            <a href="https://theitplan.medium.com/" target="_blank" rel="noreferrer" style={{color:"#94a3b8",fontSize:14,display:"flex",alignItems:"center",gap:4}}><ExternalLinkIcon/> IT Articles on Medium</a>
          </div>
        </div>
        <div>
          <h4 style={{color:"#fff",fontWeight:600,marginBottom:12,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Connect</h4>
          <div style={{display:"flex",gap:16,marginBottom:16}}>
            <a href="https://www.instagram.com/theitplan/" target="_blank" rel="noreferrer" style={{color:"#94a3b8"}}><InstagramIcon/></a>
            <a href="https://www.linkedin.com/company/the-it-plan/" target="_blank" rel="noreferrer" style={{color:"#94a3b8"}}><LinkedinIcon/></a>
          </div>
          <a href="mailto:hello@theitplan.com" style={{color:"#94a3b8",fontSize:14,display:"flex",alignItems:"center",gap:8}}><MailIcon size={14}/> hello@theitplan.com</a>
        </div>
      </div>
      <div style={{paddingTop:32,borderTop:"1px solid #1e293b",textAlign:"center"}}>
        <p style={{color:"#334155",fontSize:12}}>&copy; {new Date().getFullYear()} The IT Plan. All rights reserved.</p>
      </div>
    </div>
    <style>{`@media(max-width:768px){.three-col{grid-template-columns:1fr!important;}}`}</style>
  </footer>
);

/* ═══════════════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════════════ */

const HomePage = ({ setPage }) => (
  <div className="anim-fade">
    <Hero setPage={setPage}/>
    <section style={{padding:"80px 0",background:"#020617"}}>
      <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px"}}>
        <Reveal><SectionHeading>Typical Engagement Structures</SectionHeading></Reveal>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}} className="eng-grid">
          {engagementStructures.map((eng,i)=>(
            <Reveal key={eng.title} delay={i*.08}>
              <div style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:16,padding:24,transition:"border-color .3s",cursor:"default"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#475569"} onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}>
                <div style={{width:40,height:40,borderRadius:8,background:"#1e293b",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{eng.icon}</div>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:18,marginBottom:12}}>{eng.title}</h3>
                <CircleList items={eng.items}/>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={.3}>
          <div style={{marginTop:40,textAlign:"center"}}>
            <button onClick={()=>{setPage("services");window.scrollTo(0,0);}} style={{display:"inline-flex",alignItems:"center",gap:8,color:"#60a5fa",fontSize:15,fontWeight:500,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>
              View all services <ChevronRight size={16}/>
            </button>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.eng-grid{grid-template-columns:1fr 1fr!important;}} @media(max-width:480px){.eng-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
    <Clients/>
  </div>
);

const ServicesPage = ({ setPage }) => (
  <div className="anim-fade" style={{minHeight:"100vh"}}>
    <div style={{paddingTop:144,paddingBottom:96,background:"#0f172a"}}>
      <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px"}}>
        <h1 style={{fontSize:48,color:"#fff",marginBottom:16,fontFamily:"var(--font-display)"}}>Services</h1>
        <hr className="section-rule"/>
        <div style={{marginBottom:64}}>
          <Reveal><h3 style={{color:"#fff",fontSize:24,fontWeight:700,marginBottom:24,fontFamily:"var(--font-display)"}}>Engagement Structures</h3></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}} className="eng-grid">
            {engagementStructures.map((eng,i)=>(
              <Reveal key={eng.title} delay={i*.08}>
                <div style={{background:"#020617",border:"1px solid #1e293b",borderRadius:16,padding:24,transition:"border-color .3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#475569"} onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}>
                  <div style={{width:40,height:40,borderRadius:8,background:"#1e293b",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{eng.icon}</div>
                  <h3 style={{color:"#fff",fontWeight:700,fontSize:18,marginBottom:12}}>{eng.title}</h3>
                  <CircleList items={eng.items}/>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div style={{marginBottom:64}}>
          <Reveal><SectionHeading intro="Assessments will provide a clear current state picture and demonstrate how to reach your IT or Security goals.">Readiness &amp; Compliance</SectionHeading></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32}} className="three-col">
            {complianceColumns.map((col,i)=>(
              <Reveal key={col.label} delay={i*.08}><div><h4 style={{color:"#fff",fontWeight:700,marginBottom:12}}>{col.label}</h4><CircleList items={col.items}/></div></Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal><SectionHeading intro="Early stage is all about now-problems. Efficient use of early stage resources is the difference between growth and stagnation.">Projects &amp; Processes</SectionHeading></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32}} className="three-col">
            {processColumns.map((col,i)=>(
              <Reveal key={col.label} delay={i*.08}><div><h4 style={{color:"#fff",fontWeight:700,marginBottom:12}}>{col.label}</h4><CircleList items={col.items}/></div></Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={.2}>
          <div style={{marginTop:64,paddingTop:48,borderTop:"1px solid #1e293b",textAlign:"center"}}>
            <p style={{color:"#94a3b8",fontSize:16,marginBottom:24}}>Ready to get started?</p>
            <button onClick={()=>{setPage("engagements");window.scrollTo(0,0);}} style={{display:"inline-flex",alignItems:"center",gap:8,background:"#2563eb",color:"#fff",fontWeight:600,padding:"14px 28px",borderRadius:10,fontSize:16,border:"none",cursor:"pointer",fontFamily:"inherit"}}>
              Start an Engagement <ChevronRight size={18}/>
            </button>
          </div>
        </Reveal>
      </div>
    </div>
    <style>{`@media(max-width:768px){.eng-grid{grid-template-columns:1fr 1fr!important;} .three-col{grid-template-columns:1fr!important;}} @media(max-width:480px){.eng-grid{grid-template-columns:1fr!important;}}`}</style>
  </div>
);

const AboutPage = () => (
  <div className="anim-fade" style={{minHeight:"100vh"}}>
    <div style={{paddingTop:144,paddingBottom:96,background:"#0f172a"}}>
      <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px"}}>
        <h1 style={{fontSize:48,color:"#fff",marginBottom:16,fontFamily:"var(--font-display)"}}>About</h1>
        <hr className="section-rule"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}} className="about-grid">
          <Reveal>
            <div>
              <div style={{color:"#94a3b8",lineHeight:1.7}}>
                <p style={{marginBottom:20}}>I've been building IT teams, technology, and processes at early stage companies for 15 years. I found that most invest a massive amount of resources into operational functions.</p>
                <p style={{marginBottom:20}}>Yet, almost all companies encounter the same IT challenges. The solutions are out there — no need to start from scratch to solve them! I created The IT Plan as a standardized, repeatable playbook to develop IT programs from scratch.</p>
                <p>My philosophy is that technology is more cultural than it is technical. When you see IT through this lens, better solutions appear.</p>
              </div>
              <div style={{marginTop:32}}>
                <p style={{color:"#fff",fontWeight:700,fontSize:18,marginBottom:4,fontFamily:"var(--font-display)"}}>Dave Bour</p>
                <a href="https://www.linkedin.com/in/davidbour/" target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,color:"#60a5fa",fontSize:14,fontWeight:500}}><LinkedinIcon size={16}/> LinkedIn</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={.15}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {[{val:"15+",label:"Years in Early Stage IT",color:"#60a5fa"},{val:"Zero",label:"Security Breaches",color:"#2dd4bf"},{val:"100%",label:"SOC2 Audit Pass Rate",color:"#fff",span:true}].map((s,i)=>(
                <div key={i} style={{background:"#020617",border:"1px solid #1e293b",borderRadius:16,padding:32,textAlign:"center",gridColumn:s.span?"span 2":"auto"}}>
                  <div style={{fontSize:36,fontWeight:700,color:s.color,marginBottom:8,fontFamily:"var(--font-display)"}}>{s.val}</div>
                  <p style={{color:"#94a3b8",fontSize:14}}>{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div style={{marginTop:80}}>
          <Reveal><SectionHeading>Clients</SectionHeading></Reveal>
        </div>
      </div>
      <ClientMarquee/>
    </div>
    <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
  </div>
);

const CaseStudiesPage = ({ setPage }) => (
  <div className="anim-fade" style={{minHeight:"100vh"}}>
    <div style={{paddingTop:144,paddingBottom:96,background:"#0f172a"}}>
      <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px"}}>
        <h1 style={{fontSize:48,color:"#fff",marginBottom:16,fontFamily:"var(--font-display)"}}>Case Studies</h1>
        <hr className="section-rule"/>
        <p style={{color:"#94a3b8",maxWidth:640,lineHeight:1.7,marginBottom:48}}>Real engagements, real outcomes. Here's how The IT Plan has helped early stage companies build, secure, and scale their IT.</p>
        <div style={{display:"flex",flexDirection:"column",gap:32}}>
          {caseStudies.map((cs,i) => (
            <Reveal key={i} delay={i*.08}>
              <div style={{background:"#020617",border:"1px solid #1e293b",borderRadius:16,padding:32,transition:"border-color .3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#475569"} onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
                  <span style={{fontSize:12,color:"#64748b",fontWeight:600,background:"rgba(51,65,85,.5)",borderRadius:6,padding:"3px 10px"}}>{cs.client}</span>
                  {cs.tags.map(tag => (
                    <span key={tag} style={{fontSize:11,color:"#60a5fa",fontWeight:500,background:"rgba(59,130,246,.1)",borderRadius:6,padding:"3px 8px",border:"1px solid rgba(59,130,246,.15)"}}>{tag}</span>
                  ))}
                </div>
                <h2 style={{fontSize:22,color:"#fff",marginBottom:20,fontFamily:"var(--font-display)",lineHeight:1.3}}>{cs.title}</h2>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}} className="three-col">
                  {[{label:"Challenge",text:cs.challenge,color:"#f59e0b"},{label:"Approach",text:cs.approach,color:"#60a5fa"},{label:"Outcome",text:cs.outcome,color:"#22c55e"}].map(section => (
                    <div key={section.label}>
                      <h4 style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:section.color,marginBottom:8}}>{section.label}</h4>
                      <p style={{color:"#94a3b8",fontSize:14,lineHeight:1.7}}>{section.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={.2}>
          <div style={{marginTop:64,paddingTop:48,borderTop:"1px solid #1e293b",textAlign:"center"}}>
            <p style={{color:"#94a3b8",fontSize:16,marginBottom:24}}>See yourself in one of these scenarios?</p>
            <button onClick={()=>{setPage("engagements");window.scrollTo(0,0);}} style={{display:"inline-flex",alignItems:"center",gap:8,background:"#2563eb",color:"#fff",fontWeight:600,padding:"14px 28px",borderRadius:10,fontSize:16,border:"none",cursor:"pointer",fontFamily:"inherit"}}>
              Start an Engagement <ChevronRight size={18}/>
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
);

const EngagementsPage = () => (
  <div className="anim-fade" style={{minHeight:"100vh"}}>
    <div style={{paddingTop:144,paddingBottom:96,background:"#0f172a"}}>
      <div style={{maxWidth:1152,margin:"0 auto",padding:"0 24px"}}>
        <h1 style={{fontSize:48,color:"#fff",marginBottom:16,fontFamily:"var(--font-display)"}}>Engagements to Bridge the IT Gap</h1>
        <hr className="section-rule"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:40}} className="eng-page-grid">
          {engagementTypes.map((eng,i)=>(
            <Reveal key={i} delay={i*.08}>
              <div style={{background:"rgba(30,41,59,.5)",border:"1px solid #334155",borderRadius:16,padding:32,transition:"border-color .3s",height:"100%"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(59,130,246,.4)"} onMouseLeave={e=>e.currentTarget.style.borderColor="#334155"}>
                <h2 style={{fontSize:24,color:"#fff",marginBottom:16,whiteSpace:"pre-line",lineHeight:1.3,fontFamily:"var(--font-display)"}}>{eng.title}</h2>
                <p style={{color:"#94a3b8",lineHeight:1.7,fontSize:14}}>{eng.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{marginTop:64,paddingTop:48,borderTop:"1px solid #1e293b",display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}} className="eng-page-grid">
          <a href="https://calendly.com/theitplan/30min" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:16,padding:24,background:"rgba(37,99,235,.1)",border:"1px solid rgba(59,130,246,.2)",borderRadius:16,transition:"background .2s",color:"inherit"}}>
            <CalendarIcon/>
            <div>
              <h4 style={{color:"#fff",fontWeight:700,marginBottom:2}}>Schedule Intro Call</h4>
              <p style={{color:"#60a5fa",fontSize:14,display:"flex",alignItems:"center",gap:4}}>Book 30 minutes on Calendly <ExternalLinkIcon/></p>
            </div>
          </a>
          <a href="mailto:dave@theitplan.com" style={{display:"flex",alignItems:"center",gap:16,padding:24,background:"rgba(30,41,59,.6)",border:"1px solid #334155",borderRadius:16,transition:"border-color .2s",color:"inherit"}}>
            <MailIcon size={28}/>
            <div>
              <h4 style={{color:"#fff",fontWeight:700,marginBottom:2}}>Email Directly</h4>
              <p style={{color:"#94a3b8",fontSize:14}}>dave@theitplan.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <style>{`@media(max-width:768px){.eng-page-grid{grid-template-columns:1fr!important;}}`}</style>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const renderPage = () => {
    switch(page) {
      case "services": return <ServicesPage setPage={setPage}/>;
      case "case-studies": return <CaseStudiesPage setPage={setPage}/>;
      case "about": return <AboutPage/>;
      case "engagements": return <EngagementsPage/>;
      default: return <HomePage setPage={setPage}/>;
    }
  };
  return (
    <div style={{minHeight:"100vh",background:"#020617",color:"#e2e8f0",fontFamily:"var(--font-body)"}}>
      <style>{styles}</style>
      <Navigation page={page} setPage={setPage}/>
      <main>{renderPage()}</main>
      <Footer/>
    </div>
  );
}