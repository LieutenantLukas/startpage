// Time and date settings
function startTime() {
  var currentDate = new Date();
  var hr = parseInt(currentDate.getHours());
  var min = parseInt(currentDate.getMinutes());
  //Add a zero in front of numbers<10
  if (min < 10) {
    min = "0" + min;
  }
  document.getElementById("header-time").innerHTML = hr + ":" + min;

  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  var date = currentDate.toLocaleDateString("en-GB", dateOptions);
  document.getElementById("header-date").innerHTML = date;

  var time = setTimeout(function(){ startTime() }, 60000);
}
// Random Quotes
const quotes = [
  'Hello, world...',
  'Goodbye world sudo rm -rf *',
];
document.getElementById("header-quote").innerText = quotes[
  Math.floor(Math.random() * quotes.length)
];

document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('#link')) return;
	// Otherwise, run your code...
	document.body.style.opacity = 0;

}, false);

const $s = {
  qS: e => document.querySelector(e),
  qA: e => document.querySelectorAll(e)
};

function engines () {
  return {
    e: ['https://www.ecosia.org/search?q=', 'Ecosia'],
	yt: ['https://youtube.com/results?search_query=', 'Youtube'],
    g: ['https://github.com/search?q=', 'GitHub'],
    s: ['https://stackoverflow.com/search?q=', 'Stackoverflow'],
    at: ['https://alternativeto.net/browse/search?q=', 'AlternativeTo'],
    w: ['https://en.wikipedia.org/w/index.php?search=', 'Wikipedia'],
    i: ['https://google.com/search?tbm=isch&q=', 'Google Images'],
  };
}

var search  = $s.qS('#search'),
    input   = $s.qS('#search input[type="text"]'),
    engines = engines();

for (var key in engines)
  $s.qS('.search-engines').innerHTML += `<li><p title="${engines[key][1]}">!${key}</p></li>`;

document.onkeypress = (e) => {
    if (e.key == 's')
      search.classList.add('active');

    input.focus();
    input.scrollIntoView();

    search.onkeyup = (e) => {
      let args   = e.target.value.split(' '),
          prefix = args[0],
          engine = engines['e'][0], // the default engine
          str    = 0;

      $s.qA('.search-engines li p').forEach((eng) => {
        let current = eng.parentNode;

        (prefix == eng.innerHTML)
          ? current.classList.add('active')
          : current.classList.remove('active');
      });

      if (e.key == 'Enter') {
        if (prefix.indexOf('!') == 0)
          (engine = engines[prefix.substr(1)][0], str = 3);

        window.location = engine + args.join(' ').substr(str).toString().replace(/\s+/m, '%20');
      } else if (e.keyCode == 27)
        search.classList.remove('active');
    };
};

document.getElementById("container").addEventListener("DOMContentLoaded", startTime());
