"use client";

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
import { useRouter } from "next/navigation";
import { supportedLanguages } from "../data/supportedLanguages";

function CreateSnippetPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    language: "JavaScript",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to create snippet:", data.error);
        alert("Error: " + (data.error?.[0]?.message || "Unknown error"));
        return;
      }

      console.log("Snippet created:", data);
      alert("Snippet saved successfully!");

      router.push("/dashboard");

      setForm({
        title: "",
        description: "",
        content: "",
        language: "JavaScript",
      });
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
            onValueChange={(value) => setForm({ ...form, language: value })}
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

          <Button type="submit" color="blue" size="3">
            Save Snippet
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default CreateSnippetPage;
