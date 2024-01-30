var current = '';
var names = [];
var total = 0;

// Function to load the SVG file
function loadSVG() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "norway.svg", true);
  xhr.overrideMimeType("image/svg+xml");
  xhr.onload = function(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var svg = document.getElementById("svg")
      svg.innerHTML = xhr.responseText;

      var fylker = document.getElementById("g10207").children;
      for (var i = 0; i < fylker.length; i++) {
        var name = fylker[i].getAttribute('inkscape:label');

        if (name === 'Oslo') {
          names.push(name);
          addHandler(fylker[i]);
        } else {
          var kommuner = fylker[i].children;
          for (var j = 0; j < kommuner.length; j++) {
            names.push(kommuner[j].getAttribute('inkscape:label'));
            addHandler(kommuner[j]);
          }
        }
      }

      total = names.length;
      generateNewKommune();
    }
  };
  xhr.send();
}

function generateNewKommune() {
  const random = Math.floor(Math.random() * names.length);
  current = names[random];

  var num = document.getElementById("number")
  num.innerHTML = (total - names.length) + "/" + total;

  var text = document.getElementById("name")
  text.innerHTML = current;
}

function addHandler(k) {
  k.onmouseover = function(e) {
    e.target.style.fill = 'red';
  };
  k.onmouseout = function(e) {
    e.target.style.fill = '#afafaf';
  };
  k.onclick = function(e) {
    if (e.target.getAttribute('inkscape:label') === current) {
      e.target.style.fill = 'green';
      e.target.onmouseover = function(e) {
        var text = document.getElementById("name2")
        text.innerHTML = e.target.getAttribute('inkscape:label');
      };
      e.target.onmouseout = function(e) {
        var text = document.getElementById("name2")
        text.innerHTML = '';
      };

      names.splice(names.findIndex(a => a === current), 1);
      if (names.length === 0) {
        var num = document.getElementById("number")
        num.innerHTML = total + "/" + total;

        var text = document.getElementById("name")
        text.innerHTML = "YOU WIN";
      } else {
        generateNewKommune();
      }
    }
  }
}

// Call loadSVG on window load
window.onload = function() {
  loadSVG();
};
