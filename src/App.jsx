import React, { useState, useEffect } from 'react';
import {
  Rocket,
  ShieldCheck,
  Zap,
  ChevronRight,
  Menu,
  X,
  Cpu,
  Lock,
  Cloud,
  Users,
  Mail,
  Calendar,
  Building2,
  ExternalLink,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

/**
 * THE IT PLAN - Main Application Component
 * Architecture: Single-file React with Tailwind CSS
 * Navigation: State-based view switcher
 */

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on tab change
  const navigateTo = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- UI Components ---

  const Navigation = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="bg-blue-600 p-2 rounded-lg mr-2 group-hover:bg-blue-500 transition-colors">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              THE <span className="text-blue-500">IT</span> PLAN
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['home', 'services', 'about', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => navigateTo(tab)}
                className={`capitalize transition-colors hover:text-blue-400 font-medium ${activeTab === tab ? 'text-blue-500' : 'text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={() => navigateTo('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['home', 'services', 'about', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => navigateTo(tab)}
                className="block w-full text-left px-3 py-4 text-base font-medium text-slate-300 hover:text-blue-500 hover:bg-slate-800 rounded-md capitalize"
              >
                {tab}
              </button>
            ))}
            <div className="pt-4">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-bold"
              >
                Book 30min Intro
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Cpu className="text-blue-500 w-6 h-6 mr-2" />
              <span className="text-xl font-bold text-white uppercase tracking-wider">The IT Plan</span>
            </div>
            <p className="max-w-sm mb-6">
              Strategic IT infrastructure and tech leadership for the next generation of industry leaders. We help startups scale without technical debt.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-400" />
              <Github className="w-5 h-5 cursor-pointer hover:text-blue-400" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Contact</button></li>
              <li><a href="https://calendly.com/theitplan/30min" target="_blank" className="hover:text-white transition-colors">Book a Call</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center"><Mail size={16} className="mr-2" /> hello@theitplan.com</li>
              <li className="flex items-center"><Building2 size={16} className="mr-2" /> Remote-First Strategy</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-900 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} The IT Plan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // --- Page Views ---

  const HomeView = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-400 uppercase bg-blue-400/10 rounded-full">
              For Startups & Early-Stage Teams
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Scale Your Startup with the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Right Tech Foundation</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10">
              Technical debt kills startups. We provide the IT strategy, security, and infrastructure needed to grow from Seed to Series A and beyond.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigateTo('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center"
              >
                Book a Consultation <ChevronRight size={20} className="ml-2" />
              </button>
              <button
                onClick={() => navigateTo('services')}
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-slate-700"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Unmatched Scalability</h3>
              <p className="text-slate-400">
                We design systems that grow with you. No more "re-doing everything" when you hire your 50th employee.
              </p>
            </div>
            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-teal-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-teal-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Day-Zero Security</h3>
              <p className="text-slate-400">
                Don't wait for a breach. We implement SOC2-ready security controls and device management from the start.
              </p>
            </div>
            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-purple-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Operational Efficiency</h3>
              <p className="text-slate-400">
                Automate onboarding, streamline SaaS management, and let your founders focus on product, not IT tickets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 italic font-serif">
            "The IT Plan allowed us to scale our team from 5 to 50 in six months without a single tech bottleneck. They are our secret weapon."
          </h2>
          <p className="text-blue-100 font-bold uppercase tracking-widest text-sm">— CEO, Stealth AI Startup</p>
        </div>
      </section>
    </div>
  );

  const ServicesView = () => (
    <div className="pt-32 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Startup IT Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Modular IT solutions designed to fit the budget and agility of early-stage companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Fractional CTO / Tech Leadership",
              icon: <Users className="w-8 h-8 text-blue-500" />,
              desc: "Strategic technical guidance without the $250k/year price tag. We help with vendor selection, security audits, and architectural planning."
            },
            {
              title: "Cloud Infrastructure & DevOps",
              icon: <Cloud className="w-8 h-8 text-teal-500" />,
              desc: "Cost-optimized AWS/Azure/GCP setup. We implement Infrastructure as Code (Terraform) and CI/CD pipelines that work for small teams."
            },
            {
              title: "Cybersecurity & Compliance",
              icon: <Lock className="w-8 h-8 text-red-500" />,
              desc: "Preparing for SOC2 or HIPAA? We implement the technical controls, MDM policies, and encryption standards required for enterprise deals."
            },
            {
              title: "Device Management & Onboarding",
              icon: <Cpu className="w-8 h-8 text-purple-500" />,
              desc: "Zero-touch deployment for Mac and PC. Ship a laptop to a new hire and have it automatically configured with all company apps and security."
            }
          ].map((service, idx) => (
            <div key={idx} className="p-10 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-start hover:bg-slate-800/50 transition-all">
              <div className="mb-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">{service.desc}</p>
              <button
                onClick={() => navigateTo('contact')}
                className="mt-auto text-blue-400 font-semibold flex items-center hover:text-blue-300 transition-colors"
              >
                Learn More <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AboutView = () => (
    <div className="pt-32 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Helping Startups Scale Securely</h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                Our mission is simple: To eliminate technical debt before it becomes a liability. We founded <span className="text-white font-semibold italic">The IT Plan</span> after seeing too many brilliant startups struggle because their initial tech infrastructure couldn't support their growth.
              </p>
              <p>
                We understand the startup culture. You need to move fast, but you also need to build trust with your first big enterprise customers. We bridge that gap by implementing "Enterprise Lite" IT—the security and reliability of a big corporation with the speed of a startup.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">10+</div>
              <p className="text-white font-medium">Startups Scaled</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
              <div className="text-4xl font-bold text-teal-500 mb-2">Zero</div>
              <p className="text-white font-medium">Security Breaches</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center col-span-2">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <p className="text-slate-400">SOC2 Audit Pass Rate</p>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Startup-Agile</h4>
              <p className="text-slate-400">We don't do red tape. We deploy solutions in days, not months.</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Scalable Tech</h4>
              <p className="text-slate-400">Every tool we recommend is chosen for its ability to handle 10x growth.</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">No Locked-In Fees</h4>
              <p className="text-slate-400">Flexible engagements that adapt to your funding stage and team size.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactView = () => {
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormStatus('Sending...');
      setTimeout(() => setFormStatus('Message sent! We will be in touch shortly.'), 1500);
    };

    return (
      <div className="pt-32 pb-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Let's Build Your Plan</h2>
              <p className="text-slate-400 text-lg mb-10">
                Ready to professionalize your IT? Book a direct session or send us a message to start the conversation.
              </p>

              <div className="space-y-6 mb-12">
                <a
                  href="https://calendly.com/theitplan/30min"
                  target="_blank"
                  className="flex items-center p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl hover:bg-blue-600/20 transition-all group"
                >
                  <Calendar className="text-blue-500 mr-4 group-hover:scale-110 transition-transform" size={32} />
                  <div>
                    <h4 className="text-white font-bold text-lg">Schedule Intro Call</h4>
                    <p className="text-blue-400 flex items-center">Book 30 minutes on Calendly <ExternalLink size={14} className="ml-1" /></p>
                  </div>
                </a>

                <div className="flex items-center p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                  <Mail className="text-slate-400 mr-4" size={32} />
                  <div>
                    <h4 className="text-white font-bold text-lg">Email Us</h4>
                    <p className="text-slate-400">hello@theitplan.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-6">Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="jane@startup.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Message</label>
                  <textarea
                    rows="4"
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Tell us about your team and IT challenges..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all"
                >
                  Send Message
                </button>
                {formStatus && (
                  <p className="text-center text-teal-400 font-medium mt-4 animate-bounce">{formStatus}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      <Navigation />

      <main>
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
