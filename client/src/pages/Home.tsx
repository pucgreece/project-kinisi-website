import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

// Asset URLs
const TEAM_PHOTO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663565701015/DsQ7NmS2NqikzXXtSGd5v4/team-photo_783b73dd.jpg';
const METEORA_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663565701015/DsQ7NmS2NqikzXXtSGd5v4/meteora-landscape-55NpXc4JeS8UAi2kB5KA8R.webp';
const CAMP_SITE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663565701015/DsQ7NmS2NqikzXXtSGd5v4/camp-site-photo-oW3KueikbF99GnbKfiCJCS.webp';

// Team members data
const TEAM_MEMBERS = [
  { name: 'Saad Ijazi', role: 'Project Manager', details: '3rd Year, Mechanical Engineering' },
  { name: 'Isabelle Ramirez', role: 'Assistant Project Manager', details: '3rd Year, Social Work' },
  { name: 'Eden Gezehagn', role: 'Finance Manager', details: '4th Year, Mechanical Engineering' },
  { name: 'Iliana Beck', role: 'Health & Environmental Safety Manager', details: '2nd Year, Environmental Engineering' },
  { name: 'Stephanie Guevara', role: 'Communication & Cultural Awareness Manager', details: '2nd Year, Social Work' },
  { name: 'Sara Anees', role: 'Logistics Manager', details: '3rd Year, Mechanical Engineering' },
  { name: 'Mario Hernandez', role: 'CAD Manager', details: '2nd Year, Mechanical Engineering' },
  { name: 'Eesha Bilal', role: 'Technical Procurement Manager', details: '4th Year, Mechanical Engineering' },
];

