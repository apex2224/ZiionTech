import React, { useState } from "react";

const ProjectTimeline = () => {
  const [activeProject, setActiveProject] = useState("ALL");

  const projects = [
    {
      name: "Freelance",
      period: "Jan/23 - Jan/25",
      color: "rgba(239, 68, 68, 1)",
    },
    {
      name: "NovemControls",
      period: "Mar/24 - Present",
      color: "rgba(59, 130, 246, 1)",
    },
    {
      name: "ZiionTech",
      period: "Aug/25 - Now",
      color: "rgba(34, 197, 94, 1)",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => setActiveProject("ALL")}
        style={{
          padding: "0.5rem 1rem",
          background:
            activeProject === "ALL"
              ? "rgba(255, 255, 255, 0.1)"
              : "transparent",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          color: "#e4e4e7",
          fontFamily: "'Figtree', sans-serif",
          fontSize: "0.875rem",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        ALL ⚡
      </button>
      {projects.map((project) => (
        <button
          key={project.name}
          onClick={() => setActiveProject(project.name)}
          style={{
            padding: "0.5rem 1rem",
            background:
              activeProject === project.name
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            border: `1px solid ${project.color}`,
            borderRadius: "8px",
            color: "#e4e4e7",
            fontFamily: "'Figtree', sans-serif",
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.25rem",
          }}
        >
          <span style={{ fontWeight: "600" }}>{project.name}</span>
          <span style={{ fontSize: "0.75rem", color: "#a1a1aa" }}>
            {project.period}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ProjectTimeline;
