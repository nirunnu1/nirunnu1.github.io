import React, {
  //  useEffect,
  useState
} from "react";
import App from "components";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import FormControl from "@mui/material/FormControl";
import Label from "../Base/Label";
import InputLabel from "@mui/material/InputLabel";
import component from "../Controlled/component";
const BoxReactQuill = styled(Box)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .ql-toolbar": {
    borderRadius: "5px 5px 0 0",
    "& .ql-fill,": {
      fill: "#161E44",
    },
    "& .ql-stroke": {
      stroke: "#161E44",
    },
  },
  "& .ql-container": {
    borderRadius: " 0 0 5px 5px",
    minHeight: "120px",
  },
}));
Quill.register("modules/imageResize", ImageResize);
const Editor = (props) => {
  const { name, helperText, isTitle, title,
    onChange, value, form } = props;
  const [Value, setValue] = useState(value);
  const handleChange = (html) => {
    setValue(html)
    onChange({ name: name, value: html });
  }

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel shrink htmlFor={name} style={{ transform: "none" }}>
        <Label
          text={isTitle !== false ? title : ""}
          size={16}
          fontWeight="bold"
          color={App.service.isNullOrEmpty(helperText) ? "" : "red"}
        />
      </InputLabel>
      <BoxReactQuill sx={{
        "& .ql-toolbar": {
          backgroundColor: App.color.disabled,
          border: "unset !important"
        },
        "& .ql-container": {
          border: "unset !important"
        },
        boxShadow: App.color.Shadow01,
        borderRadius: "10px"
      }}>
        <ReactQuill
          id={name}
          onChange={handleChange}
          value={Value}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={"#root"}
          placeholder={name}
        />


      </BoxReactQuill>
      <Box pl={1}>
        <component.HelperText
          helperText={helperText}
          name={name}
          form={form} />
      </Box>
    </FormControl >
  );
};

Editor.modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ header: "1" }, { header: "2" },],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["image"],
    // ["clean"],
    [
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
    ],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color"
];

export default Editor;
