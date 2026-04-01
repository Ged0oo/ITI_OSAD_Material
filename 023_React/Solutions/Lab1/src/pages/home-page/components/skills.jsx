const technicalSkills = [
  {
    category: "Computer Science Fundamentals",
    items:
      "OOP, Data Structures, Algorithms, Design Patterns, SOLID Principles, Problem Solving",
  },
  {
    category: "Programming Languages",
    items: "C/C++, Python, Java, SQL, Bash, HTML, CSS, JavaScript, TypeScript",
  },
  {
    category: "Software Engineering",
    items:
      "Software Architecture, SDLC, Agile/Scrum, Technical Documentation, Git, GitHub, GitLab",
  },
  {
    category: "Systems & Linux",
    items:
      "Linux Programming, Bash Scripting, CMake, IPC, Signal Handling, Daemon Services, Embedded Linux (Buildroot, Yocto)",
  },
  {
    category: "Frontend Development",
    items:
      "React, Angular, Reactive Forms, RxJS, Bootstrap 5, Responsive Design, JWT Auth Flows, REST API Integration, Cross-Browser Debugging",
  },
  {
    category: "Backend Development",
    items:
      "Node.js, Express.js, Spring Boot, Django, MongoDB, Mongoose, REST APIs, JWT Authentication, Middleware Design, Joi Validation, Flask",
  },
  {
    category: "Testing & QA",
    items:
      "ISTQB Foundation, Manual & Automated Testing, Selenium, TestNG, JUnit, Postman, API Testing, Allure Reports, Jira",
  },
  {
    category: "DevOps & Cloud",
    items:
      "AWS Cloud Practitioner, Docker, Docker Compose, Jenkins, GitHub Actions, GitLab CI/CD, Terraform, Kubernetes, Ansible, ArgoCD, Grafana, Prometheus",
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="hover-lift rounded-xl bg-white p-6 shadow ring-1 ring-slate-200 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-slate-900 flex items-center justify-center mb-6">
        Technical Skills
      </h3>

      <div className="space-y-4">
        {technicalSkills.map((group) => (
          <div
            key={group.category}
            className="rounded-lg border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              {group.category}
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {group.items}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
