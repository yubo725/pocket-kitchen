Page({
  data:{
      title: "",
      summary: "",
      image: "",
      ingredients: ""
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getCookDetail()
  },
  getCookDetail: function() {
      var menuId = getApp().globalData.selectedMenuId
      var thiz = this
      wx.request({
        url: 'https://apicloud.mob.com/v1/cook/menu/query',
        data: {
            key: '520520test',
            id: menuId
        },
        method: 'GET', 
        success: function(res){
          // success
          if (res != null) {
              var cookDetail = res.data.result
              wx.setNavigationBarTitle({
                title: cookDetail.name,
                success: function(res) {
                  // success
                }
              })
              console.log(cookDetail)
              thiz.setData({
                  title: cookDetail.name,
                  summary: cookDetail.recipe.sumary,
                  image: cookDetail.recipe.img,
                  ingredients: cookDetail.recipe.ingredients
              })
          }
        },
        fail: function() {
          // fail
          console.error('get cook detail error!')
        },
        complete: function() {
          // complete
        }
      })
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