import { Handle, Position } from "reactflow";

const CATEGORY_STYLES = {
  input: {
    border: "#60a5fa",
    bg: "#1e3a5f",
    header: "#1d4ed8",
    dot: "#93c5fd",
  },
  output: {
    border: "#34d399",
    bg: "#1a3d2e",
    header: "#059669",
    dot: "#6ee7b7",
  },
  process: {
    border: "#a78bfa",
    bg: "#2d1f4f",
    header: "#7c3aed",
    dot: "#c4b5fd",
  },
  utility: {
    border: "#fbbf24",
    bg: "#3d2e0f",
    header: "#d97706",
    dot: "#fde68a",
  },
  ai: { border: "#f472b6", bg: "#3d1a2e", header: "#db2777", dot: "#f9a8d4" },
  data: { border: "#fb923c", bg: "#3d1f0f", header: "#ea580c", dot: "#fdba74" },
};

export const BaseNode = ({
  id,
  title,
  category = "process",
  children,
  inputHandles = [],
  outputHandles = [],
  minWidth = 220,
  minHeight,
  icon = "",
  style = {},
}) => {
  const colors = CATEGORY_STYLES[category] || CATEGORY_STYLES.process;

  const containerStyle = {
    minWidth,
    ...(minHeight ? { minHeight } : {}),
    border: `1.5px solid ${colors.border}`,
    borderRadius: "10px",
    background: colors.bg,
    boxShadow: `0 0 0 1px ${colors.border}22, 0 4px 20px #0006`,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    ...style,
  };

  const headerStyle = {
    background: colors.header,
    borderRadius: "8px 8px 0 0",
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const bodyStyle = {
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const getHandleTopPercent = (index, total) => {
    if (total === 1) return 50;
    return ((index + 1) / (total + 1)) * 100;
  };

  return (
    <div style={containerStyle}>
      {inputHandles.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{
            top: `${getHandleTopPercent(i, inputHandles.length)}%`,
            background: colors.dot,
            border: `2px solid ${colors.border}`,
            width: 10,
            height: 10,
          }}
          title={handle.label || handle.id}
        />
      ))}

      {outputHandles.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{
            top: `${getHandleTopPercent(i, outputHandles.length)}%`,
            background: colors.dot,
            border: `2px solid ${colors.border}`,
            width: 10,
            height: 10,
          }}
          title={handle.label || handle.id}
        />
      ))}

      <div style={headerStyle}>
        {icon && <span style={{ fontSize: "14px" }}>{icon}</span>}
        <span
          style={{
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>

      <div style={bodyStyle}>{children}</div>
    </div>
  );
};

export const NodeField = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
    <label
      style={{
        color: "#9ca3af",
        fontSize: "10px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

export const NodeInput = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      background: "#0f172a",
      border: "1px solid #334155",
      borderRadius: "5px",
      color: "#e2e8f0",
      fontSize: "12px",
      padding: "5px 8px",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
    }}
  />
);

export const NodeSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      background: "#0f172a",
      border: "1px solid #334155",
      borderRadius: "5px",
      color: "#e2e8f0",
      fontSize: "12px",
      padding: "5px 8px",
      outline: "none",
      width: "100%",
      cursor: "pointer",
    }}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const NodeTextArea = ({ value, onChange, placeholder, style = {} }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      background: "#0f172a",
      border: "1px solid #334155",
      borderRadius: "5px",
      color: "#e2e8f0",
      fontSize: "12px",
      padding: "5px 8px",
      outline: "none",
      width: "100%",
      resize: "none",
      fontFamily: "inherit",
      boxSizing: "border-box",
      ...style,
    }}
  />
);

export const NodeLabel = ({ children }) => (
  <span style={{ color: "#94a3b8", fontSize: "11px" }}>{children}</span>
);
