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
if "%1"=="files" goto files
if "%1"=="validate" goto validate
if "%1"=="logs" goto logs
if "%1"=="config" goto config
if "%1"=="update" goto update
if "%1"=="upgrade" goto upgrade
if "%1"=="test" goto test
if "%1"=="release" goto release
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
echo   make files [project]      - extract files from files.html
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
echo Release commands:
echo   make release [type]      - create release (patch/minor/major/preview)
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
echo   make files myproject      - extract files from myproject/files.html
echo   make validate            - validate system configuration
echo   make test                - test system components
echo   make release [type]      - create release
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
ts-node src\clasp-clone.ts clone %2
goto end

:pull
if "%2"=="" (
  echo ERROR: Specify project name: make pull [name]
  echo Example: make pull myproject
  goto end
)
echo Downloading changes for project: %2
ts-node src\clasp-clone.ts pull %2
goto end

:push
if "%2"=="" (
  echo ERROR: Specify project name: make push [name]
  echo Example: make push myproject
  goto end
)
echo Uploading changes for project: %2
ts-node src\clasp-clone.ts push %2
goto end

:status
if "%2"=="" (
  echo ERROR: Specify project name: make status [name]
  echo Example: make status myproject
  goto end
)
echo Project status for: %2
ts-node src\clasp-clone.ts list %2
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
ts-node src\clasp-clone.ts projects
goto end

:files
if "%2"=="" (
  echo ERROR: Specify project name: make files [name]
  echo Example: make files myproject
  goto end
)
echo Extracting files from project: %2
ts-node src\functions\extract-files.ts %2
goto end

:validate
echo Validating system configuration:
ts-node src\utils\config-validator.ts
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
ts-node src\utils\version-updater.ts check
goto end

:upgrade
echo Updating from gas-boilerplate...
ts-node src\utils\version-updater.ts update
goto end

:test
echo Testing system components...
ts-node src\test-system.ts
goto end

:release
if "%2"=="" (
  echo Creating patch release...
  ts-node src\scripts\create-release.ts patch
) else (
  echo Creating %2 release...
  ts-node src\scripts\create-release.ts %2
)
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

