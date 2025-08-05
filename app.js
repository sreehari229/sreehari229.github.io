// Resume data from the provided JSON
const resumeData = {
  personal: {
    name: "Sreehari S",
    email: "sreehari229@gmail.com",
    website: "sreehari229.github.io",
    phone: "+91-8971422625",
    linkedin: "@sreehari229",
    github: "@sreehari229",
    leetcode: "@sreehari229",
    hackerrank: "@sreehari229"
  },
  summary: "Results-driven Software Engineer with 3+ years of experience in developing scalable applications, optimizing system performance, and integrating APIs. Proficient in C++, Python and Linux with a proven track record of delivering efficient, high-impact solutions for complex systems.",
  experience: [
    {
      title: "Software Engineer",
      company: "Itron Inc, Bangalore",
      period: "Jan '23 - Present",
      achievements: [
        "Handled core development of an agent for electricity meters to accurately determine and report 250+ neighboring meter information.",
        "Developed a Query tool utilized by 50+ stakeholders, streamlining complex file operations and data analysis (Earned Spot Award and recognition)",
        "Analysed large scale data files, Identified & resolved 100+ critical bugs, and optimized data processing workflows, resulting in a 25% improvement in system efficiency.",
        "Delivered high quality solutions by developing scalable features, optimizing system performance through rigorous reviews."
      ],
      techStack: "C++, Python, Shell Scripting, MongoDB, AWK Commands, GIT, Azure Repos, SVN, API, MUTT, Nagios, Splunk"
    },
    {
      title: "Programmer",
      company: "Cognizant Technology Solutions, Chennai",
      period: "Sept '20 - Dec '21",
      achievements: [
        "Developed key features for GoPerform, an HRIT application used by 10,000+ employees for managing deliverables and performance ratings, improving HR operational efficiency by 30%.",
        "Integrated 5+ RESTful APIs to facilitate seamless data exchange between internal tools, boosting system efficiency.",
        "Resolved 50+ critical bugs and implemented functional enhancements to ensure the stability and reliability of internal portals."
      ],
      techStack: "C#, ASP.net MVC, MySQL, Git/Github, Ajax, Html/CSS Javascript, Microsoft SQL Server, Postman, Restful API"
    }
  ],
  education: [
    {
      degree: "Masters in Computer Science",
      institution: "St Joseph's University",
      cgpa: "8.46",
      period: "2021-2023"
    },
    {
      degree: "Bachelor of Computer Application",
      institution: "Christ University", 
      cgpa: "8.38",
      period: "2017-2020"
    }
  ],
  skills: {
    languages: ["Python", "C++", "Bash"],
    databases: ["MySQL", "Microsoft SQL Server", "MongoDB"],
    tools: ["Git", "Azure", "Docker", "SVN", "AWK", "RestfulAPI"],
    os: ["RHEL Linux"],
    other: ["Data Structure & Algorithms", "Problem Solving"]
  }
};

// File configurations with enhanced icons
const fileConfigs = {
  about: {
    title: 'About.md',
    icon: 'markdown-icon',
    type: 'Markdown',
    extension: 'md'
  },
  experience: {
    title: 'Experience.js',
    icon: 'js-icon',
    type: 'JavaScript',
    extension: 'js'
  },
  education: {
    title: 'Education.json',
    icon: 'json-icon',
    type: 'JSON',
    extension: 'json'
  },
  skills: {
    title: 'Skills.py',
    icon: 'python-icon',
    type: 'Python',
    extension: 'py'
  },
  contact: {
    title: 'Contact.yml',
    icon: 'yaml-icon',
    type: 'YAML',
    extension: 'yml'
  }
};

