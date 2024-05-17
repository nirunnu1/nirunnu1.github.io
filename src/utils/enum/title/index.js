import App from "components"

export const Title = [
    { 0: { value: "mr", eng: "mr", th: "นาย" } },
    { 1: { value: "mrs", eng: "mrs", th: "นาง" } },
    { 2: { value: "miss", eng: "miss", th: "นางสาว" } },
]
const defaultUC = {
    Title,
    getTextTh: (value) => {
        if (App.service.isNullOrEmpty(value)) {
            return ""
        } else {
            let data = Title.find(e => e[Object.keys(e)[0]].value === value)
            return data[Object.keys(data)[0]].th
        }
    }
}
export default defaultUC