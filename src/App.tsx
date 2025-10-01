import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import GraphView from './pages/GraphView';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isGraphMode, setIsGraphMode] = useState(false);

  const toggleMode = () => {
    setIsGraphMode(!isGraphMode);
  };

  return (
    <div className="min-h-screen transition-colors duration-1000" style={{ backgroundColor: '#f5efe1' }}>
      <AnimatePresence mode="wait">
        {isGraphMode ? (
          <GraphView key="graph" onToggle={toggleMode} />
        ) : (
          <LandingPage key="landing" onToggle={toggleMode} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;