import PropTypes from "prop-types";
import { Box } from "@mui/material";
const Label = (props) => {
    const {
        text,
        id,
        name,
        color,
        size,
        fontWeight,
        numberOfLine,
        onClick,
    } = props;
    const getToggleprops = {
        // WebkitWserSelect: "none",
        // MsUserSelect: "none",
        // userSelect: "none",
        fontSize: size || 14,
        color: color || "#000000",
        fontWeight: fontWeight || "300",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: numberOfLine,
    }
    return (
        <Box
            {...props}
            component={"span"}
            id={id}
            name={name}
            sx={{
                ...getToggleprops,
            }}
            onClick={onClick}
            data-testid={`label-${name || id}`}
        >
            {text}
        </Box >
    );
};
Label.propTypes = {
    text: PropTypes.any,
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.any,
    fontWeight: PropTypes.oneOf([
        PropTypes.oneOf(['bold']),
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900
    ]),
    mt: PropTypes.number,
    mb: PropTypes.number,
    numberOfLine: PropTypes.number,
    textAlign: PropTypes.any,
};

export default Label