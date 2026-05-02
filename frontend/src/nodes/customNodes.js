import { useState } from "react";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
  NodeLabel,
  NodeTextArea,
} from "./BaseNode";

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "https://api.example.com");
  const [method, setMethod] = useState(data?.method || "GET");

  return (
    <BaseNode
      id={id}
      title="API Request"
      category="data"
      icon="⇄"
      inputHandles={[{ id: "body", label: "Request Body" }]}
      outputHandles={[
        { id: "response", label: "Response" },
        { id: "status", label: "Status" },
      ]}
    >
      <NodeField label="URL">
        <NodeInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </NodeField>
      <NodeField label="Method">
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "DELETE", label: "DELETE" },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "value > 0");

  return (
    <BaseNode
      id={id}
      title="Condition"
      category="process"
      icon="⑂"
      inputHandles={[{ id: "input", label: "Input" }]}
      outputHandles={[
        { id: "true", label: "True" },
        { id: "false", label: "False" },
      ]}
    >
      <NodeField label="Condition Expression">
        <NodeInput
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 0"
        />
      </NodeField>
      <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
        <span style={{ color: "#6ee7b7", fontSize: "10px" }}>✓ True →</span>
        <span style={{ color: "#fca5a5", fontSize: "10px" }}>✗ False →</span>
      </div>
    </BaseNode>
  );
};

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || "Add your notes here...");

  return (
    <BaseNode
      id={id}
      title="Note"
      category="utility"
      icon="✎"
      inputHandles={[]}
      outputHandles={[]}
      minWidth={200}
    >
      <NodeTextArea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add your notes here..."
        style={{ minHeight: "60px", resize: "vertical", color: "#fde68a" }}
      />
    </BaseNode>
  );
};
