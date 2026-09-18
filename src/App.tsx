import { useState, useEffect } from 'react';
import { 
  Brain, MessageSquare, Bot, Database, Settings, Rocket, 
  ChevronRight, ChevronDown, Code2, BookOpen, Target, 
  Play, CheckCircle2, Clock, Zap, Menu, X, Home,
  ArrowRight, Star, Layers, Terminal
} from 'lucide-react';
import { phases, Phase, Practice } from './data/phases';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

const iconMap: Record<string, React.ComponentType<any>> = {
  Brain, MessageSquare, Bot, Database, Settings, Rocket
};

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'phase'>('home');
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedPhases, setCompletedPhases] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedPhases');
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedTheory, setExpandedTheory] = useState<number | null>(0);
  const [activePractice, setActivePractice] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('completedPhases', JSON.stringify(completedPhases));
  }, [completedPhases]);

  const markPhaseComplete = (phaseId: number) => {
    if (!completedPhases.includes(phaseId)) {
      setCompletedPhases([...completedPhases, phaseId]);
    }
  };

  const navigateToPhase = (phaseId: number) => {
    setSelectedPhase(phaseId);
    setCurrentView('phase');
    setExpandedTheory(0);
    setActivePractice(null);
    setMobileMenuOpen(false);
  };

  const navigateHome = () => {
    setCurrentView('home');
    setMobileMenuOpen(false);
  };

  const progress = (completedPhases.length / phases.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen z-50
        ${sidebarOpen ? 'w-72' : 'w-20'} 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-[#12121a] border-r border-white/5 
        transition-all duration-300 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-sm font-bold text-white">AI Engineering</h1>
                <p className="text-xs text-zinc-500">Mastery Path</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Home */}
          <button
            onClick={navigateHome}
            className={`sidebar-item w-full flex items-center gap-3 px-4 py-3 text-left ${
              currentView === 'home' ? 'active' : ''
            }`}
          >
            <Home className="w-5 h-5 text-zinc-400 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm text-zinc-300">Inicio</span>}
          </button>

          {/* Phases */}
          <div className="mt-4 px-4">
            {sidebarOpen && (
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                Fases del Curso
              </p>
            )}
          </div>

          {phases.map((phase) => {
            const Icon = iconMap[phase.icon];
            const isActive = currentView === 'phase' && selectedPhase === phase.id;
            const isCompleted = completedPhases.includes(phase.id);

            return (
              <button
                key={phase.id}
                onClick={() => navigateToPhase(phase.id)}
                className={`sidebar-item w-full flex items-center gap-3 px-4 py-3 text-left ${
                  isActive ? 'active' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0 relative`}>
                  {Icon && <Icon className="w-4 h-4 text-white" />}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300 truncate">
                      <span className="text-zinc-500 mr-1">{phase.id}.</span>
                      {phase.title.split(' ').slice(0, 3).join(' ')}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Progress */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Progreso</span>
              <span className="text-xs text-indigo-400 font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-3 border-t border-white/5 items-center justify-center hover:bg-white/5 transition-colors"
        >
          <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(true)} className="text-zinc-400">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-sm font-bold text-white">AI Engineering Mastery</h1>
          <div className="w-6" />
        </div>

        {currentView === 'home' ? (
          <HomeView 
            phases={phases} 
            completedPhases={completedPhases}
            onNavigate={navigateToPhase}
          />
        ) : (
          <PhaseView
            phase={phases.find(p => p.id === selectedPhase)!}
            expandedTheory={expandedTheory}
            setExpandedTheory={setExpandedTheory}
            activePractice={activePractice}
            setActivePractice={setActivePractice}
            isCompleted={completedPhases.includes(selectedPhase)}
            onMarkComplete={() => markPhaseComplete(selectedPhase)}
            onNextPhase={() => {
              if (selectedPhase < phases.length) navigateToPhase(selectedPhase + 1);
            }}
            onPrevPhase={() => {
              if (selectedPhase > 1) navigateToPhase(selectedPhase - 1);
            }}
          />
        )}
      </main>
    </div>
  );
}

// ==================== HOME VIEW ====================

function HomeView({ phases, completedPhases, onNavigate }: { 
  phases: Phase[], completedPhases: number[], onNavigate: (id: number) => void 
}) {
  const progress = (completedPhases.length / phases.length) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
          <Star className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-indigo-300">Tutorial Completo 2024</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
          <span className="gradient-text">AI Engineering</span>
          <br />
          <span className="text-white">Mastery</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
          De cero a experto en AI Engineering. Aprende a construir agentes, sistemas RAG, 
          controlar modelos y crear aplicaciones de IA de producción.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          {[
            { icon: Layers, label: 'Fases', value: '6' },
            { icon: Code2, label: 'Prácticas', value: '10+' },
            { icon: Target, label: 'Proyectos', value: '6' },
            { icon: Clock, label: 'Semanas', value: '16-20' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <stat.icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-zinc-400">Tu Progreso</span>
            <span className="text-sm text-indigo-400 font-medium">{completedPhases.length}/{phases.length} fases</span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid gap-6">
        {phases.map((phase, index) => {
          const Icon = iconMap[phase.icon];
          const isCompleted = completedPhases.includes(phase.id);
          const isNext = !isCompleted && (index === 0 || completedPhases.includes(phases[index - 1].id));

          return (
            <div
              key={phase.id}
              onClick={() => onNavigate(phase.id)}
              className={`phase-card glass-card rounded-2xl p-6 cursor-pointer group ${
                isNext ? 'glow-border' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Phase Number & Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {Icon && <Icon className="w-7 h-7 text-white" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-zinc-500">FASE {phase.id}</span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs">
                        <CheckCircle2 className="w-3 h-3" /> Completada
                      </span>
                    )}
                    {isNext && !isCompleted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
                        <Play className="w-3 h-3" /> Siguiente
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-3">{phase.subtitle}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {phase.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {phase.theory.length} temas
                    </span>
                    <span className="flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" /> {phase.practices.length} prácticas
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-3">🎯 Tu Camino al Éxito</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Cada fase construye sobre la anterior. Completa las prácticas y proyectos 
            para asegurar que dominas cada concepto antes de avanzar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Python', 'OpenAI API', 'LangChain', 'RAG', 'Agents', 'FastAPI', 'Docker'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PHASE VIEW ====================

function PhaseView({ phase, expandedTheory, setExpandedTheory, activePractice, setActivePractice, isCompleted, onMarkComplete, onNextPhase, onPrevPhase }: {
  phase: Phase;
  expandedTheory: number | null;
  setExpandedTheory: (i: number | null) => void;
  activePractice: string | null;
  setActivePractice: (id: string | null) => void;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNextPhase: () => void;
  onPrevPhase: () => void;
}) {
  const Icon = iconMap[phase.icon];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 slide-in">
      {/* Phase Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
            {Icon && <Icon className="w-8 h-8 text-white" />}
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium">FASE {phase.id} DE 6</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{phase.title}</h1>
          </div>
        </div>
        <p className="text-zinc-400 text-lg">{phase.subtitle}</p>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {phase.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> {phase.theory.length} temas teóricos
          </span>
          <span className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4" /> {phase.practices.length} prácticas
          </span>
        </div>
      </div>

      {/* Objectives */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Objetivos de Aprendizaje
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {phase.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-zinc-300">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Theory Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          Teoría
        </h2>
        
        <div className="space-y-3">
          {phase.theory.map((content, index) => (
            <div key={index} className="glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedTheory(expandedTheory === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-zinc-200">
                    Tema {index + 1}: {content.split('\n')[0].replace('#', '').replace('#', '').trim().substring(0, 50)}...
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${expandedTheory === index ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedTheory === index && (
                <div className="px-4 pb-4 border-t border-white/5">
                  <div className="prose prose-invert max-w-none mt-4">
                    <FormattedContent content={content} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Practices Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-400" />
          Prácticas
        </h2>
        
        <div className="space-y-4">
          {phase.practices.map((practice) => (
            <PracticeCard
              key={practice.id}
              practice={practice}
              isActive={activePractice === practice.id}
              onToggle={() => setActivePractice(activePractice === practice.id ? null : practice.id)}
            />
          ))}
        </div>
      </div>

      {/* Project Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-orange-400" />
          Proyecto de la Fase
        </h2>
        
        <div className="glass-card rounded-2xl p-6 glow-border">
          <h3 className="text-lg font-bold text-white mb-2">{phase.project.title}</h3>
          <p className="text-zinc-400 text-sm mb-4">{phase.project.description}</p>
          
          <div className="space-y-2">
            {phase.project.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-zinc-300">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-white/5">
        <button
          onClick={onPrevPhase}
          disabled={phase.id === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Fase Anterior
        </button>

        <div className="flex items-center gap-3">
          {!isCompleted && (
            <button
              onClick={onMarkComplete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Marcar Completada
            </button>
          )}
          {isCompleted && (
            <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              Completada ✓
            </span>
          )}
        </div>

        <button
          onClick={onNextPhase}
          disabled={phase.id === phases.length}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Siguiente Fase
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ==================== PRACTICE CARD ====================

function PracticeCard({ practice, isActive, onToggle }: { 
  practice: Practice; isActive: boolean; onToggle: () => void 
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(practice.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-200">{practice.title}</h4>
            <p className="text-xs text-zinc-500">{practice.description}</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </button>

      {isActive && (
        <div className="border-t border-white/5">
          {/* Code Block */}
          <div className="relative">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-white/5">
              <span className="text-xs text-zinc-500 font-mono">{practice.language}</span>
              <button
                onClick={copyCode}
                className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                {copied ? '✓ Copiado' : 'Copiar código'}
              </button>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <SyntaxHighlighter
                language={practice.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: '#0d1117',
                  fontSize: '0.8rem',
                  lineHeight: '1.6',
                }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {practice.code}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Explanation */}
          <div className="p-4 bg-indigo-500/5 border-t border-white/5">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-zinc-300">{practice.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== FORMATTED CONTENT ====================

function FormattedContent({ content }: { content: string }) {
  // Simple markdown-like renderer
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const Tag = listType;
      elements.push(
        <Tag key={`list-${elements.length}`} className="mb-4">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </Tag>
      );
      listItems = [];
      listType = null;
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-400 hover:underline">$1</a>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${i}`} className="my-4 rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language={codeLanguage || 'python'}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: '#1a1a2e',
                fontSize: '0.8rem',
                lineHeight: '1.5',
                borderRadius: '0.5rem',
              }}
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
          </div>
        );
        codeContent = '';
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
        codeLanguage = line.replace('```', '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={`h3-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(line.replace('### ', '')) }} />);
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={`h2-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(line.replace('## ', '')) }} />);
      continue;
    }

    // Lists
    if (line.match(/^(\d+)\.\s/)) {
      if (listType !== 'ol') flushList();
      listType = 'ol';
      listItems.push(line.replace(/^\d+\.\s/, ''));
      continue;
    }
    if (line.match(/^[-*]\s/)) {
      if (listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push(line.replace(/^[-*]\s/, ''));
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushList();
      continue;
    }

    // Table detection
    if (line.includes('|') && line.trim().startsWith('|')) {
      flushList();
      // Collect table rows
      const tableRows: string[] = [line];
      while (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim().startsWith('|')) {
        i++;
        tableRows.push(lines[i]);
      }
      
      const parsedRows = tableRows
        .filter(r => !r.match(/^\|[\s-|]+\|$/))
        .map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
      
      if (parsedRows.length > 0) {
        elements.push(
          <table key={`table-${i}`} className="w-full border-collapse my-4 text-sm">
            <thead>
              <tr>
                {parsedRows[0].map((cell, ci) => (
                  <th key={ci} className="border border-white/10 px-3 py-2 bg-indigo-500/10 text-left text-zinc-200">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedRows.slice(1).map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-white/10 px-3 py-2 text-zinc-400">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(<p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
  }

  flushList();

  return <>{elements}</>;
}

export default App;
