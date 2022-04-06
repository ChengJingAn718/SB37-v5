import React, { useState, useEffect, useRef, useContext } from 'react';
import "../stylesheets/styles.css";
import { returnAudioPath, blinkFunc, stopBlinkFunc, playEnvirAni } from '../components/CommonFunctions';
import BaseImage from '../components/BaseImage';
import { UserContext } from '../components/BaseShot';
import { getGameInfoState } from "../components/CommonVarariant"
import loadAnimation from "../utils/loadAnimation"
import Lottie from "react-lottie-segments";
import { prePathUrl } from "../components/CommonFunctions"

let eyeBlinkNumbers = []
let imageCount = 0;
let isScaled = false;
let trasitionTime = '1.5s';

let pictureShowingCount = 0;
let backShowingCount = 0;

let activeInterval
let timerList = []
var isRendered = false;
var isEffectPassed = false;
const loadCount = 7

let animationList = []
new loadAnimation('main/SB_37_Comp_Scene_01_Bear_girl.json').then(result => {
    animationList[0] = result;
}, () => { });

new loadAnimation('main/SB_37_Comp_Scene_01_elephant_girl.json').then(result => {
    animationList[1] = result;
}, () => { });

const Scene1 = React.forwardRef(({ nextFunc, _baseGeo, _startTransition, gameNumber, _geo }, ref) => {

    const audioList = useContext(UserContext)
    const introHolder = useRef();

    const introAudioList = getGameInfoState('introAudioList', gameNumber)
    const dangerAudioList = getGameInfoState('dangerAudioList', gameNumber)

    const pictureList = getGameInfoState('pictureList', gameNumber)
    const backgroundList = getGameInfoState('backgroundList', gameNumber)
    const roundBackList = getGameInfoState('roundBackList', gameNumber)
    const dangerAnimallist = getGameInfoState('dangerAnimallist', gameNumber)

    const introBoyOrderList = getGameInfoState('introBoyOrderList', gameNumber)
    const pictureInfoList = getGameInfoState('pictureInfoList', gameNumber)
    const dangerAnimalInfolist = getGameInfoState('dangerAnimalInfolist', gameNumber)


    const introPanel = useRef();
    const introPanel1 = useRef();

    const desertRef = useRef()
    const introAnimal = useRef();
    const introAnimal1 = useRef();

    const stageRef = useRef()

    const bearBoy = [useRef(), useRef()]
    const elephontBoy = [useRef(), useRef()]


    const [aniStateList, setAniListState] = useState([true, true, true, true])  //pause, stop, pause, stop
    const introAniList = [useRef(), useRef()]

    const characterList = [
        useRef(), useRef()
    ]

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
        useRef(), useRef()
    ]

    const curtainRef = useRef()

    useEffect(fomartFunc, [])

    function returnOption(index) {
        return {
            loop: true,
            autoplay: true,
            animationData: animationList[index],
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }


    function cardShowFunc() {

        introHolder.current.className = ''
        introHolder.current.style.transition = '1.5s'
        introHolder.current.style.transform = 'translateY(' + _baseGeo.height * 0.825 + 'px)';
        timerList[0] = setTimeout(() => {
            introHolder.current.style.transition = '0s'
            introHolder.current.style.top = _baseGeo.top + _baseGeo.height * 0.125 + 'px';
            introHolder.current.style.transform = '';
        }, 1800);

    }

    const scaleRate = 1.2

    function changePicture() {

        if (pictureShowingCount < backgroundList.length)
            changeCart();

        pictureShowingCount++;

        if (pictureShowingCount % 2 != 0) {

            introAnimal1.current.setClass('hide')
            introAnimal.current.setClass('show')
            timerList[15] = setTimeout(() => {
                introAnimal1.current.setUrl('SB_37_Character-Interactive/' + pictureList[pictureShowingCount + 1] + '.svg')
                introAnimal1.current.setPosInfo(pictureInfoList[pictureShowingCount + 1])
            }, 1000);
        }

        else {
            introAnimal.current.setClass('hide')
            introAnimal1.current.setClass('show')
            timerList[16] = setTimeout(() => {

                introAnimal.current.setUrl('SB_37_Character-Interactive/' + pictureList[pictureShowingCount + 1] + '.svg')
                introAnimal.current.setPosInfo(pictureInfoList[pictureShowingCount + 1])
            }, 1000);
        }

        timerList[17] = setTimeout(() => {
            setAppearState(introBoyOrderList[pictureShowingCount])
        }, 1200);

    }

    function changeCart() {
        backShowingCount++;

        if (gameNumber == 3 && backShowingCount == 1)
            desertRef.current.setClass('hide')

        if (backShowingCount % 2 != 0)
            introPanel1.current.setClass('hide')
        else
            introPanel1.current.setClass('show')

        if (pictureShowingCount < backgroundList.length - 1) {
            timerList[18] = setTimeout(() => {
                if (backShowingCount % 2 != 0)
                    introPanel1.current.setUrl('SB_37_FG/' + backgroundList[pictureShowingCount + 1] + '.svg')
                else
                    introPanel.current.setUrl('SB_37_FG/' + backgroundList[pictureShowingCount + 1] + '.svg')
            }, 1000);
        }
    }

    function scaleFunc() {
        stageRef.current.style.transition = trasitionTime
        stageRef.current.style.transform = 'scale(' + scaleRate + ')'

        introHolder.current.style.transition = trasitionTime

        introHolder.current.style.transform = ' scale(' + scaleRate + ')'

        curtainRef.current.style.transition = trasitionTime
        curtainRef.current.style.transform = 'scale(' + scaleRate + ')'

        lightList.map((light, index) => {
            light.current.style.transition = trasitionTime
            light.current.style.left = (_baseGeo.left + _baseGeo.width * [0.02, 0.49][index]) * scaleRate + "px"
            light.current.style.top = (_baseGeo.top + _baseGeo.height * [-0.05, -0.06][index]) * scaleRate + "px"
            light.current.style.transform = 'scale(' + 1.1 + ')'
        })

        characterList.map((character, index) => {
            character.current.style.transition = trasitionTime
            character.current.style.left = (_baseGeo.left + _baseGeo.width * [0.06, 0.53][index]) * scaleRate + "px"
            character.current.style.transform = 'scale(' + scaleRate + ')'
        })

        introAniList.map((character, index) => {
            character.current.style.transition = trasitionTime
            character.current.style.left = (_baseGeo.left + _baseGeo.width * [0.06, 0.53][index]) * scaleRate + "px"
            character.current.style.transform = 'scale(' + scaleRate + ')'
        })

        if (!isScaled)
            timerList[16] = setTimeout(() => {
                isScaled = true;
            }, 1500);
    }


    if (isScaled) {
        timerList[20] = setTimeout(() => {
            trasitionTime = 'none'
            scaleFunc()
        }, 200);
    }

    function setAppearState(state = 0) {
        characterList[0].current.style.transition = 'none'
        characterList[1].current.style.transition = 'none'
        introAniList[0].current.style.transition = 'none'
        introAniList[1].current.style.transition = 'none'
        switch (state) {
            case 0:
                // setAniListState([false, true, false, true])

                // setTimeout(() => {

                characterList[0].current.className = 'showObject'
                characterList[1].current.className = 'showObject'

                introAniList[0].current.className = 'hideObject'
                introAniList[1].current.className = 'hideObject'

                setAniListState([true, true, true, true])

                // }, 500);

                break;
            case 1:
                characterList[0].current.className = 'hideObject'
                introAniList[0].current.className = 'showObject'
                setAniListState([false, true, false, true])

                break;
            case 2:
                characterList[1].current.className = 'hideObject'
                introAniList[1].current.className = 'showObject'
                setAniListState([true, false, true, false])

                break;
            case 3:
                characterList[0].current.className = 'showObject'
                characterList[1].current.className = 'showObject'

                introAniList[0].current.className = 'hideObject'
                introAniList[1].current.className = 'hideObject'
                break;
            default:
                break;
        }

    }

    const translateX = -0.14 * _baseGeo.width
    const moreScaleRate = 2

    function moreScale() {
        stageRef.current.style.transition = trasitionTime
        stageRef.current.style.transform = 'scale(' + moreScaleRate + ') ' + 'translateX(' + translateX + 'px)'


        curtainRef.current.style.transition = trasitionTime
        curtainRef.current.style.transform = 'scale(' + moreScaleRate + ') ' + 'translateX(' + translateX + 'px)'

        lightList.map((light, index) => {
            light.current.style.transition = trasitionTime
            light.current.style.transform = 'scale(' + moreScaleRate + ') ' + 'translate(' + [_baseGeo.width * -0.4, translateX][index] + 'px,' + _baseGeo.height * -0.05 + 'px)'
        })

        characterList.map((character, index) => {
            character.current.style.transition = trasitionTime
            if (index > 0)
                character.current.style.transform = 'scale(' + moreScaleRate + ') ' + 'translateX(' + translateX + 'px)'
            else
                character.current.style.transform = 'scale(' + moreScaleRate + ') ' + 'translateX(' + _baseGeo.width * -0.3 + 'px)'
        })

        introAniList.map((character, index) => {
            character.current.style.transition = trasitionTime
            if (index > 0)
                character.current.style.transform = 'scale(' + moreScaleRate + ') ' + 'translateX(' + translateX + 'px)'
            else
                character.current.style.transform = 'scale(' + moreScaleRate + ') ' + 'translateX(' + _baseGeo.width * -0.3 + 'px)'
        })
    }



    //--fomart
    function fomartFunc() {
        introHolder.current.style.top = _baseGeo.top - _baseGeo.height * 0.7 + 'px';

        audioList.bodyAudio1.src = returnAudioPath('02')
        audioList.bodyAudio2.src = returnAudioPath('03')
        audioList.bodyAudio3.src = returnAudioPath('04')

        timerList[0] = setTimeout(activeBtnFunc, 3000);
        introAniList.map(ani => {
            ani.current.className = 'hideObject'
        })
        imageCount = 0;
        isEffectPassed = true;

        return () => {
            for (let i = 0; i < eyeBlinkNumbers.length; i++)
                stopBlinkFunc(eyeBlinkNumbers[i])

            timerList.map(timer => {
                clearTimeout(timer)
            })

            imageCount = 0;
            isEffectPassed = false;
            isRendered = false;

            isScaled = false;
            trasitionTime = '1.5s';

            pictureShowingCount = 0;
            backShowingCount = 0;

            audioList.bodyAudio1.pause()
            audioList.bodyAudio2.pause()
            audioList.bodyAudio3.pause()

            timerList = []
        }
    }

    const activeBtnFunc = () => {
        if (!isRendered) {

            isRendered = true;
            baseObject.current.className = 'aniObject'

            setAppearState()

            eyeBlinkNumbers[0] = blinkFunc(eyeList.slice(0, 4), 1500, 2000)
            eyeBlinkNumbers[1] = blinkFunc(eyeList.slice(-4), 500, 2500)


            timerList[21] = setTimeout(() => {

                audioList.bodyAudio1.play().catch(error => { });
                setAppearState(1)

                timerList[22] = setTimeout(() => {
                    audioList.bodyAudio1.src = returnAudioPath(introAudioList[0])
                    setAppearState()
                    setAppearState(2)
                    audioList.bodyAudio2.play().catch(error => { });
                    timerList[23] = setTimeout(() => {
                        audioList.bodyAudio2.src = returnAudioPath(introAudioList[1])

                        setAppearState()
                        setAppearState(1)

                        audioList.bodyAudio3.play().catch(error => { });
                        timerList[24] = setTimeout(() => {
                            setAniListState([true, true, true, true])
                            // setTimeout(() => {
                            //     characterList.map(character => {
                            //         character.current.className = 'hide'
                            //     })
                            //     introAniList.map(character => {
                            //         character.current.className = 'hide'
                            //     })
                            // }, 500);

                            setAppearState()

                            cardShowFunc()
                            timerList[25] = setTimeout(() => {
                                scaleFunc()

                                introAnimal1.current.setClass('show')

                                timerList[26] = setTimeout(() => {

                                    audioList.bodyAudio1.play().catch(error => { });
                                    audioList.bodyAudio3.src = returnAudioPath('06')
                                    setAppearState(introBoyOrderList[pictureShowingCount])
                                    // timerList[27] = setTimeout(() => {
                                    //     introAnimal1.current.setStyle([{ key: 'transform', value: 'scale(1.15)' }])
                                    // }, 1000);

                                    timerList[28] = setTimeout(() => {
                                        setAppearState()
                                        setTimeout(() => {
                                            playIntroAnimal();
                                            // startDangerAniIntro()
                                        }, 500);
                                    }, audioList.bodyAudio1.duration * 1000);

                                }, 1700);
                            }, 2000);

                        }, audioList.bodyAudio3.duration * 1000);
                    }, audioList.bodyAudio2.duration * 1000);
                }, audioList.bodyAudio1.duration * 1000);
            }, 2000);
        }
    }

    const playIntroAnimal = () => {
        if (pictureInfoList.length - 1 > pictureShowingCount) {

            let timeDuration = 0;
            if (pictureShowingCount % 2 == 0) {
                timerList[34] = setTimeout(() => {
                    audioList.bodyAudio2.play().catch(error => { });
                }, 1500);

                timeDuration = audioList.bodyAudio2.duration * 1000 + 2500
                audioList.bodyAudio1.src = returnAudioPath(introAudioList[pictureShowingCount + 2])
            }
            else {
                timerList[35] = setTimeout(() => {
                    audioList.bodyAudio1.play().catch(error => { });
                }, 1500);

                timeDuration = audioList.bodyAudio1.duration * 1000 + 2500
                audioList.bodyAudio2.src = returnAudioPath(introAudioList[pictureShowingCount + 2])
            }

            changePicture();
            timerList[36] = setTimeout(() => {
                setAppearState()
            }, timeDuration - 1000);

            timerList[29] = setTimeout(() => {
                playIntroAnimal()
            }, timeDuration);
        }
        else {
            isScaled = false;
            trasitionTime = '1.2s'

            setAppearState()


            introHolder.current.style.transition = trasitionTime
            introHolder.current.style.top = _baseGeo.top - _baseGeo.height * 0.7 + 'px';

            timerList[30] = setTimeout(() => {
                trasitionTime = '1.5s'
                introHolder.current.style.opacity = 0
                moreScale();

                timerList[31] = setTimeout(() => {
                    audioList.bodyAudio3.play().catch(error => { });
                    setAppearState(2)

                    timerList[32] = setTimeout(() => {
                        setAppearState()
                        timerList[37] = setTimeout(() => {
                            _startTransition(gameNumber)
                            timerList[33] = setTimeout(() => {
                                audioList.wooAudio.play().catch(error => { });
                                nextFunc()
                            }, 300);
                        }, 1000);
                    }, audioList.bodyAudio3.duration * 1000);

                }, 2000);
            }, 1500);
        }


    }

    const loadImage = () => {
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


    return (
        <div ref={baseObject} className='hideObject'>
            <div >

                <div
                    ref={stageRef}
                    style={{
                        position: "fixed", width: _baseGeo.width + "px"
                        , height: _baseGeo.height + "px",
                        left: _baseGeo.left + 'px',
                        top: _baseGeo.top + 'px'
                    }} >
                    <BaseImage
                        url={"SB_37_BG/SB_37_Stage_BG_2.svg"}
                    />
                </div>

                <div style={{ transform: 'rotateY(30deg)', opacity: 0.7 }}>

                    <div
                        ref={lightList[0]}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.2 + "px",
                            height: _baseGeo.height * 0.15 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.08 + "px",
                            top: _baseGeo.height * -0.04 + _baseGeo.top + 'px',
                        }}>
                        <BaseImage
                            scale={2.1}
                            onLoad={loadImage}
                            posInfo={{ l: -0.02, t: 0.44 }}
                            url={"SB_37_BG/SB_37_FG_Light_1d.svg"}
                        />
                    </div>
                </div>

                <div style={{ transform: 'rotateY(30deg)', opacity: 0.7 }}>

                    <div
                        ref={lightList[1]}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.185 + "px",
                            height: _baseGeo.height * 0.15 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.55 + "px",
                            top: _baseGeo.height * -0.05 + _baseGeo.top + 'px',
                        }}>
                        <BaseImage
                            scale={2.3}
                            onLoad={loadImage}
                            posInfo={{ l: -0.22, t: 0.48 }}
                            url={"SB_37_BG/SB_37_FG_Light_2d.svg"}
                        />
                    </div>
                </div>
                <div
                    ref={introHolder}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.32 + "px",
                        height: _baseGeo.height * 0.3 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.34 + "px",
                        top: _baseGeo.top + _baseGeo.height * 0.125 + 'px'
                    }}>

                    <BaseImage
                        ref={introPanel}
                        // url={"SB_37_FG/SB_37_FG_Cutout_Land-and-Water_1.svg"}
                        url={"SB_37_FG/" + backgroundList[1] + ".svg"}
                    />
                    <BaseImage
                        ref={introPanel1}
                        url={"SB_37_FG/" + backgroundList[0] + ".svg"}
                    />

                    {gameNumber == 3 &&
                        < BaseImage
                            ref={desertRef}
                            scale={0.898}
                            posInfo={{ l: 0.052, t: 0.835 }}
                            url={"SB_37_BG/SB_37_Land_BG_3.svg"}
                        // className="hideObject"
                        />
                    }
                    <BaseImage
                        ref={introAnimal}
                        scale={pictureInfoList[1].s}
                        className='hideObject'
                        posInfo={pictureInfoList[1]}
                        url={"SB_37_Character-Interactive/" + pictureList[1] + ".svg"}
                    />
                    <BaseImage
                        ref={introAnimal1}
                        scale={pictureInfoList[0].s}
                        posInfo={pictureInfoList[0]}
                        url={"SB_37_Character-Interactive/" + pictureList[0] + ".svg"}
                    />


                </div>

                <div
                    ref={characterList[0]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.27 + "px",
                        height: _baseGeo.width * 0.27 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.12 + "px",
                        top: 0.29 * _baseGeo.height + _baseGeo.top + "px",
                    }}>

                    <BaseImage
                        ref={elephontBoy[0]}
                        scale={1}
                        posInfo={{ l: 0.1, t: 0.14 }}
                        onLoad={loadImage}
                        url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Elephant-Costume_1a.svg"}
                    />

                    {
                        [0, 1, 2, 3].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eyeList[value]}
                                    scale={0.2}
                                    posInfo={{ l: 0.585, t: 0.465 }}
                                    onLoad={value == 0 ? loadImage : null}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Elephant-Costume_1_Eye_0" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>

                <div
                    ref={characterList[1]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.21 + "px",
                        height: _baseGeo.width * 0.28 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.6 + "px",
                        top: 0.325 * _baseGeo.height + _baseGeo.top + "px",
                    }}>


                    <BaseImage
                        ref={bearBoy[0]}
                        posInfo={{ l: 0.1, t: 0.15 }}
                        onLoad={loadImage}
                        url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Bear-Costume_2a.svg"}
                    />

                    {
                        [4, 5, 6, 7].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eyeList[value]}
                                    scale={0.2}
                                    posInfo={{ l: 0.4, t: 0.365 }}
                                    onLoad={index == 0 ? loadImage : null}
                                    className={value != 4 ? 'character-disappear' : ''}
                                    url={"SB_37_Character-Interactive/SB_37_CI_Girl-with-Bear-Costume_1_Eye_0" + (value - 3) + ".svg"}
                                />
                            )
                        })
                    }
                </div>

                <div
                    ref={curtainRef}
                    style={{
                        position: "fixed", width: _baseGeo.width + "px"
                        , left: _baseGeo.left + "px",
                        top: _baseGeo.height * -0.03 + _baseGeo.top + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        onLoad={loadImage}
                        src={prePathUrl() + "images/SB_37_BG/SB_37_Stage_BG_1_Curtain.svg"}
                    />
                </div>


            </div>
            <div
                className='commonButton'
                onClick={() => {
                    setTimeout(() => {
                        _startTransition(gameNumber)
                        setTimeout(() => {
                            audioList.wooAudio.play().catch(error => { });
                            nextFunc();
                        }, 300);
                    }, 200);
                }}
                style={{
                    position: "fixed", width: _geo.width * 0.06 + "px",
                    right: "2%"
                    , bottom: "2%", cursor: "pointer",
                }}>
                <img
                    draggable={false}
                    width={"100%"} className='playBtn'
                    src={prePathUrl() + 'images/Buttons/Skip_blue.svg'}
                />
            </div>

            <div ref={introAniList[1]}

                style={{
                    position: "fixed", width: _baseGeo.width * 0.21 + "px",
                    height: _baseGeo.width * 0.28 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.6 + "px",
                    top: 0.325 * _baseGeo.height + _baseGeo.top + "px",
                }}
            >
                <div

                    style={{
                        position: "absolute", width: '89%',
                        left: '8.5%', top: '14.5%'
                    }}>
                    <Lottie autoplay loop options={returnOption(0)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        isPaused={aniStateList[1]}
                        isStopped={aniStateList[3]}
                    />
                </div>
            </div>
            <div
                ref={introAniList[0]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.27 + "px",
                    height: _baseGeo.width * 0.27 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.12 + "px",
                    top: 0.29 * _baseGeo.height + _baseGeo.top + "px",
                }}>
                <div
                    style={{
                        position: "absolute", width: '91.5%',
                        left: '17.65%', top: '7.8%'
                    }}>
                    <Lottie
                        autoplay loop options={returnOption(1)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        isPaused={aniStateList[0]}
                        isStopped={aniStateList[2]}
                    />
                </div>
            </div>
        </div>
    );
});

export default Scene1;
