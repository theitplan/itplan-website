import React, { useState, useEffect } from 'react';
import HeroGraphic from './HeroGraphic.jsx';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  ClipboardCheck,
  TrendingUp,
  Settings,
  Briefcase,
  ChevronRight,
  Menu,
  X,
  Mail,
  Calendar,
  ExternalLink,
  Instagram,
  Linkedin,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */

const engagementStructures = [
  {
    icon: <ClipboardCheck className="w-6 h-6 text-blue-400" />,
    title: 'Assessments',
    items: [
      'Pre-Launch IT Checklist',
      'Risk & Vulnerability Analysis',
      'Compliance Readiness',
      'HIPAA, PCI-DSS, SOC2',
    ],
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-teal-400" />,
    title: 'Function Development',
    items: [
      'Role Planning & Hiring',
      'Mentorship & Guidance',
      'Training & Documentation',
      'Roadmap & Leadership',
    ],
  },
  {
    icon: <Settings className="w-6 h-6 text-violet-400" />,
    title: 'Implementations',
    items: [
      'Solution Identification',
      'Configuration & Management',
      'WiFi & Networks',
      'Continuous Improvement',
    ],
  },
  {
    icon: <Briefcase className="w-6 h-6 text-amber-400" />,
    title: 'Projects',
    items: [
      'Call Center Development',
      'New Site Construction',
      'Migrations & Mergers',
      'Interdepartmental Needs',
    ],
  },
];

const complianceColumns = [
  {
    label: 'Checklists',
    items: ['Pre-Launch', 'New Markets', 'Policies', 'Trainings', 'SaaS Configuration'],
  },
  {
    label: 'Assessments',
    items: ['Vulnerability Assessment', 'IT Risk Assessment', 'HIPAA Compliance', 'PCI-DSS, SOC2', 'NIST, ISO 27001'],
  },
  {
    label: 'Materials',
    items: ['Risk & Remediation Tracker', 'Policy Template', 'Data Flow Diagrams', 'Cybersecurity Insurance Guidance', 'Training Decks'],
  },
];

const processColumns = [
  {
    label: 'IT Services',
    items: ['Automated Device Management', 'Identity & Single-Sign On', 'Ticketing & Issue Management', 'Data Sharing & Loss Prevention', 'Staff Training'],
  },
  {
    label: 'Org Wide',
    items: ['Call Center & Telephony', 'New Site Construction', 'Cameras, Alarms, & Suite Access', 'WiFi and Networking', 'Conference Rooms & AV'],
  },
  {
    label: 'Governance',
    items: ['IT Leadership & Representation', 'Strategic Guidance & Roadmaps', 'Fiscal Responsibility & Budgeting', 'Vendor Relationship Management'],
  },
];

// Confirmed client logos — all verified as real image files
const clients = [
  { src: '/logos/marley-medical.png',  alt: 'Marley Medical' },
  { src: '/logos/mealpal.webp',        alt: 'MealPal' },
  { src: '/logos/better.webp',         alt: 'Better.com' },
  { src: '/logos/harvard-crimson.png', alt: 'The Harvard Crimson' },
  { src: '/logos/mashable.png',        alt: 'Mashable' },
  { src: '/logos/y7-studio.webp',      alt: 'Y7 Studio' },
  { src: '/logos/boost-insurance.webp',alt: 'Boost Insurance' },
  { src: '/logos/grovo.png',           alt: 'Grovo' },
  { src: '/logos/blissfully.png',      alt: 'Blissfully' },
  { src: '/logos/vivorcare.png',       alt: 'Vivorcare' },
  { src: '/logos/ject.webp',           alt: 'JECT' },
  { src: '/logos/workheights.webp',    alt: 'WorkHeights' },
  { src: '/logos/pi-pr.png',           alt: 'PI & PR' },
  { src: '/logos/logo-a.webp',         alt: 'Client' },
  { src: '/logos/logo-b.png',          alt: 'Client' },
  { src: '/logos/logo-c.png',          alt: 'Client' },
  { src: '/logos/logo-d.png',          alt: 'Client' },
  { src: '/logos/logo-e.png',          alt: 'Client' },
  { src: '/logos/logo-f.png',          alt: 'Client' },
  { src: '/logos/logo-g.webp',         alt: 'Client' },
  { src: '/logos/logo-h.png',          alt: 'Client' },
];

