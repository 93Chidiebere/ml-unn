import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import NeuralNetworkScene from './3d/NeuralNetworkScene';
import DecisionTreeScene from './3d/DecisionTreeScene';
import ScatterPlotScene from './3d/ScatterPlotScene';
import NLPWordCloudScene from './3d/NLPWordCloudScene';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

        {/* Right Panel: Scrolling Article */}
        <div className="flex-1 bg-[#050505] overflow-y-auto">
          <div className="max-w-4xl mx-auto px-12 py-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-12 text-white">{activeModule.title}</h2>
            
            <div className="space-y-12">
              {activeModule.contentBlocks?.map((block: any, idx: number) => {
                if (block.type === 'text') {
                  return (
                    <div key={idx} className="text-gray-300 text-lg leading-relaxed font-light prose-invert max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-white" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-white" {...props} />,
                          p: ({node, ...props}) => <p className="mb-4" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                          li: ({node, ...props}) => <li className="" {...props} />,
                          a: ({node, ...props}) => <a className="text-green-400 hover:underline" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-gray-200" {...props} />,
                          code: ({inline, className, children, ...props}: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return inline ? (
                              <code className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                {children}
                              </code>
                            ) : (
                              <div className="mb-6 rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a0a]">
                                {match && <div className="bg-gray-900 px-4 py-1.5 text-xs text-gray-400 border-b border-gray-800 uppercase tracking-wider font-mono">{match[1]}</div>}
                                <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300"><code {...props}>{children}</code></pre>
                              </div>
                            )
                          },
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-700 pl-4 py-1 italic text-gray-400 mb-4 bg-gray-900/50 rounded-r-lg" {...props} />,
                          table: ({node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse border border-gray-800 text-sm" {...props} /></div>,
                          thead: ({node, ...props}) => <thead className="bg-gray-900" {...props} />,
                          th: ({node, ...props}) => <th className="border border-gray-800 px-4 py-2 font-medium text-left text-gray-300" {...props} />,
                          td: ({node, ...props}) => <td className="border border-gray-800 px-4 py-2 text-gray-400" {...props} />,
                        }}
                      >
                        {block.content}
                      </ReactMarkdown>
                    </div>
                  );
                } else if (block.type === 'image') {
                  return (
                    <div key={idx} className="w-full my-8">
                      <img 
                        src={block.content} 
                        alt="Illustration" 
                        className="w-full rounded-xl border border-gray-800 shadow-2xl" 
                      />
                    </div>
                  );
                }
                return null;
              })}

              {/* Fallback for unmigrated or empty blocks */}
              {(!activeModule.contentBlocks || activeModule.contentBlocks.length === 0) && (
                <div className="h-[500px] relative mt-8 border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a]">
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ml-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Model Rendered</span>
                  </div>
                  {renderScene(activeModule.visualType, activeModule.id)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
