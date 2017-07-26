// house-list.js
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
    logs: []
  },

  load: function() {
    var page = this;
    var houseList = []
    util.getData("http://localhost:8080/house/trend")
    .then(function(res) {
      console.log("Status:" + res.statusCode);
      console.log("Get trend :" + res.data);
      for(var index in res.data) {
        var house = res.data[index];
        console.log(house["title"]);
        houseList.push({ title: house["title"], price: 121, floor: "高层"})
      }
      //page.setData({houseList: houseList})
    })
    houseList.push({ title: "中邦一房", price: 121, floor: "高层" })
    houseList.push({ title: "中邦二房", price: 122, floor: "低层" })
    this.setData({ houseList: houseList })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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