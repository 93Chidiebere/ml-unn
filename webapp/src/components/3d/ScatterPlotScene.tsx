import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

function DataPoints() {
  // Generate random clustered data points for classification/regression viz
  const points = useMemo(() => {
    const pts = [];
    // Cluster 1 (Blue)
    for (let i = 0; i < 50; i++) {
      pts.push({
        pos: [Math.random() * 3 - 3, Math.random() * 3 - 1, Math.random() * 3 - 1.5],
        color: '#3B82F6'
      });
    }
    // Cluster 2 (Green)
    for (let i = 0; i < 50; i++) {
      pts.push({
        pos: [Math.random() * 3 + 1, Math.random() * 3 + 1, Math.random() * 3 - 1.5],
        color: '#10B981'
      });
    }
    return pts;
  }, []);

  return (
    <group>
      {/* Data Points */}
      {points.map((p, i) => (
        <mesh key={i} position={p.pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={p.color} roughness={0.4} />
        </mesh>
      ))}
      
      {/* Hyperplane (SVM style) */}
      <mesh position={[-0.5, 0.5, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <planeGeometry args={[7, 5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Axes */}
      <Line points={[[-4, -2, 0], [4, -2, 0]]} color="#333333" lineWidth={2} />
      <Line points={[[-4, -2, 0], [-4, 4, 0]]} color="#333333" lineWidth={2} />
      <Line points={[[-4, -2, 0], [-4, -2, -4]]} color="#333333" lineWidth={2} />
    </group>
  );
}

export default function ScatterPlotScene() {
  return (
    <Canvas camera={{ position: [5, 4, 8], fov: 45 }}>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <DataPoints />
      
      <OrbitControls 
        enablePan={true} 
        minDistance={3} 
        maxDistance={15}
        autoRotate={true}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}
