import React from 'react';
import './App.css';
import MediaQuery from 'react-responsive'


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data:[],
      search: null,
      amountLoaded:3,
      loading:false
    }
    this.memo = {};
    this.loadButtonRef = React.createRef()
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
    this.setState({
      loading:true
    })
    const url = this.state.search === null ? `http://api.giphy.com/v1/gifs/trending?api_key=8JI4AsP4zmNZoxx4yGTxqp6Uds5orCYm&limit=${this.state.amountLoaded}&rating=G` : `https://api.giphy.com/v1/gifs/search?api_key=8JI4AsP4zmNZoxx4yGTxqp6Uds5orCYm&q=${this.state.search}&limit=${this.state.amountLoaded}&offset=0&rating=G&lang=en`
    fetch(url)
      .then((response)=>{
        if(response.status !== 200){
          console.log('problem: we have a status code of:', response.status)
        }
        response.json().then((data)=>{
          console.log(data.data)
          this.setState({
            data:data.data,
            loading:false
          }, this.scrollToMyRef)
        })

      }).catch((error)=>{
        console.log('Error', error)
      })
  }
  scrollToMyRef = () => {
    setTimeout(1000, window.scrollTo({top: this.loadButtonRef.current.offsetTop,behavior:'smooth'}))
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
    // increased look up for already seen gifs using memoization
    // check here if current design is mobile
      let compSizedGifs = this.state.data.map((value, index)=>{
                let id = value.id
                if(!this.memo.id){
                  this.handleCaching(value,id, this.memo)
                return (
                  <div>
                      <img src={ value.images.original.url} key={index} className='gif' alt={id}/>
                  </div>
                  )
                }
              return (
                  <div>
                      <img src={ this.memo[id] } key={index} className='gif' alt={id}/>
                  </div>
                )
              })

       let mobileSizedGifs = this.state.data.map((value, index)=>{
                let id = value.id
                if(!this.memo.id){
                  this.handleCaching(value,id, this.memo)
                return (
                  <div>
                      <img src={ value.images.original.url} key={index} className='gifMobile' alt={id}/>
                  </div>
                  )
                }
              return (
                  <div>
                      <img src={ this.memo[id] } key={index} className='gifMobile' alt={id}/>
                  </div>
                )
        })

      return (
        <div className='background'>
          <div className="App">
            <h1 className="Title">
              GIPHY SEARCHER
            </h1>
              <input placeholder="Enter terms" onKeyPress={this.handleSearchBar} className={'Input'}/>
              <button onClick={this.handleSearchPress} className={'Search'}>
                PRESS ME
              </button>



              <div className='gif-container'>
                    <MediaQuery maxWidth={500}>
                      {matches => {
                        return matches
                            ? mobileSizedGifs
                            : compSizedGifs
                        }}
                   </MediaQuery>
              </div>

              {
                this.state.loading &&
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>

              }

              <button onClick={this.handleLoadMore} className={'loading-button'} ref={this.loadButtonRef} >
                Load More
              </button>


          </div>
        </div>
    )
  }
}


export default App;
