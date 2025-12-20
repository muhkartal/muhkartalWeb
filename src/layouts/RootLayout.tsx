import { ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from '../canvas/Scene';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground">
      {}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true 
          }}
          dpr={[1, 1.5]} 
          performance={{ min: 0.5 }} 
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
