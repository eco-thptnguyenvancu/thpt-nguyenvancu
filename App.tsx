
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import YouTubeSection from './components/YouTubeSection';
import DonationBoard from './components/DonationBoard';
import TetDecorations from './components/TetDecorations';
import { Donation } from './types';
import { GoogleGenAI } from '@google/genai';

const MOCK_DONATIONS: Donation[] = [
  { id: '1', name: 'Lớp 12A1', amount: 500000, message: 'Chúc mừng năm mới!', timestamp: new Date() },
  { id: '2', name: 'Ban Giám Hiệu', amount: 2000000, message: 'Chúc hội diễn thành công rực rỡ', timestamp: new Date() },
  { id: '3', name: 'Đoàn Thanh Niên', amount: 1000000, message: 'Sức trẻ Nguyễn Văn Cừ!', timestamp: new Date() },
  { id: '4', name: 'Cựu học sinh khóa 1999-2002', amount: 2000000, message: 'Mãi yêu mái trường xưa', timestamp: new Date() },
  { id: '5', name: 'Phụ huynh em: Lê Tuấn Khanh lớp 10A1', amount: 300000, message: 'Gửi ngàn lời chúc', timestamp: new Date() },
  { id: '6', name: 'Tập thể 11A1', amount: 1500000, message: 'Quyết thắng!', timestamp: new Date() },
  { id: '7', name: 'Nhóm CĐV Bóng chuyền', amount: 5000000, message: 'Xuân ấm áp', timestamp: new Date() },
];

const App: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=idkIAmKz35s&t=246s');
  const [aiGreeting, setAiGreeting] = useState<string>('Chào mừng quý thầy cô và các bạn học sinh đến với Hội Diễn Văn Nghệ trường THPT Nguyễn Văn Cừ! Chào mừng kỷ niệm 95 năm thành lập Đoàn TNCS Hồ Chí Minh (26/3/1931 - 26/3/2026)');
  const [isAddingDonation, setIsAddingDonation] = useState(false);

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  const fetchAiGreeting = useCallback(async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Hãy viết một câu chào mừng ngắn gọn, truyền cảm hứng, tuổi trẻ Nguyễn Văn Cừ  tiên phong số - Kiến tạo tương lai cho buổi biểu diễn văn nghệ của trường THPT Nguyễn Văn Cừ. Tổng số tiền ủng hộ hiện tại là ${totalAmount.toLocaleString()} VNĐ. Hãy nhắc tên trường trong câu chào.`,
        config: {
          temperature: 0.8,
        }
      });
      if (response.text) {
        setAiGreeting(response.text);
      }
    } catch (error) {
      console.error('Error fetching AI greeting:', error);
    }
  }, [totalAmount]);

  useEffect(() => {
    fetchAiGreeting();
  }, [fetchAiGreeting]);

  const handleAddDonation = (newDonation: Omit<Donation, 'id' | 'timestamp'>) => {
    const donation: Donation = {
      ...newDonation,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setDonations([donation, ...donations]);
    setIsAddingDonation(false);
  };

  const handleImportData = (newData: Donation[]) => {
    setDonations(newData);
  };

  return (
    <div className="relative overflow-x-hidden bg-[#fffaf0] min-h-screen">
      <TetDecorations />
      
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 mt-4 relative z-10">
        {/* MAIN FRAME - THE UNIFIED INTERFACE */}
        <div className="bg-white rounded-3xl shadow-2xl border-[12px] border-red-700 overflow-hidden relative">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-8 border-t-8 border-yellow-400 z-20 rounded-tl-xl m-1 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-r-8 border-t-8 border-yellow-400 z-20 rounded-tr-xl m-1 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-8 border-b-8 border-yellow-400 z-20 rounded-bl-xl m-1 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-8 border-b-8 border-yellow-400 z-20 rounded-br-xl m-1 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-stretch min-h-[calc(100vh-120px)]">
            {/* Left Column: 1/3 Vertical Scrolling Donation List */}
            <div className="md:w-1/3 border-r-4 border-red-700 bg-red-50/30 flex flex-col">

  {/* Danh sách scroll độc lập */}
  <div className="flex-1 overflow-y-auto">
    <DonationBoard 
      donations={donations} 
      totalAmount={totalAmount}
      onAddClick={() => setIsAddingDonation(true)}
      onImport={handleImportData}
    />
  </div>

                <DonationBoard 
                donations={donations} 
                totalAmount={totalAmount}
                onAddClick={() => setIsAddingDonation(true)}
                onImport={handleImportData}
              />
            </div>

            {/* Right Column: 2/3 YouTube Video */}
            <div className="md:w-2/3 flex flex-col h-full">
              <YouTubeSection 
                url={youtubeUrl} 
                onUrlChange={setYoutubeUrl} 
                aiGreeting={aiGreeting}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Donation Modal */}
      {isAddingDonation && (
        <DonationModal 
          onClose={() => setIsAddingDonation(false)} 
          onSubmit={handleAddDonation} 
        />
      )}

      <footer className="max-w-7xl mx-auto px-4 text-center mt-8 mb-4">
        <div className="flex flex-col items-center gap-2 pt-4 border-t border-red-200">
          <p className="text-lg font-bold tracking-widest uppercase text-red-800">Trường THPT Nguyễn Văn Cừ</p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] opacity-70 italic w-full">
            <p>© 2026 Ban Tổ Chức Văn Nghệ - THPT Nguyễn Văn Cừ</p>
            <div className="bg-red-800/10 px-3 py-1 rounded-lg not-italic">
              <span className="font-semibold text-red-800">© Copyright:</span> Lê Văn Tuấn
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface DonationModalProps {
  onClose: () => void;
  onSubmit: (donation: Omit<Donation, 'id' | 'timestamp'>) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border-4 border-yellow-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 -mr-12 -mt-12 rotate-45 pointer-events-none"></div>
        <h3 className="text-3xl font-bold text-red-700 mb-6 text-center font-tet">Gửi Lời Ủng Hộ</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-red-800 mb-1 uppercase tracking-wider">Tên cá nhân / Tập thể lớp</label>
            <input 
              type="text" 
              className="w-full border-2 border-red-100 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none transition-all"
              placeholder="Ví dụ: Lớp 12A hoặc Lê Văn Tuấn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-red-800 mb-1 uppercase tracking-wider">Số tiền (VNĐ)</label>
            <input 
              type="number" 
              className="w-full border-2 border-red-100 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none transition-all"
              placeholder="Nhập số tiền ủng hộ..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-red-800 mb-1 uppercase tracking-wider">Lời nhắn gửi / Chúc Tết</label>
            <textarea 
              className="w-full border-2 border-red-100 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none transition-all"
              placeholder="Nhập lời chúc tốt đẹp nhất..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-stretch h-screen">
            <button onClick={onClose} className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-bold text-gray-500">Hủy</button>
            <button onClick={() => name && amount && onSubmit({ name, amount: parseInt(amount), message })} className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg font-bold">Gửi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
