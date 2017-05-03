import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      term: ''
    }
  }

  onSearchChange(e) {
    console.log('onchange working ')
    this.setState({
      term: e.target.value
    })
  }

  clickHandler ( ) {
    console.log('I am clickHandler working!!!!')
    var term = this.state.term;

    $.ajax({
      url: '/search',
      method: 'POST',
      data: {"term" : `${term}`},
      // dataType: "application/json",
      // contnetType: json,
      success: (data) => {
        console.log('data', data)
      },
      error: (jqXHR, textStatus, error) => {
        console.log(jqXHR, textStatus, error);
        console.log(error.responseText);

      }
    })
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <center><h2> Near Earth Objects!!! </h2>
      <Search clickHandler={this.clickHandler.bind(this)} onSearchChange={this.onSearchChange.bind(this)}  />
      <h1>Item List</h1></center>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));