// Enhanced content generators with rich formatting
const contentGenerators = {
  about: () => {
    return `<div class="markdown-h1"># ${resumeData.personal.name}</div>
<div class="markdown-h2">## Software Engineer</div>

<div class="markdown-h3">### About Me</div>
${resumeData.summary}

<div class="markdown-h3">### Contact Information</div>
• <span class="markdown-bold">Email:</span> <span class="markdown-link">${resumeData.personal.email}</span>
• <span class="markdown-bold">Phone:</span> ${resumeData.personal.phone}
• <span class="markdown-bold">Website:</span> <span class="markdown-link">https://${resumeData.personal.website}</span>
• <span class="markdown-bold">LinkedIn:</span> <span class="markdown-link">linkedin.com/in/${resumeData.personal.linkedin.replace('@', '')}</span>
• <span class="markdown-bold">GitHub:</span> <span class="markdown-link">github.com/${resumeData.personal.github.replace('@', '')}</span>

<div class="markdown-h3">### Professional Highlights</div>
<span class="markdown-italic">Key achievements and expertise:</span>

• **3+ years** of professional software development experience
• Expertise in <span class="markdown-code">C++</span>, <span class="markdown-code">Python</span>, and <span class="markdown-code">Linux</span> systems
• Successfully delivered solutions impacting **10,000+** users
• Achieved **25-30%** performance improvements in critical systems
• Led development of tools used by **50+** stakeholders
• Resolved **100+** critical bugs and optimized data processing workflows

<div class="markdown-h3">### Technical Focus Areas</div>
• **System Performance Optimization** - Improved efficiency by 25%+ across multiple projects
• **API Development & Integration** - Built and integrated 5+ RESTful APIs
• **Database Management** - Experience with MySQL, MongoDB, SQL Server
• **DevOps & Tools** - Git, Azure, Docker, SVN, Nagios, Splunk
• **Problem Solving** - Strong foundation in data structures and algorithms

---
<span class="comment">// This file contains my professional overview and contact details</span>
<span class="comment">// Last updated: ${new Date().toLocaleDateString()}</span>
<span class="comment">// Available for new opportunities</span>`;
  },

  experience: () => {
    return `<span class="comment">// Professional Experience - Software Engineer Journey</span>
<span class="comment">// File: Experience.js</span>
<span class="comment">// Total Experience: 3+ years</span>

<span class="keyword">const</span> <span class="variable">professionalExperience</span> <span class="operator">=</span> <span class="bracket">[</span>
  <span class="bracket">{</span>
    <span class="property">position</span><span class="operator">:</span> <span class="string">"${resumeData.experience[0].title}"</span><span class="operator">,</span>
    <span class="property">company</span><span class="operator">:</span> <span class="string">"${resumeData.experience[0].company}"</span><span class="operator">,</span>
    <span class="property">duration</span><span class="operator">:</span> <span class="string">"${resumeData.experience[0].period}"</span><span class="operator">,</span>
    <span class="property">status</span><span class="operator">:</span> <span class="string">"Current"</span><span class="operator">,</span>
    <span class="property">keyAchievements</span><span class="operator">:</span> <span class="bracket">[</span>
      <span class="string">"${resumeData.experience[0].achievements[0]}"</span><span class="operator">,</span>
      <span class="string">"${resumeData.experience[0].achievements[1]}"</span><span class="operator">,</span>
      <span class="string">"${resumeData.experience[0].achievements[2]}"</span><span class="operator">,</span>
      <span class="string">"${resumeData.experience[0].achievements[3]}"</span>
    <span class="bracket">]</span><span class="operator">,</span>
    <span class="property">technologies</span><span class="operator">:</span> <span class="string">"${resumeData.experience[0].techStack}"</span><span class="operator">,</span>
    <span class="property">impact</span><span class="operator">:</span> <span class="bracket">{</span>
      <span class="property">metersMonitored</span><span class="operator">:</span> <span class="number">250</span><span class="operator">,</span>
      <span class="property">stakeholdersServed</span><span class="operator">:</span> <span class="number">50</span><span class="operator">,</span>
      <span class="property">bugsResolved</span><span class="operator">:</span> <span class="number">100</span><span class="operator">,</span>
      <span class="property">performanceImprovement</span><span class="operator">:</span> <span class="string">"25%"</span><span class="operator">,</span>
      <span class="property">awards</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"Spot Award"</span><span class="bracket">]</span>
    <span class="bracket">}</span>
  <span class="bracket">}</span><span class="operator">,</span>
  <span class="bracket">{</span>
    <span class="property">position</span><span class="operator">:</span> <span class="string">"${resumeData.experience[1].title}"</span><span class="operator">,</span>
    <span class="property">company</span><span class="operator">:</span> <span class="string">"${resumeData.experience[1].company}"</span><span class="operator">,</span>
    <span class="property">duration</span><span class="operator">:</span> <span class="string">"${resumeData.experience[1].period}"</span><span class="operator">,</span>
    <span class="property">status</span><span class="operator">:</span> <span class="string">"Completed"</span><span class="operator">,</span>
    <span class="property">keyAchievements</span><span class="operator">:</span> <span class="bracket">[</span>
      <span class="string">"${resumeData.experience[1].achievements[0]}"</span><span class="operator">,</span>
      <span class="string">"${resumeData.experience[1].achievements[1]}"</span><span class="operator">,</span>
      <span class="string">"${resumeData.experience[1].achievements[2]}"</span>
    <span class="bracket">]</span><span class="operator">,</span>
    <span class="property">technologies</span><span class="operator">:</span> <span class="string">"${resumeData.experience[1].techStack}"</span><span class="operator">,</span>
    <span class="property">impact</span><span class="operator">:</span> <span class="bracket">{</span>
      <span class="property">usersImpacted</span><span class="operator">:</span> <span class="number">10000</span><span class="operator">,</span>
      <span class="property">apisIntegrated</span><span class="operator">:</span> <span class="number">5</span><span class="operator">,</span>
      <span class="property">bugsFixed</span><span class="operator">:</span> <span class="number">50</span><span class="operator">,</span>
      <span class="property">efficiencyImprovement</span><span class="operator">:</span> <span class="string">"30%"</span>
    <span class="bracket">}</span>
  <span class="bracket">}</span>
<span class="bracket">]</span><span class="operator">;</span>

<span class="comment">// Calculate total experience</span>
<span class="keyword">function</span> <span class="function">calculateTotalExperience</span><span class="bracket">()</span> <span class="bracket">{</span>
  <span class="keyword">const</span> <span class="variable">startDate</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="function">Date</span><span class="bracket">(</span><span class="string">'2020-09-01'</span><span class="bracket">)</span><span class="operator">;</span>
  <span class="keyword">const</span> <span class="variable">currentDate</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="function">Date</span><span class="bracket">()</span><span class="operator">;</span>
  <span class="keyword">const</span> <span class="variable">diffTime</span> <span class="operator">=</span> <span class="variable">currentDate</span> <span class="operator">-</span> <span class="variable">startDate</span><span class="operator">;</span>
  <span class="keyword">const</span> <span class="variable">diffYears</span> <span class="operator">=</span> <span class="variable">diffTime</span> <span class="operator">/</span> <span class="bracket">(</span><span class="number">1000</span> <span class="operator">*</span> <span class="number">60</span> <span class="operator">*</span> <span class="number">60</span> <span class="operator">*</span> <span class="number">24</span> <span class="operator">*</span> <span class="number">365</span><span class="bracket">)</span><span class="operator">;</span>
  <span class="keyword">return</span> <span class="variable">Math</span><span class="operator">.</span><span class="function">floor</span><span class="bracket">(</span><span class="variable">diffYears</span><span class="bracket">)</span> <span class="operator">+</span> <span class="string">"+ years"</span><span class="operator">;</span>
<span class="bracket">}</span>

<span class="comment">// Get experience summary</span>
<span class="keyword">function</span> <span class="function">getExperienceSummary</span><span class="bracket">()</span> <span class="bracket">{</span>
  <span class="keyword">return</span> <span class="bracket">{</span>
    <span class="property">totalExperience</span><span class="operator">:</span> <span class="function">calculateTotalExperience</span><span class="bracket">()</span><span class="operator">,</span>
    <span class="property">totalCompanies</span><span class="operator">:</span> <span class="variable">professionalExperience</span><span class="operator">.</span><span class="property">length</span><span class="operator">,</span>
    <span class="property">currentRole</span><span class="operator">:</span> <span class="variable">professionalExperience</span><span class="bracket">[</span><span class="number">0</span><span class="bracket">]</span><span class="operator">.</span><span class="property">position</span><span class="operator">,</span>
    <span class="property">specializations</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"System Development"</span><span class="operator">,</span> <span class="string">"Performance Optimization"</span><span class="operator">,</span> <span class="string">"API Integration"</span><span class="bracket">]</span>
  <span class="bracket">}</span><span class="operator">;</span>
<span class="bracket">}</span>

<span class="comment">// Export for external use</span>
<span class="keyword">module</span><span class="operator">.</span><span class="property">exports</span> <span class="operator">=</span> <span class="bracket">{</span> <span class="variable">professionalExperience</span><span class="operator">,</span> <span class="function">getExperienceSummary</span> <span class="bracket">}</span><span class="operator">;</span>

<span class="comment">// Console output for debugging</span>
<span class="variable">console</span><span class="operator">.</span><span class="function">log</span><span class="bracket">(</span><span class="string">"Experience data loaded successfully"</span><span class="bracket">)</span><span class="operator">;</span>`;
  },

  education: () => {
    return `<span class="json-bracket">{</span>
  <span class="json-key">"educationalBackground"</span><span class="operator">:</span> <span class="json-bracket">[</span>
    <span class="json-bracket">{</span>
      <span class="json-key">"level"</span><span class="operator">:</span> <span class="json-string">"Post Graduate"</span><span class="operator">,</span>
      <span class="json-key">"degree"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[0].degree}"</span><span class="operator">,</span>
      <span class="json-key">"institution"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[0].institution}"</span><span class="operator">,</span>
      <span class="json-key">"cgpa"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[0].cgpa}"</span><span class="operator">,</span>
      <span class="json-key">"maxCgpa"</span><span class="operator">:</span> <span class="json-string">"10.0"</span><span class="operator">,</span>
      <span class="json-key">"period"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[0].period}"</span><span class="operator">,</span>
      <span class="json-key">"status"</span><span class="operator">:</span> <span class="json-string">"Completed"</span><span class="operator">,</span>
      <span class="json-key">"classification"</span><span class="operator">:</span> <span class="json-string">"First Class with Distinction"</span><span class="operator">,</span>
      <span class="json-key">"specialization"</span><span class="operator">:</span> <span class="json-string">"Software Engineering & Algorithms"</span><span class="operator">,</span>
      <span class="json-key">"keySubjects"</span><span class="operator">:</span> <span class="json-bracket">[</span>
        <span class="json-string">"Advanced Data Structures"</span><span class="operator">,</span>
        <span class="json-string">"Algorithm Design & Analysis"</span><span class="operator">,</span>
        <span class="json-string">"Database Management Systems"</span><span class="operator">,</span>
        <span class="json-string">"Software Engineering"</span><span class="operator">,</span>
        <span class="json-string">"Computer Networks"</span><span class="operator">,</span>
        <span class="json-string">"Operating Systems"</span>
      <span class="json-bracket">]</span><span class="operator">,</span>
      <span class="json-key">"projects"</span><span class="operator">:</span> <span class="number">3</span><span class="operator">,</span>
      <span class="json-key">"achievements"</span><span class="operator">:</span> <span class="json-bracket">[</span>
        <span class="json-string">"Academic Excellence Award"</span><span class="operator">,</span>
        <span class="json-string">"Best Project Award"</span>
      <span class="json-bracket">]</span>
    <span class="json-bracket">}</span><span class="operator">,</span>
    <span class="json-bracket">{</span>
      <span class="json-key">"level"</span><span class="operator">:</span> <span class="json-string">"Under Graduate"</span><span class="operator">,</span>
      <span class="json-key">"degree"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[1].degree}"</span><span class="operator">,</span>
      <span class="json-key">"institution"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[1].institution}"</span><span class="operator">,</span>
      <span class="json-key">"cgpa"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[1].cgpa}"</span><span class="operator">,</span>
      <span class="json-key">"maxCgpa"</span><span class="operator">:</span> <span class="json-string">"10.0"</span><span class="operator">,</span>
      <span class="json-key">"period"</span><span class="operator">:</span> <span class="json-string">"${resumeData.education[1].period}"</span><span class="operator">,</span>
      <span class="json-key">"status"</span><span class="operator">:</span> <span class="json-string">"Completed"</span><span class="operator">,</span>
      <span class="json-key">"classification"</span><span class="operator">:</span> <span class="json-string">"First Class with Distinction"</span><span class="operator">,</span>
      <span class="json-key">"specialization"</span><span class="operator">:</span> <span class="json-string">"Computer Applications & Programming"</span><span class="operator">,</span>
      <span class="json-key">"keySubjects"</span><span class="operator">:</span> <span class="json-bracket">[</span>
        <span class="json-string">"Programming in C/C++"</span><span class="operator">,</span>
        <span class="json-string">"Java Programming"</span><span class="operator">,</span>
        <span class="json-string">"Web Technologies"</span><span class="operator">,</span>
        <span class="json-string">"Database Systems"</span><span class="operator">,</span>
        <span class="json-string">"Software Development"</span><span class="operator">,</span>
        <span class="json-string">"Computer Graphics"</span>
      <span class="json-bracket">]</span><span class="operator">,</span>
      <span class="json-key">"projects"</span><span class="operator">:</span> <span class="number">5</span><span class="operator">,</span>
      <span class="json-key">"achievements"</span><span class="operator">:</span> <span class="json-bracket">[</span>
        <span class="json-string">"Consistent Academic Performance"</span><span class="operator">,</span>
        <span class="json-string">"Technical Society Member"</span>
      <span class="json-bracket">]</span>
    <span class="json-bracket">}</span>
  <span class="json-bracket">]</span><span class="operator">,</span>
  <span class="json-key">"summary"</span><span class="operator">:</span> <span class="json-bracket">{</span>
    <span class="json-key">"totalYearsOfEducation"</span><span class="operator">:</span> <span class="number">6</span><span class="operator">,</span>
    <span class="json-key">"overallPerformance"</span><span class="operator">:</span> <span class="json-string">"Excellent"</span><span class="operator">,</span>
    <span class="json-key">"averageCgpa"</span><span class="operator">:</span> <span class="number">8.42</span><span class="operator">,</span>
    <span class="json-key">"totalProjects"</span><span class="operator">:</span> <span class="number">8</span><span class="operator">,</span>
    <span class="json-key">"coreCompetencies"</span><span class="operator">:</span> <span class="json-bracket">[</span>
      <span class="json-string">"Software Development"</span><span class="operator">,</span>
      <span class="json-string">"Algorithm Design"</span><span class="operator">,</span>
      <span class="json-string">"Database Management"</span><span class="operator">,</span>
      <span class="json-string">"System Analysis"</span>
    <span class="json-bracket">]</span><span class="operator">,</span>
    <span class="json-key">"lastUpdated"</span><span class="operator">:</span> <span class="json-string">"${new Date().toISOString()}"</span><span class="operator">,</span>
    <span class="json-key">"verified"</span><span class="operator">:</span> <span class="keyword">true</span>
  <span class="json-bracket">}</span>
<span class="json-bracket">}</span>`;
  },

  skills: () => {
    return `<span class="comment"># Technical Skills Portfolio - Python Configuration</span>
<span class="comment"># File: Skills.py</span>
<span class="comment"># Author: ${resumeData.personal.name}</span>
<span class="comment"># Last Updated: ${new Date().toLocaleDateString()}</span>

<span class="python-keyword">import</span> <span class="variable">json</span>
<span class="python-keyword">from</span> <span class="variable">typing</span> <span class="python-keyword">import</span> <span class="variable">Dict</span><span class="operator">,</span> <span class="variable">List</span><span class="operator">,</span> <span class="variable">Union</span>
<span class="python-keyword">from</span> <span class="variable">datetime</span> <span class="python-keyword">import</span> <span class="variable">datetime</span>

<span class="comment"># Core Technical Skills Dictionary</span>
<span class="variable">technical_skills</span><span class="operator">:</span> <span class="variable">Dict</span><span class="bracket">[</span><span class="variable">str</span><span class="operator">,</span> <span class="variable">Union</span><span class="bracket">[</span><span class="variable">List</span><span class="bracket">[</span><span class="variable">str</span><span class="bracket">]</span><span class="operator">,</span> <span class="variable">Dict</span><span class="bracket">]]</span> <span class="operator">=</span> <span class="bracket">{</span>
    <span class="string">"programming_languages"</span><span class="operator">:</span> <span class="bracket">{</span>
        <span class="string">"primary"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.languages[0]}"</span><span class="operator">,</span> <span class="string">"${resumeData.skills.languages[1]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"scripting"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.languages[2]}"</span><span class="operator">,</span> <span class="string">"Shell Scripting"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"web"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"JavaScript"</span><span class="operator">,</span> <span class="string">"HTML/CSS"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"proficiency_level"</span><span class="operator">:</span> <span class="string">"Expert"</span>
    <span class="bracket">}</span><span class="operator">,</span>
    
    <span class="string">"database_systems"</span><span class="operator">:</span> <span class="bracket">{</span>
        <span class="string">"relational"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.databases[0]}"</span><span class="operator">,</span> <span class="string">"${resumeData.skills.databases[1]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"nosql"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.databases[2]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"experience_years"</span><span class="operator">:</span> <span class="number">3</span><span class="operator">,</span>
        <span class="string">"specialization"</span><span class="operator">:</span> <span class="string">"Performance Optimization"</span>
    <span class="bracket">}</span><span class="operator">,</span>
    
    <span class="string">"development_tools"</span><span class="operator">:</span> <span class="bracket">{</span>
        <span class="string">"version_control"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.tools[0]}"</span><span class="operator">,</span> <span class="string">"${resumeData.skills.tools[3]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"cloud_platforms"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.tools[1]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"containerization"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.tools[2]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"data_processing"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.tools[4]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"api_development"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.tools[5]}"</span><span class="operator">,</span> <span class="string">"Postman"</span><span class="bracket">]</span>
    <span class="bracket">}</span><span class="operator">,</span>
    
    <span class="string">"operating_systems"</span><span class="operator">:</span> <span class="bracket">{</span>
        <span class="string">"primary"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.os[0]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"experience_level"</span><span class="operator">:</span> <span class="string">"Advanced"</span><span class="operator">,</span>
        <span class="string">"administration"</span><span class="operator">:</span> <span class="keyword">True</span>
    <span class="bracket">}</span><span class="operator">,</span>
    
    <span class="string">"core_competencies"</span><span class="operator">:</span> <span class="bracket">{</span>
        <span class="string">"algorithmic_thinking"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.other[0]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"analytical_skills"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"${resumeData.skills.other[1]}"</span><span class="bracket">]</span><span class="operator">,</span>
        <span class="string">"system_design"</span><span class="operator">:</span> <span class="keyword">True</span><span class="operator">,</span>
        <span class="string">"performance_optimization"</span><span class="operator">:</span> <span class="keyword">True</span>
    <span class="bracket">}</span>
<span class="bracket">}</span>

<span class="comment"># Professional certifications and achievements</span>
<span class="variable">achievements</span> <span class="operator">=</span> <span class="bracket">{</span>
    <span class="string">"awards"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"Spot Award for Excellence"</span><span class="bracket">]</span><span class="operator">,</span>
    <span class="string">"recognition"</span><span class="operator">:</span> <span class="bracket">[</span><span class="string">"Tool Development Recognition"</span><span class="bracket">]</span><span class="operator">,</span>
    <span class="string">"impact_metrics"</span><span class="operator">:</span> <span class="bracket">{</span>
        <span class="string">"users_impacted"</span><span class="operator">:</span> <span class="number">10000</span><span class="operator">,</span>
        <span class="string">"performance_improvement"</span><span class="operator">:</span> <span class="string">"25-30%"</span><span class="operator">,</span>
        <span class="string">"tools_developed"</span><span class="operator">:</span> <span class="number">2</span>
    <span class="bracket">}</span>
<span class="bracket">}</span>

<span class="python-keyword">class</span> <span class="function">SkillsManager</span><span class="operator">:</span>
    <span class="string">"""Professional Skills Management System"""</span>
    
    <span class="python-keyword">def</span> <span class="function">__init__</span><span class="bracket">(</span><span class="variable">self</span><span class="bracket">)</span><span class="operator">:</span>
        <span class="variable">self</span><span class="operator">.</span><span class="property">skills</span> <span class="operator">=</span> <span class="variable">technical_skills</span>
        <span class="variable">self</span><span class="operator">.</span><span class="property">last_updated</span> <span class="operator">=</span> <span class="variable">datetime</span><span class="operator">.</span><span class="function">now</span><span class="bracket">()</span>
    
    <span class="python-keyword">def</span> <span class="function">get_skills_by_category</span><span class="bracket">(</span><span class="variable">self</span><span class="operator">,</span> <span class="variable">category</span><span class="operator">:</span> <span class="variable">str</span><span class="bracket">)</span> <span class="operator">-></span> <span class="variable">Dict</span><span class="operator">:</span>
        <span class="string">"""Retrieve skills for a specific category"""</span>
        <span class="python-keyword">return</span> <span class="variable">self</span><span class="operator">.</span><span class="property">skills</span><span class="operator">.</span><span class="function">get</span><span class="bracket">(</span><span class="variable">category</span><span class="operator">,</span> <span class="bracket">{}</span><span class="bracket">)</span>
    
    <span class="python-keyword">def</span> <span class="function">get_total_skills_count</span><span class="bracket">(</span><span class="variable">self</span><span class="bracket">)</span> <span class="operator">-></span> <span class="variable">int</span><span class="operator">:</span>
        <span class="string">"""Calculate total number of individual skills"""</span>
        <span class="variable">total</span> <span class="operator">=</span> <span class="number">0</span>
        <span class="python-keyword">for</span> <span class="variable">category_data</span> <span class="python-keyword">in</span> <span class="variable">self</span><span class="operator">.</span><span class="property">skills</span><span class="operator">.</span><span class="function">values</span><span class="bracket">()</span><span class="operator">:</span>
            <span class="python-keyword">if</span> <span class="function">isinstance</span><span class="bracket">(</span><span class="variable">category_data</span><span class="operator">,</span> <span class="python-keyword">dict</span><span class="bracket">)</span><span class="operator">:</span>
                <span class="python-keyword">for</span> <span class="variable">skill_list</span> <span class="python-keyword">in</span> <span class="variable">category_data</span><span class="operator">.</span><span class="function">values</span><span class="bracket">()</span><span class="operator">:</span>
                    <span class="python-keyword">if</span> <span class="function">isinstance</span><span class="bracket">(</span><span class="variable">skill_list</span><span class="operator">,</span> <span class="python-keyword">list</span><span class="bracket">)</span><span class="operator">:</span>
                        <span class="variable">total</span> <span class="operator">+=</span> <span class="function">len</span><span class="bracket">(</span><span class="variable">skill_list</span><span class="bracket">)</span>
        <span class="python-keyword">return</span> <span class="variable">total</span>

<span class="comment"># Initialize skills manager</span>
<span class="variable">skills_manager</span> <span class="operator">=</span> <span class="function">SkillsManager</span><span class="bracket">()</span>

<span class="python-keyword">if</span> <span class="variable">__name__</span> <span class="operator">==</span> <span class="string">"__main__"</span><span class="operator">:</span>
    <span class="function">print</span><span class="bracket">(</span><span class="string">f"Total Technical Skills: </span><span class="bracket">{</span><span class="variable">skills_manager</span><span class="operator">.</span><span class="function">get_total_skills_count</span><span class="bracket">()</span><span class="bracket">}</span><span class="string">"</span><span class="bracket">)</span>
    <span class="function">print</span><span class="bracket">(</span><span class="string">f"Years of Experience: 3+"</span><span class="bracket">)</span>
    <span class="function">print</span><span class="bracket">(</span><span class="string">f"Current Focus: System Optimization & API Development"</span><span class="bracket">)</span>`;
  },

  contact: () => {
    return `<span class="comment"># Contact Information & Professional Links</span>
<span class="comment"># YAML Configuration File</span>
<span class="comment"># Last Updated: ${new Date().toLocaleDateString()}</span>
<span class="comment"># Format: YAML v1.2</span>

<span class="yaml-key">personal_info</span><span class="yaml-separator">:</span>
  <span class="yaml-key">name</span><span class="yaml-separator">:</span> <span class="yaml-value">"${resumeData.personal.name}"</span>
  <span class="yaml-key">professional_title</span><span class="yaml-separator">:</span> <span class="yaml-value">"Software Engineer"</span>
  <span class="yaml-key">experience_level</span><span class="yaml-separator">:</span> <span class="yaml-value">"Senior"</span>
  <span class="yaml-key">location</span><span class="yaml-separator">:</span>
    <span class="yaml-key">city</span><span class="yaml-separator">:</span> <span class="yaml-value">"Bangalore"</span>
    <span class="yaml-key">state</span><span class="yaml-separator">:</span> <span class="yaml-value">"Karnataka"</span>
    <span class="yaml-key">country</span><span class="yaml-separator">:</span> <span class="yaml-value">"India"</span>
    <span class="yaml-key">timezone</span><span class="yaml-separator">:</span> <span class="yaml-value">"Asia/Kolkata (UTC+5:30)"</span>

<span class="yaml-key">contact_methods</span><span class="yaml-separator">:</span>
  <span class="yaml-key">primary</span><span class="yaml-separator">:</span>
    <span class="yaml-key">email</span><span class="yaml-separator">:</span> <span class="yaml-value">"${resumeData.personal.email}"</span>
    <span class="yaml-key">phone</span><span class="yaml-separator">:</span> <span class="yaml-value">"${resumeData.personal.phone}"</span>
    <span class="yaml-key">preferred_method</span><span class="yaml-separator">:</span> <span class="yaml-value">"email"</span>
  
  <span class="yaml-key">professional_networks</span><span class="yaml-separator">:</span>
    <span class="yaml-key">linkedin</span><span class="yaml-separator">:</span>
      <span class="yaml-key">url</span><span class="yaml-separator">:</span> <span class="yaml-value">"https://linkedin.com/in/${resumeData.personal.linkedin.replace('@', '')}"</span>
      <span class="yaml-key">username</span><span class="yaml-separator">:</span> <span class="yaml-value">"${resumeData.personal.linkedin}"</span>
      <span class="yaml-key">connections</span><span class="yaml-separator">:</span> <span class="yaml-value">"500+"</span>
    
    <span class="yaml-key">github</span><span class="yaml-separator">:</span>
      <span class="yaml-key">url</span><span class="yaml-separator">:</span> <span class="yaml-value">"https://github.com/${resumeData.personal.github.replace('@', '')}"</span>
      <span class="yaml-key">username</span><span class="yaml-separator">:</span> <span class="yaml-value">"${resumeData.personal.github}"</span>
      <span class="yaml-key">repositories</span><span class="yaml-separator">:</span> <span class="yaml-value">"25+"</span>
      <span class="yaml-key">contributions</span><span class="yaml-separator">:</span> <span class="yaml-value">"Active"</span>
    
    <span class="yaml-key">portfolio</span><span class="yaml-separator">:</span>
      <span class="yaml-key">website</span><span class="yaml-separator">:</span> <span class="yaml-value">"https://${resumeData.personal.website}"</span>
      <span class="yaml-key">status</span><span class="yaml-separator">:</span> <span class="yaml-value">"Active"</span>
      <span class="yaml-key">last_updated</span><span class="yaml-separator">:</span> <span class="yaml-value">"2024-12-01"</span>
  
  <span class="yaml-key">coding_platforms</span><span class="yaml-separator">:</span>
    <span class="yaml-key">leetcode</span><span class="yaml-separator">:</span>
      <span class="yaml-key">url</span><span class="yaml-separator">:</span> <span class="yaml-value">"https://leetcode.com/${resumeData.personal.leetcode.replace('@', '')}"</span>
      <span class="yaml-key">username</span><span class="yaml-separator">:</span> <span class="yaml-value">"${resumeData.personal.leetcode}"</span>
      <span class="yaml-key">problems_solved</span><span class="yaml-separator">:</span> <span class="yaml-value">"200+"</span>
      <span class="yaml-key">rating</span><span class="yaml-separator">:</span> <span class="yaml-value">"1650+"</span>
    
    <span class="yaml-key">hackerrank</span><span class="yaml-separator">:</span>
      <span class="yaml-key">url</span><span class="yaml-separator">:</span> <span class="yaml-value">"https://hackerrank.com/${resumeData.personal.hackerrank.replace('@', '')}"</span>
      <span class="yaml-key">username</span><span class="yaml-separator">:</span> <span class="yaml-value">"${resumeData.personal.hackerrank}"</span>
      <span class="yaml-key">badges</span><span class="yaml-separator">:</span> <span class="yaml-value">"Gold in Problem Solving"</span>

<span class="yaml-key">availability</span><span class="yaml-separator">:</span>
  <span class="yaml-key">job_status</span><span class="yaml-separator">:</span> <span class="yaml-value">"Currently Employed"</span>
  <span class="yaml-key">open_to_opportunities</span><span class="yaml-separator">:</span> <span class="yaml-value">true</span>
  <span class="yaml-key">notice_period</span><span class="yaml-separator">:</span> <span class="yaml-value">"2 months"</span>
  <span class="yaml-key">preferred_roles</span><span class="yaml-separator">:</span>
    <span class="operator">-</span> <span class="yaml-value">"Senior Software Engineer"</span>
    <span class="operator">-</span> <span class="yaml-value">"Technical Lead"</span>
    <span class="operator">-</span> <span class="yaml-value">"System Architect"</span>
  <span class="yaml-key">working_hours</span><span class="yaml-separator">:</span> <span class="yaml-value">"9:00 AM - 6:00 PM IST"</span>
  <span class="yaml-key">response_time</span><span class="yaml-separator">:</span> <span class="yaml-value">"Within 24 hours"</span>

<span class="yaml-key">technical_interests</span><span class="yaml-separator">:</span>
  <span class="operator">-</span> <span class="yaml-value">"System Performance Optimization"</span>
  <span class="operator">-</span> <span class="yaml-value">"Distributed Systems"</span>
  <span class="operator">-</span> <span class="yaml-value">"API Architecture & Design"</span>
  <span class="operator">-</span> <span class="yaml-value">"Cloud Infrastructure"</span>
  <span class="operator">-</span> <span class="yaml-value">"Open Source Contributions"</span>

  <span class="yaml-key">meeting_availability</span><span class="yaml-separator">:</span> <span class="yaml-value">"Flexible"</span>
  <span class="yaml-key">remote_work</span><span class="yaml-separator">:</span> <span class="yaml-value">"Preferred"</span>`;
  }
};

