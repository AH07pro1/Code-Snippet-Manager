import { Flex, Text, Button, Card } from "@radix-ui/themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function SnippetCard() {
	return (
		<Card size="3" variant="classic" style={{ width: "100%", maxWidth: 500 }}>
			<Flex direction="column" gap="3">
				<Flex justify="between" align="center">
					<Text weight="bold" size="5">
						Sample Snippet Title
					</Text>
					<Text color="gray" size="2">
						JavaScript
					</Text>
				</Flex>

				<SyntaxHighlighter
					language="javascript"
					style={dracula}
					customStyle={{
						borderRadius: "8px",
						fontSize: "14px",
						padding: "12px",
						overflowX: "auto",
					}}
				>
					{`const greet = () => {
  console.log("Hello world!");
};`}
				</SyntaxHighlighter>

				<Button variant="solid" size="2" color="blue">
					View Full Snippet
				</Button>
			</Flex>
		</Card>
	);
}
