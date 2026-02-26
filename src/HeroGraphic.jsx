import React from 'react';

const css = `
  @keyframes hg-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes hg-pulse-ring {
    0%   { transform: scale(0.85); opacity: 0.6; }
    70%  { transform: scale(1.15); opacity: 0; }
    100% { transform: scale(0.85); opacity: 0; }
  }
  @keyframes hg-spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes hg-dash {
    to { stroke-dashoffset: -60; }
  }
  @keyframes hg-card-in {
    from { opacity: 0; transform: translateY(12px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes hg-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }
  @keyframes hg-scan {
    0%   { transform: translateY(0%); opacity: 0.7; }
    100% { transform: translateY(220px); opacity: 0; }
  }
  @keyframes hg-tick {
    0%   { stroke-dashoffset: 24; opacity: 0; }
    60%  { opacity: 1; }
    100% { stroke-dashoffset: 0;  opacity: 1; }
  }
  .hg-root {
    width: 100%;
    max-width: 520px;
    height: 480px;
    position: relative;
    user-select: none;
  }
  .hg-float {
    animation: hg-float 5s ease-in-out infinite;
  }
  .hg-card {
    background: rgba(15, 23, 42, 0.92);
    border: 1px solid rgba(59, 130, 246, 0.22);
    border-radius: 14px;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
    animation: hg-card-in 0.6s cubic-bezier(.22,1,.36,1) both;
    overflow: hidden;
    position: absolute;
  }
  .hg-card-glow {
    position: absolute;
    inset: 0;
    border-radius: 14px;
    pointer-events: none;
  }
`;

const CheckRow = ({ label, done, delay }) => (
  <div style={{ display:'flex', alignItems:'center', gap:8, animation:'hg-card-in 0.5s ease both', animationDelay:delay }}>
    <svg width={16} height={16} viewBox="0 0 16 16">
      <circle cx={8} cy={8} r={7} fill={done?'#1d4ed8':'rgba(30,41,59,0.8)'} stroke={done?'#3b82f6':'#334155'} strokeWidth={1.5}/>
      {done && <polyline points="4.5,8 7,10.5 11.5,6" fill="none" stroke="#93c5fd" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={24} style={{animation:`hg-tick 0.4s ease ${delay} both`}}/>}
    </svg>
    <span style={{fontSize:11, color:done?'#cbd5e1':'#475569', lineHeight:1}}>{label}</span>
  </div>
);

const StatusDot = ({ color, label, delay }) => (
  <div style={{display:'flex', alignItems:'center', gap:6}}>
    <div style={{width:7, height:7, borderRadius:'50%', background:color, animation:`hg-blink 2s ease-in-out infinite`, animationDelay:delay}}/>
    <span style={{fontSize:10, color:'#64748b'}}>{label}</span>
  </div>
);

