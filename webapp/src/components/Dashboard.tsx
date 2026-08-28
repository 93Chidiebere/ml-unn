import { Link } from 'react-router-dom';
import { BookOpen, Network, Cpu, MessageSquare, ChevronRight } from 'lucide-react';
import coursesData from '../data/courses.json';

const ICON_MAP: Record<string, any> = {
  'computer-vision': Network,
  'generative-ai': Cpu,
  'introduction-to-ai': BookOpen,
  'natural-language-processing': MessageSquare,
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-ml-green/30 font-sans">
      
      {/* Header aligned with reference style */}
      <header className="border-b border-gray-900 bg-black/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Massive logo height to make text inside it extremely visible */}
            <img src="/logo.png" alt="Logo" className="h-28 object-contain" />
          </div>
          <div className="text-sm font-bold text-white tracking-widest uppercase">
            Machine Learning UNN
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="text-3xl font-medium tracking-tight mb-3">AI & Machine Learning Curriculum</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
            Select a course module below to launch the autonomous 3D visualizer.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {coursesData.map((course) => {
            const IconComponent = ICON_MAP[course.id] || BookOpen;
            return (
              <Link 
                key={course.id} 
                to={`/course/${course.id}`}
                className="group flex items-center justify-between bg-[#0a0a0a] border border-gray-800 hover:border-gray-600 rounded-lg p-5 transition-all duration-200"
              >
                <div className="flex items-center gap-5">
                  <div className="bg-black border border-gray-800 w-10 h-10 rounded flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">{course.title}</h2>
                    <p className="text-gray-500 text-xs mt-1 font-mono">
                      {course.modules.length} MODULES DETECTED
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 group-hover:text-ml-green transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
