/* eslint-disable array-callback-return */
const highlight = (text) => {
    const inputText = document.getElementsByClassName("tb-cell");

    try {
        let phone = text.replace(/\D/g, "").substring(0, 10);
        const zip = phone.substring(0, 3);
        const middle = phone.substring(3, 6);
        const last = phone.substring(6, 10);
        phone = `${zip.length === 3 || middle.length > 0 ? (zip + "-") : zip}${middle.length === 3 ? (middle + "-") : middle}${last}`;

        (Array.from(inputText) || []).map(e => {
            let innerHTML
            let el
            if (e.children.length > 0) {
                innerHTML = e.children[0].innerHTML
                el = e.children[0]
            } else {
                innerHTML = e.innerHTML
                el = e
            }

            if (e.attributes?.["name"]?.nodeValue === "phone") {
                console.log("phone", phone)
                let index = innerHTML.indexOf(phone);
                if (index >= 0) {
                    innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + phone.length) + "</span>" + innerHTML.substring(index + phone.length);
                    el.innerHTML = innerHTML;
                }
            } else {
                let index = innerHTML.indexOf(text);
                console.log("inputText", e.children)
                if (index >= 0) {
                    innerHTML = innerHTML.substring(0, index) + `<span class='${e.attributes?.["name"]?.nodeValue === "is_activate"
                        || e.attributes?.["name"]?.nodeValue === "is_cancel"
                        || e.attributes?.["name"]?.nodeValue === "status" ? "highlight1" : "highlight"}'>` + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
                    el.innerHTML = innerHTML;
                }
            }
        })
    } catch { }

}

export default highlight