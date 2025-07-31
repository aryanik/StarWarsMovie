import Card from "./Card";

interface Entity {
  name: string;
}

interface EntitySectionProps {
  title: string;
  items: Entity[];
}

export default function EntitySection({ title, items }: EntitySectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Card title={`${title} (${items.length})`}>
      <div className="max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="grid grid-cols-2 gap-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 shadow-sm"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
