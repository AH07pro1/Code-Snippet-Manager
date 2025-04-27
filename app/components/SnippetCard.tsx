import { Flex, Text, Button, Card } from "@radix-ui/themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
        <Flex justify="between" align="center">
          <Text weight="bold" size="5">
            {title}
          </Text>

          {/* Replace language text with icon */}
          <img
            src={icon}
            alt={language + " icon"}
            width={24}
            height={24}
            style={{ borderRadius: 4 }}
          />
        </Flex>

        <div
          style={{
            flex: "1", // take remaining space nicely
            minHeight: "200px",
            maxHeight: "200px",
            overflow: "hidden",
            backgroundColor: "#282a36", // Dracula background
            borderRadius: "8px",
          }}
        >
          <SyntaxHighlighter
            language={language.toLowerCase()}
            style={dracula}
            customStyle={{
              height: "100%", // Stretch to container height
              width: "100%",
              fontSize: "14px",
              padding: "12px",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              background: "transparent", // So div background shows
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
