export const formatDateFunction = (date, para) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join(para);
};

export const formatDateFunction1 = (date, para) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join(para);
};

export const getOnlyTime = (date, para) => {
  var d = new Date(date),
  hours = "" + d.getHours(),
  minutes = "" + d.getMinutes(),
  seconds = "" + d.getSeconds();
  if(hours.length < 2) hours = "0" + hours;
  if(minutes.length < 2) minutes = "0" + minutes
  if(seconds.length < 2) seconds = "0" + seconds;
  // let curTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  return [hours, minutes, seconds].join(para);
};

export const formatDateFunction2 = (date, sym, type) => {
  const symbol = sym == undefined ? "-" : sym;
  const typeMonth = type == undefined ? "short" : type;
  const dateconf = new Date(date);
  const dayName = dateconf.toLocaleString("en-us", { weekday: typeMonth });
  var d = new Date(date),
    month = "" + d.toLocaleString("default", { month: typeMonth }),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (type == undefined && sym == undefined) {
    return [day, month, year].join(symbol);
  } else {
    return [dayName + "", day, month, year].join(symbol);
  }
};

export const formatDateFunctionByName = (date, sym, type) => {
  const symbol = sym == undefined ? "-" : sym;
  const typeMonth = type == undefined ? "short" : type;
  const dateconf = new Date(date);
  const dayName = dateconf.toLocaleString("en-us", { weekday: typeMonth });
  var d = new Date(date),
    month = "" + d.toLocaleString("default", { month: typeMonth }),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (type == undefined && sym == undefined) {
    return [day, month, year].join(symbol);
  } else {
    return [day, month, year].join(symbol);
  }
};

export const formatDateFunc = (date, para) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join(para);
};

export const formatTimeFromDate = (date) => {
  let today = new Date(date);
  // let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
  // let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
  // let time = hours + ':' + minutes
  const str = new Date(today).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return str;
};

export const tConvert  = (time) => {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

export const getCurrentTime = () => {
  var d = new Date(); // for now
  return `T${d.getSeconds()}:${d.getMinutes()}:${d.getSeconds()}`; 
}
