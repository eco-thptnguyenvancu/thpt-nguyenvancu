
import React from 'react';

const TetDecorations: React.FC = () => {
  return (
    <>
      {/* Side lanterns (Lồng đèn) */}
      <div className="fixed top-20 left-4 hidden xl:block z-40 pointer-events-none">
        <div className="flex flex-col gap-8">
           <Lantern color="red" />
           <Lantern color="red" />
           <div className="ml-4"><HoaMai size={30} /></div>
        </div>
      </div>

      <div className="fixed top-20 right-4 hidden xl:block z-40 pointer-events-none">
        <div className="flex flex-col gap-8">
           <Lantern color="red" />
           <Lantern color="red" />
           <div className="mr-4"><HoaMai size={30} /></div>
        </div>
      </div>

      {/* Floating Mai Flowers scattered */}
      <div className="fixed top-1/4 left-1/4 opacity-20 pointer-events-none"><HoaMai size={20} /></div>
      <div className="fixed bottom-1/4 right-1/4 opacity-20 pointer-events-none"><HoaMai size={25} /></div>
      <div className="fixed top-2/3 left-10 opacity-30 pointer-events-none"><HoaMai size={40} /></div>
    </>
  );
};

const Lantern: React.FC<{ color: 'red' | 'yellow' }> = ({ color }) => (
  <div className="relative w-12 h-16 animate-bounce" style={{ animationDuration: '3s' }}>
    <div className={`w-full h-full rounded-2xl ${color === 'red' ? 'bg-red-600' : 'bg-yellow-500'} shadow-lg border-2 border-yellow-400`}></div>
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-yellow-600"></div>
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
        <div className="w-1 h-4 bg-red-400"></div>
        <div className="w-1 h-4 bg-red-400"></div>
    </div>
  </div>
);

const HoaMai: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="12" fill="#FFA000" />
    <circle cx="50" cy="25" r="20" fill="#FFD600" />
    <circle cx="50" cy="75" r="20" fill="#FFD600" />
    <circle cx="25" cy="50" r="20" fill="#FFD600" />
    <circle cx="75" cy="50" r="20" fill="#FFD600" />
    <circle cx="32" cy="32" r="18" fill="#FFEB3B" opacity="0.8" />
    <circle cx="68" cy="68" r="18" fill="#FFEB3B" opacity="0.8" />
    <circle cx="32" cy="68" r="18" fill="#FFEB3B" opacity="0.8" />
    <circle cx="68" cy="32" r="18" fill="#FFEB3B" opacity="0.8" />
  </svg>
);

export default TetDecorations;
