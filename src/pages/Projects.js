import React from "react";
import { FaGithub } from "react-icons/fa";
import AnimatedButton from "../components/AnimatedButton";

const projectsData = [
  {
    id: 1,
    title: "Dreams - Autonomous AI Video Production Pipeline",
    description:
      "Autonomous system producing 60+ monthly lip-synced videos across YouTube, Instagram, and Facebook using Gemini 2.0 Pro, Wav2Lip with 95% accuracy, and automated GitHub Actions deployment.",
    github: "https://github.com/Surya2004-janardhan/Dreams",
    tech: "Node.js, Python, React, GSAP, Wav2Lip, Gemini 2.0 Pro, FFmpeg, Playwright",
  },
  {
    id: 2,
    title: "Aditya Foods - Mobile Food Ordering System",
    description:
      "Full-stack mobile food ordering app for college canteens using React Native. Reduced order processing time by 40% and food fulfillment time by 50% with Redis caching.",
    github: "https://github.com/Surya2004-janardhan/AdtFoods",
    tech: "React Native, Expo, Node.js, SQL, JWT, Redis, Razorpay",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full mx-auto text-white px-2 overflow-hidden"
    >
      {/* Heading Section - Standardized with other components */}
      <h2 className="text-[clamp(2.2rem,8vw,60px)] font-bold mb-6 md:mb-16 text-white leading-tight text-center md:text-left uppercase">
        Professional{" "}
        <span className="text-primary block md:inline">Projects</span>
      </h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1100px] mx-auto">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="group relative bg-[#1a1a1a] border border-white/10 rounded-[1rem] overflow-hidden transition-all duration-500 ease-in-out hover:border-primary/40 flex flex-col h-full shadow-2xl"
          >
            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow text-center md:text-left">
              <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-500">
                {project.title}
              </h3>

              <p className="text-[#b0b0b0] mt-3 mb-8 leading-relaxed text-sm md:text-base flex-grow">
                {project.description}
              </p>

              {/* Buttons Container */}
              <div className="flex gap-4 justify-center md:justify-start items-center">
                {project.github && (
                  <div className="group/btn">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-widest"
                    >
                      <FaGithub className="text-xl" />
                      <span>Algorithm</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Subtle background glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
