(function() {
  if (document.getElementById('weather-widget')) return;

  const widget = document.createElement('div');
  widget.id = 'weather-widget';
  widget.innerHTML = `
    <div id="widget-header">
      <span id="widget-close">&times;</span>
    </div>
    <div id="widget-content">Loading...</div>
  `;

  document.body.appendChild(widget);

  // Log to see if the widget is added correctly
  console.log('Widget added to the page.');

  fetch('https://api.weatherapi.com/v1/current.json?key=b060dd9bd9b6426eb4a53106242407&q=Delhi')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Log the fetched data to ensure it's being received
      console.log('Weather data fetched:', data);

      document.getElementById('widget-content').innerHTML = `
        <p>Location: ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Weather: ${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
      `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('widget-content').innerHTML = 'Error fetching weather data.';
    });

  const header = document.getElementById('widget-header');
  let isDragging = false;
  let offsetX, offsetY;

  header.onmousedown = function(event) {
    isDragging = true;
    offsetX = event.clientX - widget.offsetLeft;
    offsetY = event.clientY - widget.offsetTop;
  };

  document.onmousemove = function(event) {
    if (isDragging) {
      widget.style.left = `${event.clientX - offsetX}px`;
      widget.style.top = `${event.clientY - offsetY}px`;
    }
  };

  document.onmouseup = function() {
    isDragging = false;
  };

  document.getElementById('widget-close').onclick = function() {
    widget.remove();
  };
})();
