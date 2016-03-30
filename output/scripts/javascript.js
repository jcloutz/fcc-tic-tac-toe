'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouter = ReactRouter;
var Router = _ReactRouter.Router;
var Route = _ReactRouter.Route;
var Link = _ReactRouter.Link;
var IndexRoute = _ReactRouter.IndexRoute;
var hashHistory = _ReactRouter.hashHistory;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;


var TypeWriterCharacter = function TypeWriterCharacter(_ref) {
  var character = _ref.character;
  return React.createElement(
    'span',
    { className: 'typewriter__text--show' },
    character
  );
};

var TypeWriter = function (_React$Component) {
  _inherits(TypeWriter, _React$Component);

  function TypeWriter(props) {
    _classCallCheck(this, TypeWriter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TypeWriter).call(this, props));

    _this.carraige = null; // will be used for interval
    _this.state = {
      message: _this.props.message,
      visibleChars: '',
      hiddenChars: _this.props.message
    };
    return _this;
  }

  _createClass(TypeWriter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // Create promise to begin rendering typed characters after start delay.
      var typewriter = new Promise(function (resolve, reject) {
        _this2.typewriter = setTimeout(function () {
          resolve(true);
        }, _this2.props.startDelay);
      });
      // start typing characters
      typewriter.then(function () {
        var message = _this2.state.message.split('');
        var counter = 0;

        // Declare inteveral at class level to allow componentWillUnmount to cancel if necessary
        _this2.carraige = setInterval(function () {
          if (message.length > 0) {
            _this2.setState({
              visibleChars: _this2.state.visibleChars + message.shift(),
              hiddenChars: message.join('')
            });
            counter++;
          } else {
            clearInterval(_this2.carraige);
          }
        }, _this2.props.keystrokeDelay);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // TODO implement reverse type effect.
      // clear timeout and intervals
      clearTimeout(this.typewriter);
      clearInterval(this.carraige);
      console.log('leaving');
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var counter = 0;
      var _state = this.state;
      var visibleChars = _state.visibleChars;
      var hiddenChars = _state.hiddenChars;

      var visChars = visibleChars.split('').map(function (char) {
        return React.createElement(
          'span',
          { key: counter++ },
          char
        );
      });
      var hidChars = hiddenChars.split('').map(function (char) {
        return React.createElement(
          'span',
          null,
          char
        );
      });

      return React.createElement(
        'div',
        { className: 'typewriter' },
        React.createElement(
          CSSTransitionGroup,
          {
            className: 'typewriter__carriage',
            transitionName: 'typewriter__character',
            transitionEnterTimeout: this.props.enterTimeout,
            transitionLeaveTimeout: this.props.leaveTimeout
          },
          visChars
        ),
        React.createElement('span', { className: 'typewriter__caret' }),
        React.createElement(
          'span',
          { className: 'typewriter__text--hide' },
          hidChars
        )
      );
    }
  }]);

  return TypeWriter;
}(React.Component);

var InitialPrompt = function InitialPrompt() {
  return React.createElement(
    'div',
    null,
    React.createElement(TypeWriter, {
      message: 'DO YOU WANT TO PLAY A GAME?',
      startDelay: 2000,
      keystrokeDelay: 80,
      enterTimeout: 500,
      leaveTimeout: 500
    }),
    React.createElement(
      'div',
      { className: 'prompt__button-container' },
      React.createElement(
        'button',
        { onClick: function onClick() {
            hashHistory.push('/players');
          } },
        'Yes'
      ),
      React.createElement(
        'button',
        null,
        'No'
      )
    )
  );
};

var PlayerCount = function PlayerCount() {
  return React.createElement(
    'div',
    null,
    React.createElement(TypeWriter, {
      message: 'How many players?',
      startDelay: 2000,
      keystrokeDelay: 80,
      enterTimeout: 500,
      leaveTimeout: 500
    })
  );
};

var Layout = function Layout(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Tic Tac Toe'
    ),
    props.children
  );
};

var App = function App() {
  return React.createElement(
    Router,
    { history: hashHistory },
    React.createElement(
      Route,
      { path: '/', component: Layout },
      React.createElement(IndexRoute, { component: InitialPrompt }),
      React.createElement(Route, { path: '/players', component: PlayerCount })
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));