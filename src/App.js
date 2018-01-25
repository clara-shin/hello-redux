import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import {
  incCount, 
  incCountAsync, 
  store, 
  addTodo, 
  fetchRepos
} from './redux';

const IncButton = ({onClick}) => (
  <button onClick={onClick}>증가</button>
);

const CounterDisplay = ({count}) => (
  <div>{count}</div>
)

const RepoList = ({repos}) => (
  <div>
    {repos.map(repoName => (
      <div>{repoName}</div>
    ))}
  </div>
)

class TokenForm extends Component {
  handleClick = e => {
    this.props.onSubmit(this.input.value);
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={this.handleClick}>불러오기</button>
      </div>
    )
  }
}

class TodoList extends Component {
  render() {
    const {todos} = this.props;
    return (
      <div>
        {
          todos.map(text => (
            <div>{text}</div>
          ))
        }
      </div>
    )
  }
}

class TodoInput extends Component {
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.onNewTodo(e.target.value);
      e.target.value = '';
    }
  }
  render() {
    return (
      <div>
        <input type="text" onKeyPress={this.handleKeyPress} />
      </div>
    )
  }
}

const ConnectedIncButton = connect(
  state => ({}),
  dispatch => {
    return {
      onClick: () => {
        dispatch(incCountAsync());
      }
    };
  }
)(IncButton);

const ConnectedCounterDisplay = connect(
  state => {
    return {
      count: state.count
    }
  }
)(CounterDisplay);

const ConnectedTodoList = connect(
  state => {
    return {
      todos: state.todos
    };
  }
)(TodoList);

const ConnectedTodoInput = connect(
  null,
  dispatch => {
    return {
      onNewTodo: text => {
        dispatch(addTodo(text));
      }
    }
  }
)(TodoInput)

const ConnectedTokenForm = connect(
  null,
  dispatch => {
    return {
      onSubmit: token => {
        dispatch(fetchRepos(token));
      }
    }
  }
)(TokenForm);

const ConnectedRepoList = connect(
  state => {
    return {
      repos: state.repos
    };
  }
)(RepoList);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedIncButton />
          <ConnectedCounterDisplay />
          <ConnectedTodoList />
          <ConnectedTodoInput />
          <ConnectedTokenForm />
          <ConnectedRepoList />
        </div>
      </Provider>
    );
  }
}

export default App;
