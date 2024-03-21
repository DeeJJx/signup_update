import React, { useState } from 'react';

function SkillMenu({
  onSkillSubmit
}) {
    //Skill selection
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
  
    const handleJobSelection = (job) => {
      if (selectedJobs.includes(job)) {
        setSelectedJobs(
          selectedJobs.filter((selectedJob) => selectedJob !== job)
        );
      } else {
        setSelectedJobs([...selectedJobs, job]);
      }
    };
  
    const handleSkillSelection = (skill) => {
      if (selectedSkills.includes(skill)) {
        setSelectedSkills(
          selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
        );
      } else {
        setSelectedSkills([...selectedSkills, skill]);
      }
    };

    
  const [introText, setIntroText] = useState(
    "Welcome to [Company Name], your go-to destination for top-notch [Trade] services. With years of experience, we are dedicated to providing high-quality [Trade] solutions for residential and commercial clients. Our skilled team of [Trade] is here to address all your [Trade] needs with professionalism and efficiency."
  );
  const [skillText, setSkillText] = useState('');

  const handleIntroChange = (e) => {
    setIntroText(e.target.value);
  };

  const handleSkillsChange = (e) => {
    setSkillText(e.target.value);
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    // You can access introText, selectedJobs, selectedSkills, and skillText here
    // Call the onSubmit function and pass the necessary data
    onSkillSubmit({ introText, selectedJobs, selectedSkills, skillText });
  };

  const skillsByJob = {
    plumber: [
      "Pipe Fitting",
      "Drain Cleaning",
      "Fixture Installation",
      "Leak Repair",
      "Pipe Welding",
      "Soldering",
      "Water Heater Repair",
      "Backflow Prevention",
      "Gas Line Repair",
      "Septic System Maintenance",
    ],
    electrician: [
      "Wiring",
      "Circuit Installation",
      "Fixture Installation",
      "Outlet Repair",
      "Breaker Panel Upgrades",
      "Lighting Installation",
      "Ceiling Fan Installation",
      "Generator Installation",
      "Home Automation",
      "Electrical Inspections",
    ],
    landscaper: [
      "Lawn Maintenance",
      "Gardening",
      "Tree Trimming",
      "Hardscape Installation",
      "Landscape Design",
      "Irrigation Installation",
      "Fertilization",
      "Pest Control",
      "Sod Installation",
      "Mulching",
    ],
    all: [
      "Pipe Fitting",
      "Drain Cleaning",
      "Fixture Installation",
      "Leak Repair",
      "Pipe Welding",
      "Soldering",
      "Water Heater Repair",
      "Backflow Prevention",
      "Gas Line Repair",
      "Septic System Maintenance",
      "Wiring",
      "Circuit Installation",
      "Outlet Repair",
      "Breaker Panel Upgrades",
      "Lighting Installation",
      "Ceiling Fan Installation",
      "Generator Installation",
      "Home Automation",
      "Electrical Inspections",
      "Lawn Maintenance",
      "Gardening",
      "Tree Trimming",
      "Hardscape Installation",
      "Landscape Design",
      "Irrigation Installation",
      "Fertilization",
      "Pest Control",
      "Sod Installation",
      "Mulching",
    ],
  };

  return (
    <form className="skills-form" onSubmit={handleSkillSubmit}>
      <div className="intro-section">
        <h2>
          From here you can write an introductory section or use ours and fill
          in the blanks.
        </h2>
        <textarea
          rows="6"
          cols="50"
          value={introText}
          onChange={handleIntroChange}
        />
      </div>
      <div className="skills-section">
        <h2>
          From here you can select the skills you'd like to highlight on your
          site.
        </h2>
        <p>
          Additionally we have included a skills section where you can write
          about your experience or things we may have missed.
        </p>
      </div>
      <div className="skills-section">
        <h2>Select the skills you'd like to highlight:</h2>
        <div className="job-options">
          <label>
            <input
              type="checkbox"
              onChange={() => handleJobSelection("plumber")}
            />
            Plumber
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleJobSelection("electrician")}
            />
            Electrician
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleJobSelection("landscaper")}
            />
            Landscaper
          </label>
          <label>
            <input type="checkbox" onChange={() => handleJobSelection("all")} />
            All
          </label>
        </div>
        {selectedJobs.length > 0 && (
          <div className="selected-skills">
            <h3>Selected Skills:</h3>
            <ul>
              {selectedJobs.includes("all")
                ? skillsByJob.all.map((skill, index) => (
                    <li key={`all-${index}`}>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleSkillSelection(skill)}
                          checked={selectedSkills.includes(skill)}
                        />
                        {skill}
                      </label>
                    </li>
                  ))
                : selectedJobs.flatMap((job) =>
                    skillsByJob[job].map((skill, index) => (
                      <li key={`${job}-${skill}`}>
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => handleSkillSelection(skill)}
                            checked={selectedSkills.includes(skill)}
                          />
                          {skill}
                        </label>
                      </li>
                    ))
                  )}
            </ul>
          </div>
        )}
      </div>
      <textarea
        rows="6"
        cols="50"
        value={skillText}
        onChange={handleSkillsChange}
      />
      <button type="submit">Submit skills</button>
    </form>
  );
}

export default SkillMenu;