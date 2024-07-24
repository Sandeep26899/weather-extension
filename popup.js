document.addEventListener('DOMContentLoaded', function() {
    fetchWeather();
    document.getElementById('open-widget').addEventListener('click', openWidget);
  });
  
  function fetchWeather() {
    fetch('https://api.weatherapi.com/v1/current.json?key=b060dd9bd9b6426eb4a53106242407&q=Delhi')
      .then(response => response.json())
      .then(data => {
        document.getElementById('weather').innerHTML = `
          <p>Location: ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
          <p>Temperature: ${data.current.temp_c}°C</p>
          <p>Weather: ${data.current.condition.text}</p>
          <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
        `;
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }
  
  function openWidget() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['widget.js']
      });
  
      chrome.scripting.insertCSS({
        target: { tabId: tabs[0].id },
        files: ['widget.css']
      });
    });
  }
  