@echo off
echo Connecting to remote host...
"C:/Program Files/PuTTY/plink.exe" -ssh -P 22 -pw Sunnybiubiu666. 9000AI@192.168.1.93 "docker logout 192.168.1.168:80 && echo Sunnybiubiu666. | docker login 192.168.1.168:80 -u admin --password-stdin"
if %errorlevel% neq 0 (
    echo Failed to connect or execute command
) else (
    echo Command executed successfully
)
pause