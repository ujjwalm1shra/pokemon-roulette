const spinBtn = document.getElementById("spinBtn");
const replayBtn = document.getElementById("replayBtn");
const pokemonName = document.getElementById("pokemonName");
const pokeImg = document.getElementById("pokeImg");
const statChoices = document.getElementById("statChoices");
const statsDiv = document.getElementById("stats");
const loader = document.getElementById("loader");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const closestName = document.getElementById("closestName");
const closestImg = document.getElementById("closestImg");
const closestTotal = document.getElementById("closestTotal");
const closestCard = document.getElementById("closestCard");
const cardName = document.getElementById("cardName");
const cardImg = document.getElementById("cardImg");
const cardFlavor = document.getElementById("cardFlavor");
const cardStats = document.getElementById("cardStats");
const cardMoves = document.getElementById("cardMoves");
const cardEvo = document.getElementById("cardEvo");
const downloadCardBtn = document.getElementById("downloadCardBtn");
const pokemonPerimeter = document.getElementById("pokemonPerimeter");

function createPokemonPerimeter() {
  for (let id = 1; id <= 151; id++) {
    const progress = (id - 1) / 151;
    const image = document.createElement("img");
    image.className = "perimeter-pokemon";
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
    image.alt = "";
    image.loading = "lazy";
    image.style.setProperty("--pokemon-size", `${42 + (id % 4) * 8}px`);
    image.style.setProperty("--pokemon-opacity", `${0.16 + (id % 4) * 0.045}`);
    image.style.setProperty("--pokemon-rotation", `${(id % 7) * 5 - 15}deg`);
    image.style.setProperty("--pokemon-delay", `${-(id % 10) * 0.3}s`);

    if (progress < 0.25) {
      image.style.setProperty("--pokemon-left", `${progress * 4 * 100}%`);
      image.style.setProperty("--pokemon-top", `${id % 2 ? 1 : 5}%`);
    } else if (progress < 0.5) {
      image.style.setProperty("--pokemon-left", `${id % 2 ? 1 : 95}%`);
      image.style.setProperty("--pokemon-top", `${(progress - 0.25) * 4 * 100}%`);
    } else if (progress < 0.75) {
      image.style.setProperty("--pokemon-left", `${(1 - (progress - 0.5) * 4) * 100}%`);
      image.style.setProperty("--pokemon-top", `${id % 2 ? 91 : 96}%`);
    } else {
      image.style.setProperty("--pokemon-left", `${id % 2 ? 1 : 95}%`);
      image.style.setProperty("--pokemon-top", `${(1 - (progress - 0.75) * 4) * 100}%`);
    }
    pokemonPerimeter.appendChild(image);
  }
}

let pokemons = [];
let available = [];
let current = null;
let turn = 0;
const custom = {hp:0, attack:0, defense:0, "special-attack":0, "special-defense":0, speed:0};

function totalScore() {
  return Object.values(custom).reduce((total, value) => total + value, 0);
}

function updateScore() {
  const total = totalScore();
  scoreEl.textContent = total;
  statusEl.textContent = turn < 6 ? "IN PROGRESS" : total >= 500 ? "YOU WIN" : "YOU LOSE";
  statusEl.className = "status " + (turn < 6 ? "" : total >= 500 ? "win" : "lose");
}

function renderStats() {
  statsDiv.innerHTML = "";
  for (const key in custom) {
    const row = document.createElement("div");
    row.className = `stat-row stat-${key}`;
    row.innerHTML = `<span>${key.replaceAll("-", " ").toUpperCase()}</span><div class="bar"><div class="fill" style="width:${custom[key]}%"></div></div>`;
    statsDiv.appendChild(row);
  }
  updateScore();
}

async function load() {
  const generation = await fetch("https://pokeapi.co/api/v2/generation/1/").then(response => response.json());
  let loaded = 0;
  pokemons = await Promise.all(generation.pokemon_species.map(async species => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}`).then(response => response.json());
    loader.textContent = `Loaded ${++loaded}/151`;
    return {name:data.name, stats:data.stats, img:data.sprites.front_default, moves:data.moves};
  }));
  available = [...pokemons];
  loader.textContent = "Ready to spin!";
  spinBtn.disabled = false;
  renderStats();
}

function spin() {
  if (spinBtn.disabled) return;
  spinBtn.disabled = true;
  statChoices.style.display = "none";
  let ticks = 0;
  const animation = setInterval(() => {
    current = available[Math.floor(Math.random() * available.length)];
    pokemonName.textContent = current.name.toUpperCase();
    pokeImg.src = current.img;
    if (++ticks > 20) {
      clearInterval(animation);
      statChoices.style.display = "grid";
    }
  }, 80);
}

async function buildClosestCard(pokemon) {
  const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`).then(response => response.json());
  const evolutionChain = await fetch(species.evolution_chain.url).then(response => response.json());
  const flavor = species.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text.replace(/\n|\f/g, " ");
  const moves = pokemon.moves.slice(0, 2).map(move => move.move.name.replace("-", " ")).join(", ");
  cardName.textContent = pokemon.name.toUpperCase();
  cardImg.src = pokemon.img;
  cardFlavor.textContent = flavor;
  cardStats.innerHTML = pokemon.stats.map(stat => `<div>${stat.stat.name}: ${stat.base_stat}</div>`).join("");
  cardMoves.textContent = moves;
  cardEvo.textContent = getEvoLine(evolutionChain.chain);
  closestCard.style.display = "block";
}

function getEvoLine(chain) {
  const line = [];
  while (chain) {
    line.push(chain.species.name);
    chain = chain.evolves_to[0];
  }
  return line.join(" -> ");
}

function downloadCard() {
  html2canvas(closestCard).then(canvas => {
    const link = document.createElement("a");
    link.download = "pokemon-card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

spinBtn.onclick = spin;
downloadCardBtn.onclick = downloadCard;
replayBtn.onclick = () => {
  turn = 0;
  available = [...pokemons];
  Object.keys(custom).forEach(key => custom[key] = 0);
  scoreEl.textContent = 0;
  statusEl.textContent = "-";
  pokemonName.textContent = "---";
  pokeImg.src = "";
  closestCard.style.display = "none";
  replayBtn.style.display = "none";
  closestName.textContent = "-";
  closestImg.src = "";
  closestTotal.textContent = "";
  spinBtn.disabled = false;
  renderStats();
};

statChoices.querySelectorAll("button").forEach(button => {
  button.onclick = () => {
    const stat = button.dataset.stat;
    if (custom[stat]) return alert("Stat already assigned");
    custom[stat] = current.stats.find(item => item.stat.name === stat).base_stat;
    available = available.filter(pokemon => pokemon !== current);
    turn++;
    renderStats();
    statChoices.style.display = "none";
    if (turn === 6) {
      const total = totalScore();
      const closest = pokemons.sort((a, b) => Math.abs(a.stats.reduce((sum, stat) => sum + stat.base_stat, 0) - total) - Math.abs(b.stats.reduce((sum, stat) => sum + stat.base_stat, 0) - total))[0];
      closestName.textContent = closest.name.toUpperCase();
      closestImg.src = closest.img;
      closestTotal.textContent = "Base Total: " + closest.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
      buildClosestCard(closest);
      replayBtn.style.display = "block";
    } else {
      spinBtn.disabled = false;
    }
  };
});

createPokemonPerimeter();
load();