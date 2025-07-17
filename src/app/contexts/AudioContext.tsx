"use client";

import { createContext, useContext, useRef, useState, ReactNode, useCallback } from 'react';

// Tipe untuk nilai yang akan dibagikan oleh context
interface AudioContextType {
  isPlaying: boolean;
  playAudio: () => void;
  toggleAudio: () => void;
}

// Buat context
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Buat Provider Component
export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(() => {
    audioRef.current?.play().then(() => {
        setIsPlaying(true);
    }).catch(error => console.error("Gagal memutar audio:", error));
  }, []);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, playAudio, toggleAudio }}>
      {children}
      {/* Pindahkan tag audio ke sini */}
      <audio ref={audioRef} src="/audio/wedding.mp3" loop />
    </AudioContext.Provider>
  );
}

// Buat custom hook untuk mempermudah penggunaan context
export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio harus digunakan di dalam AudioProvider');
  }
  return context;
}