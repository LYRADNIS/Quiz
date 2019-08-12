import React from 'react'
import './App.css';

export default class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      timerLeft:this.props.time,
      seconds:'props',
      minutes:'loading',
    }
  }

  componentDidMount(){
    this.handleTimer()
  }

  handleTimer = () => {
    let intervalId = setInterval(()=>{
      let time = this.state.timerLeft - 1
      let seconds = this.state.timerLeft % 60
      let minutes = Math.floor(this.state.timerLeft / 60)
      this.setState({
        timerLeft: time,
        seconds:seconds,
        minutes: minutes
      })
      if(this.state.minutes === 0 && this.state.seconds === 0){
        clearInterval(intervalId)
        this.props.callbackFunc('Countdown is finished')
      }
    }, 1000)
  }

  render(){
    return(
      <div>
        <p>
        {
          this.state.minutes
        } Minute(s)
        :
        {
          this.state.seconds
        } Second(s)
        </p>
      </div>
    )
  }
}