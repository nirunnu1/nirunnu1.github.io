/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState } from "react";
import {
  flexRender
} from '@tanstack/react-table'

import { useDispatch } from "react-redux";

import ActionUC from "./Action";
import HeadUC from "./Head";

import Enum from "../Enum";
import buttonSearch from "./ButtonSearch";
import buttonReload from "./ButtonReload";
import { setLoading } from "../../store/reducers/actions";
import { Box, CardMedia } from "@mui/material";

import service from "undefined-service-web";

import { useEffect } from "react";
import moment from "moment";
import App from "components";

import searchUC from "./SearchUC";
import actionbar from "./Actionbar";
import columnsListNo from "./ColumnsListNo";

import ListContext from "./Context";
import Notifications from "./Notifications";

import emptyPicture from "assets/images/empty/empty_picture.png";
// import TableUC7 from "./react_table_v7";
import TableUC8 from "./react_table_v8";
const ListUC = (props) => {
  return <TableUC8 {...props} />
  // const dev_mode = localStorage.getItem("dev-mode")
  // return dev_mode === "true" || dev_mode === true ? <TableUC8 {...props} /> : <TableUC7 {...props} />;
};

export const Search = searchUC;
export const Actionbar = actionbar;
export const Head = HeadUC;
export const List = ListUC;
export const Action = ActionUC;
export const ButtonSearch = buttonSearch;
export const ButtonReload = buttonReload;
export const ColumnsListNo = columnsListNo;

const Columns = ({ Header, Cell, HeaderProps,
  accessor, id = null,
  CellElement = true,
  Tooltip = true,
  CellMobile = null,
  maxWidth = "",
  minWidth = "",
  width = "",
  isFilter = true,
  isNumber = false
}) => {
  const header = () => (
    typeof Header === "string" ?
      <App.Label
        text={Header}
        textAlign={HeaderProps?.textAlign || "left"}
        size={HeaderProps?.size || App.text.size.md}
        fontWeight={HeaderProps?.fontWeight || "500"}
      /> : Header
  )
  const accessorKey = accessor
  const size = width //starting column size
  const minSize = minWidth //enforced during column resizing
  const maxSize = maxWidth //enforced during column resizing
  let item = {
    Header: header,
    headerLabel: Header,
    header,
    accessor: accessorKey,
    accessorKey,
    id: id || accessorKey,
    nameID: "List_DataTable_" + accessor,
    CellElement: CellElement,
    Tooltip: Tooltip,
    CellMobile: !App.service.isNullOrEmpty(CellMobile) ? CellMobile : (props) => {
      const { cell } = props;
      return (
        <Box sx={{
          display: "flex !important",
          position: "relative"
        }}>
          <Box sx={{ width: 150, fontWeight: "bold", }}>
            {Header}
          </Box>
          <Box>{flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}</Box>
        </Box>
      );
    },
    maxWidth: maxSize,
    minWidth: minSize,
    width: size,
    size,
    minSize,
    maxSize,
    isFilter,
    isNumber,
    HeaderProps
  }
  if (Cell) {
    item = { ...item, Cell, cell: Cell }
  }
  return item
}
export const Column = Columns

const ImageUC = ({ src, alt }) => {
  const [URI, setURI] = useState(src);

  return (
    <CardMedia
      alt={alt}
      sx={{ width: "60px", height: "60px", borderRadius: "4px" }}
      component="img"
      src={URI}
      height={"60px"}
      width={"60px"}
      onError={() => setURI(emptyPicture)}
    />
  );
}
export const Image = ImageUC

