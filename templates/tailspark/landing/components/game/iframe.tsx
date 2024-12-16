'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoPlayCircleOutline, IoExpand, IoContract, IoArrowBack } from "react-icons/io5";
import type { Game } from '@/types/game';
import styles from './iframe.module.css';

interface FullScreenDocument extends Document {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface FullScreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export default function GameIframe({ game }: { game: Game }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleFullscreen = async () => {
    try {
      const container = containerRef.current as FullScreenElement;
      const doc = document as FullScreenDocument;
      
      if (!container) return;

      if (isFullscreen) {
        setIsFullscreen(false);
        document.body.classList.remove(styles.bodyLocked);
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
        return;
      }

      setIsFullscreen(true);
      document.body.classList.add(styles.bodyLocked);
      if (container.requestFullscreen) {
        await container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        await container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        await container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        await container.msRequestFullscreen();
      }
    } catch (error) {
      console.error('全屏模式出错:', error);
      setIsFullscreen(false);
      document.body.classList.remove(styles.bodyLocked);
    }
  };

  useEffect(() => {
    const doc = document as FullScreenDocument;
    
    const handleFullscreenChange = () => {
      const isDocumentFullscreen = doc.fullscreenElement || 
        doc.webkitFullscreenElement || 
        doc.mozFullScreenElement || 
        doc.msFullscreenElement;
      
      if (!isDocumentFullscreen && isFullscreen) {
        setIsFullscreen(false);
        document.body.classList.remove(styles.bodyLocked);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`relative w-[calc(100%-2rem)] h-full aspect-video rounded-2xl overflow-hidden bg-gray-900 mx-auto my-4 max-w-5xl ${
        isFullscreen ? styles.fullscreenContainer : ''
      }`}
    >
      {!isPlaying ? (
        <div className="relative w-full h-full z-40">
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
        <div className="relative w-full h-[calc(100%-2rem)] bg-gray-900">
          <iframe
            ref={iframeRef}
            src={game.game_url}
            title={game.title}
            className={`w-full h-full border-0 ${
              isFullscreen ? styles.fullscreenIframe : ''
            }`}
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      )}

      {/* 返回按钮 */}
      {isFullscreen && (
        <button
          type="button"
          onClick={handleFullscreen}
          className="absolute top-4 left-4 text-gray-100 hover:text-gray-300 transition-colors bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg z-50"
          title="Exit Fullscreen"
        >
          <IoArrowBack size={32} />
        </button>
      )}

      {/* 底部信息栏 */}
      <div className={"absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm px-4 py-2 flex items-center justify-between z-50"}>
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden">
            <Image
              src={game.thumbnail_url}
              alt={game.title}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="font-medium text-gray-100 uppercase truncate">
            {game.title}
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleFullscreen}
          className="ml-4 flex-shrink-0 text-gray-100 hover:text-gray-300 transition-colors z-50"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <IoContract size={32} /> : <IoExpand size={32} />}
        </button>
      </div>
    </div>
  );
}
