import React, { useState, useEffect, useRef } from 'react';
import { Play, Code, Gamepad2, Award, ChevronsDown, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import dblogo from './dblogo.png';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import PartnerPage from './pages/PartnerPage';
import CollaboratorPage from './pages/CollaboratorPage';
import PlayerPage from './pages/PlayerPage';

const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
};

// HELPER HOOK for detecting when an element is visible on screen
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return {width: size[0], height: size[1]};
}

// --- Animated Components --- //
const AnimatedSection = ({ children, className = '', ...props }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            {...props}
        >
            {children}
        </div>
    );
};

// --- Particle Animation for Hero Background --- //
const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: null, y: null, radius: 100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particleArray = [];
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleMouseMove = (event) => {
            mouse.current.x = event.x;
            mouse.current.y = event.y;
        };
        
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', handleResize);

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 40) + 5;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                 let dx = mouse.current.x - this.x;
                 let dy = mouse.current.y - this.y;
                 let distance = Math.sqrt(dx * dx + dy * dy);
                 let forceDirectionX = dx / distance;
                 let forceDirectionY = dy / distance;
                 let maxDistance = mouse.current.radius;
                 let force = (maxDistance - distance) / maxDistance;
                 let directionX = forceDirectionX * force * this.density;
                 let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.current.radius) {
                   this.x -= directionX;
                   this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx/10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy/10;
                    }
                }
                this.draw();
            }
        }

        function init() {
            particleArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 3) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 5) - 2.5;
                let directionY = (Math.random() * 5) - 2.5;
                let color = 'rgba(29, 233, 182, 0.5)'; // Teal with transparency
                particleArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particleArray.length; i++) {
                particleArray[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

// --- Individual Components --- //
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'For Players', href: '/players' },
        { name: 'For Collaborators', href: '/collaborators' },
        { name: 'Partner', href: '/partner' },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || ['/partner','/collaborators','/players'].includes(location.pathname) ? 'bg-gray-900/80 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4">
                <div className="relative flex items-center justify-between">
                    <div className="text-3xl font-bold tracking-tighter text-white">
                        <Link to="/"><img src={dblogo} alt="Dropby Logo" className="h-8 w-auto" /></Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {navLinks.map(link => (
                             <Link key={link.name} to={link.href} onClick={link.href.startsWith('/#') ? smoothScroll : undefined} className="text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium">
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="hidden md:block">
                        <button className="bg-teal-400 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-teal-300 transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            {isMenuOpen ? <X size={28} /> : 
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            }
                        </button>
                    </div>
                </div>
                 {isMenuOpen && (
                    <div className="md:hidden mt-4 bg-gray-900/90 rounded-lg p-4">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map(link => (
                                 <Link key={link.name} to={link.href} onClick={(e) => { if(link.href.startsWith('/#')) smoothScroll(e); setIsMenuOpen(false); }} className="text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium text-center py-2">
                                    {link.name}
                                </Link>
                            ))}
                            <button className="bg-teal-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-teal-300 transition-all duration-300 transform hover:scale-105 mt-2">
                                Get Started
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

const Hero = () => (
    <div className="relative min-h-screen flex items-center justify-center text-white bg-gray-900">
        {/* Purple Portal Background */}
        <div className="absolute inset-0 overflow-visible">
            {/* Portal Core */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] overflow-visible">
                {/* Portal Core - Rotating Gradient */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-teal-400 to-purple-600 rounded-full opacity-15 blur-[40px] animate-spin" style={{animationDuration: '6s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-purple-500 to-teal-600 rounded-full opacity-10 blur-[60px] animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
                </div>
                
                {/* Inner Ripples */}
                <div className="absolute inset-16 rounded-full">
                    <div className="absolute inset-0 bg-gradient-conic from-purple-400 via-teal-400 to-purple-400 rounded-full opacity-20 animate-spin blur-sm" style={{animationDuration: '4s'}}></div>
                    <div className="absolute inset-4 bg-gradient-conic from-teal-400 via-purple-400 to-teal-400 rounded-full opacity-15 animate-spin blur-sm" style={{animationDuration: '7s', animationDirection: 'reverse'}}></div>
                </div>
                
                {/* Portal Ring 1 - Fastest rotation */}
                <div className="absolute inset-0 border-4 border-purple-400/30 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
                
                {/* Portal Ring 2 - Medium rotation */}
                <div className="absolute inset-4 border-4 border-purple-500/25 rounded-full animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
                
                {/* Portal Ring 3 - Slow rotation */}
                <div className="absolute inset-8 border-4 border-teal-400/20 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                
                {/* Ripple Waves */}
                <div className="absolute inset-12">
                    <div className="absolute inset-0 border-2 border-purple-300/30 rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '0s'}}></div>
                    <div className="absolute inset-2 border-2 border-teal-300/25 rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-4 border-2 border-purple-400/20 rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                </div>
                
                {/* Wave Effects */}
                <div className="absolute inset-0 z-50">
                    {/* Wave 1 */}
                    <div className="absolute inset-0 border-2 border-purple-300/25 rounded-full animate-ping" style={{animationDuration: '8s', animationDelay: '0s'}}></div>
                    <div className="absolute inset-0 border-2 border-purple-400/20 rounded-full animate-ping" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
                    <div className="absolute inset-0 border-2 border-teal-300/20 rounded-full animate-ping" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
                    <div className="absolute inset-0 border-2 border-teal-400/15 rounded-full animate-ping" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
                </div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-2 h-2 rounded-full opacity-70 animate-bounce ${
                                i < 4 ? 'bg-purple-300' : 'bg-teal-300'
                            }`}
                            style={{
                                left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                                top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: '2s'
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="text-center z-10 p-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 leading-tight">
                Valuable Experiences.
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                    Not Interruptions.
                </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
                Dropby is revolutionizing the XR experience by replacing intrusive promotions with valuable, interactive, and optional content that users genuinely want to engage with.
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <button className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105">
                    Create an Experience
                </button>
                <Link to="/partner" className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105">
                    Become a Partner
                </Link>
            </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
           <a href="#about" onClick={smoothScroll} aria-label="Scroll down">
                <ChevronsDown className="text-gray-500 w-8 h-8 animate-bounce" />
           </a>
        </div>
    </div>
);

const About = () => {
    const features = [
        {
            icon: <Play className="w-10 h-10 text-teal-400" />,
            title: 'For Collaborators',
            description: "Build a 'Dropby'. An interactive mini-experience from your world. Pay only for genuine user engagement."
        },
        {
            icon: <Award className="w-10 h-10 text-amber-400" />,
            title: 'For Players',
            description: "Discover new worlds and earn 'Dropby Credits'. Redeem them for real in-game items across our entire network."
        },
        {
            icon: <Code className="w-10 h-10 text-cyan-400" />,
            title: 'For Hosts',
            description: "Monetize your XR game with immersive crossover events that your players will actually enjoy and value."
        },
    ];

    return (
        <section id="about" className="py-20 md:py-32 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Make Discovery Rewarding</h2>
                        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Dropby reinvents content discovery for the metaverse. We connect developers and players through meaningful, rewarding interactions that add value.</p>
                    </div>
                </AnimatedSection>
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                   {features.map((feature, index) => (
                       <AnimatedSection key={index}>
                           <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700/50 h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10">
                               <div className="mb-6 inline-block bg-gray-700 p-4 rounded-xl">
                                   {feature.icon}
                               </div>
                               <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                               <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                           </div>
                       </AnimatedSection>
                   ))}
                </div>
            </div>
        </section>
    );
}

const Features = () => {
    const featuresData = [
        {
            icon: <Play className="w-8 h-8 text-teal-400" />,
            title: "Playable Previews, Not Passive Ads",
            description: "Go beyond video trailers. Offer a slice of your game, a core loop, a boss fight, a character creator, that players can experience instantly. This is the ultimate 'try before you buy'.",
            visual: "https://placehold.co/600x400/0f172a/14b8a6?text=Interactive+Gameplay"
        },
        {
            icon: <Code className="w-8 h-8 text-cyan-400" />,
            title: "Seamless, Native Integration",
            description: "Seamlessly integrate DropBy into your world. Use our customizable DropBys, companions, or beacons. You control the placement and aesthetics, maintaining your game's integrity.",
            visual: "https://placehold.co/600x400/0f172a/0ea5e9?text=Holographic+DropBy"
        },
        {
            icon: <Award className="w-8 h-8 text-amber-400" />,
            title: "Cross-Game Credit System",
            description: "Players earn 'Dropby Credits' from experiences that can be redeemed in ANY partnered game. This universal reward system boosts retention and encourages exploration across the entire Dropby network.",
             visual: "https://placehold.co/600x400/0f172a/f59e0b?text=Universal+Credit+Ledger"
        },
    ];

    return (
        <AnimatedSection id="features" className="py-20 md:py-32 bg-gray-900">
            <div className="container mx-auto px-6">
                 {featuresData.map((feature, index) => (
                    <AnimatedSection key={index}>
                        <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mb-20 md:mb-32 last:mb-0`}>
                            <div className="md:w-1/2">
                                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">{feature.title}</h3>
                                <p className="text-lg text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                            <div className="md:w-1/2">
                                <img src={feature.visual} alt={feature.title} className="rounded-2xl shadow-2xl shadow-gray-800/50 w-full h-auto object-cover" />
                            </div>
                        </div>
                    </AnimatedSection>
                 ))}
            </div>
        </AnimatedSection>
    );
}

