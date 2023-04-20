import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function HerbForm() {

  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <>
    <div className="borderme">
      <p>herbs will go here</p>
    </div>
    </>
  )
}

export default HerbForm