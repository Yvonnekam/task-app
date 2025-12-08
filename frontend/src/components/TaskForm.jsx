import React, { useState } from 'react'

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('todo')
  const [dueLocal, setDueLocal] = useState('')
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const iso = new Date(dueLocal).toISOString()
      const res = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: description || undefined,
          status,
          dueDateTime: iso
        })
      })
      const body = await res.json()
      if (!res.ok) {
        setError(body.message || 'Error creating task')
      } else {
        onCreated(body)
        setTitle(''); setDescription(''); setStatus('todo'); setDueLocal('')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:420}}>
      <label>Title
        <input value={title} onChange={e=>setTitle(e.target.value)} required />
      </label>
      <label>Description
        <textarea value={description} onChange={e=>setDescription(e.target.value)} />
      </label>
      <label>Status
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </label>
      <label>Due date/time
        <input type="datetime-local" value={dueLocal} onChange={e=>setDueLocal(e.target.value)} required />
      </label>
      <button type="submit">Create task</button>
      {error && <p style={{color:'crimson'}}>{error}</p>}
    </form>
  )
}