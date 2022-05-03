import { Html } from '@react-three/drei'
import React, { useEffect, useState, useRef } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { clickedCBState, closedAudioG, focusCamera, launchpads, lights, showActions, stations } from '../globalState'
import {Link, Route, Routes} from 'react-router-dom'

import Whistler from '../../assets/sounds/Whistler.wav'
import MartianWind from '../../assets/sounds/martianWind.mp3'
import BgSound from '../../assets/sounds/SpaceTrash.mp3'
import BgSound2 from '../../assets/sounds/Interstaller.mp3'
import Kayla from '../../assets/astros/kay.png'
import Matt from '../../assets/astros/matt.png'
import Raja from '../../assets/astros/raja.png'
import Tom from '../../assets/astros/tom.png'
import Sergey from '../../assets/astros/sergey.png'
import Oleg from '../../assets/astros/oleg.png'
import Denis from '../../assets/astros/denis.png'
import Wang from '../../assets/astros/wang2.png'
import Ye from '../../assets/astros/ye.png'
import Zhai from '../../assets/astros/zhai.png'
import Robert from '../../assets/astros/robert.png'
import Jessica from '../../assets/astros/jessica.png'
import Kjell from '../../assets/astros/kjell.png'
import Samantha from '../../assets/astros/samantha.png'
import logoTransparent from '../../assets/logo2.png'

