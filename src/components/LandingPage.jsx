import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import FloatingShapes from './FloatingShapes';
import CustomIllustration from './CustomIllustration';
import GetToKnowMe from './GetToKnowMe';

const LandingPage = ({ onToggle }) => {
  const projects = [
    {
      title: "AI-Powered Study Assistant",
      description: "Machine learning application that helps students optimize their study schedules using natural language processing.",
      tech: ["Python", "TensorFlow", "React", "Node.js"],
      link: "#"
    },
    {
      title: "Sustainable Campus App",
      description: "Mobile app connecting students to eco-friendly initiatives and tracking carbon footprint reduction.",
      tech: ["React Native", "Firebase", "Express.js"],
      link: "#"
    },
    {
      title: "Interactive Data Visualization",
      description: "D3.js dashboard for analyzing university enrollment trends with real-time data processing.",
      tech: ["D3.js", "JavaScript", "Python", "PostgreSQL"],
      link: "#"
    }
  ];

  const skills = [
    "JavaScript", "Python", "React", "Node.js", "Machine Learning", 
    "Data Structures", "Algorithms", "UI/UX Design", "Git", "SQL"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5efe1] to-[#c8ccd4] relative overflow-hidden">
      <FloatingShapes />
      
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <motion.h1 
          className="text-6xl md:text-8xl font-black text-center text-[#7a458c] cursor-pointer hover:text-[#9d8cc2] transition-colors duration-300"
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ASHLEY'S World
        </motion.h1>
        
        {/* Navigation */}
        <motion.nav 
          className="flex justify-center mt-6 space-x-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {['Get to Know Me', 'Projects', 'Skills', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[#6f7d96] hover:text-[#7a458c] font-medium transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <motion.section 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-[#7a458c] mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                안녕하세요, I'm Ashley ~
              </motion.h2>
              <motion.p 
                className="text-xl text-[#6f7d96] leading-relaxed mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Computer Science student passionate about creating meaningful digital experiences. 
                I love exploring the intersection of technology, design, and human connection.
              </motion.p>
              <motion.div 
                className="flex justify-center space-x-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <a href="#" className="p-3 bg-[#7a458c] text-white rounded-full hover:bg-[#9d8cc2] transition-colors duration-300">
                  <Github size={24} />
                </a>
                <a href="#" className="p-3 bg-[#7a458c] text-white rounded-full hover:bg-[#9d8cc2] transition-colors duration-300">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-3 bg-[#7a458c] text-white rounded-full hover:bg-[#9d8cc2] transition-colors duration-300">
                  <Mail size={24} />
                </a>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <CustomIllustration />
            </div>
          </div>
        </motion.section>

        {/* Get to Know Me Section */}
        <GetToKnowMe />

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-[#7a458c] text-center mb-12">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#c8ccd4]/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-bold text-[#7a458c] mb-3">{project.title}</h4>
                <p className="text-[#6f7d96] mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-[#9d8cc2]/20 text-[#7a458c] rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-[#7a458c] hover:text-[#9d8cc2] font-medium transition-colors duration-300"
                >
                  View Project <ExternalLink size={16} className="ml-2" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills" 
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-[#7a458c] text-center mb-12">Skills & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm text-[#7a458c] rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-[#c8ccd4]/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(122, 69, 140, 0.1)" }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-[#7a458c] mb-8">Let's Connect!</h3>
          <p className="text-xl text-[#6f7d96] mb-8 max-w-2xl mx-auto">
            I'm always excited to collaborate on interesting projects or just chat about technology, design, and life!
          </p>
          <motion.a
            href="mailto:ashley@example.com"
            className="inline-flex items-center px-8 py-4 bg-[#7a458c] text-white rounded-full font-medium hover:bg-[#9d8cc2] transition-colors duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} className="mr-2" />
            Get In Touch
          </motion.a>
        </motion.section>
      </main>
    </div>
  );
};

export default LandingPage;