const ScanLine = () => (
  <div style={{position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#3b82f6,transparent)', animation:'hg-scan 2.8s ease-in infinite', animationDelay:'1s', pointerEvents:'none'}}/>
);

const ReadinessCard = () => (
  <div className="hg-card hg-float" style={{width:190, left:0, top:20, padding:'14px 14px 12px', animationDelay:'0s'}}>
    <ScanLine/>
    <div className="hg-card-glow" style={{background:'radial-gradient(ellipse at top left, rgba(59,130,246,0.12) 0%, transparent 70%)'}}/>
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
      <div style={{display:'flex', alignItems:'center', gap:6}}>
        <div style={{width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <svg width={13} height={13} viewBox="0 0 13 13" fill="none">
            <rect x={1} y={1} width={11} height={11} rx={2} stroke="#93c5fd" strokeWidth={1.2}/>
            <polyline points="3.5,6.5 5.5,8.5 9.5,4.5" stroke="#93c5fd" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{fontSize:10, fontWeight:700, color:'#e2e8f0', letterSpacing:'0.05em', textTransform:'uppercase'}}>Readiness</span>
      </div>
      <span style={{fontSize:9, color:'#22c55e', fontWeight:600, background:'rgba(34,197,94,0.1)', borderRadius:4, padding:'2px 6px', border:'1px solid rgba(34,197,94,0.2)'}}>LIVE</span>
    </div>
    <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
      <div style={{position:'relative', width:48, height:48, flexShrink:0}}>
        <svg width={48} height={48} viewBox="0 0 48 48">
          <circle cx={24} cy={24} r={20} fill="none" stroke="rgba(51,65,85,0.6)" strokeWidth={5}/>
          <circle cx={24} cy={24} r={20} fill="none" stroke="#3b82f6" strokeWidth={5}
            strokeDasharray={`${Math.PI*40*0.82} ${Math.PI*40}`}
            strokeDashoffset={Math.PI*40*0.25}
            strokeLinecap="round"
            style={{transform:'rotate(-90deg)', transformOrigin:'50% 50%'}}/>
        </svg>
        <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'#93c5fd'}}>82%</div>
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:11, color:'#94a3b8', marginBottom:4}}>IT Readiness Score</div>
        <div style={{height:4, background:'rgba(51,65,85,0.6)', borderRadius:2, overflow:'hidden'}}>
          <div style={{width:'82%', height:'100%', background:'linear-gradient(90deg,#1d4ed8,#60a5fa)', borderRadius:2}}/>
        </div>
      </div>
    </div>
    <div style={{display:'flex', flexDirection:'column', gap:5}}>
      <CheckRow label="SOC2 Readiness" done delay="0.3s"/>
      <CheckRow label="HIPAA Assessment" done delay="0.5s"/>
      <CheckRow label="Risk Analysis" done delay="0.7s"/>
      <CheckRow label="PCI-DSS Review" done={false} delay="0.9s"/>
    </div>
  </div>
);

