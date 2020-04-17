
//var host = "https://zhiyan.zxhong.com/friesland/api/index.php"

var host = "https://zhiyan.zxhong.com/friesland/api/v3/index.php"

var api = {
  getopenid: '?m=index&a=openid',
  video: '?m=index&a=video',
  article: '?m=index&a=tag_article',
  artDetail: '?m=index&a=artDetail',
  zan: '?m=index&a=zan',
  collect: '?m=index&a=collect',
  comment: '?m=index&a=comment',
  suggest: '?m=upload&a=suggest',
  user: '?m=index&a=user',
  myCollect: '?m=index&a=myCollect',
  note: '?m=index&a=note',
  isIn: '?m=index&a=isIn',
  join: '?m=index&a=join',
  image: '?m=upload&a=image',
  video_zj: '?m=upload&a=video',
  word: '?m=upload&a=word',
  imgs: '?m=index&a=imgs',
  calls: '?m=index&a=calls',
  prizeIndex: '?m=prize&a=index',
  drawUser: '?m=prize&a=user',
  draw: '?m=prize&a=draw',
  like: '?m=index&a=like',
  banner: '?m=index&a=banner',
  ciniu: '?m=niu&a=ciniu',
  sign : '?m=niu&a=sign',
  jinai: '?m=niu&a=jinai',
  love_rank: '?m=index&a=love_rank',
  question: '?m=niu&a=question',
  answer : '?m=niu&a=answer',
  donate : '?m=niu&a=donate',
  donate_info: '?m=niu&a=donate_info',
  love_value:'?m=niu&a=love_value',
  llist : '?m=goods&a=llist',
  good_detail:'?m=goods&a=detail',
  index_love_value:'?m=index&a=love_value',
  wish: '?m=niu&a=com_wish',
  mywish : '?m=niu&a=mywish',
  exchange :'?m=goods&a=exchange',
  feed_guide : '?m=niu&a=feed_guide',
  use_setting:'?m=niu&a=use_setting',
  donate_guide:'?m=niu&a=donate_guide',
  img_id:'?m=index&a=img_id',
  donate_history:'?m=niu&a=donate_history',
  wish_list:'?m=niu&a=wish_list',
  zan_wish:'?m=niu&a=zan_wish',
  wish_rank:'?m=niu&a=wish_rank',
  upimg:'?m=niu&a=upimg',
  video_talk: '?m=index&a=video_talk'
}


/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function getRequest(url, data, success, fail) {
  wx.request({
    url: host + url,
    method: 'GET',
    data: data,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (success && typeof success === "function") {
        success(res);
      }
    },
    fail: function (error) {
      if (fail && typeof fail === "function") {
        fail(error);
      } else {
        console.log(error);
      }
    }
  })
}

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function postRequest(url, data, success) {

 var data = data;

  const value = wx.getStorageSync('usercode')
  if (wx.getStorageSync('usercode')) {
    data.sskey = value.sskey;
    data.openid = value.openid
  }
  

  wx.request({
    url: host + url,
    method: 'POST',
    data: data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      if (success && typeof success === "function") {
        success(res);
      }
    },
    fail :function(){
      wx.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  })
  
}




function upfileRequest(url, data, file, success) {

  var data = data;

  const value = wx.getStorageSync('usercode')
  if (wx.getStorageSync('usercode')) {
    data.sskey = value.sskey;
    data.openid = value.openid
  }


  wx.uploadFile({
    url: host + url,
    filePath: file,
    name: 'upfile',
    formData: data,
    success: function (res) {
      if (success && typeof success === "function") {
        success(res);
      }
    }
  })

}


module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.upfileRequest = upfileRequest;
module.exports.api = api;