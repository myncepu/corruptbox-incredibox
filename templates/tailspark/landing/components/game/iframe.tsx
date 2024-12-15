'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoExpand } from "react-icons/io5";
import type { Game } from '@/types/game';
import styles from './iframe.module.css';

export default function GameIframe({ game }: { game: Game }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleFullscreen = async () => {
    try {
      if (containerRef.current) {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await containerRef.current.requestFullscreen();
        }
      }
    } catch (error) {
      console.error('全屏模式出错:', error);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-[calc(100%-2rem)] aspect-video rounded-2xl overflow-hidden bg-gray-900 mx-auto my-4 max-w-5xl"
    >
      {!isPlaying ? (
        <div className="relative w-full h-full">
          {/* 背景图片 */}
          <div className="absolute inset-0">
            <Image
              src={game.thumbnail_url}
              alt={game.title}
              fill
              className={`object-cover blur-sm opacity-30 ${styles.pulsingBackground}`}
            />
          </div>
          
          {/* 添加光影遮罩层 */}
          <div className={`absolute inset-0 ${styles.glowingOverlay}`} />
          
          {/* 内容区域 */}
          <div className="relative h-full flex flex-col items-center justify-center p-6">
            <button
              type="button"
              onClick={handlePlay}
              className="bg-gray-800/80 backdrop-blur-sm text-gray-100 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gray-700 transition mb-6 shadow-lg hover:shadow-xl"
            >
              <IoPlayCircleOutline size={24} />
              <span className="font-medium">PLAY GAME</span>
            </button>
          </div>
        </div>
      ) : (
        // 游戏iframe视图
        <div className="relative w-full h-full bg-gray-900">
          <iframe
            ref={iframeRef}
            src={game.game_url}
            title={game.title}
            className="w-full h-full border-0"
            allow="fullscreen"
          />
        </div>
      )}

      {/* 底部信息栏添加毛玻璃效果 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={game.thumbnail_url}
                alt={game.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-100 uppercase">{game.title}</p>
          </div>
        </div>
        
        {/* 新增全屏按钮 */}
        <button
          type="button"
          onClick={handleFullscreen}
          className="text-gray-100 hover:text-gray-300 transition-colors"
          title="Fullscreen"
        >
          <IoExpand size={24} />
        </button>
      </div>
    </div>
  );
}
