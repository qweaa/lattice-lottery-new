export function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getCode() {
  let code = '';
  for (var i = 0; i < 6; i++) {
    var type = getRandom(1, 3);
    switch (type) {
      case 1:
        code += String.fromCharCode(getRandom(48, 57)); //数字
        break;
      case 2:
        code += String.fromCharCode(getRandom(65, 90)); //大写字母
        break;
      case 3:
        code += String.fromCharCode(getRandom(97, 122)); //小写字母
        break;
    }
  }
  return code;
}