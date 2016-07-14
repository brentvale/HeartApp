var React = require('react');
var LineChart = require('react-d3-basic').LineChart;

var HeartGraph = React.createClass({
  componentWillReceiveProps: function(){
    //must have at least X recorded elements to obtain a 'valid accuracy'
    //X defined in tap_recorder.js as global LAST_X_HEART_RATES
    if(this.props.tapper.isAccuracyAchieved()){
      this.props.handleAccuracyAchieved();
    }
  },
  render: function(){
    var averageHeartRate = this.props.tapper.calcAndSetAverageHeartRate();
     
     //use dummy chart data from this.props.tapper.initialChartData so graph draws
     var chartData, visibilityClass;
     if(this.props.tapper.chartData.length < 1){
       chartData = this.props.tapper.initialChartData;
       visibilityClass = "invisible";
     } else {
       chartData = this.props.tapper.chartData;
       visibilityClass = "visible";
     }
     
     //change chartSeries data.color to green if last 5 beats are within 10 bpm of the average
     if(this.props.tapper.accuracyAchieved){
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
        <div>
          <h2 className={visibilityClass}>Calculated HR is {averageHeartRate} BPM</h2>
        </div>
        <LineChart  width={this.props.width} 
                    height={this.props.height} 
                    data={chartData} 
                    chartSeries={this.props.chartSeries} 
                    x={this.props.x} />
      </div>
    )
  }
});

module.exports = {
  HeartGraph: HeartGraph
}