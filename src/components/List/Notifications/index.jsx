import React, { useContext } from "react";

import App from "components";
import { Fragment } from "react";

import ListContext from "../Context";
const Notifications = (props) => {
  const { List, Breadcrumbs } = useContext(ListContext);

  return (
    <Fragment >
      <App.Dialog.Alert
        open={List.alert.open}
        callback={List.alert.callback}
        label={List.alert.label}
        icon={List.alert.icon}
      />
      <App.Dialog.Confirm
        open={List.confirmDelete.open}
        label={List.confirmDelete.label}
        icon={App.Dialog.Icon.exclamationRed}
        callbackDisagree={() => List.setConfirmDelete({ open: false })}
        callbackAgree={List.confirmDelete.callbackAgree}
        disagreeText={"ปิด"}
        agreeText={"ยืนยัน"}
        customLabel={<App.Label text={"ต้องการลบ" + (Breadcrumbs?.subName?.name || "").replaceAll("จัดการ", "").replaceAll("รายการ", "") + "หรือไม่"} size={14}
          color={App.color.gray} />}
        themes="error"
      />
    </Fragment>
  );
};


export default Notifications;
