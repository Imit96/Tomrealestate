How to self-host Boxicons (quick)

1. Download Boxicons assets
   - Option A (npm): npm install boxicons@2.1.0 and copy the CSS and fonts from node_modules/boxicons
   - Option B (unpkg): open https://unpkg.com/boxicons@2.1.0/css/boxicons.min.css and https://unpkg.com/boxicons@2.1.0/fonts/ and save the files

2. Place files in this folder:
   - assets/boxicons/boxicons-local.css  (this file)
   - assets/boxicons/boxicons.woff2
   - assets/boxicons/boxicons.woff
   - assets/boxicons/boxicons.ttf

3. If you saved the original CSS, open it and replace remote font URLs with local paths, for example:
   src: url('./boxicons.woff2') format('woff2'), url('./boxicons.woff') format('woff');

4. Keep `index.html` CSP as font-src 'self' so fonts only load from your origin.

Notes:
- For full icon coverage, copy the full boxicons CSS rather than using the minimal shim.
- If you prefer to keep using CDN fonts, add the CDN host to the `font-src` directive in the CSP meta tag (less secure).
