export interface Automation {
  id: string;
  title: string;
  description: string;
  categories: string[];
  tools: string[];
  icon: string;
}

const WORKFLOWS_URL =
  "https://raw.githubusercontent.com/jam6123/sabrina-workflows/refs/heads/main/workflows.json";

function extractEmoji(title: string): string {
  const emojiRegex = /^[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Component}]+/u;
  const match = title.match(emojiRegex);
  return match ? match[0] : "🔧";
}

function cleanTitle(title: string): string {
  return title.replace(/^[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Component}\s]+/u, '').trim();
}

function generateId(title: string, index: number): string {
  const slug = cleanTitle(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug || 'workflow'}-${index}`;
}

export async function fetchWorkflows(): Promise<Automation[]> {
  const response = await fetch(WORKFLOWS_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch workflows: ${response.statusText}`);
  }

  const data = await response.json();

  return data
    .filter((item: any) => item && item.title)
    .map((item: any, index: number) => ({
      id: generateId(item.title, index),
      title: cleanTitle(item.title),
      icon: extractEmoji(item.title),
      description: item.description || "",
      tools: item.tools_used || [],
      categories: item.categories || [],
    }));
}

export function extractAllCategories(workflows: Automation[]): Map<string, number> {
  const categoryCount = new Map<string, number>();

  workflows.forEach(workflow => {
    workflow.categories.forEach(category => {
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });
  });

  return new Map([...categoryCount.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}
