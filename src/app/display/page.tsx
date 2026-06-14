'use client';

import { useState } from 'react';

// 1. 시간대별 빵 배치 데이터 정의
type BreadShape = 'circle' | 'square' | 'rect-v' | 'rect-h';

interface BreadItem {
  id: string;
  name: string;
  shape: BreadShape;
  // 이미지 레이아웃(그리드) 상의 위치를 지정하기 위한 Tailwind 클래스
  gridClass: string; 
}

interface TimeSlotData {
  [key: string]: BreadItem[];
}
//
const BREAD_DATA: TimeSlotData = {
  '9AM': [
    { id: '1', name: '플레인', shape: 'circle', gridClass: 'col-start-1 row-start-1' },
    { id: '2', name: '플레인', shape: 'square', gridClass: 'col-start-2 row-start-1 justify-self-center' },
    { id: '3', name: '블루베리', shape: 'circle', gridClass: 'col-start-3 row-start-1' },
    { id: '4', name: '차이브 햄버터', shape: 'rect-h', gridClass: 'col-start-4 row-start-1 col-span-2 row-span-2' },
    { id: '5', name: '플레인', shape: 'circle', gridClass: 'col-start-1 row-start-3' },
    { id: '6', name: '플레인', shape: 'rect-v', gridClass: 'col-start-2 row-start-2 row-span-2 justify-self-center' },
    { id: '7', name: '플레인', shape: 'rect-v', gridClass: 'col-start-3 row-start-2 row-span-2 justify-self-center' },
    { id: '8', name: '플레인', shape: 'circle', gridClass: 'col-start-5 row-start-3' },
  ],
  '11AM': [
    // 11AM에는 배치가 바뀌거나 빵 종류가 달라진다고 가정 시 예시 데이터
    { id: '1', name: '소금빵', shape: 'circle', gridClass: 'col-start-1 row-start-1' },
    { id: '3', name: '블루베리', shape: 'circle', gridClass: 'col-start-2 row-start-1' },
    { id: '4', name: '차이브 햄버터', shape: 'rect-h', gridClass: 'col-start-4 row-start-1 col-span-2 row-span-2' },
    { id: '5', name: '플레인', shape: 'circle', gridClass: 'col-start-1 row-start-3' },
  ],
  '2PM': [
    { id: '4', name: '차이브 햄버터', shape: 'rect-h', gridClass: 'col-start-1 row-start-1 col-span-2' },
    { id: '1', name: '품절', shape: 'circle', gridClass: 'col-start-5 row-start-3' },
  ]
};

export default function BreadLayoutPage() {
  const timeSlots = Object.keys(BREAD_DATA);
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);

  // 도형 모양에 따른 Tailwind 스타일 분기 함수
  const getShapeStyles = (shape: BreadShape) => {
    const base = "bg-gray-200 text-black font-bold flex items-center justify-center shadow-sm border border-gray-300 text-center p-2 text-sm sm:text-base";
    switch (shape) {
      case 'circle':
        return `${base} rounded-full aspect-square w-24 sm:w-32`;
      case 'square':
        return `${base} rounded-md aspect-square w-20 sm:w-24`;
      case 'rect-v':
        return `${base} rounded-md w-20 sm:w-24 h-40 sm:h-48`;
      case 'rect-h':
        return `${base} rounded-md w-full h-full min-h-[120px] sm:min-h-[160px]`;
      default:
        return base;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 min-h-screen bg-white">
      {/* 타이틀 및 헤더 */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">🍞 시간대별 빵 진열 배치도</h1>
        <p className="text-xs sm:text-sm text-gray-500">현재 시간대에 맞는 배치도를 확인하고 진열해 주세요.</p>
      </div>

      {/* 시간 선택 탭 버튼 */}
      <div className="flex space-x-2 mb-6 bg-gray-100 p-1.5 rounded-lg">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-md transition-all ${
              selectedTime === time
                ? 'bg-white text-black shadow'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* 빵 배치가 이루어지는 메인 도면 (Grid) */}
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 sm:p-8 bg-gray-50 min-h-[400px] sm:min-h-[500px]">
        {/* 시간 표시 */}
        <div className="text-lg font-bold text-gray-700 mb-6 flex items-center">
          <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          {selectedTime} 배치도
        </div>

        {/* 5열 짜리 그리드 레이아웃 생성 */}
        <div className="grid grid-cols-5 gap-4 items-center justify-items-center">
          {BREAD_DATA[selectedTime]?.map((bread) => (
            <div
              key={bread.id}
              className={`${bread.gridClass} transition-all duration-300 transform hover:scale-105`}
            >
              <div className={getShapeStyles(bread.shape)}>
                {bread.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 알바생 참고용 가이드 팁 */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-xs sm:text-sm text-yellow-800">
        <span className="font-bold">💡 알바생 전달사항:</span> {selectedTime} 이후에는 다음 시간대 버튼을 눌러 미리 준비해야 할 빵 수량을 체크하세요!
      </div>
    </div>
  );
}