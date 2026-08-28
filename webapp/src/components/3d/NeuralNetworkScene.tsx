import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

// A single animated node
function Neuron({ position, color = '#22c55e' }: { position: [number, number, number], color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.3, 32, 32]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
    </Sphere>
  );
}

// A connection between two nodes
function Connection({ start, end, color = '#333333' }: { start: [number, number, number], end: [number, number, number], color?: string }) {
  const ref = useRef<any>(null);
  
  // Create a pulsing effect on the line material
  useFrame((state) => {
    if (ref.current && ref.current.material) {
      ref.current.material.opacity = 0.3 + (Math.sin(state.clock.elapsedTime * 2 + start[0]) + 1) * 0.2;
    }
  });

  return (
    <Line
      ref={ref}
      points={[start, end]}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.5}
    />
  );
}

// The entire network visualization
function NetworkGeometry() {
  const inputLayer = [
    [-3, 1.5, 0],
    [-3, 0, 0],
    [-3, -1.5, 0]
  ];
  
  const hiddenLayer = [
    [0, 2, 0],
    [0, 0.75, 0],
    [0, -0.75, 0],
    [0, -2, 0]
  ];
  
  const outputLayer = [
    [3, 0.5, 0],
    [3, -0.5, 0]
  ];

  return (
    <group>
      {/* Draw Nodes */}
      {inputLayer.map((pos, i) => <Neuron key={`in-${i}`} position={pos as [number, number, number]} color="#3b82f6" />)}
      {hiddenLayer.map((pos, i) => <Neuron key={`hid-${i}`} position={pos as [number, number, number]} color="#22c55e" />)}
      {outputLayer.map((pos, i) => <Neuron key={`out-${i}`} position={pos as [number, number, number]} color="#ef4444" />)}
      
      {/* Draw Connections Input -> Hidden */}
      {inputLayer.map((startPos, i) => (
        hiddenLayer.map((endPos, j) => (
          <Connection key={`conn-in-${i}-hid-${j}`} start={startPos as [number, number, number]} end={endPos as [number, number, number]} />
        ))
      ))}
      
      {/* Draw Connections Hidden -> Output */}
      {hiddenLayer.map((startPos, i) => (
        outputLayer.map((endPos, j) => (
          <Connection key={`conn-hid-${i}-out-${j}`} start={startPos as [number, number, number]} end={endPos as [number, number, number]} />
        ))
      ))}

      {/* Labels */}
      <Text position={[-3, 3, 0]} fontSize={0.4} color="white" anchorX="center">Input Layer</Text>
      <Text position={[0, 3, 0]} fontSize={0.4} color="white" anchorX="center">Hidden Layer</Text>
      <Text position={[3, 3, 0]} fontSize={0.4} color="white" anchorX="center">Output Layer</Text>
    </group>
  );
}

export default function NeuralNetworkScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
      
      <NetworkGeometry />
      
      <OrbitControls 
        enablePan={false} 
        minDistance={3} 
        maxDistance={15}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
