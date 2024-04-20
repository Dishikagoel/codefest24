import React from 'react'
import BasicPopover from './BasicPopover'


function Agent() {
  return (
    // Make a component that stays on the right of the screen
    <div style={{ position: 'fixed', right: 0, top: 0, width: 300, height: '100%', padding: 16 }}>
        {/* Make a popup which hovers over the avatar in material ui */}
        <BasicPopover invokePopUp/>
      {/* Make an avatar in circle at the bottom right */}
        <div style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'black', margin: '0 auto', position: 'absolute', right: 10, bottom: 50 }}>
            <img src="https://via.placeholder.com/50" alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </div>
    </div>
  )
}

export default Agent