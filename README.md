# test-task
No one should use this

## How-to
```shell
cd code

# Установить зависимости
npm install 

# Собрать образ
docker build -t test-task .

# Запустить контейнер
docker run -p 8080:8080 test-task
```

## code
index.js - "ванильный" serverless-код для Cloudflare Workloads.  
server.js - надстройка, которая позволит запускать index.js в докере с помощью node.js  

## CI/CD  
Если нужно деплоить на прод в CF Workers не только index.js - укажите это в .devops/vars в CF_WORKLOADS_FILES через пробел  
### Envs
CF_WORKLOADS_FILES -указание файлов для деплоя в CF Workers (см. .devops/vars)
### GithubSecrets
GITHUB_TOKEN            - стандартный секрет
CF_WORKERS_ACCOUNT_ID   - Account ID для деплоя
CF_WORKERS_API_TOKEN    - API-Token для деплоя

## TODOs
Workers versioned deployments (сейчас излишне, но перед выходом в прод возможно нужно сделать, чтобы катать канарейкой постепенно)  
Билдить докер еще и для aarch64  (или что там нынче у маков). Использовать шаг с QEMU для этого.
