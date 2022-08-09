import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function ChatLink (props) {
  return <Link to={props.chat.id.toString()} className='hover:text-gray-200'>{props.chat.name}: {props.chat.count}</Link>
}

export default class Chats extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: []
    }
  }

  componentDidMount () {
    fetch('/api/chats')
      .then(response => response.json())
      .then(data => this.setState({ chats: data }))
  }

  render () {
    return (
      <div className='flex'>
        <div className='card mx-auto px-9'>
          <h2 className='text-center text-xl mb-4'>Каналы:</h2>
          <ul>
            {this.state.chats.map((chat) => (
              <li key={chat.id}><ChatLink chat={chat} /></li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
