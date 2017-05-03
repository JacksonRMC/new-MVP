import React from 'react';


class Search extends React.Component {
	constructor ( props ){
		super(props);

	}


render () {
	
	return ( 
	<div>
    <h4>Search Date</h4><h5>Must be written YYYY-MM-DD</h5>
    <form onSubmit={this.props.clickHandler} >  
      Search: <input type="text" 
      onChange={this.props.onSearchChange}
      />
    <button type="submit">Date</button>
    </form>
  </div>
  )
  
  }
}

export default Search;