// Deliverable thumbnails — document samples first, then process diagrams
// #diagrams anchor placed before SS-NewHireFlowDiagram (index 4)
const deliverables = [
  { src: '/deliverables/SS-Assessment1.png',        alt: 'Assessment Sample — Page 1',        isDiagramStart: false },
  { src: '/deliverables/SS-Assessment2.png',        alt: 'Assessment Sample — Page 2',        isDiagramStart: false },
  { src: '/deliverables/SS-VendorPolicy.png',       alt: 'Vendor Policy Document',            isDiagramStart: false },
  { src: '/deliverables/SS-SecTrain.png',           alt: 'Security Training Deck',            isDiagramStart: false },
  { src: '/deliverables/SS-NewHireFlowDiagram.png', alt: 'New Hire Flow Diagram',             isDiagramStart: true  },
  { src: '/deliverables/SS-HLO.png',                alt: 'High Level Overview',               isDiagramStart: false },
  { src: '/deliverables/SS-CallFlowDiagram.png',    alt: 'Call Flow Diagram',                 isDiagramStart: false },
  { src: '/deliverables/SS-CallProcessDiagram.png', alt: 'Call Process Diagram',              isDiagramStart: false },
  { src: '/deliverables/SS-CallPlatformCost.png',   alt: 'Call Platform Cost Comparison',     isDiagramStart: false },
];

/* ═══════════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════════ */

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-md py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group flex flex-col leading-none">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-0.5">The</span>
            <span
              className="text-2xl font-bold text-white tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              IT Plan
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#engagements" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Services</a>
            <a href="/#about" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">About</a>
            <a href="/#clients" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Clients</a>
            <Link
              to="/engagements"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2.5 rounded-lg font-semibold transition-all"
            >
              Start an Engagement
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-slide-down">
          <div className="px-4 py-4 flex flex-col gap-1">
            <a href="/#engagements" onClick={() => setIsMenuOpen(false)} className="block py-3 px-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">Services</a>
            <a href="/#about"       onClick={() => setIsMenuOpen(false)} className="block py-3 px-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">About</a>
            <a href="/#clients"     onClick={() => setIsMenuOpen(false)} className="block py-3 px-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">Clients</a>
            <div className="pt-2">
              <Link
                to="/engagements"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-blue-600 text-white py-3 px-5 rounded-lg font-semibold"
              >
                Start an Engagement
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-800 py-14">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* About */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">About</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            The IT Plan specializes in all aspects of early stage IT development and information security compliance.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.udemy.com/course/how-to-transition-from-an-individual-contributor-to-manager/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-start gap-1"
              >
                <ExternalLink size={13} className="mt-0.5 flex-shrink-0" />
                IT Management Course on Udemy Business
              </a>
            </li>
            <li>
              <a
                href="https://theitplan.medium.com/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-start gap-1"
              >
                <ExternalLink size={13} className="mt-0.5 flex-shrink-0" />
                IT Articles on Medium
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">Connect</h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/theitplan/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/the-it-plan/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <div className="mt-4">
            <a
              href="mailto:dave@theitplan.com"
              className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2"
            >
              <Mail size={14} />
              dave@theitplan.com
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-800 text-center">
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} The IT Plan. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION COMPONENTS
═══════════════════════════════════════════════════════════════ */

const SectionHeading = ({ children, intro }) => (
  <div className="mb-2">
    <h2
      className="text-3xl md:text-4xl text-white mb-1"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h2>
    <hr className="section-rule" />
    {intro && <p className="text-slate-400 max-w-2xl leading-relaxed mb-8">{intro}</p>}
  </div>
);

