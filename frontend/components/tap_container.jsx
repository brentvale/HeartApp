var React = require('react');
var HeartGraph = require('./heart_graph.jsx').HeartGraph;
var HeartGraphSummary = require('./heart_graph_summary.jsx').HeartGraphSummary;

var TapContainer = React.createClass({
  getInitialState: function(){
    return {tapper: new TapRecorder()}
  },
  handleAccuracyAchieved: function(){
    this.state.tapper.accuracyAchieved = true;
  },
  registerTap: function(){
    this.state.tapper.addTap({date: new Date()});
    var newTapperState = this.state.tapper;
    
    this.setState({tapper: newTapperState});
  },
  render: function(){
  var width = 700,
      height = 300,
      chartSeries = [
        {
          field: 'rate',
          name: 'Heart Rate',
          color: 'red'
        }
      ],
      x = function(d) {
        return d.index;
      };
    
    if(this.state.tapper.accuracyAchieved){
      return(
        <HeartGraphSummary  tapper={this.state.tapper}
                            width={width}
                            height={height}
                            chartSeries={chartSeries}
                            x={x}/>
      )
    }
    return(
      <div className="tap-container" onClick={this.registerTap}>
        <h1>Instructions</h1>
       
        <p>1. feel pulse</p>
        <p>2. click when you feel a beat for every beat (once a range of accuracy has been achieved, you can stop...just keep clicking!)</p>
        <p>3. once the scenario is over, a summary screen will display (ok, now you can stop clicking) </p>
        <HeartGraph tapper={this.state.tapper} 
                    handleAccuracyAchieved={this.handleAccuracyAchieved}
                    width={width}
                    height={height}
                    chartSeries={chartSeries}
                    x={x} />
      </div>
    )
  }
});

module.exports = {
  TapContainer: TapContainer
}