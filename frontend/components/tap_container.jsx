var React = require('react');
var HeartGraph = require('./heart_graph.jsx').HeartGraph;

var TapContainer = React.createClass({
  getInitialState: function(){
    return {index: 0, tapTimestamps: [], accuracyAchieved: false};
  },
  handleAccuracyAchieved: function(){
    this.setState({accuracyAchieved:true});
  },
  registerTap: function(){
    var tempIndex = this.state.index + 1;
    
    var toPush = {date: new Date(),
                  index: this.state.index};
    
    var newTimeStampsArray = [];
    for(var i = 0; i < this.state.tapTimestamps.length; i++){
      newTimeStampsArray.push(this.state.tapTimestamps[i]);
    }
    
    newTimeStampsArray.push(toPush);

    this.setState({index: tempIndex, tapTimestamps: newTimeStampsArray});
  },
  render: function(){
    if(this.state.accuracyAchieved){
      return(
        <div>DONE WITH HEART RATE! </div>
      )
    }
    return(
      <div className="tap-container" onClick={this.registerTap}>
        <h1>Instructions</h1>
        <div>1. feel pulse</div>
        <div>2. start tapping screen</div>
        <HeartGraph chartData={this.state.tapTimestamps} handleAccuracyAchieved={this.handleAccuracyAchieved} />
      </div>
    )
  }
});

module.exports = {
  TapContainer: TapContainer
}