import App from "components"

export const Gender = [
    { 0: { value: "male", eng: "male", th: "ชาย" } },
    { 1: { value: "female", eng: "female", th: "หญิง" } },
    { 2: { value: "anonymous", eng: "anonymous", th: "ไม่ระบุ" } },
]
const defaultUC = {
    Gender,
    getTextTh: (value) => {
        if (App.service.isNullOrEmpty(value)) {
            return ""
        } else {
            const data = Gender.find(e => e[Object.keys(e)[0]].value === value)
            return data[Object.keys(data)[0]].th
        }
    }
}
export default defaultUC