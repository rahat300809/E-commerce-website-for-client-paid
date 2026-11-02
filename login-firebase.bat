@echo off
title ZENVY - Firebase Login
echo =========================================================
echo             ZENVY - 1-CLICK FIREBASE LOGIN
echo =========================================================
echo.
echo Opening browser for Google Authentication...
echo If it asks "Allow Firebase to collect CLI... (Y/n)", type Y and press Enter.
echo.
set FIREBASE_EXE="%LOCALAPPDATA%\Microsoft\WinGet\Packages\Google.FirebaseCLI_Microsoft.Winget.Source_8wekyb3d8bbwe\firebase.exe"

if not exist %FIREBASE_EXE% (
    set FIREBASE_EXE=firebase
)

%FIREBASE_EXE% login

echo.
echo =========================================================
echo [OK] Login finished! Now you can run: deploy-to-firebase.bat
echo =========================================================
echo.
pause
