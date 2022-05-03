import { useFrame, useLoader,  extend } from '@react-three/fiber';
import React, {useRef} from 'react';
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Font from "../assets/fontMedium.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

import { TextureLoader } from 'three';
import MoonMap from "../assets/2k_moon.jpeg"
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedCBState, focusCamera, showActions } from './globalState';

extend({ TextGeometry })

function Ecliptic({ xRadius = 1, zRadius = 1, yRadius = 1 }) {
  const activeObject = useRecoilValue(clickedCBState)
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }points.push(points[0]);const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={activeObject===''?"black":"gray"} linewidth={.1} />
    </line>
  );
}

export function Moon(props) {
  const [moonMap] = useLoader(
    TextureLoader,
    [MoonMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)
  const [cameraFocus, setCamera] = useRecoilState(focusCamera)
  const vec = new THREE.Vector3()

  const moonRef = useRef()
  let zRadius
  let xRadius
  let yRadius
  activeObject === '' ? (xRadius=5.5) 
    : activeObject === 'earth' ? (xRadius=6)
    : activeObject === 'mars' ? (xRadius=-3)
    : (xRadius=0)
  activeObject === '' ? (zRadius=4.5) 
    : activeObject === 'earth' ? (zRadius=5.5)
    : activeObject === 'mars' ? (zRadius=0) 
    : (zRadius=-0)
  activeObject === '' ? (yRadius=0) 
    : activeObject === 'earth' ? (yRadius=0) 
    : (yRadius=0)


  useFrame(({ clock }) => {
    let elapsedTime
    activeObject === 'mars'?
    (elapsedTime = clock.getElapsedTime() * 0) 
    : (elapsedTime = clock.getElapsedTime() * 0.006)
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    const y = yRadius* Math.cos(elapsedTime)
    moonRef.current.position.x = x;
    moonRef.current.position.z = z;
    moonRef.current.position.y = y;
  });

  const showAction = useRecoilValue(showActions)

  useFrame(state => {
    if (cameraFocus==='moon') {
      state.camera.lookAt(moonRef.current.position)
      state.camera.position.lerp(vec.set(moonRef.current.position.x, moonRef.current.position.y, moonRef.current.position.z + 5), .01)
    } else if (cameraFocus==='apollo11') {
      state.camera.lookAt(posApollo11.x,posApollo11.y,posApollo11.z)
      state.camera.position.lerp(vec.set(posApollo11.x + 1,posApollo11.y,posApollo11.z), .01)
    } else if (cameraFocus==='apollo12') {
      state.camera.lookAt(posApollo12.x,posApollo12.y,posApollo12.z)
      state.camera.position.lerp(vec.set(posApollo12.x + 1,posApollo12.y,posApollo12.z), .01)
    } else if (cameraFocus==='apollo14') {
      state.camera.lookAt(posApollo14.x,posApollo14.y,posApollo14.z)
      state.camera.position.lerp(vec.set(posApollo14.x + 1,posApollo14.y,posApollo14.z), .01)
    } else if (cameraFocus==='apollo15') {
      state.camera.lookAt(posApollo15.x,posApollo15.y,posApollo15.z)
      state.camera.position.lerp(vec.set(posApollo15.x + 1,posApollo15.y,posApollo15.z), .01)
    } else if (cameraFocus==='apollo16') {
      state.camera.lookAt(posApollo16.x,posApollo16.y,posApollo16.z)
      state.camera.position.lerp(vec.set(posApollo16.x + 1,posApollo16.y,posApollo16.z), .01)
    } else if (cameraFocus==='apollo17') {
      state.camera.lookAt(posApollo17.x,posApollo17.y,posApollo17.z)
      state.camera.position.lerp(vec.set(posApollo17.x + 1,posApollo17.y,posApollo17.z), .01)
    } else if (cameraFocus==='artemis') {
      state.camera.lookAt(posArtemis3.x,posArtemis3.y,posArtemis3.z)
      state.camera.position.lerp(vec.set(posArtemis3.x + 1,posArtemis3.y,posArtemis3.z), .01)
    }
    return null
  })



  function calcPosFromLatLngRad(lat, lng) {
    var phi = (90 - lat)*(Math.PI/180)
    var theta = (lng+180)*(Math.PI/180)
    let x = -(Math.sin(phi)*Math.cos(theta))*2.5
    let z = (Math.sin(phi)*Math.sin(theta)) *2.5
    let y = (Math.cos(phi))*2.5
    return {x, y, z}
  }

  const font = new FontLoader().parse(Font);

  const textOptions = {
    font,
    size: .06,
    height: .009
  };

  let pointApollo11 = {
    lat:0.67345,
    lng:	23.47307
  }

  let pointApollo12 = {
    lat:-3.0098,
    lng:	-23.4249
  }

  let pointApollo14 = {
    lat:-3.64417,
    lng:	-17.47865
  }

  let pointApollo15 = {
    lat:26.13341,
    lng:	3.62850
  }

  let pointApollo16 = {
    lat:-8.9759,
    lng:	15.4986
  }

  let pointApollo17 = {
    lat:20.1923,
    lng:	30.7655
  }

  let pointArtemis3 = {
    lat:-65.1923,
    lng:	15.7655
  }

  let posApollo11 = calcPosFromLatLngRad(pointApollo11.lat, pointApollo11.lng)
  let posApollo12 = calcPosFromLatLngRad(pointApollo12.lat, pointApollo12.lng)
  let posApollo14 = calcPosFromLatLngRad(pointApollo14.lat, pointApollo14.lng)
  let posApollo15 = calcPosFromLatLngRad(pointApollo15.lat, pointApollo15.lng)
  let posApollo16 = calcPosFromLatLngRad(pointApollo16.lat, pointApollo16.lng)
  let posApollo17 = calcPosFromLatLngRad(pointApollo17.lat, pointApollo17.lng)
  let posArtemis3 = calcPosFromLatLngRad(pointArtemis3.lat, pointArtemis3.lng)

  const sphere = (x) => new THREE.SphereGeometry(x, 36, 36)

  return (
    <>
      <mesh 
        ref={moonRef}
        geometry={sphere(0.25)}
        scale={
          activeObject === '' ? 1 
          :
          activeObject === 'earth' ? 1.3 
          :
          activeObject === 'mars' ? .1
          :
          activeObject === 'LEO' ? 0
          : 10
        }
        onDoubleClick={()=>setObject('moon')}
        
      >
        <meshPhongMaterial
          map={moonMap}
          opacity={1}
          depthWrite={true}
          transparent={false}
          side={THREE.DoubleSide}
        />       
      </mesh>

      <mesh
        geometry={showAction==='apollo11' ? sphere(0.03) : sphere(0)}
        position={[posApollo11.x,posApollo11.y,posApollo11.z]}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo11.x,posApollo11.y,posApollo11.z]}
      >
        <textGeometry attach='geometry' args={showAction==='apollo11' ? ['   <-- Apollo 11', textOptions] : ['', textOptions]}  />
        <meshStandardMaterial attach='material' color={'white'} />
      </mesh>

      <mesh
        geometry={showAction==='apollo12' ? sphere(0.03) : sphere(0)}
        position={[posApollo12.x,posApollo12.y,posApollo12.z]}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo12.x,posApollo12.y,posApollo12.z]}
      >
        <textGeometry attach='geometry' args={showAction==='apollo12' ? ['   <-- Apollo 12', textOptions] : ['', textOptions]} />
        <meshStandardMaterial attach='material' color={'white'} />
      </mesh>

      <mesh
        geometry={showAction==='apollo14' ? sphere(0.03) : sphere(0)}
        position={[posApollo14.x,posApollo14.y,posApollo14.z]}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo14.x,posApollo14.y,posApollo14.z]}
      >
        <textGeometry attach='geometry' args={showAction==='apollo14' ? ['   <-- Apollo 14', textOptions] : ['', textOptions]}  />
        <meshStandardMaterial attach='material' color={'white'} />
      </mesh>

      <mesh
        geometry={showAction==='apollo15' ? sphere(0.03) : sphere(0)}
        position={[posApollo15.x,posApollo15.y,posApollo15.z]}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo15.x,posApollo15.y,posApollo15.z]}
      >
        <textGeometry attach='geometry' args={showAction==='apollo15' ? ['   <-- Apollo 15', textOptions] : ['', textOptions]}  />
        <meshStandardMaterial attach='material' color={'white'} />
      </mesh>

      <mesh
        geometry={showAction==='apollo16' ? sphere(0.03) : sphere(0)}
        position={[posApollo16.x,posApollo16.y,posApollo16.z]}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo16.x,posApollo16.y,posApollo16.z]}
      >
        <textGeometry attach='geometry' args={showAction==='apollo16' ? ['   <-- Apollo 16', textOptions] : ['', textOptions]}  />
        <meshStandardMaterial attach='material' color={'white'} />
      </mesh>

      <mesh
        geometry={showAction==='apollo17' ? sphere(0.03) : sphere(0)}
        position={[posApollo17.x,posApollo17.y,posApollo17.z]}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo17.x,posApollo17.y,posApollo17.z]}
      >
        <textGeometry attach='geometry' args={showAction==='apollo17' ? ['   <-- Apollo 17', textOptions] : ['', textOptions]}  />
        <meshStandardMaterial attach='material' color={'white'} />
      </mesh>

      <mesh
        geometry={showAction==='artemis' ? sphere(0.03) : sphere(0)}
        position={[posArtemis3.x,posArtemis3.y,posArtemis3.z]}
      >
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
        position={[posArtemis3.x,posArtemis3.y,posArtemis3.z]}
      >
        <textGeometry attach='geometry' args={showAction==='artemis' ? ['   <-- Artemis 3', textOptions] : ['', textOptions]}  />
        <meshStandardMaterial attach='material' color={'white'} />
      </mesh>
      {activeObject === 'mars' ? '' : <Ecliptic xRadius={xRadius} zRadius={zRadius}/>}
    </>
  );
}
export default Moon;
