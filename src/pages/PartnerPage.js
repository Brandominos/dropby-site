import React, { useState, useRef, useEffect } from 'react';
import { 
    Award, 
    TrendingUp, 
    Gamepad2, 
    ShieldCheck, 
    Zap, 
    Code, 
    DollarSign, 
    BarChart,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    CheckCircle,
    XCircle,
    Star,
    Users,
    BarChart3,
    Calendar,
    DollarSign as DollarIcon,
    ChevronsUp,
    ChevronsDown
} from 'lucide-react';

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

const Hero = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 overflow-hidden">
            {/* Enhanced Purple Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-violet-600/25 to-indigo-600/20 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                
                {/* Floating Partnership Symbols */}
                <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-3 h-3 rounded-full opacity-40 animate-bounce ${
                                i < 4 ? 'bg-purple-300' : i < 8 ? 'bg-violet-300' : 'bg-indigo-300'
                            }`}
                            style={{
                                left: `${10 + (i * 7)}%`,
                                top: `${15 + ((i * 13) % 70)}%`,
                                animationDelay: `${i * 0.8}s`,
                                animationDuration: `${3 + (i % 3)}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            
            <div ref={ref} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Monetize Your World.
                        <br />
                        <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                            Enhance Your Game.
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                        Partner with DropBy to generate a significant new revenue stream. Integrate immersive, reward-based content that players actually enjoy, and keep up to <span className="text-amber-300 font-semibold">70% of the revenue</span>.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30">
                            Become a Partner
                        </button>
                        <button className="text-purple-200 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 border-2 border-purple-400 hover:border-purple-300 hover:bg-purple-800/30">
                            View SDK Docs
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Enhanced Partnership Visualization */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 rounded-full animate-pulse shadow-2xl shadow-purple-500/50"></div>
                    <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                </div>
            </div>
        </section>
    );
};

