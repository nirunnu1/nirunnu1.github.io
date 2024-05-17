const { CardMedia } = require("@mui/material");
const { useState } = require("react");

const ImageUC = (props) => {
    const { src, alt, size } = props;
    const [URI, setURI] = useState(src);
    return (
        <CardMedia
            alt={alt}
            sx={{
                width: size || "60px", height: size || "60px",
                borderRadius: "4px",
            }}
            loading="lazy"
            component="img"
            src={URI}
            onError={() => setURI("/images/empty_picture.png")}
        />
    );
};
export default ImageUC