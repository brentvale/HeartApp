var React = require('react');
var HeartGraph = require('./heart_graph.jsx').HeartGraph;

var TapContainer = React.createClass({
  getInitialState: function(){
    return {index: 0, tapTimestamps: []};
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
    
    console.log("toPush.date = " + toPush.date);
    console.log("toPush.index = " + toPush.index);
    console.log(newTimeStampsArray);
    this.setState({index: tempIndex, tapTimestamps: newTimeStampsArray});
  },
  render: function(){
    return(
      <div className="tap-container" onClick={this.registerTap}>
        <h1>Instructions</h1>
        <div>1. feel pulse</div>
        <div>2. start tapping screen</div>
        <HeartGraph chartData={this.state.tapTimestamps}/>
      </div>
    )
  }
});

module.exports = {
  TapContainer: TapContainer
}