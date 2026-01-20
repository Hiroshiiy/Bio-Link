
import React, { useState, useEffect, useRef } from 'react';
import { THEMES, BIO_DATA, SELECTED_THEME, ALL_BADGES } from './constants';
import { 
  Github,
  Gamepad2,
  Eye,
  MapPin
} from 'lucide-react';

const CURSOR_URL = 'https://media.discordapp.net/attachments/1233881524550635650/1462912989140090952/image.png?ex=69709424&is=696f42a4&hm=247bb4f607a39d0e3edd6661f3b0b98687f6301db81f5f4cf76ec4e03c596373&=&format=webp&quality=lossless';
const DISCORD_DND_STATUS = 'https://assets.guns.lol/dnd.png';
const COUNTER_NAMESPACE = 'hiroshi_bio_stats_v2'; 
const COUNTER_KEY = 'profile_views';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = target && (
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      );
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-2px, -2px) ${isPointer ? 'scale(1.1)' : 'scale(1)'}`
      }}
    >
      <img 
        src={CURSOR_URL} 
        alt="Cursor" 
        className="w-5 h-auto" 
      />
    </div>
  );
};

const TypewriterName: React.FC<{ name: string, className?: string }> = ({ name, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(name.substring(0, displayText.length + 1));
        setSpeed(150);

        if (displayText === name) {
          setIsDeleting(true);
          setSpeed(2000); 
        }
      } else {
        setDisplayText(name.substring(0, displayText.length - 1));
        setSpeed(100);

        if (displayText === '') {
          setIsDeleting(false);
          setSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, name, speed]);

  return (
    <h1 className={`${className} neon-text inline-block`}>
      {displayText}
      <span className="animate-pulse ml-1 opacity-70">|</span>
    </h1>
  );
};

const App: React.FC = () => {
  const themeConfig = THEMES[SELECTED_THEME] || THEMES.midnight;
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [views, setViews] = useState<string>(BIO_DATA.views);

  useEffect(() => {
    const handleViews = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const lastVisit = localStorage.getItem('hiroshi_last_visit');
        
        let url = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;
        
        if (lastVisit !== today) {
          url += '/up';
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(url, { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setViews(new Intl.NumberFormat('en-US').format(data.count));
          
          if (lastVisit !== today) {
            localStorage.setItem('hiroshi_last_visit', today);
          }
        } else {
          const retryResponse = await fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
          if (retryResponse.ok) {
            const data = await retryResponse.json();
            setViews(new Intl.NumberFormat('en-US').format(data.count));
          }
        }
      } catch (error) {
        console.warn("View counter error:", error);
        // Se der erro, mantemos o 0 que está no BIO_DATA ou o que já foi carregado
      }
    };

    handleViews();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className={`min-h-screen relative flex flex-col items-center justify-center px-4 py-12 md:px-6 md:py-20 transition-colors duration-500 overflow-x-hidden ${themeConfig.background} bg-black`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20 grayscale"
      >
        <source src={`./${BIO_DATA.backgroundVideo}`} type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/85 -z-10 backdrop-blur-[6px]"></div>

      <CustomCursor />
      
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d'
        }}
        className="w-full max-w-[900px] flex flex-col space-y-8 md:space-y-12 mt-4 md:mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 items-center"
      >
        
        <header className="w-full flex flex-col items-center space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
            
            <div className="flex flex-col items-center md:items-start">
              <TypewriterName 
                name={BIO_DATA.name} 
                className={`text-4xl md:text-6xl font-black tracking-tighter min-h-[45px] md:min-h-[65px] ${themeConfig.text}`} 
              />
              <span className={`text-[10px] md:text-xs font-bold opacity-30 -mt-1 md:-mt-2 tracking-[0.2em] uppercase ${themeConfig.text}`}>
                @hiroshiswaggggggg
              </span>
            </div>
            
            <div className={`h-12 w-[1px] opacity-20 bg-current ${themeConfig.text} hidden md:block`}></div>

            <div className="flex items-center gap-2 md:gap-3 p-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/5 shadow-2xl">
              {ALL_BADGES.map((badge, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-950 border border-white/10 rounded-lg text-white text-[10px] md:text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl scale-75 group-hover:scale-100 z-50">
                    {badge.title}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 border-r border-b border-white/10 rotate-45"></div>
                  </div>

                  <img 
                    src={badge.url} 
                    alt={badge.title} 
                    className="w-8 h-8 md:w-11 md:h-11 rounded-lg object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all cursor-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className={`text-base md:text-xl font-medium opacity-60 max-w-[450px] leading-relaxed tracking-tight text-center px-4 ${themeConfig.text}`}>
            {BIO_DATA.bio}
          </p>
        </header>

        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch px-4">
          <div 
            className="relative flex-1 min-w-full md:min-w-[300px] h-[120px] md:h-[140px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex items-center px-4 md:px-6 backdrop-blur-md bg-zinc-950/40 transition-all duration-500"
          >
            <div className="relative flex items-center w-full">
              <div className="relative flex-shrink-0">
                <img 
                  src={BIO_DATA.avatarUrl} 
                  alt={BIO_DATA.name} 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[2px] border-white/10 object-cover grayscale-[0.2]"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-black rounded-full flex items-center justify-center border-[2px] md:border-[3px] border-[#0a0a0a]">
                  <img src={DISCORD_DND_STATUS} alt="DND" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="ml-4 flex flex-col justify-center overflow-hidden">
                <h2 className="text-white text-xl md:text-2xl font-bubbly uppercase tracking-wide truncate">
                  {BIO_DATA.name}
                </h2>
              </div>
            </div>
          </div>

          <a 
            href={BIO_DATA.roblox.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex-1 min-w-full md:min-w-[300px] h-[120px] md:h-[140px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex items-center px-4 md:px-6 backdrop-blur-md bg-zinc-950/40 cursor-none"
          >
            <div className="relative flex items-center w-full">
              <div className="relative flex-shrink-0">
                <img 
                  src={BIO_DATA.roblox.avatar} 
                  alt="Roblox Avatar" 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-zinc-950 border-[2px] border-white/5 object-contain grayscale-[0.1]"
                />
                <div className="absolute -top-2 -right-2 bg-zinc-950 p-1 md:p-1.5 rounded-lg border border-white/5 shadow-lg">
                   <Gamepad2 size={12} className="text-white md:hidden" />
                   <Gamepad2 size={14} className="text-white hidden md:block" />
                </div>
              </div>
              <div className="ml-4 flex flex-col justify-center overflow-hidden">
                <h2 className="text-white text-xl md:text-2xl font-bubbly uppercase tracking-wide truncate">
                  {BIO_DATA.roblox.displayName}
                </h2>
                <p className="text-white/20 text-[8px] md:text-[10px] font-bold tracking-widest uppercase">
                  @{BIO_DATA.roblox.username}
                </p>
                <span className="text-zinc-600 text-[9px] md:text-[11px] font-medium mt-1">
                  (click here)
                </span>
              </div>
            </div>
          </a>
        </div>

        <div className="flex justify-center gap-10 px-1 pt-4 w-full">
          {BIO_DATA.socials.github && (
            <a 
              href={`https://github.com/${BIO_DATA.socials.github}`}
              target="_blank"
              rel="noopener noreferrer" 
              className={`${themeConfig.text} opacity-40 hover:opacity-100 transition-all cursor-none hover:scale-110 active:scale-95`}
              aria-label="GitHub"
            >
              <Github size={28} />
            </a>
          )}
        </div>

        <div className="w-full flex flex-col items-start px-4 md:px-8 pt-2 space-y-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 group">
              <Eye size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
              <span className="text-white/20 text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase group-hover:text-white/40 transition-colors">
                Profile Views: <span className="text-white/40 ml-1">{views}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2 group">
              <MapPin size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
              <span className="text-white/20 text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase group-hover:text-white/40 transition-colors">
                Location: <span className="text-white/40 ml-1">{BIO_DATA.location}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
