'use client';

import { useState } from 'react';

type BreadShape = 'circle' | 'mintCircle' | 'square' | 'longSquare' | 'rect-h';

interface BreadItem {
  id: string;
  name: string;
  shape: BreadShape;
  gridClass: string; 
  // 빵 종류에 맞는 실제 이미지 URL 추가
  imageUrl: string;
}

interface TimeSlotData {
  [key: string]: BreadItem[];
}

const BREAD_DATA: TimeSlotData = {
  '9AM': [
    { id: '1', name: '플레인', shape: 'circle', gridClass: 'col-start-1 row-start-1', imageUrl: '/plain.png' },
    { id: '2', name: '플레인', shape: 'square', gridClass: 'col-start-2 row-start-1', imageUrl: '/plain.png' },
    { id: '3', name: '블루베리', shape: 'mintCircle', gridClass: 'col-start-3 row-start-1', imageUrl: '/plain.png' },
    { id: '4', name: '차이브', shape: 'longSquare', gridClass: 'col-start-4 row-start-1', imageUrl: '/plain.png' },
    { id: '5', name: '햄버터', shape: 'longSquare', gridClass: 'col-start-5 row-start-1', imageUrl: '/plain.png' },
    { id: '6', name: '트러플', shape: 'circle', gridClass: 'col-start-1 row-start-2', imageUrl: '/plain.png' },
    { id: '7', name: '바질', shape: 'longSquare', gridClass: 'col-start-2 row-start-2', imageUrl: '/plain.png' },
    { id: '8', name: '치아씨드', shape: 'longSquare', gridClass: 'col-start-3 row-start-2', imageUrl: '/plain.png' },
    { id: '9', name: '세서미', shape: 'circle', gridClass: 'col-start-4 row-start-2', imageUrl: '/plain.png' },
    { id: '10', name: '패딩턴', shape: 'circle', gridClass: 'col-start-5 row-start-2', imageUrl: '/plain.png' },
  ],
  '11AM': [
    { id: '1', name: '소금빵', shape: 'circle', gridClass: 'col-start-1 row-start-1', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80' },
  ]
};

export default function BreadLayoutPage() {
  const timeSlots = Object.keys(BREAD_DATA);
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);

  // 1. 나무무늬 배경 + 형태 정의 스타일 분기
  const getShapeStyles = (shape: BreadShape) => {
    // Unsplash의 고화질 나무 텍스처를 배경으로 지정하고, 글씨가 잘 보이게 틴트(overlay)를 살짝 깔아줍니다.
    const base = "relative bg-[url('/tree.png')] bg-cover bg-center shadow-md border border-amber-900/20 flex flex-col items-center justify-between p-2 text-center transition-transform";
    const strawBase = "relative bg-[url('/straw.png')] bg-cover bg-center shadow-md border border-amber-900/20 flex flex-col items-center justify-between p-2 text-center transition-transform";
    const mintBase = "relative bg-[url('/mint.jpg')] bg-cover bg-center shadow-md border border-amber-900/20 flex flex-col items-center justify-between p-2 text-center transition-transform";

    switch (shape) {
      case 'circle':
        return `${strawBase} rounded-full aspect-square w-24 sm:w-32`;
      case 'mintCircle':
        return `${mintBase} rounded-full aspect-square w-24 sm:w-32`;
      case 'square':
        return `${base} rounded-xl aspect-square w-20 sm:w-26`;
      case 'longSquare':
        return `${base} rounded-xl w-20 sm:w-26 h-40 sm:h-48`;
      case 'rect-h':
        return `${base} rounded-xl w-full h-full min-h-[120px] sm:min-h-[160px]`;
      default:
        return base;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 min-h-screen bg-amber-50/30">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-amber-900 mb-1">🥖 쇼케이스 빵 배치도</h1>
        <p className="text-xs sm:text-sm text-amber-700/70">진열대(나무 쟁반) 위의 빵 위치를 확인해 주세요.</p>
      </div>

      {/* 시간 선택 탭 */}
      <div className="flex space-x-2 mb-6 bg-amber-900/5 p-1.5 rounded-xl">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition-all ${
              selectedTime === time
                ? 'bg-amber-800 text-white shadow'
                : 'text-amber-800/60 hover:text-amber-900 hover:bg-amber-900/5'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* 2. 대형 진열대 느낌의 메인 판판 (그리드 배경) */}
      <div className="border-4 border-amber-800/40 rounded-2xl p-4 sm:p-8 bg-[#f4ebd0] shadow-inner min-h-[450px]">
        <div className="text-sm font-bold text-amber-950 mb-6 flex items-center bg-white/60 inline-block px-3 py-1 rounded-full border border-amber-900/10">
          📍 {selectedTime} 쇼케이스 라인업
        </div>

        {/* 5열 그리드 공간 */}
        <div className="grid grid-cols-5 gap-4 items-center justify-items-center">
          {BREAD_DATA[selectedTime]?.map((bread) => (
            <div key={bread.id} className={`${bread.gridClass} w-full flex justify-center`}>
              
              {/* 나무 트레이 도우미 구역 */}
              <div className={getShapeStyles(bread.shape)}>
                {/* 나무무늬 위에서 글씨 가독성을 높이기 위한 반투명 오버레이 패널 */}
                <div className="absolute inset-0 bg-amber-950/10 rounded-[inherit] pointer-events-none" />
                
                {/* 빵 이미지 영역 (텍스트처럼 상단/중앙에 자연스럽게 매치) */}
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 my-auto rounded-full overflow-hidden border border-white/40 shadow-sm bg-white/20">
                  <img 
                    src={bread.imageUrl} 
                    alt={bread.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 빵 이름 텍스트 */}
                <span className="relative z-10 text-[11px] sm:text-xs font-black text-amber-950 bg-white/80 px-1.5 py-0.5 rounded shadow-sm max-w-full truncate">
                  {bread.name}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}