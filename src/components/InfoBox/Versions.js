import React, { useState } from 'react'
import './versions.css'

function Versions() {
    const [version, setVersion] = useState('1.0.0')
  return (
    <div className='versionsContainer'>
        <div className='versionsTable'>
            <p className='majorRelease'><a onClick={()=>setVersion('1.0.0')}>Beta 1.0.0</a></p>
            <p><a onClick={()=>setVersion('1.0.1')}>Beta 1.0.1</a></p>
            <p className='pendingVersion'  onClick={()=>setVersion('1.0.2')}><a>Beta 1.0.2</a></p>
        </div>
        <div className='versionsInfo'>
            {version==='1.0.1' ? 
            <>
             <h2 className='titleVersion'>Beta 1.0.1</h2>
            <p className='comingSoon'>Beta 1.0.1 is a minor version released as Beta version on 14 May, 2022.</p>
            </>
            :
            version==='1.0.2' ? 
            <>
             <h2 className='titleVersion'>Beta 1.0.2</h2>
            <p className='comingSoon'>Beta 1.0.2 is a minor version coming on 29 May, 2022.</p>
            </>
            :
            <>
            <h2 className='titleVersion'>Beta 1.0.0</h2>
            <p className='comingSoon'>Beta 1.0.0 is a major version released as Beta version on 29 April, 2022.</p>
            </>}
        </div>
    </div>
  )
}

export default Versions