const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const fordatTime = date => {   //加一年
  const yeara = date.getFullYear()+1
  const montha = date.getMonth() + 1
  const daya = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [yeara, montha, daya].map(fordatNumber).join('-')
}

const fordatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 
 const b64EncodeUnicode =str=> {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}
//

module.exports = {
  formatTime: formatTime,
  fordatTime: fordatTime,
  b64EncodeUnicode: b64EncodeUnicode
}