const AudienceSections = () => {
    return (
        <section className="py-20 md:py-32 bg-gray-900 text-white">
            <div className="container mx-auto px-6 space-y-24">
                {/* For Collaborators */}
                <AnimatedSection id="collaborators" className="scroll-mt-20">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 border border-teal-500/20 shadow-2xl shadow-teal-900/20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">For <span className="text-teal-400">Collaborators</span></h2>
                                <p className="text-lg text-gray-400 mb-6">Get your game in front of engaged XR players. A Dropby isn't just a promotion; it's a valuable, interactive crossover event.</p>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <Play className="w-6 h-6 text-teal-400 mt-1 flex-shrink-0"/> 
                                        <span><span className="font-bold text-white">Pay for Engagement:</span> Ditch impressions. You only pay when a player actively engages with and values your content.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Code className="w-6 h-6 text-teal-400 mt-1 flex-shrink-0"/> 
                                        <span><span className="font-bold text-white">Lightweight SDK:</span> Simple integration for Unity and Unreal with customizable templates and powerful analytics.</span>
                                    </li>
                                </ul>
                                <button className="mt-8 bg-teal-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal-300 transition-all duration-300 transform hover:scale-105">
                                    Start Creating
                                </button>
                            </div>
                            <div className="bg-black/50 rounded-xl border border-gray-700 font-mono text-sm text-gray-400 overflow-hidden">
                                <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem' }}>
{`// Initialize the SDK once when your game starts
import Dropby from 'dropby-sdk';
Dropby.initialize({ apiKey: 'YOUR_API_KEY' });

// Trigger an event when a player discovers a DropBy
function onDropByFound(player) {
  Dropby.triggerEvent('dungeon-DropBy-1', player.id);
}`}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* For Hosts */}
                <AnimatedSection id="hosts" className="scroll-mt-20">
                    <div className="bg-gradient-to-bl from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 border border-cyan-500/20 shadow-2xl shadow-cyan-900/20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                              <div className="order-2 md:order-1">
                                 <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                                     <h4 className="font-bold text-white mb-3">Revenue Share Example</h4>
                                     <div className="space-y-3">
                                         <div className="flex justify-between items-center text-gray-300"><span>Dropby Engagement Fee:</span> <span>$0.50</span></div>
                                         <div className="h-px bg-gray-700"></div>
                                         <div className="flex justify-between items-center text-teal-400"><span>Your Share (70%):</span> <span className="font-bold">$0.35</span></div>
                                         <div className="flex justify-between items-center text-gray-400"><span>Dropby Platform (30%):</span> <span>$0.15</span></div>
                                     </div>
                                 </div>
                             </div>
                             <div className="order-1 md:order-2">
                                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">For <span className="text-cyan-400">Hosts</span></h2>
                                 <p className="text-lg text-gray-400 mb-6">Monetize your game by hosting immersive crossover content that adds value, not frustration.</p>
                                 <ul className="space-y-4 text-gray-300">
                                     <li className="flex items-start gap-3">
                                         <Award className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> 
                                         <span><span className="font-bold text-white">Generous Revenue Share:</span> Keep the majority of the revenue. We succeed when you do.</span>
                                     </li>
                                     <li className="flex items-start gap-3">
                                         <Gamepad2 className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> 
                                         <span><span className="font-bold text-white">Maintain Your Vibe:</span> You have full control over placement and frequency to protect your player experience.</span>
                                     </li>
                                 </ul>
                                 <button className="mt-8 bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                                     Become a Partner
                                 </button>
                             </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const PlayerSection = () => {
    const initialRewards = [
        { name: 'Cosmic Blade Skin', game: 'Galaxy Runners', cost: 500, redeemed: false },
        { name: 'Energy Pack (x10)', game: 'Chrono Clash', cost: 250, redeemed: false },
    ];

    const [userCredits, setUserCredits] = useState(1250);
    const [rewards, setRewards] = useState(initialRewards);
    const [confetti, setConfetti] = useState({
        show: false,
        source: null,
        isFading: false,
    });
    const [activeConfettiIndex, setActiveConfettiIndex] = useState(null);
    const buttonRefs = useRef([]);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const handleScroll = () => {
            if (activeConfettiIndex === null) return;
            
            const buttonRef = buttonRefs.current[activeConfettiIndex];
            if (buttonRef) {
                const rect = buttonRef.getBoundingClientRect();
                setConfetti(c => ({
                    ...c,
                    source: {
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                    },
                }));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeConfettiIndex]);

    const handleRedeem = (index) => {
        const reward = rewards[index];
        if (reward.redeemed || confetti.show || userCredits < reward.cost) return;

        setUserCredits(prevCredits => prevCredits - reward.cost);

        const newRewards = [...rewards];
        newRewards[index].redeemed = true;
        setRewards(newRewards);
        setActiveConfettiIndex(index);

        const buttonRef = buttonRefs.current[index];
        if (buttonRef) {
            const rect = buttonRef.getBoundingClientRect();
            setConfetti({
                show: true,
                source: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                },
                isFading: false,
            });

            setTimeout(() => {
                setConfetti(c => ({ ...c, isFading: true }));
            }, 1500);

            setTimeout(() => {
                setConfetti({ show: false, source: null, isFading: false });
                setActiveConfettiIndex(null);
            }, 2500);
        }
    };

    return (
        <section id="players" className="py-20 md:py-32 bg-gray-900 text-white relative scroll-mt-20">
            {confetti.show && confetti.source && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={100}
                    gravity={0.25}
                    initialVelocityY={10}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                        opacity: confetti.isFading ? 0 : 1,
                        transition: 'opacity 1s ease-out'
                    }}
                    confettiSource={{
                        x: confetti.source.x,
                        y: confetti.source.y,
                        w: confetti.source.width,
                        h: confetti.source.height,
                    }}
                />
            )}
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                         <div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                Stop the Interruptions.
                                <br/>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                                    Start the Experience.
                                </span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                                With Dropby, you get more content and in-game items in the XR games you already love, for free. Discover new experiences, complete fun challenges, and earn credits to spend on awesome rewards.
                            </p>
                             <button className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105">
                                Explore Rewards
                            </button>
                        </div>
                         <div className="w-full max-w-md mx-auto">
                            <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl">
                                 <div className="flex justify-between items-center mb-4">
                                     <h3 className="text-xl font-bold text-white">Dropby Hub</h3>
                                     <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-500"></div>
                                 </div>
                                 <div className="bg-gray-900 rounded-xl p-4 mb-4">
                                    <p className="text-sm text-gray-400">Your Balance</p>
                                    <p className="text-3xl font-bold text-amber-400">C {userCredits}</p>
                                 </div>
                                 <div className="space-y-3">
                                    <p className="font-bold text-white">Featured Rewards</p>
                                    {rewards.map((reward, index) => (
                                    <div key={reward.name} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{reward.name}</p>
                                            <p className="text-sm text-gray-400">{reward.game}</p>
                                        </div>
                                        <button
                                            ref={el => buttonRefs.current[index] = el}
                                            onClick={() => handleRedeem(index)}
                                            className={`text-sm font-bold py-1 px-3 rounded-md transition-all duration-300 ${
                                                reward.redeemed 
                                                    ? 'bg-green-500 text-white cursor-default' 
                                                    : userCredits < reward.cost
                                                    ? 'bg-gray-500 text-white cursor-not-allowed'
                                                    : 'bg-amber-500 text-white hover:bg-amber-400'
                                            }`}
                                            disabled={reward.redeemed || userCredits < reward.cost}
                                        >
                                            {reward.redeemed ? 'Redeemed!' : `C ${reward.cost}`}
                                        </button>
                                    </div>
                                    ))}
                                 </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: "What is a 'Dropby'?",
            answer: "It's a new ad format for VR. Instead of a pop-up, it could be a 3D object, a DropBy to a mini-game, or a temporary world theme that you can choose to engage with. They are always designed to be enjoyable and rewarding."
        },
        {
            question: "How does the cross-game credit system work?",
            answer: "Players earn a universal 'Dropby Credit' for engaging with experiences. They can then spend these credits on in-game items within any game that is part of the Dropby network, not just the game they earned them in."
        },
        {
            question: "Do I have to host content that doesn't fit my game's aesthetic?",
            answer: "No. As a host, you have full control. We provide guidelines to ensure quality, but you choose which experiences to feature and how they are presented in your world to maintain a consistent player experience."
        },
        {
            question: "Is this free for players?",
            answer: "Absolutely. Players never pay for anything. Dropby is a way for them to earn premium content and currency by interacting with new game experiences, completely for free."
        },
    ];

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section className="py-20 md:py-32 bg-gray-900 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                             <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                                <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center text-left p-6 font-semibold text-lg hover:bg-gray-700/50 focus:outline-none">
                                    <span>{faq.question}</span>
                                    <div className={`transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}>
                                        <ChevronsDown className="w-6 h-6 text-gray-400" />
                                    </div>
                                </button>
                                <div className={`transition-all duration-500 ease-in-out ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 text-gray-400 pt-4">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-8">
                 <div className="md:col-span-1">
                    <Link to="/"><img src={dblogo} alt="Dropby Logo" className="h-8 w-auto mb-2" /></Link>
                     <p>Valuable experiences, not interruptions.</p>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2">
                     <div>
                         <h4 className="font-semibold text-white mb-4">Platform</h4>
                         <ul className="space-y-2">
                            <li><Link to="/#collaborators" onClick={smoothScroll} className="hover:text-teal-400 transition-colors">For Collaborators</Link></li>
                            <li><Link to="/partner" className="hover:text-teal-400 transition-colors">Partner</Link></li>
                            <li><Link to="/players" className="hover:text-teal-400 transition-colors">For Players</Link></li>
                         </ul>
                     </div>
                     <div>
                         <h4 className="font-semibold text-white mb-4">Developers</h4>
                         <ul className="space-y-2">
                            <li><a href="#" className="hover:text-teal-400 transition-colors">SDK Docs</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors">Guidelines</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors">API Status</a></li>
                         </ul>
                     </div>
                     <div>
                         <h4 className="font-semibold text-white mb-4">Company</h4>
                         <ul className="space-y-2">
                            <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
                         </ul>
                     </div>
                 </div>
            </div>
             <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Dropby Technologies Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default function App() {
    return (
        <BrowserRouter basename="/dropby-site">
            <AppWrapper />
        </BrowserRouter>
    );
}

const AppWrapper = () => {
    const location = useLocation();
    const isPlayersPage = location.pathname === '/players';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    
    return (
        <div className={isPlayersPage ? "bg-gradient-to-b from-gray-50 to-white" : "bg-gray-900"}>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
                    body { font-family: 'Space Grotesk', sans-serif; scroll-behavior: smooth; }
                `}
            </style>
            <AppContent />
        </div>
    );
};

const AppContent = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/partner" element={<PartnerPage />} />
                <Route path="/collaborators" element={<CollaboratorPage />} />
                <Route path="/players" element={<PlayerPage />} />
                <Route path="/" element={
                    <main>
                        <Hero />
                        <About />
                        <Features />
                        <AudienceSections />
                        <PlayerSection />
                        <FAQ />
                    </main>
                } />
            </Routes>
            <Footer />
        </>
    );
} 