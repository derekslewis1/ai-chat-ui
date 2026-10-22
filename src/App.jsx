import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = {
        role: 'user',
        content: message
    }

    // Display the user's message immediately
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
        // Send the message to our Flask backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage.content
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Request failed')
        }

        // Display the response from Flask
        const assistantMessage = {
            role: 'assistant',
            content: data.response
        }

        setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
        console.error('Error:', error)

        setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Error connecting to the server.'
        }])
    } finally {
	setIsLoading(false)
    }
}	
	
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	return(

	<div className="app"> 

		<h1>Need Assistance?</h1>

		<div className="messages">
		{messages.map((msg,index) => (
			<div className={`message ${msg.role}`} key={index}>
				{msg.content}
			</div>
		))}
		{isLoading && (
    		<div className="message assistant loading">
      			<span />
      			<span />
      			<span />
    		</div>
  		)}
	</div>
		<form className="chat-box" onSubmit={handleSubmit}>
			<input
			type="text"
			placeholder="Enter a message..."
			value={message}
			onChange={(e) => setMessage(e.target.value)}/>

			<button type="submit">↑</button>
		</form>

	</div>

	)
 }

export default App
