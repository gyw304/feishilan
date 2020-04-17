//app.js

const request = require('./request')
const util = require('./utils/util')

App({
  onLaunch: function () {

  },
  getPass() {
    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发送res.code 到后台

            console.log(res.code)

            request.postRequest(request.api.getopenid, { code: res.code }, function (res) {

              if (res.data.code != 0){
                util.set("usercode", {
                  openid: res.data.data.openid,
                  sskey: res.data.data.sskey
                })
                resolve({
                  status: 200
                });
              }
              else{
                console.log(res.data.msg + ' ==== app.js')
                resolve({
                  status: 404
                });
              }


            })


          }
        }
      })
    })
  },
  globalData: {
    comment: null
  }
})