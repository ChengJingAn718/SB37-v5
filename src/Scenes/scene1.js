import React, { useEffect, useRef, useContext, useState } from 'react';
import "../stylesheets/styles.css";
import { initialAudio, blinkFunc, stopBlinkFunc } from '../components/CommonFunctions';
import BaseImage from '../components/BaseImage';
import { UserContext } from '../components/BaseShot';
import { prePathUrl } from "../components/CommonFunctions"

let imageCount = 0;
let isGameplaying = false;
let eyeBlinkNumbers = []

let timerList = []
let activeInterval
var isRendered = false;
var isEffectPassed = false;
const loadCount = 7

const Scene1 = React.forwardRef(({ nextFunc, _geo, _baseGeo }, ref) => {

    const audioList = useContext(UserContext)
    const playBtnRef = useRef();
    const introText = useRef();
    const introHolder = useRef();
    const bearBoy = [useRef(), useRef()]
    const elephontBoy = [useRef(), useRef()]

    const baseObject = useRef()

    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),

        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ]

    const lightList = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),

        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    useEffect(fomartFunc, [])

    function clickFunc() {
        if (!isGameplaying)
            initialAudio(audioList)

        setTimeout(() => {
            if (!isGameplaying) {
                isGameplaying = true
            }
            audioList.backAudio.play().catch(error => { }).catch(error => {
            });

            nextFunc();
        }, 200);

    }

    const activeBtnFunc = () => {
        if (!isRendered) {
            isRendered = true;
            baseObject.current.className = 'aniObject'

            setTimeout(() => {
                introHolder.current.className = ''
                introHolder.current.style.top = _baseGeo.height * -0.6 + _baseGeo.top + 'px'
            }, 300);

            setTimeout(() => {
                introHolder.current.style.transition = '1.2s'
                introHolder.current.style.top = 0.13 * _baseGeo.height + _baseGeo.top + "px"

                setTimeout(() => {
                    introText.current.className = 'introText'
                }, 800);

                setTimeout(() => {
                    introHolder.current.style.transition = '0s'
                    bearBoy[0].current.setClass('hideObject')
                    bearBoy[1].current.setClass('showObject')

                    elephontBoy[0].current.setClass('hideObject')
                    elephontBoy[1].current.setClass('showObject')
                }, 1500);

            }, 1500);

            setTimeout(() => {
                audioList.titleAudio.play().catch(error => { });
            }, 1000);

            setTimeout(() => {
                playBtnRef.current.className = 'introText'

            }, 2000);

            setTimeout(() => {


                var countNum = 0;
                lightList[countNum].current.setClass('character-appear')
                lightList[countNum + 4].current.setClass('character-appear')
                let lightinterval = setInterval(() => {
                    lightList[countNum].current.setClass('character-disappear')
                    lightList[countNum + 4].current.setClass('character-disappear')
                    countNum++;
                    lightList[countNum].current.setClass('character-appear')
                    lightList[countNum + 4].current.setClass('character-appear')
                    if (countNum == 3)
                        clearInterval(lightinterval)
                }, 100);

            }, 2500);

            setTimeout(() => {
                playBtnRef.current.className = 'commonButton'
                playBtnRef.current.style.pointerEvents = ''
            }, 3000);


        }
    }

    const imageLoad = () => {
        if (!isRendered) {
            imageCount++

            if (imageCount == loadCount) {
                clearTimeout(timerList[0])
                activeInterval = setInterval(() => {
                    if (isEffectPassed) {
                        activeBtnFunc();
                        clearInterval(activeInterval)
                    }
                }, 100);
            }
        }
    }

    function fomartFunc() {

        playBtnRef.current.style.pointerEvents = 'none'
        timerList[0] = setTimeout(activeBtnFunc, 4000);

        imageCount = 0;

        eyeBlinkNumbers[0] = blinkFunc(eyeList.slice(0, 4), 1500, 2000)
        eyeBlinkNumbers[1] = blinkFunc(eyeList.slice(-4), 500, 2500)

        isEffectPassed = true;

        return () => {
            for (let i = 0; i < eyeBlinkNumbers.length; i++)
                stopBlinkFunc(eyeBlinkNumbers[i])

            audioList.titleAudio.pause();
            audioList.titleAudio.currentTime = 0;

            imageCount = 0;
            isRendered = false;
            isEffectPassed = false;

            timerList.forEach(element => {
                clearTimeout(element)
            });
        }
    }

    return (
        <div ref={baseObject} className='hideObject'>
            <div >

                <div style={{ transform: 'rotateY(30deg)', opacity: 0.7 }}>
                    <div

                        style={{
                            position: "fixed", width: _baseGeo.width * 0.2 + "px",
                            height: _baseGeo.height * 0.15 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.08 + "px",
                            top: _baseGeo.height * -0.04 + _baseGeo.top + 'px',

                        }}>
                        {
                            ['a', 'b', 'c', 'd'].map((value, index) => {
                                return (
                                    <BaseImage
                                        ref={lightList[index]}
                                        key={value}
                                        scale={[0.72, 1.15, 1.6, 2.1][index]}
                                        posInfo={{ l: [0, 0, 0, -0.02][index], t: [0.45, 0.465, 0.475, 0.44][index] }}
                                        className={'character-disappear'}
                                        url={"SB_37_BG/SB_37_FG_Light_1" + value + ".svg"}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{ transform: 'rotateY(30deg)', opacity: 0.7 }}>
                    <div
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.185 + "px",
                            height: _baseGeo.height * 0.15 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.55 + "px",
                            top: _baseGeo.height * -0.05 + _baseGeo.top + 'px',


                        }}>
                        {
                            ['a', 'b', 'c', 'd'].map((value, index) => {
                                return (
                                    <BaseImage
                                        ref={lightList[index + 4]}
                                        key={value}
                                        scale={[0.7, 1.1, 1.7, 2.3][index]}
                                        posInfo={{ l: [1.35, 0.925, 0.312, -0.22][index], t: [0.5, 0.48, 0.53, 0.48][index] }}
                                        className={'character-disappear'}
                                        url={"SB_37_BG/SB_37_FG_Light_2" + value + ".svg"}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <div
                    ref={introHolder}
                    className='hideObject'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.32 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.34 + "px",
                        top: 0.13 * _baseGeo.height + _baseGeo.top + "px"
                    }}>
                    <img draggable={false} width={"100%"}
                        onLoad={imageLoad}
                        src={prePathUrl() + "images/SB_37_Intro_BG/SB_37_Intro_Title-Board.svg"}
                    />
                </div>

                <div
                    ref={introText}
                    className='hide'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.4 + "px",
                        top: _baseGeo.height * 0.445 + _baseGeo.top + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        onLoad={imageLoad}
                        src={prePathUrl() + "images/SB_37_Intro_BG/SB_37_Intro_Title.svg"}
                    />
                </div>


                <div

                    style={{
                        position: "fixed", width: _baseGeo.width * 0.21 + "px",
                        height: _baseGeo.width * 0.28 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.6 + "px",
                        top: 0.325 * _baseGeo.height + _baseGeo.top + "px",
                    }}>



                    <BaseImage
                        ref={bearBoy[0]}
                        posInfo={{ l: 0.1, t: 0.15 }}
                        onLoad={imageLoad}
                        url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Bear-Costume_2a.svg"}
                    />
                    <BaseImage
                        ref={bearBoy[1]}
                        posInfo={{ l: 0.05, t: 0.15 }}
                        className={'hideObject'}
                        url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Bear-Costume_2.svg"}
                    />

                    {
                        [4, 5, 6, 7].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eyeList[value]}
                                    scale={0.2}
                                    posInfo={{ l: 0.4, t: 0.365 }}
                                    onLoad={index == 0 ? imageLoad : null}
                                    className={value != 4 ? 'character-disappear' : ''}
                                    url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Bear-Costume_1_Eye_0" + (value - 3) + ".svg"}
                                />
                            )
                        })
                    }
                </div>


                <div

                    style={{
                        position: "fixed", width: _baseGeo.width * 0.27 + "px",
                        height: _baseGeo.width * 0.27 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.11 + "px",
                        top: 0.29 * _baseGeo.height + _baseGeo.top + "px",

                    }}>

                    <BaseImage
                        ref={elephontBoy[0]}
                        posInfo={{ l: 0.1, t: 0.14 }}
                        onLoad={imageLoad}
                        url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Elephant-Costume_1a.svg"}
                    />

                    <BaseImage
                        ref={elephontBoy[1]}
                        posInfo={{ l: 0.1, t: 0.14 }}
                        className={'hideObject'}
                        url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Elephant-Costume_1.svg"}
                    />

                    {
                        [0, 1, 2, 3].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eyeList[value]}
                                    scale={0.2}
                                    posInfo={{ l: 0.585, t: 0.465 }}
                                    onLoad={value == 0 ? imageLoad : null}
                                    className={value != 4 ? 'character-disappear' : ''}
                                    url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Elephant-Costume_1_Eye_0" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>


                <div
                    style={{
                        position: "fixed", width: _baseGeo.width + "px"
                        , left: _baseGeo.left + "px",
                        top: _baseGeo.height * -0.03 + _baseGeo.top + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        onLoad={imageLoad}
                        src={prePathUrl() + "images/SB_37_BG/SB_37_Stage_BG_1_Curtain.svg"}
                    />
                </div>

                <div
                    className="hide"
                    ref={playBtnRef}
                    onClick={clickFunc}
                    style={{
                        position: "fixed", width: _geo.width * 0.1 + "px",
                        left: _geo.width * 0.46 + _geo.left + "px"
                        , bottom: _geo.height * 0.05 + _geo.top + "px"
                    }}>
                    <img
                        draggable={false} 
                        width={"100%"}
                        src={prePathUrl() + 'images/Buttons/Play_blue.svg'}
                    />
                </div>
            </div>




        </div>
    );
});

export default Scene1;
