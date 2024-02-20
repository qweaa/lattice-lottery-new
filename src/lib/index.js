import packageJson from '../../package.json'
import http from '@/utils/http'

function sjdRecord({
  activityId,
}) {
  return http({
    url: '/nlp/wechat/activity/info/getActivityConfig',
    data: {
      activityId
    }
  })
}

class WzlReport {
  name = ''
  version = packageJson.version

  constructor(opt) {
    this.name = opt.name
  }

  showName() {
    console.log('我的名字：' + this.name)
    sjdRecord({
      activityId: 3
    }).then(data => {
      console.log("接口：", data)
    })
  }
}

export default WzlReport