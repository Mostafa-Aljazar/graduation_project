import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Repeat, Volume2, VolumeX } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const DETAILS: Record<string, { title: string; filePath: string }> = {
  scene0: { title: 'الرسالة', filePath: 'src/components/video/video_scenes/Scene0.tsx' },
  scene1: { title: 'الأثر', filePath: 'src/components/video/video_scenes/Scene1.tsx' },
  scene2: { title: 'الخدمات', filePath: 'src/components/video/video_scenes/Scene2.tsx' },
  scene3: { title: 'قصص النجاح', filePath: 'src/components/video/video_scenes/Scene3.tsx' },
  scene4: { title: 'الأمل', filePath: 'src/components/video/video_scenes/Scene4.tsx' },
};

function formatTime(ms: number) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const controls = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const sensorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setElapsed(0);
    const start = performance.now();
    const timer = window.setInterval(() => setElapsed(performance.now() - start), 60);
    return () => window.clearInterval(timer);
  }, [controls.tick]);

  const handleJump = useCallback((index: number) => {
    controls.jumpTo(index);
    const detail = DETAILS[controls.sceneKeys[index]];
    if (detail) {
      window.parent.postMessage({
        type: 'REPLIT_VIDEO_SCENE_SELECTED',
        payload: { sceneIndex: index, sceneCount: controls.sceneKeys.length, sceneTitle: detail.title, filePath: detail.filePath, lineNumber: 1 },
      }, '*');
    }
  }, [controls]);

  if (!isIframed) return <VideoTemplate />;

  const progress = controls.activeDuration
    ? Math.min(100, (elapsed / controls.activeDuration) * 100)
    : 0;
  const totalElapsed = Math.min(
    controls.totalDuration,
    controls.activeStartTime + Math.min(elapsed, controls.activeDuration),
  );
  const visible = !collapsed || hovering;

  return (
    <div className="relative w-full h-screen">
      <VideoTemplate
        key={controls.mountKey}
        durations={controls.durations}
        loop
        muted={muted}
        onSceneChange={controls.onSceneChange}
      />
      <div
        ref={sensorRef}
        className="absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-end"
        style={{ height: '25%' }}
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovering(true)}
        onPointerLeave={(event) => event.pointerType === 'mouse' && setHovering(false)}
      >
        <div className="flex-1" />
        <div className={`flex items-center gap-3 bg-black/55 px-5 py-4 text-white backdrop-blur-md transition-all ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
          <button className={`h-14 w-14 rounded-lg grid place-items-center ${controls.locked ? 'bg-white/20' : 'text-white/65'}`} onClick={controls.toggleLock} aria-label="تكرار المشهد" aria-pressed={controls.locked}><Repeat /></button>
          <button className="h-14 w-14 rounded-lg grid place-items-center text-white/75" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}>{muted ? <VolumeX /> : <Volume2 />}</button>
          <div className="h-10 w-px bg-white/20" />
          <div className="flex flex-1 gap-1.5">
            {controls.sceneKeys.map((key, index) => (
              <button key={key} onClick={() => handleJump(index)} className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/20" aria-label={`المشهد ${index + 1}`}>
                <span className="absolute inset-y-0 left-0 rounded-full bg-white/90" style={{ width: index === controls.activeIndex ? `${progress}%` : '0%' }} />
              </button>
            ))}
          </div>
          <span className="font-mono text-xl text-white/70">{controls.activeIndex + 1}/{controls.sceneKeys.length}</span>
          <span className="min-w-[11ch] text-right font-mono text-xl text-white/85">{formatTime(totalElapsed)} / {formatTime(controls.totalDuration)}</span>
          <button className="h-14 w-14 rounded-lg grid place-items-center text-white/70" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? 'إظهار عناصر التحكم' : 'إخفاء عناصر التحكم'}>{collapsed ? <ChevronUp /> : <ChevronDown />}</button>
        </div>
      </div>
    </div>
  );
}