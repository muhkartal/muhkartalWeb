# Assets Directory

Place your static assets here.

- **models/**: GLTF/GLB 3D models
- **textures/**: Images for 3D materials
- **images/**: Standard UI images

## Usage

```tsx
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/assets/models/my-model.glb');
  return <primitive object={scene} />;
}
```

