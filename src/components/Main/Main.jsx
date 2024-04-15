import React, { useContext } from 'react';
import './Main.css'
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import useSpeechToText from '../../Speech';


const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    const {isListening, transcript, startListening, stopListening} = useSpeechToText({continuous:true});

    const startStopListening = ()=>{
        isListening ? stopVoiceInput() : startListening()
    }

    const stopVoiceInput = ()=>{
        setInput(recentPrompt => recentPrompt + (transcript.length ? (recentPrompt.length? ' ' : '') + transcript : ''))
        stopListening
    }

    function inputKeyUp(e) {
        e.which = e.which || e.keyCode;
        if (e.which == 13) {
            if (input !== "") {
                onSent()
            }
        }
    }

    


    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-containter">


                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can i help you today?</p>
                        </div>
                        <div className="cards">
                            <div onClick={() => setInput("Suggest beginner programming languages").document.querySelector('.search-box input').setAttribute('value', input)} className="card">
                                <p>Suggest beginner programming languages</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div onClick={() => setInput("Briefly summarize this concept: Red–black trees").document.querySelector('.search-box input').setAttribute('value', input)} className="card">
                                <p>Briefly summarize this concept: Red–black trees</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div onClick={() => setInput("Brainstorm team bonding activities for our work retreat").document.querySelector('.search-box input').setAttribute('value', input)} className="card">
                                <p>Brainstorm project ideas for an </p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div onClick={() => setInput("What is react js?").document.querySelector('.search-box input').setAttribute('value', input)} className="card">
                                <p>What is react js?</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ? <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} onKeyUp={inputKeyUp} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate infor, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Main