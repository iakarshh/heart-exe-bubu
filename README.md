# HEART.exe — For Bubu 💗

A responsive, multi-scene romantic sci-fi website built with plain HTML, CSS and JavaScript. It is designed for static hosting on GitHub Pages.

## Files
- `index.html` — page structure and scenes
- `style.css` — responsive neon cyberpunk design and animations
- `script.js` — navigation, memory cards, scan animation, mini-game, secret note, synthesized optional ambient tones, and confetti

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Click **ENTER BUBU'S UNIVERSE** and explore the sections.

The optional soundtrack is synthesized by the browser after you click the sound control. Browsers block autoplay by default, so sound is off until requested.

## Publish on GitHub Pages
1. Sign in at https://github.com and create a **Public** repository named `heart-exe-bubu`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root (not inside another folder).
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then click **Save**.
6. Wait a few minutes. GitHub will show the published URL in the Pages section, usually `https://YOUR-USERNAME.github.io/heart-exe-bubu/`.

## Personalize
Open `script.js` and edit the `CONFIG` object near the top. Change the recipient, sender, memory titles, subtitles, messages, and colors. The letter text is in `index.html`; search for `Dear Bubu` to edit it.

## Important privacy note
GitHub Pages sites are public. Do not include personal secrets, passwords, private photos, addresses, or other sensitive information. Any PIN or unlock logic stored in front-end JavaScript is only a playful effect and is not real security.

## Accessibility
- Responsive layout for phones and desktops
- Sound is off by default and can be toggled
- Honors `prefers-reduced-motion`
- Keyboard: `Alt+1` Welcome, `Alt+2` Scan, `Alt+3` Galaxy, `Alt+4` Game, `Alt+5` Vault; `Esc` closes a message