const ProblemSection = () => {
    const oldWay = [
        "Intrusive pop-up ads",
        "Forced video interruptions",
        "Low revenue potential"
    ];
    const dropByWay = [
        "Integrated in-game DropBys",
        "Seamless player experience",
        "High revenue potential"
    ];

    return (
        <AnimatedSection className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        VR Monetization is Broken.
                    </h2>
                    <p className="text-2xl text-purple-300 font-semibold mb-8">
                        Let's Fix It.
                    </p>
                    <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
                        For too long, developers have faced a difficult choice: compromise the immersive experience with jarring, flat-screen ads or sacrifice significant revenue potential. We believe monetization should add to the experience, not detract from it.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-600/50 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-slate-300 mb-6 text-center">The Old Way</h3>
                        <ul className="space-y-4">
                            {oldWay.map((item, i) => (
                                <li key={i} className="flex items-center">
                                    <XCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" />
                                    <span className="text-lg text-slate-400">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-500/20 via-violet-500/25 to-indigo-500/20 p-8 rounded-2xl border-2 border-purple-400/50 shadow-2xl shadow-purple-500/20 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">The DropBy Way</h3>
                        <ul className="space-y-4">
                            {dropByWay.map((item, i) => (
                                <li key={i} className="flex items-center">
                                    <CheckCircle className="w-6 h-6 text-emerald-400 mr-3 flex-shrink-0" />
                                    <span className="text-lg text-white">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const ValuePropositions = () => {
    const features = [
        {
            icon: <Award className="w-8 h-8" />,
            title: "Generous Revenue Share",
            description: "Earn a market-leading 70% of all revenue generated from Dropby engagements in your game. We succeed when you do. Our model is built on fair partnership and transparent earnings."
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Protect Your Player Experience",
            description: "You have 100% control. Choose where, when, and how frequently Dropbys appear. Our system is designed to feel like a natural crossover event, not a disruptive advertisement."
        },
        {
            icon: <Code className="w-8 h-8" />,
            title: "Simple & Lightweight Integration",
            description: "Our SDKs for Unity and Unreal are lean, performant, and designed for a fast, hassle-free setup. Get up and running in a matter of hours with clear documentation and dedicated developer support."
        },
        {
            icon: <BarChart className="w-8 h-8" />,
            title: "Premium eCPMs",
            description: "Because Dropbys are interactive and reward-based, they command higher player attention and value. This translates directly to superior eCPMs and a healthier, more sustainable revenue stream for you."
        }
    ];

    return (
        <AnimatedSection className="py-20 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        A Partnership That Puts You First
                    </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100/50">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const HowItWorks = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const steps = [
        {
            number: "01",
            title: "Integrate SDK",
            description: "Add our lightweight SDK to your Unity or Unreal project. A few lines of code is all it takes to get started.",
            code: `// Unity Example\nDropBy.Initialize("your-api-key");\nDropBy.SetDropZone("spawn-point");`
        },
        {
            number: "02",
            title: "Designate Entry Points",
            description: "Use our templates or your own assets to define 'Drop Zones' where Dropbys can appear. You decide what fits your world.",
            code: null,
            dragDropDemo: true
        },
        {
            number: "03",
            title: "Set Rules & Filters",
            description: "Define frequency caps and filter Dropby categories to ensure perfect alignment with your game's brand, rating, and audience.",
            code: null,
            rulesDemo: true
        },
        {
            number: "04",
            title: "Go Live & Earn",
            description: "Deploy your update and start earning immediately. Track everything in your dedicated partner dashboard.",
            code: null,
            miniDashboard: true
        }
    ];

    const currentStep = steps[activeIndex];

    return (
        <AnimatedSection className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
            <style>{`
                @keyframes soft-bounce {
                    0%, 100% {
                        transform: translateY(-12.5%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                .animate-soft-bounce {
                    animation: soft-bounce 1s infinite;
                }
            `}</style>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Go Live in 4 Simple Steps
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Steps List */}
                    <div className="lg:col-span-4">
                        <div className="flex flex-col gap-4">
                            {steps.map((step, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                                        activeIndex === index 
                                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 border-purple-300 shadow-2xl shadow-purple-600/30' 
                                        : 'bg-gray-800/50 border-purple-500/30 hover:bg-purple-800/30 hover:border-purple-400 backdrop-blur-sm'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold border-2 transition-colors ${
                                            activeIndex === index ? 'border-purple-200 text-white bg-purple-500/30' : 'border-purple-400 text-purple-300'
                                        }`}>
                                            {step.number}
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-bold ${
                                                activeIndex === index ? 'text-white' : 'text-purple-200'
                                            }`}>{step.title}</h3>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="lg:col-span-8 lg:sticky lg:top-24">
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-400/30 p-8 md:p-10 rounded-2xl shadow-2xl min-h-[300px] lg:min-h-[340px] relative overflow-hidden flex flex-col justify-center">
                            {/* Enhanced Animated Background */}
                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                            
                            <div className="relative">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent mb-4">{currentStep.title}</h3>
                                <p className="text-purple-100 text-lg leading-relaxed mb-8">{currentStep.description}</p>
                                {currentStep.code && (
                                    <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-left overflow-x-auto whitespace-pre-wrap border border-purple-500/20">
                                        <pre className="whitespace-pre-wrap text-purple-100" style={{wordBreak: 'break-word'}}>{currentStep.code}</pre>
                                    </div>
                                )}
                                {currentStep.dragDropDemo && (
                                    <div className="flex flex-col items-center justify-center mt-4">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg cursor-pointer animate-soft-bounce">
                                                Asset
                                            </div>
                                            <span className="text-2xl text-purple-300">→</span>
                                            <div className="w-40 h-20 border-4 border-dashed border-purple-400 rounded-xl flex items-center justify-center text-purple-200 font-semibold bg-purple-900/30 shadow-inner">
                                                Drop Zone
                                            </div>
                                        </div>
                                        <div className="mt-3 text-purple-200 text-sm">Drag your asset into a Drop Zone. That's it!</div>
                                    </div>
                                )}
                                {currentStep.rulesDemo && (
                                    <RulesFiltersDemo />
                                )}
                                {currentStep.miniDashboard && (
                                    <MiniDashboardDemo />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const RulesFiltersDemo = () => {
    const [cap, setCap] = useState(2);
    const [selected, setSelected] = useState(["Games"]);
    const [rating, setRating] = useState("Everyone");
    const categories = ["Games", "Tech", "Music", "Education", "Sports"];
    const ratings = ["Everyone", "Teen", "Mature"];
    const toggle = (cat) => setSelected(sel => sel.includes(cat) ? sel.filter(c => c !== cat) : [...sel, cat]);
    return (
        <div className="flex flex-col items-center gap-6 mt-4 w-full">
            <div className="w-full max-w-xs">
                <label className="block text-purple-200 mb-2 text-sm font-semibold">Frequency Cap</label>
                <div className="flex items-center gap-3">
                    <input type="range" min="1" max="10" value={cap} onChange={e => setCap(Number(e.target.value))} className="w-full accent-purple-500" />
                    <span className="text-purple-300 font-bold ml-2">{cap}x</span>
                </div>
            </div>
            <div className="w-full max-w-xs">
                <label className="block text-purple-200 mb-2 text-sm font-semibold">Allowed Categories</label>
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => toggle(cat)}
                            className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200 focus:outline-none ${
                                selected.includes(cat)
                                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 border-purple-300 text-white shadow-lg'
                                    : 'bg-gray-800/50 border-purple-400/50 text-purple-200 hover:bg-purple-700/50 hover:border-purple-300'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full max-w-xs">
                <label className="block text-purple-200 mb-2 text-sm font-semibold">Allowed Rating</label>
                <select
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    className="w-full bg-gray-800/50 border-2 border-purple-400/50 text-purple-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-300 transition-all"
                >
                    {ratings.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const MiniDashboardDemo = () => (
    <div className="w-full max-w-md mx-auto mt-4 bg-gray-900/60 border border-purple-400/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                <div className="text-lg font-bold text-amber-400">$1,250</div>
                <div className="text-xs text-purple-200">Revenue</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                <div className="text-lg font-bold text-violet-400">$18.20</div>
                <div className="text-xs text-purple-200">eCPM</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                <div className="text-lg font-bold text-emerald-400">97%</div>
                <div className="text-xs text-purple-200">Fill Rate</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                <div className="text-lg font-bold text-indigo-400">1,200</div>
                <div className="text-xs text-purple-200">DAU</div>
            </div>
        </div>
        <div className="h-20 flex items-end gap-2">
            {[30, 60, 40, 80, 55, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-purple-500 via-violet-400 to-indigo-400 rounded-t" style={{height: `${h}%`, minHeight: 8}}></div>
            ))}
        </div>
        <div className="text-xs text-purple-300 text-center mt-2">Realtime stats preview</div>
    </div>
);

const DashboardShowcase = () => {
    return (
        <AnimatedSection className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Transparent Data at Your Fingertips
                    </h2>
                    <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                        No black boxes. Our partner dashboard gives you a transparent, real-time view of your performance, engagement metrics, and earnings.
                    </p>
                </div>
                
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-400/30">
                            <div className="text-3xl font-bold text-amber-400 mb-2">$12,847</div>
                            <div className="text-purple-200">Total Revenue</div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-sm rounded-xl p-6 text-center border border-violet-400/30">
                            <div className="text-3xl font-bold text-violet-400 mb-2">$24.50</div>
                            <div className="text-purple-200">eCPM</div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 text-center border border-indigo-400/30">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">94.2%</div>
                            <div className="text-purple-200">Fill Rate</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-400/30">
                            <div className="text-3xl font-bold text-indigo-400 mb-2">2,847</div>
                            <div className="text-purple-200">Daily Active Users</div>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                            <h3 className="text-xl font-bold text-white mb-4">Revenue Trend</h3>
                            <div className="h-48 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-lg flex items-end justify-between p-4">
                                {[20, 35, 25, 45, 60, 55, 70].map((height, index) => (
                                    <div key={index} className="bg-gradient-to-t from-purple-400 via-violet-400 to-indigo-400 rounded-t w-8" style={{height: `${height}%`}}></div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                            <h3 className="text-xl font-bold text-white mb-4">Top Drop Zones</h3>
                            <div className="space-y-3">
                                {[
                                    {name: "Spawn Point", revenue: "$4,230", engagement: "87%"},
                                    {name: "Market Square", revenue: "$3,120", engagement: "92%"},
                                    {name: "Battle Arena", revenue: "$2,890", engagement: "78%"}
                                ].map((zone, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-purple-200">{zone.name}</span>
                                        <div className="text-right">
                                            <div className="text-white font-semibold">{zone.revenue}</div>
                                            <div className="text-sm text-purple-300">{zone.engagement} engagement</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-amber-400 font-semibold">Next Payout</div>
                                <div className="text-2xl font-bold text-white">$8,432.50</div>
                                <div className="text-purple-200">Scheduled for March 15, 2024</div>
                            </div>
                            <DollarIcon className="w-12 h-12 text-amber-400" />
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Testimonials = () => {
    const testimonials = [
        {
            quote: "DropBy has been a game-changer. We've seen a 3x lift in ARPDAU compared to our old video ad network, and our player feedback has been overwhelmingly positive.",
            author: "Alex Chen",
            title: "Lead Developer",
            company: "Nebula Interactive",
            avatar: "AC"
        },
        {
            quote: "The integration was shockingly simple, and the DropBy team provided excellent support. It feels like a true partnership.",
            author: "Sarah Rodriguez",
            title: "CEO & Founder",
            company: "Quantum Leap Games",
            avatar: "SR"
        }
    ];

    return (
        <AnimatedSection className="py-20 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Trusted by Forward-Thinking VR Studios
                    </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100/50">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">"{testimonial.quote}"</p>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.author}</div>
                                        <div className="text-purple-600">{testimonial.title}, {testimonial.company}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <div className="flex justify-center items-center gap-8 flex-wrap">
                        {["Nebula Interactive", "Quantum Leap Games", "Cyber Studios", "Neo Reality", "Future Worlds"].map((company, index) => (
                            <div key={index} className="bg-gradient-to-r from-purple-100 to-violet-100 px-6 py-3 rounded-full text-purple-700 font-semibold border border-purple-200">
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const FAQ = () => {
    const questions = [
        {
            q: "What are the technical requirements to be a host?",
            a: "You need a Unity or Unreal Engine game with VR support, an active player base, and the ability to integrate our lightweight SDK. We support Unity 2020.3+ and Unreal Engine 4.27+."
        },
        {
            q: "What is the expected impact on my game's performance?",
            a: "Our SDK is designed to be lightweight and performant. It adds less than 2MB to your build size and has minimal impact on frame rates. We've optimized it to work seamlessly in VR environments."
        },
        {
            q: "How and when do I get paid?",
            a: "We pay out monthly via PayPal, bank transfer, or cryptocurrency. Payments are processed on the 15th of each month for earnings from the previous month. Minimum payout is $100."
        },
        {
            q: "Can I approve or reject specific Dropbys or advertisers?",
            a: "Yes, you have full control. You can set content filters, approve individual campaigns, and even create custom whitelists or blacklists for advertisers and content categories."
        },
        {
            q: "What kind of support do you offer to partners during and after integration?",
            a: "We provide dedicated developer support, comprehensive documentation, integration guides, and a dedicated Slack channel for partners. Our team is available to help with any technical questions or optimization."
        }
    ];

    const [open, setOpen] = useState(null);
    return (
        <AnimatedSection className="py-20 md:py-32 bg-gradient-to-b from-purple-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Your Questions, Answered</h2>
                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className="bg-white border border-purple-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-purple-50 transition-colors">
                                <span>{item.q}</span>
                                {open === i ? <ChevronsUp className="text-purple-500" /> : <ChevronsDown className="text-purple-500" />}
                            </button>
                            <div className={`transition-all duration-500 ${open === i ? 'max-h-96 p-6 pt-4' : 'max-h-0 overflow-hidden'}`}>
                                <p className="text-gray-600">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const FinalCTA = () => {
    return (
        <AnimatedSection className="py-20 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 relative overflow-hidden">
            {/* Community Success Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-violet-800/25 to-indigo-800/20 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Build the Future of VR Monetization?
                </h2>
                <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                    Join the network of developers who are earning more while respecting their players. Let's build it together.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <button className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Apply to Be a Partner
                    </button>
                    <a href="mailto:questions@dropby.com" className="text-purple-100 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 border-2 border-purple-300 hover:border-white hover:bg-purple-700/30">
                        questions@dropby.com
                    </a>
                </div>
                
                <div className="flex justify-center items-center gap-8 text-purple-100 flex-wrap">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span>No setup fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                        <span>70% revenue share</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-violet-300" />
                        <span>24/7 support</span>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const PartnerPage = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <ProblemSection />
            <ValuePropositions />
            <HowItWorks />
            <DashboardShowcase />
            <Testimonials />
            <FAQ />
            <FinalCTA />
        </div>
    );
};

export default PartnerPage; 