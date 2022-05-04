import React, { useState } from 'react'
import './versions.css'
import logoTransparent from '../../assets/logo2.png'
import { Link } from 'react-router-dom'

function Versions() {
    const [version, setVersion] = useState('1.0.0')
  return (
    <div className='versionsContainer'>
        <div className='versionsTable'>
          <div>
            <p className='majorRelease'><a onClick={()=>setVersion('1.0.0')}>Beta 1.0.0</a></p>
            <p><a onClick={()=>setVersion('1.0.1')}>Beta 1.0.1</a></p>
            <p className='pendingVersion'  onClick={()=>setVersion('1.0.2')}><a>Beta 1.0.2</a></p>
          </div>
          <Link to={'/'}><img src={logoTransparent} className='docLogo'/></Link>
        </div>
       
        <div className='versionsInfo'>
            {version==='1.0.1' ? 
            <>
             <h2 className='titleVersion'>Beta 1.0.1</h2>
            <p className='comingSoon'>Beta 1.0.1 is a minor (not stable) version expected to be released on 14 May, 2022.</p>

            <h4>What to expect</h4>
            <ul className='expectations'>
              <li>Actual demo 'traveling' in space rather than 'teleporting' from one celestial body to another;</li>
              <li>Size, distance corrections to celestial bodies.</li>
            </ul>
            {/* <p>Actual 'traveling' in space rather than 'teleporting' from one celestial body to another. Size, distance corrections to celestial bodies.</p> */}
            </>
            :
            version==='1.0.2' ? 
            <>
             <h2 className='titleVersion'>Beta 1.0.2</h2>
            <p className='comingSoon'>Beta 1.0.2 is a minor (stable) version coming on 29 May, 2022.</p>

            <h4>What to expect</h4>
            <ul className='expectations'>
              <li>Actual 'travel' in space;</li>
              <li>Venus added;</li>
              <li>SpaceX Crew Dragon added;</li>
              <li>Demo control of the space stations.</li>
            </ul>
            </>
            :
            <>
            <h2 className='titleVersion'>Beta 1.0.0</h2>
            <p className='comingSoon'>Beta 1.0.0 is a major version released on 29 April, 2022.</p>

            <h4>Fundamentals</h4>
            <p>Your browser needs to support <a href='https://www.khronos.org/registry/webgl/specs/latest/2.0/'>WebGL2.0</a> to to open Beta 1.0.0. You can enter <a href='https://get.webgl.org/webgl2/'>this website</a> to check whether WebGL2.0 is enabled in your browser (if yes, you should see a spinning cube).</p>
            
            <h4>Ecosystem</h4>
            <ul>
              <li>@reactjs - a JavaScript library for building user interfaces</li>
              <li>@threejs – a cross-browser 3D JavaScript library</li>
              <li>@react-three/fiber – a React renderer for threejs</li>
              <li>@react-three/gltfjsx – turns GLTFs into JSX components</li>
              <li>@react-three/drei – useful helpers for react-three-fiber</li>
            </ul>
            </>}

            <h4>How to contribute</h4>
            <p>If you like this project, please consider helping out. All contributions are welcome as well as donations to <a href='https://www.patreon.com/spaceinbrowser' target='_blank'>Patreon</a>, or in crypto:</p>
            <ul className='expectations'>
              <li><span className='btc'>BTC: 12YperDkC531Dsmu43FLB98WwRXyxxDnoq</span></li>
              <li><span className='eth'>ETH: 0xe329a597eda16261095261d4cccb7ba06a7ad1b8</span></li>
            </ul>  
        </div>
    </div>
  )
}

export default Versions