import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

function FloatingWord({ word, position, color, scale }: { word: string, position: [number, number, number], color: string, scale: number }) {
  const ref = useRef<any>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[2]) * 0.2;
    }
  });

  return (
    <Text ref={ref} position={position} fontSize={0.5 * scale} color={color} anchorX="center" anchorY="middle">
      {word}
    </Text>
  );
}

function NLPCloud() {
  const words = useMemo(() => {
    const vocab = ['Tokenization', 'Attention', 'Transformers', 'Embeddings', 'Vectors', 'LLM', 'Context', 'Sequence', 'BERT', 'GPT', 'Decoder', 'Encoder'];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    
    return vocab.map((w, i) => ({
      word: w,
      pos: [
        (Math.random() - 0.5) * 8, 
        (Math.random() - 0.5) * 6, 
        (Math.random() - 0.5) * 5
      ],
      color: colors[i % colors.length],
      scale: Math.random() * 0.8 + 0.5
    }));
  }, []);

  return (
    <group>
      {words.map((w, i) => (
        <FloatingWord key={i} word={w.word} position={w.pos as [number, number, number]} color={w.color} scale={w.scale} />
      ))}
    </group>
  );
}

export default function NLPWordCloudScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={1} />
      
      <NLPCloud />
      
      <OrbitControls 
        enablePan={false} 
        minDistance={5} 
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}
