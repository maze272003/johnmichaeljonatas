import React from 'react';
import { Code2 } from 'lucide-react';

function About() {
  return (
    <section id="about" className="container mx-auto">
      <h2 className="relative flex items-center w-full whitespace-nowrap text-3xl font-bold text-text-primary after:content-[''] after:block after:w-full after:h-[1px] after:ml-4 after:bg-text-secondary/20">
        <span className="text-accent font-mono text-2xl mr-2">01.</span> About Me
      </h2>
      <div className="grid md:grid-cols-5 gap-12 mt-12 items-start">
        <div className="md:col-span-3 text-lg text-text-secondary space-y-4">
          <p>
            Hello there! I'm John Michael Jonatas, a dedicated web developer with a keen eye for detail and a love for creating engaging user interfaces. My journey into the world of web development began with a fascination for how digital products come to life.
          </p>
          <p>
            I specialize in front-end development using <strong>React.js</strong>, crafting responsive and dynamic experiences. I'm always eager to learn new technologies and improve my skills to deliver high-quality code.
          </p>
          <p>
            When I'm not coding, you can find me exploring new design trends or contributing to open-source projects. Let's build something amazing together!
          </p>
        </div>
        <div className="md:col-span-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-lg group">
                <div className="absolute inset-0 bg-accent rounded-lg transform transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="absolute inset-0 border-2 border-accent rounded-lg flex items-center justify-center bg-secondary">
                    <Code2 className="w-24 h-24 text-accent" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default About;