import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

function TreeNode({ position, label, color = '#10B981' }: { position: [number, number, number], label: string, color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.4, 32, 32]}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} emissive={color} emissiveIntensity={0.3} />
      </Sphere>
      <Text position={[0, -0.7, 0]} fontSize={0.25} color="white" anchorX="center">{label}</Text>
    </group>
  );
}

function Branch({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  return (
    <Line
      points={[start, end]}
      color="#4B5563"
      lineWidth={2}
      transparent
      opacity={0.5}
    />
  );
}

function TreeGeometry() {
  const nodes = [
    { id: 'root', pos: [0, 3, 0], label: 'Income > $50k?' },
    { id: 'l1', pos: [-2, 1, 0], label: 'Age > 30?' },
    { id: 'r1', pos: [2, 1, 0], label: 'Debt < $10k?' },
    { id: 'l1_l2', pos: [-3, -1, 0], label: 'Reject', color: '#EF4444' },
    { id: 'l1_r2', pos: [-1, -1, 0], label: 'Approve', color: '#10B981' },
    { id: 'r1_l2', pos: [1, -1, 0], label: 'Review', color: '#F59E0B' },
    { id: 'r1_r2', pos: [3, -1, 0], label: 'Approve', color: '#10B981' },
  ];

  const branches = [
    { start: [0, 3, 0], end: [-2, 1, 0] },
    { start: [0, 3, 0], end: [2, 1, 0] },
    { start: [-2, 1, 0], end: [-3, -1, 0] },
    { start: [-2, 1, 0], end: [-1, -1, 0] },
    { start: [2, 1, 0], end: [1, -1, 0] },
    { start: [2, 1, 0], end: [3, -1, 0] },
  ];

  return (
    <group position={[0, -1, 0]}>
      {branches.map((b, i) => (
        <Branch key={`branch-${i}`} start={b.start as [number, number, number]} end={b.end as [number, number, number]} />
      ))}
      {nodes.map((n, i) => (
        <TreeNode key={`node-${i}`} position={n.pos as [number, number, number]} label={n.label} color={n.color} />
      ))}
    </group>
  );
}

export default function DecisionTreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <TreeGeometry />
      
      <OrbitControls 
        enablePan={false} 
        minDistance={4} 
        maxDistance={12}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
