import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode, NodeField } from "./BaseNode";

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = new Set();
  let match;
  const re = new RegExp(VARIABLE_REGEX.source, "g");
  while ((match = re.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [currText]);

  const getHandleTop = (index, total) => {
    if (total === 1) return 50;
    return ((index + 1) / (total + 1)) * 100;
  };

  const minWidth = Math.max(220, Math.min(400, 220 + currText.length * 0.5));

  return (
    <div style={{ position: "relative" }}>
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-var-${varName}`}
          style={{
            top: `${getHandleTop(i, variables.length)}%`,
            background: "#fbbf24",
            border: "2px solid #f59e0b",
            width: 10,
            height: 10,
          }}
          title={varName}
        />
      ))}

      {variables.map((varName, i) => (
        <div
          key={varName}
          style={{
            position: "absolute",
            left: "-75px",
            top: `calc(${getHandleTop(i, variables.length)}% - 8px)`,
            background: "#1c1917",
            border: "1px solid #f59e0b",
            borderRadius: "4px",
            padding: "1px 5px",
            fontSize: "9px",
            color: "#fbbf24",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {varName}
        </div>
      ))}

      <BaseNode
        id={id}
        title="Text"
        category="utility"
        icon="T"
        outputHandles={[{ id: "output", label: "Output" }]}
        minWidth={minWidth}
      >
        <NodeField label="Content">
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            placeholder="Enter text... use {{variable}} to add inputs"
            rows={2}
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
              overflow: "hidden",
              minHeight: "40px",
            }}
          />
        </NodeField>
        {variables.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              marginTop: "2px",
            }}
          >
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  background: "#3d2e0f",
                  border: "1px solid #f59e0b",
                  borderRadius: "4px",
                  color: "#fbbf24",
                  fontSize: "10px",
                  padding: "1px 6px",
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </BaseNode>
    </div>
  );
};
