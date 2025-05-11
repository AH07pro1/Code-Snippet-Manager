"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const availableIcons = [
  "🚀", "🎨", "💻", "📱", "📚", "🌍", "🎯", "🔒", "💡", "⚡",
];

function CreateProjectPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    tags: "", // Will split into array later
    icon: "🚀", // Default icon for project
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title: form.title,
      description: form.description,
      content: form.content ? form.content : null, // Content is optional
      tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [], // Convert string to array
      icon: form.icon, // Use the selected icon here
    };

    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to create project:", data.error);
        alert("Error: " + (data.error?.[0]?.message || "Unknown error"));
        return;
      }

      console.log("Project created:", data);
      alert("Project created successfully!");

      router.push("/dashboard");

      // Reset the form, including the icon
      setForm({
        title: "",
        description: "",
        content: "",
        tags: "",
        icon: "🚀", // Reset to default icon after submission
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred while creating the project.");
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" mt="6">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Text size="5" weight="bold">
            Create Project
          </Text>

          <TextField.Root
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField.Root
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <TextArea
            placeholder="Optional content (details, notes...)"
            rows={6}
            style={{ fontFamily: "monospace" }}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <TextField.Root
            placeholder="Tags (comma separated, e.g. web, mobile, ai)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />

          {/* Icon Selection */}
          <Flex direction="column" gap="2">
            <Text size="4" weight="bold">Choose Icon:</Text>
            <div
              style={{
                display: "flex",
                gap: "8px", // Reduced gap for better spacing
                flexWrap: "wrap",
                justifyContent: "space-between", // Align first and last icons to edges
                maxWidth: "100%", // Prevent overflow
                marginTop: "5px",
              }}
            >
              {availableIcons.map((icon, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "24px",
                    padding: "8px",
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    display: "flex", // Add flex display to center the icon
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    border: form.icon === icon ? "2px solid #0070f3" : "1px solid #ccc",
                    borderRadius: "6px",
                    backgroundColor: form.icon === icon ? "#e7f3ff" : "transparent",
                    transition: "background-color 0.2s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => setForm({ ...form, icon })} // Update icon on click
                >
                  {icon}
                </span>
              ))}
            </div>
          </Flex>

          <Button type="submit" color="blue" size="3">
            Save Project
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default CreateProjectPage;
