import { useState } from "react";
import { BaseNode, NodeField, NodeInput, NodeSelect } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Input"
      category="input"
      icon="→"
      outputHandles={[{ id: "value", label: "Value" }]}
    >
      <NodeField label="Name">
        <NodeInput
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="input_name"
        />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          options={[
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
