import * as React from "react";
import PropTypes from "prop-types";
import service from "undefined-service-web";
import province from "../json/thai_provinces";
import DialogUC from "../../dialogUC";
import Controlled from "../controlled";
export const Province = province;

const DialogProvince = (props) => {
  const { onClose, selectedValue, open } = props;
  const [province, setProvince] = React.useState(Province);
  const [search, setSearch] = React.useState("");
  const handleClose = () => {
    setSearch("");
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    setSearch("");
  };
  const Search = () => {
    if (!service.isNullOrEmpty(search)) {
      // eslint-disable-next-line array-callback-return
      const p = Province.filter((e) => {
        if (e.name_th.includes(search)) {
          return e;
        }
      });
      setProvince([...p]);
    } else {
      setProvince(Province);
    }
  };
  React.useEffect(() => {
    Search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <DialogUC
      open={open}
      onClose={handleClose}
      label="เลือกจังหวัด"
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          height: "400px",
        },
      }}
    >
      <Controlled.SearchUC setSearch={setSearch} search={search} name={"province"} />
      <Controlled.ListUC data={province} value={selectedValue} onClick={handleListItemClick} />
    </DialogUC>
  );
}

DialogProvince.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.number,
};
export default DialogProvince;
