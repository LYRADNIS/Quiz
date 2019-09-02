import React from 'react';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data:[],
      search: null,
      amountLoaded:3,
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
    this.setState({
      search:e.target.value,
      amountLoaded:3
    })
  }

  handleSearchPress = () => {

    const url = this.state.search === null ? `http://api.giphy.com/v1/gifs/trending?api_key=8JI4AsP4zmNZoxx4yGTxqp6Uds5orCYm&limit=${this.state.amountLoaded}&rating=G` : `https://api.giphy.com/v1/gifs/search?api_key=8JI4AsP4zmNZoxx4yGTxqp6Uds5orCYm&q=${this.state.search}&limit=${this.state.amountLoaded}&offset=0&rating=G&lang=en`
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

  handleCaching = (value,id, obj) => {
    obj[id] = value
  }

  render(){
      let memo = {}
      let gifs = this.state.data.map((value, index)=>{
                let id = value.id
                if(!memo.id){
                  this.handleCaching(value,id, memo)
                return (
                  <div>
                      <img src={ value.images.original.url} key={index} className='gif'/>
                  </div>
                  )
                }
              return (
                  <div>
                      <img src={ memo[id] } key={index} className='gif'/>
                  </div>
                )
              })

      return (
        <div className="App">
          <h1 className="Title">
            GIPHY SEARCHER
          </h1>
            <input placeholder="Enter terms" onKeyPress={this.handleSearchBar} className={'Input'}/>
            <button onClick={this.handleSearchPress} className={'Search'}>
              PRESS ME
            </button>

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
