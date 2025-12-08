import React, { useState } from 'react'
import TaskForm from './components/TaskForm.jsx'

export default function App() {
  const [created, setCreated] = useState(null)
  
  return (
    <main style={{padding:24, fontFamily:'system-ui'}}>
      <h1>HMCTS – Create Task</h1>
      <TaskForm onCreated={setCreated} />
      {created && (
        <section style={{marginTop:16}}>
          <h2>Task created</h2>
          <pre style={{background:'#f6f8fa', padding:12}}>
            {JSON.stringify(created, null, 2)}
          </pre>
        </section>
      )}
    </main>
  )
}