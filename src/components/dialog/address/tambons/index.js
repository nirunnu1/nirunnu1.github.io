import * as React from "react";
import PropTypes from "prop-types";
import service from "undefined-service-web";
import tambons from "../json/thai_tambons";
import DialogUC from "../../dialogUC";
import Controlled from "../controlled";
export const Tambons = tambons;

const DialogTambons = (props) => {
  const { onClose, selectedValue, open, parentId } = props;
  const [tambons, setTambons] = React.useState(
    Tambons.filter((e) => e.province_id === parentId)
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
      const p = Tambons.filter((e) => e.amphure_id === parentId).filter((e) => {
        if (e.name_th.includes(search)) {
          return e;
        }
      });
      setTambons([...p]);
    } else {
      setTambons(Tambons.filter((e) => e.amphure_id === parentId));
    }
  };
  React.useEffect(() => {

    Search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  React.useEffect(() => {
    setTambons(Tambons.filter((e) => e.amphure_id === parentId));
  }, [parentId]);
  return (
    <DialogUC
      open={open}
      onClose={handleClose}
      label="เลือกตำบล/แขวง"
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          height: "400px",
        },
      }}
    >
      <Controlled.SearchUC setSearch={setSearch} search={search} name={"tambons"} />
      <Controlled.ListUC data={tambons} value={selectedValue} onClick={handleListItemClick} />
    </DialogUC>
  );
}

DialogTambons.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.number,
  amphure_id: PropTypes.number,
};
export default DialogTambons;
