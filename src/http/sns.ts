export const ajaxRequest = (url, data, successCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  xhr.setRequestHeader("X-CSRF-Token", csrfToken);
  //xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (successCallback !== null && typeof successCallback === "function") {
          successCallback(JSON.parse(xhr.responseText));
        }
      } else {
        console.log("Error! Data received:", xhr.statusText);
        alert("Error : " + xhr.statusText);
      }
    }
  };
  xhr.send(encodeURI(data));
};

export const websocketCommand = (messageCallback) => {
  // 현재 웹 서버의 호스트와 프로토콜을 가져옵니다.
  const host = window.location.host;
  const protocol = window.location.protocol;

  // 현재 호스트와 프로토콜을 사용하여 WebSocket URL을 생성합니다.
  const socketURL =
    protocol === "https:" ? "wss://" : "ws://" + host + "/ws/asa3";

  // WebSocket 연결
  const socket = new WebSocket(socketURL);
  console.log(`Web Socket URL: ${socketURL}`);

  socket.onopen = function () {
    console.log("WebSocket 연결이 열렸습니다.");
    $("#connect2server").text("Connect");
  };

  socket.onmessage = function (event) {
    const command = event.data;
    messageCallback(command);
  };

  socket.onclose = function () {
    console.log("WebSocket 연결이 닫혔습니다.");
    $("#connect2server").text("Disconnect");
  };
};
