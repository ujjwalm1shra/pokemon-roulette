# Pokémon Stat Roulette

> **Spin. Choose. Build your Pokémon.**

A browser-based Pokémon stat-building game where every spin gives you a random Pokémon and you choose one of its stats to build your own custom Pokémon.

After six rounds, the game calculates your final stat total, determines whether you won or lost, and finds the real Pokémon whose base stats are closest to your creation.

## Play the Game

**[Play Pokémon Stat Roulette →](#)**

> https://ujjwalm1shra.github.io/pokemon-roulette/

---

## How It Works

The game is built around a simple idea:

**Can you build a Pokémon with a base-stat total of 500 or more?**

Each game consists of **six rounds**.

1. A random Pokémon is selected from the original 151 Pokémon.
2. Its six base stats are displayed as choices:

   * HP
   * Attack
   * Defense
   * Special Attack
   * Special Defense
   * Speed
3. Choose exactly one stat.
4. That stat is added to your custom Pokémon.
5. The selected Pokémon is removed from the remaining pool.
6. Repeat until all six stats have been selected.
7. Your final stat total determines the result.
8. The game finds the real Pokémon with the closest overall base-stat total.

### Win Condition

```text
Total Base Stats ≥ 500 → YOU WIN
Total Base Stats < 500  → YOU LOSE
```

The goal is simple.

**Build something strong enough to survive.**

---

## Features

### Randomized Pokémon Selection

Each round randomly selects a Pokémon from the remaining pool, creating a different combination of choices every game.

The game begins with all **151 Generation I Pokémon** available.

### Custom Pokémon Builder

Instead of receiving a complete Pokémon, you construct one stat-by-stat.

You might end up with:

```text
HP              90
Attack         134
Defense         70
Special Attack  95
Special Defense 85
Speed          120
-------------------
Total          594
```

Your final Pokémon is entirely determined by the choices you make.

### Dynamic Stat Visualization

The custom Pokémon is updated after every selection, with animated stat bars and a live total score.

### Closest Real Pokémon

Once the six rounds are complete, the game compares your custom Pokémon's total against the base-stat totals of all available Pokémon and identifies the closest match.

### Pokémon Card Generation

The closest Pokémon is presented with additional information including:

* Pokémon artwork
* Base stats
* Flavor text
* Moves
* Evolution line

The generated card can also be downloaded as an image directly from the browser.

### Replayable

Start another run instantly with a fresh Pokémon pool and a completely new sequence of choices.

### Responsive Interface

The interface adapts to smaller screens while preserving the game's core interactions and visual layout.

---

## Architecture

The project intentionally uses a lightweight frontend architecture without a framework.

```text
Pokémon Stat Roulette
│
├── Presentation
│   ├── HTML
│   └── CSS
│
├── Game Logic
│   └── JavaScript
│
├── Data Layer
│   └── PokéAPI
│
└── Client-side Utilities
    └── html2canvas
```

### Game Flow

```text
Load Generation I Data
          │
          ▼
     151 Pokémon
          │
          ▼
     Random Selection
          │
          ▼
     Choose One Stat
          │
          ▼
   Add Stat to Custom Pokémon
          │
          ▼
      Repeat × 6
          │
          ▼
    Calculate Total
          │
          ├───────────────┐
          ▼               ▼
      Win / Lose      Find Closest
                         Pokémon
                            │
                            ▼
                    Generate Pokémon Card
```

---

## Data & APIs

The game uses **PokéAPI** as its primary source of Pokémon data.

The application dynamically retrieves:

* Pokémon species
* Base stats
* Sprites
* Moves
* Flavor text
* Evolution chains

Rather than storing the complete Pokémon dataset inside the project, the application fetches the required data at runtime.

This keeps the project lightweight while allowing the game to work with structured Pokémon data from a real public API.

**API:** [PokéAPI](https://pokeapi.co/)

---

## Technical Highlights

### Asynchronous API Loading

The application loads Generation I Pokémon data asynchronously and tracks loading progress before enabling the game.

```text
Loading 1/151
Loading 2/151
...
Loading 151/151
        ↓
   Ready to spin!
```

### State Management

The game maintains client-side state for:

* Available Pokémon
* Current Pokémon
* Current turn
* Selected statistics
* Current score
* Game status

### Randomized Selection

Each selected Pokémon is removed from the available pool, preventing the same Pokémon from appearing twice in a single run.

### Closest-Pokémon Matching

At the end of the game, the player's custom stat total is compared against every Pokémon's base-stat total.

Conceptually:

```text
distance = |pokemonBaseTotal - customTotal|
```

The Pokémon with the smallest distance is selected as the closest match.

### Client-Side Card Export

The final Pokémon card is rendered to an image directly in the browser using `html2canvas`, allowing the result to be saved without a backend service.

---

## Tech Stack

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| HTML5        | Application structure           |
| CSS3         | Responsive UI and animations    |
| JavaScript   | Game logic and state management |
| PokéAPI      | Pokémon data                    |
| html2canvas  | Pokémon card image generation   |
| Google Fonts | UI typography                   |

---

## Project Structure

```text
pokemon-roulette/
│
├── Script/
│   └── index.html
│
├── Logic/
│   └── script.js
│
├── Layout/
│   └── styles.css
│
└── assets/
    └── Pokémon / UI assets
```

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/ujjwalm1shra/pokemon-roulette.git
cd pokemon-roulette
```

### 2. Launch the application

Because this is a static frontend project, no backend or package installation is required.

You can serve the project using any static HTTP server.

For example, with VS Code's Live Server extension, open:

```text
Script/index.html
```

Alternatively, use Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/Script/
```

---

## Design

The interface uses a dark, futuristic visual language with:

* Glassmorphism panels
* Animated Pokémon perimeter
* Responsive layouts
* Dynamic stat bars
* Interactive buttons
* Pokémon-themed visual elements
* Subtle hover and transition effects

The layout is designed to keep the game mechanics immediately visible while giving the application the feel of a small standalone game rather than a traditional data dashboard.

---

## What I Learned

This project was built as a hands-on exercise in combining frontend development with external APIs and interactive state-driven logic.

Key areas explored:

* Consuming REST APIs with `fetch`
* Working with asynchronous JavaScript
* Managing application state without a framework
* Randomized game mechanics
* DOM manipulation
* Dynamic UI rendering
* Responsive CSS
* Client-side image generation
* Working with structured API data
* Designing an interactive browser experience

---

## Future Improvements

Potential additions include:

* Pokémon type-based bonuses
* Difficulty modes
* Multiple generations
* Leaderboards
* Persistent high scores
* More sophisticated stat-selection mechanics
* Sound effects and game audio
* Animations for spins and stat selection
* Shareable generated Pokémon cards
* Mobile-first interaction improvements

---

## Credits

* Pokémon data provided by [PokéAPI](https://pokeapi.co/)
* Pokémon and related visual assets belong to their respective copyright holders.

This project is an unofficial fan-made project and is not affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon Company.

---

## License

This project is intended for educational and personal use.
