import App from "components";
import SelectDialog from "./SelectDialog";
const funcDialog = (Control) => {
    if (App.service.isNullOrEmpty(Control)) {
        return ""
    } else {
        if (Control.includes("select_address_")) {
            return App.Dialog.Address[SelectDialog[Control.replaceAll("_", "")]]
        } else if (Control.includes("select_date_")) {
            return App.Dialog.Date[SelectDialog[Control.replaceAll("_", "")]]
        } else if (Control.includes("select_title_")) {
            return App.Dialog[SelectDialog[Control.replaceAll("_", "")]]
        }
        else if (Control.includes("select_titleDoctors_")) {
            return App.Dialog[SelectDialog[Control.replaceAll("_", "")]]
        }
        else if (Control.includes("select_bank_")) {
            return App.Dialog[SelectDialog[Control.replaceAll("_", "")]]
        }
        else if (Control.includes("select_file_")) {
            return App.Dialog[SelectDialog[Control.replaceAll("_", "")]]
        }
    }
}
export default funcDialog