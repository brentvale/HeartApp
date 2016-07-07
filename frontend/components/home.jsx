var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
  render: function(){
    return(
      <div>
        <h1>HearTapp</h1>
        <p>HearTapp is a heart rate measuring application. </p>
        <Link className="" to="/start_tapping"><div id="startButton" onClick={this.startTapping}>Ready to start Tapping</div></Link>
      </div>
    )
  }
});

module.exports = {
  Home: Home
}