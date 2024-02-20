function formatUrl(json) {
  let dataArr = [];
  json.t = Math.random();
  for (let key in json) {
    dataArr.push(`${key}=${encodeURIComponent(json[key])}`)
  }
  return dataArr.join('&');
}

function http(options) {
  return new Promise((resolve, reject) => {
    if (!options.url) return;

    options.type = options.type || 'GET';
    options.data = options.data || {};
    options.timeout = options.timeout || 10000;
    options.url =
      import.meta.env.VITE_BASE_URL + options.url;

    let dataToUrlstr = formatUrl(options.data);
    let timer;

    // 1.创建
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (options.type.toUpperCase() === 'GET') {
      // 2.连接
      xhr.open('get', `${options.url}?${dataToUrlstr}`, true);
      // 3.发送
      xhr.send();
    } else if (options.type.toUpperCase() === 'POST') {
      // 2.连接
      xhr.open('post', options.url, true);
      xhr.setRequestHeader('ContentType', 'application/x-www-form-urlencoded');
      // xhr.setRequestHeader('ContentType', 'application/json');
      // 3.发送
      xhr.send(options.data);
    }

    // 4.接收
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        clearTimeout(timer);
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          let res = xhr.responseText
          try {
            res = JSON.parse(res)
          } catch {}
          resolve(res);
        } else {
          reject(xhr.status);
        }
      }
    }

    if (options.timeout) {
      timer = setTimeout(() => {
        xhr.abort();
        reject('超时');
      }, options.timeout)
    }
  });
}

export default http