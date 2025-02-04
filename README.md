# Websocket Texting Thingy :)

This is some side project that I made for fun ehehe

Make sure you have `ws` installed using:
```bash
npm install ws
```

To start the application, double click on `start.bat`

---
## Vulnerability

PLEASE PLEASE PLEASE DO NOT use this in production site

Chat is allowed full control of html code, so `cross-site scripting` is possible

If you don't trust me, send the following message:
```html
<img src="" onerror="setInterval(() => {alert('hi');}, 500);" />
```