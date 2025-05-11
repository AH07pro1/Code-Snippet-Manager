import { Flex, Text, Button, Card } from "@radix-ui/themes";
import { EyeOpenIcon, CopyIcon } from "@radix-ui/react-icons"; // View and Copy icons
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

type SnippetCardProps = {
  title: string;
  language: string;
  content: string;
  icon: string;
  onViewClick?: () => void;
};

export default function SnippetCard({
  title,
  language,
  content,
  icon,
  onViewClick,
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card
      size="3"
      variant="classic"
      style={{
        width: "100%",
        maxWidth: 450,
        height: "350px",
      }}
    >
      <Flex direction="column" gap="3" style={{ height: "100%" }}>
        {/* Title + Icon */}
        <Flex justify="between" align="center">
          <Text weight="bold" size="5">
            {title}
          </Text>

          <img
            src={icon}
            alt={language + " icon"}
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />
        </Flex>

        {/* Code area */}
        <div
          style={{
            flex: "1",
            minHeight: "200px",
            maxHeight: "200px",
            overflow: "hidden",
            backgroundColor: "#282a36",
            borderRadius: "8px",
          }}
        >
          <SyntaxHighlighter
            language={language.toLowerCase()}
            style={dracula}
            customStyle={{
              height: "100%",
              width: "100%",
              fontSize: "14px",
              padding: "12px",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              background: "transparent",
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>

        {/* Bottom buttons */}
        <Flex gap="3" justify="end">
          <Button
            variant="soft"
            size="2"
            color={copied ? "green" : "gray"}
            onClick={handleCopy}
          >
            <CopyIcon />
          </Button>

          <Button
            variant="solid"
            size="2"
            color="blue"
            onClick={onViewClick}
          >
            <EyeOpenIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
