import { Card, Flex, Text, Separator, Avatar } from "@radix-ui/themes";

export default function ProjectSkeletonCard() {
  return (
    <Card
      size="3"
      variant="classic"
      style={{
        width: "100%",
        maxWidth: 450,
        height: "320px",
        backgroundColor: "#e0e0e0",
        animation: "pulse 1.5s infinite",
      }}
      className="skeleton"
    >
      <Flex direction="column" justify="between" style={{ height: "100%" }} gap="4">
        <Flex align="center" gap="3">
          <Avatar size="3" style={{ backgroundColor: "#ccc" }} fallback=" " />
          <Flex direction="column" style={{ flex: 1 }}>
            <div style={{ height: 20, width: "50%", backgroundColor: "#ccc", borderRadius: 4 }} />
            <div style={{ height: 14, width: "30%", marginTop: 8, backgroundColor: "#ccc", borderRadius: 4 }} />
          </Flex>
        </Flex>

        <Separator size="4" />

        <div style={{ flex: 1, backgroundColor: "#ccc", borderRadius: 4, marginTop: 12 }}></div>

        <Flex gap="2" wrap="wrap" style={{ marginTop: 12 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ height: 20, width: 60, backgroundColor: "#ccc", borderRadius: 9999 }} />
          ))}
        </Flex>

        <div
          style={{
            marginTop: "auto",
            height: 36,
            width: "100%",
            backgroundColor: "#ccc",
            borderRadius: 6,
          }}
        />
      </Flex>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Card>
  );
}