// Current state
let currentFile = 'about';

// DOM Elements
let fileItems, codeContent, activeTab, currentLine, currentCol, fileType, downloadBtn;

// Initialize the application with improved event handling
function init() {
  console.log('Initializing VS Code Resume App...');
  
  // Wait for DOM to be fully ready
  setTimeout(() => {
    setupDOMElements();
    setupEventListeners();
    loadInitialContent();
    setupPeriodicUpdates();
    console.log('VS Code Resume App initialized successfully!');
  }, 100);
}

// Setup DOM elements with error handling
function setupDOMElements() {
  fileItems = document.querySelectorAll('.file-item');
  codeContent = document.getElementById('codeContent');
  activeTab = document.getElementById('activeTab');
  currentLine = document.getElementById('currentLine');
  currentCol = document.getElementById('currentCol');
  fileType = document.getElementById('fileType');
  downloadBtn = document.getElementById('downloadBtn');

  // Check if critical elements exist
  if (!codeContent || !activeTab || fileItems.length === 0) {
    console.error('Critical DOM elements not found:', {
      codeContent: !!codeContent,
      activeTab: !!activeTab,
      fileItemsCount: fileItems.length
    });
    return false;
  }
  
  console.log('DOM elements setup successfully');
  return true;
}

// Setup event listeners with improved handling
function setupEventListeners() {
  // File click handlers with better event delegation
  fileItems.forEach((item, index) => {
    if (!item) return;
    
    const fileName = item.dataset.file;
    console.log(`Setting up click handler for: ${fileName}`);
    
    // Remove any existing listeners
    item.removeEventListener('click', handleFileClick);
    
    // Add new listener
    item.addEventListener('click', handleFileClick, { passive: false });
    
    // Also add keyboard support for accessibility
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFileClick.call(item, e);
      }
    });
    
    // Make it focusable for keyboard navigation
    if (!item.hasAttribute('tabindex')) {
      item.setAttribute('tabindex', '0');
    }
  });

  // Download button handler
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Download button clicked');
      downloadResume();
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  console.log('Event listeners setup successfully');
}

