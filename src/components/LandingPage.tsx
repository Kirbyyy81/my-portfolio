import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Sparkles, Star, Heart } from 'lucide-react';
import FloatingShapes from './FloatingShapes';
import CustomIllustration from './CustomIllustration';
import usePortfolioData from '../hooks/usePortfolioData';
import TypingAnimation from './TypingAnimation';
import GetToKnowMe from './GetToKnowMe';
import experimentsData from '../data/experiments.json';
import SpotlightCard from './SpotlightCard';

interface LandingPageProps {
  onToggle: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onToggle }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { data, loading, error } = usePortfolioData();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5efe1' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Show error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5efe1' }}>
        <div className="text-center text-gray-600">
          <p>Failed to load portfolio data</p>
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

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Github,
      Linkedin, 
      Mail,
      Twitter
    };
    return icons[iconName] || Mail;
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <h1><TypingAnimation text="ASHLEY'S WORLD" className="font-chewy tracking-wider text-8xl md:text-9xl font-black tracking-tighter leading-none bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent hover:from-purple-800 hover:to-purple-500 transition-all duration-500" /></h1>
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
            {data.navigation.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-purple-700 font-medium tracking-wide transition-colors duration-300 cursor-pointer"
                title={item.description}
              >
                {item.name}
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
                {data.personal.greeting}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {data.personal.bio}
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

        {/* Get to Know Me Section */}
        <GetToKnowMe />

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
            {data.projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                style={{ borderLeft: `6px solid ${project.color}` }}
                onClick={() => project.demo && window.open(project.demo, '_blank')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.status === 'completed' && <Star className="w-4 h-4 text-green-500" />}
                    {project.status === 'in-progress' && <Sparkles className="w-4 h-4 text-blue-500" />}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-200/50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.highlights.length > 0 && (
                  <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-semibold">Highlights:</span> {project.highlights[0]}
                  </div>
                )}
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
            {data.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="group cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-gray-800">{skill.name}</span>
                    <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-full">{skill.category}</span>
                  </div>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSkill === skill.name ? '100%' : `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full transition-all duration-500"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
                <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.description}
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
            {data.contact.slice(0, 3).map((contact, index) => {
              const IconComponent = getIconComponent(contact.icon);
              return (
                <motion.a
                  key={contact.id}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  style={{ backgroundColor: contact.color }}
                  title={contact.description}
                >
                  <IconComponent className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </motion.a>
              );
            })}
          </div>
          
          {/* Additional hobbies section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              When I'm not coding...
            </h3>
            <div className="flex justify-center flex-wrap gap-4 max-w-2xl mx-auto">
              {data.hobbies.slice(0, 6).map((hobby, index) => (
                <motion.div
                  key={hobby.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/40 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  style={{ borderLeft: `4px solid ${hobby.color}` }}
                  title={hobby.description}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg group-hover:scale-110 transition-transform">{hobby.icon}</span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">{hobby.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
        {/* AI Experiments Section */}
        <div id="experiments" className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                <span role="img" aria-label="sparkles"></span> AI Experiments
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                This portfolio was built through AI-driven experiments — a journey of inspirations, failed prototypes, and iterations. Here, I’ve gathered the past attempts that shaped the final design, showcasing the creative process behind Ashley’s World.
              </p>
            </div>
            <div className="mt-12">
              <div className="flex overflow-x-auto space-x-8 pb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] [scrollbar-width:none]">
                {experimentsData.map((experiment) => (
                  <div key={experiment.id} className="flex-shrink-0 w-64">
                    <SpotlightCard className="group relative block bg-white/40 backdrop-blur-sm rounded-3xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                      <img className="w-full h-40 object-cover rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" src={experiment.image} alt={experiment.caption} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-3xl"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{experiment.caption}</p>
                      </div>
                    </SpotlightCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};
export default LandingPage;