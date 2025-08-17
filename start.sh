#!/bin/bash

echo "========================================"
echo "    Yeeha App - 本地开发服务器"
echo "========================================"
echo ""

# 检查Python是否安装
if command -v python3 &> /dev/null; then
    echo "使用Python3启动服务器..."
    echo "服务器地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "使用Python启动服务器..."
    echo "服务器地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python -m http.server 8000
# 检查Node.js是否安装
elif command -v node &> /dev/null; then
    echo "使用Node.js启动服务器..."
    echo "正在安装http-server..."
    npx http-server -p 8000
# 检查PHP是否安装
elif command -v php &> /dev/null; then
    echo "使用PHP启动服务器..."
    echo "服务器地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    php -S localhost:8000
else
    echo "错误: 未找到Python、Node.js或PHP"
    echo "请安装其中任意一个环境:"
    echo ""
    echo "Python: https://www.python.org/downloads/"
    echo "Node.js: https://nodejs.org/"
    echo "PHP: https://www.php.net/downloads.php"
    echo ""
    echo "或者直接在浏览器中打开 index.html 文件"
    echo ""
    read -p "按回车键继续..."
fi

echo ""
echo "服务器已停止"