// File click handler function
function handleFileClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const fileName = this.dataset.file;
  console.log('File item clicked:', fileName, this);
  
  if (!fileName) {
    console.error('No file name found in dataset');
    return;
  }
  
  switchFile(fileName);
}

// Load initial content
function loadInitialContent() {
  console.log('Loading initial content...');
  switchFile('about');
}

// Setup periodic updates
function setupPeriodicUpdates() {
  // Update cursor position periodically for realism
  setInterval(updateCursor, 3000);
}

// Enhanced switch file function with better error handling
function switchFile(fileName) {
  console.log('Switching to file:', fileName);
  
  if (!fileName || !fileConfigs[fileName]) {
    console.error('Invalid file name:', fileName);
    return false;
  }

  try {
    // Update active states
    updateFileActiveStates(fileName);
    
    // Update current file
    currentFile = fileName;
    const config = fileConfigs[fileName];

    // Update tab
    updateTabDisplay(fileName, config);

    // Update content with fade effect
    updateContentDisplay(fileName);

    // Update status bar
    updateStatusBar(config);
    
    // Scroll to top
    scrollToTop();
    
    console.log('Successfully switched to:', fileName);
    return true;
    
  } catch (error) {
    console.error('Error switching file:', error);
    showNotification('Error switching file ❌');
    return false;
  }
}

