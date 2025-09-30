import { useState, useEffect } from 'react';

interface Personal {
  name: string;
  title: string;
  greeting: string;
  bio: string;
  location: string;
  avatar: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  color: string;
  category: string;
  years: number;
  description: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  tech: string[];
  color: string;
  status: string;
  year: number;
  duration: string;
  github?: string;
  demo?: string;
  image?: string;
  highlights: string[];
}

interface Hobby {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  category: string;
  favorites?: string[];
  tools?: string[];
  instruments?: string[];
  specialties?: string[];
  equipment?: string[];
  genres?: string[];
}

interface Contact {
  id: string;
  name: string;
  value: string;
  url: string;
  color: string;
  icon: string;
  description: string;
}

interface Navigation {
  id: string;
  name: string;
  href: string;
  description: string;
}

interface Theme {
  colors: {
    primary: string;
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
  };
  fonts: {
    title: string;
    body: string;
  };
}

interface Meta {
  title: string;
  description: string;
  keywords: string[];
  lastUpdated: string;
}

interface Experiment {
  id: string;
  caption: string;
  image: string;
}

interface PersonalCard {
  id: string;
  front: {
    title: string;
    subtitle: string;
    icon: string;
  };
  back: {
    title: string;
    description: string;
    details: string[];
  };
  color: string;
}

export interface PortfolioData {
  personal: Personal;
  skills: Skill[];
  projects: Project[];
  hobbies: Hobby[];
  contact: Contact[];
  navigation: Navigation[];
  theme: Theme;
  meta: Meta;
  experiments: Experiment[];
  personalCards: PersonalCard[];
}

const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        // Fetch from public directory for proper deployment
        const response = await fetch('/portfolio.json');
        
        if (!response.ok) {
          throw new Error('Failed to load portfolio data');
        }
        
        const data: PortfolioData = await response.json();
        setPortfolioData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
        setError('Failed to load portfolio data');
        
        // Fallback data in case the JSON fails to load
        const fallbackData: PortfolioData = {
          personal: {
            name: "Ashley Chan",
            title: "Computer Science Student",
            greeting: "안녕하세요, I'm Ashley ~",
            bio: "A passionate computer science student who loves blending creativity with code.",
            location: "Toronto, Canada",
            avatar: "👩‍💻"
          },
          skills: [
            { id: "react", name: "React", level: 90, color: "#7a458c", category: "Frontend", years: 3, description: "Building modern, interactive user interfaces" },
            { id: "typescript", name: "TypeScript", level: 85, color: "#9d8cc2", category: "Frontend", years: 2, description: "Type-safe JavaScript development" },
            { id: "python", name: "Python", level: 88, color: "#7a458c", category: "Backend", years: 4, description: "Data science and web development" }
          ],
          projects: [
            {
              id: "ecotracker",
              title: "EcoTracker",
              description: "Sustainable living app with gamification features",
              shortDescription: "Sustainable living app with gamification",
              tech: ["React", "Node.js", "MongoDB"],
              color: "#7a458c",
              status: "completed",
              year: 2024,
              duration: "3 months",
              highlights: ["Reduced user carbon footprint by 25%"]
            }
          ],
          hobbies: [
            { id: "gaming", name: "Gaming", description: "Love playing indie games and RPGs", color: "#c8ccd4", icon: "🎮", category: "entertainment" }
          ],
          contact: [
            { id: "github", name: "GitHub", value: "ashley-chan", url: "https://github.com/ashley-chan", color: "#7a458c", icon: "Github", description: "Check out my code" },
            { id: "email", name: "Email", value: "ashley.chan@example.com", url: "mailto:ashley.chan@example.com", color: "#6f7d96", icon: "Mail", description: "Drop me a message" }
          ],
          navigation: [
            { id: "about", name: "Get to Know Me", href: "#get-to-know-me", description: "Learn about my background" },
            { id: "projects", name: "Projects", href: "#projects", description: "Explore my latest work" },
            { id: "skills", name: "Skills", href: "#skills", description: "Discover my technical expertise" },
            { id: "contact", name: "Contact", href: "#contact", description: "Get in touch with me" }
          ],
          theme: {
            colors: { primary: "#f5efe1", accent1: "#7a458c", accent2: "#9d8cc2", accent3: "#6f7d96", accent4: "#c8ccd4" },
            fonts: { title: "Inter", body: "Inter" }
          },
          meta: {
            title: "Ashley's World - Creative Developer Portfolio",
            description: "Ashley Chan - Computer Science student passionate about blending creativity with code.",
            keywords: ["Ashley Chan", "developer", "portfolio"],
            lastUpdated: "2024-12-27"
          },
          experiments: [],
          personalCards: []
        };
        
        setPortfolioData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  return {
    data: portfolioData,
    loading,
    error,
    
    // Utility functions for easier data access
    getSkillsByCategory: (category: string) => 
      portfolioData?.skills.filter(skill => skill.category === category) || [],
    
    getProjectsByStatus: (status: string) => 
      portfolioData?.projects.filter(project => project.status === status) || [],
    
    getHobbiesByCategory: (category: string) => 
      portfolioData?.hobbies.filter(hobby => hobby.category === category) || [],
      
    getContactByType: (type: string) => 
      portfolioData?.contact.find(contact => contact.id === type) || null,
  };
};

export default usePortfolioData;