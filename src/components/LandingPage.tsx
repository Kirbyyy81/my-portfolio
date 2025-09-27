import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Palette, Zap } from 'lucide-react';
import FloatingShapes from './FloatingShapes';
import CustomIllustration from './CustomIllustration';

interface LandingPageProps {
  onToggle: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onToggle }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: 'React', level: 90, color: '#7a458c' },
    { name: 'TypeScript', level: 85, color: '#9d8cc2' },
    { name: 'Node.js', level: 80, color: '#6f7d96' },
    { name: 'Python', level: 88, color: '#7a458c' },
    { name: 'UI/UX Design', level: 75, color: '#9d8cc2' },
    { name: 'GraphQL', level: 70, color: '#6f7d96' },
  ];

  const projects = [
    {
      title: 'EcoTracker',
      description: 'Sustainable living app with gamification',
      tech: ['React', 'Node.js', 'MongoDB'],
      color: '#7a458c'
    },
    {
      title: 'CodeCollab',
      description: 'Real-time collaborative coding platform',
      tech: ['TypeScript', 'WebSocket', 'Redis'],
      color: '#9d8cc2'
    },
    {
      title: 'ArtGen AI',
      description: 'Machine learning powered art generator',
      tech: ['Python', 'TensorFlow', 'React'],
      color: '#6f7d96'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden"
    >
      <FloatingShapes />
      
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <button
            onClick={onToggle}
            className="group cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-none bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent hover:from-purple-800 hover:to-purple-500 transition-all duration-500">
              ASHLEY'S WORLD
            </h1>
          </button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-500 mt-2 tracking-wide">
          </motion.p>
        </motion.div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 py-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="flex flex-wrap justify-center gap-8 bg-white/30 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            {['Get to Know Me', 'Projects', 'Skills', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-purple-700 font-medium tracking-wide transition-colors duration-300 cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        
        {/* Introduction Section */}
        <motion.section
          id="get-to-know-me"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-32 text-center"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <CustomIllustration />
            </div>
            <div className="lg:w-1/2 text-left">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                안녕하세요, I'm Ashley ~
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                A passionate computer science student who loves blending creativity with code. 
                I build digital experiences that are both beautiful and functional, 
                always with a touch of playfulness and innovation.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors shadow-lg"
                >
                  View Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-all shadow-lg"
                >
                  Let's Chat
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ borderLeft: `6px solid ${project.color}` }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: project.color }}
                  />
                  <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-200/50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="group cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-semibold text-gray-800">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSkill === skill.name ? '100%' : `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full transition-all duration-500"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-8">
            Let's Create Together
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to work on new projects and connect with fellow creators. 
            Whether you have an idea to bring to life or just want to chat about tech and design!
          </p>
          <div className="flex justify-center gap-8">
            {[
              { Icon: Github, href: '#', color: '#7a458c' },
              { Icon: Linkedin, href: '#', color: '#9d8cc2' },
              { Icon: Mail, href: 'mailto:ashley@example.com', color: '#6f7d96' }
            ].map(({ Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ backgroundColor: color }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.a>
            ))}
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default LandingPage;