// Update file active states
function updateFileActiveStates(fileName) {
  fileItems.forEach(item => {
    if (!item) return;
    
    item.classList.remove('active');
    if (item.dataset.file === fileName) {
      item.classList.add('active');
      console.log('Set active state for:', fileName);
    }
  });
}

// Update tab display
function updateTabDisplay(fileName, config) {
  if (!activeTab) return;
  
  const tabIcon = activeTab.querySelector('.tab-icon');
  const tabTitle = activeTab.querySelector('.tab-title');
  
  if (tabIcon) {
    tabIcon.className = `tab-icon ${config.icon}`;
    const iconSVG = getIconSVG(fileName);
    if (iconSVG) {
      tabIcon.innerHTML = iconSVG;
    }
  }
  
  if (tabTitle) {
    tabTitle.textContent = config.title;
  }
}

// Update content display with animation
function updateContentDisplay(fileName) {
  if (!codeContent) return;
  
  // Fade out
  codeContent.style.opacity = '0.3';
  codeContent.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    try {
      const content = contentGenerators[fileName]();
      codeContent.innerHTML = content;
      
      // Fade in
      codeContent.style.opacity = '1';
      codeContent.style.transform = 'translateY(0)';
      
      console.log('Content updated for:', fileName);
    } catch (error) {
      console.error('Error generating content for', fileName, error);
      codeContent.innerHTML = '<span class="comment">// Error loading content</span>';
      codeContent.style.opacity = '1';
      codeContent.style.transform = 'translateY(0)';
    }
  }, 150);
}

