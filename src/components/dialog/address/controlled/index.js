import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, TextField } from "@mui/material";
const ListUC = ({
    data,
    value,
    onClick }) => {
    return (
        <List
            sx={{
                pt: 0,
                height: "340px",
                overflow: "scroll",
                "::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            {data.map((e, i) => (
                <ListItem disableGutters key={i}>
                    <ListItemButton
                        onClick={() => onClick(e.id)}
                        key={e.id}
                        sx={{
                            backgroundColor: e.id === value ? "rgb(0,0,0,.1)" : "",
                        }}
                    >
                        <ListItemText primary={e.name_th} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}
const SearchUC = ({ name, search, setSearch }) => {
    return (
        <Box
            sx={{
                width: "100%",
                "& .MuiFormControl-root": {
                    width: "100%",
                },
                mt: 1,
                pl: 2,
                pr: 2
            }}
        >
            <TextField
                id={"search-" + name}
                variant="outlined"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </Box>
    )
}
const DefaultUC = {
    ListUC,
    SearchUC
}
export default DefaultUC