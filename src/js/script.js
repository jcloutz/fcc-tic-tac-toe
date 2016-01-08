"use strict";

var App = React.createClass({
  render: function() {
      return (
        <h1>React Rocks</h1>
      );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
