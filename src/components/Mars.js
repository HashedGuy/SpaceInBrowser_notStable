import { useFrame, useLoader } from '@react-three/fiber';
import React, {useRef} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import MarsMap from "../assets/compressed/2k_mars(1).jpg"
import { useRecoilState } from 'recoil';
import { clickedCBState, focusCamera } from './globalState';

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }points.push(points[0]);const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="red" linewidth={.1} />
    </line>
  );
}

export function Mars(props) {
  const [marsMap] = useLoader(
    TextureLoader,
    [MarsMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)
  const [cameraFocus, setCamera] = useRecoilState(focusCamera)
  const vec = new THREE.Vector3()

 
  const marsRef = useRef()
  let xRadius
  let zRadius

  activeObject === 'mars' ? xRadius=0
  : activeObject === 'moon' ? xRadius=-22
  : activeObject === 'LEO' ? xRadius=-28 
    : xRadius=18
  
  activeObject === 'mars' ? zRadius=0
  : activeObject === 'earth' ? zRadius= 14 
    : activeObject === '' ? zRadius=12 
    :zRadius=15

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * .004;
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    marsRef.current.position.x = x;
    marsRef.current.position.z = z;
  });

  useFrame(state => {
    if (cameraFocus==='mars') {
      state.camera.lookAt(marsRef.current.position)
      state.camera.position.lerp(vec.set(marsRef.current.position.x, marsRef.current.position.y, marsRef.current.position.z + 5), .01)
    } 
    return null
  })

  return (
    <>
      <mesh 
        ref={marsRef} 
        scale={
          (activeObject === 'earth') || (activeObject === 'moon') ? .1 
          :
          activeObject === 'LEO' ? .05
          :
          activeObject === 'mars' ? 4
          : 1}
          onDoubleClick={()=>setObject('mars')}
      >
        <sphereBufferGeometry args={[0.50, 32, 32]} />
        <meshStandardMaterial
          map={marsMap}
          metalness={0.4}
          roughness={0.7}
        />
        
      </mesh>
      {activeObject === '' ? <Ecliptic xRadius={xRadius} zRadius={zRadius}/> : ''}
    
    </>
  );
}
export default Mars;
