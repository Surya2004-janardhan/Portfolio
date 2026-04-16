import React, { useRef } from "react";
import { TbArrowRightCircle, TbDownload } from "react-icons/tb";
import Projects from "./Projects";
import Experience from "./Experience";
import SkillsAndTools from "../pages/SkillsAndTools";
import Contact from "./Contact";
import Education from "./Education";
import GithubCalendar from "./GithubCalendar";

const Home = () => {
  const contactRef = useRef(null);
  const projectsRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeClick = () => {
    window.open("/surya-resume.pdf", "_blank");
  };

  const stats = [
    { value: "09+", label: "Months of", highlight: "AI Experience" },
    { value: "20+", label: "AI Agents", highlight: "Deployed" },
    { value: "800+", label: "Algorithmic", highlight: "Problems Solved" },
  ];

  return (
    <div className="flex flex-col font-poppins text-white selection:bg-primary selection:text-black">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center px-2 py-10">
        <div className="max-w-6xl">
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            Available for hire
          </span>

          <h1 className="text-[clamp(2.8rem,10vw,5.5rem)] font-extrabold leading-[1.1] mb-4 tracking-tight">
            AI ENGINEER & <br />
            <span className="text-primary">FULL STACK DEV</span>
          </h1>

          <p className="max-w-2xl text-gray-400 font-light mt-6 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed">
            Specialized in building
            <span className="text-white font-medium"> AI-powered agents </span>
            and scalable web applications. I architect autonomous systems that
            automate complex workflows and drive operational efficiency at
            scale.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-5 items-center mt-10">
            <button
              onClick={handleResumeClick}
              className="group relative px-8 py-4 bg-primary text-black font-bold rounded-full overflow-hidden transition-all hover:pr-12 active:scale-95 flex items-center gap-2"
            >
              <span>View Resume</span>
              <TbDownload className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>

            <button
              onClick={() => scrollToSection(projectsRef)}
              className="flex items-center gap-2 px-6 py-4 text-white font-semibold hover:text-primary transition-colors group"
            >
              See My Work
              <TbArrowRightCircle className="text-2xl group-hover:translate-x-1 group-hover:-rotate-45 transition-transform" />
            </button>
          </div>
        </div>

        {/* Stats Section - Refined Design */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-none">
                {stat.value}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 uppercase tracking-widest font-medium">
                {stat.label}{" "}
                <span className="text-gray-300 block">{stat.highlight}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <main className="md:space-y-20 space-y-10 pt-20">
        <section ref={projectsRef} className="">
          <Projects />
        </section>

        <section className=" ">
          <Experience />
        </section>

        <section className="">
          <Education />
        </section>

        <section className="">
          <SkillsAndTools />
        </section>

        <section className="">
          <GithubCalendar />
        </section>

        <section className="">
          <LeetCodeStats />
        </section>

        <section ref={contactRef} className="">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Home;

const LeetCodeStats = () => {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch(
          "https://alfa-leetcode-api.herokuapp.com/userProfile/Surya_janardhan",
        );
        const data = await response.json();

        if (data && data.userProfile) {
          setStats({
            solved: data.userProfile.solvedProblem || 0,
            submissions:
              data.userProfile.totalSubmissionNum?.[0]?.submissions || 0,
            acceptance:
              data.userProfile.totalSubmissionNum?.[0]?.acceptanceRate || 0,
          });
        }
      } catch (error) {
        console.log("Using fallback stats");
        setStats({
          solved: 400,
          submissions: 850,
          acceptance: "47.3%",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  return (
    <section className="px-2 mx-auto text-white">
      <h2 className="text-[clamp(2.2rem,8vw,60px)] font-bold mb-6 md:mb-16 text-white leading-tight text-center md:text-left uppercase">
        Algorithmic <span className="text-primary">Programming</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1100px] mx-auto">
        {/* LeetCode Stats */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-primary/30">
          <h3 className="text-2xl font-bold text-white mb-6">LeetCode</h3>
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Problems Solved</span>
                <span className="text-3xl font-bold text-primary">
                  {stats?.solved}+
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Submissions</span>
                <span className="text-xl font-semibold text-white">
                  {stats?.submissions}+
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Acceptance Rate</span>
                <span className="text-lg font-semibold text-white">
                  {stats?.acceptance}%
                </span>
              </div>
              <a
                href="https://leetcode.com/u/Surya_janardhan/"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-6 px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-white transition-all"
              >
                View Profile
              </a>
            </div>
          )}
        </div>

        {/* DSA & Algorithm Skills */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-primary/30">
          <h3 className="text-2xl font-bold text-white mb-6">DSA Expertise</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-300">
                Data Structures & Algorithms
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-300">Dynamic Programming</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-300">Graph Theory & Trees</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-300">Greedy & Backtracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-300">System Design</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-300">Optimization Techniques</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
