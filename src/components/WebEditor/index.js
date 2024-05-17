import { styled } from "@mui/material/styles";
import EmailEditor from "react-email-editor";
import React, { Component } from "react";
import { Box } from "@mui/material";
import "./styles.css";
const BootsEmailEditor = styled(EmailEditor)(({ theme }) => ({
  "& body": {
    backgroundColor: "yellow",
  },
}));
class ReactWebEditorUC extends Component {
  render() {
    return (
      <BootsEmailEditor
        //   ref={editor => this.editor = editor}
        //   onLoad={this.onLoad}
        onDesignLoad={(data) => {
          console.log("onDesignLoad", data);
        }}
        onReady={() => {
          // console.log("onReady")
        }}
        options={{
          displayMode: "web",
          locale: "th-TH",
          customCSS: ["body {background-color: yellow;}"],
          customJS: [
            `
                console.log('I am custom JS!');
              `,
          ],
        }}
      />
    );
  }
}

const ReactWebEditor = () => {
  return (
    <Box style={{ border: "1px solid" }}>
      <ReactWebEditorUC />
    </Box>
  );
};
export default ReactWebEditor;
