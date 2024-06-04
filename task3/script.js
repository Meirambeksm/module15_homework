const input = document.querySelector(".input");
const sendBtn = document.querySelector(".send-btn");
const geoBtn = document.querySelector(".geo-btn");
const chat = document.querySelector(".chat");

const webSocket = new WebSocket("wss://echo-ws-service.herokuapp.com");

function writeToScreen(message) {
  const result = document.querySelector(".chat");
  result.innerHTML += `<p class="sent-text">${message}</p>`;
}

function responseToScreen(message) {
  document.querySelector(
    ".chat"
  ).innerHTML += `<p class="response-text">${message}</p>`;
}

sendBtn.addEventListener("click", () => {
  const message = document.querySelector(".input").value;

  webSocket.onmessage = function (e) {
    responseToScreen(e.data);
  };

  writeToScreen(message);
  webSocket.send(message);

  document.querySelector(".input").value = "";
});

geoBtn.addEventListener("click", function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      const url = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      writeToScreen(url);
      responseToScreen(url);
    });
  }
});
