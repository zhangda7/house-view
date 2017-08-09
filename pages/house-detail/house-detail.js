// house-detail.js
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  fetchTrend: function(url) {
    var page = this;
    var houseList = []
    console.log("Request trend url " + url)
    util.getData(url)
      .then(function (res) {
        console.log("Status:" + res.statusCode);
        console.log("Get Trend :" + res.data.data);
      });  
  },

  load: function() {
    var url = "http://localhost:8080/rest/v1/house/trend?houseId=" + this.data.houseid;
    this.fetchTrend(url);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("option:" +options.houseid);
    //for debug
    this.setData({houseid : options.houseid})
    // this.setData({ estateName: "金地未未来" });
    this.load();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})