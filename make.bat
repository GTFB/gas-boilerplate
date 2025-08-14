@echo off
setlocal enabledelayedexpansion

echo Project Creator - Create new Google Apps Script projects
echo.

if "%1"=="" (
  echo ERROR: Specify project name: make [name]
  echo.
  echo Examples:
  echo   make myproject   - create myproject
  echo   make analytics   - create analytics project
  echo   make dashboard   - create dashboard project
  echo   make release     - create release
  goto end
)

if "%1"=="release" goto release

set PROJECT_NAME=%1
set PROJECT_PATH=..\%PROJECT_NAME%

echo Creating project: %PROJECT_NAME%
echo Path: %PROJECT_PATH%

if exist "%PROJECT_PATH%" (
  echo ERROR: Project %PROJECT_NAME% already exists!
  echo Delete folder or choose different name
  goto end
)

echo.
echo Creating folder structure...
mkdir "%PROJECT_PATH%"
mkdir "%PROJECT_PATH%\system"
mkdir "%PROJECT_PATH%\files"

echo SUCCESS: Structure created:
echo    %PROJECT_PATH%\
echo    ├── system\          - system files
echo    └── files\           - project files

echo.
echo Copying service account...
copy "key.json" "%PROJECT_PATH%\system\"

echo.
echo Copying project templates...
copy "templates\appsscript.json" "%PROJECT_PATH%\system\"

echo.
echo Project %PROJECT_NAME% ready!
echo.
echo Next steps:
echo    1. cd %PROJECT_PATH%
echo    2. cd ..\system
echo    3. make clone %PROJECT_NAME%  - clone project
echo    4. cd ..\%PROJECT_NAME%
echo    5. cd ..\system
echo    6. make pull                  - download files
echo    7. Edit code
echo    8. make push                  - upload changes
echo.
echo Use commands from system folder:
echo    make clone [project]   - clone
echo    make pull             - download
echo    make push             - upload
echo    make status           - status
echo    make projects         - project list

:release
echo.
echo Release Creator - Create new project releases
echo.

if "%2"=="" (
  echo Creating patch release...
  ts-node src\scripts\create-release.ts patch
) else (
  echo Creating %2 release...
  ts-node src\scripts\create-release.ts %2
)

goto end

:end
echo.
pause
