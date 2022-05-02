
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import styled from 'styled-components'
import { RecoilRoot} from 'recoil'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Earth from './components/Earth'
import ISS from './components/models/ISS'
import TSS from './components/models/TSS'
import Mars from './components/Mars'
import Moon from './components/Moon'
import {GiMoonOrbit} from 'react-icons/gi'
import {BsPhoneLandscape} from 'react-icons/bs'
import Versions from './components/InfoBox/Versions'
// import  Landing  from './components/InfoBox/Landing';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`

function Loader() {
  const { progress } = useProgress()
  const prog = Math.floor(progress)
  return (
    <Html center>
      <div className='loadingContainer'>
        <GiMoonOrbit className='gmoLoading'/>
        <h1>The universe is loading...</h1>
        <p>At least it doesn't take 13.8 billion years :) </p>
        <p>{prog} % </p>

        <p className='landscape'>Please rotate your device to landscape <br/> for better interactivity <br/> <BsPhoneLandscape className='landscape'/></p>
      </div>
    </Html>)
}

function Animation() {
  return(
      <CanvasContainer>      
        <Canvas>
          <RecoilRoot>
            <Suspense fallback={<Loader/>}>
              <Earth />
              <Mars />
              <Moon />
              <ISS />
              <TSS />
            </Suspense>
            </RecoilRoot>
          </Canvas>
        </CanvasContainer>
  )
}

export default function App() {
        return (
          <Router>
            <Routes>
            <Route path='/' element={<Animation/>}/>
            <Route path='/docs' element={<Versions/>}/>
          </Routes>
       </Router>      
        )
}