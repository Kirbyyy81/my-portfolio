import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ForceGraph2D from 'react-force-graph-2d';
import { ArrowLeft } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';
import { forceCollide, forceRadial } from 'd3-force';

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
    
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const nodes: Node[] = [
      // Central node - Ashley (Largest, bright star)
      { 
        id: 'ashley', 
        name: data.personal.name, 
        group: 'center', 
        color: '#E6D7FF', // Bright central star color
        size: 40, // Much larger central node
        fx: centerX,
        fy: centerY
      },
    ];

    const links: Link[] = [];

    // Add skills nodes and connections (Major planets)
    data.skills.forEach((skill, index) => {
      const skillSize = Math.max(15, skill.level / 3); // 15-30 range based on level
      nodes.push({
        id: skill.id,
        name: skill.name,
        group: 'skills',
        color: '#9D8DF1', // Bright purple for skills
        size: skillSize
      });
      
      links.push({
        source: 'ashley',
        target: skill.id,
        color: '#9D8DF180'
      });
    });

    // Add projects nodes and connections (Medium planets)
    data.projects.forEach((project, index) => {
      let projectSize;
      switch (project.status) {
        case 'completed':
          projectSize = 25;
          break;
        case 'in-progress':
          projectSize = 20;
          break;
        default:
          projectSize = 15;
      }
      
      nodes.push({
        id: project.id,
        name: project.title,
        group: 'projects',
        color: project.status === 'completed' ? '#4ECDC4' : 
               project.status === 'in-progress' ? '#45B7D1' : '#96CEB4',
        size: projectSize
      });
      
      links.push({
        source: 'ashley',
        target: project.id,
        color: '#4ECDC480'
      });
      
      // Connect projects to their tech stack with subtle connections
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
            color: '#FFFFFF20' // Very subtle connection lines
          });
        }
      });
    });

    // Add hobbies nodes and connections (Small satellites)
    data.hobbies.forEach((hobby, index) => {
      nodes.push({
        id: hobby.id,
        name: hobby.name,
        group: 'hobbies',
        color: '#FFB6C1', // Soft pink for hobbies
        size: 12 // Smaller size for hobbies
      });
      
      links.push({
        source: 'ashley',
        target: hobby.id,
        color: '#FFB6C140'
      });
    });

    // Add contact nodes and connections (Smallest satellites)
    data.contact.forEach((contact, index) => {
      nodes.push({
        id: contact.id,
        name: contact.name,
        group: 'contact',
        color: '#FFA07A', // Coral color for contact
        size: 10 // Smallest nodes
      });
      
      links.push({
        source: 'ashley',
        target: contact.id,
        color: '#FFA07A60'
      });
    });

    return { nodes, links };
  }, [data, dimensions]);

  // Configure forces: pin center node, radial layout, collisions, and stronger repulsion
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !graphData.nodes.length) return;

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Pin the central node to the center at all times
    graphData.nodes.forEach((n: any) => {
      if (n.id === 'ashley') {
        n.fx = centerX;
        n.fy = centerY;
      }
    });

    // Link distances by group hierarchy
    const linkForce: any = fg.d3Force('link');
    if (linkForce) {
      linkForce.distance((link: any) => {
        const src: any = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === link.source);
        const tgt: any = typeof link.target === 'object' ? link.target : graphData.nodes.find(n => n.id === link.target);
        const other = src.group === 'center' ? tgt : src;
        switch (other?.group) {
          case 'skills': return 200;
          case 'projects': return 280;
          case 'hobbies': return 340;
          case 'contact': return 400;
          default: return 160;
        }
      }).strength(0.4);
    }

    // Strong negative charge to spread nodes out
    const chargeForce: any = fg.d3Force('charge');
    if (chargeForce) {
      chargeForce.strength(-1500).distanceMin(20).distanceMax(2000);
    }

    // Collision force to avoid overlap (based on node size)
    fg.d3Force('collide', forceCollide((d: any) => (d.size || 10) + 12).strength(1));

    // Radial force to form galaxy-like concentric orbits
    fg.d3Force('radial', forceRadial((d: any) => {
      if (d.id === 'ashley') return 0;
      switch (d.group) {
        case 'skills': return 220;
        case 'projects': return 320;
        case 'hobbies': return 380;
        case 'contact': return 460;
        default: return 260;
      }
    }, centerX, centerY).strength(0.09));

    // Reheat simulation to apply changes (use supported API)
    fg.d3ReheatSimulation();
  }, [graphData, dimensions]);

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
        background: 'radial-gradient(ellipse at center, #0F0B1F 0%, #000000 100%)',
        backgroundImage: `
          radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.9), transparent),
          radial-gradient(1px 1px at 40px 70px, rgba(157,141,241,0.6), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(78,205,196,0.4), transparent),
          radial-gradient(1px 1px at 160px 30px, rgba(255,182,193,0.5), transparent),
          radial-gradient(1px 1px at 200px 60px, rgba(255,255,255,0.7), transparent),
          radial-gradient(1px 1px at 250px 90px, rgba(157,141,241,0.3), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 200px'
      }}
    >
      {/* Enhanced animated starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large twinkling stars */}
        {Array.from({ length: 15 }, (_, i) => {
          const colors = ['#FFFFFF', '#E6D7FF', '#9D8DF1', '#4ECDC4', '#FFB6C1'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <motion.div
              key={`large-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '3px',
                height: '3px',
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.5, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Medium stars */}
        {Array.from({ length: 30 }, (_, i) => {
          const colors = ['#FFFFFF', '#E6D7FF', '#9D8DF1'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <motion.div
              key={`medium-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                backgroundColor: color,
                boxShadow: `0 0 4px ${color}`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Small distant stars */}
        {Array.from({ length: 80 }, (_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: '0%',
              top: `${Math.random() * 50}%`,
              boxShadow: '0 0 10px #FFFFFF, 2px 0 20px #FFFFFF',
            }}
            animate={{
              x: [0, dimensions.width + 100],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 8 + Math.random() * 10,
              ease: "easeOut",
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
        linkWidth={(link: any) => {
          if (!hoveredNode) return 1;
          const src = typeof link.source === 'object' ? link.source : { id: link.source };
          const tgt = typeof link.target === 'object' ? link.target : { id: link.target };
          return (src.id === hoveredNode.id || tgt.id === hoveredNode.id) ? 2.5 : 1;
        }}
        linkColor={(link: any) => {
          if (!hoveredNode) return link.color;
          const src = typeof link.source === 'object' ? link.source : { id: link.source };
          const tgt = typeof link.target === 'object' ? link.target : { id: link.target };
          return (src.id === hoveredNode.id || tgt.id === hoveredNode.id) ? '#FFFFFFAA' : link.color;
        }}
        nodeCanvasObject={(node: Node, ctx, globalScale) => {
          // Safety check for node positions and size
          if (!node.x || !node.y || !isFinite(node.x) || !isFinite(node.y) || !node.size || !isFinite(node.size)) {
            return; // Skip rendering if positions or size aren't ready
          }
          
          const label = node.name;
          const fontSize = Math.max(14 / globalScale, 4);
          const isHovered = hoveredNode?.id === node.id;
          const isCenter = node.group === 'center';
          
          ctx.font = `${fontSize}px 'Inter', sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Add outer glow for all nodes
          ctx.shadowColor = node.color;
          ctx.shadowBlur = isHovered ? 25 : (isCenter ? 20 : 10);
          
          // Scale radius with zoom to maintain readability
          const scaleFactor = 1 / Math.sqrt(globalScale);
          const radius = Math.max(3, node.size * scaleFactor);

          // Draw main node circle with gradient
          const gradient = ctx.createRadialGradient(
            node.x - radius * 0.3, 
            node.y - radius * 0.3, 
            0,
            node.x, 
            node.y, 
            radius
          );
          
          if (isCenter) {
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(0.3, node.color);
            gradient.addColorStop(1, '#9D8DF1');
          } else {
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(0.4, node.color);
            gradient.addColorStop(1, node.color + '80');
          }
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Add inner highlight
          const highlightGradient = ctx.createRadialGradient(
            node.x - radius * 0.5, 
            node.y - radius * 0.5, 
            0,
            node.x - radius * 0.3, 
            node.y - radius * 0.3, 
            radius * 0.6
          );
          highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(node.x - radius * 0.2, node.y - radius * 0.2, radius * 0.4, 0, 2 * Math.PI, false);
          ctx.fillStyle = highlightGradient;
          ctx.fill();
          
          // Enhanced glow effect for hovered node
          if (isHovered) {
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowBlur = 35;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + 3, 0, 2 * Math.PI, false);
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          
          // Reset shadow for text
          ctx.shadowBlur = 0;
          
          // Draw label with improved styling
          const labelY = node.y + radius + fontSize + 8;
          
          // Text shadow for better readability
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fillText(label, node.x + 1, labelY + 1);
          
          // Main text
          ctx.fillStyle = isCenter ? '#FFFFFF' : '#E6D7FF';
          ctx.fillText(label, node.x, labelY);
          
          // Add status indicator for projects
          if (node.group === 'projects') {
            const projectData = data?.projects.find(p => p.id === node.id);
            if (projectData) {
              ctx.beginPath();
              ctx.arc(node.x + radius * 0.7, node.y - radius * 0.7, 4, 0, 2 * Math.PI, false);
              
              if (projectData.status === 'completed') {
                ctx.fillStyle = '#00FF88';
              } else if (projectData.status === 'in-progress') {
                ctx.fillStyle = '#FFB347';
              } else {
                ctx.fillStyle = '#87CEEB';
              }
              
              ctx.fill();
              
              // Status indicator glow
              ctx.shadowColor = ctx.fillStyle;
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }}
        linkDirectionalParticles={0}
        onNodeHover={handleNodeHover}
        onNodeDrag={(node: any) => {
          // Allow drag but keep central node fixed
          if (node.id === 'ashley') {
            node.fx = dimensions.width / 2;
            node.fy = dimensions.height / 2;
          } else {
            node.fx = node.x;
            node.fy = node.y;
          }
          fgRef.current?.d3ReheatSimulation();
        }}
        onNodeDragEnd={(node: any) => {
          if (node.id === 'ashley') {
            node.fx = dimensions.width / 2;
            node.fy = dimensions.height / 2;
          } else {
            node.fx = null;
            node.fy = null;
          }
          fgRef.current?.d3ReheatSimulation();
        }}
        cooldownTicks={200}
        onEngineStop={() => {
          // Gentle zoom to fit with padding
          if (fgRef.current) {
            setTimeout(() => fgRef.current.zoomToFit(600, 50), 100);
          }
        }}
      />

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 right-6 z-20 bg-black/40 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-purple-500/20"
      >
        <h4 className="text-sm font-bold text-white mb-3">Galaxy Map</h4>
        {[
          { group: 'Skills', color: '#9D8DF1', description: 'Major Planets' },
          { group: 'Projects', color: '#4ECDC4', description: 'Active Systems' },
          { group: 'Hobbies', color: '#FFB6C1', description: 'Small Moons' },
          { group: 'Contact', color: '#FFA07A', description: 'Communication Beacons' }
        ].map(({ group, color, description }) => (
          <div key={group} className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 6px ${color}`
              }}
            />
            <div className="flex flex-col">
              <span className="text-xs text-white font-medium">{group}</span>
              <span className="text-xs text-purple-200/70">{description}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GraphView;