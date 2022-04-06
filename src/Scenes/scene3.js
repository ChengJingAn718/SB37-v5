
import "../stylesheets/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import BaseImage from "../components/BaseImage";
import { UserContext } from "../components/BaseShot";
import Draggable from 'react-draggable';
import { isMobile } from "react-device-detect";
import { stopBlinkFunc, pauseEnvirAni, blinkFunc, returnAudioPath, playEnvirAni } from "../components/CommonFunctions"
import { getGameInfoState, getCharacterAnimation } from "../components/CommonVarariant"
import Lottie from "react-lottie-segments";
import loadAnimation from "../utils/loadAnimation"
import { prePathUrl, setRepeatAudio, startRepeatAudio, stopRepeatAudio } from "../components/CommonFunctions"

let x = 0;
let y = 0;
let startPosInfo = {}

let isRendered = false;
let stepCount = 0;
let environAniNumList = []

let timerList = []
let imageCount = 0;
let currentAnimation
let currentAniInfo
let currentCharacter = ''
let currentEyeAniNum = 0;
let fishAninum = 0;
let fishAniEyenum = 0;



export default function Scene({ _geo, nextFunc, _baseGeo, gameNumber }) {


    const audioList = useContext(UserContext)
    const baseObject = useRef();

    const aniLottie = useRef();

    const threePartBackRef = useRef();
    const fullScreenRef = useRef();
    const circleIconRef = useRef();
    const progressRef = useRef();

    const dragCharacterRef = useRef();
    const dragCharacterBaseRef = useRef();
    const dragPanel = useRef();
    const staticObjectRef = useRef();

    const refFish = useRef();

    const [isBubbleShow, setBubbleShow] = useState(false)
    const [isRender, setRender] = useState(false)

    const markRefList = Array.from({ length: 7 }, ref => useRef())
    const environmentList = Array.from({ length: 6 }, ref => useRef())
    const eyeList = Array.from({ length: 4 }, ref => useRef())

    const snowRef = useRef();
    const bubbleList = [useRef(), useRef()]

    const characterRef = useRef();
    const animationRef = useRef()

    const fishEyeList = Array.from({ length: 3 }, ref => useRef())
    const fishBodyList = Array.from({ length: 4 }, ref => useRef())

    const textRefList = [useRef(), useRef(), useRef(), useRef()]

    const [isShow, setShow] = useState(true)
    const [isAniStop, setAniStop] = useState(true)

    const introAudioList = getGameInfoState('optionAudioList', gameNumber, true)
    const characterList = getGameInfoState('optionCharacterList', gameNumber, true)
    const fullScreenBackList = getGameInfoState('optionFullScreenList', gameNumber, true)
    const threePartbackList = getGameInfoState('optionThreePartList', gameNumber, true)
    const posInfoList = getGameInfoState('optionPosInfoList', gameNumber, true)
    const correctAnswerList = getGameInfoState('optionCorrectAnswerList', gameNumber, true)
    const animationList = getGameInfoState('optionAnimationList', gameNumber, true)
    const animationPosInfoList = getGameInfoState('optionAnimationInfoList', gameNumber, true)
    const eyePosInfoList = getGameInfoState('optionEyePosInfoList', gameNumber, true)

    const notLoopList = [
        'penguin'
    ]

    const startPoint = {
        segments: [0, 20],
        forceFlag: true
    };

    const defaultPoint = {
        segments: null,
        forceFlag: true
    };




    useEffect(() => {
        currentCharacter = characterList[0];
        animationRef.current.className = 'hide'

        characterRef.current.setClass('hideObject')
        eyeList.map(eye => {
            eye.current.setClass('hideObject')
        })

        currentAnimation = getCharacterAnimation(animationList[stepCount])
        currentAniInfo = animationPosInfoList[stepCount]
        setTimeout(() => {
            setBubbleShow(true)
            isRendered = true;
        }, 2000);

        baseObject.current.style.pointerEvents = 'none'

        audioList.bodyAudio1.src = returnAudioPath('12')
        setRepeatAudio(audioList.repeatAudio)

        audioList.bodyAudio2.src = returnAudioPath('07')
        audioList.bodyAudio3.src = returnAudioPath(introAudioList[0]);

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio1.play().catch(error => { });
            startRepeatAudio();
            timerList[1] = setTimeout(() => {
                baseObject.current.style.pointerEvents = ''
            }, audioList.bodyAudio1.duration * 1000);

        }, 1500);



        environmentList.map(env => {
            env.current.setClass('hideObject')
        })




        stepCount = 0
        imageCount = 0;
        bubbleList.map(bubble => {
            bubble.current.className = 'hideObject'
        })
        snowRef.current.className = 'hideObject'


        return () => {
            isRendered = false;
            stepCount = 0;
            imageCount = 0;
            pauseEnvirAni(fishAninum)
            stopBlinkFunc(fishAniEyenum)
            stopRepeatAudio();

            timerList.map(timer => {
                clearTimeout(timer)
            })
        }
    }, [])

    function returnStartPointer() {
        if (gameNumber == 0 && stepCount == 6)
            return startPoint;
        else
            return defaultPoint;
    }


    function returnOption() {
        return {
            loop: notLoopList.includes(animationList[stepCount]) ? false : true,
            autoplay: true,
            animationData: currentAnimation,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }

    function dragFunc(event) {
        if (isMobile) {
            x = event.touches['0'].clientX
            y = event.touches['0'].clientY
        }
        else {
            x = event.clientX
            y = event.clientY
        }
    }

    function reDrawCharacterFunc(onlyFrameRender = false) {
        if (animationRef.current != null && currentAniInfo != null && onlyFrameRender) {
            animationRef.current.style.width = _baseGeo.width * currentAniInfo.w + "px"
            animationRef.current.style.left = _baseGeo.left + _baseGeo.width * currentAniInfo.l + "px"
            animationRef.current.style.top = _baseGeo.top + _baseGeo.height * currentAniInfo.t + "px"
        }

        isRendered = false;
        setTimeout(() => {
            isRendered = true;
        }, 1000);

        if (!onlyFrameRender) {
            setShow(false)
            setTimeout(() => {
                setShow(true)
            }, 100);
        }
        else {
            setRender(true)
            setTimeout(() => {
                setRender(false)
            }, 100);
        }
    }

    if (isRendered) {
        reDrawCharacterFunc(true)
    }


    function showFullScreen() {

        characterRef.current.setClass('hideObject')

        if (animationList[stepCount] != 'empty') {
            eyeList.map(eye => {
                eye.current.setClass('display-none')
            })
            if (gameNumber == 0 && stepCount == 1) {
                animationRef.current.className = 'hideObject'
                fishAninum = playEnvirAni(fishBodyList, 300)
                fishAniEyenum = blinkFunc(fishEyeList, 0, 2000)
                refFish.current.className = 'show movingDownTop'
            }
            else {
                if (fullScreenBackList[stepCount] == 'SB_37_Water_BG') {
                    animationRef.current.className = 'show movingDownTop'
                }
                else
                    animationRef.current.className = 'show'

                setAniStop(true)
                setTimeout(() => {
                    setAniStop(false)
                    if (gameNumber == 0 && stepCount == 6)
                        setTimeout(() => {
                            aniLottie.current.stop()
                        }, 700);
                }, 1000);
            }

        }
        else {
            eyeList[0].current.setClass('show')
            setTimeout(() => {
                currentEyeAniNum = blinkFunc(eyeList, 0, 2000)
            }, 1000);

            animationRef.current.className = 'hideObject'
            if (fullScreenBackList[stepCount] == 'SB_37_Water_BG')
                staticObjectRef.current.className = 'movingDownTop'
            else
                staticObjectRef.current.className = ''
            characterRef.current.setClass('show')
        }

        if (fullScreenBackList[stepCount] == 'SB_37_Water_BG') {
            bubbleList.map(bubble => {
                bubble.current.className = 'show'
            })
            audioList.bubbleAudio.play().catch(error => { });
            environmentList.map(env => {
                env.current.setClass('showObject')
            })
        }
        if (fullScreenBackList[stepCount] == 'SB_37_Snow_BG') {
            snowRef.current.className = 'show snow'
        }

        setTimeout(() => {
            audioList.clapAudio.play().catch(error => { })

            setTimeout(() => {
                audioList.bodyAudio3.play().catch(error => { });
            }, 5000);

        }, 1000);



        textRefList.map(textRef => { textRef.current.setClass('hide') })

        markRefList[stepCount].current.setUrl("SB_37_Icons/SB_37_Paw_Icon.svg")
        markRefList[stepCount].current.setClass('successBtn')

        threePartBackRef.current.setClass('hide')
        dragPanel.current.className = 'hide'
        circleIconRef.current.setClass('hide')
        stepCount++;


        setTimeout(() => {
            // if (stepCount < threePartbackList.length) {
            threePartBackRef.current.setUrl('SB_37_BG/' + threePartbackList[stepCount] + '.svg')
            comeOriginalPos();
            currentCharacter = characterList[stepCount];

            reDrawCharacterFunc();
            // }
        }, 800);

        setTimeout(() => {
            audioList.bubbleAudio.pause();
            if (stepCount < threePartbackList.length)
                showThreeLayout()
            else {
                // stopBlinkFunc(currentEyeAniNum)
                setTimeout(() => {
                    nextFunc();
                }, 1000);
            }
        }, audioList.bodyAudio3.duration * 1000 + 8000);

    }

    function showThreeLayout() {
        stopBlinkFunc(currentEyeAniNum)

        animationRef.current.className = 'hideObject'
        // setAniStop(true)

        eyeList.map(eye => {
            eye.current.setClass('hideObject')
        })
        characterRef.current.setClass('hideObject')


        if (gameNumber == 0) {
            if (stepCount == 2) {
                stopBlinkFunc(fishAniEyenum)
                pauseEnvirAni(fishAninum)
                refFish.current.className = 'hide'
            }
        }


        // baseObject.current.style.pointerEvents = 'none'

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio1.pause();
            audioList.bodyAudio1.currentTime = 0;
            audioList.bodyAudio1.play().catch(error => { });


            startRepeatAudio();

            timerList[1] = setTimeout(() => {
                baseObject.current.style.pointerEvents = ''
            }, audioList.bodyAudio1.duration * 1000);
        }, 1500);

        if (stepCount < fullScreenBackList.length)
            audioList.bodyAudio3.src = returnAudioPath(introAudioList[stepCount])

        if (fullScreenBackList[stepCount - 1] == 'SB_37_Water_BG') {
            audioList.bubbleAudio.pause();
            audioList.bubbleAudio.currentTime = 0;
            staticObjectRef.current.className = ''
            environmentList.map(env => {
                env.current.setClass('hide')
            })

            bubbleList.map(bubble => {
                bubble.current.className = 'hide'
            })
        }

        if (fullScreenBackList[stepCount - 1] == 'SB_37_Snow_BG')
            snowRef.current.className = 'hide'

        threePartBackRef.current.setClass('show')
        circleIconRef.current.setClass('show')

        textRefList.map((textRef, index) => {
            if (index != 3) {
                if (threePartbackList[stepCount] == "SB_37_Layout_BG_3" && index == 0) {
                }
                else
                    textRef.current.setClass('show')
            }
            else if (threePartbackList[stepCount] == "SB_37_Layout_BG_3")
                textRef.current.setClass('show')
        }

        )
        dragPanel.current.className = 'show'
        setTimeout(() => {
            fullScreenRef.current.setUrl('SB_37_BG/' + fullScreenBackList[stepCount] + '.svg')

            if (animationList[stepCount] != 'empty') {
                currentAniInfo = animationPosInfoList[stepCount]
                currentAnimation = getCharacterAnimation(animationList[stepCount])
                reDrawCharacterFunc(true)
            }
            else {
                eyeList.map((eye, index) => {
                    eye.current.setPosInfo(eyePosInfoList[stepCount])
                    eye.current.setUrl("SB_37_Character-Interactive/" + characterList[stepCount] + "_Eye_0" + (index + 1) + ".svg")
                })
                characterRef.current.setUrl("SB_37_Character-Interactive/" + characterList[stepCount] + ".svg")
                characterRef.current.setPosInfo(posInfoList[stepCount])
            }
        }, 800);
    }

    function dragEndFunc() {

        if (Math.abs(x - startPosInfo.x) > 50 || Math.abs(y - startPosInfo.y) > 50) {
            let currentAnswer = 0;
            let judgePos = { xPos: 0, yPos: 0 }
            let rate = (_baseGeo.height * 0.35) / (0.5 * _baseGeo.width)

            judgePos.yPos = _baseGeo.height - y + _baseGeo.bottom
            judgePos.xPos = x - _baseGeo.left;

            if (judgePos.xPos < _baseGeo.width / 2) {
                if (judgePos.yPos > rate * judgePos.xPos + 0.2 * _baseGeo.height) {
                    currentAnswer = 1
                }
                else {
                    currentAnswer = 2
                }
            }
            else {
                judgePos.xPos -= _baseGeo.width / 2
                if (judgePos.yPos > _baseGeo.height * 0.55 - rate * judgePos.xPos) {
                    currentAnswer = 3
                }
                else {
                    currentAnswer = 2
                }
            }

            if (correctAnswerList[stepCount] == currentAnswer) {
                showFullScreen();
                audioList.tingAudio.play().catch(error => { });
            }
            else {
                comeOriginalPos()

                audioList.buzzAudio.currentTime = 0;
                audioList.buzzAudio.play().catch(error => { });

                audioList.bodyAudio2.currentTime = 0;
                audioList.bodyAudio2.play().catch(error => { });

                startRepeatAudio();
            }
        }
        else {
            comeOriginalPos()
            startRepeatAudio();
        }


    }

    function comeOriginalPos() {
        dragCharacterBaseRef.current.style.transition = '0.4s'
        dragCharacterBaseRef.current.style.left = (Number(dragCharacterBaseRef.current.style.left.split('px')[0]) + startPosInfo.x - x) + 'px'
        dragCharacterBaseRef.current.style.top = (Number(dragCharacterBaseRef.current.style.top.split('px')[0]) + startPosInfo.y - y) + 'px'
    }

    function dragStartFunc(event) {

        audioList.bodyAudio1.pause();
        audioList.buzzAudio.pause();
        audioList.bodyAudio2.pause();

        stopRepeatAudio();

        clearTimeout(timerList[0])

        dragCharacterBaseRef.current.style.transition = '0.0s'
        let xPos = event.clientX;
        let yPos = event.clientY;

        if (isMobile) {
            xPos = event.touches['0'].clientX
            yPos = event.touches['0'].clientY
        }

        startPosInfo = { x: xPos, y: yPos }
        x = xPos
        y = yPos

    }
    return (
        <div ref={baseObject}  >

            <div
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px"
                    , left: _baseGeo.left + "px",
                    top: _baseGeo.top + "px",
                }}>

                <BaseImage
                    ref={fullScreenRef}
                    url={"SB_37_BG/" + fullScreenBackList[0] + ".svg"}
                />

                {/* envorinment */}
                <BaseImage
                    scale={0.15}
                    ref={environmentList[0]}
                    posInfo={{ l: 0.41, t: 0.63 }}
                    url={"SB_37_Underwater_BG/SB37_middle_plant3_0" + (1) + ".svg"}
                />
                <BaseImage
                    scale={0.2}
                    ref={environmentList[1]}
                    posInfo={{
                        l: 0.18,
                        t: 0.55
                    }}
                    url={"SB_37_Underwater_BG/SB37_bg_plant_01.svg"}
                />
                <BaseImage
                    scale={0.2}
                    ref={environmentList[2]}
                    posInfo={{
                        l: 0.68,
                        t: 0.55
                    }}
                    url={"SB_37_Underwater_BG/SB37_bg_plant1_01.svg"}
                />
                <BaseImage
                    scale={0.2}
                    ref={environmentList[3]}
                    posInfo={{
                        l: 0.68,
                        t: 0.62
                    }}
                    url={"SB_37_Underwater_BG/SB37_right_corner_plant_01.svg"}
                />
                <BaseImage
                    scale={0.2}
                    ref={environmentList[4]}
                    posInfo={{
                        l: 0.18,
                        t: 0.54
                    }}
                    url={"SB_37_Underwater_BG/SB37_Left_corner_plant1_01.svg"}
                />
                <BaseImage
                    scale={0.2}
                    ref={environmentList[5]}
                    posInfo={{
                        l: 0.58,
                        t: 0.58
                    }}
                    url={"SB_37_Underwater_BG/SB37_middle_plant1_01.svg"}
                />

                <div
                    ref={staticObjectRef}
                    style={{
                        position: 'absolute',
                        width: '100%', height: '100%', left: '0%', top: '0%'
                    }}
                >
                    <BaseImage
                        ref={characterRef}
                        scale={posInfoList[0].s}
                        posInfo={posInfoList[0]}
                        url={"SB_37_Character-Interactive/" + characterList[0] + ".svg"}
                    />
                    {
                        [0, 1, 2, 3].map(value =>
                            <BaseImage
                                ref={eyeList[value]}
                                scale={eyePosInfoList[0].s}
                                posInfo={eyePosInfoList[0]}
                                url={"SB_37_Character-Interactive/" + characterList[0] + "_Eye_0" + (value + 1) + ".svg"}
                            />
                        )
                    }
                </div>

                <BaseImage
                    ref={threePartBackRef}
                    url={"SB_37_BG/" + threePartbackList[0] + ".svg"}
                />

                <BaseImage
                    ref={circleIconRef}
                    scale={0.2}
                    posInfo={{ l: 0.4, t: 0.30 }}
                    url={"SB_37_FG/SB_37_FG_Circle_Icon.svg"}
                />


            </div>

            <div

                style={{
                    position: "fixed", width: _geo.width + "px",
                    height: window.innerHeight + "px"
                    , left: _geo.left + "px",
                    top: '0%',
                }}>
                <BaseImage
                    ref={progressRef}
                    scale={0.35}
                    posInfo={{ l: 0.325, t: 0.0 }}
                    url={"SB_37_Icons/SB_37_Progress-bar-board.svg"}
                />

                {
                    threePartbackList.map(
                        (item, index) => <BaseImage
                            ref={markRefList[index]}
                            scale={0.08}
                            posInfo={{
                                l:
                                    threePartbackList.length == 6 ?
                                        0.35 + index * 0.043 : 0.35 + index * 0.037
                                ,
                                t: 0.003
                            }}
                            url={"SB_37_Icons/SB_37_Grey_Paw_Icon.svg"}
                        />
                    )
                }

                <BaseImage
                    ref={textRefList[0]}
                    scale={0.12}
                    posInfo={{ l: 0.125, t: 0.03 }}
                    url={"SB_37_Text-Interactive/SB_37_TI_Land.svg"}
                />

                <BaseImage
                    ref={textRefList[1]}
                    scale={0.18}
                    posInfo={{ l: 0.725, b: 0.03 }}
                    url={"SB_37_Text-Interactive/SB_37_TI_Land-and-Water.svg"}
                />
                <BaseImage
                    ref={textRefList[2]}
                    scale={0.12}
                    posInfo={{ l: 0.78, t: 0.03 }}
                    url={"SB_37_Text-Interactive/SB_37_TI_Water.svg"}
                />

                <BaseImage
                    ref={textRefList[3]}
                    className="hideObject"
                    scale={0.12}
                    posInfo={{ l: 0.125, t: 0.03 }}
                    url={"SB_37_Text-Interactive/SB_37_TI_Snow.svg"}
                />
            </div>

            <div
                ref={dragPanel}
                className="aniObject"

            >
                {isShow &&
                    <Draggable
                        onDrag={dragFunc}
                        onStart={dragStartFunc}
                        onStop={dragEndFunc}
                    >
                        <div
                            ref={dragCharacterBaseRef}
                            style={{
                                position: "fixed", width: _baseGeo.width * 0.08 + "px",
                                height: _baseGeo.height * 0.08 + "px"
                                , left: _baseGeo.left + _baseGeo.width * 0.46 + "px",
                                top: _baseGeo.top + _baseGeo.height * 0.42 + "px",
                                cursor: 'grab',
                                transform: 'scale(' + (currentCharacter != null && currentCharacter.includes('Cheetah') ? 0.8 : 1) + ")"

                            }}>
                            {currentCharacter != null &&
                                <BaseImage
                                    ref={dragCharacterRef}
                                    scale={currentCharacter != null && currentCharacter.includes('Cheetah') ? 1.7 : 1.9}
                                    posInfo={{
                                        l: currentCharacter != null && currentCharacter.includes('Cheetah') ? -0.35 : -0.45,
                                        t: currentCharacter != null && currentCharacter.includes('Cheetah') ? -0.8 : -1
                                    }}
                                    url={"SB_37_Character-Interactive/" + currentCharacter.slice(0, currentCharacter.length - 1) + "1.svg"}
                                />
                            }
                        </div>
                    </Draggable>
                }
            </div>

            <div ref={bubbleList[0]}>
                <div>
                    <div className={isBubbleShow ? "bubble" : 'hideObject'} style={{
                        position: "fixed", width: _baseGeo.width * 0.08 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.64 + "px",
                        bottom: _baseGeo.height * 0.24 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/Bubbles/SB_51_SEA_BG_bubble_01.svg"}
                        />
                    </div>

                    <div className={isBubbleShow ? "bubble1" : 'hideObject'} style={{
                        position: "fixed", width: _baseGeo.width * 0.04 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.24 + "px",
                        bottom: _baseGeo.height * 0.04 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/Bubbles/SB_51_SEA_BG_bubble1.svg"}
                        />
                    </div>
                </div>
            </div>


            <div ref={bubbleList[1]}>
                <div className="bubble1" style={{
                    position: "fixed", width: _baseGeo.width * 0.04 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.34 + "px",
                    bottom: _baseGeo.height * 0.14 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/Bubbles/SB_51_SEA_BG_bubble1.svg"}
                    />
                </div>



                <div className="bubble1" style={{
                    position: "fixed", width: _baseGeo.width * 0.04 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.64 + "px",
                    bottom: _baseGeo.height * 0.24 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/Bubbles/SB_51_SEA_BG_bubble1.svg"}
                    />
                </div>



                <div className="bubble" style={{
                    position: "fixed", width: _baseGeo.width * 0.08 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.04 + "px",
                    bottom: _baseGeo.height * 0.04 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/Bubbles/SB_51_SEA_BG_bubble_03.svg"}
                    />
                </div>
            </div>



            <div
                ref={animationRef}
                style={{
                    position: "fixed", width: _baseGeo.width * animationPosInfoList[0].w + "px"
                    , left: _baseGeo.left + _baseGeo.width * animationPosInfoList[0].l + "px",
                    top: _baseGeo.top + _baseGeo.height * animationPosInfoList[0].t + "px",
                }}>
                <Lottie
                    ref={aniLottie}
                    autoplay options={returnOption()}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                    isStopped={isAniStop}
                    playSegments={returnStartPointer()}
                />
            </div>





            <div
                ref={snowRef}

                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px"
                    , left: _baseGeo.left + _baseGeo.width + "px",
                    top: _baseGeo.bottom + "px",
                    left: _baseGeo.left + "px",
                }}>
                {[0, -1, -2, -3, -4].map(
                    value =>
                        <BaseImage
                            posInfo={{ t: value }}
                            url={"SB_37_BG/SB_37_Snow_BG_Flakes.svg"}
                        />
                )}
                {[0, -1, -2, -3, -4].map(
                    (value, index) => {
                        return <BaseImage
                            posInfo={{ t: value, l: 0.05 * index }}
                            url={"SB_37_BG/SB_37_Snow_BG_Flakes.svg"}
                        />
                    }
                )}
            </div>
            <div
                ref={refFish}
                className='hideObject'
                style={{
                    position: "fixed", width: _baseGeo.width * 0.24 + "px",
                    height: _baseGeo.width * 0.18 + "px",
                    left: _baseGeo.width * 0.35 + _baseGeo.left,
                    top: _baseGeo.height * 0.4 + _baseGeo.top,

                }}>
                <div
                    style={{ position: 'abslute', width: '100%', height: '100%', left: '0%', top: '0%', transform: 'rotateY(180deg) scale(0.7)', }}

                >

                    <BaseImage
                        ref={fishBodyList[0]}
                        url={"SB_37_Character-Interactive/SB_51_fish/fish_01.svg"}

                    />
                    <BaseImage
                        ref={fishBodyList[1]}
                        className='hideObject'
                        url={"SB_37_Character-Interactive/SB_51_fish/fish_02.svg"}
                    />
                    <BaseImage
                        ref={fishBodyList[2]}
                        className='hideObject'
                        url={"SB_37_Character-Interactive/SB_51_fish/fish_03.svg"}
                    />
                    <BaseImage
                        ref={fishBodyList[3]}
                        className='hideObject'
                        url={"SB_37_Character-Interactive/SB_51_fish/fish_04.svg"}
                    />

                    <BaseImage
                        ref={fishEyeList[0]}
                        posInfo={{ l: 0.115, t: 0.34 }}
                        scale={0.11}
                        url={"SB_37_Character-Interactive/SB_51_fish/fish_eye_4open.svg"}
                    />

                    <BaseImage
                        ref={fishEyeList[1]}
                        posInfo={{ l: 0.115, t: 0.34 }}
                        scale={0.11}
                        className='hideObject'
                        url={"SB_37_Character-Interactive/SB_51_fish/fish_eye_3midle_B.svg"}
                    />
                    <BaseImage
                        ref={fishEyeList[2]}
                        posInfo={{ l: 0.115, t: 0.34 }}
                        scale={0.11}
                        className='hideObject'
                        url={"SB_37_Character-Interactive/SB_51_fish/fish_eye_2close.svg"}
                    />
                </div>

            </div>

        </div>
    );
}
