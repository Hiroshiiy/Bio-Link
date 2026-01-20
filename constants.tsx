
import { ThemeConfig, ThemeType } from './types';

export const SELECTED_THEME: ThemeType = 'midnight';

export const THEMES: Record<ThemeType, ThemeConfig> = {
  glass: {
    background: 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100',
    card: 'bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl',
    text: 'text-gray-800',
    accent: 'text-indigo-600',
    button: 'bg-white/60 hover:bg-white/80 transition-all border border-white/50 text-gray-800'
  },
  midnight: {
    background: 'bg-black',
    card: 'bg-zinc-900/80 border border-zinc-800 shadow-2xl',
    text: 'text-slate-100',
    accent: 'text-blue-400',
    button: 'bg-zinc-800 hover:bg-zinc-700 transition-all border border-zinc-700 text-slate-100'
  },
  sunset: {
    background: 'bg-gradient-to-tr from-orange-400 to-rose-500',
    card: 'bg-white/20 backdrop-blur-md border border-white/20 shadow-lg',
    text: 'text-white',
    accent: 'text-yellow-200',
    button: 'bg-white/30 hover:bg-white/40 transition-all border border-white/30 text-white'
  },
  minimal: {
    background: 'bg-white',
    card: 'bg-gray-50 border border-gray-100 shadow-sm',
    text: 'text-gray-900',
    accent: 'text-black',
    button: 'bg-white hover:bg-gray-100 border border-gray-200 transition-all text-gray-900'
  },
  neon: {
    background: 'bg-black',
    card: 'bg-zinc-900 border border-lime-500/30 shadow-[0_0_15px_rgba(132,204,22,0.1)]',
    text: 'text-lime-400',
    accent: 'text-lime-300',
    button: 'bg-zinc-900 hover:bg-lime-500/10 border border-lime-500 transition-all text-lime-400'
  }
};

export const ALL_BADGES = [
  {
    url: 'https://media.discordapp.net/attachments/1255692212717752513/1461132708901158912/6f0217fef9f9941b7c5ce600b64d84d3.gif?ex=6970b1a0&is=696f6020&hm=45f6073ebc4c5bcd524f6599a660cf359ea6e727f34946edf348ebe857cd7dba&=',
    title: 'Gengar'
  },
  {
    url: 'https://media.discordapp.net/attachments/1255692212717752513/1458707426525188136/822aba46a059fddb0f1b42d99f77cfd8.gif?ex=697070a7&is=696f1f27&hm=340ee75cf9b8a66dd6d83bf5a6dc527630a46622e76e08c82091cfc64976daf1&=',
    title: 'Linux User'
  },
  {
    url: 'https://media.discordapp.net/attachments/1255692212717752513/1458707425313030299/f792c4bdf5634c6ab0ddd76efa6e2dfb.gif?ex=697070a7&is=696f1f27&hm=3e0f1e3dbd52cbcff431dd37c755b70fc476c17fd63b3ea172e93a6dd9038bf1&=&width=665&height=684',
    title: 'Lain'
  },
  {
    url: 'https://media.discordapp.net/attachments/1255692212717752513/1458707426097365013/2aa78b957885b5e18ee853304521a1b5.gif?ex=697070a7&is=696f1f27&hm=5bd813496283e4d55da261e9fae4b7245996f90a6ffc7ada2796b4323fc5b091&=',
    title: 'Maconhaaaa'
  }
];

export const BIO_DATA = {
  name: 'hiroshi',
  bio: 'silence is the only one that helps me',
  avatarUrl: 'https://i.pinimg.com/736x/52/c5/65/52c565a665496778d4f67763bbbf8eb9.jpg',
  backgroundVideo: 'assets/video.mp4',
  cardBackground: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop', 
  location: 'Moscow, Russia',
  views: '0',
  roblox: {
    username: 'AiAskoX',
    displayName: 'mlkpureza',
    avatar: 'https://tr.rbxcdn.com/30DAY-Avatar-3A9ECE2388A4BCA2D007E377A9D608F3-Png/720/720/Avatar/Webp/noFilter',
    profileUrl: 'https://www.roblox.com/pt/users/8524921752/profile'
  },
  socials: {
    github: 'AiAskoX'
  },
  links: []
};
