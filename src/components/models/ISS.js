import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { clickedCBState, focusCamera, stations, speedStation } from '../globalState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useFrame, extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Font from "../../assets/fontMedium.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import * as THREE from 'three'

extend({ TextGeometry })

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/iss/scene.gltf')

  const [activeObject, setObject] = useRecoilState(clickedCBState)
  const station = useRecoilValue(stations)
  const [cameraFocus, setCamera] = useRecoilState(focusCamera)
  const [speed, setSpeed] = useRecoilState(speedStation)
  const vec = new THREE.Vector3()

  const issRef = useRef()
  const issTextRef = useRef()
  let zRadius
  let xRadius
  let yRadius
  activeObject === '' ? (xRadius=0) : (activeObject === 'LEO') && (station==='') ? xRadius=3.8 : (activeObject === 'LEO') && (station!='') ? xRadius=4.2 : xRadius=1.05
  activeObject === '' ? (zRadius=0) : (activeObject === 'LEO') && (station==='') ? zRadius=3.8 : (activeObject === 'LEO') && (station!='') ? zRadius=4.2 : zRadius=1.05
  activeObject === '' ? (yRadius=0) : activeObject === 'LEO' ? yRadius=.2 : yRadius=.3

  useFrame(({ clock }) => {
    let elapsedTime
   {speed==='increasedSpeed' ? (elapsedTime = clock.getElapsedTime() * .11) : (elapsedTime = clock.getElapsedTime() * .05)}
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    const y = yRadius* Math.cos(elapsedTime)
    issRef.current.position.x = x;
    issRef.current.position.z = z;
    issRef.current.position.y = y;

  });

 useFrame(({ clock }) => {
  if (cameraFocus!=='issInside') {
    let elapsedTime
   {speed==='increasedSpeed' ? (elapsedTime = clock.getElapsedTime() * .11) : (elapsedTime = clock.getElapsedTime() * .07)}
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    const y = yRadius* Math.cos(elapsedTime)
    issTextRef.current.position.x = x;
    issTextRef.current.position.z = z;
    issTextRef.current.position.y = y + .02;
  } return null
  })
 

  useFrame(state => {
    if (cameraFocus==='ISS') {
      state.camera.lookAt(issRef.current.position)
      state.camera.position.lerp(vec.set(issRef.current.position.x, issRef.current.position.y - .2, issRef.current.position.z ), .01)
    } else if (cameraFocus==='issInside') {
      state.camera.lookAt(issRef.current.position.x, issRef.current.position.y, issRef.current.position.z)
      state.camera.position.lerp(vec.set(issRef.current.position.x, issRef.current.position.y, issRef.current.position.z), .01)
    }
    return null
  })

  const font = new FontLoader().parse(Font);

  const textOptions = {
    font,
    size: ((activeObject==='LEO') && (cameraFocus!=='ISS')) || (activeObject==='earth') ? .04 : ((activeObject==='LEO') && (cameraFocus==='ISS')) ? .01 : 0,
    height: .003
  };

  console.log(cameraFocus)
  
  return (
    <>

    {cameraFocus==='issInside' ? '' :
    <mesh
      ref={issTextRef}
      position={[xRadius, yRadius, zRadius]}
    >
       <textGeometry attach='geometry' args={['    ISS', textOptions]} />
        <meshStandardMaterial attach='material' color={'white'} />
    </mesh>}
    
    <mesh 
      position={[2.12, 0, 2.12]} 
      scale={
        (activeObject==='mars') || (activeObject==='moon') || (activeObject==='')? 0 : 
        (activeObject==='LEO') && (cameraFocus!=='issInside') ? 0.007 :
        (activeObject==='LEO') && (cameraFocus==='issInside') ? 0
        : .005} 
      ref={issRef}
    >
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-2.84, 4.08, 6.46]} rotation={[0, 0.83, -0.28]} />
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issmod_issmod_with_Tex_0.geometry} material={materials.issmod_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh919_white_0.geometry} material={nodes.mesh919_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh918_white_0.geometry} material={nodes.mesh918_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh917_white_0.geometry} material={nodes.mesh917_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh916_white_0.geometry} material={nodes.mesh916_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh915_white_0.geometry} material={nodes.mesh915_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh914_material04_0.geometry} material={nodes.mesh914_material04_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh913_Material2_0.geometry} material={nodes.mesh913_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh912_Material2_0.geometry} material={nodes.mesh912_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh911_Material2_0.geometry} material={nodes.mesh911_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh910_Material2_0.geometry} material={nodes.mesh910_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh909_white_0.geometry} material={nodes.mesh909_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh908_white_0.geometry} material={nodes.mesh908_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh907_Material1_0.geometry} material={nodes.mesh907_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh906_Material3_0.geometry} material={nodes.mesh906_Material3_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh905_white_0.geometry} material={nodes.mesh905_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh904_Material2_0.geometry} material={nodes.mesh904_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh903_Material3_0.geometry} material={nodes.mesh903_Material3_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh902_Material3_0.geometry} material={nodes.mesh902_Material3_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh901_material04_0.geometry} material={nodes.mesh901_material04_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh900_material04_0.geometry} material={nodes.mesh900_material04_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh899_Material2_0.geometry} material={nodes.mesh899_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh898_Material2_0.geometry} material={nodes.mesh898_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh897_Material2_0.geometry} material={nodes.mesh897_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh896_Material2_0.geometry} material={nodes.mesh896_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh895_Material2_0.geometry} material={nodes.mesh895_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh894_Material2_0.geometry} material={nodes.mesh894_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh893_white_0.geometry} material={nodes.mesh893_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh892_white_0.geometry} material={nodes.mesh892_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh891_white_0.geometry} material={nodes.mesh891_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh890_white_0.geometry} material={nodes.mesh890_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh889_white_0.geometry} material={nodes.mesh889_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh888_material04_0.geometry} material={nodes.mesh888_material04_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh887_Material2_0.geometry} material={nodes.mesh887_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh886_Material2_0.geometry} material={nodes.mesh886_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh885_Material2_0.geometry} material={nodes.mesh885_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh884_Material2_0.geometry} material={nodes.mesh884_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh883_white_0.geometry} material={nodes.mesh883_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh882_white_0.geometry} material={nodes.mesh882_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh881_Material1_0.geometry} material={nodes.mesh881_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh880_Material3_0.geometry} material={nodes.mesh880_Material3_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh879_white_0.geometry} material={nodes.mesh879_white_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh878_Material1_0.geometry} material={nodes.mesh878_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh877_Material1_0.geometry} material={nodes.mesh877_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh876_Material1_0.geometry} material={nodes.mesh876_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh875_Material1_0.geometry} material={nodes.mesh875_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh874_bluebg_0.geometry} material={nodes.mesh874_bluebg_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh873_Material1_0.geometry} material={nodes.mesh873_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh872_Material1_0.geometry} material={nodes.mesh872_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh871_Material1_0.geometry} material={nodes.mesh871_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh870_Material1_0.geometry} material={nodes.mesh870_Material1_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh869_bluebg_0.geometry} material={nodes.mesh869_bluebg_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh868_Material2_0.geometry} material={nodes.mesh868_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh867_Material3_0.geometry} material={nodes.mesh867_Material3_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh866_Material3_0.geometry} material={nodes.mesh866_Material3_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh865_material04_0.geometry} material={nodes.mesh865_material04_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh864_material04_0.geometry} material={nodes.mesh864_material04_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh863_Material2_0.geometry} material={nodes.mesh863_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh862_Material2_0.geometry} material={nodes.mesh862_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh861_Material2_0.geometry} material={nodes.mesh861_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh860_Material2_0.geometry} material={nodes.mesh860_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh859_Material2_0.geometry} material={nodes.mesh859_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mesh858_Material2_0.geometry} material={nodes.mesh858_Material2_0.material} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_isscov_isscover_with_Te_0.geometry} material={materials.isscover_with_Te} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mplm_issle_issleo_with_Tex_0.geometry} material={materials.issleo_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.mplm_issus_issusaf_with_1_0.geometry} material={materials.issusaf_with_1} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes['iss_issus1_19_-_Default_0'].geometry} material={materials['19_-_Default']} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issred_Default_0.geometry} material={materials.Default} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh
              geometry={nodes.iss_issku4_issusa_with_Tex_0.geometry}
              material={nodes.iss_issku4_issusa_with_Tex_0.material}
            />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh
              geometry={nodes.iss_issp20_issred_with_Tex_0.geometry}
              material={nodes.iss_issp20_issred_with_Tex_0.material}
            />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh
              geometry={nodes.iss_issku3_issusa_with_Tex_0.geometry}
              material={nodes.iss_issku3_issusa_with_Tex_0.material}
            />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh
              geometry={nodes.iss_issp21_issred_with_Tex_0.geometry}
              material={nodes.iss_issp21_issred_with_Tex_0.material}
            />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_iss_un_iss_un_with_Tex_0.geometry} material={materials.iss_un_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_isshan_isshand_with_Tex_0.geometry} material={materials.isshand_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issco0_isscov2_with_Tex_0.geometry} material={materials.isscov2_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_graple_graple_with_Tex_0.geometry} material={materials.graple_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_questc_questcov_with_Te_0.geometry} material={materials.questcov_with_Te} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issins_issins_with_Tex_0.geometry} material={materials.issins_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_metalc_metalcon_with_Te_0.geometry} material={materials.metalcon_with_Te} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_isscup_isscup_with_Tex_0.geometry} material={materials.isscup_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issbs__issbs_with_Tex__0.geometry} material={materials.issbs_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issesa_issesa_with_Tex_0.geometry} material={materials.issesa_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issrad_issrad_with_Tex_0.geometry} material={materials.issrad_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_nasda__nasda_with_Tex__0.geometry} material={materials.nasda_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issusa_issusaf_with_Tex_0.geometry} material={materials.issusaf_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issmb__issmb_with_Tex__0.geometry} material={materials.issmb_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issbs0_issbso2_with_Tex_0.geometry} material={materials.issbso2_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issbso_issbso_with_Tex_0.geometry} material={materials.issbso_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh
              geometry={nodes.iss_issku0_issku2_with_Tex_0.geometry}
              material={nodes.iss_issku0_issku2_with_Tex_0.material}
            />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh
              geometry={nodes.iss_issku2_issku2_with_Tex_0.geometry}
              material={nodes.iss_issku2_issku2_with_Tex_0.material}
            />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issdis_issdish_with_Tex_0.geometry} material={materials.issdish_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issku1_issku1_with_Tex_0.geometry} material={materials.issku1_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issku__issku_with_Tex__0.geometry} material={materials.issku_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issb4__issb4_with_Tex__0.geometry} material={materials.issb4_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_isssol_isssolar_with_Te_0.geometry} material={materials.isssolar_with_Te} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issb2__issb2_with_Tex__0.geometry} material={materials.issb2_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_isszmo_isszmod_with_Tex_0.geometry} material={materials.isszmod_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issb3__issb3_with_Tex__0.geometry} material={materials.issb3_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issdot_issdot_with_Tex_0.geometry} material={materials.issdot_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issp2__issp2_with_Tex__0.geometry} material={materials.issp2_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_issb_7_issb_with_Tex_I_0.geometry} material={materials.issb_with_Tex_I} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_isspan_isspanel_with_Te_0.geometry} material={materials.isspanel_with_Te} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_d_ring_d_ring_with_Tex_0.geometry} material={materials.d_ring_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_iss_d0_iss_dcs_with_Tex_0.geometry} material={materials.iss_dcs_with_Tex} />
          </group>
          <group position={[7.01, 0, -3.77]}>
            <mesh geometry={nodes.iss_iss_dc_iss_dc_with_Tex_0.geometry} material={materials.iss_dc_with_Tex} />
          </group>
        </group>
      </group>
    </group>
    </mesh>

    
    </>
  )
}

useGLTF.preload('/scene.gltf')
