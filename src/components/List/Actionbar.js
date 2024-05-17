/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import App from "components";
import { Fragment } from "react";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import ListContext from "./Context";
import { useSelector } from "react-redux";
const Actionbar = (props) => {
  const { List } = useContext(ListContext);
  const {
    // List,
    isSelect,
    dataType,
    Agree,
    Disagree,
    onDelete,
    PropsAction,
    isSort = true,
    isButtonDelete = false,
    // recommend = 10,
    actionRight,
    // actionLeft,
    isNew = false,
    New,
    new_label,
    callbackNew = null
  } = props;
  const { isLoading } = useSelector(({ loading }) => loading)
  const { SetSearchvalue, Searchvalue, setDataList, setData }
    = List;
  const [count, setcount] = useState(0);
  const navigate = useNavigate()
  const onChange = (e) => {
    SetSearchvalue({ ...Searchvalue, sort: e.value });
  };
  useEffect(() => {
    if ((List?.DataList || []).find((e) => e.select === true)) {
      let c = 0;
      (List?.DataList || []).map((e) => {
        if (e.select === true) {
          c = c + 1;
        }
      });
      setcount(c);
    } else {
      setcount(0);
    }
  }, [List]);

  return (
    <App.Card
      mb="14px"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: App.color.white,
        p: 2
      }}
    >
      <Grid container spacing={1}>
        <Grid item {... { xs: 12, sm: 7, md: 7, lg: 7 }}
          sx={{ alignItems: "center", display: "flex" }}>
          {isSelect ? (
            <Checkbox
              checked={
                count === 0 ? false : count === List?.DataList?.length ? true : false
              }
              disableRipple
              indeterminate={count > 0 && count !== List?.DataList?.length}
              sx={{
                color: App.color.main,
                "&.Mui-checked": {
                  color: App.color.main,
                },
                "&.Mui-disabled": {
                  "& .icon": {
                    bgcolor: "#D6D6D8",
                  },
                },
                "& .icon": {
                  borderRadius: "4px",
                },
                "&:hover .icon": {
                  borderColor: App.color.main,
                },
                "&.MuiCheckbox-indeterminate": {
                  color: App.color.main,
                },
                paddingLeft: 0,
              }}
              onChange={(event) => {
                let item = [];
                List.DataList.map((e) => {
                  item.push({ ...e, select: event.target.checked });
                });
                setDataList([...item]);
                item = [];

                List.Data.map((e) => {
                  if (dataType === undefined) {
                    item.push({ ...e, select: event.target.checked });
                  } else {
                    let select = e.select;
                    if (e[dataType.name] === dataType.type) {
                      select = event.target.checked;
                    }
                    item.push({ ...e, select: select });
                  }
                });
                setData(item);
              }}
            />
          ) : null}
          {List.DataList.find((e) => e.select === true) ? (
            <Box display={"flex"} alignItems={"center"} pr="14px">
              <App.Label
                text={"เลือก " + count + " รายการ"}
                size={App.text.size.smm}
              />
            </Box>
          ) : (
            (
              <App.Label
                text={
                  "หน้า " +
                  (Searchvalue?.page + 1) +
                  " , " +
                  ((List?.DataList || []).length === 0
                    ? 0
                    : (Searchvalue?.page + 1) * Searchvalue?.pageSize -
                    Searchvalue?.pageSize +
                    1) +
                  " - " +
                  ((Searchvalue?.page + 1) * Searchvalue?.pageSize >
                    (List?.DataList || []).length
                    ? (List?.DataList || []).length
                    : (Searchvalue?.page + 1) * Searchvalue?.pageSize) +
                  " จาก " +
                  (List?.DataList || []).length +
                  " รายการ"
                }
                size={App.text.size.smm}
              />
            )
          )}

          {isButtonDelete === true && count > 0 ? (
            <App.Button
              variant={"outlined"}
              label={"ลบ"}
              // fullWidth
              minWidth="150px"
              onClick={onDelete}
            />
          ) : ""}
          {isButtonDelete === false &&
            isSelect &&
            count > 0 ? (
            PropsAction === undefined ? (
              <Fragment>
                <Box pl="14px" pr="14px">
                  <App.Button
                    variant={"contained"}
                    label={
                      <Box display={"flex"} alignItems={"center"}>
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.9161 3.40738C15.1036 3.59491 15.2089 3.84921 15.2089 4.11438C15.2089 4.37954 15.1036 4.63385 14.9161 4.82138L7.42077 12.3167C7.32172 12.4158 7.20412 12.4944 7.07469 12.548C6.94526 12.6016 6.80653 12.6292 6.66643 12.6292C6.52634 12.6292 6.38761 12.6016 6.25818 12.548C6.12875 12.4944 6.01115 12.4158 5.9121 12.3167L2.1881 8.59338C2.09259 8.50113 2.01641 8.39079 1.964 8.26878C1.91159 8.14678 1.884 8.01556 1.88285 7.88278C1.8817 7.75 1.907 7.61832 1.95728 7.49542C2.00756 7.37253 2.08181 7.26087 2.17571 7.16698C2.2696 7.07309 2.38125 6.99884 2.50415 6.94856C2.62704 6.89827 2.75872 6.87297 2.8915 6.87413C3.02428 6.87528 3.1555 6.90287 3.27751 6.95528C3.39951 7.00768 3.50985 7.08387 3.6021 7.17938L6.6661 10.2434L13.5014 3.40738C13.5943 3.31445 13.7046 3.24073 13.8259 3.19044C13.9473 3.14014 14.0774 3.11426 14.2088 3.11426C14.3401 3.11426 14.4702 3.14014 14.5916 3.19044C14.713 3.24073 14.8232 3.31445 14.9161 3.40738Z"
                            fill="white"
                          />
                        </svg>
                        <App.Label
                          pl={1}
                          text={"อนุมัติ"}
                          size={App.text.size.smm}
                          fontWeight="500"
                          color={App.color.white}
                        />
                      </Box>
                    }
                    // fullWidth
                    minWidth="150px"
                    onClick={Agree}
                  />
                </Box>
                <App.Button
                  variant={"outlined"}
                  label={"ไม่อนุมัติ"}
                  // fullWidth
                  minWidth="150px"
                  onClick={Disagree}
                />
              </Fragment>
            ) : null
          ) : null}
          {PropsAction === undefined ? null : PropsAction}
        </Grid>
        <Grid container item {... { xs: 12, sm: 5, md: 5, lg: 5 }}
          spacing={1} sx={{ alignItems: "center", display: "flex" }}>

          {isSort === true ? (
            <Grid item {... { xs: 12, sm: 9, md: 9, lg: 9 }}
              sx={{ alignItems: "center", display: "flex" }}>
              <App.Select
                title=""
                isGap={false}
                isLabel={false}
                name="sort"
                data={App.Enum.SortEnum}
                disabled={isLoading}
                onChange={onChange}
                form={Searchvalue}
              />
            </Grid>
          ) : null}
          {isNew ?
            <Grid item {... { xs: 12, sm: 3, md: 3, lg: 3 }}
              sx={{
                alignItems: "center", display: "flex",
                "& div": {
                  width: "100%"
                }
              }}>
              <App.Button
                isOutlined={true}
                label={App.service.isNullOrEmpty(new_label) ? <Box
                  display={"flex"} alignItems={"center"} justifyContent={"center"}
                  sx={{ width: "100%" }}>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.71496 7.56563L7.2037 7.56563L7.2037 3.10015C7.20052 2.99834 7.21794 2.89694 7.25491 2.80202C7.29187 2.7071 7.34763 2.62063 7.41883 2.54778C7.57304 2.39357 7.78219 2.30694 8.00027 2.30694C8.21836 2.30694 8.42751 2.39357 8.58172 2.54778C8.65436 2.61771 8.71194 2.70175 8.75094 2.79474C8.78993 2.88772 8.80951 2.9877 8.80848 3.08852L8.77941 7.58308H13.303C13.4926 7.581 13.6758 7.65176 13.8147 7.78077C13.9689 7.93497 14.0555 8.14413 14.0555 8.36221C14.0555 8.58029 13.9689 8.78944 13.8147 8.94365C13.7437 9.02083 13.6574 9.08239 13.5613 9.12443C13.4652 9.16647 13.3614 9.18807 13.2565 9.18786L8.79685 9.15879L8.79685 13.6359C8.79846 13.7358 8.78028 13.835 8.74336 13.9278C8.70644 14.0206 8.6515 14.1052 8.58171 14.1766C8.42751 14.3308 8.21836 14.4175 8.00027 14.4175C7.78219 14.4175 7.57304 14.3308 7.41883 14.1766C7.34619 14.1067 7.2886 14.0227 7.24961 13.9297C7.21061 13.8367 7.19103 13.7367 7.19207 13.6359L7.22114 9.14134L2.69752 9.14134C2.50793 9.14342 2.32478 9.07266 2.18585 8.94365C2.03164 8.78944 1.945 8.58029 1.945 8.36221C1.945 8.14413 2.03164 7.93498 2.18585 7.78077C2.32714 7.64297 2.51727 7.56563 2.71496 7.56563Z"
                        fill={isLoading ? App.color.gray : App.color.main} />
                    </svg>
                    <App.Label text="เพิ่ม" size={App.text.size.md}
                      color={isLoading ? App.color.gray : App.color.main}
                      sx={{ pl: 1 }} />
                  </Box>
                </Box> : new_label}
                fullWidth

                onClick={() => {
                  try {
                    callbackNew()
                  } catch {
                    navigate(New)
                  }

                }}
              />
            </Grid> : null}
          <Box sx={{ mt: "auto", mb: "auto", ml: 1 }}>
            {actionRight}
          </Box>
        </Grid>
      </Grid>
    </App.Card>
  );
};

Actionbar.propTypes = {
  isSelect: PropTypes.bool,
  dataType: PropTypes.string,
  Agree: PropTypes.func,
  Disagree: PropTypes.func,
  onDelete: PropTypes.func,
  PropsAction: PropTypes.object,
  isSort: PropTypes.bool,
  isButtonDelete: PropTypes.bool,
  recommend: PropTypes.number,
  actionRight: PropTypes.object,
  actionLeft: PropTypes.object,
  isNew: PropTypes.bool,
  New: PropTypes.string,
};
export default Actionbar;
