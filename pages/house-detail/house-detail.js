// house-detail.js
var util = require("../../utils/util.js")
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartData:[],
    curHouse:{}
  },

  touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec'
        });
    },    
    updateData: function () {
        var simulationData = this.createSimulationData();
        var series = [{
            name: '成交量1',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(2) + '万';
            }
        }];
        lineChart.updateData({
            categories: simulationData.categories,
            series: series
        });
    },

  fetchTrend: function(url) {
    var page = this;
    var houseList = []
    console.log("Request trend url " + url)
    var tmpChart = lineChart;
    console.log("chart : " +lineChart);
    util.getData(url)
      .then(function (res) {
        console.log("Status:" + res.statusCode);
        console.log("Get Trend :" + res.data.data);

        var house = JSON.parse(res.data.data);
        house = house[0];
        var title = house["title"];
        var price = house["price"];
        var area = house["area"];
        var houseType = house["houseType"];
        var avg = (price * 10000 / area).toFixed(1);
        var floor = house["floor"]
        var estateName = house["estateName"];
        var district = house["district"];
        var address = house["address"];
        var year = house["year"];
        var trendList = house["trendList"];
        var downPayment = (price * 0.3).toFixed(1);
        var loan = (price - downPayment).toFixed(1);
        console.log("trends:" + trendList);
        var trendsPrice = []
        var trendsDate = []
        for(var index in trendList) {
            var trend = trendList[index];
            console.log("Trend : " + trend);
            trendsPrice.push(trend.price);
            trendsDate.push(trend.dateStr);
        }
        // page.setData({chartData : trends});
        var series = [{
            name: '挂牌价',
            data: trendsPrice,
            format: function (val, name) {
                return val.toFixed(1) + '万';
            }
        }];
        console.log("chart 2 : " + lineChart);
        console.log("prices : " + trendsPrice);
        console.log("dates : " + trendsDate);
        tmpChart.updateData({
            categories: trendsDate,
            series: series
        });
        page.setData({title:title, price:price, 
            area:area, houseType:houseType, 
            avg:avg, floor:floor,
            estateName:estateName, district:district,
            address:address, year:year,
            downPayment:downPayment, loan:loan})
      });  
  },

  load: function() {
    var url = "http://localhost:8080/rest/v1/house/trendDetail?houseId=" + this.data.houseid;
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
    this.loadChart();
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

  loadChart: function() {
    var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        var page = this;
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: [1],
            animation: true,
            background: '#f5f5f5',
            title: "历史趋势",
            series: [{
                name: '挂牌价',
                data: [1],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                title: '时间',
                disableGrid: true
            },
            yAxis: {
                title: '价格 (万元)',
                format: function (val) {
                    return val.toFixed(2);
                }
                // min: 0
            },
            width: windowWidth,
            height: 150,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
        console.log("After set chart " + lineChart);
  },

})