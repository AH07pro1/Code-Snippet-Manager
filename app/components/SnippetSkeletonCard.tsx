import { Flex, Card } from "@radix-ui/themes";

export default function SnippetSkeletonCard() {
  return (
    <Card
  size="3"
  variant="classic"
  style={{
    width: "100%",   // keep width 100% to fill the grid cell
    height: 350,
    // Remove maxWidth or set maxWidth: 'none' or just remove it
  }}
>

      <Flex direction="column" gap="3" style={{ height: "100%" }}>
        {/* Title placeholder */}
        <div
          className="skeleton-shimmer"
          style={{ width: "40%", height: 24, borderRadius: 6 }}
        />

        {/* Code area placeholder */}
        <div
          className="skeleton-shimmer"
          style={{
            flex: 1,
            minHeight: 200,
            maxHeight: 200,
            borderRadius: 8,
          }}
        />

        {/* Bottom buttons placeholder */}
        <Flex gap="3" justify="end">
          <div
            className="skeleton-shimmer"
            style={{ width: 32, height: 32, borderRadius: 6 }}
          />
          <div
            className="skeleton-shimmer"
            style={{ width: 32, height: 32, borderRadius: 6 }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
