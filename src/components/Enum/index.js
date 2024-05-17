const TitleEnum = [
  { value: 0, text: "Mr." },
  { value: 1, text: "Miss" },
  { value: 2, text: "Ms." },
  { value: 3, text: "Mrs." },
];
const RoleEnum = [
  { value: 0, text: "Admin" },
  { value: 1, text: "Marketing" },
];
const GenderEnum = [
  { value: 0, text: "Female" },
  { value: 1, text: "Male" },
];
const SortEnum = [
  { value: 0, text: "เรียงตามข้อมูลที่ถูกสร้างเก่าที่สุด" },
  { value: 1, text: "เรียงตามข้อมูลที่ถูกสร้างใหม่ที่สุด" },
  { value: 2, text: "เรียงตามข้อมูลที่อัปเดตเก่าที่สุด" },
  { value: 3, text: "เรียงตามข้อมูลที่อัปเดตใหม่ที่สุด" },
]
const ButtonTypeEnum = [
  { value: 0, text: "Collect" },
  { value: 3, text: "Show Information" },
  { value: 1, text: "Call" },
  { value: 2, text: "Email" },
  { value: 4, text: "Link to Partner" },
];
const SelectMonthEnum = [
  { value: 1, text: "January" },
  { value: 2, text: "February" },
  { value: 3, text: "March" },
  { value: 4, text: "April" },
  { value: 5, text: "May" },
  { value: 6, text: "June" },
  { value: 7, text: "July" },
  { value: 8, text: "August" },
  { value: 9, text: "September" },
  { value: 10, text: "October" },
  { value: 11, text: "November" },
  { value: 12, text: "December" },
];
const defaultUC = {
  Title: TitleEnum,
  Role: RoleEnum,
  Gender: GenderEnum,
  ButtonType: ButtonTypeEnum,
  SelectMonthEnum: SelectMonthEnum,
  SortEnum
};
export default defaultUC
