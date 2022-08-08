import React, { Component } from 'react'
import logo from './favicon.ico'
import './App.css'

class App extends Component {
  state = {
    data: null
  }

  componentDidMount () {
    this.getQuotes()
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err))
  }

  getQuotes = async () => {
    const response = await fetch('/api/quotes')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Добо пожаловать в СЬЛРЖАЛСЧ</h1>
        </header>
        <p className='App-intro'>
          Ok.
        </p>
      </div>
    )
  }
}

export default App
