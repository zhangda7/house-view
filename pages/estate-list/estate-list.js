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

  fetchEstate: function(url) {
    var page = this;
    var houseList = []
    util.getData(url)
      .then(function (res) {
        console.log("Status:" + res.statusCode);
        console.log("Get Estate :" + res.data.data);
        var estateList = JSON.parse(res.data.data)
        for (var index in estateList) {
          var estate = estateList[index];
          console.log(estate)
          var addr = estate["address"]
          if (addr.length > 20) {
            addr = addr.substring(0, 20) + "...";
          }
          var price = estate["price"] / 10000;
          var priceStr = "未知";
          if(price != 0) {
            priceStr = price.toFixed(2);
          }
          houseList.push({ name: estate["name"], address: addr, price: priceStr })
        }
        page.setData({ houseList: houseList })
      })
  },

  load: function() {
    this.fetchEstate("http://localhost:8080/rest/v1/estate/listByDistrict?district=浦东&page=1&pageCount=10");
    // var houseList = []
    // houseList.push({ title: "浦发绿城", price: 121, address: "高层" })
    // houseList.push({ title: "浦发绿城", price: 122, address: "低层" })
    // this.setData({ houseList: houseList })
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
  
  },

  // ===== 事件处理函数 =====
  inputChangeHandle: function (e) {
    console.log("inputChangeHandle Receive:" + e.detail.value)
    //this.setData({ input: e.detail.value })
    var url = "http://localhost:8080/rest/v1/estate/listByName?estateName=" + e.detail.value;
    this.fetchEstate(url);

  },
  addTodoHandle: function (e) {
    console.log("addTodoHandle Receive:" + e.detail.value)
    /*if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({ name: this.data.input, completed: false })
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: '新增', name: this.data.input })
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1,
      logs: logs
    })
    this.save()*/
  },

  queryDistrict: function(event) {
    console.log("Change district " + event.currentTarget.dataset.district);
    var url = "http://localhost:8080/rest/v1/estate/listByDistrict?district=" + event.currentTarget.dataset.district + "&page=1&pageCount=10";
    console.log("Change district url :" + url);
    this.fetchEstate(url);
    //TODO 更新选中项的样式
  },

  queryHouse: function(event) {
    console.log("Query House " + event.currentTarget.dataset.estatename);
    //TODO 跳转至house-list
    wx.navigateTo({
      url: '../house-list/house-list?estateName=' + event.currentTarget.dataset.estatename,
    })
  }
})