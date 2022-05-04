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
            <p className='comingSoon'>Beta 1.0.1 is a minor version released on 14 May, 2022.</p>
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
            <p className='comingSoon'>Beta 1.0.0 is a major version released on 29 April, 2022.</p>

            <h4>Fundamentals</h4>
            <p>Your browser needs to support <a href='https://www.khronos.org/registry/webgl/specs/latest/2.0/'>WebGL2.0</a> to to open Beta 1.0.0. You can enter <a href='https://get.webgl.org/webgl2/'>this website</a> to check whether WebGL2.0 is enabled in your browser (if yes, you should see a spinning cube).</p>
            
            <h4>Ecosystem</h4>
            <ul>
              <li>@threejs – a cross-browser 3D JavaScript library</li>
              <li>@react-three/fiber – a React renderer for threejs</li>
              <li>@react-three/gltfjsx – turns GLTFs into JSX components</li>
              <li>@react-three/drei – useful helpers for react-three-fiber</li>
            </ul>
            </>}

            <h4>How to contribute</h4>
            <p>If you like this project, please consider helping out. All contributions are welcome as well as donations to Opencollective, or in crypto <span className='btc'>BTC: 12YperDkC531Dsmu43FLB98WwRXyxxDnoq</span>, <span className='eth'>ETH: 0xe329a597eda16261095261d4cccb7ba06a7ad1b8</span>.</p>
        </div>
    </div>
  )
}

export default Versions