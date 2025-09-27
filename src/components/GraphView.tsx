import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ForceGraph2D from 'react-force-graph-2d';
import { ArrowLeft } from 'lucide-react';

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
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const graphData = {
    nodes: [
      // Central node
      { id: 'ashley', name: 'Ashley Chan', group: 'center', color: '#7a458c', size: 20 },
      
      // Skills nodes
      { id: 'react', name: 'React', group: 'skills', color: '#9d8cc2', size: 15 },
      { id: 'typescript', name: 'TypeScript', group: 'skills', color: '#9d8cc2', size: 14 },
      { id: 'nodejs', name: 'Node.js', group: 'skills', color: '#9d8cc2', size: 13 },
      { id: 'python', name: 'Python', group: 'skills', color: '#9d8cc2', size: 15 },
      { id: 'uiux', name: 'UI/UX Design', group: 'skills', color: '#9d8cc2', size: 12 },
      { id: 'graphql', name: 'GraphQL', group: 'skills', color: '#9d8cc2', size: 11 },
      
      // Projects nodes
      { id: 'ecotracker', name: 'EcoTracker', group: 'projects', color: '#6f7d96', size: 13 },
      { id: 'codecollab', name: 'CodeCollab', group: 'projects', color: '#6f7d96', size: 12 },
      { id: 'artgen', name: 'ArtGen AI', group: 'projects', color: '#6f7d96', size: 11 },
      
      // Hobbies nodes
      { id: 'gaming', name: 'Gaming', group: 'hobbies', color: '#c8ccd4', size: 10 },
      { id: 'illustration', name: 'Digital Art', group: 'hobbies', color: '#c8ccd4', size: 10 },
      { id: 'music', name: 'Music', group: 'hobbies', color: '#c8ccd4', size: 9 },
      { id: 'cooking', name: 'Cooking', group: 'hobbies', color: '#c8ccd4', size: 9 },
      
      // Contact nodes
      { id: 'github', name: 'GitHub', group: 'contact', color: '#7a458c', size: 8 },
      { id: 'linkedin', name: 'LinkedIn', group: 'contact', color: '#7a458c', size: 8 },
      { id: 'email', name: 'Email', group: 'contact', color: '#7a458c', size: 8 },
    ] as Node[],
    
    links: [
      // Central connections
      { source: 'ashley', target: 'react', color: '#7a458c80' },
      { source: 'ashley', target: 'typescript', color: '#7a458c80' },
      { source: 'ashley', target: 'nodejs', color: '#7a458c80' },
      { source: 'ashley', target: 'python', color: '#7a458c80' },
      { source: 'ashley', target: 'uiux', color: '#7a458c80' },
      { source: 'ashley', target: 'graphql', color: '#7a458c80' },
      
      { source: 'ashley', target: 'ecotracker', color: '#9d8cc280' },
      { source: 'ashley', target: 'codecollab', color: '#9d8cc280' },
      { source: 'ashley', target: 'artgen', color: '#9d8cc280' },
      
      { source: 'ashley', target: 'gaming', color: '#6f7d9680' },
      { source: 'ashley', target: 'illustration', color: '#6f7d9680' },
      { source: 'ashley', target: 'music', color: '#6f7d9680' },
      { source: 'ashley', target: 'cooking', color: '#6f7d9680' },
      
      { source: 'ashley', target: 'github', color: '#c8ccd480' },
      { source: 'ashley', target: 'linkedin', color: '#c8ccd480' },
      { source: 'ashley', target: 'email', color: '#c8ccd480' },
      
      // Project-skill connections
      { source: 'ecotracker', target: 'react', color: '#9d8cc260' },
      { source: 'ecotracker', target: 'nodejs', color: '#9d8cc260' },
      { source: 'codecollab', target: 'typescript', color: '#9d8cc260' },
      { source: 'artgen', target: 'python', color: '#9d8cc260' },
      { source: 'artgen', target: 'uiux', color: '#9d8cc260' },
    ] as Link[]
  };

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
      style={{ backgroundColor: '#f5efe1' }}
    >
      {/* Header Controls */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-20"
      >
        <button
          onClick={onToggle}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
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
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-gray-800 shadow-lg">
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
        <h1 className="text-6xl md:text-8xl font-black text-center bg-gradient-to-r from-purple-900/20 to-purple-600/20 bg-clip-text text-transparent">
          ASHLEY'S
        </h1>
        <div className="text-2xl md:text-4xl font-light text-center text-gray-600/30">
          Interactive World
        </div>
      </motion.div>

      {/* Node Info Panel */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-6 z-20 bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-sm"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">{hoveredNode.name}</h3>
          <p className="text-sm text-gray-600 capitalize">Category: {hoveredNode.group}</p>
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