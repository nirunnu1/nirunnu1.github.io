
import App from "components";
const ColumnsListNo = {
    Header: () => (
        <App.Label
            text="ลำดับ"
            textAlign="center"
            size={App.text.size.md}
            fontWeight="500"
        />
    ),
    maxWidth: "70px",
    accessor: "list",
    Tooltip: false,
    isFilter: false,
    Cell: (prop) => {
        const { row, } = prop;
        return (
            <App.Label text={row.index + 1} textAlign="center" />
        );
    },
    CellMobile: false,
}
export default ColumnsListNo