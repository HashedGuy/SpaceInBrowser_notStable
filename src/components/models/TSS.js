import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei' 
import { useRecoilState, useRecoilValue } from 'recoil'
import { clickedCBState, focusCamera, stations } from '../globalState'
import { useFrame, extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Font from "../../assets/fontMedium.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import * as THREE from 'three'

extend({ TextGeometry })

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/tiangong_1/scene.gltf')

  const [activeObject, setObject] = useRecoilState(clickedCBState)
  const station = useRecoilValue(stations)
  const [camera, setCamera] = useRecoilState(focusCamera)
  const vec = new THREE.Vector3()

  const tssRef = useRef()
  const tssTextRef = useRef()

  let zRadius
  let xRadius
  let yRadius
  // activeObject==='LEO' ? xRadius= 3.85 : xRadius= 1.052
  // activeObject==='LEO' ? zRadius= 3.85 : zRadius= 1.052
  activeObject === '' ? (xRadius=0) : (activeObject === 'LEO') && (station==='') ? xRadius=3.85 : (activeObject === 'LEO') && (station!='') ? xRadius=4.2 : xRadius=1.052
  activeObject === '' ? (zRadius=0) : (activeObject === 'LEO') && (station==='') ? zRadius=3.85 : (activeObject === 'LEO') && (station!='') ? zRadius=4.2 : zRadius=1.052
  activeObject==='LEO' ? yRadius= -1.5 : yRadius= -.4

  useFrame(({ clock }) => {
    let elapsedTime
    {activeObject === 'LEO' ? (elapsedTime = clock.getElapsedTime() * .009) : (elapsedTime = clock.getElapsedTime() * .06)}
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    const y = yRadius* Math.cos(elapsedTime)
    tssRef.current.position.x = x;
    tssRef.current.position.z = z;
    tssRef.current.position.y = y;

  });

  useFrame(({ clock }) => {
    let elapsedTime
    {activeObject === 'LEO' ? (elapsedTime = clock.getElapsedTime() * .009) : (elapsedTime = clock.getElapsedTime() * .06)}
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    const y = yRadius* Math.cos(elapsedTime)
    tssTextRef.current.position.x = x;
    tssTextRef.current.position.z = z;
    tssTextRef.current.position.y = y  + .02;

  });

  useFrame(state => {
    if (camera==='tssInside') {
      state.camera.lookAt(tssRef.current.position.x, tssRef.current.position.y, tssRef.current.position.z)
      state.camera.position.lerp(vec.set(tssRef.current.position.x, tssRef.current.position.y, tssRef.current.position.z), .01)
    } else if (camera==='TSS') {
      state.camera.lookAt(tssTextRef.current.position)
      state.camera.position.lerp(vec.set(tssRef.current.position.x, tssRef.current.position.y - .2, tssRef.current.position.z ), .01)
    }
    return null
  })
  const font = new FontLoader().parse(Font);

  const textOptions = {
    font,
    size: ((activeObject==='LEO') && (camera!=='TSS')) || (activeObject==='earth') ? .04 : ((activeObject==='LEO') && (camera==='TSS')) ? .01 : 0,
    height: .003
  };
  

  return (
    <>
    <mesh
      ref={tssTextRef}
      position={[xRadius, yRadius, zRadius]}
      // onClick={()=>setCamera('TSS')}
    >
       <textGeometry attach='geometry' args={['    TSS', textOptions]} />
        <meshStandardMaterial attach='material' color={'white'} />
    </mesh>

    <mesh 
      scale={(activeObject==='LEO') || (activeObject==='earth') ? .001 : 0}
      position={[.7, .7, .7]} 
      ref={tssRef}
    >
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[57.97, 31.02, 61.66]} rotation={[Math.PI, Math.PI / 4, 2.8]} />
          <group position={[20, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cylinder01_01_-_Default_0'].geometry} material={materials['01_-_Default']} />
          </group>
          <group position={[20, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cone01_Material_#2_0'].geometry} material={nodes['Cone01_Material_#2_0'].material} />
          </group>
          <group rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cone02_Material_#2_0'].geometry} material={nodes['Cone02_Material_#2_0'].material} />
          </group>
          <group position={[-2.5, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cylinder02_Material_#2_0'].geometry} material={nodes['Cylinder02_Material_#2_0'].material} />
          </group>
          <group position={[25, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Tube01_02_-_Default_0'].geometry} material={materials['02_-_Default']} />
          </group>
          <group position={[25, 1.43, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Box01_07_-_Default_0'].geometry} material={nodes['Box01_07_-_Default_0'].material} />
          </group>
          <group position={[25, -0.78, -1.23]} rotation={[2.62, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Box02_07_-_Default_0'].geometry} material={nodes['Box02_07_-_Default_0'].material} />
          </group>
          <group position={[25, -0.79, 1.23]} rotation={[Math.PI / 6, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Box03_07_-_Default_0'].geometry} material={nodes['Box03_07_-_Default_0'].material} />
          </group>
          <group position={[24.5, 2.09, -2.09]} rotation={[-Math.PI / 4, 0, 0]}>
            <mesh geometry={nodes['Cylinder03_03_-_Default_0'].geometry} material={nodes['Cylinder03_03_-_Default_0'].material} />
          </group>
          <group position={[24.5, -2.09, 2.09]} rotation={[-Math.PI / 4, 0, 0]}>
            <mesh geometry={nodes['Cylinder04_03_-_Default_0'].geometry} material={nodes['Cylinder04_03_-_Default_0'].material} />
          </group>
          <group position={[24.5, 2.09, 2.09]} rotation={[Math.PI / 4, 0, 0]}>
            <mesh geometry={nodes['Cylinder05_03_-_Default_0'].geometry} material={nodes['Cylinder05_03_-_Default_0'].material} />
          </group>
          <group position={[24.5, -2.09, -2.09]} rotation={[Math.PI / 4, 0, 0]}>
            <mesh geometry={nodes['Cylinder06_03_-_Default_0'].geometry} material={nodes['Cylinder06_03_-_Default_0'].material} />
          </group>
          <group position={[-10.58, 0, 6.68]}>
            <mesh geometry={nodes['Loft01_09_-_Default_0'].geometry} material={nodes['Loft01_09_-_Default_0'].material} />
          </group>
          <group position={[-10.58, 0, -6.68]} rotation={[Math.PI, 0, 0]}>
            <mesh geometry={nodes['Loft02_09_-_Default_0'].geometry} material={nodes['Loft02_09_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, 10.59]}>
            <mesh geometry={nodes['Box04_08_-_Default_0'].geometry} material={nodes['Box04_08_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, 17.5]}>
            <mesh geometry={nodes['Box05_08_-_Default_0'].geometry} material={nodes['Box05_08_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, 24.39]}>
            <mesh geometry={nodes['Box06_08_-_Default_0'].geometry} material={nodes['Box06_08_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, 31.21]}>
            <mesh geometry={nodes['Box07_08_-_Default_0'].geometry} material={nodes['Box07_08_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, -24.31]}>
            <mesh geometry={nodes['Box08_08_-_Default_0'].geometry} material={nodes['Box08_08_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, -17.41]}>
            <mesh geometry={nodes['Box09_08_-_Default_0'].geometry} material={nodes['Box09_08_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, -10.59]}>
            <mesh geometry={nodes['Box10_08_-_Default_0'].geometry} material={nodes['Box10_08_-_Default_0'].material} />
          </group>
          <group position={[-10.62, -0.05, -31.22]}>
            <mesh geometry={nodes['Box11_08_-_Default_0'].geometry} material={nodes['Box11_08_-_Default_0'].material} />
          </group>
          <group position={[-20.1, 2.25, -2.25]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cone03_20_-_Default_0'].geometry} material={nodes['Cone03_20_-_Default_0'].material} />
          </group>
          <group position={[-20.1, 2.25, 2.25]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cone04_20_-_Default_0'].geometry} material={nodes['Cone04_20_-_Default_0'].material} />
          </group>
          <group position={[-20.1, -2.25, 2.25]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cone05_20_-_Default_0'].geometry} material={nodes['Cone05_20_-_Default_0'].material} />
          </group>
          <group position={[-20.1, -2.25, -2.25]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <mesh geometry={nodes['Cone06_20_-_Default_0'].geometry} material={nodes['Cone06_20_-_Default_0'].material} />
          </group>
          <group position={[-11.84, 6, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes['Box13_14_-_Default_0'].geometry} material={materials['14_-_Default']} />
          </group>
          <group position={[-11.54, 5.74, 0.66]}>
            <mesh geometry={nodes['Cylinder07_03_-_Default_0'].geometry} material={nodes['Cylinder07_03_-_Default_0'].material} />
          </group>
          <group position={[-12.14, 5.74, -0.66]}>
            <mesh geometry={nodes['Cylinder08_03_-_Default_0'].geometry} material={nodes['Cylinder08_03_-_Default_0'].material} />
          </group>
          <group position={[-11.54, 5.74, -0.66]}>
            <mesh geometry={nodes['Cylinder09_03_-_Default_0'].geometry} material={nodes['Cylinder09_03_-_Default_0'].material} />
          </group>
          <group position={[-12.14, 5.74, 0.66]}>
            <mesh geometry={nodes['Cylinder10_03_-_Default_0'].geometry} material={nodes['Cylinder10_03_-_Default_0'].material} />
          </group>
          <group position={[-11.85, 6.24, -0.43]}>
            <mesh geometry={nodes['Cylinder11_03_-_Default_0'].geometry} material={nodes['Cylinder11_03_-_Default_0'].material} />
          </group>
          <group position={[-11.85, 6.24, 0.43]}>
            <mesh geometry={nodes['Cylinder12_03_-_Default_0'].geometry} material={nodes['Cylinder12_03_-_Default_0'].material} />
          </group>
          <group position={[-11.9, 7.75, 0]}>
            <mesh geometry={nodes['Sphere01_13_-_Default_0'].geometry} material={materials['13_-_Default']} />
          </group>
        </group>
      </group>
    </group>
    </mesh>
    </>
  )
}

useGLTF.preload('/scene.gltf')