// Timeline events
const TIMELINE_EVENTS = [
  { date: 'Spring 2026 (Now)', icon: '✅', title: 'Design Finalized', description: 'Contractor engaged, community engagement underway' },
  { date: 'May 11, 2026', icon: '🛫', title: 'Team Departs', description: 'Houston/Dallas → Istanbul → Thessaloniki' },
  { date: 'May 12–15', icon: '📍', title: 'Arrival & Orientation', description: 'Meet stakeholders, explore Drama' },
  { date: 'May 18–26', icon: '🔨', title: 'Active Construction', description: '~10 days on site at Camp Drama' },
  { date: 'May 26', icon: '🎉', title: 'Ribbon Cutting', description: 'Inauguration ceremony with residents' },
  { date: 'May 27–29', icon: '🎓', title: 'Cultural Celebration', description: 'YMCA training, farewell events' },
  { date: 'June 1', icon: '✈️', title: 'Team Returns', description: 'Homeward bound' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fundingProgress, setFundingProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    helpType: 'Donate',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('equipment');

  // Animate funding progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const progressSection = document.getElementById('fundraising');
      if (progressSection) {
        const rect = progressSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && fundingProgress === 0) {
          // Animate to 76%
          let current = 0;
          const interval = setInterval(() => {
            current += 1;
            if (current <= 76) {
              setFundingProgress(current);
            } else {
              clearInterval(interval);
            }
          }, 15);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fundingProgress]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ firstName: '', lastName: '', email: '', helpType: 'Donate', message: '' });
      setFormSubmitted(false);
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#1C2B5E] rounded-full flex items-center justify-center text-white font-bold text-sm">
              PK
            </div>
            <span className="font-playfair text-lg font-bold text-[#1C2B5E] hidden sm:inline">Project Kinisi</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('mission')} className="text-[#6B6560] hover:text-[#1C2B5E] transition">Mission</button>
            <button onClick={() => scrollToSection('camp')} className="text-[#6B6560] hover:text-[#1C2B5E] transition">The Camp</button>
            <button onClick={() => scrollToSection('design')} className="text-[#6B6560] hover:text-[#1C2B5E] transition">Our Design</button>
            <button onClick={() => scrollToSection('team')} className="text-[#6B6560] hover:text-[#1C2B5E] transition">Meet the Team</button>
            <button onClick={() => scrollToSection('impact')} className="text-[#6B6560] hover:text-[#1C2B5E] transition">Impact</button>
            <button onClick={() => scrollToSection('support')} className="text-[#6B6560] hover:text-[#1C2B5E] transition">Support Us</button>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('fundraising')}
            className="hidden md:flex items-center space-x-2 bg-[#C8922A] text-white px-6 py-2 rounded-lg hover:bg-[#B07A1F] transition font-medium"
          >
            <span>Support Project Kinisi</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1C2B5E]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E8E3DC] p-4 space-y-3">
            <button onClick={() => scrollToSection('mission')} className="block w-full text-left text-[#6B6560] hover:text-[#1C2B5E] py-2">Mission</button>
            <button onClick={() => scrollToSection('camp')} className="block w-full text-left text-[#6B6560] hover:text-[#1C2B5E] py-2">The Camp</button>
            <button onClick={() => scrollToSection('design')} className="block w-full text-left text-[#6B6560] hover:text-[#1C2B5E] py-2">Our Design</button>
            <button onClick={() => scrollToSection('team')} className="block w-full text-left text-[#6B6560] hover:text-[#1C2B5E] py-2">Meet the Team</button>
            <button onClick={() => scrollToSection('impact')} className="block w-full text-left text-[#6B6560] hover:text-[#1C2B5E] py-2">Impact</button>
            <button onClick={() => scrollToSection('support')} className="block w-full text-left text-[#6B6560] hover:text-[#1C2B5E] py-2">Support Us</button>
            <button
              onClick={() => scrollToSection('fundraising')}
              className="w-full bg-[#C8922A] text-white px-4 py-2 rounded-lg hover:bg-[#B07A1F] transition font-medium mt-4"
            >
              Support Project Kinisi →
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEAM_PHOTO})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="text-sm md:text-base font-medium mb-4 opacity-90">PUC Greece × UT Austin — Project Kinisi</div>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
            Movement Restores Everything
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
            We're building an outdoor recreation space for 445 displaced individuals at Camp Drama, Greece — because movement is healing, and everyone deserves a place to belong.
          </p>
          <button
            onClick={() => scrollToSection('fundraising')}
            className="inline-flex items-center space-x-2 bg-[#C8922A] text-white px-8 py-4 rounded-lg hover:bg-[#B07A1F] transition font-bold text-lg mb-8"
          >
            <span>Support Project Kinisi</span>
            <ArrowRight size={20} />
          </button>
          <div className="text-sm opacity-85">
            🏛️ A collaboration between Cockrell School of Engineering & Steve Hicks School of Social Work
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown size={32} className="text-white" />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1C2B5E] mb-4 text-center">Why Movement Matters</h2>
          <div className="h-1 w-20 bg-[#C8922A] mx-auto mb-16" />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-[#FAF7F2] p-8 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1 duration-200">
              <div className="text-5xl mb-4">🏃</div>
              <h3 className="text-2xl font-playfair font-bold text-[#1C2B5E] mb-4">A Space to Move</h3>
              <p className="text-[#6B6560] leading-relaxed">
                Camp Drama residents face restricted movement and limited recreation. We're installing certified calisthenics equipment, a volleyball court, and a football field — space to exercise, play, and breathe.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF7F2] p-8 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1 duration-200">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-playfair font-bold text-[#1C2B5E] mb-4">Community Rebuilt</h3>
              <p className="text-[#6B6560] leading-relaxed">
                Recreation isn't optional — it's essential to human connection. This space is designed to bring families, youth, and neighbors together, rebuilding the social fabric that displacement disrupts.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF7F2] p-8 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1 duration-200">
              <div className="text-5xl mb-4">💛</div>
              <h3 className="text-2xl font-playfair font-bold text-[#1C2B5E] mb-4">Dignity Restored</h3>
              <p className="text-[#6B6560] leading-relaxed">
                Agency matters. By designing with — not for — the community, we return ownership and normalcy to people who've had so much taken away. This is humanitarian engineering at its most human.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => scrollToSection('fundraising')}
              className="inline-flex items-center space-x-2 bg-[#C8922A] text-white px-8 py-3 rounded-lg hover:bg-[#B07A1F] transition font-bold"
            >
              <span>Support Project Kinisi</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Camp Section */}
      <section id="camp" className="py-20 md:py-32 bg-[#FAF7F2]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1C2B5E] mb-4">Camp Drama, Greece</h2>
          <div className="h-1 w-20 bg-[#C8922A] mb-16" />

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="text-lg text-[#6B6560] mb-6 leading-relaxed">
                Camp Drama is located in northern Greece and currently houses <strong>445 displaced residents</strong> from Syria, Palestine, Sudan, and other regions of Africa and the Middle East.
              </p>
              <p className="text-lg text-[#6B6560] mb-6 leading-relaxed">
                Greece is one of Europe's main refugee entry points due to its Mediterranean geography. Camps that were meant to be temporary have become long-term settlements — often severely under-resourced.
              </p>
              <p className="text-lg text-[#6B6560] mb-8 leading-relaxed">
                Our new project site is a <strong>70m × 9m outdoor corridor</strong> adjacent to the main residential area — a former playground and volleyball court area that will be completely transformed.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-playfair font-bold text-[#1C2B5E] mb-2">445</div>
                  <div className="text-sm text-[#6B6560]">Residents Served</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-playfair font-bold text-[#1C2B5E] mb-2">70m × 9m</div>
                  <div className="text-sm text-[#6B6560]">Outdoor Space</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-playfair font-bold text-[#1C2B5E] mb-2">~$22K</div>
                  <div className="text-sm text-[#6B6560]">Construction Budget</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-playfair font-bold text-[#1C2B5E] mb-2">3</div>
                  <div className="text-sm text-[#6B6560]">Equipment Units</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={CAMP_SITE} alt="Camp Drama site with yellow vests and red earth" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${METEORA_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1C2B5E] mb-4">Engineered for Dignity</h2>
          <div className="h-1 w-20 bg-[#C8922A] mb-16" />

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-[#E8E3DC]">
            {['equipment', 'construction', 'sustainability'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === tab
                    ? 'text-[#C8922A] border-b-2 border-[#C8922A]'
                    : 'text-[#6B6560] hover:text-[#1C2B5E]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            {activeTab === 'equipment' && (
              <div>
                <h3 className="text-2xl font-playfair font-bold text-[#1C2B5E] mb-4">Certified Equipment</h3>
                <ul className="space-y-3 text-[#6B6560]">
                  <li>• 3 certified calisthenic units (KA-08 combo station, KA-14 open bars, KA-13 closed bars) from local Greek supplier Ermis</li>
                  <li>• Non-permanent football goals (2 × €56 each) and volleyball net sourced locally in Drama/Thessaloniki</li>
                  <li>• Equipment certified to EN-16630:2015 European outdoor fitness standards</li>
                  <li>• Up to 40 people can use the space simultaneously</li>
                </ul>
              </div>
            )}
            {activeTab === 'construction' && (
              <div>
                <h3 className="text-2xl font-playfair font-bold text-[#1C2B5E] mb-4">Construction Process</h3>
                <ul className="space-y-3 text-[#6B6560]">
                  <li>• Excavation and leveling of the full 45m × 9m sand area</li>
                  <li>• Concrete footings (40cm diameter) for all permanent equipment</li>
                  <li>• Geotextile weed barrier installation</li>
                  <li>• Sand reinstallation and compaction</li>
                  <li>• Signage in Greek, Arabic, and English</li>
                </ul>
              </div>
            )}
            {activeTab === 'sustainability' && (
              <div>
                <h3 className="text-2xl font-playfair font-bold text-[#1C2B5E] mb-4">Long-Term Sustainability</h3>
                <ul className="space-y-3 text-[#6B6560]">
                  <li>• Existing fence reinstalled (not replaced) to minimize waste</li>
                  <li>• Existing sand on-site reused wherever possible</li>
                  <li>• YMCA Thessaloniki partnership ensures ongoing programming and bi-annual maintenance visits</li>
                  <li>• Future PUC teams planned for follow-up visits</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1C2B5E] mb-4 text-center">Who's Behind This?</h2>
          <div className="h-1 w-20 bg-[#C8922A] mx-auto mb-16" />

          <div className="bg-[#FAF7F2] p-8 md:p-12 rounded-lg mb-12">
            <blockquote className="text-2xl font-playfair italic text-[#1C2B5E] mb-4">
              "This project is not just about building a recreation area — it's about restoring dignity and creating space for community life to exist again."
            </blockquote>
            <p className="text-[#6B6560]">— PUC Greece Team, UT Austin 2026</p>
          </div>

          <p className="text-lg text-[#6B6560] mb-12 leading-relaxed">
            PUC (Projects with Underserved Communities) is a formal program at UT Austin with years of deployed projects across the globe. This is not a club trip — it's an accredited academic program combining rigorous engineering design with ethical, community-first social work principles.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FAF7F2] p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#1C2B5E] mb-2">UT Austin</div>
              <p className="text-sm text-[#6B6560]">Cockrell School of Engineering & Steve Hicks School of Social Work</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#1C2B5E] mb-2">YMCA Thessaloniki</div>
              <p className="text-sm text-[#6B6560]">Cultural Advisor & Programming Partner</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#1C2B5E] mb-2">Ermis</div>
              <p className="text-sm text-[#6B6560]">Greek Certified Equipment Supplier</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#1C2B5E] mb-2">Camp Drama</div>
              <p className="text-sm text-[#6B6560]">Site Management & Community Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 md:py-32 bg-[#FAF7F2]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1C2B5E] mb-4 text-center">Meet Team Greece</h2>
          <div className="h-1 w-20 bg-[#C8922A] mx-auto mb-12" />

          {/* Team Photo Banner */}
          <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
            <img src={TEAM_PHOTO} alt="Project Kinisi team holding Greek flag" className="w-full h-auto object-cover" />
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="font-playfair font-bold text-[#1C2B5E] text-lg mb-2">{member.name}</h3>
                <p className="text-[#C8922A] font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-[#6B6560] text-sm">{member.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="impact" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1C2B5E] mb-4 text-center">What Happens Next</h2>
          <div className="h-1 w-20 bg-[#C8922A] mx-auto mb-16" />

          <div className="space-y-8">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">{event.icon}</div>
                  <div className={`w-1 flex-grow ${idx < TIMELINE_EVENTS.length - 1 ? 'bg-[#C8922A]' : ''}`} />
                </div>
                <div className="pb-8">
                  <div className="text-sm font-semibold text-[#C8922A] mb-1">{event.date}</div>
                  <h3 className="text-xl font-playfair font-bold text-[#1C2B5E] mb-2">{event.title}</h3>
                  <p className="text-[#6B6560]">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundraising Section */}
      <section id="fundraising" className="py-20 md:py-32 bg-[#1C2B5E] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-center">Be Part of the Movement</h2>
          <div className="h-1 w-20 bg-[#C8922A] mx-auto mb-12" />

          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg text-center mb-8 opacity-95">
              We're a team of students who believe engineering should serve humanity. Whether you donate $5 or $500, follow our journey, or simply share our story — you're part of Project Kinisi.
            </p>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">Fundraising Progress</span>
                <span className="text-[#C8922A] font-bold">{fundingProgress}%</span>
              </div>
              <div className="w-full bg-[#2A3F7F] rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[#C8922A] h-full transition-all duration-500 ease-out"
                  style={{ width: `${fundingProgress}%` }}
                />
              </div>
              <p className="text-sm text-center mt-3 opacity-85">
                {fundingProgress}% of our $25,855 goal reached — help us close the gap
              </p>
            </div>

            {/* Form */}
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#C8922A]"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#C8922A]"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#C8922A]"
                />
                <select
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#C8922A]"
                >
                  <option value="Donate" className="bg-[#1C2B5E]">Donate</option>
                  <option value="Stay Updated" className="bg-[#1C2B5E]">Stay Updated</option>
                  <option value="Share Our Story" className="bg-[#1C2B5E]">Share Our Story</option>
                  <option value="Partner With Us" className="bg-[#1C2B5E]">Partner With Us</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Tell us anything — we'd love to hear from you. (Optional)"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#C8922A]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#C8922A] text-white px-8 py-3 rounded-lg hover:bg-[#B07A1F] transition font-bold flex items-center justify-center space-x-2"
                >
                  <span>Support Project Kinisi</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="bg-white/10 border border-[#C8922A] rounded-lg p-6 text-center">
                <p className="text-xl font-semibold mb-2">Thank you for your support! 🙏</p>
                <p className="opacity-90">We'll be in touch with updates about Project Kinisi.</p>
              </div>
            )}

            {/* Trust Signals */}
            <div className="mt-8 space-y-2 text-sm opacity-85">
              <p>🔒 We respect your privacy. No spam, ever.</p>
              <p>💳 Donations processed securely via UT Austin's giving platform (Hornraiser)</p>
              <p>📬 You'll receive a personal update when the space is complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C2B5E] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[#C8922A] rounded-full flex items-center justify-center font-bold">
                  PK
                </div>
                <span className="font-playfair font-bold text-lg">Project Kinisi</span>
              </div>
              <p className="text-sm opacity-75">Movement Restores Everything</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><button onClick={() => scrollToSection('mission')} className="hover:text-[#C8922A] transition">Mission</button></li>
                <li><button onClick={() => scrollToSection('camp')} className="hover:text-[#C8922A] transition">The Camp</button></li>
                <li><button onClick={() => scrollToSection('design')} className="hover:text-[#C8922A] transition">Design</button></li>
                <li><button onClick={() => scrollToSection('team')} className="hover:text-[#C8922A] transition">Team</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Affiliated With</h4>
              <p className="text-sm opacity-75">UT Austin PUC Program</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <button
                onClick={() => scrollToSection('fundraising')}
                className="inline-flex items-center space-x-2 bg-[#C8922A] text-white px-4 py-2 rounded-lg hover:bg-[#B07A1F] transition font-semibold text-sm"
              >
                <span>Support Project Kinisi</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
            <p>© 2026 PUC Greece — Project Kinisi. Movement Restores Everything.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
