var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router').hashHistory;

var Main = require('./components/main.jsx').Main;
var TapContainer = require('./components/tap_container.jsx').TapContainer;
var Home = require('./components/home.jsx').Home;

var routes = (
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="/start_tapping" component={TapContainer} />
    </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={HashHistory}>{routes}</Router>,
    document.getElementById('app')
  );
});