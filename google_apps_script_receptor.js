// ═══════════════════════════════════════════════════════════════
// GOOGLE APPS SCRIPT — Receptor de encuestas de Geriatría
// ═══════════════════════════════════════════════════════════════
//
// INSTRUCCIONES:
// 1. Ve a https://sheets.google.com y crea una hoja nueva
//    Nómbrala: "Encuestas Geriatría Perú"
//
// 2. Ve a https://script.google.com → Nuevo proyecto
//
// 3. Borra todo y pega ESTE código completo
//
// 4. Guarda (Ctrl+S) y ponle nombre: "API Encuesta Geriatría"
//
// 5. Haz clic en "Implementar" → "Nueva implementación"
//    - Tipo: "Aplicación web"
//    - Ejecutar como: "Yo"
//    - Quién tiene acceso: "Cualquier persona"
//    - Clic en "Implementar"
//
// 6. COPIA LA URL que te da (algo como:
//    https://script.google.com/macros/s/AKfycbx.../exec)
//
// 7. Pega esa URL en tu archivo index.html donde dice
//    GOOGLE_SCRIPT_URL (línea indicada)
//
// 8. ¡Listo! Cada encuesta se guardará automáticamente
// ═══════════════════════════════════════════════════════════════

// ID de tu Google Sheet (se obtiene de la URL de la hoja)
// https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
// Déjalo vacío para que se use la hoja vinculada automáticamente
var SHEET_ID = '';

function doPost(e) {
  try {
    var sheet;
    
    if (SHEET_ID) {
      sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    } else {
      // Busca o crea la hoja
      var ss = SpreadsheetApp.getActive();
      if (!ss) {
        // Crear nueva hoja
        ss = SpreadsheetApp.create('Encuestas Geriatría Perú - SOPERGER 2026');
      }
      sheet = ss.getActiveSheet();
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Si la hoja está vacía, agregar encabezados
    if (sheet.getLastRow() === 0) {
      var headers = Object.keys(data);
      sheet.appendRow(headers);
      
      // Formato de encabezados
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#c97b4b');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
    
    // Agregar fila con los datos
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function(header) {
      return data[header] || '';
    });
    
    sheet.appendRow(row);
    
    // Auto-ajustar columnas (solo las primeras veces)
    if (sheet.getLastRow() <= 3) {
      try {
        for (var i = 1; i <= headers.length; i++) {
          sheet.autoResizeColumn(i);
        }
      } catch(err) {}
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok', row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet;
    
    if (SHEET_ID) {
      sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    } else {
      var ss = SpreadsheetApp.getActive();
      if (!ss) return ContentService.createTextOutput(JSON.stringify({ result: 'ok', data: [] })).setMimeType(ContentService.MimeType.JSON);
      sheet = ss.getActiveSheet();
    }
    
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'ok', data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    
    var result = dataRange.map(function(row) {
      var obj = {};
      headers.forEach(function(h, i) {
        obj[h] = row[i];
      });
      return obj;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok', data: result }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba
function testSetup() {
  var ss = SpreadsheetApp.getActive();
  if (!ss) {
    ss = SpreadsheetApp.create('Encuestas Geriatría Perú - SOPERGER 2026');
    Logger.log('Hoja creada: ' + ss.getUrl());
  } else {
    Logger.log('Hoja existente: ' + ss.getUrl());
  }
  Logger.log('¡Todo listo! Ahora implementa como aplicación web.');
}
