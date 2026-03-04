
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-2 left-2 border border-white rounded-full w-16 h-16"></div>
        <div className="absolute bottom-2 right-2 border border-white rounded-full w-20 h-20"></div>
      </div>

      {/* Hoa Mai Vàng decorations */}
      <div className="absolute top-2 left-1/4 opacity-40 pointer-events-none animate-pulse">
        <HoaMai size={30} />
      </div>
      <div className="absolute bottom-2 right-1/4 opacity-40 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}>
        <HoaMai size={35} />
      </div>
      <div className="absolute top-6 right-10 opacity-60 pointer-events-none rotate-12">
        <HoaMai size={25} />
      </div>
      <div className="absolute top-4 left-10 opacity-60 pointer-events-none -rotate-12">
        <HoaMai size={25} />
      </div>
      
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col items-center justify-center relative z-10 text-center">
        {/* School Logo */}
        <div className="mb-2">
          <div className="w-24 h-24 bg-white rounded-full p-2 shadow-2xl border-4 border-yellow-400 flex items-center justify-center overflow-hidden">
  <img 
    src="/logo-nvc.png" 
    alt="Logo THPT Nguyễn Văn Cừ"
    className="w-30 h-30 object-contain"
  />
</div>

        </div>

        {/* Branding Info */}
        <div className="space-y-0.5">
          <h1 className="text-sm md:text-base font-medium tracking-widest uppercase text-yellow-100 opacity-90">
            Trường THPT Nguyễn Văn Cừ
          </h1>
          
          <h1 className="text-xl md:text-4xl font-tet drop-shadow-2xl text-yellow-400 py-1">
            HỘI DIỄN VĂN NGHỆ CHÀO MỪNG KỶ NIỆM 95 NĂM THÀNH LẬP ĐOÀN TNCS HỒ CHÍ MINH (26/3/1931-26/3/2026)
          </h1>
          
          <p className="text-[10px] md:text-sm font-light opacity-80 italic tracking-wide">
            "Tiên phong-Bản lĩnh-Đoàn kết-Sáng tạo-Phát triển"
          </p>
        </div>

        <div className="mt-3 bg-red-800/60 backdrop-blur-md border border-yellow-400/50 px-4 py-1 rounded-full text-[10px] md:text-xs text-yellow-300 font-bold flex items-center gap-2 shadow-lg">
          <HoaMai size={12} />
          TUỔI TRẺ NGUYỄN VĂN CỪ - TIÊN PHONG SỐ, KIẾN TẠO TƯƠNG LAI
          <HoaMai size={12} />
        </div>
      </div>

      <div className="h-1.5 bg-yellow-400 w-full shadow-lg"></div>
    </header>
  );
};

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

export default Header;
