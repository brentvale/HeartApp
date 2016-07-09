var React = require('react');
var LineChart = require('react-d3-basic').LineChart;

var HeartGraph = React.createClass({
  componentWillReceiveProps: function(){
    //must have at least 6 recorded elements
    if(this.props.chartData.length > 5){
      if(this.isAccuracyAchieved()){
        this.props.handleAccuracyAchieved();
      }
    }
  },
  isAccuracyAchieved: function(){
    var chartData = [];
    var total = 0;
    var average;
    var accuracyAchieved = true;
    
    for(var i=0; i < this.props.chartData.length - 1; i++){
      var timeBetweenBeats = this.props.chartData[i + 1].date - this.props.chartData[i].date;
      var calculatedRate = 60/(timeBetweenBeats/1000);
      var newObj = {rate: calculatedRate, index: i}
    
      chartData.push(newObj)
    }
    for(var i=1; i < 6; i++){
      total += chartData[chartData.length-i].rate;
    }
    average = parseInt(total / 5);
    
    for(var i=1; i < 6; i++){
      if(Math.abs((chartData[chartData.length-i].rate)-average) > 10){
        accuracyAchieved = false
      }
    }
    
    return accuracyAchieved;
  },
  render: function(){
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
     
     //dummy chart data so graph draws
     if(this.props.chartData.length < 1){
       chartData = [
         {
           rate: 50, index: 0,
           rate: 100, index: 0
         }
       ]
       return( 
               <div>
                 <div>
                   This is the Heart Graph component.
                   <LineChart width={700} height={300} data={chartData} chartSeries={chartSeries} x={x} />
                 </div>
               </div>
             );
     }
     
     var total = 0;
     var average;
     var timeBetweenBeats;
     var calculatedRate;
     var newObj;
     
     
     for(var i=0; i < this.props.chartData.length - 1; i++){
       timeBetweenBeats = this.props.chartData[i + 1].date - this.props.chartData[i].date;
       calculatedRate = 60/(timeBetweenBeats/1000);
       newObj = {rate: calculatedRate, index: i}
   
       total += calculatedRate;
       chartData.push(newObj)
     }
   
     if(chartData.length > 5){
       total = 0;
       //calculate new total and average using just last 5 values
       for(var i=1; i < 6; i++){
         total += chartData[chartData.length-i].rate;
       }
       average = parseInt(total / 5);
     } else {
       average = (chartData.length == 0) ? 0 : parseInt(total / chartData.length);
     }

     //change chartSeries data.color to green if last 5 beats are within 10 bpm of the average
     var accuracyAchieved = true;
     
     if(chartData.length > 5){
       for(var i=1; i < 6; i++){
         if(Math.abs((chartData[chartData.length-i].rate)-average) > 10){
           accuracyAchieved = false
         }
       }
       if(accuracyAchieved){
         chartSeries = [
           {
             field: 'rate',
             name: 'Heart Rate',
             color: 'green'
           }
         ]
       }
     }
  
    return (
      <div>
        This is the Heart Graph component.
        <div>Calculated HR is {average} BPM</div>
        <LineChart width={700} height={300} data={chartData} chartSeries={chartSeries} x={x} />
      </div>
    )
  }
});

module.exports = {
  HeartGraph: HeartGraph
}