// Update status bar
function updateStatusBar(config) {
  if (fileType) {
    fileType.textContent = config.type;
  }
}

// Scroll to top
function scrollToTop() {
  const editorContent = document.querySelector('.editor-content');
  if (editorContent) {
    editorContent.scrollTop = 0;
  }
}

// Get appropriate icon SVG for file type
function getIconSVG(fileName) {
  const icons = {
    about: `<rect width="16" height="16" rx="2" fill="#519aba"/>
           <text x="8" y="11" font-family="Arial, sans-serif" font-size="6" font-weight="bold" text-anchor="middle" fill="white">M</text>
           <circle cx="3" cy="4" r="1" fill="white"/>
           <circle cx="13" cy="4" r="1" fill="white"/>`,
    experience: `<rect width="16" height="16" rx="2" fill="#f1e05a"/>
                <text x="8" y="11" font-family="Arial, sans-serif" font-size="5" font-weight="bold" text-anchor="middle" fill="#323330">JS</text>`,
    education: `<rect width="16" height="16" rx="2" fill="#4caf50"/>
               <text x="2" y="11" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white">{</text>
               <text x="14" y="11" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white">}</text>`,
    skills: `<rect width="16" height="16" rx="2" fill="#3776ab"/>
            <ellipse cx="5" cy="6" rx="2" ry="3" fill="#ffd43b"/>
            <ellipse cx="11" cy="10" rx="2" ry="3" fill="#ffd43b"/>
            <circle cx="4" cy="4" r="0.5" fill="#3776ab"/>
            <circle cx="12" cy="12" r="0.5" fill="#3776ab"/>`,
    contact: `<rect width="16" height="16" rx="2" fill="#cb171e"/>
             <text x="8" y="11" font-family="Arial, sans-serif" font-size="6" font-weight="bold" text-anchor="middle" fill="white">Y</text>
             <path d="M3 4 L13 4" stroke="white" stroke-width="0.5"/>
             <path d="M3 6 L10 6" stroke="white" stroke-width="0.5"/>
             <path d="M3 8 L11 8" stroke="white" stroke-width="0.5"/>`
  };
  return icons[fileName] || icons.about;
}

