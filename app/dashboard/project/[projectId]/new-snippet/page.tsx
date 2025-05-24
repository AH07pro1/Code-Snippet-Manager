'use client';
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
  Select,
} from "@radix-ui/themes";
import { useRouter, useParams } from "next/navigation";
import { supportedLanguages } from "../../../../data/supportedLanguages";

function CreateSnippetPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    language: "JavaScript",
    icon: "/icons/javascript.svg",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          projectId,
          tags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to create snippet:", data.error);
        alert("Error: " + (data.error?.[0]?.message || "Unknown error"));
        return;
      }

      alert("Snippet saved successfully!");
      router.push("/dashboard");

      setForm({
        title: "",
        description: "",
        content: "",
        language: "JavaScript",
        icon: "/icons/javascript.svg",
      });
      setTags([]);
      setTagInput("");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred while saving the snippet.");
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" mt="6">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Text size="5" weight="bold">
            Create Snippet
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
            placeholder="Your code..."
            rows={8}
            style={{ fontFamily: "monospace" }}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <Select.Root
            value={form.language}
            onValueChange={(value) => {
              const selectedLang = supportedLanguages.find(
                (lang) => lang.name === value
              );
              setForm({
                ...form,
                language: value,
                icon: selectedLang ? selectedLang.icon : "",
              });
            }}
          >
            <Select.Trigger />
            <Select.Content>
              {supportedLanguages.map((lang) => (
                <Select.Item key={lang.name} value={lang.name}>
                  <Flex align="center" gap="2">
                    <img src={lang.icon} alt={lang.name} width={20} height={20} />
                    {lang.name}
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          {/* Tags input */}
          <Box>
            <TextField.Root
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />

            <Flex gap="2" mt="3" wrap="wrap">
              {tags.map((tag) => (
                <Box
                  key={tag}
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "default",
                  }}
                >
                  <Text size="2" style={{ color: "#222" }}>{tag}</Text>
                  <Button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    size="1"
                    style={{ padding: "0 4px" }}
                  >
                    ✕
                  </Button>
                </Box>
              ))}
            </Flex>
          </Box>

          <Button type="submit" color="blue" size="3">
            Save Snippet
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default CreateSnippetPage;
