var React = require('react');
var LineChart = require('react-d3-basic').LineChart;

var HeartGraphSummary = React.createClass({
  getInitialState: function(){
    return {showData: false};
  },
  toggleDataDisplay: function(){
    console.log("togglingDataDisplay");
    var newShowData = !this.state.showData;
    
    this.setState({showData:newShowData});
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
    },
    chartData = [],
    total = 0,
    average,
    timeBetweenBeats,
    calculatedRate,
    newObj;
    
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
      average = parseInt(total / chartData.length);
    }
    
    var dataDisplay;
    if(this.state.showData){
      dataDisplay = 
          <div>
            <ul>
              {chartData.map(function(data, idx){
                return <li key={idx}>{parseInt(data.rate)}</li>
              })}
            </ul>
            <button onClick={this.toggleDataDisplay}>Hide Data Points</button>
          </div>;
    } else {
      dataDisplay = <button onClick={this.toggleDataDisplay}>Show Data Points</button>
    }
    return(
      <div>
        <div>
          <h1>Calculated Heart Rate: {average} bpm</h1>
        </div>
        <div>
          <p>Accurate Heart rate achieved if last 5 taps are within +/- 10 bpm of the average.</p>
        </div>
        <div>
          <h2>DATA</h2>
          {dataDisplay}
        </div>
        <LineChart width={700} height={300} data={chartData} chartSeries={chartSeries} x={x} />
      </div>
      
    )
  }
});

module.exports = {
  HeartGraphSummary: HeartGraphSummary
}