var React = require('react');
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

var HeartGraph = React.createClass({
  render: function(){
    if(this.props.chartData.length < 2){
      return(<div></div>);
    }
    
    var width = 700,
        height = 300,
        margins = {left: 100, right: 100, top: 50, bottom: 50},
        title = "User sample",
        // chart series,
        // field: is what field your data want to be selected
        // name: the name of the field that display in legend
        // color: what color is the line
      chartSeries = [
        {
          field: 'rate',
          name: 'Heart Rate',
          color: 'red'
        }
      ],
      // your x accessor
      x = function(d) {
        return d.index;
      };
   
   var chartData = [];
   var total = 0;
   var average;
   for(var i=0; i < this.props.chartData.length - 1; i++){
     var timeBetweenBeats = this.props.chartData[i + 1].date - this.props.chartData[i].date;
     var calculatedRate = 60/(timeBetweenBeats/1000);
     var newObj = {rate: calculatedRate, index: i}
     
     total += calculatedRate;
     chartData.push(newObj)
   }
   
   average = total / this.props.chartData.length;

   //change chartSeries data.color to green if last 3 beats are within 10% of the average?
   //need to define what an accurate HR is 
   //possibly terminate scenario once a HR is captured
   if(chartData.length > 3){
     chartSeries = [
       {
         field: 'rate',
         name: 'Heart Rate',
         color: 'green'
       }
     ]
   }
  
    return (
      <div>
        This is the Heart Graph component.
        <LineChart width={700} height={300} data={chartData} chartSeries={chartSeries} x={x} />
      </div>
    )
  }
});

module.exports = {
  HeartGraph: HeartGraph
}