Page({
  data:{
      categoryData: null
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 10000
    })
    this.getCategory()
  },
  getCategory: function() {
      var thiz = this
      wx.request({
        url: 'https://apicloud.mob.com/v1/cook/category/query',
        data: {
            key: '520520test'
        },
        method: 'GET',
        success: function(res){
          // success
          wx.hideToast()
          var obj = res.data

          var childs = obj.result.childs
          for (var i = 0; i < childs.length; i++) {
            var childschilds = childs[i].childs
            var splitArr = thiz.splitArr(childschilds, 4)
            childs[i].childs = splitArr
          }
          if (obj.msg === 'success') {
            thiz.setData({
                categoryData: obj.result.childs
            })
          }
        },
        fail: function() {
          // fail
          wx.hideToast()
        },
        complete: function() {
          // complete
          wx.hideToast()
        }
      })
  },
  splitArr: function(arr, pageSize) {
    var resultArr = []
    var itemArr
    for (var j = 0; j < Math.ceil(arr.length / pageSize); j++) {
      itemArr = []
      for (var i = 0; i < 4; i++) {
        var index = i + 4 * j
        if (index < arr.length) {
          itemArr.push(arr[i + 4 * j])	
        } else {
          itemArr.push({
            "name": ""
          })
        }
      }
      resultArr.push(itemArr)
    }
    return resultArr
  },
  handleCategoryItemClick: function(event) {
    getApp().globalData.selectedCategory = event.currentTarget.dataset.category
    wx.navigateTo({
      url: '../categorylist/categorylist',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    // console.log(event)
    // wx.showToast({
    //   title: event.currentTarget.dataset.category.name
    // })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow:function(){
    // 生命周期函数--监听页面显示

  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏

  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})