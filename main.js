const loader = document.getElementById('loader');

let hasValidData = false;

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function fetchData() {
  try {
    const response = await fetch('https://api.thaistock2d.com/live', { cache: "no-store" });
    if (!response.ok) throw new Error('Fetch failed');

    const data = await response.json();
    
    if (data.holiday.status == "3" || data.live.set == "--" || data.live.value == "--") {
      document.querySelector(".blinking").classList.remove("blinking");
    }
    // Update UI with data
    document.getElementById('live-twod').textContent = data.live.twod;
    document.getElementById('update-time').textContent = `Updated: ${data.live.time}`;

    document.getElementById('set1').textContent = data.result[1].set;
    document.getElementById('value1').textContent = data.result[1].value;
    document.getElementById('date1').textContent = data.result[1].stock_date;
    document.getElementById('twod1').textContent = `2D : ${data.result[1].twod}`;

    document.getElementById('set2').textContent = data.result[3].set;
    document.getElementById('value2').textContent = data.result[3].value;
    document.getElementById('date2').textContent = data.result[3].stock_date;
    document.getElementById('twod2').textContent = `2D : ${data.result[3].twod}`;

    
    if (!hasValidData) {
      hideLoader();
      hasValidData = true;
    }
  } catch (error) {

    if (!hasValidData) {
      showLoader();
    }

    document.getElementById('update-time').textContent = 'Waiting for internet...';
  }
}


setInterval(fetchData, 4000);
fetchData();


window.addEventListener('offline', () => {
  
  document.getElementById('update-time').textContent = 'You are offline.';
});


window.addEventListener('online', () => {
  fetchData();
});
