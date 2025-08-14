@echo off
echo 🚀 Настройка Google Apps Script CLI...

echo 📦 Устанавливаем зависимости...
cd leads\system
npm install

echo.
echo 🎯 Готово! Теперь можете использовать:
echo    cd keys
echo    node clasp-clone.js list  - показать информацию о скрипте
echo    node clasp-clone.js pull  - скачать файлы
echo    node clasp-clone.js push  - загрузить файлы
echo.
echo 💡 Не забудьте установить переменную окружения:
echo    set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\keys\movespass-38db7777e99b.json
echo.
pause
