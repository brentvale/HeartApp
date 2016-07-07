var React = require('react');

var Main = React.createClass({
  startTapping: function(){
    
  },
  render: function(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
});

module.exports = {
  Main: Main
}