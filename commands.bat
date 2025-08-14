@echo off
echo Google Apps Script CLI - Git/Clasp style commands
echo.

if "%1"=="clone" goto clone
if "%1"=="pull" goto pull
if "%1"=="push" goto push
if "%1"=="status" goto status
if "%1"=="list" goto list
if "%1"=="new" goto new
if "%1"=="projects" goto projects
if "%1"=="ff" goto ff
if "%1"=="validate" goto validate
if "%1"=="logs" goto logs
if "%1"=="config" goto config
if "%1"=="update" goto update
if "%1"=="upgrade" goto upgrade
if "%1"=="test" goto test
if "%1"=="help" goto help

:help
echo Available commands:
echo.
echo Project commands:
echo   make clone [project]     - clone project
echo   make pull [project]      - download changes
echo   make push [project]      - upload changes
echo   make status [project]    - show status
echo.
echo Utility commands:
echo   make ff [project]        - extract files from ff.html
echo   make validate            - validate configuration
echo   make logs                - show recent logs
echo   make config              - show configuration
echo.
echo Update commands:
echo   make update              - check for updates from gas-boilerplate
echo   make upgrade             - update from gas-boilerplate
echo.
echo Testing commands:
echo   make test                - test system components
echo.
echo Admin commands:
echo   make list                - list projects
echo   make new [name]          - create new project
echo   make projects            - show all configured projects
echo   make help                - show this help
echo.
echo Examples:
echo   make clone myproject     - clone myproject
echo   make pull myproject      - download changes in myproject
echo   make push analytics      - upload changes in analytics project
echo   make ff myproject        - extract files from myproject/ff.html
echo   make validate            - validate system configuration
echo   make test                - test system components
echo   make update              - check for updates
echo   make upgrade             - update system
goto end

:clone
if "%2"=="" (
  echo ERROR: Specify project name: make clone [name]
  echo Example: make clone myproject
  goto end
)
echo Cloning project: %2
if exist "..\%2" (
  echo ERROR: Project %2 already exists!
  goto end
)
echo Creating project structure and adding to configuration...
node clasp-clone.js clone %2
goto end

:pull
if "%2"=="" (
  echo ERROR: Specify project name: make pull [name]
  echo Example: make pull myproject
  goto end
)
echo Downloading changes for project: %2
node clasp-clone.js pull %2
goto end

:push
if "%2"=="" (
  echo ERROR: Specify project name: make push [name]
  echo Example: make push myproject
  goto end
)
echo Uploading changes for project: %2
node clasp-clone.js push %2
goto end

:status
if "%2"=="" (
  echo ERROR: Specify project name: make status [name]
  echo Example: make status myproject
  goto end
)
echo Project status for: %2
node clasp-clone.js list %2
goto end

:list
echo Project list:
for /d %%i in (..\*) do (
  if not "%%i"=="..\system" (
    echo   %%~nxi
  )
)
echo.
echo To clone: make clone [name]
goto end

:projects
echo Showing all configured projects:
node clasp-clone.js projects
goto end

:ff
if "%2"=="" (
  echo ERROR: Specify project name: make ff [name]
  echo Example: make ff myproject
  goto end
)
echo Extracting files from project: %2
node functions\extract-files.js %2
goto end

:validate
echo Validating system configuration:
node utils\config-validator.js
goto end

:logs
echo Showing recent logs:
if exist "logs\%date:~-4,4%-%date:~-7,2%-%date:~-10,2%.md" (
  type "logs\%date:~-4,4%-%date:~-7,2%-%date:~-10,2%.md"
) else (
  echo No logs found for today
)
goto end

:config
echo System configuration:
node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
console.log('Default project:', config.defaultProject);
console.log('Projects path:', config.projectsPath);
console.log('System path:', config.systemPath);
console.log('Logs path:', config.logsPath);
"
goto end

:update
echo Checking for updates from gas-boilerplate...
node utils\version-updater.js check
goto end

:upgrade
echo Updating from gas-boilerplate...
node utils\version-updater.js update
goto end

:test
echo Testing system components...
node test-system.js
goto end

:new
if "%2"=="" (
  echo ERROR: Specify project name: make new [name]
  echo Example: make new analytics
  goto end
)
echo Creating new project: %2
if exist "..\%2" (
  echo ERROR: Project %2 already exists!
  goto end
)
mkdir "..\%2"
mkdir "..\%2\system"
mkdir "..\%2\files"
echo SUCCESS: Project %2 created
echo Go to project: cd ..\%2
goto end

:end
echo.
pause

