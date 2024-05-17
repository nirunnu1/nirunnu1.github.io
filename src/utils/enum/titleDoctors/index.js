import App from "components"

export const Title = [
    { 0: { value: "นายแพทย์", eng: "นายแพทย์", th: "นายแพทย์" } },
    { 1: { value: "แพทย์หญิง", eng: "แพทย์หญิง", th: "แพทย์หญิง" } },
    { 2: { value: "ทันตแพทย์", eng: "ทันตแพทย์", th: "ทันตแพทย์" } },
    { 3: { value: "ทันตแพทย์หญิง", eng: "ทันตแพทย์หญิง", th: "ทันตแพทย์หญิง" } },
    { 4: { value: "เทคนิคการแพทย์", eng: "เทคนิคการแพทย์", th: "เทคนิคการแพทย์" } },
    { 5: { value: "เทคนิคการแพทย์หญิง", eng: "เทคนิคการแพทย์หญิง", th: "เทคนิคการแพทย์หญิง" } },
    { 6: { value: "นาย", eng: "นาย", th: "นาย" } },
    { 7: { value: "นาง", eng: "นาง", th: "นาง" } },
    { 8: { value: "นางสาว", eng: "นางสาว", th: "นางสาว" } },
]
const defaultUC = {
    Title,
    getTextTh: (value) => {
        if (App.service.isNullOrEmpty(value)) {
            return ""
        } else {
            try {
                let data = Title.find(e => e[Object.keys(e)[0]].value === value)
                return data[Object.keys(data)[0]].th
            } catch {
                return ""
            }
        }
    }
}
export default defaultUC