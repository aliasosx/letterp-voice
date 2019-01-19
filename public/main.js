const video = document.querySelector("#video");

//var remoteControl = new RemoteControl(video);
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();

recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            console.log(event.results[i][0]);
            $("p").text(event.results[i][0].transcript.trim());
            if (event.results[i][0].transcript.trim() == "open") {
                const Http = new XMLHttpRequest();
                const url = 'https://localhost:8000/test';
                Http.open("GET", url);
                Http.send();
                console.log('sent')
                Http.onreadystatechange = (e) => {
                    console.log(e)
                }
            }
        }
    }
}