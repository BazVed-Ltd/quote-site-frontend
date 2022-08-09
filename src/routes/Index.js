import { Outlet } from 'react-router-dom'

export default function Index () {
  return (
    <div>
      <div className='flex'>
        <div className='m-auto mt-9'>
          <h1 className='text-center mb-9'>
            <span className='text-5xl'>СЬЛРЖАЛСЧ</span>
            <br />
            <span>Цитатник</span>
          </h1>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
