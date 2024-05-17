/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import App from "components"
import { useMemo } from "react"
import { Autocomplete, TextField } from "@mui/material";
function DebouncedInput({
    value,
    onChange,
    placeholder,
    sortedUniqueValues,
    debounce = 500,
    ...props
}) {
    return (
        <Autocomplete
            id={"Input-filter"}
            name={"Input-filter"}
            options={sortedUniqueValues}
            defaultValue={value}
            value={value}
            freeSolo
            onChange={(event, value) => onChange(value)}
            onBlur={(e) => {
                if (value !== e.target.value) {
                    onChange(e.target.value)
                }
            }}
            renderInput={(params) => (
                <TextField {...params} {...{ placeholder }} />
            )
            }
            sx={{
                "& .MuiInputBase-root": {
                    height: "30px",
                    backgroundColor: App.color.white,
                    p: "0 !important",
                    "& input": {
                        fontSize: 14
                    }
                },
                "& .MuiAutocomplete-endAdornment ": {
                    display: "none"
                }
                , "& .MuiInputBase-root.Mui-focused ": {
                    borderRadius: "5px",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid " + (App.color.main) + " !important"
                }, "& .Mui-focused": {
                    boxShadow: "unset !important"
                }
                , "& .MuiOutlinedInput-root fieldset ": {
                    border: "1px solid " + App.color.disabled + " !important"
                },
                "& .MuiAutocomplete-endAdornment  svg": {
                    fill: App.color.black
                },
                "& .MuiOutlinedInput-root::hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid " + App.color.disabled + " !important"
                    }

                }
            }}
        />

    )
}
const Filter = ({
    column,
    table,
    placeholder
}) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = useMemo(
        () => {
            // console.log("firstValue", firstValue);
            return typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort()
        },
        [column.getFacetedUniqueValues()]
    )
    // console.log(column)
    return column.columnDef.isNumber ? (
        <div>
            <div className="flex space-x-2">
                <input
                    type="number"
                    // min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    // max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue)?.[0] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old) => [value, old?.[1]])
                    }
                    placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
                        ? `(${column.getFacetedMinMaxValues()?.[0]})`
                        : ''
                        }`}
                    className="w-24 border shadow rounded"
                />
                <input
                    type="number"
                    // min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    // max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue)?.[1] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old) => [old?.[0], value])
                    }
                    placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
                        ? `(${column.getFacetedMinMaxValues()?.[1]})`
                        : ''
                        }`}
                    className="w-24 border shadow rounded"
                />
            </div>
            <div className="h-1" />
        </div>
    ) : (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 5000).map((value) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '')}
                onChange={(value) => {
                    console.log("value", column)
                    column.setFilterValue(value)
                }}
                placeholder={placeholder}
                className="w-36 border shadow rounded"
                list={column.id + 'list'}
                sortedUniqueValues={(() => {
                    let label = []
                    sortedUniqueValues.map(e => {
                        if (!App.service.isNullOrEmpty(e)) {
                            label.push(e)
                        }
                    })
                    return label
                })()
                }
            />
            <div className="h-1" />
        </>
    )

}

export default Filter