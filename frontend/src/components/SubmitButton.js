import { useState } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id })),
        edges: edges.map((e) => ({ source: e.source, target: e.target })),
      };

      const response = await fetch("https://vector-shift-nftz.vercel.app/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setResult(data);

      const dagText = data.is_dag
        ? "✅ Yes (valid DAG)"
        : "❌ No (contains cycle)";
      alert(
        `Pipeline Analysis\n\n` +
          `Nodes:    ${data.num_nodes}\n` +
          `Edges:    ${data.num_edges}\n` +
          `Is DAG:   ${dagText}`,
      );
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        background: "#0f172a",
        borderTop: "1px solid #1e293b",
        gap: "12px",
      }}
    >
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: loading ? "#334155" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "7px",
          padding: "8px 28px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.15s",
          letterSpacing: "0.03em",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.background = "#1d4ed8";
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.background = "#2563eb";
        }}
      >
        {loading ? "Analyzing..." : "Submit "}
      </button>

      {result && !loading && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            color: "#94a3b8",
            fontSize: "11px",
          }}
        >
          <span style={{ color: "#60a5fa" }}>
            Nodes: <strong>{result.num_nodes}</strong>
          </span>
          <span style={{ color: "#34d399" }}>
            Edges: <strong>{result.num_edges}</strong>
          </span>
          <span style={{ color: result.is_dag ? "#34d399" : "#f87171" }}>
            DAG: <strong>{result.is_dag ? "Yes" : "No"}</strong>
          </span>
        </div>
      )}
      {error && (
        <span style={{ color: "#f87171", fontSize: "11px" }}>{error}</span>
      )}
    </div>
  );
};
