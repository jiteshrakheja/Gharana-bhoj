@echo off
echo Starting Gharana Bhoj Website Server...
echo.
echo ========================================
echo   GHARANA BHOJ - RESTAURANT WEBSITE
echo ========================================
echo.
echo Server will start at: http://localhost:8000
echo.
echo Available files:
echo - index.html (Main Website)
echo.
echo Features:
echo - Complete Indian Menu (16 items)
echo - Shopping Cart System
echo - Order Management
echo - Payment Gateway (Card/UPI/Cash)
echo - Order Tracking
echo - Contact Information
echo - Responsive Design
echo.
echo Starting server...
echo.

cd /d "C:\Users\apex computer\Desktop\2nd"
python -m http.server 8000

echo.
echo Server stopped. Press any key to exit...
pause
