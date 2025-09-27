
import React from 'react';
import experimentsData from '../data/experiments.json';

const AiExperiments: React.FC = () => {
  return (
    <div id="experiments" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span role="img" aria-label="sparkles">⚡</span> AI Experiments
          </h2>
          <p className="mt-4 text-lg text-purple-300 max-w-2xl mx-auto">
            “Every polished star was once a chaotic nebula. Here are the many AI-generated prototypes that shaped my final portfolio — experiments, failures, and stepping stones toward this galaxy you’re exploring now.”
          </p>
          <p className="mt-4 text-sm text-purple-400">12 failed universes before this one.</p>
        </div>
        <div className="mt-12">
          <div className="flex overflow-x-auto space-x-8 pb-8">
            {experimentsData.map((experiment) => (
              <div key={experiment.id} className="flex-shrink-0 w-64">
                <div className="group relative block bg-black bg-opacity-20 rounded-lg overflow-hidden shadow-lg backdrop-filter backdrop-blur-lg border border-purple-500/20 transition-all duration-300 hover:shadow-purple-500/40 hover:border-purple-500/50 hover:scale-105">
                  <img className="w-full h-40 object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-300" src={experiment.image} alt={experiment.caption} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{experiment.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiExperiments;
