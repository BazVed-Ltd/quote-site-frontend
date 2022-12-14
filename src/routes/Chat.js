import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Attachment(props) {
  const attachment = props.attachment
  const type = props.attachment.type
  if (type === 'photo' || type === 'doc' || type === 'graffiti') {
    return <img className='object-scale-down w-full h-full align-middle' src={'/' + attachment.filepath} />
  } else if (type === 'sticker') {
    return <img className='object-scale-down w-40 h-40 align-middle' src={attachment.filepath} />
  }
  else if (type === 'audio_message') {
    return (
      <audio controls>
        <source src={attachment.filepath} type="audio/mp3" />
      </audio>
    )
  }
  return <span>Unknow type</span>
}

function Attachments(props) {

  return (
    <div className="flex flex-wrap gap-1">
      {props.attachments.map(attachment => {
        return (<li className='relative rounded'>
          <Attachment attachment={attachment} />
        </li>)
      })}
    </div>
  )
}

function ForwaredMessage(props) {
  const fromBy = props.users.find((user) => user.id === props.message.from_id)
  const fromId = props.message.from_id

  let fromUrl = 'https://vk.com/';
  if (+fromId > 0) {
    fromUrl += 'id' + fromId
  } else {
    fromUrl += 'club' + -fromId
  }

  let needRenderMessageHeader, date;
  if (
    props.prevMessage
    && props.prevMessage.from_id === props.message.from_id
    && props.message.fwd_messages.length === 0
  ) {
    needRenderMessageHeader = false
  } else {
    needRenderMessageHeader = true
  }

  return (
    <div>
      {needRenderMessageHeader
        ? <a className='text-blue-400' href={fromUrl}>{fromBy.name}</a>
        : null}
      <p className='mb-4'>{props.message.text}</p>
      {props.message.attachments.length === 0
        ? null
        : <div className='mb-4'><Attachments attachments={props.message.attachments} /></div>}
      {props.message.fwd_messages.length === 0
        ? null
        : <div className='border-l border-zinc-600 pl-4 mb-4'><ForwaredMessages messages={props.message.fwd_messages} users={props.users} /></div>}
    </div>
  )
}

function ForwaredMessages(props) {
  return (
    <ul>
      {props.messages.map((message, index, messages) => {
        let prevIndex = index - 1
        let prevMessage = prevIndex >= 0 ? messages[prevIndex] : null
        return <li key={index}><ForwaredMessage message={message} users={props.users} prevMessage={prevMessage} /></li>
      })}
    </ul>
  )
}

function Quote(props) {
  const savedBy = props.users.find((user) => user.id === props.quote.from_id)

  const savedByUrl = 'https://vk.com/id' + props.quote.from_id

  return (
    <div className='card mb-5'>
      <div className='flex border-b border-zinc-700 pb-2 mb-3'>
        <div>#{props.quote.id}</div>
        <div className='ml-auto'>
          {new Date(props.quote.date * 1000).toLocaleString('ru-RU')}
        </div>
      </div>

      <div>
        <ForwaredMessages messages={props.quote.fwd_messages} users={props.users} />
      </div>

      <div className='flex'>
        <div className='ml-auto'>
          ????????????????&#160;
          <a className='text-blue-400' href={savedByUrl}>{savedBy.name}</a>&#160;
          ???? ????????&#160;
          <span className='text-blue-400'>??{props.chat.name}??</span>
        </div>
      </div>
    </div>
  )
}

export default function Chat(props) {
  const params = useParams()
  const [state, setState] = useState({ quotes: [] })

  useEffect(() => {
    fetch(`/api/chats/${params.chatId}`)
      .then(response => response.json())
      .then(data => setState({ chat: data.chat, quotes: data.quotes, users: data.users }))
  }, [params.chatId])

  return (
    <ul className='flex flex-col max-w-lg px-3 sm:px-0 mx-auto'>
      {state.quotes.map(quote => {
        return <li key={quote.id}><Quote quote={quote} users={state.users} chat={state.chat} /></li>
      })}
    </ul>
  )
}
