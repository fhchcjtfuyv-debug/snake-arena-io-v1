@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');

:root {
  --bg-1: #07111f;
  --bg-2: #0d1d2d;
  --panel-bg: rgba(10, 19, 31, 0.76);
  --panel-border: rgba(144, 191, 255, 0.22);
  --primary: #7fe7c8;
  --primary-2: #6ab4ff;
  --danger: #ff6d6d;
  --warning: #f9c74f;
  --text: #eaf2ff;
  --muted: #a4b9d8;
  --shadow: rgba(0, 0, 0, 0.45);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: Inter, "Segoe UI", Tahoma, sans-serif;
  background: radial-gradient(circle at top, #0d1d2d 0%, var(--bg-1) 52%, #060d18 100%);
  color: var(--text);
}

body {
  position: relative;
  user-select: none;
}

button, input, select {
  font: inherit;
}

#app {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.overlay, .hud, .leaderboard {
  position: absolute;
  z-index: 20;
}

.overlay {
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(7, 12, 19, 0.45);
  backdrop-filter: blur(7px);
}

.hidden {
  display: none !important;
}

.panel {
  width: min(92vw, 560px);
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: 24px;
  box-shadow: 0 28px 80px var(--shadow);
  padding: 24px 24px 20px;
}

.main-panel {
  width: min(94vw, 660px);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.brand-mark {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #061722;
  font-size: 2rem;
  font-weight: 900;
  box-shadow: 0 12px 30px rgba(95, 200, 170, 0.45);
}

.eyebrow {
  margin: 0 0 4px;
  letter-spacing: 0.18em;
  font-size: 0.65rem;
  color: var(--muted);
}

h1, h2, h3 {
  margin: 0;
  letter-spacing: 0.02em;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  color: var(--muted);
}

.field input, .settings-panel select, .settings-panel input {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 14px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.button-grid.compact {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

button {
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 12px 14px;
  cursor: pointer;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: transform 0.15s ease, filter 0.15s ease, opacity 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
}

button:active {
  transform: translateY(0);
}

button.primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
  color: #061722;
}

button.secondary {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.08);
  color: var(--text);
}

button.disabled, button:disabled {
  opacity: 0.46;
  cursor: not-allowed;
}

.stats-row {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.stats-row div,
.game-over-stats div,
.hud-card {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stats-row span,
.game-over-stats span,
.hud-card span {
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stats-row strong,
.game-over-stats strong,
.hud-card strong {
  font-size: 1.3rem;
}

.settings-panel {
  width: min(90vw, 680px);
  padding: 18px 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  color: var(--text);
  font-size: 2rem;
  line-height: 1;
  padding: 0;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.settings-grid label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
}

.hud {
  top: 18px;
  left: 18px;
  right: 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  pointer-events: none;
}

.hud-left,
.hud-right {
  display: flex;
  gap: 10px;
  align-items: center;
}

.hud-card {
  min-width: 92px;
  pointer-events: auto;
}

.mini-btn {
  pointer-events: auto;
  padding-inline: 16px;
  min-width: 94px;
}

.leaderboard {
  right: 18px;
  bottom: 18px;
  width: min(30vw, 260px);
  background: rgba(6, 12, 18, 0.74);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 16px 14px;
  box-shadow: 0 16px 36px rgba(0,0,0,0.32);
}

.leaderboard h3 {
  margin-bottom: 8px;
  font-size: 1rem;
}

.leaderboard ol {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 4px;
  color: var(--muted);
}

.leaderboard li {
  font-size: 0.9rem;
}

.game-over-panel {
  width: min(90vw, 540px);
}

.game-over-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 18px 0 20px;
}

@media (max-width: 720px) {
  .settings-grid,
  .button-grid,
  .game-over-stats {
    grid-template-columns: 1fr;
  }

  .hud {
    top: 12px;
    left: 12px;
    right: 12px;
  }

  .hud-left,
  .hud-right {
    gap: 8px;
    flex-wrap: wrap;
  }

  .hud-card {
    min-width: 78px;
  }

  .leaderboard {
    width: min(60vw, 260px);
    bottom: 12px;
    right: 12px;
  }
}
