import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaPython,
} from "react-icons/fa";
import {
  SiJavascript,
  SiMongodb,
  SiTypescript,
  SiPostman,
  SiExpress,
  SiNextdotjs,
  SiRedis,
  SiTailwindcss,
  SiPostgresql,
  SiSocketdotio,
  SiLangchain,
  SiFlask,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillData = {
  Languages: [
    { name: "Python", icon: <FaPython /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Java", icon: <SiJavascript /> },
  ],
  "AI/ML & LLMs": [
    { name: "LangChain", icon: <SiLangchain /> },
    { name: "AI Agents", icon: <FaPython /> },
    { name: "RAG", icon: <FaPython /> },
    { name: "Deep Learning", icon: <FaPython /> },
    { name: "LlamaFactory", icon: <FaPython /> },
    { name: "Machine Learning", icon: <FaPython /> },
  ],
  "Frontend & Web": [
    { name: "React.js", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "React Native", icon: <FaReact /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
  ],
  "Backend & APIs": [
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "Flask", icon: <SiFlask /> },
    { name: "Socket.io", icon: <SiSocketdotio /> },
    { name: "RESTful APIs", icon: <FaNodeJs /> },
  ],
  "Databases & Caching": [
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MySQL", icon: <SiPostgresql /> },
    { name: "Redis", icon: <SiRedis /> },
    { name: "Supabase", icon: <SiPostgresql /> },
  ],
  "DevOps & Tools": [
    { name: "Git", icon: <FaGitAlt /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "GitHub Actions", icon: <FaGithub /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "VS Code", icon: <VscVscode /> },
  ],
};

const SkillsAndTools = () => {
  return (
    <section id="skills" className="w-full px-2 mx-auto text-white">
      {/* Heading */}

      <h2 className="text-[clamp(2.2rem,8vw,60px)] font-bold mb-6 md:mb-16 text-white leading-tight text-center md:text-left uppercase">
        Tools & <span className="text-primary">Technologies</span>
      </h2>
      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {Object.entries(skillData).map(([category, items]) => (
          <div
            key={category}
            className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:border-primary/30"
          >
            {/* Category Title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-8 bg-primary"></div>
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 tracking-wide">
                {category}
              </h3>
            </div>

            {/* Individual Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 ease-in-out hover:bg-primary hover:border-transparent"
                >
                  <div className="text-3xl md:text-4xl text-primary group-hover:text-black transition-colors duration-500 mb-3">
                    {item.icon}
                  </div>
                  <p className="text-xs md:text-sm font-medium text-white/70 group-hover:text-black transition-colors duration-500 text-center">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsAndTools;
