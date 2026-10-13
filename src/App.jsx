import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

	function handleSubmit(e) {
		e.preventDefault()
		if(!message.trim()) return

		setMessages([...messages, message])
		setMessage('')
	}

	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	return(

	<div className="app"> 

		<h1>Need Assistance?</h1>

		<div className="messages">
		{messages.map((msg,index) => (
			<div className="message" key={index}>
				{msg}
			</div>
		))}
	</div>
		<form className="chat-box" onSubmit={handleSubmit}>
			<input
			type="text"
			plaeholder="Enter a message..."
			value={message}
			onChange={(e) => setMessage(e.target.value)}/>

			<button type="submit">↑</button>
		</form>

	</div>

	)
 }

export default App
