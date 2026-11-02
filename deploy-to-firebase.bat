@echo off
title ZENVY - Deploy to Firebase Hosting
echo =========================================================
echo       ZENVY SPORTSWEAR - DEPLOY TO FIREBASE HOSTING
echo =========================================================
echo.
cd /d "%~dp0"
set FIREBASE_EXE="%LOCALAPPDATA%\Microsoft\WinGet\Packages\Google.FirebaseCLI_Microsoft.Winget.Source_8wekyb3d8bbwe\firebase.exe"

if not exist %FIREBASE_EXE% (
    set FIREBASE_EXE=firebase
)

echo Checking Firebase Authentication...
%FIREBASE_EXE% deploy --only hosting

echo.
if %ERRORLEVEL% NEQ 0 (
    echo [!] If authentication failed, please run:
    echo     firebase login
    echo.
) else (
    echo [OK] Deployment completed successfully!
)
echo.
pause
