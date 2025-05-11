import { Flex, Text, Button, Card, Separator, Avatar } from "@radix-ui/themes";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  icon: string; // can be a URL or emoji for simplicity
  onViewClick?: () => void;
  snippetCount?: number;
};

export default function ProjectCard({
  title,
  description,
  tags,
  icon,
  onViewClick,
  snippetCount,
}: ProjectCardProps) {
  return (
    <Card
      size="3"
      variant="classic"
      style={{
        width: "100%",
        maxWidth: 450,
        height: "320px",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      className="hover:shadow-lg"
    >
      <Flex direction="column" justify="between" style={{ height: "100%" }} gap="4">
        {/* Top Section */}
        <Flex align="center" gap="3">
          {/* Icon as Avatar */}
          <Avatar size="3" src={icon} fallback="🚀" radius="full" />

          <Flex direction="column" style={{ flex: 1 }}>
            <Text weight="bold" size="5">
              {title}
            </Text>
            {snippetCount !== undefined && (
              <Text size="2" color="gray">
                {snippetCount} Snippet{snippetCount !== 1 ? "s" : ""}
              </Text>
            )}
          </Flex>
        </Flex>

        <Separator size="4" />

        {/* Description */}
        <Text
          size="3"
          color="gray"
          style={{ flex: "1", overflow: "auto", lineHeight: "1.5" }}
        >
          {description}
        </Text>

        {/* Tags */}
        <Flex gap="2" wrap="wrap">
          {tags.map((tag, index) => (
            <Text
              key={index}
              size="1"
              color="blue"
              style={{
                backgroundColor: "#e0f0ff",
                borderRadius: "9999px",
                padding: "4px 10px",
                fontWeight: 500,
                fontSize: "12px",
              }}
            >
              #{tag}
            </Text>
          ))}
        </Flex>

        {/* Button */}
        <Button
          variant="solid"
          size="3"
          color="blue"
          onClick={onViewClick}
          style={{ marginTop: "auto" }}
        >
          View Project
        </Button>
      </Flex>
    </Card>
  );
}
