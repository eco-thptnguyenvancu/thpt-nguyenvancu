import React, { useRef } from 'react';
import { Donation } from '../types';

interface DonationBoardProps {
  donations: Donation[];
  totalAmount: number;
  onAddClick: () => void;
  onImport: (newData: Donation[]) => void;
}

const DonationBoard: React.FC<DonationBoardProps> = ({ donations, totalAmount, onAddClick, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    const csvContent = "Tên,Số Tiền,Lời Nhắn\nLớp 12A1,500000,Chúc mừng năm mới!\nLê Văn Tuấn,200000,Ủng hộ văn nghệ trường\nCựu học sinh khóa 2015,1000000,Mãi yêu mái trường xưa";
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mau_danh_sach_ung_ho_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const hasHeader = lines[0].toLowerCase().includes('tên') || lines[0].toLowerCase().includes('tiền');
      const dataLines = hasHeader ? lines.slice(1) : lines;

      const importedData: Donation[] = dataLines.map((line, index) => {
        const parts = line.split(',');
        const name = parts[0]?.replace(/"/g, '').trim() || 'Người ẩn danh';
        const amount = parseInt(parts[1]?.replace(/"/g, '').trim() || '0');
        const message = parts[2]?.replace(/"/g, '').trim() || '';

        return {
          id: `import-${index}-${Date.now()}`,
          name,
          amount: isNaN(amount) ? 0 : amount,
          message,
          timestamp: new Date(),
        };
      }).filter(item => item.amount > 0);

      if (importedData.length > 0) {
        onImport(importedData);
        alert(`Đã nhập thành công ${importedData.length} lượt ủng hộ!`);
      } else {
        alert('Không tìm thấy dữ liệu hợp lệ trong file.');
      }
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  return (
    /* Thêm h-full và flex-1 để đảm bảo bao phủ toàn bộ chiều cao của cột trái */
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm relative border-r border-gray-200">

      {/* HEADER - Cố định ở trên */}
      <div className="bg-red-700 text-white p-5 text-center border-b-4 border-yellow-400 shadow-md flex-shrink-0">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-1">BẢNG VÀNG DANH DỰ</h2>
        <div className="text-3xl font-bold text-yellow-300">
          {totalAmount.toLocaleString()} <span className="text-sm text-white/80">VNĐ</span>
        </div>
      </div>

      {/* CONTROL BAR - Cố định ở trên */}
      <div className="p-3 bg-yellow-50 flex flex-col gap-2 border-b border-red-100 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-red-800 uppercase">Lượt ủng hộ: {donations.length}</span>
          <button onClick={downloadTemplate} className="text-[9px] text-blue-600 font-bold underline">
            📥 Tải file mẫu CSV
          </button>
        </div>

        <div className="flex gap-1">
          <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-green-600 hover:bg-green-700 transition-colors text-white text-[9px] font-bold px-3 py-2 rounded-lg">
            📂 Chọn File Excel
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />

          <button onClick={onAddClick} className="flex-1 bg-red-600 hover:bg-red-700 transition-colors text-white text-[9px] font-bold px-3 py-2 rounded-lg">
            ✍️ Nhập Tay
          </button>
        </div>
      </div>

      {/* LIST AREA - Quan trọng: flex-1 sẽ đẩy Footer xuống dưới cùng */}
      <div className="flex-1 relative overflow-hidden bg-[#fffdfa]">
        <div className="absolute inset-0 flex flex-col items-center">
          <div
            className="w-full px-4 scroll-content"
            style={{ animation: `scrollUp ${Math.max(20, donations.length * 5)}s linear infinite` }}
          >
            {/* Double the list for seamless loop */}
            {[...donations, ...donations].map((d, index) => (
              <div key={`${d.id}-${index}`} className="my-3 p-4 rounded-xl border-2 bg-white border-red-50 shadow-sm">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-red-800">{d.name}</span>
                  <span className="text-green-700 font-bold">+{d.amount.toLocaleString()}đ</span>
                </div>
                {d.message && <p className="text-xs text-gray-500 italic">"{d.message}"</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER - Sẽ luôn nằm ở đáy của component */}
      <div className="p-4 text-center text-[10px] text-red-900 bg-yellow-400 font-bold uppercase tracking-widest flex-shrink-0 border-t border-yellow-500 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        TRÂN TRỌNG CẢM ƠN QUÝ MẠNH THƯỜNG QUÂN
      </div>

      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); } 
        }
        .scroll-content:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default DonationBoard;