@echo off
:main
cls
cd /d "%~dp0"

:: Get folder name only
for %%I in (.) do set FolderName=%%~nxI

:: Get date and time
for /f "tokens=1-5 delims=/: " %%a in ("%date% %time%") do (
    set d=%%a-%%b-%%c
    set t=%%d_%%e
)
set datetime=%d%_%t%

echo ==================================================
echo GitHub Automation Script
echo Current folder: %FolderName%
echo ==================================================
echo.
echo Select an option:
echo [1] Create a NEW repository on GitHub
echo [2] UPDATE the current existing GitHub repository
echo [3] Exit the program
echo.

set /p choice=Enter 1, 2, or 3: 

if "%choice%"=="1" goto create_new
if "%choice%"=="2" goto update_repo
if "%choice%"=="3" goto exit_program

:: Invalid input handling
echo.
echo ==== Operation Failed ====
echo Press any key to restart . . .
pause >nul
goto main

:create_new
echo.
set /p usermsg=Enter optional commit message (leave blank for default): 
if "%usermsg%"=="" (
    set commit_msg=initial commit at %datetime%
) else (
    set commit_msg=initial commit at %datetime% : %usermsg%
)

echo Initializing Git repository...
git init
git add .
git commit -m "%commit_msg%"

:: Open GitHub Create Repo page
start microsoft-edge:https://github.com/new

echo.
echo ==================================================
echo GitHub 'Create New Repository' page has been opened.
echo 1. Name the repo: "%FolderName%" or as you prefer
echo 2. Create the repo
echo 3. Copy the HTTPS link (e.g., https://github.com/user/%FolderName%.git)
echo ==================================================
echo.

set /p repo_url=Paste the GitHub repo HTTPS URL here: 

git remote add origin %repo_url%
git push -u origin master

goto done

:update_repo
echo.
set /p usermsg=Enter optional commit message (leave blank for default): 
if "%usermsg%"=="" (
    set commit_msg=new commit at %datetime%
) else (
    set commit_msg=new commit at %datetime% : %usermsg%
)

echo Updating existing repository...
git add .
git commit -m "%commit_msg%"
git push

goto done

:done
echo.
echo ==== Operation Complete ====
echo Press any key to return to the main menu . . .
pause >nul
goto main

:exit_program
echo.
echo Exiting... Goodbye!
timeout /t 2 >nul
exit
