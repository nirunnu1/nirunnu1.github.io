import App from 'components';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const TableSetting = ({ table, IsFilters, setIsFilters, IsSorting, setIsSorting }) => {
    return (
        <Box sx={{
            "& .MuiPaper-root": {
                boxShadow: "unset"
            }
        }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Table Setting
                </AccordionSummary>
                <AccordionDetails>
                    <App.Label text={"setting"} />
                    <Box className="px-1 border-b border-black"
                        sx={{ display: "flex" }}>
                        <Box className="px-1 border-b border-black">
                            <Box component={"label"}
                                sx={{ display: "flex" }}>
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: IsFilters,
                                        onChange: () => setIsFilters(!IsFilters),
                                    }}
                                />
                                <App.Label text={"Filters"} />
                            </Box>
                        </Box>
                        <Box className="px-1 border-b border-black">
                            <Box component={"label"}
                                sx={{ display: "flex" }}>
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: IsSorting,
                                        onChange: () => setIsSorting(!IsSorting),
                                    }}
                                />
                                <App.Label text={"Sorting"} />
                            </Box>
                        </Box>
                    </Box>
                    <App.Label text={"column-ordering"} />
                    <Box
                        sx={{ display: "flex" }}
                    >
                        {/* <Box className="px-1 border-b border-black">
                            <Box component={"label"}
                                sx={{ display: "flex" }}>
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: table.getIsAllColumnsVisible(),
                                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                                    }}
                                />
                                Toggle All
                            </Box>
                        </Box> */}
                        {table.getAllLeafColumns().map(column => {

                            return column.columnDef.id !== "Action" ? (
                                <Box key={column.id} className="px-1">
                                    <Box component={"label"}
                                        sx={{ display: "flex" }}>
                                        <input
                                            {...{
                                                type: 'checkbox',
                                                checked: column.getIsVisible(),
                                                onChange: column.getToggleVisibilityHandler(),
                                            }}
                                        />
                                        <App.Label text={column.columnDef.headerLabel} />
                                    </Box>
                                </Box>) : null

                        })}
                    </Box>
                </AccordionDetails>
            </Accordion>

        </Box>
    )
}

export default TableSetting