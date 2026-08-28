import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import NeuralNetworkScene from './3d/NeuralNetworkScene';
import DecisionTreeScene from './3d/DecisionTreeScene';
import ScatterPlotScene from './3d/ScatterPlotScene';
import NLPWordCloudScene from './3d/NLPWordCloudScene';
import coursesData from '../data/courses.json';

function renderScene(visualType: string, keyId: string) {
  switch (visualType) {
    case 'decision-tree':
      return <DecisionTreeScene key={keyId} />;
    case 'scatter-plot':
      return <ScatterPlotScene key={keyId} />;
    case 'nlp-scene':
      return <NLPWordCloudScene key={keyId} />;
    case 'neural-network':
    default:
      return <NeuralNetworkScene key={keyId} />;
  }
}

export default function CourseView() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.find(c => c.id === courseId);
  
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-500 font-mono text-sm">
        [ERROR] Course payload not found
      </div>
    );
  }

  const activeModule = course.modules[activeModuleIndex];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-900 bg-black/90 h-14 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="h-4 w-px bg-gray-800"></div>
          <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">{course.title}</span>
        </div>
        <div className="text-[10px] font-mono text-gray-600 border border-gray-800 px-2 py-1 rounded">
          STATUS: ACTIVE
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Module List (Config Style) */}
        <div className="w-[350px] border-r border-gray-900 bg-[#050505] overflow-y-auto shrink-0 flex flex-col">
          <div className="p-6 border-b border-gray-900">
            <h1 className="text-lg font-medium mb-1">Module Selection</h1>
            <p className="text-xs text-gray-500 font-mono">Select a topic to render its spatial model.</p>
          </div>
          
          <div className="p-4 flex-1">
            <div className="space-y-1">
              {course.modules.map((mod, idx) => {
                const isActive = activeModuleIndex === idx;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleIndex(idx)}
                    className={`w-full text-left p-3 rounded border text-sm flex items-start gap-3 transition-all ${
                      isActive 
                        ? 'bg-[#111] border-gray-700 text-white shadow-sm' 
                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-[#0a0a0a]'
                    }`}
                  >
                    <div className={`mt-0.5 shrink-0 ${isActive ? 'text-ml-green' : 'text-gray-700'}`}>
                      {isActive ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </div>
                    <span className="leading-snug">{mod.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Results / Visualization */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
          {/* Top Panel: Textual explanation */}
          <div className="border-b border-gray-900 p-8 bg-black/50 shrink-0">
            <h2 className="text-2xl font-medium tracking-tight mb-3">{activeModule.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
              {activeModule.text}
            </p>
          </div>
          
          {/* Bottom Panel: 3D Scene */}
          <div className="flex-1 relative">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ml-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Model Rendered</span>
            </div>
            
            {renderScene(activeModule.visualType, activeModule.id)}
          </div>
        </div>
        
      </div>
    </div>
  );
}
