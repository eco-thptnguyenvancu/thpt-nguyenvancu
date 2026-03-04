
import React, { useState } from 'react';

interface YouTubeSectionProps {
  url: string;
  onUrlChange: (url: string) => void;
  aiGreeting: string; // Not used anymore as requested but keeping prop for compatibility
}

const YouTubeSection: React.FC<YouTubeSectionProps> = ({ url, onUrlChange }) => {
  const [inputUrl, setInputUrl] = useState(url);

  const getEmbedUrl = (link: string) => {
    try {
      let videoId = '';
      if (link.includes('v=')) {
        videoId = link.split('v=')[1].split('&')[0];
      } else if (link.includes('youtu.be/')) {
        videoId = link.split('youtu.be/')[1];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
    } catch (e) {
      return '';
    }
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="flex flex-col h-full bg-white p-6 relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="min-w-0">
  <h4 className="text-lg sm:text-m md:text-l font-bold text-red-800 whitespace-nowrap leading-tight">
    TRỰC TIẾP YOUTUBE
  </h4>

  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-bold whitespace-nowrap">
    NGUYENVANCU HIGH SCHOOL
  </p>
</div>

        </div>

        <div className="flex gap-2 w-full md:w-auto">
           <input 
            type="text" 
            placeholder="Dán link YouTube tại đây..."
            className="flex-1 md:w-64 text-sm border-2 border-red-50 rounded-xl px-4 py-2 focus:border-red-300 outline-none transition-all"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button 
            onClick={() => onUrlChange(inputUrl)}
            className="bg-red-800 text-white text-xs px-5 py-2 rounded-xl hover:bg-red-900 font-bold shadow-md transform active:scale-95 transition-all"
          >
            CẬP NHẬT
          </button>
        </div>
      </div>
       <div className="flex-1 mb-4 flex items-center justify-center">
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 ring-4 ring-red-50">
          {embedUrl ? (
           <div className="w-full">
  <div className="relative w-full pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-red-700">
    
    {embedUrl && (
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title="Livestream THPT Nguyễn Văn Cừ"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )}

  </div>
</div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-medium">Đang chờ link video YouTube...</p>
            </div>
          )}
        </div>
      </div>

      {/* Thank You Marquee - Right to Left */}
      <div className="bg-red-800 rounded-xl overflow-hidden relative shadow-lg h-16 flex items-center group">
        <div className="absolute left-0 top-0 bottom-0 bg-yellow-500 px-4 flex items-center z-10 font-bold text-red-900 border-r-2 border-red-900">
          TRI ÂN
        </div>
        <div className="marquee-container flex-1 overflow-hidden h-full flex items-center relative pl-24">
          <div className="animate-marquee-horizontal whitespace-nowrap absolute flex items-center gap-12 group-hover:pause-animation">
            <span className="text-white text-lg font-medium italic">
               🌸 Trường THPT Nguyễn Văn Cừ xin chân thành cảm ơn sự đóng góp của quý phụ huynh, quý thầy cô, các em học sinh và các mạnh thường quân đã luôn đồng hành cùng quỹ văn nghệ Chào Xuân 2026 và kỷ niệm 95 năm thành lập Đoàn TNCS Hồ Chí Minh. Kính chúc mọi người một năm mới An Khang Thịnh Vượng - Vạn Sự Như Ý! 🧧 🌸
            </span>
            <span className="text-white text-lg font-medium italic">
               🌸 Chúc mừng năm mới 2026 - Xuân Bính Ngọ - Vạn sự như ý - Tấn tài tấn lộc - Trường THPT Nguyễn Văn Cừ trân trọng cảm ơn! 🧧 🌸
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-horizontal {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal 40s linear infinite;
        }
        .group-hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default YouTubeSection;