/* ── Hero ────────────────────────────────────────────────────── */
const Hero = () => (
  <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 bg-slate-900 overflow-hidden">
    {/* Subtle grid texture */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgb(148 163 184) 1px, transparent 1px),
                          linear-gradient(90deg, rgb(148 163 184) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: copy */}
        <div className="animate-fade-in">
          <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            All-In-One IT Development for Early Stage
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            IT-in-a-Box<br />
            <span className="text-blue-400">for Early Stage</span>
          </h1>
          <p className="text-slate-400 text-lg mb-4">
            Fractional to One-Time Engagements for Pre-Seed to Series&nbsp;C
          </p>
          <ul className="space-y-2 mb-10">
            {[
              'Stage Appropriate Solutions',
              'Security, Risk, & Compliance Assessments',
              'Readiness Checklists & Guidance',
              'New Office Builds & Hands-On Implementation',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/engagements"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
          >
            Start an Engagement <ChevronRight size={20} />
          </Link>
        </div>

        {/* Right: animated graphic */}
        <div className="hidden lg:flex justify-center items-center animate-fade-in stagger-2">
          <HeroGraphic />
        </div>

      </div>
    </div>
  </section>
);

/* ── Engagement Structures ───────────────────────────────────── */
const EngagementStructures = () => (
  <section id="engagements" className="py-20 bg-slate-950">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading>Typical Engagement Structures</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {engagementStructures.map((eng, idx) => (
          <div
            key={eng.title}
            className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all animate-fade-in stagger-${idx + 1}`}
          >
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
              {eng.icon}
            </div>
            <h3 className="text-white font-bold text-lg mb-3">{eng.title}</h3>
            <ul className="circle-list">
              {eng.items.map((item) => (
                <li key={item} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Readiness & Compliance ─────────────────────────────────── */
const ReadinessCompliance = () => (
  <section id="compliance" className="py-20 bg-slate-900">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading intro="Assessments will provide a clear current state picture and demonstrate how to reach your IT or Security goals.">
        Readiness &amp; Compliance
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {complianceColumns.map((col) => (
          <div key={col.label}>
            <h4 className="text-white font-bold mb-3">{col.label}</h4>
            <ul className="circle-list">
              {col.items.map((item) => (
                <li key={item} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <a
          href="#samples"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
        >
          Sample Deliverables <ChevronRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

/* ── Projects & Processes ───────────────────────────────────── */
const ProjectsProcesses = () => (
  <section id="processes" className="py-20 bg-slate-950">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading intro="Early stage is all about now-problems. Efficient use of early stage resources is the difference between growth and stagnation.">
        Projects &amp; Processes
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {processColumns.map((col) => (
          <div key={col.label}>
            <h4 className="text-white font-bold mb-3">{col.label}</h4>
            <ul className="circle-list">
              {col.items.map((item) => (
                <li key={item} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <a
          href="#diagrams"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
        >
          Sample Diagrams <ChevronRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

/* ── About ──────────────────────────────────────────────────── */
const About = () => (
  <section id="about" className="py-20 bg-slate-900">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <SectionHeading>About Me</SectionHeading>
          <div className="space-y-5 text-slate-400 leading-relaxed">
            <p>
              I've been building IT teams, technology, and processes at early stage companies for 15 years.
              I found that most invest a massive amount of resources into operational functions.
            </p>
            <p>
              Yet, almost all companies encounter the same IT challenges. The solutions are out there — no need
              to start from scratch to solve them! I created The IT Plan as a standardized, repeatable playbook
              to develop IT programs from scratch.
            </p>
            <p>
              My philosophy is that technology is more cultural than it is technical. When you see IT through
              this lens, better solutions appear.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Dave Bour
            </p>
            <a
              href="https://www.linkedin.com/in/davidbour/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Stats / highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2" style={{ fontFamily: 'var(--font-display)' }}>15+</div>
            <p className="text-slate-400 text-sm">Years in Early Stage IT</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-teal-400 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Zero</div>
            <p className="text-slate-400 text-sm">Security Breaches</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center col-span-2">
            <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>100%</div>
            <p className="text-slate-400 text-sm">SOC2 Audit Pass Rate</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Industry Clients (logo grid) ───────────────────────────── */
const IndustryClients = () => {
  const doubled = [...clients, ...clients];
  return (
    <section id="clients" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Industry Clients</SectionHeading>
      </div>
      {/* Full-width marquee */}
      <div className="marquee-wrapper" aria-label="Client logo scroll">
        <div className="marquee-track">
          {doubled.map((client, i) => (
            <div key={i} className="logo-cell">
              <img src={client.src} alt={client.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Sample Deliverables Gallery ────────────────────────────── */
const DeliverablesGallery = () => {
  const doubled = [...deliverables, ...deliverables];
  return (
    <section
      id="samples"
      className="py-16 bg-slate-900 overflow-hidden"
      aria-label="Sample work deliverables gallery"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SectionHeading>Sample Work</SectionHeading>
        <p className="text-slate-500 text-sm -mt-4">
          Hover to pause. Deliverables include assessments, policy templates, and process diagrams.
        </p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track gap-4">
          {doubled.map((thumb, i) => {
            // Place #diagrams anchor before the first diagram (index matching isDiagramStart in doubled array)
            const isFirstDiagramAnchor = thumb.isDiagramStart && i === deliverables.findIndex(d => d.isDiagramStart);
            return (
              <div key={i} className="relative flex-shrink-0 mx-2" style={{ width: '220px' }}>
                {isFirstDiagramAnchor && <span id="diagrams" className="absolute -top-24" />}
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  className="w-full rounded-xl border border-slate-800 shadow-lg hover:border-blue-500/40 transition-all"
                  style={{ height: '160px', objectFit: 'cover', objectPosition: 'top' }}
                />
                <p className="text-slate-600 text-xs mt-2 text-center truncate">{thumb.alt}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════════════ */

const HomePage = () => (
  <div className="animate-fade-in">
    <Hero />
    <EngagementStructures />
    <ReadinessCompliance />
    <ProjectsProcesses />
    <About />
    <IndustryClients />
    <DeliverablesGallery />
  </div>
);

const EngagementsPage = () => (
  <div className="min-h-screen animate-fade-in">
    <div className="pt-36 pb-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-4xl md:text-5xl text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Engagements to Bridge the IT Gap
        </h1>
        <hr className="section-rule" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {[
            {
              title: 'Fractional IT\nLeadership & Support',
              desc: 'Ongoing IT leadership and technical guidance without the full-time cost. I act as your IT director — attending leadership meetings, setting roadmaps, and managing vendors.',
            },
            {
              title: 'Projects & Initiatives\nto Erase IT Debt',
              desc: 'Targeted engagements to resolve specific IT gaps: building out a call center, standing up a new office, migrating infrastructure, or addressing compliance gaps.',
            },
            {
              title: 'Assessments to Create\nYour IT Roadmap',
              desc: 'A full picture of your current IT posture with a prioritized remediation roadmap. Covers risk, vulnerability, HIPAA, PCI-DSS, SOC2, NIST, and ISO 27001.',
            },
            {
              title: 'Consultations to\nEnable Your Team',
              desc: 'One-time or recurring advisory sessions. Perfect for teams who have IT staff but need senior guidance on architecture decisions, vendor selection, or audit prep.',
            },
          ].map((eng, i) => (
            <div
              key={i}
              className={`bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/40 transition-all animate-fade-in stagger-${i + 1}`}
            >
              <h2
                className="text-2xl text-white mb-4 whitespace-pre-line leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {eng.title}
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm">{eng.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact options */}
        <div className="mt-16 pt-12 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="https://calendly.com/theitplan/30min"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl hover:bg-blue-600/20 transition-all group"
          >
            <Calendar className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
            <div>
              <h4 className="text-white font-bold mb-0.5">Schedule Intro Call</h4>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                Book 30 minutes on Calendly <ExternalLink size={12} />
              </p>
            </div>
          </a>
          <a
            href="mailto:dave@theitplan.com"
            className="flex items-center gap-4 p-6 bg-slate-800/60 border border-slate-700 rounded-2xl hover:border-slate-500 transition-all group"
          >
            <Mail className="text-slate-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
            <div>
              <h4 className="text-white font-bold mb-0.5">Email Directly</h4>
              <p className="text-slate-400 text-sm">dave@theitplan.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */

const App = () => (
  <div className="min-h-screen bg-slate-950 text-slate-200">
    <Navigation />
    <main>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/engagements" element={<EngagementsPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
