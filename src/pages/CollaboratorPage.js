import React, { useState, useRef, useEffect } from 'react';
import { 
    MousePointerClick,
    Users,
    BarChart3,
    Wand2,
    ChevronDown,
    ChevronUp,
    DollarSign,
    Clock,
    CheckCircle,
    ChevronsUp,
    ChevronsDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

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

const Hero = () => (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-stars animate-pulse"></div>
        <AnimatedSection className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Make <span className="text-blue-400">Experiences</span>,
                <br />
                Not Ads.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Stop paying for passive views. Build a "DropBy" an interactive slice of your world and get your game in front of thousands of engaged VR players. This isn't a promotion; it's a crossover event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg">
                    Create Your First DropBy
                </button>
                <button className="text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 border border-gray-600 hover:border-gray-400">
                    See Creative Formats
                </button>
            </div>
        </AnimatedSection>
    </section>
);

const CorePhilosophy = () => (
    <AnimatedSection className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Stop Shouting. Start Inviting.</h2>
                <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                    The old promotion model is built on interruption. It breaks immersion and creates frustration. DropBy is built on discovery. We give you the tools to invite players into a micro-experience of your game, creating genuine moments of delight and driving high-intent conversions.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-8 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">The Old Way</h3>
                    <p className="text-gray-600">A jarring, flat 2D video promotion plays over the game. The player's hands are down, showing disengagement.</p>
                </div>
                <div className="p-8 border-2 border-blue-500 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">The DropBy Way</h3>
                    <p className="text-gray-700">An intriguing, lore-friendly object appears. The player's hands are up, reaching toward it with curiosity.</p>
                </div>
                <div className="p-8 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">The Result</h3>
                    <p className="text-gray-600">The player is inside the Collaborator's world, actively playing. UI shows "+10 Bonus Credits Earned" and "Game Wishlisted."</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const WhyCreateWithDropBy = () => {
    const benefits = [
        {
            icon: <MousePointerClick className="w-8 h-8" />,
            title: "Performance-Based Spending",
            description: "Move beyond the limitations of CPM. With our Cost-Per-Engagement (CPE) model, you only pay when a player actively chooses to enter your Drop. Your budget is spent on genuine interest, not ignored impressions."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Reach Your Ideal VR Audience",
            description: "Get your game directly in front of validated VR players across our network. Target by player genre preferences, in-game behavior, and lookalike audiences to ensure maximum relevance and impact."
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Drive Meaningful Conversions",
            description: "A 60-second playable experience provides a far richer preview than a 30-second video. Give players a true taste of your game's mechanics, art, and feel, leading to higher-quality wishlists and purchases."
        },
        {
            icon: <Wand2 className="w-8 h-8" />,
            title: "Unleash Your Creativity",
            description: "You're a game developer. Your promotions should be playable. From interactive mini-levels to stunning 360° worlds, we provide the canvas for you to create an experience that is as unique as your game."
        }
    ];

    return (
        <AnimatedSection className="py-24 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Acquire High-Value Players, Not Just Clicks.</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
                            <div className="text-blue-600 mb-4">{benefit.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const CreativeFormatsShowcase = () => {
    const [activeTab, setActiveTab] = useState('playable');
    const tabs = {
        playable: {
            title: 'Playable VR Mini-Experiences',
            description: 'The ultimate format for engagement. Port a small level, a core gameplay loop, a boss fight, or a character creator. Let players feel your game\'s mechanics firsthand.',
        },
        '360': {
            title: '360° Immersive Worlds',
            description: 'Transport players to your game\'s most stunning environment. Ideal for showcasing incredible art direction and world-building. Users can look around and interact with key hotspots.',
        },
        interactiveVideo: {
            title: 'Interactive Flat Video',
            description: 'Level up your existing trailers. Add interactive overlays that let players answer a question for bonus credits, click on a character to learn more, or link directly to your store page.',
        },
    };

    return (
        <AnimatedSection className="py-24 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Your Game, Your Canvas.</h2>
                </div>
                <div className="flex justify-center mb-8 border-b border-blue-200">
                    {Object.keys(tabs).map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${activeTab === key ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            {tabs[key].title}
                        </button>
                    ))}
                </div>
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-lg text-gray-600 mb-8">{tabs[activeTab].description}</p>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-80 rounded-lg flex items-center justify-center border border-blue-300">
                        <p className="text-blue-700 font-semibold">[Visual Mockup for {tabs[activeTab].title}]</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    )
}

const AnalyticsDashboard = () => {
    const cpeData = [
        { name: 'Day 1', cpe: 0.80 }, { name: 'Day 2', cpe: 0.75 },
        { name: 'Day 3', cpe: 0.72 }, { name: 'Day 4', cpe: 0.78 },
        { name: 'Day 5', cpe: 0.70 }, { name: 'Day 6', cpe: 0.65 },
        { name: 'Day 7', cpe: 0.68 },
    ];

    const conversionData = [
        { name: 'Day 1', rate: 12 }, { name: 'Day 2', rate: 14 },
        { name: 'Day 3', rate: 15 }, { name: 'Day 4', rate: 13 },
        { name: 'Day 5', rate: 18 }, { name: 'Day 6', rate: 22 },
        { name: 'Day 7', rate: 20 },
    ];
    
    const funnelData = [
      { name: 'Entries', value: 10000, fill: '#2563eb' },
      { name: 'Engagements', value: 4500, fill: '#3b82f6' },
      { name: 'Conversions', value: 980, fill: '#60a5fa' },
    ];

    const ageData = [
        { name: '13-17', value: 15 }, { name: '18-24', value: 45 },
        { name: '25-34', value: 30 }, { name: '35+', value: 10 },
    ];
    const genderData = [
        { name: 'Male', value: 65 }, { name: 'Female', value: 30 },
        { name: 'Other', value: 5 },
    ];
    const locationData = [
        { name: 'NA', value: 50 }, { name: 'EU', value: 30 },
        { name: 'APAC', value: 15 }, { name: 'Other', value: 5 },
    ];

    return (
    <AnimatedSection className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold">Measure What Matters: Your ROI.</h2>
                <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
                    Track the real-time performance of your campaign. Understand your audience, measure true engagement, and optimize for conversion with our transparent analytics dashboard.
                </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-blue-700/30">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard icon={<DollarSign className="w-8 h-8 text-blue-400" />} title="Cost Per Engagement" value="$0.72" trend="+3.2%" trendColor="text-blue-400" />
                    <MetricCard icon={<CheckCircle className="w-8 h-8 text-blue-400" />} title="Conversion Rate" value="21.7%" trend="+8.1%" trendColor="text-blue-400" />
                    <MetricCard icon={<Users className="w-8 h-8 text-blue-400" />} title="Total Engagements" value="4,512" />
                    <MetricCard icon={<Clock className="w-8 h-8 text-blue-400" />} title="Average Playtime" value="73s" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-slate-800/70 p-6 rounded-lg border border-blue-700/20">
                        <h3 className="text-xl font-semibold mb-4 text-gray-200">Cost Per Engagement (CPE)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={cpeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                                <XAxis dataKey="name" stroke="#cbd5e1" />
                                <YAxis stroke="#cbd5e1" />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                                <Legend />
                                <Line type="monotone" dataKey="cpe" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-slate-800/70 p-6 rounded-lg border border-blue-700/20">
                        <h3 className="text-xl font-semibold mb-4 text-gray-200">Conversion Rate (Wishlists)</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={conversionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#475569"/>
                                <XAxis dataKey="name" stroke="#cbd5e1" />
                                <YAxis stroke="#cbd5e1" />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                                <Legend />
                                <Area type="monotone" dataKey="rate" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 bg-slate-800/70 p-6 rounded-lg border border-blue-700/20">
                        <h3 className="text-xl font-semibold mb-4 text-gray-200">Conversion Funnel</h3>
                        <div className="space-y-4">
                            {funnelData.map((item) => (
                                <div key={item.name} className="flex items-center">
                                    <div className="w-24 text-gray-400 text-sm">{item.name}</div>
                                    <div className="flex-1 bg-slate-700/50 rounded-full h-8 mr-4">
                                        <div style={{ width: `${(item.value / funnelData[0].value) * 100}%`, backgroundColor: item.fill }} className="h-8 rounded-full transition-all duration-500"></div>
                                    </div>
                                    <div className="w-16 text-right font-semibold">{item.value.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-3 bg-slate-800/70 p-6 rounded-lg border border-blue-700/20">
                         <h3 className="text-xl font-semibold mb-4 text-gray-200">Player Demographics</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
                            <DemographicChart title="Age Range" data={ageData} barColor="#3b82f6" />
                            <DemographicChart title="Gender" data={genderData} barColor="#60a5fa" />
                            <DemographicChart title="Location" data={locationData} barColor="#93c5fd" />
                         </div>
                    </div>
                </div>

            </div>
        </div>
    </AnimatedSection>
)};

const MetricCard = ({ icon, title, value, trend, trendColor }) => (
    <div className="bg-slate-700/50 p-6 rounded-lg flex items-center space-x-4 border border-blue-800/50">
        <div>{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold">{value}</p>
                {trend && <span className={`text-sm font-semibold ${trendColor}`}>{trend}</span>}
            </div>
        </div>
    </div>
);

const DemographicChart = ({ title, data, barColor }) => (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-blue-800/50 h-64">
        <h4 className="text-lg font-semibold text-gray-200 mb-4">{title}</h4>
        <ResponsiveContainer width="100%" height="80%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#d1d5db' }} />
                <Bar dataKey="value" fill={barColor} background={{ fill: '#475569' }} label={{ position: 'right', fill: '#e5e7eb' }} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const CollaboratorFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What defines a "billable engagement" in the CPE model?',
            answer: 'A billable engagement is counted when a player actively chooses to enter your Drop and spends a minimum amount of time inside. This ensures you only pay for genuine interest.'
        },
        {
            question: 'What are the technical requirements and specs for building a Drop?',
            answer: 'We support Unity and Unreal Engine. Drops are typically small, self-contained scenes from your game, optimized for performance. We provide detailed documentation and support to guide you through the process.'
        },
        {
            question: 'What targeting options are available? Can I target players from specific games?',
            answer: 'You can target players based on genre preferences, play history, and demographic data. While you cannot target players from a specific competing game, you can target players who enjoy similar games.'
        },
        {
            question: 'What is a typical budget for a campaign? Do you have a minimum spend?',
            answer: 'Campaign budgets are flexible and can be scaled up or down. We have a low minimum spend to allow developers of all sizes to get started and test the platform.'
        },
        {
            question: 'Can I get help with the creative for my Drop?',
            answer: 'Absolutely. While you know your game best, our creative team can provide best practices, guidance, and even hands-on support to help you create a compelling and effective Drop.'
        }
    ];

    return (
        <AnimatedSection className="py-24 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-6 text-left text-lg font-semibold text-gray-800"
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            {openIndex === index && (
                                <div className="p-6 pt-0 text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const FinalCTA = () => (
    <AnimatedSection className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your First DropBy?</h2>
            <p className="text-xl text-blue-200 mb-10">Join the new era of game promotion. Let's create an unforgettable experience together.</p>
            <button className="bg-white text-blue-700 font-bold py-4 px-10 rounded-full text-xl transition-transform transform hover:scale-105 shadow-2xl">
                Get Started
            </button>
        </div>
    </AnimatedSection>
);

const CollaboratorPage = () => {
    return (
        <div className="bg-gray-900">
            <Hero />
            <CorePhilosophy />
            <WhyCreateWithDropBy />
            <CreativeFormatsShowcase />
            <AnalyticsDashboard />
            <CollaboratorFAQ />
            <FinalCTA />
        </div>
    );
};

export default CollaboratorPage;