import { DraggableNode } from "./DraggableNode";

const NODES = [
  { type: "customInput", label: "Input" },
  { type: "customOutput", label: "Output" },
  { type: "llm", label: "LLM" },
  { type: "text", label: "Text" },
  { type: "api", label: "API" },
  { type: "condition", label: "Condition" },
  { type: "note", label: "Note" },
];

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
        }}
      >
        Nodes
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {NODES.map((n) => (
          <DraggableNode key={n.type} type={n.type} label={n.label} />
        ))}
      </div>
    </div>
  );
};