import audiostyles from "../audiostyles.css";
import { FaPlay, FaPause } from "react-icons/fa"
import {GiMoonOrbit} from 'react-icons/gi'
import {BsLightbulb, BsLightbulbOff, BsFillMouse2Fill, BsHeadphones, BsFillVolumeUpFill, BsFillVolumeMuteFill} from 'react-icons/bs'
import {AiOutlineCloseCircle, AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import ReactPlayer from 'react-player'
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'
import ModalImage from "react-modal-image-responsive";
import { Camera } from 'three'



export function Landing() {
    const [activeObject, setObject] = useRecoilState(clickedCBState)
    const [showAction, setAction] = useRecoilState(showActions)
    const [activeButton, setButton] = useState(false)
    const [disabledSpan, setSpan] = useState(true)
    const [activeAudioPlayer, setAudioPlayer] = useState('')
    const [activeLight, setLight] = useRecoilState(lights)
    const [activeLaunchPad, setLaunchPad] = useRecoilState(launchpads)
    const [activeStation, setStation] = useRecoilState(stations)
    const [closed, setClose] = useState(false)
    const [closedAudio, setCloseAudio] = useRecoilState(closedAudioG)
    const [isPlaying, setIsPlaying] = useState(false);
    const [song, setSong] = useState('')
    const [camera, setCamera] = useRecoilState(focusCamera)

    const audioPlayerBg = useRef()

    const togglePlayPauseBg = () => {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      if (!prevValue) {
        audioPlayerBg.current.play();
      } else {
        audioPlayerBg.current.pause();
      }
    }
  
    const AudioPlayer = () => {

      // state
      const [isPlaying, setIsPlaying] = useState(false);
      const [duration, setDuration] = useState(0);
      const [currentTime, setCurrentTime] = useState(0);
    
      // references
      const audioPlayer = useRef();   // reference our audio component
      const progressBar = useRef();   // reference our progress bar
      const animationRef = useRef();  // reference the animation
    
      useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
      }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
    
      const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
      }
    
      const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
          audioPlayer.current.play();
          animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
          audioPlayer.current.pause();
          cancelAnimationFrame(animationRef.current);
        }
      }
    
      const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
    
      const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
      }
    
      const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
      }
    
      const onLoadedMetadata = () => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
      };
      return (
        <div className="audioPlayer">
          <audio 
            onLoadedMetadata={onLoadedMetadata} 
            ref={audioPlayer} 
            src={
              (activeObject==='moon') && (showAction==='')? "https://www.nasa.gov/mp3/590325main_ringtone_kennedy_WeChoose.mp3" :
              (activeObject==='moon') && (showAction==='apollo11') ? "https://images-assets.nasa.gov/audio/Apollo11Highlights/Apollo11Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo12') ? "https://images-assets.nasa.gov/audio/Apollo12Highlights/Apollo12Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo14') ? "https://images-assets.nasa.gov/audio/Apollo14Highlights/Apollo14Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo15') ? "https://images-assets.nasa.gov/audio/Apollo15Highlights/Apollo15Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo16') ? "https://images-assets.nasa.gov/audio/Apollo16Highlights/Apollo16Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo17') ? "https://images-assets.nasa.gov/audio/Apollo17Highlights/Apollo17Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='artemis') ? "https://images-assets.nasa.gov/audio/Ep116_Apollo%20vs%20ARTEMIS/Ep116_Apollo%20vs%20ARTEMIS~128k.mp3" :
              (activeObject==='LEO') ? Whistler :
              (activeObject==='mars') ? MartianWind
              : {BgSound}} 
            preload="metadata">
            
        </audio>
          <button onClick={togglePlayPause} className="playPause">
            {isPlaying ? <FaPause style={{"fontSize":"50%"}}/> : <FaPlay className="play" />}
          </button>
          <div className="currentTime">{calculateTime(currentTime)}</div>
          <div>
            <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
          </div>
          <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
      )
    }

    return(
        <Html wrapperClass="annotation" >
        <div className='infoBox'>
          <div className='infoBorders'>
          {activeObject==='' ? '' : 
          <>
            <p className="logoTitle" 
               onClick={()=>{
                setObject('')
                setLight('')
                setAction('')
                setLaunchPad('')}}>
             <img 
              src={logoTransparent} 
              className='logoSmallImg'
              onClick={()=>{
                setObject('')
                setLight('')
                setAction('')
                setLaunchPad('')}}
            />
            </p>
          </>}
          {
          activeObject === 'earth' ? <h1>Earth</h1> 
          : activeObject === 'moon' ? <h1>Moon</h1>
          : activeObject === 'mars' ? <h1>Mars</h1>
          : activeObject === 'LEO' ? <h1>Low Earth Orbit</h1>
          : 
          <>
            <img 
              src={logoTransparent} 
              className='logoImg'
              onClick={()=>{
                setObject('')
                setLight('')
                setAction('')
                setLaunchPad('')}}
            />
           <a href='https://sib1.netlify.app/docs' target='_blank'><p className='versionName' style={{}}>Beta Version 1.0.1</p></a>
          </>            }
         
          
          <h5>{
            activeObject === 'earth' ? 'Earth, our home planet, is a world unlike any other. It is the only place in the known universe confirmed to host life.' 
            : activeObject === 'moon' ? "Gateway to Mars! We've already been here but we're coming again soon."
            : activeObject === 'mars' ? "The planet we're colonizing next. A dusty, cold, desert world with a very thin atmosphere." 
            : activeObject === 'LEO' ? "This is where the most of the crew missions happening."
            : <>The exploration of being multiplanetary species starts with Mars. <br/><br/> However, everything we need to be able to do on the Mars, we must first do on the Moon.</>}
          </h5>

          {activeObject === '' ? 
          <>
          
          </>
          : ''}
          {activeObject === 'earth' ? <a className='home-btn dleo' onClick={()=>setObject('LEO')}>Discover Low Earth Orbit</a>
          : ''

          }

          {activeObject === 'LEO' ? 
          <div className='viewDiv'>
            {(activeLaunchPad!='') || (showAction==='spaceStation') ? '' : <a className={(showAction==='launchpad') || (showAction==='crewPad') || (showAction==='satellitePad') ? 'home-btn launchpad' : 'home-btn'} 
              onClick={()=>{
                setAction('launchpad') 
                setLight('ambient')
                setCloseAudio(true)}}>
              Rocket launch sites
            </a>}
            {(showAction==='') || (showAction==='spaceStation') && (activeStation==='') ? 
              <a className={showAction==='spaceStation'?'home-btn launchpad':'home-btn'} 
                 onClick={() => {
                   setAction('spaceStation')
                   setCloseAudio(true)}}>Space stations</a> : ''}
            {showAction==='spaceStation' ? 
              <>
              {activeStation==='' ? 
              <>
              <p>The space station is a spacecraft, which support a human crew to stay in space for a long time. It is also known as orbital stations as it circles the Earth.</p>
              <p>Currently, two active space stations serve as a base for people in space. You can see them travelling around the earth (in <span style={{"color":"yellow"}}>--</span> and <span style={{"color":"red"}}>--</span> orbits).</p>
              </> : ''}
              {activeStation==='TSS' ? '' : 
                <a 
                  className={activeStation==='ISS' ? 'home-btn launchpad' : 'home-btn'} 
                  onClick={()=>{
                    setStation('ISS')
                    setCamera('ISS')
                    }}>
                      International Space Station</a>}
              {activeStation==='ISS' ? 
              <>
                <p>The largest and most sophisticated of space station is the International Space Station (ISS).</p> 
                <ModalImage
                  small={'https://ik.imagekit.io/74qyv5bswgr/iss_2Y2vU27Mh.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1649069033413'}
                  large={'https://ik.imagekit.io/74qyv5bswgr/iss_2Y2vU27Mh.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1649069033413'}
                  alt="ISS"
                  className='infoPic'
                  hideDownload
                  hideZoom
                  imageBackgroundColor="transparent"
                />
                
                <p className='credits'><em>Credit: NASA Image and Video</em></p>
                <p>Since the first module was launched into low Earth orbit in 1998, the ISS has grown with modular additions from the principal space agencies involved in building and operating the space station: NASA, Roscosmos, ESA, JAXA and CSA. To date, 237 astronauts from 18 countries have visited the ISS.</p>
                <h5 style={{"color":"gray"}}>Who's On Station?</h5>
                <div style={{"display":"flex", "flexDirection":"column"}}>
                  <div className='bioGroups'>
                    <ModalImage
                      small={Matt}
                      large={Matt}
                      alt="Matthias Maurer"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Raja}
                      large={Raja}
                      alt="Raja Chari"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Tom}
                      large={Tom}
                      alt="Tom Marshbur"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Kayla}
                      large={Kayla}
                      alt="Kayla Barron"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                  </div>
                  <div className='bioGroups'>
                    <ModalImage
                      small={Oleg}
                      large={Oleg}
                      alt="Oleg Artemyev"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Denis}
                      large={Denis}
                      alt="Denis Matveev"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Sergey}
                      large={Sergey}
                      alt="Sergey Korsakov"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                  </div>
                  <div className='bioGroups'>
                    <ModalImage
                      small={Robert}
                      large={Robert}
                      alt="Robert Hines"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Jessica}
                      large={Jessica}
                      alt="Jessica Watkins"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Kjell}
                      large={Kjell}
                      alt="Kjell Lindgren"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Samantha}
                      large={Samantha}
                      alt="Samantha Cristoforetti"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                  </div>
                  <p className='hoverName'>Click to see their names</p>
                </div>
              </>
              :''}
              {activeStation==='ISS' ? '' : 
                <a 
                  className={activeStation==='TSS' ? 'home-btn launchpad' : 'home-btn'}  
                  onClick={()=>{
                    setStation('TSS')
                    setCamera('TSS')
                    }}>
                    Tiangong Space Station</a>}
              {activeStation==='' ? <a className='home-btn axiom'>Axiom Station <br/><span className='credits'>Coming soon</span></a> : ''}
              {activeStation==='TSS' ? 
              <>
                <p>Tiangong (Chinese: 天宫, 'Palace in the Sky') is a space station being constructed by China in low Earth orbit between 340 and 450 km (210 and 280 mi) above the surface.</p>
                <ModalImage
                  small={'https://ik.imagekit.io/74qyv5bswgr/tss_9bzokhBix.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649069096674'}
                  large={'https://ik.imagekit.io/74qyv5bswgr/tss_9bzokhBix.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649069096674'}
                  alt="TSS"
                  className='infoPic'
                  hideDownload
                  hideZoom
                  imageBackgroundColor="transparent"
                />
                <p className='credits'><em>Credit: Shujianyang</em></p>
                <p>The first module, the Tianhe ("Harmony of the Heavens") core module, was launched on 29 April 2021, followed by multiple crewed and uncrewed missions and two more modules to be launched by 2022. The research conducted on the station will improve researchers' ability to conduct science experiments in space, beyond the duration and capacity offered by China's existing space laboratories.</p>
                <h5 style={{"color":"gray"}}>Who was On Station?</h5>
                <div style={{"display":"flex", "flexDirection":"column"}}>
                  <div className='bioGroups'>
                    <ModalImage
                      small={Zhai}
                      large={Zhai}
                      alt="Zhai Zhigang"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Wang}
                      large={Wang}
                      alt="Wang Yaping"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                    <ModalImage
                      small={Ye}
                      large={Ye}
                      alt="Ye Guangfu"
                      className='bioPic'
                      hideDownload
                      hideZoom
                      imageBackgroundColor="transparent"
                    />
                  </div>
                  <p className='hoverName'>Click to see their names</p>
                </div>
              </>
              :''}
            </> : ''}
           
            
            {(showAction==='launchpad') || ((showAction==='crewPad') && (activeLaunchPad==='')) || ((showAction==='satellitePad') && (activeLaunchPad==='')) ? 
            <>
            <p>To get to space, humankind relies on key launch sites scattered around the world.</p>
            <p>Dozens of sites around the world host spaceports, the specialized facilities built to send and receive rocket-powered vehicles on flights into the cosmos.</p>
            
            <a className='home-btn' onClick={()=>setAction('crewPad')}>Show sites with crew launch</a>
            {showAction==='crewPad' ? 
              <>
                <p>Green circles &#128994; on the surface of the Earth show the rocket launch sites with confirmed crew mission launches. Some of them provide <span style={{"color": "red"}}>LIVE</span> streams!</p>
              </>
            : ''}
            <a 
              className='home-btn' 
              onClick={()=>{
                setCloseAudio(true)
                setAction('satellitePad')}}
            >Show sites with satellite launch</a>
            {showAction==='satellitePad' ? 
              <>
                <p>Red circles 	&#128308; on the surface of the Earth show the rocket launch sites with confirmed satellite launches only (without crew mission launches).</p>
              </>
              : ''}
            </>

            :''}
            {(activeStation==='ISS') || (activeStation==='TSS') ? 
              <a 
              onClick={()=>{
                    setStation('')
                    setCloseAudio(true)
                    setCamera('')
                  }} 
              className="home-btn">Close &#x2715;</a>:''}
            {(showAction==='') || (activeLaunchPad!='') || (activeStation!='') ? '' : 
              <a className='home-btn' 
                 onClick={()=>{
                   setAction('')
                   setLight('')
                  }}
              >&#x2190; Back</a>} 

            {activeLaunchPad==='' ? '' : <a className='home-btn launchpad'>{activeLaunchPad}</a>}

            {activeLaunchPad==='KSS' ? 
            <>
            <p>Kennedy Space Center, one of 10 NASA field centers, is a premier multi-user spaceport with more than 90 private-sector partners and nearly 250 partnership agreements.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
              <IKImage path="/VAB_and_SLS_vWeAvJ4pC.jpeg" className='infoPic'/>  
            </IKContext>
            <p className='credits'><em>Credit: NASA Image and Video</em></p>
            <p>Although Kennedy is the NASA's main launch site, the center also is home to facilities that research and develop innovative solutions that government and commercial space ventures need for working and living on the surfaces of the Moon and other bodies in our solar system.</p>
            <h5>Next mission:</h5> 
            <p className="nextMission">SpaceX Falcon 9 Starlink 4-16</p>
            </>
            :
            activeLaunchPad==='CCSFS' ? 
            <>
            <p>Cape Canaveral Space Force Station is an installation of the United States Space Force's Space Launch Delta 45, located on Cape Canaveral in Brevard County, Florida.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
              <IKImage path="/CCSFS_klnuRorxI.jpeg" className='infoPic'/>  
            </IKContext>
            <p className='credits'><em>Credit: Patrick Space Force Base</em></p>
            <p>A number of American space exploration pioneers were launched from CCSFS, including the first U.S. Earth satellite in 1958, first U.S. astronaut (1961), first U.S. astronaut in orbit (1962), first two-man U.S. spacecraft (1965), first U.S. unmanned lunar landing (1966), and first three-man U.S. spacecraft (1968).</p>
            </>
            :
            activeLaunchPad==='Starbase' ? 
            <>
            <p>Starbase is a private rocket production facility, test site, and spaceport constructed by SpaceX, located at Boca Chica approximately 32 km (20 mi) east of Brownsville, Texas, on the US Gulf Coast.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
              <IKImage path="/USA_-_Texas_-_Boca_Chica_-_Starbase__51287072615__iZdM4e3T2.jpeg" className='infoPic'/>  
            </IKContext>
          
            <p className='credits'><em>Credit: Alexander Hatley from Spring, Texas, USA</em></p>
            <p>The launch site was originally intended to support launches of the Falcon 9 and Falcon Heavy launch vehicles as well as "a variety of reusable suborbital launch vehicles", but in early 2018, SpaceX announced a change of plans, stating that the launch site would be used exclusively for SpaceX's next-generation launch vehicle, Starship.</p>
            </>
            :
            activeLaunchPad==='SLC-4/VSFB' ? 
            <>
            <p>Space Launch Complex 4 (SLC-4) is a launch and landing site at Vandenberg Space Force Base, California, U.S.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Iridium-1_Mission__31450835954__TOxEeRQSk.jpeg" className='infoPic'/>  
                </IKContext>
            <p className='credits'><em>Credit: SpaceX</em></p>
            <p>It has two pads, both of which are used by SpaceX for Falcon 9, one for launch operations, and other as Landing Zone 4 (LZ-4) for SpaceX landings.</p>
            </>
            :
            activeLaunchPad==='GSS' ? 
            <>
             <p>The Guiana Space Centre (French: Centre spatial guyanais; CSG), also called Europe's Spaceport, is an European spaceport to the northwest of Kourou in French Guiana, a overseas territory of France in South America.</p>
             <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Ensemble_de_lancement_Vega_IaYTz2mFXF.jpeg" className='infoPic'/>  
                </IKContext>
             <p className='credits'><em>Credit: Camille Gévaudan</em></p>
             <p>The European Space Agency (ESA), the European Union Agency for the Space Programme (EUSPA), the French space agency CNES (National Centre for Space Studies), and the commercial companies Arianespace and Azercosmos conduct launches from Kourou. It was used by the ESA to send supplies to the International Space Station using the Automated Transfer Vehicle.</p>
            </>
            :
            activeLaunchPad==='BSS' ? 
            <>
             <p>The Baikonur Cosmodrome (Kazakh: Байқоңыр ғарыш айлағы) is a spaceport in an area of southern Kazakhstan leased to Russia. </p>
             <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
              <IKImage path="/soyuz_5kt71bONq.jpeg" className='infoPic'/>  
            </IKContext>
             <p className='credits'><em>Credit: NASA KSC Media Archive</em></p>
             <p>The Cosmodrome is the world's first spaceport for orbital and human launches and the largest (in area) operational space launch facility. All crewed Russian spaceflights are launched from Baikonur.</p>
             <h5>Next mission:</h5> 
             <p className="nextMission">Progress MS-20</p>
            </>
              :
            activeLaunchPad==='SDSC' ? 
            <>
            <p>Satish Dhawan Space Centre is a rocket launch centre (spaceport) operated by Indian Space Research Organisation (ISRO). It is located in Sriharikota in Andhra Pradesh.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/PSLV_C45_EMISAT_campaign_23_JmiBV0Zod.jpeg" className='infoPic'/>  
                </IKContext>
            <p className='credits'><em>Credit: Indian Space Research Organisation</em></p>
            <p>The  Centre has  the  facilities for  solid propellant  processing,  static  testing  of  solid  motors,  launch  vehicle  integration  and  launch operations, range operations comprising telemetry, tracking and command network and mission control centre.</p>
            </>
             :
            activeLaunchPad==='WSLC' ? 
            <>
             <p>The Wenchang Space Launch Site (Chinese: 文昌航天发射场[1][2]), located in Wenchang, Hainan, China, is a rocket launch site — one of the two spacecraft launch sites of Xichang Satellite Launch Center.</p>
             <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/tianwen_A1iielWrO.jpeg" className='infoPic'/>  
                </IKContext>
             <p className='credits'><em>Credit: China News Service</em></p>
             <p>It has been specially selected for its low latitude, which is only 19° north of the equator, which will allow for an increase in payload necessary for launching China's future space station. It is capable of launching the Long March 5, currently the most powerful Chinese rocket.</p>
            </>
            :
            activeLaunchPad==='TSC' ? 
            <>
             <p>The Tanegashima Space Center (種子島宇宙センター, Tanegashima Uchū Sentā) is the largest rocket-launch complex in Japan. It is located on the southeast coast of Tanegashima island.</p>
             <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/osaki_cdKgKyIx0.jpeg" className='infoPic'/>  
                </IKContext>
             <p className='credits'><em>Credit: ウニウニ </em></p>
             <p>It was established in 1969 when the National Space Development Agency of Japan (NASDA) was formed, and is now run by JAXA. The activities that take place at TNSC include assembly, testing, launching, and tracking satellites, as well as rocket engine firing tests.</p>
            </>
            :
            activeLaunchPad==='USC' ? 
            <>
              <p>The Uchinoura Space Center (内之浦宇宙空間観測所, Uchinoura Uchū Kūkan Kansokusho) is a space launch facility in the Japanese town of Kimotsuki, Kagoshima Prefecture. </p>
              <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/usc__QW5nlJ_oz.jpeg" className='infoPic'/>  
                </IKContext>
              <p className='credits'><em>Credit: NASA Image and Video</em></p>
              <p>All of Japan's scientific satellites were launched from Uchinoura prior to the M-V launch vehicles being decommissioned in 2006. It continues to be used for suborbital launches, and has also been used for the Epsilon orbital launch vehicle. Additionally, the center has antennas for communication with interplanetary space probes.</p>
            </>
            :
            activeLaunchPad==='Semnan' ? 
            <>
               <p>Semnan Space Center (Persian:پایگاه فضایی سمنان) is the premier Iranian Space Center, located 50 km southeast of the city of Semnan in the north of the country.</p>
               <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/iran_MuTq68S_D.jpeg" className='infoPic'/>  
                </IKContext>
               <p className='credits'><em>Credit: Tasnim News Agency</em></p>
               <p>The spaceport comprises two launch pads: an older, medium-sized launch pad with a collapsible umbilical tower, and a newer, larger launch pad with a mobile gantry tower.</p>
            </>
            :
            activeLaunchPad==='Palmachim' ? 
            <>
                <p>The Palmachim Airbase (Hebrew: בָּסִיס חֵיל-הַאֲוִויר פַּלְמַחִים) is an Israeli military facility and spaceport located near the cities of Rishon LeZion and Yavne on the Mediterranean coast. </p>
                <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/isr_P1laiaRLz1.jpeg" className='infoPic'/>  
                </IKContext>
                <p className='credits'><em>Credit: Flash 90</em></p>
                <p>Palmachim is used to launch the Shavit space launch vehicle into retrograde orbit by launching over the Mediterranean, acting as Israel's primary spaceport. Palmachim is also used to test ballistic missiles, such as the Jericho.</p>
            </>
            :
            activeLaunchPad==='Yasny' ? 
            <>
            <p>Yasny cosmodrome is located in a military airbase, northwest of the village of Dombarovsky, near Yasny in Russia's Orenburg Oblast.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/yasny_xccSUm8Ff.jpeg" className='infoPic'/>  
                </IKContext>
            <p className='credits'><em>Credit: ISC Kosmotras</em></p>
            <p>The civilian launches are operated by the Russian Air Force on behalf of the launcher's operator, Russian/Ukrainian consortium Kosmotras. Kosmotras has constructed additional facilities necessary for commercial satellite launch operations, including clean room integration facilities.</p>
            </>
            :
            activeLaunchPad==='JSLC' ? 
            <>
            <p>Jiuquan Satellite Launch Center (Chinese: 酒泉卫星发射中心) is a Chinese space vehicle launch facility (spaceport) located in the Gobi Desert, Inner Mongolia. </p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
              <IKImage path="/JCLA_bzntudH90.jpeg" className='infoPic'/>  
            </IKContext>
            <p className='credits'><em>Credit: Xinhuanet</em></p>
            <p>The center covers 2800 km² and may have housing for as many as 20,000 people. The facilities and launch support equipment were likely modelled on Soviet counterparts and the Soviet Union likely provided technical support to Jiuquan.</p>
            </>
            :
            activeLaunchPad==='Vostochny' ? 
            <>
            <p>The Vostochny Cosmodrome (Russian: Космодром Восточный) is a Russian spaceport (still partly under construction) above the 51st parallel north in the Amur Oblast, in the Russian Far East.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/vostochny_rEnB3lwC8.jpeg" className='infoPic'/>  
                </IKContext>
            <p className='credits'><em>Credit: Владислав Ларкин</em></p>
            <p>It is intended to reduce Russia's dependency on the Baikonur Cosmodrome in Kazakhstan. The first launch took place on 28 April 2016 at 02:01 UTC. As of 1 July 2021, eight launch attempts have been made with seven successes.</p>
            </>
            :
            activeLaunchPad==='TSLC' ? 
            <>
            <p>The Taiyuan Satellite Launch Center also known as Base 25 (Chinese: 二十五基地), is a space and defense launch facility (spaceport) located in Kelan County, Xinzhou, Shanxi Province.</p>
            <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Taiyuan_1601_Satellite_Launch_Site_Y3i8QVdrN.jpeg" className='infoPic'/>  
                </IKContext>
            <p className='credits'><em>Credit: 燕雁 </em></p>
            <p>The site is primarily used to launch meteorological satellites, Earth resource satellites and scientific satellites on Long March launch vehicles into Sun-synchronous orbits.</p> 
            </>
             :
             activeLaunchPad==='Sohae' ? 
             <>
             <p>Sohae Satellite Launching Station (Korean: 서해위성발사장; Hanja: 西海衛星發射場) is a rocket launching site in Tongch'ang-ri, Cholsan County, North Pyongan Province, North Korea.</p>
             <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/nk_Xk9VF2gVS.jpeg" className='infoPic'/>  
                </IKContext>
             <p className='credits'><em>Credit: KCNA </em></p>
             <p>It was the site for the 13 April 2012 launch of the North Korean satellite Kwangmyŏngsŏng-3, which was launched to celebrate the 100th anniversary of the birth of Kim Il-Sung. The rocket launch failed, but on 12 December of the same year Kwangmyŏngsŏng-3 Unit 2 was successfully launched and brought into Earth orbit.</p> 
             </>
              :
              activeLaunchPad==='Naro' ? 
              <>
              <p>The Naro Space Center is a South Korean spaceport in South Jeolla's Goheung County, operated by the state-run Korea Aerospace Research Institute.</p>
              <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/KSLV-II-suborbital-test-vehicle_tPmoKQ89J.jpeg" className='infoPic'/>  
                </IKContext>
              <p className='credits'><em>Credit: Korea Aerospace Research Institute </em></p>
              <p>It includes two launch pads, a control tower, rocket assembly and test facilities, facilities for satellite control testing and assembly, a media center, an electric power station, a space experience hall and a landing field. It has supported 5 launches including the KSLV-II launch in 2021, and will support SSLV launches in 2025.</p> 
              </>
               :
               activeLaunchPad==='XSLC' ? 
               <>
               <p>The Xichang Satellite Launch Center (XSLC), also known as the Xichang Space Center, is a spaceport of China. It is located in Zeyuan Town (泽远镇) in Sichuan.</p>
               <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Xichang_launch_center_4_3kA0y2AMf.jpeg" className='infoPic'/>  
                </IKContext>
               <p className='credits'><em>Credit: CGWIC </em></p>
               <p>The facility became operational in 1984 and is used to launch numerous civil, scientific, and military payloads annually. It is notable as the site of Sino-European space cooperation, with the launch of the first of two Double Star scientific satellites in December 2003.</p> 
               </>
               :
               activeLaunchPad==='RocketLab' ? 
               <>
               <p>Rocket Lab Launch Complex 1 (also known as Mahia Launch Complex or Spaceport) is a commercial spaceport located close to Ahuriri Point at the southern tip of Māhia Peninsula, on the east coast of New Zealand's North Island.</p>
               <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Rocket_Lab_Launch_Complex_1__Sept_2016__ydOJVsOFkA.jpeg" className='infoPic'/>  
                </IKContext>
               <p className='credits'><em>Credit: Rodney Allen  </em></p>
               <p>It is owned and operated by private spaceflight company Rocket Lab and supports launches of the company's Electron rocket for CubeSat nanosatellites. </p> 
               </>
               :
               activeLaunchPad==='PSC' ? 
               <>
               <p>The Pacific Spaceport Complex – Alaska, formerly known as the Kodiak Launch Complex (KLC), is a dual-use commercial and military spaceport for sub-orbital and orbital launch vehicles.</p>
               <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/474963main-tower-picture-3008x2000-1521646940_7fQHwv_J_.jpeg" className='infoPic'/>  
                </IKContext>
               <p className='credits'><em>Credit: ALASKA AEROSPACE CORPORATION </em></p>
               <p>The spaceport has two launch pads with a mission control center that includes 64 workstations with high-speed communications and data links. There is a clean room for preparing satellites for launch, a fully enclosed 17-story-tall rocket assembly building and two independent range and telemetry systems.</p> 
               </>
               :
               activeLaunchPad==='MARS' ? 
               <>
               <p>The Mid-Atlantic Regional Spaceport is a commercial space launch facility located at the southern tip of NASA's Wallops Flight Facility on Wallops Island in Virginia, United States.</p>
               <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/MARS_4QK1tzOSC.jpeg" className='infoPic'/>  
                </IKContext>
               <p className='credits'><em>Credit: NASA Wallops Flight Facility  </em></p>
               <p>The Mid-Atlantic Regional Spaceport has three active launch pads. In October 2018, Rocket Lab announced that it had selected MARS as its second launch site, called Rocket Lab Launch Complex-2. The company began construction in February 2019, together with the Virginia Commercial Space Flight Authority (Virginia Space).</p> 
               </>

            :''}

            {activeLaunchPad != '' ? 
              <a 
                onClick={()=>{
                  setLaunchPad('')
                  setCloseAudio(true)}} className="home-btn">Close &#x2715;</a> : ''}
          </div> : ''}
            
          </div>
          <div className='addInfo'>
            {(activeObject === 'earth') ? <a className='home-btn inActive population'>Population: 7,762 billion<br/><em className='credits'>Credits: World Bank, 2020</em></a>
            : activeObject === 'moon' ? 
              <a className={showAction===''?"home-btn inActive population" : "hidden-btn"} onClick={()=> setButton(!activeButton)}>
                  Population: 0 (12)
                  <br/>
                  <em className='credits'>Credit: NASA</em>
              </a>
            : activeObject === 'mars' ? <a className='home-btn population'>Population: 0</a>
            : ''}

            
            <div className='populationInfo'>
            {(activeObject === 'moon') ? 
            <>
              {showAction === '' ? 
              <p>There's nobody currently living on the Moon but...as part of the Apollo program by NASA, 24 astronauts have flown to the Moon during nine missions between December 1968 and December 1972. During six successful two-man landing missions, 12 men walked on the lunar surface.</p>
              :''}
              <ul>
                <li>
                  <a 
                    className={showAction==='apollo11'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} 
                    onClick={()=>{
                      setAction('apollo11')
                      setCamera('apollo11')
                      }}>Apollo 11</a></li>
                <li>
                  <a 
                    className={showAction==='apollo12'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} 
                    onClick={()=>{
                      setAction('apollo12')
                      setCamera('apollo12')
                    }}>Apollo 12</a></li>
                <li>
                  <a 
                    className={showAction==='apollo14'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} 
                    onClick={()=>{
                      setAction('apollo14')
                      setCamera('apollo14')  
                    }}>Apollo 14</a></li>
                <li>
                  <a 
                    className={showAction==='apollo15'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} 
                    onClick={()=>{
                      setAction('apollo15')
                      setCamera('apollo15')
                      }}>Apollo 15</a></li>
                <li>
                  <a 
                    className={showAction==='apollo16'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} 
                    onClick={()=>{
                      setAction('apollo16')
                      setCamera('apollo16')  
                    }}>Apollo 16</a></li>
                <li>
                  <a 
                    className={showAction==='apollo17'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} 
                    onClick={()=>{
                      setAction('apollo17')
                      setCamera('apollo17')  
                    }}>Apollo 17</a></li>
                <li>
                  <a 
                    className={showAction==='artemis'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} 
                    onClick={()=>{
                      setAction('artemis')
                      setCamera('artemis')  
                    }}>Artemis III</a></li>
              </ul>

              {showAction === 'apollo11' ? 
                <>
                <p>Apollo 11 (July 16–24, 1969) was the American spaceflight that first landed humans on the Moon. </p> 
                <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Aldrin_Apollo_11_original_ycH08Gxy4.jpeg" className='infoPic'/>  
                </IKContext>
                <p className='credits'><em>Credit: NASA Image and Video</em></p>
                <p>Commander Neil Armstrong and lunar module pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969, at 20:17 UTC, and Armstrong became the first person to step onto the Moon's surface six hours and 39 minutes later, on July 21 at 02:56 UTC. Aldrin joined him 19 minutes later, and they spent about two and a quarter hours together exploring the site they had named Tranquility Base upon landing.</p>
                
                </>
              : showAction === 'apollo12' ? 
                <>
                  <p>Apollo 12 (November 14 – 24, 1969) was the sixth crewed flight in the United States Apollo program and the second to land on the Moon.</p>
                  <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                    <IKImage path="/Surveyor_3-Apollo_12_vGA6dZIFF.jpeg" className='infoPic'/>  
                  </IKContext>
                  <p className='credits'><em>Credit:NASA Image and Video</em></p>
                  <p>It was launched on November 14, 1969, from the Kennedy Space Center, Florida. Commander Charles "Pete" Conrad and Lunar Module Pilot Alan L. Bean performed just over one day and seven hours of lunar surface activity while Command Module Pilot Richard F. Gordon remained in lunar orbit.</p>
                </>
              : showAction === 'apollo14' ? 
              <>
                <p>Apollo 14 (January 31, 1971 – February 9, 1971) was the eighth crewed mission in the United States Apollo program, the third to land on the Moon, and the first to land in the lunar highlands. </p>
                <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Apollo_14_Shepard_nN-skDi91.jpeg" className='infoPic'/>  
                </IKContext>
                <p className='credits'><em>Credit:NASA Image and Video</em></p>
                <p>It was the last of the "H missions", landings at specific sites of scientific interest on the Moon for two-day stays with two lunar givehicular activities (EVAs or moonwalks).</p>
              </>
              : showAction === 'apollo15' ? 
              <>
                <p>Apollo 15 (July 26 – August 7, 1971) was the ninth crewed mission in the United States' Apollo program and the fourth to land on the Moon. </p>
                <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/AS15-88-11866_-_Apollo_15_flag__rover__LM__Irwin_-_restoration1_Sr6q02sR-.jpeg" className='infoPic'/>  
                </IKContext>
                <p className='credits'><em>Credit:NASA Image and Video</em></p>
                <p> It was the first J mission, with a longer stay on the Moon and a greater focus on science than earlier landings. Apollo 15 saw the first use of the Lunar Roving Vehicle.</p>
                
              </>
              : showAction === 'apollo16' ? 
              <>
                <p>Apollo 16 (April 16 – 27, 1972) was the tenth crewed mission in the United States Apollo space program, administered by NASA, and the fifth and next-to-last to land on the Moon.</p>
                <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/John_W._Young_on_the_Moon_643917BPyg.jpg" className='infoPic'/>  
                </IKContext>
                <p className='credits'><em>Credit:NASA Image and Video</em></p>
                <p>It was the second of Apollo's "J missions", with an extended stay on the lunar surface, a focus on science, and the use of the Lunar Roving Vehicle (LRV). The landing and exploration were in the Descartes Highlands, a site chosen because some scientists expected it to be an area formed by volcanic action, though this proved to not be the case.</p>
              </>
              : showAction === 'apollo17' ? 
              <>
                <p>Apollo 17 (December 7 – 19, 1972) was the final mission of NASA's Apollo program, the most recent time humans have set foot on the Moon or traveled beyond low Earth orbit.</p>
                <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/Eugene_Cernan_at_the_LM__Apollo_17_eibvGpjcJ.jpeg" className='infoPic'/>  
                </IKContext>
                <p className='credits'><em>Credit:NASA Image and Video</em></p>
                <p>Commander Eugene Cernan and Lunar Module Pilot Harrison Schmitt walked on the Moon, while Command Module Pilot Ronald Evans orbited above. The mission's heavy emphasis on science meant the inclusion of a number of new experiments, including a biological experiment containing five mice carried in the command module.</p>
              </>
              : showAction === 'artemis' ? 
              <>
                <p>Artemis 3 (officially Artemis III) is the first crewed Moon landing mission of the Artemis program and the third planned flight of NASA's Orion spacecraft on the Space Launch System (SLS).</p>
                <IKContext urlEndpoint="https://ik.imagekit.io/74qyv5bswgr/stellarwind42">
                  <IKImage path="/starship-lander-879x485_yLrwIC7yf.jpeg" className='infoPic'/>  
                </IKContext>
                <p className='credits'><em>Credit:SpaceX</em></p>
                <p>Scheduled for launch in 2025, Artemis 3 is planned to be the second crewed Artemis mission and the first crewed lunar landing since Apollo 17 in 1972.</p>
                <p>Artemis 3 will land a crew at the Moon's south polar region. It is planned to have two astronauts on the surface of the Moon for about one week. The mission is intended to be the first to place a woman on the Moon.</p>
              </>
              :''}
              </>
               :              
               activeObject === 'mars'?
               <>
                 <p>Yes, we haven't made it to Mars yet...</p>
               </>
               :              
               activeObject === 'earth'?
               <>
                
               </>
               : ''}
            </div>
            
          
            {activeObject==='moon' ? 
              <a 
                className={showAction==='' ? "hidden-btn":'home-btn'} 
                onClick={()=>{
                  setAction('')
                  setCloseAudio(true)
                  setCamera('moon')
                }}>All lunar crew missions</a>
              :''}
            {activeObject === '' ? 
          
            <div className='iconSection'>
             
              <a href='https://www.patreon.com/spaceinbrowser' target="_blank" className='patreonBtn'>
                <i className="fab fa-patreon"></i>
              </a>

              <a  className='twBtn' href="https://twitter.com/spaceinbrowser" target="_blank">
                <i className="fab fa-twitter"></i>
              </a> 

              <a  className='ytBtn' href="https://www.youtube.com/channel/UCcr4eYlztyxKO7rPmNCrgdg" target="_blank">
                <i className="fab fa-youtube"></i>
              </a> 
              <br/>
              <p className='arbusWorld'>Created by <a href='https://twitter.com/curiousB_ing' target='_blank' className='curiousBeing'>arbus</a></p>
            </div>
             :
              ''}
          </div>
          
        </div>
        
        {closedAudio ? 
          <>
          <div 
            className={
              
              ((activeObject==='LEO') && (showAction==='')) || (activeObject==='moon') || (activeObject==='mars') || (activeStation!='') ? "headphoneBtn alertAudio" :
              (activeLaunchPad==='Starbase') || (activeLaunchPad==='KSS') || (activeLaunchPad==='CCSFS') ? "headphoneBtn alertLive" 
              : "headphoneBtn"}
             onClick={(
               showAction==='satellitePad') || (activeLaunchPad==='BSS') || (activeLaunchPad==='JSLC') || (activeObject==='earth') ? '' 
               : ()=>setCloseAudio(false)}
          >
          <BsHeadphones style={{"fontSize":"150%"}}/>
          {(activeLaunchPad==='Starbase') || (activeLaunchPad==='KSS') || (activeLaunchPad==='CCSFS') ? <p className="headphoneInfo">LIVE</p> :
           ((activeObject==='LEO') && (showAction==='')) || (activeObject==='moon') || (activeObject==='mars') || (activeStation!='') ? <p className="headphoneInfoAudio ">AUDIO</p>         
          : ''}
          </div>
          </>
          :
        <div className={'audioSection'}>
            <AiOutlineCloseCircle className='closeBtn' onClick={()=>setCloseAudio(true)}/>
        <i className="fa-solid fa-headphones" style={{"color":"white", "fontSize":"250%"}}></i>
       
       {activeObject === '' ? 
       <>
        <p>We're in outer space right now. There's no sound here:( <a onClick={()=>setSpan(!disabledSpan)}>You wanna know why?</a></p>
        <p className={disabledSpan ? 'disabledSpan': 'enabledSpan'}>Sound travels in waves like light or heat does, but unlike them, sound travels by making molecules vibrate. So, in order for sound to travel, there has to be something with molecules for it to travel through. On Earth, sound travels to your ears by vibrating air molecules. In deep space, the large empty areas between stars and planets, there are no molecules to vibrate.</p>
        </>
        :
        (activeObject === 'moon') && (showAction==='') ? 
        <>
        <p>We Choose to Go to the Moon</p>
        <p className='audioDescription'>Let's listen to the famous <em>We choose to go to the Moon</em> speech by John F. Kennedy and the launch of Appolo 11.</p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo11') ? 
        <>
        <p>Apollo 11 Mission Audio</p>
        <p className='audioDescription'> <em>All Highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo12') ? 
        <>
        <p>Apollo 12 Mission Audio</p>
        <p className='audioDescription'><em>All Highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo14') ? 
        <>
        <p>Apollo 14 Mission Audio</p>
        <p className='audioDescription'><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo15') ? 
        <>
        <p>Apollo 15 Mission Audio</p>
        <p className='audioDescription'><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo16') ? 
        <>
        <p>Apollo 16 Mission Audio</p>
        <p className='audioDescription'><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo17') ? 
        <>
        <p>Apollo 17 Mission Audio</p>
        <p className='audioDescription'><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='artemis') ? 
        <>
        <p>Houston We Have a Podcast by NASA</p>
        <p className='audioDescription'><em>Apollo vs Artemis</em></p>
        </>
        :
        activeObject === 'mars' ? 
        <>
        <p>Martian wind</p>
        <p className='audioDescription'>This recording was made on Feb. 22, 2021, on the fourth sol (Martian day) by the SuperCam instrument on NASA's Perseverance rover after deployment of the rover's mast.</p>
        </>
        :
        (activeObject === 'LEO') && (activeStation==='') && (activeLaunchPad==='') ? 
        <>
         <p>Atmospheric squeaking</p>
         <p>A 'whistler' is audibly emitted in the atmosphere.<a onClick={()=>setSpan(!disabledSpan)}>But what are 'whistlers' exactly?</a></p>
         <p className={disabledSpan ? 'disabledSpan': 'enabledSpan'}>They are electromagnetic emissions produced in the atmosphere, but their cause is still partly unclear. They originate from thunderstorms or meteorites, or even after earthquakes. Once produced, the sounds travel along closed magnetic field lines from one hemisphere to the other.</p>
        </>
        :
        (activeObject === 'LEO') && (activeStation==='ISS') ?
        <> 
          <p>NASA Live</p>
          <p className='audioDescription'>NASA TV airs a variety of regularly scheduled, pre-recorded educational and public relations programming 24 hours a day on its various channels.</p>
        </>
        :
        (activeObject === 'LEO') && (activeStation==='TSS') ?
        <> 
          <p>Tiangong Live</p>
          <p className='audioDescription'>Unfortunately, there's no live stream from Tiangong as NASA Live. Below is the latest live stream made by Shenzhou-13 crew.</p>
        </>
        :
        (activeObject === 'LEO') && (activeLaunchPad==='Starbase') ?
        <> 
          <p>Starbase Live</p>
          <p className='audioDescription'>Starbase LIVE provides 24/7 coverage of the exciting developments and testing progress.</p>
        </>
        :
        (activeObject === 'LEO') && (activeLaunchPad==='CCSFS') ?
        <> 
          <p>LIVE SpaceX Fleet Operations at Port Canaveral</p>
          <p className='audioDescription'>Booster returns aboard ASDS, rocket processing operations, fairing returns, launches and many more.</p>
        </>
         :
         (activeObject === 'LEO') && (activeLaunchPad==='KSS') ?
         <> 
           <p>Live: Artemis 1 SLS at the KSS</p>
           <p className='audioDescription'>The SLS rocket will launch NASA's Orion capsule on a loop around the Moon later this year.</p>
         </>
       :''}
        
       {activeObject===''?'':
       (activeStation==='ISS') ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=nA9UZF-SZoQ" className="stream"/> :
       (activeStation==='TSS') ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=TlRPB_FNSF8" className="stream"/> :
        activeLaunchPad==='Starbase' ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=mhJRzQsLZGg" className="stream"/> :
        activeLaunchPad==='CCSFS' ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=gnt2wZBg89g" className="stream"/> :
        activeLaunchPad==='KSS' ? <ReactPlayer width='220px' controls height='130px' url="https://www.youtube.com/watch?v=DwmuRyfsA7s" className="stream"/>
       : <AudioPlayer/>
       }
        {(activeObject==='moon') || (activeObject==='mars') ? 
          <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p> :
        (activeObject==='LEO') && (activeStation==='') && (activeLaunchPad==='') ? 
          <p className='credits'><em>Credit: Cluster (University of Iowa)</em></p> :
        (activeObject==='LEO') && (activeStation==='TSS') ?
          <p className='credits'><em>Credit: CNSpace</em></p> :
        (activeObject==='LEO') && (activeLaunchPad==='Starbase') || (activeLaunchPad==='CCSFS') ? 
          <p className='credits'><em>Credit: NASASpaceflight</em></p> :
          (activeObject==='LEO') && (activeLaunchPad==='KSS') ? 
            <p className='credits'><em>Credit: Spaceflight Now</em></p> 
        : ''}
        </div>}

        {closed ? 
          <BsFillMouse2Fill 
            className={(showAction==='launchpad') || (showAction==='crewPad') || (showAction==='satellitePad') && (activeLaunchPad==='') ? "mouseBtn usefulX" : "mouseBtn"} 
            onClick={()=>setClose(false)}
          /> :
        <div className={
          (showAction==='launchpad') || (showAction==='crewPad') || (showAction==='satellitePad') && (activeLaunchPad==='') ? 'extraInfo usefulInfo'
          
          : 'extraInfo'}>
        {
        (activeObject === 'LEO') && (showAction === '') || (showAction === 'launchpad') || (showAction==='spaceStation') ? 
          <>
          <p>You can observe two space stations travelling around the Earth by following along the yellow and red orbits.</p>
          </>
        : 
        (activeObject === 'moon') && (showAction != '') ? 
          <>
            <i className="fa-solid fa-location-dot" style={{"color":"white", "fontSize":"250%"}}></i>
            <p>Click and rotate the Moon to find the exact location 
              {showAction==='artemis' ? <strong> &#128994;</strong> : <strong> &#128308;</strong>} for  
              {showAction==='apollo11' ? <em> Apollo 11 mission</em>:
              showAction==='apollo12' ? <em> Apollo 12 mission</em>:
              showAction==='apollo14' ? <em> Apollo 14 mission</em>:
              showAction==='apollo15' ? <em> Apollo 15 mission</em>:
              showAction==='apollo16' ? <em> Apollo 16 mission</em>:
              showAction==='apollo17' ? <em> Apollo 17 mission</em>:
              showAction==='artemis' ? <em> Artemis 3 mission</em>       
                 
            : ''}.
            </p>
            {showAction==='artemis' ? 
            <p style={{"fontSize":'70%'}}>The exact coordinates for Artemis 3 mission are not announced yet but it's somewhere around the south polar region. <a target="_blank" style={{"color":"goldenrod"}}href="https://www.nasa.gov/specials/artemis/">More...</a></p> : ''}
          </>
        :
        ((activeObject === 'moon') && (showAction === '')) || (activeObject==='mars') ?
          <>
            {activeLight==='' ?
              <a className='lightBtn' onClick={()=>setLight('ambient')}>
                  <BsLightbulb style={{"color":"yellow", "cursor":"pointer"}} title="Lighten the far side"/>
              </a> :
              <a className='lightBtn' onClick={()=>setLight('')}>
                  <BsLightbulbOff style={{"color":"yellow", "cursor":"pointer"}} title="Back to the far side"/>
              </a>
            }
            {activeLight==='ambient' ? 
              
              <p>Click the yellow lightbulb to see the real {activeObject==='moon'? 'Moon' : 'Mars'} with its far side.</p> :
              <p>{activeObject==='moon'? 'Have you ever wondered how the Far Side of the Moon look like' : 'Wanna see the far side'}? Click the lightbulb and rotate to see!</p>}
               
          </>
        :
          <>
            <i className="fa-solid fa-computer-mouse" style={{"color":"white", "fontSize":"250%"}}></i>
            {(showAction==='crewPad') || (showAction==='satellitePad') ? 
            <>
              <p>Click and drag the Earth to see all available inter-planetary launchpads.</p>
              <p>Click the launchpads (green or red ball) to have more information about them.</p>
             
            </>
            : <p>You can either double-click the celestial body or press one of the below buttons to discover your next destination</p>}
          </>
          }
           <div className='menuIcons'>
                    {activeObject==='LEO' ? '' : 
                    <>
                    <a className='home-btn earthBtn' 
                       onClick={()=>{
                         setObject('LEO')
                         setLight('')
                         setAction('')
                         setLaunchPad('')
                         setCamera('')
                        }} 
                       title="Low Earth Orbit">
                      <i className="fa-solid fa-earth-americas"></i>
                    </a>
                    </>}
                    {activeObject==='moon' ? '' :
                    <>
                    <a className='home-btn moonBtn' 
                       onClick={()=>{
                         setObject('moon')
                         setLight('')
                         setAction('')
                         setLaunchPad('')
                         setCamera('moon')
                        }} 
                       title="Moon">
                      <i className="fa-solid fa-moon"></i>
                    </a>
                    </>}
                    {activeObject==='mars' ? '' : 
                    <>
                    <a className='home-btn marsBtn' 
                       onClick={()=>{
                         setObject('mars')
                         setLight('')
                         setAction('')
                         setLaunchPad('')
                         setCamera('mars')
                        }} 
                       title="Mars">
                    <i className="fa-solid fa-bowling-ball"></i>
                    </a>   
                    </>}
                    {activeObject==='earth' ? '' : 
                    <>
                      <a className='home-btn earthMoonBtn' 
                        onClick={()=>{
                          setObject('earth')
                          setLight('')
                          setAction('')
                          setLaunchPad('')
                          setCloseAudio(true)
                          setCamera('')
                        }} 
                      title="Moon orbiting Earth">
                      <GiMoonOrbit/>
                      </a>
                    </>}
                    {activeObject===''?'':
                    <>
                    <a className='home-btn homeBtn' 
                      onClick={()=>{
                        setObject('')
                        setLight('')
                        setAction('')
                        setLaunchPad('')
                        setCamera('')
                      }} 
                      title="Home">
                    <i className="fas fa-home"></i>
                    </a>
                    </>}
                  </div>
        </div>}
        <div className='soundBackground'>
          
        <audio 
          ref={audioPlayerBg} 
          src={song==='interstaller' ? BgSound2 : BgSound}
          loop
        >
        </audio>
       
        <button onClick={togglePlayPauseBg} className="playPauseBg">
            {isPlaying ? <BsFillVolumeUpFill className="playBtns" /> : <BsFillVolumeMuteFill className="playBtns" />}
        </button>
        <div className="content">
          <div className="text">
            {song==='interstaller' ? 
            <>
            {song==='interstaller' ? 
              <AiFillCaretUp 
                className ='changeSong' 
                onClick={()=>{
                  setSong('')
                  togglePlayPauseBg()
                }} 
                title='Change the song'/>
              : ''}
            <p>Lazerhawk <em>Interstaller</em></p>
            </>
            : <p>Lazerhawk <em>Space Trash</em></p>} 
            {song==='' ? 
              <AiFillCaretDown 
                className ='changeSong' 
                onClick={()=>{
                  setSong('interstaller')
                  togglePlayPauseBg()
                }} 
                title='Change the song'/>
              : ''}
          </div>
        </div>
        </div>

      </Html>
    )}
