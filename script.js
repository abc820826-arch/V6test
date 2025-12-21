let DICTIONARY = {};

async function init() {
  const res = await fetch('data.json');
  DICTIONARY = await res.json();

  renderDatalist('list-genre', 'genre');
  renderDatalist('list-angle', 'angle');
  renderDatalist('list-location', 'location');

  // V10：渲染圖例
  renderExamples('genre-examples', 'genre', 'genre');
  renderExamples('angle-examples', 'angle', 'angle');
  renderExamples('location-examples', 'location', 'location');
}

function renderDatalist(id, key) {
  const dl = document.getElementById(id);
  if (!dl || !DICTIONARY[key]) return;
  dl.innerHTML = DICTIONARY[key]
    .map(i => `<option value="${i.zh}"></option>`)
    .join('');
}

/* ===== V10 核心：圖例渲染 ===== */
function renderExamples(containerId, key, inputId) {
  const box = document.getElementById(containerId);
  if (!box || !DICTIONARY[key]) return;

  box.innerHTML = DICTIONARY[key]
    .filter(i => i.example)
    .map(i => `
      <div class="example-card"
           onclick="document.getElementById('${inputId}').value='${i.zh}'">
        <img src="${i.example}">
        <span>${i.zh}</span>
      </div>
    `).join('');
}

function generatePrompt() {
  const genre = document.getElementById('genre').value;
  const angle = document.getElementById('angle').value;
  const location = document.getElementById('location').value;
  const free = document.getElementById('freeText').value;

  const prompt = [
    genre,
    angle,
    location,
    free,
    '--negative low quality, cropped, extra limbs'
  ].filter(Boolean).join(', ');

  document.getElementById('output').textContent = prompt;
}

window.onload = init;
