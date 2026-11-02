@echo off
title ZENVY - Push Updates to GitHub
echo =========================================================
echo             ZENVY - PUSH UPDATES TO GITHUB
echo =========================================================
echo.
cd /d "%~dp0"
git push origin main
echo.
pause
