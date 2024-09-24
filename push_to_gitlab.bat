@echo off
setlocal

REM 切换到目标分支
set branch=test
git checkout %branch%

REM 添加所有更改
git add .

REM 让用户输入提交信息
set /p commit_message="请输入提交信息: "

REM 提交更改
git commit -m "%commit_message%"

REM 推送到远程仓库
git push origin %branch%

endlocal
