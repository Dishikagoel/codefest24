import React from 'react'

function Agent() {
  return (
    // Make a component that stays on the right of the screen
    <div style={{ position: 'fixed', right: 0, top: 0, width: 300, height: '100%', backgroundColor: 'lightgray', padding: 16 }}>
      <h2>Agent</h2>
      <p>Chat with the agent here</p>
    </div>
  )
}

export default Agent