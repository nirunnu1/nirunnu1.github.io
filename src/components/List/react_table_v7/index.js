/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import App from "components";

import React, { useState } from "react";
import { styled } from "@mui/system";
import {
    useTable,
    usePagination,
    useRowSelect,
    getCoreRowModel,
    getPaginationRowModel,
} from "react-table";
import Card from "./Card";

import { Box } from "@mui/material";
import service from "undefined-service-web";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Table,
    Thead,
    Tbody,
    Th,
    TableContainer,
    useMediaQuery,
} from "@chakra-ui/react";
import { Tr, Td, LightTooltip, highlight, Pagination } from "./Components/index";
import ListContext from "../Context";
import { useContext } from "react";

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return <input type="checkbox" ref={resolvedRef} {...rest} />;
    }
);
const TableUC = ({
    data = [],
    Delete,
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
}) => {
    const navigate = App.Dom.Navigate();
    const { List, columns, MenuID, Breadcrumbs } = useContext(ListContext);
    const [IsMobile] = useMediaQuery("(max-width: 600px)");
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        // canPreviousPage,
        // canNextPage,
        // pageOptions,
        pageCount,
        gotoPage,
        // nextPage,
        // previousPage,
        setPageSize,
        // selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            // getCoreRowModel: getCoreRowModel(),
            // getPaginationRowModel: getPaginationRowModel(),
            initialState: {
                pageIndex: List?.Searchvalue?.page,
                pageSize: List?.Searchvalue?.pageSize,
            },
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            if (IsSelect !== false && !IsMobile) {
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: "selection",
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox
                                    {...getToggleAllPageRowsSelectedProps()}
                                />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);
            }
        }
    );
    // const Permission = useSelector((state) => state.permission);
    // const [PermissionMenu, setPermissionMenu] = useState(null);

    useEffect(() => {
        if (List?.Searchvalue?.pageSize !== pageSize) {
            setPageSize(Number(List?.Searchvalue?.pageSize));
            gotoPage(List?.Searchvalue?.page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [List?.Searchvalue?.pageSize]);

    useEffect(() => {
        if (pageCount - 1 < List?.Searchvalue?.page) {
            gotoPage(0);
            List?.SetSearchvalue({ ...List?.Searchvalue, page: 0 });
        }
    }, [pageCount]);


    useEffect(() => {
        if (!App.service.isNullOrEmpty(List?.Searchvalue?.text)) {
            setTimeout(() => {
                highlight(List?.Searchvalue?.text || "")
            }, 200);
        }

    }, [List])
    return (
        <Box height={"auto"}>
            <Card
                id={Breadcrumbs?.menu_name || "tb-card"}
                name={Breadcrumbs?.menu_name || "tb-card"}
                title={Breadcrumbs?.subName?.name || "tb-card"}
                selectedRowIds={selectedRowIds}
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

                        <Table
                            {...getTableProps()}
                            style={{
                                borderSpacing: "0",
                                width: "100%",
                                whiteSpace: "nowrap",
                                tableLayout: "fixed",
                            }}
                        >
                            {!IsMobile && (
                                <Thead>

                                    <Tr style={{ backgroundColor: App.color.Secondary, height: 50 }}>
                                        {headerGroups.map((headerGroup, Groupindex) => (
                                            headerGroup.headers.map((column, columnindex) => {
                                                const maxWidth = column.maxWidth.toString()
                                                    ? column.maxWidth
                                                    : null;
                                                const minWidth = column.minWidth.toString()
                                                    ? column.minWidth
                                                    : null;
                                                const width = column.width.toString()
                                                    ? column.width
                                                    : null;
                                                const TH = styled(Th)({
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    // borderTop: "1px solid #D8D6D6",
                                                    // borderBottom: "1px solid #D8D6D6",
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
                                                    <TH key={columnindex} {...column.getHeaderProps()}>
                                                        <App.Label
                                                            text={column.render("Header")}
                                                            size={App.text.size.md}
                                                        />
                                                    </TH>
                                                );
                                            })
                                        ))}
                                    </Tr>

                                </Thead>
                            )}

                            <Tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    const TR = styled(Tr)({
                                        ...(IsMobile ? { display: "grid" } : { minHeight: 50 }),
                                        ...{
                                            "&:hover": {
                                                background: App.color.Secondary,
                                            },
                                        },
                                    });
                                    return (
                                        <TR
                                            key={i}
                                            {...row.getRowProps()}
                                            display={{ base: "grid", sm: "table-row" }}
                                            gridTemplateColumns={{ base: "1fr 1fr", sm: "auto" }}
                                            isExpanded={false}
                                        // onClick={() => {
                                        //   if (!App.service.isNullOrEmpty(customNavigateRow)) {
                                        //     customNavigateRow({ ...row.original, index: row.index })
                                        //   }
                                        // }}
                                        >
                                            {row.cells.map((cell, cellindex) => {
                                                if (cell.column.id === "selection" && IsMobile) {
                                                    return;
                                                }
                                                if (cell.column.CellMobile === false && IsMobile) {
                                                    return;
                                                }
                                                const maxWidth = cell.column.maxWidth
                                                    .toString()
                                                    .includes("px")
                                                    ? cell.column.maxWidth
                                                    : null;
                                                const minWidth = cell.column.minWidth
                                                    .toString()
                                                    .includes("px")
                                                    ? cell.column.minWidth
                                                    : "";
                                                const width = cell.column.width
                                                    .toString()
                                                    ? cell.column.width
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
                                                                maxWidth: maxWidth || 250,
                                                                overflowWrap: "break-word",
                                                                WebkitLineClamp: 1,

                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            },
                                                });

                                                let text = IsMobile
                                                    ? cell.column.CellMobile !== undefined
                                                        ? cell.render("CellMobile")
                                                        : cell.render("Cell")
                                                    : cell.render("Cell");
                                                let CellElement = cell.column?.CellElement || false;
                                                let nameID = cell.column?.nameID || "";
                                                if (nameID) {
                                                    let PermissionCall;
                                                    if (!service.isNullOrEmpty(PermissionCall)) {
                                                        if (!PermissionCall.IsVisible) {
                                                            if (cell.column.Tooltip !== false) {
                                                                let length = (
                                                                    text.props?.value || ""
                                                                ).toString().length;
                                                                let hidden = "*";
                                                                if (length > 3) {
                                                                    hidden = "";
                                                                    for (i = 0; i < length - 2; i++) {
                                                                        hidden = hidden + "*";
                                                                    }
                                                                    text =
                                                                        text.props.value[0] +
                                                                        hidden +
                                                                        text.props.value[length - 1];
                                                                } else {
                                                                    text = "***";
                                                                }
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                }
                                                return (
                                                    <LightTooltip
                                                        title={
                                                            cell?.column?.Tooltip !== false
                                                                ? cell.column?.id === "selection"
                                                                    ? ""
                                                                    : CellElement
                                                                        ? cell.value
                                                                        : text
                                                                : ""
                                                        }
                                                        followCursor
                                                        key={cellindex}
                                                    >
                                                        <TD
                                                            {...cell.getCellProps()}
                                                            style={{
                                                                pending: "14px 0px",
                                                            }}

                                                            onClick={() => {
                                                                if (cell.column.id !== "Action") {
                                                                    if (!App.service.isNullOrEmpty(customNavigateRow)) {
                                                                        customNavigateRow({ ...row.original, index: row.index })
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
                                                                        // console.log("id +++++++++++++++++ ", navigateName);
                                                                    }
                                                                }}
                                                                className={cell.column.id === "Action" ? "" : "tb-cell"}
                                                            >
                                                                {text}
                                                            </Box>
                                                        </TD>
                                                    </LightTooltip>
                                                );
                                            })}
                                        </TR>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {data.length === 0 && (
                        <Box
                            sx={{
                                color: App.color.grayFont,
                                width: "100%",
                                pt: 13,
                                pb: 5,
                                textAlign: "center",
                            }}
                        >
                            ไม่พบข้อมูลการค้นหา
                        </Box>
                    )}
                </Box>
                <Pagination {...{ isPagination, List, pageCount, gotoPage }} />
            </Card >
        </Box >
    );
}

export default TableUC