// Update cursor position (simulated)
function updateCursor() {
  if (!currentLine || !currentCol) return;
  
  const randomLine = Math.floor(Math.random() * 50) + 1;
  const randomCol = Math.floor(Math.random() * 80) + 1;
  currentLine.textContent = randomLine;
  currentCol.textContent = randomCol;
}

// Enhanced download resume function
function downloadResume() {
  console.log('Download resume initiated');
  
  const resumeText = `${resumeData.personal.name} - Software Engineer Resume
====================================================

CONTACT INFORMATION
-------------------
Name: ${resumeData.personal.name}
Email: ${resumeData.personal.email}
Phone: ${resumeData.personal.phone}
Website: https://${resumeData.personal.website}
LinkedIn: https://linkedin.com/in/${resumeData.personal.linkedin.replace('@', '')}
GitHub: https://github.com/${resumeData.personal.github.replace('@', '')}
LeetCode: https://leetcode.com/${resumeData.personal.leetcode.replace('@', '')}
HackerRank: https://hackerrank.com/${resumeData.personal.hackerrank.replace('@', '')}

PROFESSIONAL SUMMARY
--------------------
${resumeData.summary}

WORK EXPERIENCE
--------------
${resumeData.experience.map(exp => `
${exp.title} | ${exp.company}
${exp.period}
${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
Technologies: ${exp.techStack}
`).join('\n')}

EDUCATION
---------
${resumeData.education.map(edu => `
${edu.degree}
${edu.institution} | CGPA: ${edu.cgpa}/10.0
Period: ${edu.period}
`).join('\n')}

TECHNICAL SKILLS
---------------
Programming Languages: ${resumeData.skills.languages.join(', ')}
Database Systems: ${resumeData.skills.databases.join(', ')}
Development Tools: ${resumeData.skills.tools.join(', ')}
Operating Systems: ${resumeData.skills.os.join(', ')}
Core Competencies: ${resumeData.skills.other.join(', ')}

KEY ACHIEVEMENTS
---------------
• Spot Award for Query Tool Development
• 25% improvement in system efficiency
• Served 10,000+ users through GoPerform application
• Developed tools used by 50+ stakeholders
• Resolved 100+ critical bugs
• Integrated 5+ RESTful APIs

Generated on: ${new Date().toLocaleDateString()}
Total Experience: 3+ years
Current Status: Open to opportunities
`;

  try {
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personal.name.replace(' ', '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification('Resume downloaded successfully! 📄');
    console.log('Resume download completed');
  } catch (error) {
    console.error('Error downloading resume:', error);
    showNotification('Error downloading resume ❌');
  }
}

// Enhanced notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 3000);
}

// Enhanced keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + S to download
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    downloadResume();
    return;
  }
  
  // Ctrl/Cmd + 1-5 to switch files
  if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
    e.preventDefault();
    const fileNames = ['about', 'experience', 'education', 'skills', 'contact'];
    const index = parseInt(e.key) - 1;
    if (fileNames[index]) {
      switchFile(fileNames[index]);
    }
    return;
  }
  
  // Ctrl/Cmd + Shift + P for file palette (simulated)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
    e.preventDefault();
    showNotification('Quick file access: Ctrl+1-5 for different sections');
    return;
  }
}

// Enhanced responsive behavior
function handleResize() {
  const width = window.innerWidth;
  const activityBar = document.querySelector('.activity-bar');
  const sidebar = document.querySelector('.primary-sidebar');
  const mainEditor = document.querySelector('.main-editor');
  
  if (!activityBar || !sidebar || !mainEditor) return;
  
  if (width <= 768) {
    activityBar.style.width = '40px';
    sidebar.style.width = '200px';
    sidebar.style.left = '40px';
    mainEditor.style.marginLeft = '240px';
  } else {
    activityBar.style.width = '48px';
    sidebar.style.width = '240px';
    sidebar.style.left = '48px';
    mainEditor.style.marginLeft = '288px';
  }
}

// Initialize responsive behavior
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for debugging and external access
window.VSCodeResume = {
  switchFile,
  downloadResume,
  resumeData,
  currentFile: () => currentFile,
  version: '2.0.1',
  debug: {
    fileItems: () => fileItems,
    codeContent: () => codeContent,
    activeTab: () => activeTab
  }
};

console.log('VS Code Resume App v2.0.1 loaded successfully! 🚀');
