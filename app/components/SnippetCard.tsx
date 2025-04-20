import { Flex, Text, Button, Card } from "@radix-ui/themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

type SnippetCardProps = {
  title: string;
  language: string;
  content: string;
  onViewClick?: () => void;
};

export default function SnippetCard({
  title,
  language,
  content,
  onViewClick,
}: SnippetCardProps) {
  return (
    <Card size="3" variant="classic" style={{ width: "100%", maxWidth: 450, height: "350px" }}>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <Text weight="bold" size="5">
            {title}
          </Text>
          <Text color="gray" size="2">
            {language}
          </Text>
        </Flex>

        <div
          style={{
            height: "200px", // Fixed height for code section
            overflow: "hidden", // No scrolling, truncate the content
          }}
        >
          <SyntaxHighlighter
            language={language.toLowerCase()}
            style={dracula}
            customStyle={{
              borderRadius: "8px",
              fontSize: "14px",
              padding: "12px",
              whiteSpace: "nowrap", // Prevent wrapping of long lines
              overflow: "hidden",
              textOverflow: "ellipsis", // Truncate overflowed text
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>

        <Button variant="solid" size="2" color="blue" onClick={onViewClick}>
          View Full Snippet
        </Button>
      </Flex>
    </Card>
  );
}
