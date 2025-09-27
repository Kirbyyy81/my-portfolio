
import React from 'react';
import experimentsData from '../data/experiments.json';
import SpotlightCard from './SpotlightCard';

const AiExperiments: React.FC = () => {
  return (
    <div id="experiments" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            <span role="img" aria-label="sparkles">⚡</span> AI Experiments
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            “Every polished star was once a chaotic nebula. Here are the many AI-generated prototypes that shaped my final portfolio — experiments, failures, and stepping stones toward this galaxy you’re exploring now.”
          </p>
          <p className="mt-4 text-sm text-purple-600">12 failed universes before this one.</p>
        </div>
        <div className="mt-12">
          <div className="flex overflow-x-auto space-x-8 pb-8">
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
  );
};

export default AiExperiments;
