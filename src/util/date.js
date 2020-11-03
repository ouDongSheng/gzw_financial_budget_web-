export const calcDate = (date1, date2) => {
  let date3 = date2 - date1;

  let days = Math.floor(date3 / (24 * 3600 * 1000))

  let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000))

  let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))

  let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  let seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

/**
 * 日期格式化
 */
export function dateFormat(date, format) {
  format = format || 'yyyy-MM-dd hh:mm:ss';
  if (date !== 'Invalid Date') {
    let o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';

}

/**
 * 日期格式化
 */
export function formatDate(unix, format) {
  let _format = format || 'yyyy-MM-dd hh:mm:ss'
  const d = new Date(unix)
  const o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  }
  if (/(y+)/.test(_format)) _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) if (new RegExp('(' + k + ')').test(_format)) _format = _format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return _format
}



// 中国标准时间format yyyy-mm-dd
const format = (time) => {
 let ymd = ''
 let mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))
 let day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate())
 ymd += time.getFullYear() + '-' // 获取年份。
 ymd += mouth + '-' // 获取月份。
 ymd += day // 获取日。
 return ymd // 返回日期。
}
/**
 * 根据开始时间和结束时间 计算出中间的所有日期
 */
export const getAllDate = (start, end) => {
 let dateArr = []
 let startArr = start.split('-')
 let endArr = end.split('-')
 let db = new Date()
 db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2])
 let de = new Date()
 de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2])
 let unixDb = db.getTime()
 let unixDe = de.getTime()
 let stamp
 const oneDay = 24 * 60 * 60 * 1000;
 for (stamp = unixDb; stamp <= unixDe;) {
   dateArr.push(format(new Date(parseInt(stamp))))
   stamp = stamp + oneDay
 }
 return dateArr
}

/**
 * 根据开始时间和结束时间 计算出中间的工作日
 */
export const workday = (start, end) => {
  let workday = 0;
  let beginDate = new Date(start.replace(/-/g, "/"));
  let endDate = new Date(end.replace(/-/g, "/"));
  let workDayVal = (endDate - beginDate)/86400000 + 1;
  let remainder = workDayVal % 7;
  let divisor = Math.floor(workDayVal / 7);
  let weekendDay = 2 * divisor;
  let nextDay = beginDate.getDay();
  for(let tempDay = remainder; tempDay>=1; tempDay--) {
    if(tempDay == remainder) {
      nextDay = nextDay + 0;
    } else if(tempDay != remainder) {
      nextDay = nextDay + 1;
    }
    if(nextDay == 7) {
      nextDay = 0;
    }
    if(nextDay == 0 || nextDay == 6) {
      weekendDay = weekendDay + 1;
    }
  }
  workday = workDayVal - weekendDay;
  if (workday < 0) {
    return workday = 0
  }
  return workday
}
