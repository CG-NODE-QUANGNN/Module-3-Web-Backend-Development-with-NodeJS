let dateNames = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"];

let date = new Date();

let dateName = dateNames[date.getDay()];
console.log("Hôm nay là: " + dateName);
