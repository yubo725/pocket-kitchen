Page({ 
  data:{
      categoryList: null
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getCategoryList()
  },
  getCategoryList: function() {
      var selectedCategory = getApp().globalData.selectedCategory
      wx.setNavigationBarTitle({
        title: '菜谱分类列表-' + selectedCategory.name,
        success: function(res) {
          // success
        }
      })
      if (selectedCategory != null) {
          var thiz = this
          wx.request({
            url: 'https://apicloud.mob.com/v1/cook/menu/search',
            data: {
                key: '520520test',
                cid: selectedCategory.ctgId,
                page: 1,
                size: 20
            },
            method: 'GET', 
            success: function(res){
              // success
              thiz.setData({
                  categoryList: res.data.result.list
              })
            },
            fail: function() {
              // fail
              console.log('get selected category list error!')
            },
            complete: function() {
              // complete
            }
          })
      } 
  },
  handleCategoryListItemClick: function(e) {
    var menuId = e.currentTarget.dataset.item
    getApp().globalData.selectedMenuId = menuId
    wx.navigateTo({
      url: '../cookdetail/cookdetail',
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
    
  },
  imageError: function(e) {
      console.log('load image error: ')
      console.log(e)
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