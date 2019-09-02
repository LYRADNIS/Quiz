import React from 'react';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentSearch:'trending'
    }
  }

  componentWillMount(){
    //prac api key
      // 8JI4AsP4zmNZoxx4yGTxqp6Uds5orCYm
    //trending api: first use initial trneidng to load


  }

  handleSearchBar = () => {

  }

  handleCB = (arg) => {
    alert(arg)
  }

  render(){
      return (
        <div className="App">
          <h1 className="Title">
            GIPHY SEARCHER
          </h1>
          <div>
            Search Bar
          </div>
          <div>
            Giphys
          </div>

        </div>
    )
  }
}


export default App;
