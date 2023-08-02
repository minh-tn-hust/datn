#!/bin/bash

# Chạy file docker-compose.yml của authenticationService
docker compose -f "authenticationService/docker-compose.yml" up -d --build

# Chờ một khoảng thời gian để authenticationService khởi động
sleep 1

# Chạy file docker-compose.yml của problemManageService
docker compose -f "problemManageService/docker-compose.yml" up -d --build

# Chờ một khoảng thời gian để problemManageService khởi động
sleep 1

# Chạy file docker-compose.yml của codeExecutionService
docker compose -f "codeExecutionService/docker-compose.yml" up -d --build

# Chờ một khoảng thời gian để codeExecutionService khởi động
sleep 1

# Chạy file docker-compose.yml của apiGateway
docker compose -f "apiGateway/docker-compose.yml" up -d --build
