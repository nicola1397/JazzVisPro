@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

set "PY="
where py >nul 2>&1 && set "PY=py -3"
if not defined PY where python >nul 2>&1 && set "PY=python"
if not defined PY (
    echo Python non trovato.
    echo Installalo da https://www.python.org/downloads/ e spunta "Add python.exe to PATH".
    pause
    exit /b 1
)

%PY% -c "import PIL" >nul 2>&1
if errorlevel 1 (
    echo Installo Pillow, attendi...
    %PY% -m pip install --user pillow
    if errorlevel 1 (
        echo Installazione di Pillow non riuscita.
        pause
        exit /b 1
    )
)

%PY% converter_gui.py
if errorlevel 1 (
    echo.
    echo Il programma si e' chiuso con un errore.
    pause
)
