// house-list.js
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    allCompleted: false,
    queryEstate: "",
    logs: []
  },

  fetchHouse: function(url) {
    var page = this;
    var houseList = []
    util.getData(url)
      .then(function (res) {
        console.log("Status:" + res.statusCode);
        console.log("Get Estate :" + res.data.data);
        var tmpList = JSON.parse(res.data.data)
        for (var index in tmpList) {
          var house = tmpList[index];
          console.log(house)
          var title = house["title"]
          if (title.length > 12) {
            title = title.substring(0, 12) + "...";
          }
          houseList.push({ title: title, houseType: house["houseType"], area: house["area"],  price: house["price"] })
        }
        page.setData({ houseList: houseList })
      })
  },

  load: function() {
    var url = "http://localhost:8080/rest/v1/house?estateName=" + this.data.estateName + "&page=1&pageCount=20";
    this.fetchHouse(url);
    // var houseList = []
    // houseList.push({ title: "浦发绿城", price: 121, address: "高层" })
    // houseList.push({ title: "浦发绿城", price: 122, address: "低层" })
    // this.setData({ houseList: houseList })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("option:" +options.estateName);
    //for debug
    this.setData({estateName : options.estateName})
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