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
          <div className="col-lg-3">
            <br/>
            <div className="input-group">
              <input className="form-control" ref="inputField" type="text"/>
              <span className="input-group-btn">
              <button className="btn btn-danger" onClick={this.handleClick}>Add</button> </span>
            </div>
            <div>
              <ul className="list-group">
                {this.state.allTodos.map(
                    function (todo) {
                      var boundClick = this._onDestroyClick.bind(this, todo.id);
                      return (
                          <TodoItem key={todo.id} data={todo} deleteItem={boundClick}/>
                      );
                    }, this)
                }
              </ul>
            </div>
          </div>

        </div>
    );
  },

  handleClick: function () {
    const node = this.refs.inputField;
    const text = node.value.trim();
    TodoActions.create(text);
  },


  _onDestroyClick: function (i) {
    TodoActions.destroy(i);
  },

  _onChange: function () {
    this.setState(getTodoState());
  }

});

class TodoItem extends React.Component {
  render() {
    return (
        <li className="list-group-item">
          {this.props.data.text}
          <span className="badge">
            <span className="glyphicon glyphicon-trash" onClick={this.props.deleteItem}></span>
          </span>
          &nbsp;&nbsp;
          <span className="badge">
            <span className="glyphicon glyphicon-pencil"></span>
          </span>
        </li>
    );
  }
}

module.exports = TodoApp;