const ProjectsCard = () => {
  const tasks = [
    {label:'Call Center Setup', pct:100, color:'#22c55e'},
    {label:'SSO Migration',     pct:73,  color:'#3b82f6'},
    {label:'New Site Build',    pct:45,  color:'#f59e0b'},
    {label:'WiFi Rollout',      pct:20,  color:'#64748b'},
  ];
  return (
    <div className="hg-card hg-float" style={{width:188, right:0, top:60, padding:'14px 14px 12px', animationDelay:'1.2s', animationDuration:'5.5s'}}>
      <div className="hg-card-glow" style={{background:'radial-gradient(ellipse at top right, rgba(16,185,129,0.1) 0%, transparent 70%)'}}/>
      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:12}}>
        <div style={{width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#047857,#10b981)', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <svg width={13} height={13} viewBox="0 0 13 13" fill="none">
            <rect x={1} y={5} width={4} height={7} rx={1} fill="#6ee7b7"/>
            <rect x={5.5} y={3} width={4} height={9} rx={1} fill="#6ee7b7" opacity={0.7}/>
            <rect x={10} y={1} width={2} height={11} rx={1} fill="#6ee7b7" opacity={0.5}/>
          </svg>
        </div>
        <span style={{fontSize:10, fontWeight:700, color:'#e2e8f0', letterSpacing:'0.05em', textTransform:'uppercase'}}>Projects</span>
        <span style={{marginLeft:'auto', fontSize:9, color:'#10b981', fontWeight:600}}>4 Active</span>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        {tasks.map((t,i) => (
          <div key={i} style={{animation:'hg-card-in 0.5s ease both', animationDelay:`${0.2+i*0.12}s`}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:3}}>
              <span style={{fontSize:10, color:'#94a3b8'}}>{t.label}</span>
              <span style={{fontSize:10, color:t.color, fontWeight:600}}>{t.pct}%</span>
            </div>
            <div style={{height:4, background:'rgba(51,65,85,0.7)', borderRadius:2, overflow:'hidden'}}>
              <div style={{width:`${t.pct}%`, height:'100%', background:t.color, borderRadius:2}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:10, display:'flex', gap:6}}>
        <StatusDot color="#22c55e" label="On track" delay="0s"/>
        <StatusDot color="#f59e0b" label="In progress" delay=".4s"/>
      </div>
    </div>
  );
};

const SupportCard = () => (
  <div className="hg-card hg-float" style={{width:210, left:'50%', bottom:10, transform:'translateX(-50%)', padding:'12px 14px', animationDelay:'0.6s', animationDuration:'6s'}}>
    <div className="hg-card-glow" style={{background:'radial-gradient(ellipse at bottom, rgba(139,92,246,0.1) 0%, transparent 70%)'}}/>
    <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:10}}>
      <div style={{width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#5b21b6,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <svg width={13} height={13} viewBox="0 0 13 13" fill="none">
          <circle cx={6.5} cy={6.5} r={5.5} stroke="#c4b5fd" strokeWidth={1.2}/>
          <path d="M4 5.5 C4 4.1 9 4.1 9 6C9 7.5 6.5 7.5 6.5 9" stroke="#c4b5fd" strokeWidth={1.2} strokeLinecap="round" fill="none"/>
          <circle cx={6.5} cy={10.5} r={0.7} fill="#c4b5fd"/>
        </svg>
      </div>
      <span style={{fontSize:10, fontWeight:700, color:'#e2e8f0', letterSpacing:'0.05em', textTransform:'uppercase'}}>Everyday Support</span>
      <span style={{marginLeft:'auto', fontSize:9, fontWeight:600, color:'#a78bfa', background:'rgba(139,92,246,0.12)', borderRadius:4, padding:'2px 6px', border:'1px solid rgba(139,92,246,0.25)'}}>Ongoing</span>
    </div>
    <div style={{display:'flex', flexDirection:'column', gap:5}}>
      {[
        {id:'#104', label:'Device onboarding',     status:'Resolved',  sc:'#22c55e', delay:'0.2s'},
        {id:'#105', label:'SSO access request',    status:'Open',      sc:'#3b82f6', delay:'0.35s'},
        {id:'#106', label:'Vendor renewal review', status:'In review', sc:'#f59e0b', delay:'0.5s'},
      ].map(t => (
        <div key={t.id} style={{display:'flex', alignItems:'center', gap:6, padding:'5px 7px', background:'rgba(30,41,59,0.5)', borderRadius:7, border:'1px solid rgba(51,65,85,0.5)', animation:'hg-card-in 0.5s ease both', animationDelay:t.delay}}>
          <span style={{fontSize:9, color:'#475569', flexShrink:0}}>{t.id}</span>
          <span style={{fontSize:10, color:'#94a3b8', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{t.label}</span>
          <span style={{fontSize:9, fontWeight:600, color:t.sc, flexShrink:0, background:`${t.sc}18`, borderRadius:4, padding:'1px 5px'}}>{t.status}</span>
        </div>
      ))}
    </div>
    <div style={{marginTop:8, display:'flex', alignItems:'center', gap:6}}>
      <svg width={80} height={22} viewBox="0 0 80 22">
        <defs>
          <linearGradient id="hg-sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polyline points="0,18 13,14 26,16 39,8 52,12 65,5 78,3" fill="none" stroke="#8b5cf6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="0,18 13,14 26,16 39,8 52,12 65,5 78,3 78,22 0,22" fill="url(#hg-sg)" stroke="none" opacity={0.3}/>
      </svg>
      <span style={{fontSize:9, color:'#64748b'}}>Ticket velocity ↑ 18%</span>
    </div>
  </div>
);

const OrbitRing = ({ r, duration, reverse, dotColor }) => (
  <svg
    width={r*2+20} height={r*2+20}
    style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:`hg-spin-slow ${duration}s linear infinite${reverse?' reverse':''}`, pointerEvents:'none'}}
    viewBox={`0 0 ${r*2+20} ${r*2+20}`}
  >
    <circle cx={r+10} cy={r+10} r={r} fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" strokeDasharray="4 8"/>
    <circle cx={r+10} cy={10} r={4} fill={dotColor||'#3b82f6'} opacity={0.8}/>
  </svg>
);

const CentralHub = () => (
  <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:64, height:64, zIndex:10}}>
    {[0, 0.8, 1.6].map((delay, i) => (
      <div key={i} style={{position:'absolute', inset:-8, borderRadius:'50%', border:'1.5px solid rgba(59,130,246,0.35)', animation:'hg-pulse-ring 3s ease-out infinite', animationDelay:`${delay}s`}}/>
    ))}
    <div style={{width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', border:'2px solid rgba(96,165,250,0.5)', boxShadow:'0 0 32px rgba(59,130,246,0.35)', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
        <rect x={4} y={7} width={8} height={14} rx={2} stroke="#93c5fd" strokeWidth={1.5}/>
        <rect x={8} y={7} width={2} height={3} fill="#93c5fd"/>
        <rect x={8} y={18} width={2} height={3} fill="#93c5fd"/>
        <path d="M17 9 L17 19 M14 9 L20 9 M14 19 L20 19" stroke="#93c5fd" strokeWidth={1.5} strokeLinecap="round"/>
      </svg>
    </div>
  </div>
);

const Connectors = () => (
  <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}} viewBox="0 0 520 480" preserveAspectRatio="none">
    <defs>
      <linearGradient id="hg-lg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08"/>
      </linearGradient>
      <linearGradient id="hg-lg2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#10b981" stopOpacity="0.08"/>
      </linearGradient>
      <linearGradient id="hg-lg3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.08"/>
      </linearGradient>
    </defs>
    <line x1="190" y1="110" x2="258" y2="238" stroke="url(#hg-lg1)" strokeWidth="1.5" strokeDasharray="6 5" style={{animation:'hg-dash 2s linear infinite'}}/>
    <line x1="330" y1="185" x2="262" y2="242" stroke="url(#hg-lg2)" strokeWidth="1.5" strokeDasharray="6 5" style={{animation:'hg-dash 2s linear infinite', animationDelay:'0.6s'}}/>
    <line x1="260" y1="390" x2="260" y2="272" stroke="url(#hg-lg3)" strokeWidth="1.5" strokeDasharray="6 5" style={{animation:'hg-dash 2s linear infinite', animationDelay:'1.2s'}}/>
    <circle cx="190" cy="110" r="3" fill="#3b82f6" opacity="0.8" style={{animation:'hg-blink 2s ease-in-out infinite'}}/>
    <circle cx="330" cy="185" r="3" fill="#10b981" opacity="0.8" style={{animation:'hg-blink 2s ease-in-out infinite', animationDelay:'0.6s'}}/>
    <circle cx="260" cy="390" r="3" fill="#8b5cf6" opacity="0.8" style={{animation:'hg-blink 2s ease-in-out infinite', animationDelay:'1.2s'}}/>
  </svg>
);

export default function HeroGraphic() {
  return (
    <>
      <style>{css}</style>
      <div className="hg-root" aria-hidden="true">
        {/* Background glow blobs */}
        <div style={{position:'absolute', width:200, height:200, borderRadius:'50%', top:'10%', left:'20%', background:'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents:'none'}}/>
        <div style={{position:'absolute', width:160, height:160, borderRadius:'50%', bottom:'15%', right:'25%', background:'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents:'none'}}/>
        {/* Orbit rings */}
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:1}}>
          <OrbitRing r={110} duration={18} dotColor="#3b82f6"/>
          <OrbitRing r={150} duration={28} reverse dotColor="#10b981"/>
        </div>
        <Connectors/>
        <CentralHub/>
        <ReadinessCard/>
        <ProjectsCard/>
        <SupportCard/>
      </div>
    </>
  );
}
