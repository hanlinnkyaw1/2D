const loader = document.getElementById('loader');

let websocket;

function getPart1() { return 'v'; }
function getPart2() { return 'v'; }
function getPart3() { return 'a'; }

const parts = [
  'wss:', '//',
  getPart1(), getPart2(), 'ipz', 'z', getPart3(),
  '.', 'com', ':3003', '/', 'socket', '.io/?',
  'EIO=', '4&tr', 'ansp', 'ort=', 'webso', 'cket'
];


function connectWebSocket() {
  websocket = new WebSocket(parts);

  websocket.onopen = () => {
    console.log('WebSocket connection established');
    const authorizationMessage = '40{"authorization":"youweremyeverything"}';
    websocket.send(authorizationMessage); // Send the authorization
  };

  websocket.onmessage = (event) => {
    
    const data = event.data;

    if (data.startsWith('42[') && data.endsWith(']')) {
      const jsonData = JSON.parse(data.substring(2));
      const eventName = jsonData[0];
      const payload = jsonData[1];

      if (eventName === "data") {
        loader.style.display = "none";
        console.log(payload);

        updateUI(payload);

        if (!payload.isRunning) {
          document.querySelector(".blinking")?.classList.remove("blinking");
        }

        console.log(payload.morningRound.digit);
      }
    }
  };

  websocket.onclose = () => {
    console.warn('WebSocket closed.');
  };

  websocket.onerror = (err) => {
    console.error('WebSocket error:', err);
    loader.style.display = "flex";
  };
}

// Call connect when page loads
connectWebSocket();

window.addEventListener('offline', () => {
  document.getElementById('update-time').textContent = 'You are offline.';
});

window.addEventListener('online', () => {
  document.getElementById('update-time').textContent = 'Back online! Reconnecting WebSocket...'
  connectWebSocket();
  adsLoadOne();
  adsLoadTwo();
});


// Update UI
function updateUI(data) {
  document.getElementById('live-twod').textContent = data.digit;
  document.getElementById('update-time').textContent = data.serverTime;

  // Morning
  document.getElementById('set1').textContent = data.morningRound.set;
  document.getElementById('value1').textContent = data.morningRound.value;
  document.getElementById('twod1').textContent = `2D : ${data.morningRound.digit}`;

  // Evening
  document.getElementById('set2').textContent = data.eveningRound.set;
  document.getElementById('value2').textContent = data.eveningRound.value;
  document.getElementById('twod2').textContent = `2D : ${data.eveningRound.digit}`;

  // Modern
  document.getElementById('modern-morning').textContent = data.mornet.modernMorning;
  document.getElementById('modern-evening').textContent = data.mornet.modernEvening;

  // Internet
  document.getElementById('internet-morning').textContent = data.mornet.internetMorning;
  document.getElementById('internet-evening').textContent = data.mornet.internetEvening;
  
  document.getElementById('date1').textContent = data.updatedAt.split("T")[0];
  document.getElementById('date2').textContent = data.updatedAt.split("T")[0];
  document.querySelector('.tw-morning').textContent = data.tw;
}

function adsLoadOne() {
  const ads1 = document.getElementById('ads1');
  const config1 = document.createElement('script');
  config1.type = 'text/javascript';
  config1.textContent = `
    atOptions = {
      key: 'a18afc084310f7ccf5ba8fb925340a70',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    };
  `;

  const src1 = document.createElement('script');
  src1.src = '//www.highperformanceformat.com/a18afc084310f7ccf5ba8fb925340a70/invoke.js';
  src1.async = true;
  
  ads1.appendChild(config1);
  ads1.appendChild(src1);
  
  console.log('reach ads section')
};

function adsLoadTwo() {
  const ads2 = document.getElementById('ads2');
  
  const config2 = document.createElement('script');
  config2.type = 'text/javascript';
  config2.textContent = `
    atOptions = {
      key: '076395e05dea391e901e9a5c89254f65',
      format: 'iframe',
      height: 50,
      width: 300,
      params: {}
    };
  `;

  const src2 = document.createElement('script');
  src2.src = '//www.highperformanceformat.com/076395e05dea391e901e9a5c89254f65/invoke.js';
  src2.async = true;
  
  ads2.appendChild(config2);
  ads2.appendChild(src2);
}
adsLoadTwo();

setTimeout(adsLoadOne,10000);


