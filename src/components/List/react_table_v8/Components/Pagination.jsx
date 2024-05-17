import { Grid, Box } from "@mui/material"
import App from "components"
import Pagination from "@mui/material/Pagination";
const PaginationUC = ({ isPagination, List, pageCount, gotoPage,
    table }) => {
    return isPagination !== false ? (
        <Grid
            container
            p={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Grid item {... { xs: 12, sm: 6, md: 6, lg: 6 }}
                display={"flex"} alignItems={"center"}
            >
                <Box sx={{
                    maxWidth: "120px",
                    "& .MuiInputBase-root": {
                        borderRadius: "10px !important"
                    },
                    "& .MuiInputBase-input.MuiSelect-select": {
                        borderRadius: "10px !important"
                    }
                }}>
                    <App.Select
                        name="PageSize"
                        onChange={(e) => {
                            const pageSize = Number(e.target.value)
                            let _page = Math.ceil((List?.DataList || []).length / pageSize)
                            _page = _page - 1 < List?.Searchvalue.page ? _page - 1 : List?.Searchvalue.page

                            List?.SetSearchvalue({
                                ...List?.Searchvalue,
                                pageSize: Number(e.target.value),
                                page: _page
                            });
                        }}
                        value={table?.getState().pagination.pageSize || 10}
                        data={[
                            { value: 5, text: "5" },
                            { value: 10, text: "10" },
                            { value: 20, text: "20" },
                            { value: 30, text: "30" },
                            { value: 40, text: "40" },
                            { value: 50, text: "50" },
                        ]}
                        isLabel={false}
                    />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                    pl={1}
                >
                    <App.Label
                        text={"Per page"}
                        size={App.text.size.md}
                        fontWeight={400}
                    />
                </Box>
            </Grid>
            <Grid item {... { xs: 12, sm: 6, md: 6, lg: 6 }}
                display={"flex"} alignItems={"center"}
            >
                <Pagination
                    count={table.getPageCount()}
                    page={table.getState().pagination.pageIndex + 1}
                    onChange={(e, v) => List?.SetSearchvalue({ ...List?.Searchvalue, page: v ? Number(v) - 1 : 0 })}
                    sx={{
                        "& .MuiTablePagination-selectLabel": {
                            display: "none",
                        },
                        "& .MuiTablePagination-displayedRows": {
                            display: "flex",
                            alignItems: "center",
                            margin: 0,
                        },
                        "& .MuiPaginationItem-page ": {
                            borderColor: "transparent !important",
                        },
                        "& .Mui-disabled": {
                            backgroundColor: "#F3F4F6 !important",
                        },
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        "& .Mui-selected": {
                            backgroundColor: App.color.main + "!important",
                            color: App.color.white,
                            borderColor: App.color.main + "!important",
                        },
                    }}
                    showFirstButton
                    showLastButton
                    variant="outlined"
                />
            </Grid>
        </Grid>
    ) : null

}

export default PaginationUC