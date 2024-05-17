/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    // sortingFns,
    // FilterFn,
    // SortingFn,
    // ColumnDef,
    // FilterFns,
    // Column,
    // Table,
    // ColumnFiltersState,
} from '@tanstack/react-table'
import { styled } from "@mui/system";
import {
    Table as TableUI,
    Thead,
    Tbody,
    Th,
    TableContainer,
    useMediaQuery,
} from "@chakra-ui/react";
import App from 'components';
import {
    Tr, Td, LightTooltip,
    //  highlight,
    Pagination
}
    from "./Components/index";
import Card from "./Card";
import ListContext from "../Context";
import { useContext } from "react";
import { Box } from '@mui/material';

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import {
    rankItem,
} from '@tanstack/match-sorter-utils'

import Filter from "./Components/filter";
import TableSetting from "./Components/TableSetting";
// import BodyUC from "./Components/body";
const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}
const TableUC = ({ data = [], Delete,
    Export,
    isImpost,
    Impost,
    ImpostName,
    toolBar,
    onSearch,
    IsSearch,
    IsSelect = false,
    IsFooter,
    isHeight,
    IsDelete,
    IsAdd,
    IsSearchDate,
    StartDate,
    EndDate,
    ComponentSearch,
    EndPaginationComponent,
    isPagination,
    maxHeight,
    isIdentity = false,
    isBookBank = false,
    navigateName = "",
    customNavigate,
    customNavigateRow,
    isFilters = false }) => {
    const navigate = App.Dom.Navigate()
    const { List, columns,
        // MenuID,
        Breadcrumbs } = useContext(ListContext);

    const [IsMobile] = useMediaQuery("(max-width: 600px)");

    const [IsFilters, setIsFilters] = useState(false)
    const [IsSorting, setIsSorting] = useState(false)

    const [columnFilters, setColumnFilters] = useState(
        []
    )
    const [globalFilter, setGlobalFilter] = useState('')

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
            pagination: {
                pageIndex: List?.Searchvalue.page, //initial page index
                pageSize: List?.Searchvalue.pageSize
            }
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
    })
    const dev_mode = localStorage.getItem("dev-mode")
    useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'code') {
            if (table.getState().sorting[0]?.id !== 'code') {
                table.setSorting([{ id: 'code', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])

    return (
        <Box height={"auto"}>
            <Card
                id={Breadcrumbs?.menu_name || "tb-card"}
                name={Breadcrumbs?.menu_name || "tb-card"}
                title={Breadcrumbs?.subName?.name || "tb-card"}
                // selectedRowIds={selectedRowIds}
                Delete={Delete}
                Export={Export}
                isImpost={isImpost}
                Impost={Impost}
                ImpostName={ImpostName}
                toolBar={toolBar}
                IsDelete={IsDelete}
                IsAdd={IsAdd}
                IsSelect={IsSelect}
            // Permission={Permission}
            >
                {(dev_mode === "true" || dev_mode === true) &&
                    <TableSetting  {...{ table, IsFilters, setIsFilters, IsSorting, setIsSorting }} />
                }
                <Box
                    sx={{
                        width: "100%",
                        height: "calc(100% - 70px)",
                        maxHeight: maxHeight ? maxHeight : "",
                        overflowX: "auto",
                    }}
                >
                    <TableContainer sx={{
                        "::-webkit-scrollbar": {
                            height: "5px",
                            borderRadius: "5px"
                        },

                        /* Track */
                        "::-webkit-scrollbar-track": {
                            background: App.color.Secondary
                        },

                        /* Handle */
                        "::-webkit-scrollbar-thumb": {
                            background: App.color.main
                        },
                        ".highlight": {
                            backgroundColor: "yellow",
                            WebkitTransition: "background-color 1000ms linear",
                            MozTransition: "background-color 1000ms linear",
                            OTransition: "background-color 1000ms linear",
                            MsTransition: "background-color 1000ms linear",
                            transition: "background-color 1000ms linear",
                        },
                        ".highlight1": {
                            backgroundColor: "#FFF",
                            fontWeight: 500,
                            color: "#000",
                            WebkitTransition: "background-color 1000ms linear",
                            MozTransition: "background-color 1000ms linear",
                            OTransition: "background-color 1000ms linear",
                            MsTransition: "background-color 1000ms linear",
                            transition: "background-color 1000ms linear",
                        }

                    }}>
                        <TableUI
                            style={{
                                borderSpacing: "0",
                                width: "100%",
                                whiteSpace: "nowrap",
                                tableLayout: "fixed",
                                position: "relative"
                            }}
                        >
                            {!IsMobile && (<Thead>
                                {table.getHeaderGroups().map((headerGroup, i) => (
                                    <Fragment key={i}>
                                        <Tr key={headerGroup.id}
                                            style={{ backgroundColor: App.color.Secondary, height: 50 }}
                                        >
                                            {headerGroup.headers.map((column) => {
                                                // console.log("column", column)
                                                const maxWidth = column.column.columnDef.maxWidth
                                                    ? column.column.columnDef.maxWidth
                                                    : null;
                                                const minWidth = column.column.columnDef.minWidth
                                                    ? column.column.columnDef.minWidth
                                                    : null;
                                                const width = column.column.columnDef.width
                                                    ? column.column.columnDef.width
                                                    : null;
                                                const TH = styled(Th)({
                                                    paddingLeft: 10,
                                                    paddingRight: 10,

                                                    maxWidth:
                                                        column.id === "selection"
                                                            ? 50
                                                            : maxWidth || "",
                                                    width:
                                                        column.id === "selection"
                                                            ? 50
                                                            : width || "",
                                                    minWidth:
                                                        column.id === "selection"
                                                            ? 50
                                                            : minWidth || "",
                                                    "& div":

                                                        column.id === "selection"
                                                            ? {
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                "& input[type='checkbox']:checked": {
                                                                    accentColor: App.color.main,
                                                                },
                                                                "& input ": {
                                                                    width: 18,
                                                                    height: 18,
                                                                },
                                                                // maxWidth: 50,
                                                            }
                                                            : {
                                                                width: "100%",
                                                                "& span": {
                                                                    width: "100%",
                                                                }
                                                            },
                                                });
                                                return (
                                                    <TH key={column.id} colSpan={column.colSpan}>
                                                        {column.isPlaceholder ? null : (
                                                            <Box
                                                                {...{
                                                                    className: IsSorting ? column.column.getCanSort() : ""
                                                                        ? 'cursor-pointer select-none'
                                                                        : '',
                                                                    onClick: IsSorting ? column.column.getToggleSortingHandler() : null,
                                                                }}
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    overflowWrap: "break-word",
                                                                    WebkitLineClamp: 1,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",


                                                                }}
                                                            >
                                                                {/* {flexRender(
                                                                    column.column.columnDef.header,
                                                                    column.getContext()
                                                                )} */}
                                                                {/* <App.Label text={column.column.columnDef.headerLabel} /> */}
                                                                <LightTooltip
                                                                    title={
                                                                        column.column.columnDef.headerLabel}
                                                                    followCursor
                                                                >

                                                                    <Box sx={{
                                                                        // justifyContent: "space-between",
                                                                        overflowWrap: "break-word",
                                                                        WebkitLineClamp: 1,
                                                                        WebkitBoxOrient: "vertical",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        fontSize: "16px",
                                                                        fontWeight: 500,
                                                                        textAlign: column.column.columnDef?.HeaderProps?.textAlign || "left"
                                                                    }}>
                                                                        {column.column.columnDef.headerLabel}
                                                                    </Box>
                                                                </LightTooltip>
                                                                {IsSorting ?
                                                                    {
                                                                        asc: <VerticalAlignTopIcon />,
                                                                        desc: <VerticalAlignBottomIcon />,
                                                                    }[column.column.getIsSorted()] ?? null : null}
                                                            </Box>
                                                        )}
                                                    </TH>
                                                )
                                            })}
                                        </Tr>
                                        {IsFilters &&
                                            <Tr key={headerGroup.id}
                                                style={{ backgroundColor: App.color.Secondary, height: 45 }}
                                            >
                                                {headerGroup.headers.map((column) => {
                                                    // console.log("column", column)
                                                    const maxWidth = column.column.columnDef.maxWidth
                                                        ? column.column.columnDef.maxWidth
                                                        : null;
                                                    const minWidth = column.column.columnDef.minWidth
                                                        ? column.column.columnDef.minWidth
                                                        : null;
                                                    const width = column.column.columnDef.width
                                                        ? column.column.columnDef.width
                                                        : null;
                                                    const TH = styled(Th)({
                                                        paddingLeft: 10,
                                                        paddingRight: 10,

                                                        maxWidth:
                                                            column.id === "selection"
                                                                ? 50
                                                                : maxWidth || "",
                                                        width:
                                                            column.id === "selection"
                                                                ? 50
                                                                : width || "",
                                                        minWidth:
                                                            column.id === "selection"
                                                                ? 50
                                                                : minWidth || "",
                                                        "& div":
                                                            column.id === "selection"
                                                                ? {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    "& input[type='checkbox']:checked": {
                                                                        accentColor: App.color.main,
                                                                    },
                                                                    "& input ": {
                                                                        width: 18,
                                                                        height: 18,
                                                                    },
                                                                    // maxWidth: 50,
                                                                }
                                                                : {
                                                                    // maxWidth: maxWidth || 250
                                                                },
                                                    });
                                                    return (
                                                        <TH key={column.id} colSpan={column.colSpan}>
                                                            {column.isPlaceholder ? null : (
                                                                <>
                                                                    {column.column.columnDef.isFilter && column.column.getCanFilter() ? (
                                                                        <Filter column={column.column}
                                                                            table={table}
                                                                            placeholder={column?.column?.columnDef?.headerLabel || ""} />
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </TH>
                                                    )
                                                })}
                                            </Tr>}
                                    </Fragment>


                                ))}
                            </Thead>)}
                            {/* <BodyUC /> */}
                            <Tbody>
                                {table.getRowModel().rows.map(row => {
                                    const TR = styled(Tr)({
                                        ...(IsMobile ? { display: "grid" } : { minHeight: 50 }),
                                        ...{
                                            "&:hover": {
                                                background: App.color.Secondary,
                                            },
                                        },
                                    });
                                    return (
                                        <TR key={row.id}
                                        // {...row.getRowProps()}
                                        >
                                            {row.getVisibleCells().map(cell => {

                                                const maxWidth = cell.column.columnDef.maxWidth
                                                    ? cell.column.columnDef.maxWidth
                                                    : null;
                                                const minWidth = cell.column.columnDef.minWidth
                                                    .toString()
                                                    .includes("px")
                                                    ? cell.column.columnDef.minWidth
                                                    : "";
                                                const width = cell.column.columnDef.width
                                                    .toString()
                                                    ? cell.column.columnDef.width
                                                    : "";
                                                const TD = styled(IsMobile ? Td : "td")({
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                    borderBottom: "1px solid #ddd",
                                                    maxWidth:
                                                        IsMobile ? "100%" : cell.column.id === "selection"
                                                            ? 50
                                                            : maxWidth || "",

                                                    width:
                                                        IsMobile ? "100%" : cell.column.id === "selection"
                                                            ? 50
                                                            : width || "",
                                                    minWidth:
                                                        IsMobile ? "100%" : cell.column.id === "selection"
                                                            ? 50
                                                            : minWidth || "",
                                                    "& div":
                                                        cell.column.id === "selection"
                                                            ? {
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                "& input[type='checkbox']:checked": {
                                                                    accentColor: "#1E1E1E",
                                                                },
                                                                "& input ": {
                                                                    width: 18,
                                                                    height: 18,
                                                                },
                                                                maxWidth: 50,
                                                            }
                                                            : {
                                                                // maxWidth: maxWidth || 250,
                                                                overflowWrap: "break-word",
                                                                WebkitLineClamp: 1,

                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            },
                                                });


                                                let text = IsMobile
                                                    ? cell.column.columnDef.CellMobile !== undefined
                                                        ? cell.column.columnDef.CellMobile
                                                        : cell.column.columnDef.cell
                                                    : cell.column.columnDef.cell;
                                                let CellElement = cell.column?.CellElement || false;
                                                // console.log(text())
                                                return (
                                                    <LightTooltip
                                                        title={
                                                            cell.column.columnDef.Tooltip !== false
                                                                ? cell.column.columnDef.id === "selection"
                                                                    ? ""
                                                                    : CellElement
                                                                        ? cell.value
                                                                        : cell.getValue()
                                                                : ""
                                                        }
                                                        followCursor
                                                        key={cell.id}
                                                    >

                                                        <TD
                                                            style={{
                                                                pending: "14px 0px",
                                                            }}
                                                            onClick={() => {
                                                                console.log(cell.row, customNavigateRow)
                                                                if (cell.column.columnDef.id !== "Action") {
                                                                    if (!App.service.isNullOrEmpty(customNavigateRow)) {
                                                                        customNavigateRow({ ...cell.row.original, index: cell.row.index })
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    width: "100%",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: "1",
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    margin:
                                                                        cell.column.id === "Action" ||
                                                                            cell.column.id === "select" ||
                                                                            cell.column.id === "list" ||
                                                                            cell.column.id === "discount_control"
                                                                            ? "auto"
                                                                            : "none",
                                                                }}
                                                                name={cell.column.id}
                                                                onClick={() => {
                                                                    console.log("customNavigate", customNavigate)
                                                                    if (customNavigate) {
                                                                        customNavigate(row.original.id);
                                                                    } else if (
                                                                        cell.column.id !== "Action" &&
                                                                        cell.column.id !== "select" &&
                                                                        navigateName !== ""
                                                                    ) {
                                                                        navigate(
                                                                            "/" +
                                                                            navigateName +
                                                                            "/info/" +
                                                                            row.original.id
                                                                        );
                                                                    }
                                                                }}
                                                                className={cell.column.id === "Action" ? "" : "tb-cell"}
                                                            >
                                                                {flexRender(
                                                                    text,
                                                                    cell.getContext()
                                                                )}
                                                            </Box>

                                                        </TD>
                                                    </LightTooltip>
                                                )
                                            })}
                                        </TR>
                                    )
                                })}
                            </Tbody>
                        </TableUI>
                    </TableContainer>
                    <Pagination {...{ isPagination, List, table }} />

                </Box>
                {/* <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */}
            </Card>
        </Box>
    )
}

export default TableUC