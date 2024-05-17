import React, { Component } from "react";

import { createReactEditorJS } from "react-editor-js";
import { Box } from "@mui/material";
import { EDITOR_JS_TOOLS } from "./constants";

const ReactEditorJS = createReactEditorJS();
class ReactEditorUC extends Component {
  render() {
    return <ReactEditorJS tools={EDITOR_JS_TOOLS} />;
  }
}
const ReactEditor = () => {
  return (
    <Box style={{ border: "1px solid" }}>
      <ReactEditorUC />
    </Box>
  );
};
export default ReactEditor;
// ReactDOM.render(<ReactEditor />, document.getElementById("app"));
