import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import "./App.css"
import { setupMonaco } from "./monaco";

const highlighter = await setupMonaco();
const defaultValue = `import { styled } from "next-yak";

export const Button = styled.button\`
  font-size: 2rem;
  font-weight: bold;
  color: blue;
  &:hover {
    color: red;
  }
\`;`;

function App() {
  const inputEditor = useRef<HTMLDivElement>(null);
  const [outputTS, setOutputTS] = useState<string>(defaultValue);

  useEffect(() => {
    if (monaco.editor.getModels().length > 0) {
      return;
    }

    const model = monaco.editor.createModel(defaultValue, "typescript", monaco.Uri.parse("file:///input.tsx"));

    const editor = monaco.editor.create(inputEditor.current!, {
      value: defaultValue,
      language: "typescript",
      theme: "vitesse-dark",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      overviewRulerLanes: 0,
      scrollbar: {
        vertical: "hidden",
      },
      overviewRulerBorder: false,
      fontSize: 13,
      fontFamily: "Inter",
      lineHeight: 1.5,
      model,
    });

    editor.onDidChangeModelContent(() => {
      setOutputTS(editor.getModel()?.getValue() ?? "");
    })
  }, [])
  return (
    <>
      <PanelGroup autoSaveId="example" direction="horizontal" style={{ width: "90vw", height: "90vh" }}>
        <Panel defaultSize={50} style={{
          border: "1px solid #27272a",
        }}>
          <div ref={inputEditor} style={{ width: "100%", height: '100%' }}>
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={50} style={{
              border: "1px solid #27272a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}>
              <p>Output TypeScript</p>
              <div dangerouslySetInnerHTML={{
                __html: highlighter.codeToHtml(outputTS, {
                  lang: "tsx", theme: "vitesse-dark"
                })
              }} style={{ width: "100%", height: "100%", overflow: "scroll" }}></div>
            </Panel>
            <PanelResizeHandle />
            <Panel style={{
              border: "1px solid #27272a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }} >
              <p>Output CSS</p>
              <div dangerouslySetInnerHTML={{
                __html: highlighter.codeToHtml(".hello {\n\tcolor: red;\n}", {
                  lang: "css", theme: "vitesse-dark"
                })
              }} style={{ width: "100%", height: "100%", overflow: 'scroll' }}></div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </>
  )
}

export default App


