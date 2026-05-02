const NODE_COLORS = {
  customInput: { bg: "#1d4ed8", border: "#60a5fa", icon: "→" },
  customOutput: { bg: "#059669", border: "#34d399", icon: "←" },
  llm: { bg: "#db2777", border: "#f472b6", icon: "✦" },
  text: { bg: "#d97706", border: "#fbbf24", icon: "T" },
  api: { bg: "#ea580c", border: "#fb923c", icon: "⇄" },
  condition: { bg: "#7c3aed", border: "#a78bfa", icon: "⑂" },
  note: { bg: "#b45309", border: "#fbbf24", icon: "✎" },
};

export const DraggableNode = ({ type, label }) => {
  const colors = NODE_COLORS[type] || {
    bg: "#334155",
    border: "#64748b",
    icon: "◆",
  };

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
      style={{
        cursor: "grab",
        minWidth: "80px",
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        borderRadius: "7px",
        background: colors.bg,
        border: `1.5px solid ${colors.border}`,
        userSelect: "none",
        transition: "opacity 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.85";
        e.currentTarget.style.transform = "scale(1.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span style={{ fontSize: "13px" }}>{colors.icon}</span>
      <span style={{ color: "#fff", fontSize: "11px", fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
};
