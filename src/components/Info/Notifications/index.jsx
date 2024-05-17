import React, { memo, useContext, useEffect } from "react";

import App from "components";
import { Fragment } from "react";

import Context from "../Context";
const Notifications = (props) => {
  const { FormControl } = useContext(Context);

  return (
    <Fragment >
      <App.Dialog.Alert
        open={FormControl.alert?.open}
        callback={FormControl.alert?.callback}
        label={FormControl.alert?.label}
        icon={FormControl.alert?.icon}
      />
      <App.Dialog.Confirm
        open={FormControl?.confirm?.open}
        label={FormControl?.confirm.label}
        icon={FormControl?.confirm.icon || App.Dialog.Icon.exclamationRed}
        callbackDisagree={() => FormControl.setConfirm({ open: false })}
        callbackAgree={FormControl?.confirm?.callbackAgree}
        disagreeText={FormControl?.confirm?.disagreeText || "ปิด"}
        agreeText={FormControl?.confirm?.agreeText || "ยืนยัน"}
        customLabel={FormControl?.confirm?.customLabel || null}
        themes={FormControl?.confirm?.themes || "error"}
      />
    </Fragment>
  );
};


export default memo(Notifications);
