"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

function ProjectGrid() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch(`/api/projects?userId=${session.user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProjects();
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {projects.map((project: any, index: number) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          tags={project.tags || []}
          icon={project.icon}
          snippetCount={project._count?.snippets || 0} // <-- Added this
          onViewClick={() => redirect(`/dashboard/project/${project.id}`)}
        />
      ))}
    </div>
  );
}

export default ProjectGrid;
