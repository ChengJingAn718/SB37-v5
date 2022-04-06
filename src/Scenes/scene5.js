import React, { useEffect, useRef, useContext, useState } from 'react';
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

const Scene1 = React.forwardRef(({ nextFunc, _baseGeo, _startTransition, gameNumber }, ref) => {

    const audioList = useContext(UserContext)
    const introHolder = useRef();

    const [aniStateList, setAniListState] = useState([true, true, true, true])  //pause, stop, pause, stop
    const introAniList = [useRef(), useRef()]

    const dangerAudioList = getGameInfoState('dangerAudioList', gameNumber)
    const roundBackList = getGameInfoState('roundBackList', gameNumber)
    const dangerAnimallist = getGameInfoState('dangerAnimallist', gameNumber)
    const dangerAnimalInfolist = getGameInfoState('dangerAnimalInfolist', gameNumber)

    const introPanel = useRef();
    const introPanel1 = useRef();

    const introAnimal = useRef();
    const introAnimal1 = useRef();

    const stageRef = useRef()

    const bearBoy = [useRef(), useRef()]
    const elephontBoy = [useRef(), useRef()]

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

    function cardShowFunc() {

        introHolder.current.className = ''
        introHolder.current.style.transition = '1.5s'
        introHolder.current.style.transform = 'translateY(' + _baseGeo.height * 0.825 + 'px)';
        setTimeout(() => {
            introHolder.current.style.transition = '0s'
            introHolder.current.style.top = _baseGeo.top + _baseGeo.height * 0.125 + 'px';
            introHolder.current.style.transform = '';
        }, 1800);

    }

    const scaleRate = 1.2

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


    function startDangerAniIntro() {
        if (pictureShowingCount < 1) {
            let timeDuration = 0;
            if (pictureShowingCount % 2 == 0) {
                setTimeout(() => {
                    audioList.bodyAudio2.play().catch(error => { });
                }, 1500);
                audioList.bodyAudio1.src = returnAudioPath('10')

                timeDuration = audioList.bodyAudio2.duration * 1000 + 2500
                audioList.bodyAudio1.src = returnAudioPath(dangerAudioList[pictureShowingCount + 2])
            }

            else {
                setTimeout(() => {
                    audioList.bodyAudio1.play().catch(error => { });
                }, 1500);

                timeDuration = audioList.bodyAudio1.duration * 1000 + 2500
                audioList.bodyAudio2.src = returnAudioPath(dangerAudioList[pictureShowingCount + 2])
            }
            changeDangerPicture();

            timerList[36] = setTimeout(() => {
                setAppearState()
            }, timeDuration - 1000);

            setTimeout(() => {
                startDangerAniIntro()
            }, timeDuration);
        }
        else {
            pictureShowingCount = 0;

            introHolder.current.style.transition = '1s'
            introHolder.current.style.top = _baseGeo.top - _baseGeo.height * 0.7 + 'px';

            // audioList.bodyAudio1.src = returnAudioPath('09')
            // audioList.bodyAudio2.src = returnAudioPath('40')

            setTimeout(() => {
                nextFunc()
            }, 3000);
        }
    }

    function changeDangerPicture() {

        if (roundBackList[pictureShowingCount] != roundBackList[pictureShowingCount + 1]
            && pictureShowingCount < roundBackList.length - 1)
            changeRoundCart();

        pictureShowingCount++;

        if (pictureShowingCount % 2 != 0) {

            introAnimal1.current.setClass('hide')
            introAnimal.current.setClass('show')
            setTimeout(() => {
                introAnimal1.current.setUrl('SB_37_Character-Interactive/' + dangerAnimallist[pictureShowingCount + 1] + '.svg')
                introAnimal1.current.setPosInfo(dangerAnimalInfolist[pictureShowingCount + 1])
                introAnimal1.current.setStyle([{ key: 'transform', value: 'scale(1)' }])
            }, 1000);

            setTimeout(() => {
                introAnimal.current.setStyle([{ key: 'transform', value: 'scale(1.15' }])
            }, 1500);
        }

        else {
            introAnimal.current.setClass('hide')
            introAnimal1.current.setClass('show')
            setTimeout(() => {

                introAnimal.current.setUrl('SB_37_Character-Interactive/' + dangerAnimallist[pictureShowingCount + 1] + '.svg')
                introAnimal.current.setPosInfo(dangerAnimalInfolist[pictureShowingCount + 1])
                introAnimal.current.setStyle([{ key: 'transform', value: 'scale(1)' }])

            }, 1000);

            setTimeout(() => {

                introAnimal1.current.setStyle([{ key: 'transform', value: 'scale(1.15)' }])
            }, 1500);
        }



        timerList[17] = setTimeout(() => {
            setAppearState([1, 2, 1][pictureShowingCount])
        }, 1200);

    }

    function changeRoundCart() {
        backShowingCount++;



        if (backShowingCount < backgroundList.length) {
            if (backShowingCount % 2 != 0) {
                introPanel1.current.setClass('hide')
                setTimeout(() => {
                    introPanel1.current.setUrl('SB_37_FG/' + backgroundList[pictureShowingCount + 1] + '.svg')
                }, 1000);

            }
            else {
                introPanel1.current.setClass('show')

                setTimeout(() => {

                    introPanel.current.setUrl('SB_37_FG/' + backgroundList[pictureShowingCount + 1] + '.svg')
                }, 1000);
            }
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
            character.current.style.top = (_baseGeo.top + _baseGeo.height * [0.267, 0.34][index]) * scaleRate + "px"
            character.current.style.transform = 'scale(' + scaleRate / 1.02 + ')'
        })

        if (!isScaled)
            setTimeout(() => {
                isScaled = true;
            }, 1500);
    }


    if (isScaled) {
        setTimeout(() => {
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

    //--fomart
    function fomartFunc() {
        introHolder.current.style.top = _baseGeo.top - _baseGeo.height * 0.7 + 'px';

        audioList.bodyAudio1.src = returnAudioPath('09')
        audioList.bodyAudio2.src = returnAudioPath('22')
        audioList.bodyAudio3.src = returnAudioPath('08')

        timerList[0] = setTimeout(activeBtnFunc, 3000);

        imageCount = 0;
        isEffectPassed = true;

        introAniList.map(ani => {
            ani.current.className = 'hideObject'
        })


        return () => {
            for (let i = 0; i < eyeBlinkNumbers.length; i++)
                stopBlinkFunc(eyeBlinkNumbers[i])

            isEffectPassed = false;
            imageCount = 0;
            isScaled = false;
            trasitionTime = '1.5s';

            pictureShowingCount = 0;
            backShowingCount = 0;

            isRendered = false;
        }
    }


    const activeBtnFunc = () => {
        if (!isRendered) {

            isRendered = true;
            baseObject.current.className = 'aniObject'

            setAppearState()

            eyeBlinkNumbers[0] = blinkFunc(eyeList.slice(0, 4), 1500, 2000)
            eyeBlinkNumbers[1] = blinkFunc(eyeList.slice(-4), 500, 2500)


            setTimeout(() => {

                setAppearState(2)
                audioList.bodyAudio3.play().catch(error => { })
                setTimeout(() => {
                    setAppearState()
                    setAppearState(1)
                    audioList.bodyAudio1.play().catch(error => { });
                    audioList.bodyAudio3.src = returnAudioPath('38')
                    setTimeout(() => {
                        audioList.bodyAudio1.src = returnAudioPath(dangerAudioList[0])
                        audioList.bodyAudio2.play().catch(error => { });
                        setAppearState()
                        setAppearState(2)
                        setTimeout(() => {
                            audioList.bodyAudio2.src = returnAudioPath(dangerAudioList[1])
                            audioList.bodyAudio3.play().catch(error => { });
                            setAppearState()
                            setAppearState(1)
                            setTimeout(() => {

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
                                setTimeout(() => {
                                    scaleFunc()
                                    introAnimal1.current.setClass('show')

                                    setTimeout(() => {
                                        setAppearState([1, 2, 1][pictureShowingCount])
                                        audioList.bodyAudio1.play().catch(error => { });
                                        audioList.bodyAudio3.src = returnAudioPath('06')

                                        setTimeout(() => {
                                            introAnimal1.current.setStyle([{ key: 'transform', value: 'scale(1.15)' }])
                                        }, 1500);

                                        setTimeout(() => {
                                            startDangerAniIntro()
                                        }, audioList.bodyAudio1.duration * 1000 + 500);

                                    }, 1700);
                                }, 2000);

                            }, audioList.bodyAudio3.duration * 1000);
                        }, audioList.bodyAudio2.duration * 1000);
                    }, audioList.bodyAudio1.duration * 1000);
                }, audioList.bodyAudio3.duration * 1000 + 500);
            }, 2000);
        }
    }

    const playIntroAnimal = () => {
        if (pictureInfoList.length - 1 > pictureShowingCount) {
            let timeDuration = 0;
            if (pictureShowingCount % 2 == 0) {
                setTimeout(() => {
                    audioList.bodyAudio2.play().catch(error => { });
                }, 1500);

                timeDuration = audioList.bodyAudio2.duration * 1000 + 2500
                audioList.bodyAudio1.src = returnAudioPath(introAudioList[pictureShowingCount + 2])
            }
            else {
                setTimeout(() => {
                    audioList.bodyAudio1.play().catch(error => { });
                }, 1500);

                timeDuration = audioList.bodyAudio1.duration * 1000 + 2500
                audioList.bodyAudio2.src = returnAudioPath(introAudioList[pictureShowingCount + 2])
            }
            changePicture();

            setTimeout(() => {
                playIntroAnimal()
            }, timeDuration);
        }
        else {
            isScaled = false;
            trasitionTime = '1.2s'

            setAppearState()


            introHolder.current.style.transition = trasitionTime
            introHolder.current.style.top = _baseGeo.top - _baseGeo.height * 0.7 + 'px';

            setTimeout(() => {
                trasitionTime = '1.5s'
                introHolder.current.style.opacity = 0
                moreScale();

                setTimeout(() => {
                    audioList.bodyAudio3.play().catch(error => { });
                    setTimeout(() => {
                        _startTransition(3)
                        setTimeout(() => {
                            nextFunc()
                        }, 300);
                    }, audioList.bodyAudio3.duration * 1000 + 1000);

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
                    className='hideObject'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.32 + "px",
                        height: _baseGeo.height * 0.3 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.34 + "px",
                        top: _baseGeo.top + _baseGeo.height * 0.125 + 'px'
                    }}>

                    <BaseImage
                        ref={introPanel}
                        // url={"SB_37_FG/SB_37_FG_Cutout_Land-and-Water_1.svg"}
                        url={"SB_37_FG/" + roundBackList[pictureShowingCount + 1] + ".svg"}
                    />
                    <BaseImage
                        ref={introPanel1}
                        url={"SB_37_FG/" + roundBackList[pictureShowingCount] + ".svg"}
                    />
                    <BaseImage
                        ref={introAnimal}
                        scale={dangerAnimalInfolist[pictureShowingCount + 1].s}
                        className='hideObject'
                        posInfo={dangerAnimalInfolist[pictureShowingCount + 1]}
                        url={"SB_37_Character-Interactive/" + dangerAnimallist[pictureShowingCount + 1] + ".svg"}
                    />
                    <BaseImage
                        ref={introAnimal1}
                        scale={dangerAnimalInfolist[pictureShowingCount].s}
                        posInfo={dangerAnimalInfolist[pictureShowingCount]}
                        url={"SB_37_Character-Interactive/" + dangerAnimallist[pictureShowingCount] + ".svg"}
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
