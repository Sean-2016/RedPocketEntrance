@echo off
echo ========================================
echo    Yeeha App - 本地开发服务器
echo ========================================
echo.
echo 正在启动本地服务器...
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo 使用Python启动服务器...
    echo 服务器地址: http://localhost:8000
    echo 按 Ctrl+C 停止服务器
    echo.
    python -m http.server 8000
    goto :end
)

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo 使用Node.js启动服务器...
    echo 正在安装http-server...
    npx http-server -p 8000
    goto :end
)

REM 检查PHP是否安装
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo 使用PHP启动服务器...
    echo 服务器地址: http://localhost:8000
    echo 按 Ctrl+C 停止服务器
    echo.
    php -S localhost:8000
    goto :end
)

echo 错误: 未找到Python、Node.js或PHP
echo 请安装其中任意一个环境:
echo.
echo Python: https://www.python.org/downloads/
echo Node.js: https://nodejs.org/
echo PHP: https://www.php.net/downloads.php
echo.
echo 或者直接在浏览器中打开 index.html 文件
echo.
pause

:end
echo.
echo 服务器已停止
pause
