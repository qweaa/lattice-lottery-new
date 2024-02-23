import packageJson from '../../package.json'

class WzlReport {
  appid = ''
  version = packageJson.version

  constructor(opt) {
    this.appid = opt.appid

    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    console.log('sss', navigator_info.userAgent.replace(/\D+/g, ''));
  }

  showAppid() {
    console.log('appid: ' + this.appid)
  }

  report(id) {
    const img = document.createElement("img")
    img.src = `/api/nlp/wechat/activity/info/getActivityConfig?activityId=${id}`
  }

  // 获取设备唯一标识
  getDeviceId() {
    var deviceId = '';
    // 如果是安卓设备
    if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
      deviceId = window.AndroidWebView.getIMEI();
    }
    // 如果是ios设备
    if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      deviceId = window.webkit.messageHandlers.getIMEI.postMessage(null);
    }
    return deviceId;
  }
}

export default WzlReport