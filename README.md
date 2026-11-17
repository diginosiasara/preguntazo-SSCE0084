# Proyecto SSCE0084 · Las TIC en la enseñanza

## Contenido
- `app-estudio/` — App de estudio del temario (unidades 1 a 4): resumen, tarjetas, tests y examen final.
  - Panel de accesibilidad: tamaño de texto, alto contraste, daltonismo, dislexia (fuente Lexend), espaciado, regla de lectura, modo simple, menos animaciones, foco reforzado, botones grandes, lectura en voz alta y vibración.
  - Código QR funcional (librería `qrcode-generator` 1.4.4, licencia MIT, incluida en `js/vendor/`).
- `landing-preguntazo/` — Landing de demostración: registro con correo, reparto de responsabilidades, juego y ranking.
- `respuesta-actividad.md` — Texto de respuesta a la actividad.

## Cómo usarlo
1. Abre `index.html` de cada carpeta en el navegador, o sube la carpeta a GitHub Pages o Netlify.
2. QR: el campo «Enlace que contiene el código» empieza vacío en local. Pega la URL pública de la app y el código se genera al instante. Con «Descargar PNG» puedes guardarlo para imprimirlo o ponerlo en una diapositiva.
3. Las fuentes se cargan desde Google Fonts. Sin conexión se usan las del sistema.

## Limitaciones conocidas
- El progreso y los ajustes se guardan solo en el navegador de cada persona.
- La landing es una demostración: no envía ni guarda correos. Para registros reales, incrusta un Google Form.
- La Unidad 3 está resumida a partir de su índice, la gamificación y la prevención de riesgos. Contrasta los textos con el manual.
- La accesibilidad sigue buenas prácticas habituales, pero no se ha probado con NVDA, JAWS, VoiceOver ni TalkBack. Conviene una revisión con personas usuarias.
