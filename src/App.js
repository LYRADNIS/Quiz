import React from 'react';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data:[],
      search: 'trending',
      amountLoaded:6
    }
  }

  componentDidMount(){
    fetch(`http://api.giphy.com/v1/gifs/trending?api_key=8JI4AsP4zmNZoxx4yGTxqp6Uds5orCYm&limit=${this.state.amountLoaded}&rating=G`)
      .then((response)=>{
        if(response.status !== 200){
          console.log('problem: we have a status code of:', response.status)
        }
        response.json().then((data)=>{
          console.log(data)
          this.setState({
            data:data.data
          })
        })

      }).catch((error)=>{
        console.log('Error', error)
      })
  }

  handleSearchBar = (e) => {
    //e.target.value
    this.setState({
      search:e.target.value,
      amountLoaded:3
    })
  }

  handleSearchPress = () => {

    const url = `https://api.giphy.com/v1/gifs/search?api_key=8JI4AsP4zmNZoxx4yGTxqp6Uds5orCYm&q=${this.state.search}&limit=${this.state.amountLoaded}&offset=0&rating=G&lang=en`
    fetch(url)
      .then((response)=>{
        if(response.status !== 200){
          console.log('problem: we have a status code of:', response.status)
        }
        response.json().then((data)=>{
          console.log(data.data)
          this.setState({
            data:data.data
          })
        })

      }).catch((error)=>{
        console.log('Error', error)
      })
  }

  handleLoadMore = () => {
    let val = this.state.amountLoaded
    val += 3
    this.setState({
      amountLoaded:val
    }, this.handleSearchPress)

  }

  render(){
      let gifs = this.state.data.map((value, index)=>{
                return (
                  <div>
                      <img src={ value.images.original.url} key={index} className='gif'/>
                  </div>
                  )
              })
      return (
        <div className="App">
          <h1 className="Title">
            GIPHY SEARCHER
          </h1>
          <div className='SearchContainer'>
            <input placeholder="Enter terms" onKeyPress={this.handleSearchBar}/>

            <button onClick={this.handleSearchPress}>
              PRESS ME
            </button>
          </div>
          <div className='gif-container'>
            {
              gifs
            }
          </div>

            <button onClick={this.handleLoadMore} className={'loading-button'}>
              Load More
            </button>


        </div>
    )
  }
}


export default App;
