import * as React from "react";
import PropTypes from "prop-types";
import service from "undefined-service-web";
import amphures from "../json/thai_amphures";
import DialogUC from "../../dialogUC";
import Controlled from "../controlled";
export const Amphures = amphures;

const DialogAmphure = (props) => {
  const { onClose, selectedValue, open, parentId } = props;
  const [amphures, setAmphures] = React.useState(
    Amphures.filter((e) => e.province_id === parentId)
  );
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
      const p = Amphures.filter((e) => e.province_id === parentId).filter((e) => {
        if (e.name_th.includes(search)) {
          return e;
        }
      });
      setAmphures([...p]);
    } else {
      setAmphures(Amphures.filter((e) => e.province_id === parentId));
    }
  };
  React.useEffect(() => {
    Search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  React.useEffect(() => {
    setAmphures(Amphures.filter((e) => e.province_id === parentId));
  }, [parentId]);
  return (
    <DialogUC
      open={open}
      onClose={handleClose}
      label="เลือกอำเภอ/เขต"
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          height: "400px",
        },
      }}
    >
      <Controlled.SearchUC setSearch={setSearch} search={search} name={"amphures"} />
      <Controlled.ListUC data={amphures} value={selectedValue} onClick={handleListItemClick} />
    </DialogUC>
  );
}

DialogAmphure.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.number,
  parentId: PropTypes.number,
};
export default DialogAmphure;
