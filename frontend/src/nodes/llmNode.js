import { BaseNode, NodeLabel } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      category="ai"
      icon="✦"
      inputHandles={[
        { id: "system", label: "System Prompt" },
        { id: "prompt", label: "User Prompt" },
      ]}
      outputHandles={[{ id: "response", label: "Response" }]}
    >
      <NodeLabel>Large Language Model</NodeLabel>
      <NodeLabel>Connects system + prompt → generates response</NodeLabel>
    </BaseNode>
  );
};
