import { PipelineToolbar } from "./components/Toolbar";
import { PipelineUI } from "./components/PipelineUI";
import { SubmitButton } from "./components/SubmitButton";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#0a0f1e",
      }}
    >
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
