var React = require('react');
var LineChart = require('react-d3-basic').LineChart;

var HeartGraphSummary = React.createClass({
  getInitialState: function(){
    return {showData: false};
  },
  toggleDataDisplay: function(){
    var newShowData = !this.state.showData;
    
    this.setState({showData:newShowData});
  },
  render: function(){
    var dataDisplay;
    if(this.state.showData){
      dataDisplay = 
          <div>
            <ul>
              {this.props.tapper.chartData.map(function(data, idx){
                return <li key={idx}>{parseInt(data.rate)}</li>
              })}
            </ul>
            <button onClick={this.toggleDataDisplay}>Hide Data Points</button>
          </div>;
    } else {
      dataDisplay = <button onClick={this.toggleDataDisplay}>Show Data Points</button>
    }
    
    var localChartSeries =  [
                              {
                                field: 'rate',
                                name: 'Heart Rate',
                                color: 'green'
                              }
                            ];
    return(
      <div>
        <div>
          <h1>Calculated Heart Rate: {this.props.tapper.currentAverage} bpm</h1>
        </div>
        <div>
          <p>Accurate Heart rate achieved if each of the last {LAST_X_HEART_RATES} taps are within +/- 10 bpm of the average for the same {LAST_X_HEART_RATES} taps.</p>
        </div>
        <div>
          <h2>DATA</h2>
          {dataDisplay}
        </div>
        <LineChart  width={this.props.width} 
                    height={this.props.height} 
                    data={this.props.tapper.chartData} 
                    chartSeries={localChartSeries} 
                    x={this.props.x} />
        <p>Reload Browser window to tap your heart rate again.</p>
      </div>
      
    )
  }
});

module.exports = {
  HeartGraphSummary: HeartGraphSummary
}