
import React from 'react';
import { Donation } from '../types';

interface NewsTickerProps {
  donations: Donation[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ donations }) => {
  const recentDonations = donations.slice(0, 5);

  return (
    <div className="bg-white/90 backdrop-blur-md border-4 border-red-200 rounded-2xl h-20 overflow-hidden relative flex items-center shadow-lg">
      <div className="bg-red-700 h-full flex items-center px-8 text-white text-xl font-black uppercase whitespace-nowrap z-10 rounded-l-xl border-r-4 border-yellow-400">
        Tin mới nhận
      </div>
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-yellow-50/50">
        <div className="animate-marquee whitespace-nowrap absolute flex items-center gap-24">
          {recentDonations.length > 0 ? (
            recentDonations.map(d => (
              <span key={d.id} className="text-2xl font-bold text-red-900 drop-shadow-sm">
                <span className="text-3xl">🧧</span> <span className="text-red-600">{d.name}</span> vừa ủng hộ <span className="bg-yellow-200 px-2 py-1 rounded-lg text-red-800">{d.amount.toLocaleString()} VNĐ</span>. Trân trọng cảm ơn!
              </span>
            ))
          ) : (
            <span className="text-xl text-gray-500 italic font-medium">Chào mừng bạn đến với đêm hội văn nghệ Chào mừng kỷ niệm 95 năm thành lập Đoàn TNCS Hồ Chí Minh (26/3/1931-26/3/2026) của trường THPT Nguyễn Văn Cừ!</span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
