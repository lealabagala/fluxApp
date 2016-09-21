var React = require('react');
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({

  getInitialState: function () {
    return getTodoState();
  },

  componentDidMount: function () {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
        <div>
          <div>
            <input ref="inputField" type="text"/>
            <button onClick={this.handleClick}>Add</button>
          </div>
          <div>
            <ul>
              {this.state.allTodos.map(
                  function (todo, i) {
                    return (
                        <TodoItem key={todo.i} data={todo}/>
                    );
                  })
              }
            </ul>
          </div>
        </div>
    );
  },

  handleClick: function () {
    const node = this.refs.inputField;
    const text = node.value.trim();
    TodoActions.create(text);
  },

  _onChange: function () {
    this.setState(getTodoState());
  }

});

class TodoItem extends React.Component {
  render() {
    return (
        <li>{this.props.data.text}</li>
    );
  }
}

module.exports = TodoApp;
