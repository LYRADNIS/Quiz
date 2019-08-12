import React from 'react';
import './App.css';
import  Timer  from './timer.js'

class App extends React.Component {

  handleCB = (arg) => {
    alert(arg)
  }

  render(){
      return (
        <div className="App">
            <Timer time={600} callbackFunc={this.handleCB}/>
        </div>
    )
  }
}


export default App;
