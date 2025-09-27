import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ForceGraph2D from 'react-force-graph-2d';
import { ArrowLeft } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

interface GraphViewProps {
  onToggle: () => void;
}

interface Node {
  id: string;
  name: string;
  group: string;
  color: string;
  size: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string;
  target: string;
  color: string;
}

const GraphView: React.FC<GraphViewProps> = ({ onToggle }) => {
  const fgRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1200, 
    height: typeof window !== 'undefined' ? window.innerHeight : 800 
  });
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const { data, loading, error } = usePortfolioData();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate graph data - must be called before any early returns to maintain hooks order
  const graphData = useMemo(() => {
    if (!data) {
      return { nodes: [], links: [] };
    }
    
    const nodes: Node[] = [
      // Central node
      { 
        id: 'ashley', 
        name: data.personal.name, 
        group: 'center', 
        color: '#7a458c', 
        size: 25,
        fx: dimensions.width / 2,
        fy: dimensions.height / 2
      },
    ];

    const links: Link[] = [];

    // Add skills nodes and connections
    data.skills.forEach(skill => {
      nodes.push({
        id: skill.id,
        name: skill.name,
        group: 'skills',
        color: '#9d8cc2',
        size: Math.max(8, skill.level / 6) // Size based on skill level
      });
      
      links.push({
        source: 'ashley',
        target: skill.id,
        color: '#9d8cc280'
      });
    });

    // Add projects nodes and connections
    data.projects.forEach(project => {
      const projectSize = project.status === 'completed' ? 14 : project.status === 'in-progress' ? 12 : 10;
      nodes.push({
        id: project.id,
        name: project.title,
        group: 'projects',
        color: '#6f7d96',
        size: projectSize
      });
      
      links.push({
        source: 'ashley',
        target: project.id,
        color: '#6f7d9680'
      });
      
      // Connect projects to their tech stack
      project.tech.forEach(tech => {
        const skillNode = data.skills.find(skill => 
          skill.name.toLowerCase() === tech.toLowerCase() ||
          skill.name.toLowerCase().includes(tech.toLowerCase()) ||
          tech.toLowerCase().includes(skill.name.toLowerCase())
        );
        if (skillNode) {
          links.push({
            source: project.id,
            target: skillNode.id,
            color: '#c8ccd460'
          });
        }
      });
    });

    // Add hobbies nodes and connections
    data.hobbies.forEach(hobby => {
      nodes.push({
        id: hobby.id,
        name: hobby.name,
        group: 'hobbies',
        color: '#c8ccd4',
        size: 10
      });
      
      links.push({
        source: 'ashley',
        target: hobby.id,
        color: '#c8ccd480'
      });
    });

    // Add contact nodes and connections
    data.contact.forEach(contact => {
      nodes.push({
        id: contact.id,
        name: contact.name,
        group: 'contact',
        color: contact.color,
        size: 8
      });
      
      links.push({
        source: 'ashley',
        target: contact.id,
        color: `${contact.color}80`
      });
    });

    return { nodes, links };
  }, [data, dimensions]);

  // Show loading state after hooks are called
  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full"
        />
        <div className="ml-4 text-purple-300 text-lg">Loading cosmic data...</div>
      </div>
    );
  }

  // Show error state after hooks are called
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center text-purple-300">
          <p>Failed to load cosmic data</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleNodeHover = (node: Node | null) => {
    setHoveredNode(node);
  };

  const handleNodeDrag = (node: Node) => {
    node.fx = node.x;
    node.fy = node.y;
  };

  const handleNodeDragEnd = (node: Node) => {
    node.fx = null;
    node.fy = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-screen overflow-hidden"
      style={{ 
        background: 'radial-gradient(ellipse at center, #1a0d2e 0%, #0a0a0a 70%)',
        backgroundImage: `
          radial-gradient(2px 2px at 20px 30px, #eee, transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 90px 40px, #fff, transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
          radial-gradient(2px 2px at 160px 30px, #fff, transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px'
      }}
    >
      {/* Animated starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      {/* Header Controls */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-20"
      >
        <button
          onClick={onToggle}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </button>
      </motion.div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 right-6 z-20"
      >
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white shadow-lg border border-white/20">
          <span className="text-sm font-medium">Drag nodes • Zoom with scroll</span>
        </div>
      </motion.div>

      {/* Graph Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
      >
        <h1 className="text-6xl md:text-8xl font-black text-center bg-gradient-to-r from-purple-400/30 to-purple-200/30 bg-clip-text text-transparent">
          ASHLEY'S
        </h1>
        <div className="text-2xl md:text-4xl font-light text-center text-purple-200/40">
          Cosmic Universe
        </div>
      </motion.div>

      {/* Node Info Panel */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-6 z-20 bg-black/40 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-sm border border-purple-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-2">{hoveredNode.name}</h3>
          <p className="text-sm text-purple-200 capitalize">Category: {hoveredNode.group}</p>
          <div 
            className="w-4 h-4 rounded-full mt-2"
            style={{ backgroundColor: hoveredNode.color }}
          />
        </motion.div>
      )}

      {/* Force Graph */}
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="transparent"
        nodeColor={(node: Node) => node.color}
        nodeVal={(node: Node) => node.size}
        nodeLabel={(node: Node) => node.name}
        nodeCanvasObject={(node: Node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = Math.max(12 / globalScale, 3);
          ctx.font = `${fontSize}px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Draw node circle
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, node.size, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color;
          ctx.fill();

          // Add glow effect for hovered node
          if (hoveredNode?.id === node.id) {
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, node.size + 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Draw label
          ctx.fillStyle = node.group === 'center' ? '#ffffff' : '#333333';
          ctx.fillText(label, node.x!, node.y! + node.size + fontSize + 2);
        }}
        linkColor={(link: Link) => link.color}
        linkWidth={2}
        linkDirectionalParticles={0}
        onNodeHover={handleNodeHover}
        onNodeDrag={handleNodeDrag}
        onNodeDragEnd={handleNodeDragEnd}
        d3ForceConfig={{
          charge: -300,
          link: { distance: 100 },
          center: { x: dimensions.width / 2, y: dimensions.height / 2 }
        }}
        cooldownTicks={100}
        onEngineStop={() => fgRef.current?.zoomToFit(400)}
      />

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 right-6 z-20 bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
      >
        <h4 className="text-sm font-bold text-gray-800 mb-3">Legend</h4>
        {[
          { group: 'Skills', color: '#9d8cc2' },
          { group: 'Projects', color: '#6f7d96' },
          { group: 'Hobbies', color: '#c8ccd4' },
          { group: 'Contact', color: '#7a458c' }
        ].map(({ group, color }) => (
          <div key={group} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-700">{group}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GraphView;