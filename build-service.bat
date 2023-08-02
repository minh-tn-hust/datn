@echo off

set "current_dir=%~dp0"
echo %current_dir%

REM Chạy file docker-compose.yml của authenticationService
cd /d "%current_dir%backend%authenticationService"
docker compose -f "docker-compose.yml" up -d --build

REM Chạy file docker-compose.yml của problemService
cd /d "%current_dir%backend%problemManageService"
docker compose -f "docker-compose.yml" up -d --build

REM Chạy file docker-compose.yml của codeExecutingService
cd /d "%current_dir%backend%codeExecutionService"
docker compose -f "docker-compose.yml" up -d --build

REM Chờ một khoảng thời gian để các service hoạt động
timeout /t 20

REM Chạy file docker-compose.yml của apiGateway
cd /d "%current_dir%apiGateway"
docker compose -f "docker-compose.yml" up -d --build 