const Component = (props) => {
  const {
    Url,
    api_deleted,
    ID,
    onSearch,
    fild,
    // MenuID,
    creatData = (data) => {
      return {
        Data: data,
        DataList: data,
      };
    },
    dateName,
    searchfilter,
    isGetData = true
  } = props;
  const dispatch = useDispatch();

  const [alert, setAlert] = useState({ open: false });
  const [confirmDelete, setConfirmDelete] = useState({ open: false });


  const [Data, setData] = useState([]);
  const [DataList, setDataList] = useState([]);
  const [Loading, setload] = useState(false);
  const [Searchvalue, setSearchvalue] = useState({
    text: "",
    startDate: new Date("01-01-" + App.service.moment(new Date()).format("yyyy")),
    endDate: new Date("12-31-" + App.service.moment(new Date()).format("yyyy")),
    sort: 3,
    page: 0,
    pageSize: 10,
  });
  const List = ListUC;
  const _Enum = Enum;
  useEffect(() => {
    try {
      onSearch();
    } catch {
      if (fild !== undefined) {
        let _Data = [];
        if (searchfilter === undefined) {
          Data.map((e) => {
            if (!App.service.isNullOrEmpty(dateName)) {
              if (
                new Date(App.service.moment(e[dateName]).format("MM-DD-yyyy")) >=
                new Date(
                  App.service.moment(Searchvalue.startDate).format("MM-DD-yyyy")
                ) &&
                new Date(App.service.moment(e[dateName]).format("MM-DD-yyyy")) <=
                new Date(App.service.moment(Searchvalue.endDate).format("MM-DD-yyyy"))
              ) {
                _Data.push(e);
              }
            } else {
              _Data.push(e);
            }
          });
        } else {
          Data.map((e) => {
            if (
              (searchfilter?.type).toString().includes(e[searchfilter.name])
            ) {
              if (!App.service.isNullOrEmpty(dateName)) {
                if (
                  new Date(App.service.moment(e[dateName]).format("MM-DD-yyyy")) >=
                  new Date(
                    App.service.moment(Searchvalue.startDate).format("MM-DD-yyyy")
                  ) &&
                  new Date(App.service.moment(e[dateName]).format("MM-DD-yyyy")) <=
                  new Date(
                    App.service.moment(Searchvalue.endDate).format("MM-DD-yyyy")
                  )
                ) {
                  _Data.push(e);
                }
              } else {
                _Data.push(e);
              }
            }
          });
        }

        if (!service.isNullOrEmpty(Searchvalue?.text)) {
          let text = Searchvalue?.text.trim().toLowerCase();
          let item = [];
          _Data.filter((e) => {
            const check = Object.keys(fild).find((key) => {
              let _key = "";
              let item = "";
              if (typeof fild[key] === "object") {
                _key = fild[key].type;
                if (fild[key].type === "enum") {
                  item = _Enum[fild[key].EnumName].find(
                    (em) => em.value === e[key]
                  )?.text;
                } else {
                  if (service.isNullOrEmpty(fild[key]?.custom)) {
                    item = e[key];
                  } else {
                    item = fild[key].custom.replace("${value}", e[key]);
                  }
                }
              } else {
                _key = key;
                item = e[key];
              }
              if (fild[_key] === "number") {
                item = item.toString();
              } else if (fild[_key] === "date" || _key === "date") {
                item = moment(item).format("DD/MM/yyyy HH:mm");
              }
              return (item || "").toString().toLowerCase().includes(text);
            });
            if (!service.isNullOrEmpty(check)) {
              item.push(e);
            }
          });

          if (Searchvalue.sort === 0) {
            item = item.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
          } else if (Searchvalue.sort === 1) {
            item = item.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
          } else if (Searchvalue.sort === 2) {
            item = item.sort(
              (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
            );
          } else if (Searchvalue.sort === 3) {
            item = item.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );
          }
          setDataList([...item]);
        } else {
          if (Searchvalue.sort === 0) {
            setDataList([
              ..._Data.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              ),
            ]);
          } else if (Searchvalue.sort === 1) {
            setDataList([
              ..._Data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              ),
            ]);
          } else if (Searchvalue.sort === 2) {
            setDataList([
              ..._Data.sort(
                (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
              ),
            ]);
          } else if (Searchvalue.sort === 3) {
            setDataList([
              ..._Data.sort(
                (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
              ),
            ]);
          }
        }
      }
    }
  }, [Searchvalue]);
  const GetDataList = async (isLoading = true) => {
    let _DataList;
    try {
      dispatch(setLoading(isLoading));
      setTimeout(async () => {
        _DataList = await service.getHttp(
          Url + (service.isNullOrEmpty(ID) ? "" : ID),
          dispatch
        );
        setload(true);
        dispatch(setLoading(false));

        if (_DataList.status) {

          let item = _DataList?.data;
          if (Searchvalue.sort === 0) {
            item = item.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
          } else if (Searchvalue.sort === 1) {
            item = item.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
          } else if (Searchvalue.sort === 2) {
            item = item.sort(
              (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
            );
          } else if (Searchvalue.sort === 3) {
            item = item.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );
          }
          const _data = creatData(item || [])
          setData(_data.Data);
          if (!App.service.isNullOrEmpty(dateName)) {
            let _item = [];
            item.map((e) => {
              if (
                new Date(e[dateName]) >= Searchvalue.startDate &&
                new Date(e[dateName]) <= Searchvalue.endDate
              ) {
                _item.push(e);
              }
            });
            setDataList(creatData(_item).DataList);
          } else {
            setDataList(_data.DataList);
          }
        } else {
          setData([]);
          setDataList([]);
        }
      }, 500);
    } catch (e) {
      dispatch(setLoading(false));
    }
  };
  React.useEffect(() => {
    if (isGetData) {
      GetDataList();
    }
  }, [ID]);

  const Delete = (id) => {
    setConfirmDelete({
      open: true,
      label: "ยืนยันการลบ",
      callbackAgree: async () => {
        const error = () =>
          setAlert({
            label: "เกิดข้อผิดพลาด",
            open: true,
            icon: App.Dialog.Icon.closeRed,
            callback: () => setAlert({ ...alert, open: false }),
          });
        dispatch(App.store.setLoading(true));
        let res = await App.service.postHttp(api_deleted
          , { id })
        dispatch(App.store.setLoading(false));
        setConfirmDelete({ open: false })
        if (res.status) {
          if (res.data.status) {
            setAlert({
              open: true,
              icon: App.Dialog.Icon.successGreen,
              label: "ลบข้อมูลสำเร็จ",
              callback: () => {
                GetDataList(false)
                setAlert({ ...alert, open: false })
              }
            });
          } else {
            error()
          }
        } else {
          error()
        }
      },
    });
  };
  return {
    List: List,
    Action: ActionUC,
    Head: HeadUC,
    Search: Search,
    Actionbar: actionbar,
    ButtonSearch: buttonSearch,
    ButtonReload: ButtonReload,
    Data,
    setData,
    DataList,
    setDataList,
    Searchvalue,
    SetSearchvalue: (e) => {
      setSearchvalue(e);
    },
    fild: fild,
    GetDataList: GetDataList,
    onSearch: onSearch,
    // PermissionMenu: PermissionMenu,
    creatData: creatData,
    Loading: Loading,
    ListContext,
    Notifications,
    Delete,
    alert,
    setAlert,
    confirmDelete,
    setConfirmDelete
    // Columns
  };
};
export default Component;
