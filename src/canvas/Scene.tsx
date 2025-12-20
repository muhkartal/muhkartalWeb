import { Preload } from '@react-three/drei';

export function Scene() {
  return (
    <>
      {}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />

      {}
      <Preload all />
    </>
  );
}
