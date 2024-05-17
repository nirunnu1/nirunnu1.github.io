const isNumericInput = (event) => {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
};

const enforceFormat = (event) => {
    if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
    }
};
const enforceFormatprice = (event) => {
    const key = event.keyCode;

    if (!isNumericInput(event) && !isModifierKey(event) && !(key === 110)) {
        event.preventDefault();
    }
    if (event.target.value.split(".").length > 1) {
        if (key === 110) {
            event.preventDefault();
        }
    }
};
const formatToPhone = (event) => {
    if (isModifierKey(event)) { return; }
    const target = event.target;
    const input = event.target.value.replace(/\D/g, '').substring(0, 10);
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) { target.value = `${zip}-${middle}-${last}`; }
    else if (input.length > 3) { target.value = `${zip}-${middle}`; }
    else if (input.length > 0) { target.value = `${zip}`; }

};

const formatToIdentity = (event) => {
    if (isModifierKey(event)) { return; }

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g, '').substring(0, 13); // First ten digits of input only
    const zip = input.substring(0, 1);
    const middle = input.substring(1, 5);
    const last = input.substring(5, 10);
    const last1 = input.substring(10, 12);
    const last2 = input.substring(12, 13);

    if (input.length > 12) { target.value = `${zip}-${middle}-${last}-${last1}-${last2}`; }
    else if (input.length > 10) { target.value = `${zip}-${middle}-${last}-${last1}`; }
    else if (input.length > 5) { target.value = `${zip}-${middle}-${last}`; }
    else if (input.length > 1) { target.value = `${zip}-${middle}`; }
    else if (input.length > 0) { target.value = `${zip}`; }

};
const enforceFormatPhone = (event) => {

    if (!isNumericInput(event) && !isModifierKey(event)) {
        const value = event.target.value || ""
        if (event.keyCode !== 109) {
            event.preventDefault();
        }
        try {
            if (value[value.length - 1] === "-") {
                event.preventDefault();
            }
        } catch {

        }

    }
};
const Price = (price) => {
    let _v = (parseFloat(price || 0)).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    return "฿ " + _v.replace("$", "")
};
const Phone = (phone) => {
    let _phone = (phone || "").replace(/\D/g, "").substring(0, 10);
    const zip = _phone.substring(0, 3);
    const middle = _phone.substring(3, 6);
    const last = _phone.substring(6, 10);
    _phone = `${zip}-${middle}-${last}`;
    return _phone
};
const defaultUC = {
    enforceFormat,
    isModifierKey,
    isNumericInput,
    formatToPhone,
    formatToIdentity,
    enforceFormatprice,
    enforceFormatPhone,
    Price,
    Phone
}
export default defaultUC