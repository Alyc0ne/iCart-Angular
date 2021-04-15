function SetNumberFormat(data, length = null) {
    const number = RemoveCommaNumber(data)
    if (!!number) return AddCommaNumberFloat(number, length)
}

function RemoveCommaNumber(data) {
    if (data != undefined && data != "") return isNaN(data) ? parseFloat(data.replace(/,/g, '')) : data
}

function AddCommaNumberFloat(data, length = null) {
    if (data == null || data == '') {
        data = 0;
    }
    length = length != undefined ? length : 2;
    return parseFloat(data).toFixed(length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}