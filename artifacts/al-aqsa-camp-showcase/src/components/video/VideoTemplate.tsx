import { useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { Scene0, Scene1, Scene2, Scene3, Scene4 } from './video_scenes';

export const SCENE_DURATIONS = {
  scene0: 5000,
  scene1: 6000,
  scene2: 6000,
  scene3: 6500,
  scene4: 4000,
};

const SCENES = { scene0: Scene0, scene1: Scene1, scene2: Scene2, scene3: Scene3, scene4: Scene4 };
const SCENE_START_SEC = Object.entries(SCENE_DURATIONS).reduce<Record<string, number>>((out, [key, ms]) => {
  out[key] = Object.values(out).length === 0 ? 0 : Object.entries(SCENE_DURATIONS)
    .slice(0, Object.keys(out).length).reduce((sum, [, duration]) => sum + duration, 0) / 1000;
  return out;
}, {});

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop });
  const audioRef = useRef<HTMLAudioElement>(null);
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENES;
  const Scene = SCENES[baseSceneKey];

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const target = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - target) > 0.18) audio.currentTime = target;
    audio.play().catch(() => {});
  }, [baseSceneKey, currentSceneKey, muted, onSceneChange]);

  return (
    <div
      className="w-full h-screen overflow-hidden relative bg-brand-white"
    >
      <AnimatePresence mode="sync">
        {Scene && <Scene key={currentSceneKey} />}
      </AnimatePresence>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`} preload="auto" autoPlay muted={muted} />
    </div>
  );
}