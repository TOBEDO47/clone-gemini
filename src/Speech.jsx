import React, {useEffect, useRef, useState} from 'react'


const useSpeechToText = (options) => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null)

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Web speech api is not supported.")
            return
        }

        recognitionRef.current = new window.webkitSpeechRecognition()
        const recognition = recognitionRef.current;
        recognition.interimResults = options.interimResults || true
        recognition.lang = options.lang || "en-US"
        recognition.continuous = options.continuous || false

        recognition.onresult = (event) => {
            let text = ""
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
            // Update the input value in real-time
            options.onTranscriptChange(text)
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error)
        }

        recognition.onend = () => {
            setIsListening(false)
            setTranscript("")
            if (options.continuous) {
                startListening()
            }
        }

        return () => {
            recognition.stop()
      
        }
        
    }, [options.continuous, options.onTranscriptChange])

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening
    }
}

export default useSpeechToText
