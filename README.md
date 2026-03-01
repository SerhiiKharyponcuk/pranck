# Matrix Encrypting Prank (Safe)

A simple web prank that mimics "encryption" in a Matrix-style interface. Nothing is locked or encrypted—just a UI effect for fun.

## Files

- `index.html` – main page
- `styles.css` – styling
- `script.js` – logic
- `README.md` – this instruction

## Running Locally 🚀

1. Copy all files into a folder.
2. Open `index.html` in a browser (double-click or use "Open File").
3. Or install the Live Server extension in VS Code and launch it.

No build tools or servers required.

## Deploying to GitHub Pages

1. Initialize a git repository and commit:
   ```bash
   git init
   git add .
   git commit -m "initial prank project"
   ```
2. Create a repository on GitHub, add the `origin` remote, and push.
3. In the repository settings under Pages select the `main` (or `master`) branch and click "Save".
4. After a minute your site will be live at `https://<your‑user>.github.io/<repo>/`.

## Safety and Notes

- **This is only a simulation.** No files are changed, no processes run, no payment demanded. During the 5‑minute run the page will force fullscreen and will re-request it every second. The script actively performs heavy math and draws extra graphics (up to 300 000 small rectangles during panic) to load the CPU and GPU, similar to stress-test sites. Pressing Escape does nothing but triggers a red "SYSTEM BREACH" flash effect accompanied by a spinning angry emoji and an extended overload lasting several seconds; pressing Delete will exit fullscreen but the prank continues. A browser prompt may appear if you try other ways to leave. On mobile, touch swipes/back gestures are temporarily blocked during the 5‑minute run, and tapping the screen will flash a warning overlay. It's simply a harmless prank with a bit of trickery.
- The "deterrents" (history trap, key intercepts including Escape) are purely decorative and may not work in all browsers.
- Android instructions are *voluntary* for added effect. Enable screen pinning only if you want to; it is not activated automatically. Exit by pressing Back+Overview or following system prompts.
- If fullscreen fails to enter or exit, just close the tab.

Have fun and use only with consent! 😄