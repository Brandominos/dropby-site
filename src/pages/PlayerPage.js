import React, { useState, useRef, useEffect } from 'react';
import {
    Gift,
    Compass,
    Zap,
    ChevronsDown,
    ChevronsUp
} from 'lucide-react';

// --- Visibility hook & animation wrapper (copied from other pages) --- //
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
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [ref, options]);

    return [ref, isVisible];
};

const AnimatedSection = ({ children, className = '' }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

// --- Section components --- //
const Hero = () => (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent animate-pulse"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                More Game. <span className="text-yellow-300">Less Grind.</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
                Discover new worlds and earn credits for awesome in-game rewards, just by playing. No purchases, no catch. Welcome to DropBy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="bg-white text-orange-600 font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg hover:bg-yellow-50">
                    Get the DropBy Hub
                </a>
                <a href="#rewards" className="text-white hover:text-yellow-200 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 border border-white/50 hover:border-yellow-300 hover:bg-white/10">
                    Explore Partner Games
                </a>
            </div>
        </div>
    </section>
);

const WhatIsDropBy = () => (
    <AnimatedSection className="py-24 bg-gradient-to-b from-yellow-50 to-white" id="about">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Your All-Access Pass to a Bigger Universe.</h2>
                <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
                    Tired of hitting paywalls or grinding for hours? We team up with your favorite VR games to bring you <span className="font-semibold text-orange-600">Drops</span>, special crossover events and mini-games. Play a Drop, earn DropBy Credits, and redeem them for real items, skins, and power-ups across our entire network.
                </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="p-8 rounded-xl border border-orange-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-200 to-orange-300 text-orange-700 flex items-center justify-center rounded-full text-3xl">🎮</div>
                    <p className="font-semibold text-gray-800">Play a Drop</p>
                </div>
                <div className="p-8 rounded-xl border border-orange-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-300 to-orange-400 text-orange-800 flex items-center justify-center rounded-full text-3xl">💰</div>
                    <p className="font-semibold text-gray-800">Earn Credits</p>
                </div>
                <div className="p-8 rounded-xl border border-orange-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-300 to-orange-500 text-white flex items-center justify-center rounded-full text-3xl">🎁</div>
                    <p className="font-semibold text-gray-800">Redeem Rewards</p>
                </div>
                <div className="p-8 rounded-xl border border-orange-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center rounded-full text-3xl">🕶️</div>
                    <p className="font-semibold text-gray-800">In Your Fav Game</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const perks = [
    {
        icon: <Gift className="w-8 h-8" />,
        title: "Get Real In-Game Loot",
        description: "Spend your universal DropBy Credits on that cool helmet in 'Galaxy Runners' or a new paint job in 'Mech Warriors.' Real gear, totally free."
    },
    {
        icon: <Compass className="w-8 h-8" />,
        title: "Discover Your Next Fav Game",
        description: "Drops are your DropBy to new adventures. Get a free, no-strings-attached taste of amazing VR titles. And get paid to try them."
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Skip the Grind",
        description: "Why farm the same quest for hours? A 5-minute Drop can give you the same rewards so you can get back to the fun."
    }
];

const PlayerPerks = () => (
    <AnimatedSection className="py-24 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">The Best Part? It's All Free.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {perks.map((perk, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-orange-100 hover:border-orange-200">
                        <div className="text-orange-500 mb-4 flex justify-center">{perk.icon}</div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-800">{perk.title}</h3>
                        <p className="text-gray-600">{perk.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

const rewardsMock = [
    { name: 'Cosmic Blade Skin', game: 'Galaxy Runners', cost: 500 },
    { name: 'Chrono-Armor Set', game: 'Chrono Clash', cost: 750 },
    { name: 'Pet Dragonling', game: 'Aetheria Online', cost: 600 }
];

const partnerLogos = ['Chrono Clash', 'Galaxy Runners', 'Aetheria Online', 'Starfall', 'CyberDrift'];

const RewardsShowcase = () => (
    <AnimatedSection id="rewards" className="py-24 bg-gradient-to-br from-orange-600 via-orange-700 to-yellow-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Awesome Rewards are Waiting.</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {rewardsMock.map((item, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 flex flex-col hover:bg-white/20 hover:scale-105 hover:border-white/40 transition-all duration-300 cursor-pointer">
                        <div className="h-40 bg-white/20 rounded-lg mb-4 flex items-center justify-center text-orange-200">[Art]</div>
                        <h3 className="font-semibold text-xl mb-1 text-white">{item.name}</h3>
                        <p className="text-sm text-orange-200 mb-4">{item.game}</p>
                        <span className="mt-auto font-bold text-yellow-300">C {item.cost}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center flex-wrap gap-6 opacity-75">
                {partnerLogos.map(l => (
                    <span key={l} className="text-orange-200 uppercase tracking-wider text-sm">{l}</span>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

const HubAppSection = () => (
    <AnimatedSection className="py-24 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Your Mission Control for Rewards.</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Download our free Meta Quest app to track your credits, browse the reward catalog, discover new Drops, and claim your daily bonus. It's everything DropBy, all in one place.
                </p>
                <a href="#" className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg">
                    Download on App Lab
                </a>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 h-96 rounded-3xl flex items-center justify-center text-orange-600 border-2 border-orange-200">
                [Hub App UI Mockup]
            </div>
        </div>
    </AnimatedSection>
);

const FAQ = () => {
    const questions = [
        {
            q: "Is this really free? What's the catch?",
            a: "Yes. 100% free. Game devs use Drops to showcase their games. You get rewarded for checking them out."
        },
        {
            q: "Do my DropBy Credits expire?",
            a: "Nope! They're yours until you spend them."
        },
        {
            q: "Where can I find games that have Drops?",
            a: "Browse our Partner Games list in the Hub app. We're adding new titles all the time."
        },
        {
            q: "Do I need the Hub app to earn credits?",
            a: "No. You earn credits just by playing Drops. The app is for tracking your balance and snagging bonuses."
        },
        {
            q: "Is my personal data safe?",
            a: "Absolutely. We only use anonymized stats to know which Drops are popular. We never sell your info."
        }
    ];

    const [open, setOpen] = useState(null);
    return (
        <AnimatedSection className="py-20 md:py-32 bg-gradient-to-b from-orange-50 to-yellow-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Got Questions? We've Got Answers.</h2>
                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className="bg-white border border-orange-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-orange-50 transition-colors">
                                <span>{item.q}</span>
                                {open === i ? <ChevronsUp className="text-orange-500" /> : <ChevronsDown className="text-orange-500" />}
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

const FinalCTA = () => (
    <section className="py-24 bg-gradient-to-br from-yellow-500 via-orange-500 to-orange-600 text-white text-center">
        <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Adventure.</h2>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">Dive into a bigger world of play. Download the Hub and look for DropBys in your favorite games today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="bg-white text-orange-600 font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg hover:bg-yellow-50">
                    Download on App Lab
                </a>
                <a href="#rewards" className="border-2 border-white font-semibold py-4 px-8 rounded-full text-lg transition-all hover:bg-white hover:text-orange-600">
                    See All Partner Games
                </a>
            </div>
        </AnimatedSection>
    </section>
);

const PlayerPage = () => {
    return (
        <main>
            <Hero />
            <WhatIsDropBy />
            <PlayerPerks />
            <RewardsShowcase />
            <HubAppSection />
            <FAQ />
            <FinalCTA />
        </main>
    );
};

export default PlayerPage; 