import packageJson from '../../package.json'

class WzlReport {
  options = ''
  version = packageJson.version

  constructor(opt) {
    this.options = this.defaultOption(opt)
  }

  showOptions() {
    console.log('options: ' + this.options)
  }

  report(id) {
    const img = document.createElement("img")
    img.src = `/api/nlp/wechat/activity/info/getActivityConfig?activityId=${id}`
  }

  defaultOption(opt) {
    if (Object.prototype.toString.call(opt) !== '[object Object]') opt = {}
    const defaultOpt = {
      // 用户标识
      device_id: this.getUid(), // 设备标识
      user_id: '', // 用户标识
      // 时间
      dt: '', // 日期
      timestamp: '', // 时间戳
      // 埋点标识
      biz: '', // 业务线
      app: '', // 触点应用
      platform: '', // 端侧
      page: '', // 页面标识
      widget: '', // 控件
      sti: '', // 由biz、app、platform、page、widget五部分组成，用 - 连接在一起。如 assistant-unicomAssistant-wxMini-buy-vipCard
      event_type: '', // 事件类型
      extra: '', // 扩展字段（事件属性）
      // 设备信息
      os: '', // 系统
      os_v: '', // 系统版本
      brand: '', // 设备品牌
      model: '', // 机器内置型号
      carrier: '', // 运营商
      net: '', // 网络类型
      ip: '', // 网络出口ip
      // 应用信息
      version: '', // app版本
      user_agent: '', // 请求UA
      channel: '', // 渠道
      vip: '', // 用户身份 登录后传，未登录不传 当前生效的最高等级的，各产品在订购中心映射的vip值，如648
      organization_id: '', // 组织id B端用户所属企业的标识，如行业版的租户、企业名片的企业。 触点端获取到值才传，没获取到不传
      all_product: '', // 当前账号订购的所有产品 用“-”连接的所有已订购产品的产品id
      session_id: '', // 会话id，标识用户一次连续的产品使用 uuid，每次用户新进入小程序或网页时生成，当用户超过30分钟没有新行为时，更新这个值。
      t_source: '', // 流量来源标识 页面跳转来源传入的或链接上解析到的sti
      ts_biz: '', // 流量来源所属业务
      ts_app: '', // 流量来源所属触点/系统
      ts_platform: '', // 流量来源所属平台
      ts_page: '', // 流量来源所属页面
      ts_widget: '', // 流量来源所属控件
    }
    return {
      ...defaultOpt,
      ...opt,
      sti: `${opt.biz}-${opt.app}-${opt.platform}-${opt.page}-${opt.widget}`,
    }
  }

  getUid() {
    // const navigator_info = window.navigator;
    // const screen_info = window.screen;
    // let uid = navigator_info.mimeTypes.length;
    // uid += navigator_info.userAgent.replace(/\D+/g, '');
    // uid += navigator_info.plugins.length;
    // uid += screen_info.height || '';
    // uid += screen_info.width || '';
    // uid += screen_info.pixelDepth || '';
    // console.log('uid', uid, window.navigator.userAgent.replace(/\D+/g, ''));

    return window.navigator.userAgent.replace(/\D+/g, '');
  }

}

export default WzlReport