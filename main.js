const root = document.getElementById('root')

async function start() {
  const respone = await fetch('https://api.thaistock2d.com/live');
  const data = await respone.json();
  console.log(data)
  
  const numDisplay = 
  `<div class="number-display blinking">${data.live.twod}</div>
    <div class="update-time">Updated: ${data.live.time}</div>
    <div class="box">
        <div class="small-box">
            <div>SET : <span class="set">${data.result[1].set}</span></div>
            <div>Value : <span class="value">${data.result[1].value}</span></div>
         </div>
         <div class="date">
           <p>${data.result[1].stock_date}</p>
           12:01 PM
         </div>
        <div class="result">2D : ${data.result[1].twod}</div>
     </div>
     <div class="box">
        <div class="small-box">
            <div>SET : <span class="set">${data.result[3].set}</span></div>
            <div>Value : <span class="value">${data.result[3].value}</span></div>
         </div>
         <div class="date">
           <p>${data.result[3].stock_date}</p>
           4:30 PM
         </div>
        <div class="result">2D : ${data.result[3].twod}</span></div>
     </div> `

    root.innerHTML = numDisplay;
    
    
}


setInterval(start, 4000)


start()

