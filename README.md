# Encuesta — Historia y Evolución de los Servicios de Geriatría del Perú

**SOPERGER · Registro Histórico 2026**

## CÓMO CONFIGURAR (paso a paso)

### Paso 1: Crear la hoja de Google Sheets

1. Ve a https://sheets.google.com
2. Crea una hoja nueva
3. Nómbrala: "Encuestas Geriatría Perú"
4. Déjala abierta (no cierres la pestaña)

### Paso 2: Crear el script receptor

1. Ve a https://script.google.com
2. Clic en **Nuevo proyecto**
3. Borra todo el código que aparece
4. Abre el archivo `google_apps_script_receptor.js` de este repo
5. Copia TODO su contenido y pégalo en el editor
6. Guarda con Ctrl+S → ponle nombre "API Encuesta"

### Paso 3: Vincular con tu hoja

1. En el editor de Apps Script, ve a la línea que dice `var SHEET_ID = '';`
2. Abre tu Google Sheet → mira la URL: `https://docs.google.com/spreadsheets/d/XXXXXXXX/edit`
3. Copia el XXXXXXXX (el ID largo)
4. Pégalo entre las comillas: `var SHEET_ID = 'XXXXXXXX';`
5. Guarda

### Paso 4: Implementar como web app

1. Clic en **Implementar** → **Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Quién tiene acceso: **Cualquier persona**
5. Clic en **Implementar**
6. Te pedirá permisos → **Permitir**
7. **COPIA LA URL** que te da

### Paso 5: Pegar la URL en tu encuesta

1. Abre el archivo `index.html` de este repo
2. Busca la línea: `const GOOGLE_SCRIPT_URL = '';`
3. Pega tu URL entre las comillas: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';`
4. Guarda y sube a GitHub

### Paso 6: ¡Listo!

Cada encuesta que se complete se guardará automáticamente en tu Google Sheet.
Para descargar el Excel: Ctrl+Shift+A → clave: soperger2026

---
SOPERGER · 2026
