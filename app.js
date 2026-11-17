/* ==========================================================================
   sreehari229.github.io — an interactive resume that works like VS Code
   No build step, no dependencies (codicons are loaded from a CDN).
   ========================================================================== */
(() => {
'use strict';

/* ───────────────────────────── Resume data ───────────────────────────── */
const resumeData = {
  personal: {
    name: 'Sreehari S',
    email: 'sreehari229@gmail.com',
    website: 'sreehari229.github.io',
    phone: '+91-8971422625',
    linkedin: '@sreehari229',
    github: '@sreehari229',
    leetcode: '@sreehari229',
    hackerrank: '@sreehari229',
  },
  summary: 'Results-driven Software Engineer with 3+ years of experience in developing scalable applications, optimizing system performance, and integrating APIs. Proficient in C++, Python and Linux with a proven track record of delivering efficient, high-impact solutions for complex systems.',
  experience: [
    {
      title: 'Software Engineer',
      company: 'Itron Inc, Bangalore',
      period: "Jan '23 - Present",
      achievements: [
        'Handled core development of an agent for electricity meters to accurately determine and report 250+ neighboring meter information.',
        'Developed a Query tool utilized by 50+ stakeholders, streamlining complex file operations and data analysis (Earned Spot Award and recognition)',
        'Analysed large scale data files, Identified & resolved 100+ critical bugs, and optimized data processing workflows, resulting in a 25% improvement in system efficiency.',
        'Delivered high quality solutions by developing scalable features, optimizing system performance through rigorous reviews.',
      ],
      techStack: 'C++, Python, Shell Scripting, MongoDB, AWK Commands, GIT, Azure Repos, SVN, API, MUTT, Nagios, Splunk',
      impact: { metersMonitored: 250, stakeholdersServed: 50, bugsResolved: 100, performanceImprovement: '25%', awards: ['Spot Award'] },
    },
    {
      title: 'Programmer',
      company: 'Cognizant Technology Solutions, Chennai',
      period: "Sept '20 - Dec '21",
      achievements: [
        'Developed key features for GoPerform, an HRIT application used by 10,000+ employees for managing deliverables and performance ratings, improving HR operational efficiency by 30%.',
        'Integrated 5+ RESTful APIs to facilitate seamless data exchange between internal tools, boosting system efficiency.',
        'Resolved 50+ critical bugs and implemented functional enhancements to ensure the stability and reliability of internal portals.',
      ],
      techStack: 'C#, ASP.net MVC, MySQL, Git/Github, Ajax, Html/CSS Javascript, Microsoft SQL Server, Postman, Restful API',
      impact: { usersImpacted: 10000, apisIntegrated: 5, bugsFixed: 50, efficiencyImprovement: '30%' },
    },
  ],
  education: [
    {
      degree: 'Masters in Computer Science', institution: "St Joseph's University", cgpa: '8.46', period: '2021-2023',
      level: 'Post Graduate', classification: 'First Class with Distinction', specialization: 'Software Engineering & Algorithms',
      keySubjects: ['Advanced Data Structures', 'Algorithm Design & Analysis', 'Database Management Systems', 'Software Engineering', 'Computer Networks', 'Operating Systems'],
      projects: 3, achievements: ['Academic Excellence Award', 'Best Project Award'],
    },
    {
      degree: 'Bachelor of Computer Application', institution: 'Christ University', cgpa: '8.38', period: '2017-2020',
      level: 'Under Graduate', classification: 'First Class with Distinction', specialization: 'Computer Applications & Programming',
      keySubjects: ['Programming in C/C++', 'Java Programming', 'Web Technologies', 'Database Systems', 'Software Development', 'Computer Graphics'],
      projects: 5, achievements: ['Consistent Academic Performance', 'Technical Society Member'],
    },
  ],
  skills: {
    languages: ['Python', 'C++', 'Bash'],
    databases: ['MySQL', 'Microsoft SQL Server', 'MongoDB'],
    tools: ['Git', 'Azure', 'Docker', 'SVN', 'AWK', 'RestfulAPI'],
    os: ['RHEL Linux'],
    other: ['Data Structure & Algorithms', 'Problem Solving'],
  },
};

const P = resumeData.personal;
const handle = (h) => h.replace(/^@/, '');
const LINKS = {
  email: `mailto:${P.email}`,
  website: `https://${P.website}`,
  linkedin: `https://linkedin.com/in/${handle(P.linkedin)}`,
  github: `https://github.com/${handle(P.github)}`,
  leetcode: `https://leetcode.com/${handle(P.leetcode)}`,
  hackerrank: `https://hackerrank.com/${handle(P.hackerrank)}`,
};
const WORKSPACE = 'sreehari-resume';

/* ───────────────────────────── Helpers ───────────────────────────── */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
const store = {
  get(k, d) { try { const v = localStorage.getItem('vsr.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('vsr.' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
};
const kbKeys = (chord) => (isMac
  ? chord.replace(/Ctrl\+/g, '⌘').replace(/Shift\+/g, '⇧').replace(/Alt\+/g, '⌥').split(/(?<=[⌘⇧⌥])/)
  : chord.split(/\+(?!$)/));
function kbText(kb) {
  if (!kb) return '';
  return kb.split(' ').map((ch) => (isMac ? kbKeys(ch).join('') : ch)).join(' ');
}
function kbChips(kb) {
  if (!kb) return '';
  return '<span class="kb">' + kb.split(' ').map((ch) => kbKeys(ch).map((k) => `<span class="kbd">${esc(k)}</span>`)
    .join(isMac ? '' : '<span class="kb-plus">+</span>')).join('<span class="kb-chord"></span>') + '</span>';
}
function hash7(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}
function copyText(t) {
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    ta.remove();
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).catch(fallback);
  else fallback();
}
function openUrl(u) {
  if (u.startsWith('mailto:')) window.location.href = u;
  else window.open(u, '_blank', 'noopener');
}
const pad2 = (n) => String(n).padStart(2, '0');

/* ───────────────────────────── State ───────────────────────────── */
const THEMES = [
  { id: 'light-modern', name: 'Light Modern', kind: 'light' },
  { id: 'light-plus', name: 'Light+', kind: 'light' },
  { id: 'dark-modern', name: 'Dark Modern', kind: 'dark' },
  { id: 'dark-plus', name: 'Dark+', kind: 'dark' },
  { id: 'neon', name: 'Neon Rack', kind: 'dark' },
];
const savedTheme = store.get('theme', 'neon');
const state = {
  theme: THEMES.some((t) => t.id === savedTheme) ? savedTheme : 'neon',
  wrap: store.get('wrap', true),
  minimap: store.get('minimap', true),
  sidebarW: store.get('sidebarW', 260),
  panelH: store.get('panelH', 230),
  sidebarHidden: false,
  panelHidden: false,
  panelMax: false,
  view: 'explorer',
  panel: 'terminal',
  tabs: [],
  active: null,
  back: [],
  fwd: [],
  expanded: { '.vscode': false },
  recentCmds: store.get('recentCmds', []),
  recentFiles: [],
};
const themeName = (id) => (THEMES.find((t) => t.id === id) || THEMES[2]).name;

/* ───────────────────────────── Workspace files ───────────────────────────── */
const S = resumeData;
const SRC = {
  readme: () => `# ${WORKSPACE}

> The interactive resume of **${P.name}**, Software Engineer. It looks and works like Visual Studio Code.

## Getting around

- Click a file in the **Explorer** to open it, or press **Ctrl+P** to jump to one
- **Ctrl+Shift+P** (or **F1**) opens the Command Palette
- **Ctrl+J** toggles the terminal. Try \`help\`, \`neofetch\` or \`git log\`
- **Ctrl+F** finds in a file, **Ctrl+Shift+F** searches every file
- **Ctrl+K Ctrl+T** changes the color theme
- **Ctrl+S** downloads the resume, **F5** runs \`Skills.py\`
- On macOS use **Cmd** instead of **Ctrl**

## Files

- [About.md](#about): summary, highlights and contact details
- [Experience.js](#experience): work history
- [Education.json](#education): degrees and grades
- [Skills.py](#skills): technical skills
- [Contact.yml](#contact): every way to reach me

---

Built with plain HTML, CSS and JavaScript. Hosted on GitHub Pages.
`,

  about: () => `# ${P.name}

## Software Engineer · Bangalore, India

> ${S.summary}

### Contact

- **Email:** ${P.email}
- **Phone:** ${P.phone}
- **Website:** ${LINKS.website}
- **LinkedIn:** ${LINKS.linkedin}
- **GitHub:** ${LINKS.github}

### Professional Highlights

- **3+ years** of professional software development experience
- Expertise in \`C++\`, \`Python\` and \`Linux\` systems
- Delivered solutions impacting **10,000+** users
- Achieved **25-30%** performance improvements in critical systems
- Built a query tool used by **50+** stakeholders (_Spot Award_)
- Resolved **100+** critical bugs and optimized data processing workflows

### Technical Focus Areas

- **System Performance Optimization**: improved efficiency by 25%+ across projects
- **API Development & Integration**: built and integrated 5+ RESTful APIs
- **Database Management**: MySQL, MongoDB, Microsoft SQL Server
- **DevOps & Tools**: Git, Azure, Docker, SVN, Nagios, Splunk
- **Problem Solving**: strong foundation in data structures and algorithms

---

<!-- Available for new opportunities. Press Ctrl+S to download this resume. -->
`,

  experience: () => {
    const val = (v) => (typeof v === 'string' ? `"${v}"` : Array.isArray(v) ? `[${v.map((x) => `"${x}"`).join(', ')}]` : String(v));
    const jobs = S.experience.map((e, i) => `  {
    position: "${e.title}",
    company: "${e.company}",
    duration: "${e.period}",
    current: ${i === 0},
    achievements: [
${e.achievements.map((a) => `      "${a}"`).join(',\n')},
    ],
    techStack: [${e.techStack.split(/,\s*/).map((t) => `"${t}"`).join(', ')}],
    impact: {
${Object.entries(e.impact).map(([k, v]) => `      ${k}: ${val(v)},`).join('\n')}
    },
  }`);
    return `// Professional Experience — ${P.name}
// Total experience: 3+ years

const experience = [
${jobs.join(',\n')},
];

function getExperienceSummary() {
  return {
    currentRole: experience[0].position,
    companies: experience.map((job) => job.company),
    specializations: ["System Development", "Performance Optimization", "API Integration"],
  };
}

module.exports = { experience, getExperienceSummary };

console.log("Experience data loaded successfully");
`;
  },

  education: () => JSON.stringify({
    educationalBackground: S.education.map((e) => ({
      level: e.level,
      degree: e.degree,
      institution: e.institution,
      period: e.period,
      cgpa: Number(e.cgpa),
      maxCgpa: 10,
      classification: e.classification,
      specialization: e.specialization,
      keySubjects: e.keySubjects,
      projects: e.projects,
      achievements: e.achievements,
    })),
    summary: {
      totalYearsOfEducation: 6,
      averageCgpa: 8.42,
      totalProjects: 8,
      coreCompetencies: ['Software Development', 'Algorithm Design', 'Database Management', 'System Analysis'],
    },
  }, null, 2) + '\n',

  skills: () => {
    const cats = skillCategories();
    const dict = cats.map((c) => `    "${c.key}": [${c.items.map((x) => `"${x}"`).join(', ')}],`).join('\n');
    return `# Technical Skills — ${P.name}
# Press F5 (or run \`python3 Skills.py\` in the terminal) to execute this file.

from typing import Dict, List

skills: Dict[str, List[str]] = {
${dict}
}

also_worked_with: List[str] = [
    "Shell Scripting", "Nagios", "Splunk", "MUTT", "Postman",
    "C#", "ASP.NET MVC", "JavaScript", "HTML/CSS", "Ajax",
]

achievements = {
    "awards": ["Spot Award for Excellence"],
    "recognition": ["Tool Development Recognition"],
    "users_impacted": 10_000,
    "performance_improvement": "25-30%",
    "tools_developed": 2,
}


class SkillsManager:
    """Professional skills management system."""

    def __init__(self, skills: Dict[str, List[str]]) -> None:
        self.skills = skills

    def by_category(self, category: str) -> List[str]:
        """Return the skills listed under one category."""
        return self.skills.get(category, [])

    def total(self) -> int:
        """Count every individual skill."""
        return sum(len(items) for items in self.skills.values())


if __name__ == "__main__":
    manager = SkillsManager(skills)
    print(f"Total technical skills: {manager.total()}")
    print("Years of experience: 3+")
    print("Current focus: System Optimization & API Development")
`;
  },

  contact: () => `# Contact Information & Professional Links
# Every link in this file is clickable.

personal_info:
  name: "${P.name}"
  professional_title: "Software Engineer"
  experience_level: "Senior"
  location:
    city: "Bangalore"
    state: "Karnataka"
    country: "India"
    timezone: "Asia/Kolkata (UTC+5:30)"

contact_methods:
  primary:
    email: "${P.email}"
    phone: "${P.phone}"
    preferred_method: "email"

  professional_networks:
    linkedin:
      url: "${LINKS.linkedin}"
      username: "${P.linkedin}"
      connections: "500+"
    github:
      url: "${LINKS.github}"
      username: "${P.github}"
      repositories: "25+"
      contributions: "Active"
    portfolio:
      website: "${LINKS.website}"
      status: "Active"

  coding_platforms:
    leetcode:
      url: "${LINKS.leetcode}"
      username: "${P.leetcode}"
      problems_solved: "200+"
      rating: "1650+"
    hackerrank:
      url: "${LINKS.hackerrank}"
      username: "${P.hackerrank}"
      badges: "Gold in Problem Solving"

availability:
  job_status: "Currently Employed"
  open_to_opportunities: true
  notice_period: "2 months"
  preferred_roles:
    - "Senior Software Engineer"
    - "Technical Lead"
    - "System Architect"
  working_hours: "9:00 AM - 6:00 PM IST"
  response_time: "Within 24 hours"
  meeting_availability: "Flexible"
  remote_work: "Preferred"

technical_interests:
  - "System Performance Optimization"
  - "Distributed Systems"
  - "API Architecture & Design"
  - "Cloud Infrastructure"
  - "Open Source Contributions"
`,

  settings: () => `{
  // Workspace settings. These reflect your current session.
  "workbench.colorTheme": "${themeName(state.theme)}",
  "editor.wordWrap": "${state.wrap ? 'on' : 'off'}",
  "editor.minimap.enabled": ${state.minimap},
  "editor.readOnly": true,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "editor.bracketPairColorization.enabled": true,
  "resume.owner": "${P.name}",
  "resume.openToWork": true
}
`,
};

function skillCategories() {
  const s = S.skills;
  return [
    { key: 'languages', label: 'Programming Language', items: s.languages },
    { key: 'databases', label: 'Database', items: s.databases },
    { key: 'tools', label: 'Developer Tool', items: s.tools },
    { key: 'operating_systems', label: 'Operating System', items: s.os },
    { key: 'core', label: 'Core Competency', items: s.other },
  ];
}

const FILES = {
  settings: { name: 'settings.json', dir: '.vscode', lang: 'jsonc', label: 'JSON with Comments', indent: 2 },
  about: { name: 'About.md', lang: 'markdown', label: 'Markdown', indent: 2 },
  contact: { name: 'Contact.yml', lang: 'yaml', label: 'YAML', indent: 2 },
  education: { name: 'Education.json', lang: 'json', label: 'JSON', indent: 2 },
  experience: { name: 'Experience.js', lang: 'javascript', label: 'JavaScript', indent: 2 },
  readme: { name: 'README.md', lang: 'markdown', label: 'Markdown', indent: 2 },
  skills: { name: 'Skills.py', lang: 'python', label: 'Python', indent: 4 },
  workstation: { name: 'Workstation.glb', lang: 'glb', label: '3D Model', indent: 2 },
};
const ROOT_FILES = ['about', 'contact', 'education', 'experience', 'readme', 'skills'];
const ALL_FILES = ['settings', ...ROOT_FILES];
const filePath = (id) => (FILES[id].dir ? FILES[id].dir + '/' : '') + FILES[id].name;
const isPreview = (id) => typeof id === 'string' && id.startsWith('preview:');
const isScene = (id) => id === 'workstation';
const isVirtual = (id) => isPreview(id) || isScene(id);
const baseId = (id) => (isPreview(id) ? id.slice(8) : id);
const tabLabel = (id) => (isPreview(id) ? `Preview ${FILES[baseId(id)].name}` : FILES[id].name);
function fileByName(name) {
  const n = String(name || '').toLowerCase().replace(/^\.\//, '');
  return [...ALL_FILES, 'workstation'].find((id) => FILES[id].name.toLowerCase() === n || filePath(id).toLowerCase() === n) || null;
}

const PY_SVG = '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path fill="#3c78aa" d="M7.9 1.2c-3.1 0-2.9 1.3-2.9 1.3v1.4h3v.4H3.8S1.8 4.1 1.8 7.2s1.7 2.9 1.7 2.9h1.1V8.6s-.1-1.7 1.7-1.7h2.9s1.6 0 1.6-1.6V2.8s.3-1.6-2.9-1.6zM6.3 2.1a.55.55 0 1 1 0 1.1.55.55 0 0 1 0-1.1z"/><path fill="#ffd43b" d="M8.1 14.8c3.1 0 2.9-1.3 2.9-1.3v-1.4H8v-.4h4.2s2-.2 2-3.3-1.7-2.9-1.7-2.9h-1.1v1.5s.1 1.7-1.7 1.7H6.8s-1.6 0-1.6 1.6v2.9s-.3 1.6 2.9 1.6zm1.6-.9a.55.55 0 1 1 0-1.1.55.55 0 0 1 0 1.1z"/></svg>';
function fileIcon(id) {
  if (isPreview(id)) return '<i class="ficon codicon codicon-open-preview fi-preview"></i>';
  switch (FILES[id].lang) {
    case 'glb': return '<i class="ficon codicon codicon-server-environment fi-glb"></i>';
    case 'markdown': return '<i class="ficon codicon codicon-markdown fi-md"></i>';
    case 'javascript': return '<span class="ficon fi-js">JS</span>';
    case 'json': case 'jsonc': return '<i class="ficon codicon codicon-json fi-json"></i>';
    case 'python': return `<span class="ficon">${PY_SVG}</span>`;
    case 'yaml': return '<i class="ficon codicon codicon-list-flat fi-yml"></i>';
    default: return '<i class="ficon codicon codicon-file"></i>';
  }
}

/* ───────────────────────────── Syntax highlighting ───────────────────────────── */
const JS_KW = new Set(['const', 'let', 'var', 'function', 'class', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'async']);
const JS_CTRL = new Set(['return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'of', 'in', 'await', 'switch', 'case', 'break']);
const JS_TYPE = new Set(['Math', 'Date', 'Object', 'Array', 'JSON', 'Promise', 'String', 'Number']);
const PY_KW = new Set(['def', 'class', 'True', 'False', 'None', 'self', 'lambda', 'and', 'or', 'not', 'is']);
const PY_CTRL = new Set(['import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'as', 'with', 'try', 'except', 'pass', 'yield', 'raise']);
const PY_TYPE = new Set(['Dict', 'List', 'Union', 'Optional', 'str', 'int', 'dict', 'list', 'float', 'bool', 'datetime']);

const prevSig = (toks) => { for (let i = toks.length - 1; i >= 0; i--) if (toks[i].t.trim()) return toks[i]; return null; };

function jsIdent(w, line, end, toks) {
  if (JS_CTRL.has(w)) return 'ctrl';
  if (JS_KW.has(w)) return 'kw';
  if (JS_TYPE.has(w)) return 'type';
  const after = line.slice(end);
  if (/^\s*\(/.test(after)) return 'fn';
  const prev = prevSig(toks);
  if (prev && prev.t === '.') return 'prop';
  if (/^\s*:/.test(after)) return 'prop';
  return 'var';
}
function pyIdent(w, line, end, toks) {
  const prev = prevSig(toks);
  if (prev && prev.t === 'def') return 'fn';
  if (prev && prev.t === 'class') return 'type';
  if (PY_CTRL.has(w)) return 'ctrl';
  if (PY_KW.has(w)) return 'kw';
  if (PY_TYPE.has(w)) return 'type';
  if (/^\s*\(/.test(line.slice(end))) return 'fn';
  return 'var';
}

const RULES = {
  javascript: [
    [/\/\/.*/y, 'comment'],
    [/"(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?|`(?:[^`\\]|\\.)*`?/y, 'str'],
    [/[A-Za-z_$][\w$]*/y, jsIdent],
    [/\d+(?:\.\d+)?/y, 'num'],
    [/[()[\]{}]/y, 'br'],
    [/=>|[=+\-*/<>!&|?:;,.%]/y, (t) => (t === '=>' ? 'kw' : 'punc')],
  ],
  json: [
    [/\/\/.*/y, 'comment'],
    [/"(?:[^"\\]|\\.)*"?/y, (t, line, end) => (/^\s*:/.test(line.slice(end)) ? 'key' : 'str')],
    [/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/y, 'num'],
    [/true|false|null/y, 'kw'],
    [/[[\]{}]/y, 'br'],
    [/[:,]/y, 'punc'],
  ],
  python: [
    [/#.*/y, 'comment'],
    [/[fFrRbBuU]{0,2}(?:"""[^]*?"""|'''[^]*?'''|"(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?)/y, 'pystr'],
    [/[A-Za-z_]\w*/y, pyIdent],
    [/\d[\d_]*(?:\.\d+)?/y, 'num'],
    [/[()[\]{}]/y, 'br'],
    [/->|[=+\-*/<>!&|:;,.%@]/y, 'punc'],
  ],
  yaml: [
    [/#.*/y, 'comment'],
    [/[A-Za-z_][\w.-]*(?=\s*:(?:\s|$))/y, 'ykey'],
    [/"(?:[^"\\]|\\.)*"?|'[^']*'?/y, 'str'],
    [/-(?=\s)/y, 'punc'],
    [/:(?=\s|$)/y, 'punc'],
    [/(?:true|false|null|yes|no|~)(?=\s*(?:#|$))/y, 'kw'],
    [/-?\d+(?:\.\d+)?(?=\s*(?:#|$))/y, 'num'],
    [/[^\s#][^#]*?(?=\s*(?:#|$))/y, 'str'],
  ],
  markdown: [
    [/<!--.*?-->/y, 'comment'],
    [/#{1,6}\s.*/y, 'mdh', true],
    [/>.*/y, 'mdq', true],
    [/(?:-{3,}|\*{3,}|_{3,})\s*$/y, 'mdhr', true],
    [/(?:[-*+]|\d+\.)(?=\s)/y, 'mdlist', true],
    [/\*\*[^*]+\*\*/y, 'mdb'],
    [/`[^`]+`/y, 'mdcode'],
    [/\[[^\]]+\]\([^)]*\)/y, 'mdlink'],
    [/(?<!\w)_[^_\s][^_]*_(?!\w)|\*[^*\s][^*]*\*/y, 'mdi'],
    [/[^*`[_<]+/y, ''],
  ],
};

function pushPyString(t, toks) {
  const m = t.match(/^([a-zA-Z]{0,2})/);
  const prefix = m[1];
  const body = t.slice(prefix.length);
  if (prefix) toks.push({ t: prefix, c: 'kw' });
  if (!/f/i.test(prefix)) { toks.push({ t: body, c: 'str' }); return; }
  body.split(/(\{[^{}]*\})/).forEach((part) => {
    if (!part) return;
    if (part[0] === '{' && part[part.length - 1] === '}') {
      toks.push({ t: '{', c: 'kw' }, { t: part.slice(1, -1), c: 'var' }, { t: '}', c: 'kw' });
    } else toks.push({ t: part, c: 'str' });
  });
}

function lex(lines, lang) {
  const rules = RULES[lang === 'jsonc' ? 'json' : lang] || [];
  let depth = 0;
  return lines.map((line) => {
    const toks = [];
    const push = (t, c) => {
      const last = toks[toks.length - 1];
      if (last && last.c === c && c === '') last.t += t; else toks.push({ t, c });
    };
    const ws = line.match(/^\s*/)[0];
    if (ws) toks.push({ t: ws, c: 'ws' });
    const start = ws.length;
    let i = start;
    outer: while (i < line.length) {
      for (const [re, cls, atStart] of rules) {
        if (atStart && i !== start) continue;
        re.lastIndex = i;
        const m = re.exec(line);
        if (!m || !m[0].length) continue;
        const t = m[0];
        let c = typeof cls === 'function' ? cls(t, line, i + t.length, toks) : cls;
        if (c === 'br') {
          if ('([{'.includes(t)) { c = 'br' + (depth % 3); depth++; } else { depth = Math.max(0, depth - 1); c = 'br' + (depth % 3); }
          toks.push({ t, c });
        } else if (c === 'pystr') pushPyString(t, toks);
        else push(t, c);
        i += t.length;
        continue outer;
      }
      push(line[i], '');
      i++;
    }
    return toks;
  });
}

function linkify(h) {
  return h.replace(/(https?:\/\/[^\s"'&<)]+)|((?<![\w.+-])[\w.+-]+@[\w-]+\.[\w.-]*\w)/g, (m, url, mail) => (url
    ? `<a class="lnk" href="${url}" target="_blank" rel="noopener" title="Follow link">${url}</a>`
    : `<a class="lnk" href="mailto:${mail}" title="Send email">${mail}</a>`));
}

/* ───────────────────────────── Documents ───────────────────────────── */
const docCache = {};
function getDoc(id) {
  const f = FILES[id];
  const src = SRC[id]();
  const old = docCache[id];
  if (old && old.src === src) return old;
  const lines = src.split('\n');
  const d = {
    id, src, lines, lang: f.lang,
    toks: lex(lines, f.lang),
    ranges: computeFoldRanges(lines, f.lang),
    folds: old ? old.folds : new Set(),
  };
  d.symbols = symbolsOf(d);
  docCache[id] = d;
  return d;
}

function computeFoldRanges(lines, lang) {
  const ranges = {};
  const n = lines.length;
  if (lang === 'markdown') {
    const heads = [];
    lines.forEach((l, i) => { const m = l.match(/^(#{1,6})\s/); if (m) heads.push([i, m[1].length]); });
    heads.forEach(([i, lv], k) => {
      let end = n - 1;
      for (let j = k + 1; j < heads.length; j++) if (heads[j][1] <= lv) { end = heads[j][0] - 1; break; }
      while (end > i && !lines[end].trim()) end--;
      if (end > i) ranges[i + 1] = end + 1;
    });
    return ranges;
  }
  const ind = (l) => l.match(/^ */)[0].length;
  for (let i = 0; i < n; i++) {
    if (!lines[i].trim()) continue;
    const base = ind(lines[i]);
    let j = i + 1;
    let last = i;
    while (j < n) {
      if (!lines[j].trim()) { j++; continue; }
      if (ind(lines[j]) > base) { last = j; j++; } else break;
    }
    if (last > i) ranges[i + 1] = last + 1;
  }
  return ranges;
}

function symbolsOf(doc) {
  const out = [];
  doc.lines.forEach((l, i) => {
    const line = i + 1;
    let m;
    switch (doc.lang) {
      case 'markdown':
        if ((m = l.match(/^(#{1,6})\s+(.*)/))) out.push({ name: m[2], line, depth: m[1].length - 1, kind: 'string' });
        break;
      case 'javascript':
        if ((m = l.match(/^(?:const|let|var)\s+(\w+)/))) out.push({ name: m[1], line, depth: 0, kind: 'variable' });
        else if ((m = l.match(/^function\s+(\w+)/))) out.push({ name: m[1], line, depth: 0, kind: 'method' });
        break;
      case 'json': case 'jsonc':
        if ((m = l.match(/^ {2}"([^"]+)"\s*:/))) out.push({ name: m[1], line, depth: 0, kind: 'key' });
        break;
      case 'python':
        if ((m = l.match(/^class\s+(\w+)/))) out.push({ name: m[1], line, depth: 0, kind: 'class' });
        else if ((m = l.match(/^\s+def\s+(\w+)/))) out.push({ name: m[1], line, depth: 1, kind: 'method' });
        else if ((m = l.match(/^(\w+)\s*(?::[^=]*)?=/))) out.push({ name: m[1], line, depth: 0, kind: 'variable' });
        break;
      case 'yaml':
        if ((m = l.match(/^( *)([A-Za-z_][\w-]*):/)) && m[1].length <= 2) out.push({ name: m[2], line, depth: m[1].length / 2, kind: 'key' });
        break;
      default:
    }
  });
  return out;
}
const symIcon = (k) => `<i class="sym codicon codicon-symbol-${k}"></i>`;

function symbolChain(doc, line) {
  const stack = [];
  for (const s of doc.symbols) {
    if (s.line > line) break;
    while (stack.length && stack[stack.length - 1].depth >= s.depth) stack.pop();
    stack.push(s);
  }
  return stack.filter((s) => line <= (doc.ranges[s.line] || s.line));
}

function hiddenLines(doc) {
  const hidden = new Set();
  doc.folds.forEach((s) => {
    const e = doc.ranges[s];
    if (!e) return;
    for (let l = s + 1; l <= e; l++) hidden.add(l);
  });
  return hidden;
}

/* ───────────────────────────── DOM references ───────────────────────────── */
const wb = $('#workbench');
const sidebarEl = $('#sidebar');
const tabsEl = $('#tabs');
const groupEl = $('#editorGroup');
const editorEl = $('#editor');
const scrollEl = $('#editorScroll');
const linesEl = $('#lines');
const caretEl = $('#caret');
const minimapEl = $('#minimap');
const canvas = $('#minimapCanvas');
const mmSlider = $('#mmSlider');
const previewEl = $('#mdPreview');
const bcEl = $('#breadcrumbs');
const panelEl = $('#panel');
const termOut = $('#termOut');
const termInput = $('#termInput');
const termScroll = () => $('.panel-view[data-panel="terminal"]');

let doc = null; // the document shown in the editor
const caret = { line: 1, col: 1, want: 1 };
const viewState = {};

/* ───────────────────────────── Editor rendering ───────────────────────────── */
function renderLine(toks, isz) {
  let html = '';
  for (const tk of toks) {
    if (tk.c === 'ws') {
      const n = tk.t.length;
      const full = Math.floor(n / isz);
      html += `<span class="ig">${' '.repeat(isz)}</span>`.repeat(full) + ' '.repeat(n % isz);
      continue;
    }
    const inner = linkify(esc(tk.t));
    html += tk.c ? `<span class="t-${tk.c}">${inner}</span>` : inner;
  }
  return html;
}

function renderEditor({ keepScroll = false } = {}) {
  const id = state.active;
  wb.classList.toggle('no-editor', !id || isVirtual(id));
  groupEl.classList.toggle('empty', !id);
  editorEl.classList.toggle('previewing', !!id && isPreview(id));
  editorEl.classList.toggle('scene', !!id && isScene(id));
  if (!isScene(id)) hideScene();
  if (!id) { doc = null; linesEl.innerHTML = ''; closeFind(); return; }
  if (isScene(id)) { doc = null; closeFind(); showScene(); return; }
  if (isPreview(id)) {
    doc = null;
    previewEl.innerHTML = `<div class="inner">${mdToHtml(SRC[baseId(id)]())}</div>`;
    previewEl.scrollTop = (viewState[id] && viewState[id].scrollTop) || 0;
    closeFind();
    return;
  }
  const top = scrollEl.scrollTop;
  doc = getDoc(id);
  const isz = FILES[id].indent;
  const hidden = hiddenLines(doc);
  const ind = doc.lines.map((l) => (l.trim() ? l.match(/^ */)[0].length : -1));
  const n = doc.lines.length;
  linesEl.style.setProperty('--digits', Math.max(3, String(n).length));
  linesEl.style.setProperty('--is', isz + 'ch');
  let prevInd = 0;
  const nextInd = new Array(n).fill(0);
  for (let i = n - 1, cur = 0; i >= 0; i--) { nextInd[i] = cur; if (ind[i] >= 0) cur = ind[i]; }
  const html = doc.toks.map((toks, i) => {
    const ln = i + 1;
    const can = !!doc.ranges[ln];
    const collapsed = can && doc.folds.has(ln);
    let body;
    if (ind[i] < 0) {
      const g = Math.floor(Math.min(prevInd, nextInd[i]) / isz);
      body = g ? `<span class="igb" style="width:${g * isz}ch"></span>` : '';
    } else {
      prevInd = ind[i];
      body = renderLine(toks, isz);
    }
    return `<div class="vl${hidden.has(ln) ? ' hidden' : ''}" data-l="${ln}" style="--ind:${Math.max(ind[i], 0)}">`
      + `<span class="gutter"><span class="glyph"></span><span class="ln">${ln}</span>`
      + `<span class="fold codicon codicon-chevron-${collapsed ? 'right' : 'down'}${can ? ' can' : ''}${collapsed ? ' collapsed' : ''}"></span></span>`
      + `<span class="vc">${body}${collapsed ? '<span class="fold-ell">⋯</span>' : ''}</span></div>`;
  }).join('');
  linesEl.innerHTML = html;
  if (keepScroll) scrollEl.scrollTop = top;
  drawMinimap();
  if (find.open) runFind(true);
}

const lineEl = (l) => linesEl.querySelector(`.vl[data-l="${l}"]`);

function locate(vc, offset) {
  const walker = document.createTreeWalker(vc, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement.closest('.fold-ell') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  let n;
  let rem = offset;
  let last = null;
  while ((n = walker.nextNode())) {
    const len = n.nodeValue.length;
    if (rem <= len) return [n, rem];
    rem -= len;
    last = n;
  }
  return last ? [last, last.nodeValue.length] : [vc, 0];
}

function caretPoint(line, col) {
  const vl = lineEl(line);
  if (!vl) return null;
  const vc = vl.querySelector('.vc');
  const [node, off] = locate(vc, col - 1);
  const r = document.createRange();
  r.setStart(node, off);
  r.collapse(true);
  const rects = r.getClientRects();
  let rect = rects[rects.length - 1];
  const vcr = vc.getBoundingClientRect();
  const lh = parseFloat(getComputedStyle(scrollEl).lineHeight) || 20;
  if (!rect || (!rect.height && !rect.width && !rect.left)) rect = { left: vcr.left, top: vcr.top, height: lh };
  const sr = scrollEl.getBoundingClientRect();
  const vlr = vl.getBoundingClientRect();
  const row = Math.max(0, Math.floor((rect.top + rect.height / 2 - vlr.top) / lh));
  return {
    x: rect.left - sr.left + scrollEl.scrollLeft,
    y: vlr.top - sr.top + scrollEl.scrollTop + row * lh,
    lh,
  };
}

function placeCaret(line, col, { scroll = false, keepWant = false } = {}) {
  if (!doc) return;
  line = clamp(line, 1, doc.lines.length);
  if (hiddenLines(doc).has(line)) {
    doc.folds.forEach((s) => { if (s < line && doc.ranges[s] >= line) doc.folds.delete(s); });
    renderEditor({ keepScroll: true });
  }
  col = clamp(col, 1, doc.lines[line - 1].length + 1);
  caret.line = line;
  caret.col = col;
  if (!keepWant) caret.want = col;
  const prev = linesEl.querySelector('.vl.current');
  if (prev) prev.classList.remove('current');
  const vl = lineEl(line);
  if (vl) vl.classList.add('current');
  const p = caretPoint(line, col);
  if (p) {
    caretEl.style.transform = `translate(${p.x}px, ${p.y}px)`;
    caretEl.classList.remove('on');
    void caretEl.offsetWidth;
    caretEl.classList.add('on');
    if (scroll) {
      const h = scrollEl.clientHeight;
      if (scroll === 'center') scrollEl.scrollTop = p.y - h / 2 + p.lh;
      else if (p.y < scrollEl.scrollTop) scrollEl.scrollTop = p.y;
      else if (p.y + p.lh > scrollEl.scrollTop + h - 14) scrollEl.scrollTop = p.y + p.lh - h + 14 + p.lh;
      if (!state.wrap) {
        const gw = vl ? vl.querySelector('.gutter').offsetWidth : 60;
        const w = scrollEl.clientWidth;
        if (p.x < scrollEl.scrollLeft + gw) scrollEl.scrollLeft = Math.max(0, p.x - gw - 20);
        else if (p.x > scrollEl.scrollLeft + w - 120) scrollEl.scrollLeft = p.x - w + 120;
      }
    }
  }
  $('#sbPos').textContent = `Ln ${line}, Col ${col}`;
  renderBreadcrumbs();
  updateMinimapSlider();
}

function refreshCaret() { if (doc) placeCaret(caret.line, caret.col, { keepWant: true }); }

function boundaryPos(node, off) {
  if (!doc) return null;
  const n = doc.lines.length;
  if (node === linesEl) {
    const child = linesEl.children[off];
    return child ? { line: +child.dataset.l, col: 1 } : { line: n, col: doc.lines[n - 1].length + 1 };
  }
  const el = node.nodeType === 3 ? node.parentElement : node;
  const vl = el.closest && el.closest('.vl');
  if (!vl) return null;
  const line = +vl.dataset.l;
  const len = doc.lines[line - 1].length;
  const vc = vl.querySelector('.vc');
  if (node === vl) return { line, col: off >= 2 ? len + 1 : 1 };
  if (!vc.contains(node)) return { line, col: 1 };
  if (el.closest('.fold-ell')) return { line, col: len + 1 };
  const r = document.createRange();
  r.setStart(vc, 0);
  r.setEnd(node, off);
  return { line, col: Math.min(r.toString().length, len) + 1 };
}

function posFromPoint(x, y) {
  let node = null;
  let off = 0;
  if (document.caretPositionFromPoint) {
    const p = document.caretPositionFromPoint(x, y);
    if (p) { node = p.offsetNode; off = p.offset; }
  } else if (document.caretRangeFromPoint) {
    const r = document.caretRangeFromPoint(x, y);
    if (r) { node = r.startContainer; off = r.startOffset; }
  }
  const pos = node && linesEl.contains(node) ? boundaryPos(node, off) : null;
  if (pos) return pos;
  const rows = $$('.vl:not(.hidden)', linesEl);
  const hit = rows.find((v) => { const r = v.getBoundingClientRect(); return y >= r.top && y < r.bottom; }) || rows[rows.length - 1];
  if (!hit) return null;
  const line = +hit.dataset.l;
  return { line, col: doc.lines[line - 1].length + 1 };
}

function selectionText() {
  const sel = window.getSelection();
  if (!doc || !sel.rangeCount || sel.isCollapsed) return null;
  const r = sel.getRangeAt(0);
  if (!linesEl.contains(r.commonAncestorContainer)) return null;
  const a = boundaryPos(r.startContainer, r.startOffset);
  const b = boundaryPos(r.endContainer, r.endOffset);
  if (!a || !b) return null;
  const L = doc.lines;
  if (a.line === b.line) return L[a.line - 1].slice(a.col - 1, b.col - 1);
  const out = [L[a.line - 1].slice(a.col - 1)];
  for (let i = a.line + 1; i < b.line; i++) out.push(L[i - 1]);
  out.push(L[b.line - 1].slice(0, b.col - 1));
  return out.join('\n');
}

function toggleFold(line) {
  if (!doc || !doc.ranges[line]) return;
  if (doc.folds.has(line)) doc.folds.delete(line); else doc.folds.add(line);
  const hidden = hiddenLines(doc);
  if (hidden.has(caret.line)) { caret.line = line; caret.col = doc.lines[line - 1].length + 1; }
  renderEditor({ keepScroll: true });
  refreshCaret();
}
function foldAll(fold) {
  if (!doc) return;
  doc.folds.clear();
  if (fold) Object.keys(doc.ranges).forEach((l) => doc.folds.add(+l));
  const hidden = hiddenLines(doc);
  if (hidden.has(caret.line)) { caret.line = 1; caret.col = 1; }
  renderEditor({ keepScroll: true });
  refreshCaret();
}

let roTimer = null;
function showReadOnly() {
  const p = caretPoint(caret.line, caret.col);
  if (!p) return;
  let el = scrollEl.querySelector('.ro-hover');
  if (!el) { el = document.createElement('div'); el.className = 'ro-hover'; scrollEl.appendChild(el); }
  el.textContent = 'Cannot edit in read-only editor';
  el.style.left = Math.max(4, p.x - 4) + 'px';
  el.style.top = (p.y > 30 ? p.y - 28 : p.y + p.lh + 2) + 'px';
  clearTimeout(roTimer);
  roTimer = setTimeout(() => el.remove(), 1600);
}

function flashLine(line) {
  const vl = lineEl(line);
  if (!vl) return;
  vl.classList.remove('flash');
  void vl.offsetWidth;
  vl.classList.add('flash');
}

/* ───────────────────────────── Minimap ───────────────────────────── */
let tokColors = {};
function tokColor(c) {
  if (c in tokColors) return tokColors[c];
  const s = document.createElement('span');
  if (c) s.className = 't-' + c;
  scrollEl.appendChild(s);
  const col = getComputedStyle(s).color;
  s.remove();
  tokColors[c] = col;
  return col;
}
let mm = null;
function drawMinimap() {
  const on = state.minimap && doc && !isMobile();
  editorEl.classList.toggle('has-minimap', !!(state.minimap && doc));
  if (!on) { mm = null; return; }
  const W = minimapEl.clientWidth;
  const H = minimapEl.clientHeight;
  if (!W || !H) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const hidden = hiddenLines(doc);
  const rows = [];
  doc.toks.forEach((t, i) => { if (!hidden.has(i + 1)) rows.push(t); });
  const rowH = Math.min(2, H / Math.max(rows.length, 1));
  const cw = 0.9;
  ctx.globalAlpha = 0.8;
  rows.forEach((toks, k) => {
    let x = 2;
    const y = k * rowH;
    for (const t of toks) {
      if (t.c !== 'ws') {
        ctx.fillStyle = tokColor(t.c);
        const s = t.t;
        let j = 0;
        while (j < s.length) {
          if (s[j] === ' ') { j++; continue; }
          const st = j;
          while (j < s.length && s[j] !== ' ') j++;
          ctx.fillRect(x + st * cw, y, (j - st) * cw, Math.max(1, rowH * 0.75));
        }
      }
      x += t.t.length * cw;
      if (x > W) break;
    }
  });
  mm = { rowH, rows: rows.length };
  updateMinimapSlider();
}
function mmRatio() {
  const pad = parseFloat(getComputedStyle(linesEl).paddingBottom) || 0;
  const contentH = Math.max(1, linesEl.offsetHeight - pad);
  return (mm.rows * mm.rowH) / contentH;
}
function updateMinimapSlider() {
  if (!mm) return;
  const ratio = mmRatio();
  const h = Math.max(scrollEl.clientHeight * ratio, 10);
  const top = Math.min(scrollEl.scrollTop * ratio, minimapEl.clientHeight - h);
  mmSlider.style.height = h + 'px';
  mmSlider.style.transform = `translateY(${Math.max(0, top)}px)`;
}
minimapEl.addEventListener('pointerdown', (e) => {
  if (!mm) return;
  e.preventDefault();
  const ratio = mmRatio();
  const rect = minimapEl.getBoundingClientRect();
  if (e.target !== mmSlider) scrollEl.scrollTop = (e.clientY - rect.top) / ratio - scrollEl.clientHeight / 2;
  const startY = e.clientY;
  const startTop = scrollEl.scrollTop;
  mmSlider.classList.add('dragging');
  minimapEl.setPointerCapture(e.pointerId);
  const move = (ev) => { scrollEl.scrollTop = startTop + (ev.clientY - startY) / ratio; };
  const up = () => {
    mmSlider.classList.remove('dragging');
    minimapEl.removeEventListener('pointermove', move);
    minimapEl.removeEventListener('pointerup', up);
    minimapEl.removeEventListener('pointercancel', up);
  };
  minimapEl.addEventListener('pointermove', move);
  minimapEl.addEventListener('pointerup', up);
  minimapEl.addEventListener('pointercancel', up);
});

/* ───────────────────────────── Find widget ───────────────────────────── */
const find = { open: false, matches: [], idx: -1, opts: { case: false, word: false, regex: false } };
const hasHighlights = () => !!(window.CSS && CSS.highlights && window.Highlight);

function buildRegex(q, opts) {
  if (!q) return null;
  let src = opts.regex ? q : q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (opts.word) src = `\\b${src}\\b`;
  try { return new RegExp(src, opts.case ? 'g' : 'gi'); } catch (e) { return null; }
}
function findAll(lines, re) {
  const out = [];
  lines.forEach((l, i) => {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(l))) {
      if (!m[0].length) { re.lastIndex++; continue; }
      out.push({ line: i + 1, start: m.index, end: m.index + m[0].length });
    }
  });
  return out;
}
function rangeFor(line, s, e) {
  const vl = lineEl(line);
  if (!vl || vl.classList.contains('hidden')) return null;
  const vc = vl.querySelector('.vc');
  const [n1, o1] = locate(vc, s);
  const [n2, o2] = locate(vc, e);
  const r = document.createRange();
  try { r.setStart(n1, o1); r.setEnd(n2, o2); } catch (err) { return null; }
  return r;
}
function paintFind() {
  if (!hasHighlights()) return;
  const all = [];
  const cur = [];
  find.matches.forEach((m, i) => {
    const r = rangeFor(m.line, m.start, m.end);
    if (r) (i === find.idx ? cur : all).push(r);
  });
  CSS.highlights.set('find-match', new Highlight(...all));
  CSS.highlights.set('find-current', new Highlight(...cur));
}
function runFind(keepIdx) {
  const q = $('#findInput').value;
  const re = buildRegex(q, find.opts);
  find.matches = re && doc ? findAll(doc.lines, re) : [];
  if (!keepIdx || find.idx >= find.matches.length) {
    find.idx = find.matches.findIndex((m) => m.line > caret.line || (m.line === caret.line && m.start >= caret.col - 1));
    if (find.idx < 0 && find.matches.length) find.idx = 0;
  }
  paintFind();
  const cnt = $('#findCount');
  cnt.textContent = find.matches.length ? `${find.idx + 1} of ${find.matches.length}` : 'No results';
  cnt.classList.toggle('none', !!q && !find.matches.length);
}
function gotoMatch(dir) {
  if (!find.matches.length) return;
  find.idx = (find.idx + dir + find.matches.length) % find.matches.length;
  const m = find.matches[find.idx];
  placeCaret(m.line, m.start + 1, { scroll: 'center' });
  runFind(true);
}
function openFind() {
  if (!doc) return;
  find.open = true;
  $('#findWidget').classList.add('open');
  const sel = selectionText();
  const input = $('#findInput');
  if (sel && !sel.includes('\n')) input.value = sel;
  input.focus();
  input.select();
  runFind();
}
function closeFind() {
  if (!find.open) return;
  find.open = false;
  $('#findWidget').classList.remove('open');
  if (hasHighlights()) { CSS.highlights.delete('find-match'); CSS.highlights.delete('find-current'); }
  if (doc) editorEl.focus({ preventScroll: true });
}
$('#findInput').addEventListener('input', () => runFind());
$('#findInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); gotoMatch(e.shiftKey ? -1 : 1); }
  else if (e.key === 'Escape') { e.preventDefault(); closeFind(); }
});
$('#findNext').addEventListener('click', () => gotoMatch(1));
$('#findPrev').addEventListener('click', () => gotoMatch(-1));
$('#findClose').addEventListener('click', closeFind);
$$('[data-fopt]').forEach((b) => b.addEventListener('click', () => {
  find.opts[b.dataset.fopt] = !find.opts[b.dataset.fopt];
  b.classList.toggle('on', find.opts[b.dataset.fopt]);
  runFind();
  $('#findInput').focus();
}));

function setReveal(line, s, e) {
  if (!hasHighlights()) return;
  const r = rangeFor(line, s, e);
  if (r) CSS.highlights.set('reveal', new Highlight(r)); else CSS.highlights.delete('reveal');
}
function clearReveal() { if (hasHighlights()) CSS.highlights.delete('reveal'); }

/* ───────────────────────────── Markdown preview ───────────────────────────── */
function mdInline(s) {
  let h = esc(s);
  const codes = [];
  h = h.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/(^|[\s(])_([^_]+)_(?=[\s.,)!?]|$)/g, '$1<em>$2</em>');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${u}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
  h = h.replace(/(?<!href=")(https?:\/\/[^\s<"]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  h = h.replace(/(?<![\w.:/+-])([\w.+-]+@[\w-]+\.[\w.-]*\w)/g, '<a href="mailto:$1">$1</a>');
  return h.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${codes[+i]}</code>`);
}
function mdToHtml(src) {
  const out = [];
  let para = [];
  let list = null;
  let quote = null;
  const flush = () => {
    if (para.length) { out.push(`<p>${mdInline(para.join(' '))}</p>`); para = []; }
    if (list) { out.push(`<ul>${list.map((li) => `<li>${mdInline(li)}</li>`).join('')}</ul>`); list = null; }
    if (quote) { out.push(`<blockquote><p>${mdInline(quote.join(' '))}</p></blockquote>`); quote = null; }
  };
  src.split('\n').forEach((raw) => {
    const l = raw.trim();
    let m;
    if (/^<!--.*-->$/.test(l)) return;
    if (!l) { flush(); return; }
    if ((m = l.match(/^(#{1,6})\s+(.*)/))) { flush(); out.push(`<h${m[1].length}>${mdInline(m[2])}</h${m[1].length}>`); return; }
    if (/^(-{3,}|\*{3,})$/.test(l)) { flush(); out.push('<hr>'); return; }
    if ((m = l.match(/^>\s?(.*)/))) { if (!quote) { flush(); quote = []; } quote.push(m[1]); return; }
    if ((m = l.match(/^[-*+]\s+(.*)/))) { if (!list) { flush(); list = []; } list.push(m[1]); return; }
    if (list) { list[list.length - 1] += ' ' + l; return; }
    para.push(l);
  });
  flush();
  return out.join('\n');
}
previewEl.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  if (FILES[id]) openFile(id);
});

/* ───────────────────────────── Tabs, breadcrumbs, explorer ───────────────────────────── */
function renderTabs() {
  tabsEl.innerHTML = state.tabs.map((id) => `<div class="tab${id === state.active ? ' active' : ''}${isPreview(id) ? ' preview-tab' : ''}" role="tab" data-tab="${id}" draggable="true" title="${esc(isPreview(id) ? tabLabel(id) : '~/' + WORKSPACE + '/' + filePath(id))}">`
    + `${fileIcon(id)}<span class="tab-label">${esc(tabLabel(id))}</span>`
    + `<span class="tab-close codicon codicon-close" data-close="${id}" title="Close"></span></div>`).join('');
  const act = tabsEl.querySelector('.tab.active');
  if (act) act.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  const md = state.active && !isVirtual(state.active) && FILES[state.active].lang === 'markdown';
  $('#previewBtn').style.display = md ? '' : 'none';
}

function renderBreadcrumbs() {
  const id = state.active;
  if (!id) { bcEl.innerHTML = ''; return; }
  const b = baseId(id);
  const sep = '<span class="bc-sep codicon codicon-chevron-right"></span>';
  let html = `<span class="bc-item" data-bc="folder">${WORKSPACE}</span>${sep}`;
  if (FILES[b].dir) html += `<span class="bc-item" data-bc="folder">${FILES[b].dir}</span>${sep}`;
  html += `<span class="bc-item" data-bc="file">${fileIcon(id)}${esc(isPreview(id) ? tabLabel(id) : FILES[b].name)}</span>`;
  if (doc && !isPreview(id)) {
    symbolChain(doc, caret.line).forEach((s) => {
      html += `${sep}<span class="bc-item" data-bc="symbol">${symIcon(s.kind)}${esc(s.name)}</span>`;
    });
  }
  bcEl.innerHTML = html;
}
bcEl.addEventListener('click', (e) => {
  const it = e.target.closest('.bc-item');
  if (!it) return;
  if (it.dataset.bc === 'symbol') openQuick('@');
  else openQuick('');
});

function rowFile(id, d, attrs = '') {
  return `<div class="row${state.active && baseId(state.active) === id ? ' selected' : ''}" data-open="${id}" style="--d:${d}" tabindex="-1" title="${esc('~/' + WORKSPACE + '/' + filePath(id))}" ${attrs}>`
    + `${d ? '<span class="tree-guide"></span>' : ''}<span class="twistie"></span>${fileIcon(id)}<span class="label">${esc(FILES[id].name)}</span></div>`;
}
function renderTree() {
  const ex = state.expanded['.vscode'];
  let html = `<div class="row" data-folder=".vscode" style="--d:0" tabindex="-1"><span class="twistie codicon codicon-chevron-${ex ? 'down' : 'right'}"></span><span class="label">.vscode</span></div>`;
  if (ex) html += rowFile('settings', 1);
  ROOT_FILES.forEach((id) => { html += rowFile(id, 0); });
  html += rowFile('workstation', 0);
  $('#fileTree').innerHTML = html;
}
function renderOpenEditors() {
  $('#openEditors').innerHTML = state.tabs.map((id) => `<div class="row${id === state.active ? ' selected' : ''}" data-open="${id}" style="--d:0" tabindex="-1">`
    + `<span class="row-close codicon codicon-close" data-close="${id}" title="Close"></span>${fileIcon(id)}<span class="label">${esc(tabLabel(id))}</span>`
    + `${FILES[baseId(id)].dir ? `<span class="desc">${FILES[baseId(id)].dir}</span>` : ''}</div>`).join('')
    || '<div class="pane-msg">No editors are open.</div>';
}
function renderOutline() {
  const el = $('#outline');
  if (!doc) { el.innerHTML = '<div class="pane-msg">The active editor cannot provide outline information.</div>'; return; }
  el.innerHTML = doc.symbols.map((s) => `<div class="row" data-goto="${s.line}" style="--d:${s.depth + 1}" tabindex="-1"><span class="twistie"></span>${symIcon(s.kind)}<span class="label">${esc(s.name)}</span></div>`).join('')
    || '<div class="pane-msg">No symbols found in document.</div>';
}

function updateStatus() {
  const id = state.active;
  if (id && !isVirtual(id)) {
    $('#sbIndent').textContent = `Spaces: ${FILES[id].indent}`;
    $('#sbLangName').textContent = FILES[id].label;
  }
  const label = id ? (isPreview(id) ? tabLabel(id) : FILES[id].name) : 'Welcome';
  document.title = `${label} - ${WORKSPACE} - ${P.name}`;
  $('#navBack').disabled = !state.back.length;
  $('#navFwd').disabled = !state.fwd.length;
}

function renderAll() {
  renderTabs();
  renderEditor();
  renderTree();
  renderOpenEditors();
  renderOutline();
  updateStatus();
  renderBreadcrumbs();
}

function saveViewState() {
  const id = state.active;
  if (!id || isScene(id)) return;
  viewState[id] = isPreview(id)
    ? { scrollTop: previewEl.scrollTop }
    : { line: caret.line, col: caret.col, scrollTop: scrollEl.scrollTop, scrollLeft: scrollEl.scrollLeft };
}

function openFile(id, { focus = true, fromHistory = false } = {}) {
  if (!id || (!FILES[id] && !isPreview(id))) return;
  if (state.active === id) { if (focus && !isVirtual(id)) editorEl.focus({ preventScroll: true }); return; }
  saveViewState();
  clearReveal();
  if (!state.tabs.includes(id)) {
    const at = state.tabs.indexOf(state.active);
    state.tabs.splice(at + 1, 0, id);
  }
  if (state.active && !fromHistory) { state.back.push(state.active); state.fwd = []; }
  state.active = id;
  state.recentFiles = [baseId(id), ...state.recentFiles.filter((x) => x !== baseId(id))];
  if (baseId(id) === 'settings') state.expanded['.vscode'] = true;
  renderAll();
  const vs = viewState[id];
  if (isScene(id)) {
    try { history.replaceState(null, '', '#' + id); } catch (e) { /* file:// */ }
  } else if (!isPreview(id)) {
    if (vs) {
      placeCaret(vs.line, vs.col);
      scrollEl.scrollTop = vs.scrollTop;
      scrollEl.scrollLeft = vs.scrollLeft;
    } else {
      scrollEl.scrollTop = 0;
      scrollEl.scrollLeft = 0;
      placeCaret(1, 1);
    }
    updateMinimapSlider();
    if (focus) editorEl.focus({ preventScroll: true });
    try { history.replaceState(null, '', '#' + id); } catch (e) { /* file:// */ }
  }
  log(`Opened ${isPreview(id) ? tabLabel(id) : filePath(id)}`);
}

function closeTab(id) {
  const i = state.tabs.indexOf(id);
  if (i < 0) return;
  saveViewState();
  state.tabs.splice(i, 1);
  delete viewState[id];
  state.back = state.back.filter((x) => x !== id);
  state.fwd = state.fwd.filter((x) => x !== id);
  if (state.active === id) {
    const next = state.tabs[i] || state.tabs[i - 1] || null;
    state.active = null;
    if (next) { openFile(next, { fromHistory: true }); return; }
    try { history.replaceState(null, '', location.pathname); } catch (e) { /* ignore */ }
  }
  renderAll();
  refreshCaret();
}
function closeAll() { state.tabs = []; state.active = null; state.back = []; state.fwd = []; renderAll(); try { history.replaceState(null, '', location.pathname); } catch (e) { /* ignore */ } }
function closeOthers(id) { state.tabs = [id]; state.back = []; state.fwd = []; if (state.active !== id) openFile(id); else renderAll(); }

function navigate(dir) {
  const from = dir < 0 ? state.back : state.fwd;
  const to = dir < 0 ? state.fwd : state.back;
  while (from.length) {
    const id = from.pop();
    if (!state.tabs.includes(id)) continue;
    if (state.active) to.push(state.active);
    openFile(id, { fromHistory: true });
    updateStatus();
    return;
  }
}

function reveal(id, line, start = 0, end = 0, { focus = false } = {}) {
  openFile(id, { focus });
  if (!doc || state.active !== id) return;
  placeCaret(line, start + 1, { scroll: 'center' });
  if (end > start) setReveal(line, start, end);
  flashLine(line);
}
function findInDoc(id, text) {
  const d = getDoc(id);
  for (let i = 0; i < d.lines.length; i++) {
    const s = d.lines[i].indexOf(text);
    if (s >= 0) return { line: i + 1, start: s, end: s + text.length };
  }
  return { line: 1, start: 0, end: 0 };
}

/* Tabs interactions */
tabsEl.addEventListener('click', (e) => {
  const close = e.target.closest('[data-close]');
  if (close) { e.stopPropagation(); closeTab(close.dataset.close); return; }
  const tab = e.target.closest('.tab');
  if (tab) openFile(tab.dataset.tab);
});
tabsEl.addEventListener('auxclick', (e) => {
  const tab = e.target.closest('.tab');
  if (tab && e.button === 1) { e.preventDefault(); closeTab(tab.dataset.tab); }
});
tabsEl.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); });
tabsEl.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { tabsEl.scrollLeft += e.deltaY; e.preventDefault(); }
}, { passive: false });
let dragTab = null;
tabsEl.addEventListener('dragstart', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  dragTab = tab.dataset.tab;
  e.dataTransfer.effectAllowed = 'move';
  try { e.dataTransfer.setData('text/plain', tabLabel(dragTab)); } catch (err) { /* ignore */ }
});
tabsEl.addEventListener('dragover', (e) => {
  if (!dragTab) return;
  e.preventDefault();
  $$('.tab.drop-target', tabsEl).forEach((t) => t.classList.remove('drop-target'));
  const tab = e.target.closest('.tab');
  if (tab) tab.classList.add('drop-target');
});
tabsEl.addEventListener('drop', (e) => {
  if (!dragTab) return;
  e.preventDefault();
  const tab = e.target.closest('.tab');
  const from = state.tabs.indexOf(dragTab);
  state.tabs.splice(from, 1);
  const to = tab ? state.tabs.indexOf(tab.dataset.tab) : state.tabs.length;
  state.tabs.splice(to < 0 ? state.tabs.length : to, 0, dragTab);
  dragTab = null;
  renderTabs();
  renderOpenEditors();
});
tabsEl.addEventListener('dragend', () => { dragTab = null; $$('.tab.drop-target', tabsEl).forEach((t) => t.classList.remove('drop-target')); });
tabsEl.addEventListener('contextmenu', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  e.preventDefault();
  const id = tab.dataset.tab;
  openMenu([
    { label: 'Close', run: () => closeTab(id) },
    { label: 'Close Others', run: () => closeOthers(id) },
    { label: 'Close to the Right', run: () => { const i = state.tabs.indexOf(id); state.tabs.slice(i + 1).forEach(closeTab); } },
    { label: 'Close All', run: closeAll },
    '-',
    { label: 'Copy Path', run: () => copyText(`~/${WORKSPACE}/${filePath(baseId(id))}`) },
    { label: 'Copy Relative Path', run: () => copyText(filePath(baseId(id))) },
  ], { x: e.clientX, y: e.clientY });
});

/* Sidebar interactions */
sidebarEl.addEventListener('click', (e) => {
  const close = e.target.closest('[data-close]');
  if (close) { e.stopPropagation(); closeTab(close.dataset.close); return; }
  const header = e.target.closest('.pane-header');
  if (header && !e.target.closest('.action')) { header.parentElement.classList.toggle('expanded'); return; }
  const folder = e.target.closest('[data-folder]');
  if (folder) { state.expanded[folder.dataset.folder] = !state.expanded[folder.dataset.folder]; renderTree(); $('#fileTree').querySelector(`[data-folder="${folder.dataset.folder}"]`).focus(); return; }
  const open = e.target.closest('[data-open]');
  if (open) {
    const tree = open.closest('.tree');
    openFile(open.dataset.open, { focus: false });
    const again = tree && tree.querySelector(`[data-open="${open.dataset.open}"]`);
    if (again) again.focus({ preventScroll: true });
    if (isMobile()) setSidebar(false);
    return;
  }
  const go = e.target.closest('[data-goto]');
  if (go && doc) { placeCaret(+go.dataset.goto, 1, { scroll: 'center' }); flashLine(+go.dataset.goto); if (isMobile()) setSidebar(false); return; }
  const rev = e.target.closest('[data-reveal]');
  if (rev) {
    const [id, line, s, en] = rev.dataset.reveal.split(':');
    reveal(id, +line, +s, +en);
    $$('.selected', rev.parentElement.parentElement).forEach((x) => x.classList.remove('selected'));
    rev.classList.add('selected');
    if (isMobile()) setSidebar(false);
    return;
  }
  const link = e.target.closest('[data-open-link]');
  if (link) { e.preventDefault(); openFile(link.dataset.openLink); }
});
sidebarEl.addEventListener('dblclick', (e) => {
  const open = e.target.closest('[data-open]');
  if (open) editorEl.focus({ preventScroll: true });
});
sidebarEl.addEventListener('keydown', (e) => {
  const row = e.target.closest('.row');
  if (!row) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const rows = $$('.row', row.closest('.tree') || sidebarEl);
    const i = rows.indexOf(row) + (e.key === 'ArrowDown' ? 1 : -1);
    if (rows[i]) rows[i].focus();
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    row.click();
    if (row.dataset.open) editorEl.focus({ preventScroll: true });
  }
});
$('#fileTree').addEventListener('contextmenu', (e) => {
  const row = e.target.closest('[data-open]');
  if (!row) return;
  e.preventDefault();
  const id = row.dataset.open;
  openMenu([
    { label: 'Open', run: () => openFile(id) },
    ...(FILES[id].lang === 'markdown' ? [{ label: 'Open Preview', kb: 'Ctrl+Shift+V', run: () => openFile('preview:' + id) }] : []),
    '-',
    { label: 'Copy Path', run: () => copyText(`~/${WORKSPACE}/${filePath(id)}`) },
    { label: 'Copy Relative Path', run: () => copyText(filePath(id)) },
    '-',
    { label: 'Download Resume', kb: 'Ctrl+S', run: downloadResume },
  ], { x: e.clientX, y: e.clientY });
});

/* Editor interactions */
linesEl.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return;
  const fold = e.target.closest('.fold.can');
  const ell = e.target.closest('.fold-ell');
  if (fold || ell) { e.preventDefault(); toggleFold(+(fold || ell).closest('.vl').dataset.l); editorEl.focus({ preventScroll: true }); }
});
scrollEl.addEventListener('mouseup', (e) => {
  if (e.button !== 0 || !doc) return;
  if (e.target.closest('a, .fold, .fold-ell')) return;
  clearReveal();
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed) {
    const r = sel.getRangeAt(0);
    const p = boundaryPos(sel.focusNode, sel.focusOffset) || boundaryPos(r.endContainer, r.endOffset);
    if (p) placeCaret(p.line, p.col);
    return;
  }
  const pos = posFromPoint(e.clientX, e.clientY);
  if (pos) placeCaret(pos.line, pos.col);
});
scrollEl.addEventListener('scroll', () => {
  editorEl.classList.toggle('scrolled', scrollEl.scrollTop > 0);
  updateMinimapSlider();
}, { passive: true });
editorEl.addEventListener('copy', (e) => {
  const t = selectionText();
  if (t == null) return;
  e.preventDefault();
  e.clipboardData.setData('text/plain', t);
});
editorEl.addEventListener('keydown', (e) => {
  if (!doc || e.target.closest('.find-widget')) return;
  const k = e.key;
  const mod = isMac ? e.metaKey : e.ctrlKey;
  const n = doc.lines.length;
  const hidden = hiddenLines(doc);
  const len = (l) => doc.lines[l - 1].length;
  const step = (l, d) => { let x = l + d; while (x >= 1 && x <= n && hidden.has(x)) x += d; return x < 1 || x > n ? l : x; };
  let { line, col } = caret;
  let keepWant = false;
  const page = Math.max(1, Math.floor(scrollEl.clientHeight / (parseFloat(getComputedStyle(scrollEl).lineHeight) || 20)) - 1);
  switch (k) {
    case 'ArrowUp': if (line === 1) col = 1; else { line = step(line, -1); col = Math.min(caret.want, len(line) + 1); } keepWant = true; break;
    case 'ArrowDown': if (step(line, 1) === line) col = len(line) + 1; else { line = step(line, 1); col = Math.min(caret.want, len(line) + 1); } keepWant = true; break;
    case 'ArrowLeft': if (col > 1) col--; else if (line > 1) { line = step(line, -1); col = len(line) + 1; } break;
    case 'ArrowRight': if (col <= len(line)) col++; else if (line < n) { line = step(line, 1); col = 1; } break;
    case 'Home': if (mod) { line = 1; col = 1; } else { const f = doc.lines[line - 1].match(/^\s*/)[0].length + 1; col = col === f ? 1 : f; } break;
    case 'End': if (mod) { line = n; col = len(n) + 1; } else col = len(line) + 1; break;
    case 'PageUp': for (let i = 0; i < page; i++) line = step(line, -1); col = Math.min(caret.want, len(line) + 1); keepWant = true; break;
    case 'PageDown': for (let i = 0; i < page; i++) line = step(line, 1); col = Math.min(caret.want, len(line) + 1); keepWant = true; break;
    case 'Escape': clearReveal(); if (find.open) closeFind(); return;
    default:
      if (mod && k.toLowerCase() === 'a') {
        e.preventDefault();
        const r = document.createRange();
        r.selectNodeContents(linesEl);
        const s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        return;
      }
      if (!mod && !e.altKey && (k.length === 1 || k === 'Backspace' || k === 'Delete' || k === 'Enter')) {
        e.preventDefault();
        showReadOnly();
      }
      return;
  }
  e.preventDefault();
  clearReveal();
  window.getSelection().removeAllRanges();
  placeCaret(line, col, { scroll: true, keepWant });
});
scrollEl.addEventListener('contextmenu', (e) => {
  if (!doc || e.target.closest('a')) return;
  e.preventDefault();
  const sel = selectionText();
  openMenu([
    { label: 'Go to Symbol...', kb: 'Ctrl+Shift+O', run: () => openQuick('@') },
    ...(doc.lang === 'markdown' ? [{ label: 'Open Preview', kb: 'Ctrl+Shift+V', run: () => runCmd('markdown.preview') }] : []),
    '-',
    { label: 'Copy', kb: 'Ctrl+C', disabled: !sel, run: () => sel && copyText(sel) },
    { label: 'Copy Line', run: () => copyText(doc.lines[caret.line - 1]) },
    { label: 'Select All', kb: 'Ctrl+A', run: () => runCmd('selectAll') },
    '-',
    { label: 'Fold All', kb: 'Ctrl+K Ctrl+0', run: () => foldAll(true) },
    { label: 'Unfold All', kb: 'Ctrl+K Ctrl+J', run: () => foldAll(false) },
    '-',
    { label: 'Command Palette...', kb: 'Ctrl+Shift+P', run: () => openQuick('>') },
  ], { x: e.clientX, y: e.clientY });
});

/* ───────────────────────────── Layout: side bar, panel, sashes ───────────────────────────── */
function applyLayout() {
  wb.style.setProperty('--sidebar-w', state.sidebarW + 'px');
  wb.style.setProperty('--panel-h', state.panelH + 'px');
  wb.classList.toggle('sidebar-hidden', state.sidebarHidden);
  wb.classList.toggle('panel-hidden', state.panelHidden);
  wb.classList.toggle('panel-max', state.panelMax && !state.panelHidden);
  editorEl.classList.toggle('wrap', state.wrap);
  $('#tbSidebar i').className = `codicon codicon-layout-sidebar-left${state.sidebarHidden ? '-off' : ''}`;
  $('#tbPanel i').className = `codicon codicon-layout-panel${state.panelHidden ? '-off' : ''}`;
  $('#panelMax i').className = `codicon codicon-chevron-${state.panelMax ? 'down' : 'up'}`;
  $('#panelMax').title = state.panelMax ? 'Restore Panel Size' : 'Maximize Panel Size';
  panelEl.classList.toggle('terminal-active', state.panel === 'terminal');
  scheduleRelayout();
}
let relayoutQueued = false;
function scheduleRelayout() {
  if (relayoutQueued) return;
  relayoutQueued = true;
  requestAnimationFrame(() => { relayoutQueued = false; drawMinimap(); refreshCaret(); });
}
function setSidebar(visible) {
  state.sidebarHidden = !visible;
  if (!isMobile()) store.set('sidebarHidden', state.sidebarHidden);
  applyLayout();
}
function showView(v, { toggle = false } = {}) {
  if (toggle && state.view === v && !state.sidebarHidden) { setSidebar(false); return; }
  state.view = v;
  $$('.ab-item[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === v));
  $$('.view').forEach((el) => el.classList.toggle('active', el.dataset.view === v));
  setSidebar(true);
  if (v === 'search') { const i = $('#searchInput'); const sel = selectionText(); if (sel && !sel.includes('\n')) { i.value = sel; runSearch(); } i.focus(); i.select(); }
  if (v === 'extensions') $('#extSearch').focus();
  if (v === 'explorer') { const r = $('#fileTree .row.selected') || $('#fileTree .row'); if (r) r.focus({ preventScroll: true }); }
}
function setPanel(visible) {
  state.panelHidden = !visible;
  if (!visible) state.panelMax = false;
  if (!isMobile()) store.set('panelHidden', state.panelHidden);
  applyLayout();
  if (!visible && doc) editorEl.focus({ preventScroll: true });
}
function showPanel(name, { focus = true } = {}) {
  state.panel = name;
  $$('.panel-tab').forEach((t) => t.classList.toggle('active', t.dataset.panel === name));
  $$('.panel-view').forEach((t) => t.classList.toggle('active', t.dataset.panel === name));
  setPanel(true);
  if (name === 'terminal' && focus) { termInput.focus({ preventScroll: true }); scrollTerm(); }
}
function toggleTerminal() {
  if (!state.panelHidden && state.panel === 'terminal') setPanel(false);
  else showPanel('terminal');
}
$('#panelTabs').addEventListener('click', (e) => { const t = e.target.closest('.panel-tab'); if (t) showPanel(t.dataset.panel); });
$('#panelMax').addEventListener('click', () => { state.panelMax = !state.panelMax; applyLayout(); });

function sash(el, cls, onMove, onEnd) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    el.classList.add('active');
    document.body.classList.add(cls);
    const move = (ev) => onMove(ev);
    const up = () => {
      el.classList.remove('active');
      document.body.classList.remove(cls);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      if (onEnd) onEnd();
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  });
}
sash($('#sidebarSash'), 'resizing-ew', (ev) => {
  const left = sidebarEl.getBoundingClientRect().left;
  const w = ev.clientX - left;
  if (w < 90) { if (!state.sidebarHidden) setSidebar(false); return; }
  if (state.sidebarHidden) setSidebar(true);
  state.sidebarW = clamp(w, 170, Math.min(640, window.innerWidth - 300));
  applyLayout();
}, () => store.set('sidebarW', state.sidebarW));
sash($('#panelSash'), 'resizing-ns', (ev) => {
  const r = $('#editorPart').getBoundingClientRect();
  const h = r.bottom - ev.clientY;
  state.panelH = clamp(h, 90, r.height - 90);
  applyLayout();
}, () => store.set('panelH', state.panelH));
$('#panelSash').addEventListener('dblclick', () => { state.panelH = 230; applyLayout(); store.set('panelH', 230); });

if (window.ResizeObserver) new ResizeObserver(() => scheduleRelayout()).observe(scrollEl);
window.addEventListener('resize', () => {
  scheduleRelayout();
  closeMenu();
});
$('#editorPart').addEventListener('pointerdown', () => { if (isMobile() && !state.sidebarHidden) setSidebar(false); });

/* Activity bar */
$$('.ab-item[data-view]').forEach((b) => b.addEventListener('click', () => showView(b.dataset.view, { toggle: true })));

/* ───────────────────────────── Themes & editor options ───────────────────────────── */
function setTheme(id, persist = true) {
  document.documentElement.setAttribute('data-theme', id);
  tokColors = {};
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--titlebar-bg').trim() || '#181818');
  if (persist) {
    state.theme = id;
    store.set('theme', id);
    log(`Color theme set to ${themeName(id)}`);
    refreshSettingsDoc();
  }
  drawMinimap();
  if (window.Workstation && window.Workstation.ready) requestAnimationFrame(() => window.Workstation.retheme());
}
function pickTheme() {
  const current = state.theme;
  const items = [];
  THEMES.forEach((t, i) => {
    items.push({
      label: t.name, id: t.id,
      sepLabel: i === 0 || THEMES[i - 1].kind !== t.kind ? `${t.kind} themes` : '',
      run: () => setTheme(t.id),
    });
  });
  openQuick('', {
    placeholder: 'Select Color Theme (Up/Down Keys to Preview)',
    items,
    active: items.findIndex((it) => it.id === current),
    onFocus: (it) => it && setTheme(it.id, false),
    onCancel: () => setTheme(current, false),
  });
}
function refreshSettingsDoc() {
  if (state.active === 'settings') { renderEditor({ keepScroll: true }); refreshCaret(); renderOutline(); }
}
function toggleWrap() {
  state.wrap = !state.wrap;
  store.set('wrap', state.wrap);
  applyLayout();
  refreshSettingsDoc();
}
function toggleMinimap() {
  state.minimap = !state.minimap;
  store.set('minimap', state.minimap);
  drawMinimap();
  refreshCaret();
  refreshSettingsDoc();
}

/* ───────────────────────────── Quick input (Command Palette / Quick Open) ───────────────────────────── */
const QI = { el: $('#quickInput'), input: $('#qiInput'), list: $('#qiList'), open: false, custom: null, items: [], sel: 0, prevFocus: null };

function fuzzy(q, text) {
  if (!q) return [];
  const t = text.toLowerCase();
  const ql = q.toLowerCase();
  const at = t.indexOf(ql);
  if (at >= 0) return Array.from({ length: ql.length }, (_, i) => at + i);
  const out = [];
  let j = 0;
  for (let i = 0; i < t.length && j < ql.length; i++) if (t[i] === ql[j]) { out.push(i); j++; }
  return j === ql.length ? out : null;
}
function hlLabel(label, idx) {
  if (!idx || !idx.length) return esc(label);
  const set = new Set(idx);
  let h = '';
  let open = false;
  for (let i = 0; i < label.length; i++) {
    if (set.has(i) && !open) { h += '<span class="hl">'; open = true; }
    if (!set.has(i) && open) { h += '</span>'; open = false; }
    h += esc(label[i]);
  }
  return h + (open ? '</span>' : '');
}
function filterItems(items, q) {
  if (!q) return items.map((it) => ({ ...it, hl: [] }));
  const exact = [];
  const loose = [];
  items.forEach((it) => {
    const hl = fuzzy(q, it.label);
    if (!hl) return;
    const contiguous = hl.length && hl[hl.length - 1] - hl[0] === hl.length - 1;
    (contiguous ? exact : loose).push({ ...it, hl, sepLabel: '' });
  });
  return exact.concat(loose);
}

function quickModel(v) {
  if (QI.custom) return { items: filterItems(QI.custom.items, v), placeholder: QI.custom.placeholder };
  if (v.startsWith('>')) {
    const q = v.slice(1).trim();
    const all = Object.values(CMD).filter((c) => c.palette !== false);
    const recent = state.recentCmds.map((id) => CMD[id]).filter(Boolean);
    const ordered = q ? all : [...recent, ...all.filter((c) => !recent.includes(c))];
    const items = ordered.map((c, i) => ({
      label: c.label, kb: c.kb, cmd: c.id,
      sepLabel: !q && recent.length && i === 0 ? 'recently used' : (!q && recent.length && i === recent.length ? 'other commands' : ''),
    }));
    return { items: filterItems(items, q), empty: 'No matching commands' };
  }
  if (v.startsWith(':')) {
    if (!doc) return { items: [], msg: 'Open a text editor first to go to a line.' };
    const n = doc.lines.length;
    const m = v.slice(1).trim().match(/^(\d+)?(?:[,:](\d+))?$/);
    if (!v.slice(1).trim() || !m || !m[1]) return { items: [], msg: `Current Line: ${caret.line}, Character: ${caret.col}. Type a line number between 1 and ${n} to navigate to.` };
    const line = clamp(+m[1], 1, n);
    const col = m[2] ? +m[2] : 1;
    return { items: [{ label: `Go to line ${line}${m[2] ? `, character ${col}` : ''}.`, run: () => { placeCaret(line, col, { scroll: 'center' }); editorEl.focus({ preventScroll: true }); } }] };
  }
  if (v.startsWith('@')) {
    if (!doc) return { items: [], msg: 'To go to a symbol, first open a text editor with symbol information.' };
    const items = doc.symbols.map((s) => ({ label: s.name, icon: `codicon-symbol-${s.kind}`, desc: `Ln ${s.line}`, run: () => { placeCaret(s.line, 1, { scroll: 'center' }); flashLine(s.line); editorEl.focus({ preventScroll: true }); } }));
    const res = filterItems(items, v.slice(1).trim());
    return { items: res, empty: 'No matching symbols', sepTop: `symbols (${res.length})` };
  }
  const q = v.trim();
  const lm = q.match(/^(.*?):(\d+)$/);
  const name = lm ? lm[1] : q;
  const order = [...state.recentFiles, ...[...ALL_FILES, 'workstation'].filter((id) => !state.recentFiles.includes(id))];
  const items = order.map((id, i) => ({
    label: FILES[id].name, fileId: id,
    desc: FILES[id].dir ? `${WORKSPACE}/${FILES[id].dir}` : WORKSPACE,
    sepLabel: !q && i === 0 ? 'recently opened' : '',
    run: () => { openFile(id); if (lm && !isVirtual(id)) placeCaret(+lm[2], 1, { scroll: 'center' }); },
  }));
  return { items: filterItems(items, name), empty: 'No matching results', placeholder: 'Search files by name (append : to go to line or @ to go to symbol)' };
}

function refreshQuick(initialSel) {
  const v = QI.input.value;
  const model = quickModel(v);
  QI.items = model.items;
  QI.input.placeholder = (model.placeholder || '');
  QI.sel = clamp(initialSel != null && initialSel >= 0 ? initialSel : 0, 0, Math.max(0, QI.items.length - 1));
  let html = '';
  if (model.msg) html += `<div class="qi-msg">${esc(model.msg)}</div>`;
  QI.items.forEach((it, i) => {
    const icon = it.fileId ? fileIcon(it.fileId) : it.icon ? `<i class="codicon ${it.icon} qi-icon sym ${it.icon}"></i>` : '';
    html += `<div class="qi-item${i === QI.sel ? ' sel' : ''}${it.sepLabel && i ? ' sep' : ''}" data-i="${i}" role="option">${icon}`
      + `<span class="qi-label">${hlLabel(it.label, it.hl)}</span>${it.desc ? `<span class="qi-desc">${esc(it.desc)}</span>` : ''}`
      + `<span class="qi-right">${it.sepLabel ? `<span class="qi-sep-label">${esc(it.sepLabel)}</span>` : ''}${it.kb ? kbChips(it.kb) : ''}</span></div>`;
  });
  if (!QI.items.length && !model.msg) html += `<div class="qi-msg">${esc(model.empty || 'No matching results')}</div>`;
  QI.list.innerHTML = html;
  focusQuick(QI.sel, false);
}
function focusQuick(i, notify = true) {
  if (!QI.items.length) return;
  QI.sel = (i + QI.items.length) % QI.items.length;
  $$('.qi-item', QI.list).forEach((el) => el.classList.toggle('sel', +el.dataset.i === QI.sel));
  const el = QI.list.querySelector(`.qi-item[data-i="${QI.sel}"]`);
  if (el) el.scrollIntoView({ block: 'nearest' });
  if (notify && QI.custom && QI.custom.onFocus) QI.custom.onFocus(QI.items[QI.sel]);
}
function openQuick(prefix = '', custom = null) {
  closeMenu();
  if (!QI.open) QI.prevFocus = document.activeElement;
  QI.custom = custom;
  QI.open = true;
  QI.el.classList.add('open');
  QI.input.value = custom ? '' : prefix;
  refreshQuick(custom ? custom.active : 0);
  QI.input.focus();
  QI.input.setSelectionRange(QI.input.value.length, QI.input.value.length);
}
function closeQuick(accepted = false) {
  if (!QI.open) return;
  const c = QI.custom;
  QI.open = false;
  QI.custom = null;
  QI.el.classList.remove('open');
  if (!accepted && c && c.onCancel) c.onCancel();
  if (QI.prevFocus && document.contains(QI.prevFocus) && QI.prevFocus !== document.body) QI.prevFocus.focus({ preventScroll: true });
}
function acceptQuick(i = QI.sel) {
  const it = QI.items[i];
  if (!it) return;
  closeQuick(true);
  if (it.cmd) runCmd(it.cmd); else if (it.run) it.run();
}
QI.input.addEventListener('input', () => refreshQuick());
QI.input.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); focusQuick(QI.sel + 1); break;
    case 'ArrowUp': e.preventDefault(); focusQuick(QI.sel - 1); break;
    case 'PageDown': e.preventDefault(); focusQuick(Math.min(QI.sel + 10, QI.items.length - 1)); break;
    case 'PageUp': e.preventDefault(); focusQuick(Math.max(QI.sel - 10, 0)); break;
    case 'Enter': e.preventDefault(); acceptQuick(); break;
    case 'Escape': e.preventDefault(); closeQuick(); break;
    default:
  }
});
QI.list.addEventListener('mousedown', (e) => e.preventDefault());
QI.list.addEventListener('click', (e) => { const it = e.target.closest('.qi-item'); if (it) acceptQuick(+it.dataset.i); });
QI.list.addEventListener('mousemove', (e) => {
  const it = e.target.closest('.qi-item');
  if (it && +it.dataset.i !== QI.sel && !QI.custom) focusQuick(+it.dataset.i, false);
});
document.addEventListener('mousedown', (e) => {
  if (QI.open && !QI.el.contains(e.target)) closeQuick();
}, true);

/* ───────────────────────────── Menus ───────────────────────────── */
const menuEl = $('#menu');
let menuState = null;
function openMenu(items, { x = 0, y = 0, alignBottom = false, owner = null } = {}) {
  closeMenu();
  menuEl.innerHTML = items.map((it, i) => (it === '-' ? '<div class="menu-sep"></div>'
    : `<div class="menu-item${it.disabled ? ' disabled' : ''}" data-i="${i}" role="menuitem">${it.checked ? '<i class="codicon codicon-check mi-check"></i>' : ''}`
      + `<span class="mi-label">${esc(it.label)}</span>${it.kb ? `<span class="mi-kb">${esc(kbText(it.kb))}</span>` : ''}</div>`)).join('');
  menuEl.classList.add('open');
  const mw = menuEl.offsetWidth;
  const mh = menuEl.offsetHeight;
  let left = x;
  let top = alignBottom ? y - mh : y;
  if (left + mw > window.innerWidth - 4) left = Math.max(4, window.innerWidth - mw - 4);
  if (top + mh > window.innerHeight - 4) top = Math.max(4, window.innerHeight - mh - 4);
  menuEl.style.left = left + 'px';
  menuEl.style.top = Math.max(4, top) + 'px';
  menuState = { items, owner, focus: -1 };
  if (owner) owner.classList.add('open');
}
function closeMenu() {
  if (!menuState) return;
  menuEl.classList.remove('open');
  if (menuState.owner) menuState.owner.classList.remove('open');
  menuState = null;
}
function focusMenu(dir) {
  const els = $$('.menu-item:not(.disabled)', menuEl);
  if (!els.length) return;
  let i = els.findIndex((el) => el.classList.contains('focused'));
  els.forEach((el) => el.classList.remove('focused'));
  i = (i + dir + els.length) % els.length;
  els[i].classList.add('focused');
}
menuEl.addEventListener('mousedown', (e) => e.preventDefault());
menuEl.addEventListener('click', (e) => {
  const el = e.target.closest('.menu-item');
  if (!el || el.classList.contains('disabled') || !menuState) return;
  const it = menuState.items[+el.dataset.i];
  closeMenu();
  if (it.cmd) runCmd(it.cmd); else if (it.run) it.run();
});
document.addEventListener('mousedown', (e) => {
  if (menuState && !menuEl.contains(e.target) && !e.target.closest('.menubar-item, #hamburger, #manageBtn, #accountsBtn, #editorMore, #explorerMore, #sbRemote')) closeMenu();
});
window.addEventListener('blur', closeMenu);

const mi = (cmd, label) => ({ label: label || CMD[cmd].menu || CMD[cmd].label, kb: CMD[cmd].kb, cmd, checked: CMD[cmd].checked ? CMD[cmd].checked() : false, disabled: CMD[cmd].enabled ? !CMD[cmd].enabled() : false });
const MENUS = {
  File: () => [mi('quickOpen', 'Open File...'), mi('download', 'Save Resume As...'), '-', mi('markdown.preview', 'Open Preview'), '-', mi('theme', 'Color Theme'), '-', mi('closeEditor', 'Close Editor'), mi('closeAll', 'Close All Editors')],
  Edit: () => [mi('copy'), mi('selectAll'), '-', mi('find'), mi('findInFiles')],
  Selection: () => [mi('selectAll'), mi('copyLine'), '-', mi('foldAll'), mi('unfoldAll')],
  View: () => [mi('commands', 'Command Palette...'), mi('quickOpen', 'Open View...'), '-', mi('view.explorer', 'Explorer'), mi('view.search', 'Search'), mi('view.scm', 'Source Control'), mi('view.run', 'Run'), mi('view.extensions', 'Extensions'), '-', mi('panel.problems', 'Problems'), mi('panel.output', 'Output'), mi('panel.debug', 'Debug Console'), mi('panel.terminal', 'Terminal'), '-', mi('toggleWrap', 'Word Wrap'), mi('toggleMinimap', 'Minimap'), mi('toggleSidebar', 'Primary Side Bar'), mi('togglePanel', 'Panel')],
  Go: () => [mi('back', 'Back'), mi('forward', 'Forward'), '-', mi('quickOpen', 'Go to File...'), mi('gotoSymbol', 'Go to Symbol in Editor...'), mi('gotoLine', 'Go to Line/Column...')],
  Run: () => [mi('run', 'Start Debugging'), mi('runNoDebug', 'Run Without Debugging')],
  Terminal: () => [mi('newTerminal', 'New Terminal'), mi('clearTerminal', 'Clear Terminal')],
  Help: () => [mi('commands', 'Show All Commands'), mi('shortcuts', 'Keyboard Shortcuts'), mi('openReadme', 'Welcome'), '-', mi('email', 'Email Sreehari'), mi('github', 'View GitHub Profile'), mi('linkedin', 'View LinkedIn Profile'), '-', mi('about', 'About')],
};
$('#menubar').addEventListener('click', (e) => {
  const item = e.target.closest('.menubar-item');
  if (!item) return;
  if (menuState && menuState.owner === item) { closeMenu(); return; }
  const r = item.getBoundingClientRect();
  openMenu(MENUS[item.dataset.menu](), { x: r.left, y: r.bottom + 2, owner: item });
});
$('#menubar').addEventListener('mouseover', (e) => {
  const item = e.target.closest('.menubar-item');
  if (!item || !menuState || !menuState.owner || menuState.owner === item || !menuState.owner.classList.contains('menubar-item')) return;
  const r = item.getBoundingClientRect();
  openMenu(MENUS[item.dataset.menu](), { x: r.left, y: r.bottom + 2, owner: item });
});
const anchorMenu = (btn, items, side = 'below') => {
  if (menuState && menuState.owner === btn) { closeMenu(); return; }
  const r = btn.getBoundingClientRect();
  if (side === 'right') openMenu(items, { x: r.right + 2, y: r.bottom, alignBottom: true, owner: btn });
  else openMenu(items, { x: r.left, y: r.bottom + 2, owner: btn });
};
$('#hamburger').addEventListener('click', (e) => anchorMenu(e.currentTarget, [mi('quickOpen', 'Go to File...'), mi('commands', 'Command Palette...'), '-', mi('view.explorer', 'Explorer'), mi('view.search', 'Search'), mi('view.scm', 'Source Control'), mi('view.extensions', 'Extensions'), '-', mi('panel.terminal', 'Terminal'), mi('theme', 'Color Theme'), mi('toggleWrap', 'Word Wrap'), '-', mi('download', 'Download Resume'), mi('email', 'Email Sreehari')]));
$('#manageBtn').addEventListener('click', (e) => anchorMenu(e.currentTarget, [mi('commands', 'Command Palette...'), mi('shortcuts', 'Keyboard Shortcuts'), mi('openSettings', 'Settings'), '-', mi('theme', 'Themes: Color Theme'), mi('toggleWrap', 'Word Wrap'), mi('toggleMinimap', 'Minimap'), '-', mi('download', 'Download Resume')], 'right'));
$('#accountsBtn').addEventListener('click', (e) => anchorMenu(e.currentTarget, [
  { label: `${P.name} (GitHub)`, disabled: true }, '-',
  mi('github', 'GitHub Profile'), mi('linkedin', 'LinkedIn Profile'), mi('leetcode', 'LeetCode Profile'), mi('hackerrank', 'HackerRank Profile'), '-', mi('email', 'Send Email'),
], 'right'));
$('#editorMore').addEventListener('click', (e) => anchorMenu(e.currentTarget, [mi('closeAll', 'Close All'), { label: 'Close Others', disabled: !state.active, run: () => state.active && closeOthers(state.active) }, '-', mi('toggleWrap', 'Word Wrap'), mi('toggleMinimap', 'Minimap'), '-', mi('foldAll'), mi('unfoldAll'), '-', mi('download', 'Download Resume')]));
$('#explorerMore').addEventListener('click', (e) => anchorMenu(e.currentTarget, [mi('collapseFolders', 'Collapse Folders in Explorer'), mi('refreshExplorer', 'Refresh Explorer'), '-', mi('download', 'Download Resume')]));
$('#sbRemote').addEventListener('click', () => openQuick('', {
  placeholder: 'Sreehari is open to new opportunities. Pick an option',
  items: [
    { label: 'Send an Email', icon: 'codicon-mail', desc: P.email, run: () => runCmd('email') },
    { label: 'Connect on LinkedIn', icon: 'codicon-person-add', desc: LINKS.linkedin.replace('https://', ''), run: () => runCmd('linkedin') },
    { label: 'View GitHub Profile', icon: 'codicon-github', desc: LINKS.github.replace('https://', ''), run: () => runCmd('github') },
    { label: 'Download Resume', icon: 'codicon-cloud-download', desc: 'Sreehari_S_Resume.txt', run: downloadResume },
    { label: 'Copy Phone Number', icon: 'codicon-copy', desc: P.phone, run: () => { copyText(P.phone); notify('Phone number copied to clipboard.'); } },
  ],
}));

/* ───────────────────────────── Notifications & logs ───────────────────────────── */
const notifEl = $('#notifications');
function notify(msg, { severity = 'info', actions = [], source = WORKSPACE, timeout } = {}) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.innerHTML = `<div class="toast-main"><i class="codicon codicon-${severity} toast-icon ${severity}"></i><div class="toast-msg">${msg}</div>`
    + '<button class="action" data-x title="Clear Notification"><i class="codicon codicon-close"></i></button></div>'
    + (actions.length ? `<div class="toast-foot"><span class="toast-source">Source: ${esc(source)}</span><div class="toast-actions">${actions.map((a, i) => `<button class="btn${a.primary ? '' : ' secondary'}" data-a="${i}">${esc(a.label)}</button>`).join('')}</div></div>` : '');
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    el.classList.add('out');
    setTimeout(() => { el.remove(); updateBell(); }, 200);
  };
  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-x]')) { close(); return; }
    const b = e.target.closest('[data-a]');
    if (b) { close(); const a = actions[+b.dataset.a]; if (a.run) a.run(); }
  });
  notifEl.appendChild(el);
  while (notifEl.children.length > 3) notifEl.firstElementChild.remove();
  const t = timeout != null ? timeout : (actions.length ? 20000 : 5000);
  if (t) setTimeout(close, t);
  updateBell();
  return close;
}
function updateBell() {
  const n = notifEl.children.length;
  $('#sbBell i').className = `codicon codicon-${n ? 'bell-dot' : 'bell'}`;
  $('#sbBell').title = n ? `${n} New Notification${n > 1 ? 's' : ''}` : 'No New Notifications';
}
$('#sbBell').addEventListener('click', () => { $$('.toast', notifEl).forEach((t) => t.remove()); updateBell(); });

function stamp() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}`;
}
function log(msg, level = 'info') {
  const el = document.createElement('div');
  el.innerHTML = `${stamp()} <span class="lvl-${level}">[${level}]</span> ${esc(msg)}`;
  $('#outputLog').appendChild(el);
}
function debugLog(html) {
  const el = document.createElement('div');
  el.innerHTML = html;
  $('#debugLog').appendChild(el);
}

let chord = null;
let msgTimer = null;
function statusMsg(text, ms = 0) {
  $('#sbMsg').textContent = text;
  clearTimeout(msgTimer);
  if (ms) msgTimer = setTimeout(() => { $('#sbMsg').textContent = ''; }, ms);
}

/* ───────────────────────────── Download resume ───────────────────────────── */
function resumeText() {
  const line = (s) => '-'.repeat(s.length);
  const sec = (t) => `${t}\n${line(t)}`;
  return [
    `${P.name} - Software Engineer`,
    '='.repeat(40),
    '',
    sec('CONTACT INFORMATION'),
    `Email:      ${P.email}`,
    `Phone:      ${P.phone}`,
    `Website:    ${LINKS.website}`,
    `LinkedIn:   ${LINKS.linkedin}`,
    `GitHub:     ${LINKS.github}`,
    `LeetCode:   ${LINKS.leetcode}`,
    `HackerRank: ${LINKS.hackerrank}`,
    '',
    sec('PROFESSIONAL SUMMARY'),
    S.summary,
    '',
    sec('WORK EXPERIENCE'),
    ...S.experience.flatMap((e) => [`${e.title} | ${e.company}`, e.period, ...e.achievements.map((a) => `  • ${a}`), `  Technologies: ${e.techStack}`, '']),
    sec('EDUCATION'),
    ...S.education.flatMap((e) => [e.degree, `${e.institution} | CGPA: ${e.cgpa}/10`, `Period: ${e.period}`, '']),
    sec('TECHNICAL SKILLS'),
    `Programming Languages: ${S.skills.languages.join(', ')}`,
    `Database Systems:      ${S.skills.databases.join(', ')}`,
    `Development Tools:     ${S.skills.tools.join(', ')}`,
    `Operating Systems:     ${S.skills.os.join(', ')}`,
    `Core Competencies:     ${S.skills.other.join(', ')}`,
    '',
    sec('KEY ACHIEVEMENTS'),
    '  • Spot Award for Query Tool development',
    '  • 25% improvement in system efficiency',
    '  • Served 10,000+ users through the GoPerform application',
    '  • Developed tools used by 50+ stakeholders',
    '  • Resolved 100+ critical bugs',
    '  • Integrated 5+ RESTful APIs',
    '',
    `Generated from ${LINKS.website} on ${new Date().toLocaleDateString()}`,
    '',
  ].join('\n');
}
function downloadResume() {
  const name = `${P.name.replace(/\s+/g, '_')}_Resume.txt`;
  try {
    const blob = new Blob([resumeText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify(`Saved <b>${esc(name)}</b> to your downloads.`);
    log(`Downloaded ${name}`);
  } catch (e) {
    notify('Could not download the resume.', { severity: 'error' });
  }
  return name;
}

/* ───────────────────────────── Search view ───────────────────────────── */
const search = { opts: { case: false, word: false, regex: false }, collapsed: new Set(), timer: null };
function runSearch() {
  const q = $('#searchInput').value;
  const out = $('#searchResults');
  const msg = $('#searchMsg');
  if (!q) { out.innerHTML = ''; msg.textContent = ''; return; }
  const re = buildRegex(q, search.opts);
  if (!re) { out.innerHTML = ''; msg.textContent = 'The regular expression is not valid.'; return; }
  let total = 0;
  let files = 0;
  let html = '';
  [...ALL_FILES].sort((a, b) => filePath(a).localeCompare(filePath(b))).forEach((id) => {
    const d = getDoc(id);
    const ms = findAll(d.lines, re);
    if (!ms.length) return;
    total += ms.length;
    files++;
    const col = search.collapsed.has(id);
    html += `<div class="row" data-sfile="${id}" style="--d:0" tabindex="-1"><span class="twistie codicon codicon-chevron-${col ? 'right' : 'down'}"></span>${fileIcon(id)}<span class="label">${esc(FILES[id].name)}</span>${FILES[id].dir ? `<span class="desc">${FILES[id].dir}</span>` : ''}<span class="row-end"><span class="badge">${ms.length}</span></span></div>`;
    if (col) return;
    ms.forEach((m) => {
      const l = d.lines[m.line - 1];
      const from = Math.max(0, m.start - 24);
      let before = l.slice(from, m.start);
      if (from === 0) before = before.replace(/^\s+/, '');
      html += `<div class="row" data-reveal="${id}:${m.line}:${m.start}:${m.end}" style="--d:2" tabindex="-1" title="${esc(l.trim())}"><span class="tree-guide"></span><span class="match-text">${from > 0 ? '…' : ''}${esc(before)}<span class="match">${esc(l.slice(m.start, m.end))}</span>${esc(l.slice(m.end, m.end + 120))}</span></div>`;
    });
  });
  out.innerHTML = html;
  msg.textContent = total ? `${total} result${total > 1 ? 's' : ''} in ${files} file${files > 1 ? 's' : ''}` : 'No results found. Review your settings for configured exclusions and check your gitignore files.';
}
$('#searchInput').addEventListener('input', () => { clearTimeout(search.timer); search.timer = setTimeout(runSearch, 120); });
$('#searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); runSearch(); const first = $('#searchResults [data-reveal]'); if (first) first.click(); }
  if (e.key === 'ArrowDown') { const first = $('#searchResults .row'); if (first) { e.preventDefault(); first.focus(); } }
});
$('#searchResults').addEventListener('click', (e) => {
  const f = e.target.closest('[data-sfile]');
  if (!f) return;
  const id = f.dataset.sfile;
  if (search.collapsed.has(id)) search.collapsed.delete(id); else search.collapsed.add(id);
  runSearch();
});
$$('[data-sopt]').forEach((b) => b.addEventListener('click', () => {
  search.opts[b.dataset.sopt] = !search.opts[b.dataset.sopt];
  b.classList.toggle('on', search.opts[b.dataset.sopt]);
  runSearch();
}));
$('#searchRefresh').addEventListener('click', runSearch);
$('#searchClear').addEventListener('click', () => { $('#searchInput').value = ''; runSearch(); $('#searchInput').focus(); });
$('#searchCollapse').addEventListener('click', () => { ALL_FILES.forEach((id) => search.collapsed.add(id)); runSearch(); });

/* ───────────────────────────── Source control (career history) ───────────────────────────── */
function careerCommits() {
  const ex = S.experience;
  const ed = S.education;
  return [
    { msg: `feat: ${ex[0].title} @ ${ex[0].company}`, when: ex[0].period, file: 'experience', find: ex[0].company, head: true },
    { msg: `docs: ${ed[0].degree}, ${ed[0].institution} (CGPA ${ed[0].cgpa})`, when: ed[0].period, file: 'education', find: ed[0].institution },
    { msg: `feat: ${ex[1].title} @ ${ex[1].company}`, when: ex[1].period, file: 'experience', find: ex[1].company },
    { msg: `docs: ${ed[1].degree}, ${ed[1].institution} (CGPA ${ed[1].cgpa})`, when: ed[1].period, file: 'education', find: ed[1].institution },
  ].map((c) => ({ ...c, hash: hash7(c.msg) }));
}
function renderSCM() {
  const cs = careerCommits();
  $('#scmBadge').textContent = cs.length;
  $('#scmGraph').innerHTML = cs.map((c, i) => {
    const first = i === 0;
    const last = i === cs.length - 1;
    const svg = `<svg width="16" height="26" viewBox="0 0 16 26" aria-hidden="true"><path class="lane" d="M8 ${first ? 13 : 0}V${last ? 13 : 26}"/>${first ? '<circle class="head" cx="8" cy="13" r="4"/>' : '<circle class="node" cx="8" cy="13" r="4"/>'}</svg>`;
    const f = findInDoc(c.file, c.find);
    return `<div class="row graph-row" data-reveal="${c.file}:${f.line}:${f.start}:${f.end}" tabindex="-1" title="${esc(`${c.hash}  ${c.msg}\n${c.when}`)}">${svg}<span class="label">${esc(c.msg)}</span>${c.head ? '<span class="ref"><i class="codicon codicon-git-branch"></i>main</span>' : ''}<span class="desc">${esc(c.when)}</span></div>`;
  }).join('');
}
function commit() {
  const ta = $('#commitMsg');
  const text = ta.value.trim();
  if (!text) {
    notify('Write a message first. Commits from this view are sent to Sreehari by email.', { severity: 'warning' });
    ta.focus();
    return;
  }
  const subject = encodeURIComponent('Hello from your VS Code resume');
  openUrl(`mailto:${P.email}?subject=${subject}&body=${encodeURIComponent(text)}`);
  notify('Opening your email client with the message. Thanks for reaching out!');
  log('Commit message handed to the mail client');
  ta.value = '';
  ta.style.height = '';
}
$('#commitBtn').addEventListener('click', commit);
$('#scmCommitTop').addEventListener('click', commit);
$('#scmRefresh').addEventListener('click', renderSCM);
$('#commitMsg').addEventListener('keydown', (e) => { if (e.key === 'Enter' && (isMac ? e.metaKey : e.ctrlKey)) { e.preventDefault(); commit(); } });
$('#commitMsg').addEventListener('input', (e) => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight + 2, 140) + 'px'; });

/* ───────────────────────────── Extensions (skills) ───────────────────────────── */
const EXT_COLORS = ['#3572A5', '#f34b7d', '#4EAA25', '#00758f', '#cc2927', '#13aa52', '#f05032', '#0078d4', '#2496ed', '#809cc9', '#b07219', '#6c4bd8', '#ee0000', '#c678dd', '#e5a50a'];
function renderExtensions() {
  const q = $('#extSearch').value.trim().toLowerCase();
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9+#]/g, '');
  let k = 0;
  const items = [];
  skillCategories().forEach((c) => c.items.forEach((name) => {
    const used = S.experience.filter((e) => e.techStack.split(/,\s*|\//).some((t) => norm(t).startsWith(norm(name)) || norm(name).startsWith(norm(t)) && norm(t).length > 2)).map((e) => e.company.split(',')[0]);
    items.push({ name, cat: c.label, used, color: EXT_COLORS[k++ % EXT_COLORS.length] });
  }));
  const shown = items.filter((it) => !q || it.name.toLowerCase().includes(q) || it.cat.toLowerCase().includes(q));
  $('#extCount').textContent = shown.length;
  $('#extList').innerHTML = shown.map((it) => {
    const words = it.name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
    const label = it.name.length <= 3 ? it.name : words.length > 1 ? words.map((w) => w[0]).join('').slice(0, 2) : it.name.slice(0, 2);
    return `<div class="ext" data-skill="${esc(it.name)}" title="${esc(it.name)}"><div class="ext-icon" style="background:${it.color}">${esc(label)}</div>`
      + `<div class="ext-body"><div class="ext-name">${esc(it.name)}</div><div class="ext-desc">${esc(it.cat)}${it.used.length ? ` · used at ${esc(it.used.join(' & '))}` : ''}</div>`
      + `<div class="ext-foot"><span>${esc(P.name)}</span><i class="codicon codicon-verified-filled" title="Verified"></i><i class="codicon codicon-gear"></i></div></div></div>`;
  }).join('') || '<div class="pane-msg">No extensions found.</div>';
}
$('#extSearch').addEventListener('input', renderExtensions);
$('#extClear').addEventListener('click', () => { $('#extSearch').value = ''; renderExtensions(); });
$('#extList').addEventListener('click', (e) => {
  const el = e.target.closest('[data-skill]');
  if (!el) return;
  $$('.ext.selected').forEach((x) => x.classList.remove('selected'));
  el.classList.add('selected');
  const f = findInDoc('skills', `"${el.dataset.skill}"`);
  reveal('skills', f.line, f.start + 1, f.end - 1);
  if (isMobile()) setSidebar(false);
});

/* ───────────────────────────── Terminal ───────────────────────────── */
const term = { history: [], hIdx: 0, busy: false };
const PROMPT = '<span class="ansi-green b">visitor@sreehari</span>:<span class="ansi-blue b">~/sreehari-resume</span>$ ';
$('#termPrompt').innerHTML = PROMPT;
const span = (cls, s) => `<span class="${cls}">${esc(s)}</span>`;
const alink = (url, text) => `<a href="${url}" target="_blank" rel="noopener">${esc(text || url)}</a>`;
function scrollTerm() { const v = termScroll(); v.scrollTop = v.scrollHeight; }
function tprint(html = '') {
  const d = document.createElement('div');
  d.innerHTML = html === '' ? '&nbsp;' : html;
  termOut.appendChild(d);
  scrollTerm();
}
function banner() {
  tprint(`${span('b', `Welcome to ${P.name}'s resume`)} ${span('ansi-gray', '(bash 5.2)')}`);
  tprint(`Type ${span('ansi-cyan', 'help')} to list commands. Try ${span('ansi-cyan', 'neofetch')}, ${span('ansi-cyan', 'experience')} or ${span('ansi-cyan', 'git log')}.`);
  tprint('');
}
function lsLong(all) {
  const d = new Date();
  const mon = d.toLocaleString('en-US', { month: 'short' });
  const date = `${mon} ${String(d.getDate()).padStart(2)} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  const rows = [];
  if (all) {
    rows.push(`drwxr-xr-x 3 sreehari sreehari 4096 ${date} ${span('ansi-blue b', '.')}`);
    rows.push(`drwxr-xr-x 9 sreehari sreehari 4096 ${date} ${span('ansi-blue b', '..')}`);
    rows.push(`drwxr-xr-x 2 sreehari sreehari 4096 ${date} ${span('ansi-blue b', '.vscode')}`);
  }
  ROOT_FILES.forEach((id) => {
    const size = String(new Blob([SRC[id]()]).size).padStart(4);
    rows.push(`-rw-r--r-- 1 sreehari sreehari ${size} ${date} ${esc(FILES[id].name)}`);
  });
  return `total ${rows.length * 4}\n${rows.join('\n')}`;
}
function neofetch() {
  const art = [
    '   ▄████████▄   ',
    '  ███      ▀▀   ',
    '   ▀████████▄   ',
    '  ▄▄      ███   ',
    '   ▀████████▀   ',
    '                ',
    '   {  S  }      ',
  ].join('\n');
  const kv = (k, v) => `${span('ansi-blue b', k)}: ${esc(v)}`;
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'gray'].map((c) => `<span style="background:var(--ansi-${c})"></span>`).join('');
  const info = [
    `${span('ansi-green b', 'visitor')}@${span('ansi-green b', 'sreehari')}`,
    '-'.repeat(16),
    kv('Name', P.name),
    kv('Role', `${S.experience[0].title} @ ${S.experience[0].company}`),
    kv('Uptime', '3+ years of professional experience'),
    kv('OS', S.skills.os.join(', ')),
    kv('Shell', 'bash 5.2'),
    kv('Languages', S.skills.languages.join(', ')),
    kv('Databases', S.skills.databases.join(', ')),
    kv('Tools', S.skills.tools.join(', ')),
    kv('Education', `${S.education[0].degree} (CGPA ${S.education[0].cgpa})`),
    `${span('ansi-blue b', 'Contact')}: <a href="mailto:${P.email}">${esc(P.email)}</a>`,
    '',
    `<span class="nf-colors">${colors}</span>`,
  ].join('\n');
  return `<div class="nf"><div class="nf-art">${esc(art)}</div><div>${info}</div></div>`;
}
function runSkillsScript(done) {
  const total = S.skills.languages.length + S.skills.databases.length + S.skills.tools.length + S.skills.os.length + S.skills.other.length;
  const out = [`Total technical skills: ${total}`, 'Years of experience: 3+', 'Current focus: System Optimization & API Development'];
  term.busy = true;
  wb.classList.add('debugging');
  debugLog(`<span class="ansi-gray">${stamp()}</span> Launching ${span('b', 'Python: Skills.py')}`);
  out.forEach((l, i) => setTimeout(() => {
    tprint(esc(l));
    debugLog(esc(l));
    if (i === out.length - 1) {
      setTimeout(() => {
        wb.classList.remove('debugging');
        term.busy = false;
        debugLog(`<span class="ansi-gray">Process exited with code 0</span>`);
        log('Skills.py exited with code 0');
        if (done) done();
      }, 700);
    }
  }, 250 + i * 220));
}
const HELP = [
  ['help', 'Show this help'],
  ['whoami', 'Who is Sreehari?'],
  ['about', 'Professional summary'],
  ['experience', 'Work experience'],
  ['education', 'Education'],
  ['skills', 'Technical skills'],
  ['contact', 'Contact details & profiles'],
  ['homelab', 'Open the 3D workstation'],
  ['neofetch', 'System information... about me'],
  ['ls [-la]', 'List workspace files'],
  ['cat <file>', 'Print a file'],
  ['code <file>', 'Open a file in the editor'],
  ['git log | status', 'Career history, the git way'],
  ['python3 Skills.py', 'Run the skills script'],
  ['download', 'Download the resume (.txt)'],
  ['email', 'Write an email to Sreehari'],
  ['github | linkedin', 'Open a profile in a new tab'],
  ['theme [name]', 'List or change color themes'],
  ['clear', 'Clear the terminal (Ctrl+L)'],
  ['history, date, pwd, echo, exit', ''],
];
const TERM = {
  help: () => [span('b', 'Available commands'), ...HELP.map(([k, d]) => `  ${span('ansi-cyan', k.padEnd(32))}${esc(d)}`), '', `${span('ansi-gray', 'Tab completes commands and file names. Up/Down browses history.')}`].join('\n'),
  whoami: () => `${esc(P.name)}, ${esc(S.experience[0].title)} @ ${esc(S.experience[0].company)}`,
  about: () => esc(S.summary),
  summary: () => TERM.about(),
  experience: () => S.experience.map((e) => [
    `${span('ansi-yellow b', e.title)} @ ${span('ansi-cyan', e.company)}  ${span('ansi-gray', e.period)}`,
    ...e.achievements.map((a) => `  • ${esc(a)}`),
    `  ${span('ansi-gray', 'Tech:')} ${esc(e.techStack)}`,
  ].join('\n')).join('\n\n'),
  education: () => S.education.map((e) => `${span('ansi-yellow b', e.degree)}\n  ${span('ansi-cyan', e.institution)}  ${span('ansi-gray', e.period)}  CGPA ${span('ansi-green', e.cgpa)}/10`).join('\n\n'),
  skills: () => skillCategories().map((c) => `  ${span('ansi-cyan', (c.key + ':').padEnd(20))}${esc(c.items.join(', '))}`).join('\n'),
  contact: () => [
    `  ${span('ansi-cyan', 'Email'.padEnd(12))}<a href="mailto:${P.email}">${esc(P.email)}</a>`,
    `  ${span('ansi-cyan', 'Phone'.padEnd(12))}<a href="tel:${P.phone.replace(/[^+\d]/g, '')}">${esc(P.phone)}</a>`,
    `  ${span('ansi-cyan', 'Website'.padEnd(12))}${alink(LINKS.website)}`,
    `  ${span('ansi-cyan', 'LinkedIn'.padEnd(12))}${alink(LINKS.linkedin)}`,
    `  ${span('ansi-cyan', 'GitHub'.padEnd(12))}${alink(LINKS.github)}`,
    `  ${span('ansi-cyan', 'LeetCode'.padEnd(12))}${alink(LINKS.leetcode)}`,
    `  ${span('ansi-cyan', 'HackerRank'.padEnd(12))}${alink(LINKS.hackerrank)}`,
  ].join('\n'),
  neofetch,
  ls: (args) => {
    const flags = args.filter((a) => a.startsWith('-')).join('');
    if (flags.includes('l')) return lsLong(flags.includes('a'));
    return (flags.includes('a') ? `${span('ansi-blue b', '.')}  ${span('ansi-blue b', '..')}  ${span('ansi-blue b', '.vscode')}  ` : '') + ROOT_FILES.map((id) => esc(FILES[id].name)).join('  ');
  },
  ll: () => lsLong(true),
  cat: (args) => {
    if (!args.length) return 'Usage: cat <file>';
    return args.map((a) => { const id = fileByName(a); return id ? esc(SRC[id]().replace(/\n$/, '')) : `cat: ${esc(a)}: No such file or directory`; }).join('\n');
  },
  code: (args) => {
    if (!args.length) return 'Usage: code <file>';
    if (args[0] === '.') { showView('explorer'); return ''; }
    const id = fileByName(args[0]);
    if (!id) return `${span('ansi-red', 'error')}: ${esc(args[0])} does not exist`;
    openFile(id);
    return '';
  },
  git: (args) => {
    const sub = args[0];
    const cs = careerCommits();
    if (sub === 'log') {
      if (args.includes('--oneline')) return cs.map((c, i) => `${span('ansi-yellow', c.hash)} ${i === 0 ? `(${span('ansi-cyan b', 'HEAD -> ')}${span('ansi-green b', 'main')}) ` : ''}${esc(c.msg)}`).join('\n');
      return cs.map((c, i) => [
        `${span('ansi-yellow', `commit ${c.hash}${hash7(c.hash + 'x')}${hash7(c.msg + 'y')}`)}${i === 0 ? ` (${span('ansi-cyan b', 'HEAD -> ')}${span('ansi-green b', 'main')}${span('ansi-yellow', ', ')}${span('ansi-red b', 'origin/main')})` : ''}`,
        `Author: ${esc(P.name)} &lt;${esc(P.email)}&gt;`,
        `Date:   ${esc(c.when)}`,
        '',
        `    ${esc(c.msg)}`,
      ].join('\n')).join('\n\n');
    }
    if (sub === 'status') return "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean";
    if (sub === 'branch') return `* ${span('ansi-green', 'main')}\n  open-to-work`;
    if (!sub) return 'usage: git [log | status | branch]';
    return `git: '${esc(sub)}' is not a git command. See 'git --help'.`;
  },
  python3: (args) => {
    if (!args.length) return `Python 3.12.3\nInteractive mode isn't available here. Try ${span('ansi-cyan', 'python3 Skills.py')}`;
    if (fileByName(args[0]) !== 'skills') return `python3: can't open file '${esc(args[0])}': [Errno 2] No such file or directory`;
    runSkillsScript();
    return null;
  },
  node: (args) => (args.length && fileByName(args[0]) === 'experience' ? 'Experience data loaded successfully' : `Try ${span('ansi-cyan', 'node Experience.js')}`),
  download: () => `Downloading ${esc(downloadResume())}…`,
  email: () => { openUrl(LINKS.email); return `Opening your mail client for ${esc(P.email)}…`; },
  github: () => { openUrl(LINKS.github); return `Opening ${alink(LINKS.github)}…`; },
  linkedin: () => { openUrl(LINKS.linkedin); return `Opening ${alink(LINKS.linkedin)}…`; },
  leetcode: () => { openUrl(LINKS.leetcode); return `Opening ${alink(LINKS.leetcode)}…`; },
  hackerrank: () => { openUrl(LINKS.hackerrank); return `Opening ${alink(LINKS.hackerrank)}…`; },
  theme: (args) => {
    if (!args.length) return THEMES.map((t) => `${t.id === state.theme ? span('ansi-green', '* ') : '  '}${t.id.padEnd(14)}${esc(t.name)}`).join('\n');
    const t = THEMES.find((x) => x.id === args[0].toLowerCase() || x.name.toLowerCase() === args.join(' ').toLowerCase());
    if (!t) return `theme: unknown theme '${esc(args.join(' '))}'. Run ${span('ansi-cyan', 'theme')} to list them.`;
    setTheme(t.id);
    return `Color theme set to ${esc(t.name)}`;
  },
  clear: () => { termOut.innerHTML = ''; return null; },
  history: () => term.history.map((h, i) => `${String(i + 1).padStart(5)}  ${esc(h)}`).join('\n'),
  date: () => esc(new Date().toString()),
  pwd: () => '/home/visitor/sreehari-resume',
  echo: (args, raw) => esc(raw.replace(/^\s*echo\s?/, '')),
  exit: () => { setPanel(false); return null; },
  cd: () => null,
  hostname: () => 'sreehari',
  ssh: (args) => { openFile('workstation'); return `Connecting to ${span('ansi-cyan', args[0] || 'homelab')}… ${span('ansi-green', 'connected')}. Opened ${span('b', 'Workstation.glb')} in the editor.`; },
  homelab: () => { openFile('workstation'); return `${span('ansi-green', '●')} rack-01: ${RACK.length}/${RACK.length} servers online. Opened ${span('b', 'Workstation.glb')}.`; },
  uptime: () => { const m = Math.floor(performance.now() / 60000); return ` ${new Date().toTimeString().slice(0, 8)} up ${m} min,  1 user,  load average: 0.42, 0.37, 0.31`; },
  uname: () => 'Linux',
  sudo: () => 'visitor is not in the sudoers file. This incident will be reported.',
  rm: (args) => `rm: cannot remove '${esc(args.filter((a) => !a.startsWith('-')).join(' ') || '')}': Read-only file system`,
  vim: (args) => { const id = fileByName(args[0]); if (id) openFile(id); return `You're already in VS Code${id ? `. Opened ${esc(FILES[id].name)} in the editor` : ''}.`; },
};
TERM.python = TERM.python3;
TERM.vi = TERM.vim;
TERM.nano = TERM.vim;
TERM.emacs = TERM.vim;
TERM.open = TERM.code;
TERM.mail = TERM.email;
TERM.cls = TERM.clear;

function execTerm(raw) {
  tprint(PROMPT + esc(raw));
  const line = raw.trim();
  if (!line) return;
  if (term.history[term.history.length - 1] !== line) term.history.push(line);
  term.hIdx = term.history.length;
  const [cmd, ...args] = line.split(/\s+/);
  const fn = TERM[cmd.toLowerCase()];
  if (!fn) { tprint(`bash: ${esc(cmd)}: command not found. Type ${span('ansi-cyan', 'help')} to see what's available.`); return; }
  const out = fn(args, line);
  if (out) tprint(out);
}
function autoType(text, cb) {
  term.busy = true;
  termInput.value = '';
  let i = 0;
  const iv = setInterval(() => {
    termInput.value += text[i++];
    if (i >= text.length) {
      clearInterval(iv);
      setTimeout(() => {
        termInput.value = '';
        term.busy = false;
        execTerm(text);
        if (cb) cb();
      }, 260);
    }
  }, 55);
}
termInput.addEventListener('keydown', (e) => {
  if (term.busy) { e.preventDefault(); return; }
  if (e.key === 'Enter') { e.preventDefault(); const v = termInput.value; termInput.value = ''; execTerm(v); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (term.hIdx > 0) { term.hIdx--; termInput.value = term.history[term.hIdx] || ''; } }
  else if (e.key === 'ArrowDown') { e.preventDefault(); if (term.hIdx < term.history.length) { term.hIdx++; termInput.value = term.history[term.hIdx] || ''; } }
  else if (e.key === 'Tab') {
    e.preventDefault();
    const v = termInput.value;
    const parts = v.split(/\s+/);
    const last = parts[parts.length - 1];
    const pool = parts.length === 1 ? Object.keys(TERM) : [...ROOT_FILES.map((id) => FILES[id].name), '.vscode/settings.json'];
    const hits = pool.filter((p) => p.toLowerCase().startsWith(last.toLowerCase()));
    if (hits.length === 1) { parts[parts.length - 1] = hits[0]; termInput.value = parts.join(' ') + (parts.length === 1 ? ' ' : ''); }
    else if (hits.length > 1) { tprint(PROMPT + esc(v)); tprint(hits.map(esc).join('  ')); }
  } else if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); termOut.innerHTML = ''; }
  else if (e.ctrlKey && e.key.toLowerCase() === 'c' && !window.getSelection().toString()) { e.preventDefault(); tprint(PROMPT + esc(termInput.value) + '^C'); termInput.value = ''; }
});
$('#terminal').addEventListener('mouseup', () => {
  if (!window.getSelection().toString()) termInput.focus({ preventScroll: true });
});

/* ───────────────────────────── Commands & keybindings ───────────────────────────── */
const CMD = {};
function def(id, label, run, kb = '', extra = {}) { CMD[id] = { id, label, run, kb, ...extra }; }
const hasDoc = () => !!doc;
def('commands', 'Show All Commands', () => openQuick('>'), 'Ctrl+Shift+P');
def('quickOpen', 'Go to File...', () => openQuick(''), 'Ctrl+P');
def('gotoLine', 'Go to Line/Column...', () => openQuick(':'), 'Ctrl+G', { enabled: hasDoc });
def('gotoSymbol', 'Go to Symbol in Editor...', () => openQuick('@'), 'Ctrl+Shift+O', { enabled: hasDoc });
def('download', 'Resume: Download Resume', downloadResume, 'Ctrl+S');
def('theme', 'Preferences: Color Theme', pickTheme, 'Ctrl+K Ctrl+T');
def('openSettings', 'Preferences: Open Workspace Settings (JSON)', () => openFile('settings'), 'Ctrl+,');
def('shortcuts', 'Preferences: Open Keyboard Shortcuts', () => openQuick('>'), 'Ctrl+K Ctrl+S');
def('toggleSidebar', 'View: Toggle Primary Side Bar Visibility', () => setSidebar(state.sidebarHidden), 'Ctrl+B', { checked: () => !state.sidebarHidden });
def('togglePanel', 'View: Toggle Panel Visibility', () => (state.panelHidden ? showPanel(state.panel) : setPanel(false)), 'Ctrl+J', { checked: () => !state.panelHidden });
def('toggleTerminal', 'View: Toggle Terminal', toggleTerminal, 'Ctrl+`');
def('toggleWrap', 'View: Toggle Word Wrap', toggleWrap, 'Alt+Z', { checked: () => state.wrap });
def('toggleMinimap', 'View: Toggle Minimap', toggleMinimap, '', { checked: () => state.minimap });
def('view.explorer', 'View: Show Explorer', () => showView('explorer'), 'Ctrl+Shift+E');
def('view.search', 'View: Show Search', () => showView('search'), 'Ctrl+Shift+F');
def('view.scm', 'View: Show Source Control', () => showView('scm'), 'Ctrl+Shift+G');
def('view.run', 'View: Show Run and Debug', () => showView('run'), 'Ctrl+Shift+D');
def('view.extensions', 'View: Show Extensions', () => showView('extensions'), 'Ctrl+Shift+X');
def('view.scmRefresh', 'Source Control: Refresh', renderSCM, '', { palette: false });
def('panel.problems', 'View: Focus Problems', () => showPanel('problems'), 'Ctrl+Shift+M');
def('panel.output', 'View: Focus Output', () => showPanel('output'), 'Ctrl+Shift+U');
def('panel.debug', 'View: Focus Debug Console', () => showPanel('debug'), 'Ctrl+Shift+Y');
def('panel.terminal', 'Terminal: Focus Terminal', () => showPanel('terminal'));
def('newTerminal', 'Terminal: Create New Terminal', () => { termOut.innerHTML = ''; banner(); showPanel('terminal'); }, 'Ctrl+Shift+`');
def('clearTerminal', 'Terminal: Clear', () => { termOut.innerHTML = ''; showPanel('terminal'); });
def('find', 'Find', openFind, 'Ctrl+F', { enabled: hasDoc });
def('findInFiles', 'Search: Find in Files', () => showView('search'), 'Ctrl+Shift+F', { bind: false });
def('closeEditor', 'View: Close Editor', () => state.active && closeTab(state.active), '', { enabled: () => !!state.active });
def('closeAll', 'View: Close All Editors', closeAll, '', { enabled: () => state.tabs.length > 0 });
def('markdown.preview', 'Markdown: Open Preview', () => {
  const id = state.active && baseId(state.active);
  if (id && FILES[id].lang === 'markdown') openFile(isPreview(state.active) ? id : 'preview:' + id);
  else openFile('preview:readme');
}, 'Ctrl+Shift+V');
def('run', 'Debug: Start Debugging', () => runResume(), 'F5');
def('runNoDebug', 'Debug: Run Without Debugging', () => runResume(), 'Ctrl+F5');
def('copy', 'Copy', () => { const t = selectionText(); if (t) copyText(t); }, 'Ctrl+C', { bind: false, palette: false });
def('selectAll', 'Select All', () => {
  if (!doc) return;
  editorEl.focus({ preventScroll: true });
  const r = document.createRange();
  r.selectNodeContents(linesEl);
  const s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);
}, 'Ctrl+A', { bind: false, palette: false });
def('copyLine', 'Copy Line', () => doc && copyText(doc.lines[caret.line - 1]), '', { palette: false, enabled: hasDoc });
def('foldAll', 'Fold All', () => foldAll(true), 'Ctrl+K Ctrl+0', { enabled: hasDoc });
def('unfoldAll', 'Unfold All', () => foldAll(false), 'Ctrl+K Ctrl+J', { enabled: hasDoc });
def('back', 'Go Back', () => navigate(-1), 'Alt+Left', { enabled: () => state.back.length > 0 });
def('forward', 'Go Forward', () => navigate(1), 'Alt+Right', { enabled: () => state.fwd.length > 0 });
def('email', 'Resume: Send Email to Sreehari', () => openUrl(LINKS.email));
def('github', 'Resume: Open GitHub Profile', () => openUrl(LINKS.github));
def('linkedin', 'Resume: Open LinkedIn Profile', () => openUrl(LINKS.linkedin));
def('leetcode', 'Resume: Open LeetCode Profile', () => openUrl(LINKS.leetcode));
def('hackerrank', 'Resume: Open HackerRank Profile', () => openUrl(LINKS.hackerrank));
def('copyEmail', 'Resume: Copy Email Address', () => { copyText(P.email); notify('Email address copied to clipboard.'); });
def('openReadme', 'Help: Welcome', () => openFile('readme'));
def('workstation', 'Homelab: Open 3D Workstation', () => openFile('workstation'));
def('refreshExplorer', 'File: Refresh Explorer', () => { renderTree(); renderOpenEditors(); }, '', { palette: false });
def('collapseFolders', 'File: Collapse Folders in Explorer', () => { state.expanded['.vscode'] = false; renderTree(); }, '', { palette: false });
def('about', 'Help: About', () => notify(`<b>${esc(P.name)} · Resume</b><br>Version 3.0.0, built to look and work like Visual Studio Code.<br>Plain HTML, CSS and JavaScript, hosted on GitHub Pages.`, { timeout: 9000 }));

const KB = {};
Object.values(CMD).forEach((c) => { if (c.kb && c.bind !== false) KB[c.kb] = c.id; });
KB.F1 = 'commands';
KB['Ctrl+Shift+P'] = 'commands';

function runCmd(id) {
  const c = CMD[id];
  if (!c) return;
  if (c.enabled && !c.enabled()) return;
  if (c.palette !== false) {
    state.recentCmds = [id, ...state.recentCmds.filter((x) => x !== id)].slice(0, 5);
    store.set('recentCmds', state.recentCmds);
  }
  c.run();
}

function comboOf(e) {
  let k;
  if (/^Key[A-Z]$/.test(e.code)) k = e.code.slice(3);
  else if (/^Digit\d$/.test(e.code)) k = e.code.slice(5);
  else if (e.code === 'Backquote') k = '`';
  else if (e.code === 'Comma') k = ',';
  else if (e.key.startsWith('Arrow')) k = e.key.slice(5);
  else if (e.key.length === 1) k = e.key.toUpperCase();
  else k = e.key;
  const mod = isMac ? e.metaKey : e.ctrlKey;
  return (mod ? 'Ctrl+' : '') + (e.shiftKey ? 'Shift+' : '') + (e.altKey ? 'Alt+' : '') + k;
}

document.addEventListener('keydown', (e) => {
  if (e.isComposing || ['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;
  if (menuState) {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); focusMenu(e.key === 'ArrowDown' ? 1 : -1); return; }
    if (e.key === 'Enter') { const f = menuEl.querySelector('.menu-item.focused'); if (f) { e.preventDefault(); f.click(); return; } }
  }
  const combo = comboOf(e);
  if (chord) {
    e.preventDefault();
    const full = `${chord} ${combo}`;
    chord = null;
    const id = KB[full];
    if (id) { statusMsg(''); runCmd(id); } else statusMsg(`The key combination (${kbText(full)}) is not a command.`, 2500);
    return;
  }
  const inField = e.target.matches && e.target.matches('input, textarea');
  if (combo === 'Ctrl+K' && !(inField && e.target === termInput)) {
    e.preventDefault();
    chord = 'Ctrl+K';
    statusMsg(`(${kbText('Ctrl+K')}) was pressed. Waiting for second key of chord...`);
    return;
  }
  if (/^Alt\+[1-9]$/.test(combo) && !inField) {
    const id = state.tabs[+combo.slice(-1) - 1];
    if (id) { e.preventDefault(); openFile(id); }
    return;
  }
  const id = KB[combo];
  if (!id) return;
  if (inField && !/^(Ctrl\+|F\d)/.test(combo)) return;
  if (id === 'find' && !doc) return;
  if ((id === 'back' || id === 'forward') && inField) return;
  e.preventDefault();
  runCmd(id);
});

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-cmd]');
  if (!el || el.closest('.menu')) return;
  e.preventDefault();
  runCmd(el.dataset.cmd);
});
$('#commandCenter').addEventListener('click', () => openQuick(''));
$('#navBack').addEventListener('click', () => navigate(-1));
$('#navFwd').addEventListener('click', () => navigate(1));
$('#sbSync').addEventListener('click', (e) => {
  const i = e.currentTarget.querySelector('i');
  i.classList.add('codicon-modifier-spin');
  setTimeout(() => { i.classList.remove('codicon-modifier-spin'); statusMsg('Already up to date with origin/main.', 2500); }, 900);
});
$('#forwardPort').addEventListener('click', () => notify('No servers are running here. The whole resume is a static page on GitHub Pages.'));
$$('[data-wc]').forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.wc === 'max') {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
    return;
  }
  notify('Thanks for visiting! Before you go, would you like a copy of the resume?', {
    actions: [{ label: 'Download Resume', primary: true, run: downloadResume }, { label: 'Send Email', run: () => runCmd('email') }],
  });
}));
document.addEventListener('fullscreenchange', () => {
  $('[data-wc="max"] i').className = `codicon codicon-chrome-${document.fullscreenElement ? 'restore' : 'maximize'}`;
});
$$('[data-kb]').forEach((el) => { el.innerHTML = kbChips(el.dataset.kb); });
window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (FILES[id]) openFile(id); });

function runResume() {
  if (term.busy) return;
  showPanel('terminal');
  autoType('python3 Skills.py');
}

/* ───────────────────────────── 3D workstation ───────────────────────────── */
const RACK = [
  { id: 'about', host: 'srv-01', title: 'Profile & professional summary', color: '#4fd2ff' },
  { id: 'experience', host: 'srv-02', title: `${S.experience.length} roles · C++, Python, C#`, color: '#ffd23f' },
  { id: 'skills', host: 'srv-03', title: `${skillCategories().reduce((n, c) => n + c.items.length, 0)} skills in ${skillCategories().length} groups`, color: '#7cff6b' },
  { id: 'education', host: 'srv-04', title: `${S.education.length} degrees · CGPA ${S.education[0].cgpa}`, color: '#ff8a3d' },
  { id: 'contact', host: 'srv-05', title: 'Email, GitHub, LinkedIn, LeetCode', color: '#ff3ea5' },
  { id: 'readme', host: 'srv-06', title: 'Workspace guide & shortcuts', color: '#9b7bff' },
].map((u) => ({ ...u, file: FILES[u.id].name }));
let sceneMounted = false;
function screenLines() {
  return getDoc('experience').toks.map((line) => line.map((tk) => ({ t: tk.t, color: tk.c === 'ws' ? '' : tokColor(tk.c) })));
}
function showScene() {
  const host = $('#scene3d');
  if (!window.Workstation) {
    host.innerHTML = '<div class="ws-error"><i class="codicon codicon-warning"></i><div><b>workstation.js did not load.</b></div></div>';
    return;
  }
  if (sceneMounted) { window.Workstation.show(); return; }
  sceneMounted = true;
  window.Workstation.mount(host, {
    units: RACK,
    screen: screenLines,
    log,
    onOpen: (id) => { if (FILES[id]) openFile(id); },
  }).then(() => {
    if (!isScene(state.active)) window.Workstation.hide();
    log('Workstation.glb: scene ready');
  }).catch((e) => {
    sceneMounted = false;
    log(`Workstation.glb: ${e.message}`, 'error');
  });
}
function hideScene() { if (sceneMounted && window.Workstation) window.Workstation.hide(); }

/* ───────────────────────────── Boot ───────────────────────────── */
function init() {
  if (isMobile()) {
    state.sidebarHidden = true;
    state.panelHidden = true;
  } else {
    state.sidebarHidden = store.get('sidebarHidden', false);
    state.panelHidden = store.get('panelHidden', false);
  }
  setTheme(state.theme, false);
  const fromHash = location.hash.slice(1);
  state.tabs = ['workstation', 'about', 'experience', 'skills'];
  if (FILES[fromHash] && !state.tabs.includes(fromHash)) state.tabs.push(fromHash);
  applyLayout();
  renderSCM();
  renderExtensions();
  log(`Activating workspace '${WORKSPACE}'`);
  log(`Loaded ${ALL_FILES.length} files`);
  const first = FILES[fromHash] ? fromHash : 'workstation';
  state.active = null;
  openFile(first, { focus: false });
  state.back = [];
  updateStatus();
  banner();
  if (!state.panelHidden) {
    setTimeout(() => { if (!term.history.length && !term.busy) autoType('neofetch'); }, 900);
  }
  setTimeout(() => {
    notify(`Would you like to download <b>${esc(P.name)}</b>'s resume?`, {
      actions: [{ label: 'Download', primary: true, run: downloadResume }, { label: 'Not Now' }],
    });
  }, 2600);
  editorEl.focus({ preventScroll: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { tokColors = {}; scheduleRelayout(); });
}

init();

window.VSCodeResume = { openFile, runCmd, resumeData, version: '3.0.0' };
})();
