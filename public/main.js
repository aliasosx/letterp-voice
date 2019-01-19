const video = document.querySelector("#video");

//var remoteControl = new RemoteControl(video);
var recognition = new webkitSpeechRecognition();
const Http = new XMLHttpRequest();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();
//responsiveVoice.speak("hello world");
recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            console.log(event.results[i][0]);
            $("p").text(event.results[i][0].transcript.trim());
            if (event.results[i][0].transcript.trim() == "open") {

                const url = 'https://localhost:8000/test';
                Http.open("GET", url);
                Http.send();
                console.log('sent')
                Http.onreadystatechange = (e) => {
                    if (Http.responseText) {
                        $("p").text("Server answer is " + Http.responseText);
                        //responsiveVoice.speak("Server answer is " + Http.responseText);
                    } else {
                        $("p").text("Server is down cannot be proceed");
                        //responsiveVoice.speak("Server is down cannot be proceed");
                    }

                }
            } else if (event.results[i][0].transcript.trim() == "info") {
                const url = 'http://localhost:8001/info';
                Http.open("GET", url);
                Http.send();
                console.log('sent')
                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText);
                    $("p").text("Server answer is " + Http.responseText + ".");
                }
            }
        }
    }
}