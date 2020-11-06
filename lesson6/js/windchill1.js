
// Calculates the wind chill factor in Farenheit

    let t= document.getElementById('currenttemp').textContent;
    let s= document.getElementById('speed').textContent;
    
    if (t <= 50 && s >= 3) { 
       let f = 35.74 + (0.6215 * t) - (35.75 * (s**0.16)) + (0.4275 * t * (s**0.16));
       let output = Math.round(f) + "&#8457;";
       document.getElementById('wind').innerHTML = output;
       }
      else{
       document.getElementById('wind').textContent = "N/A";
      }
    