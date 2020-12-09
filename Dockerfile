FROM node:alpine
# 构建参数 MODE
ARG MODE-ENV
# 指定工作目录
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "/usr/src/app/"]
# 将 npm 镜像源设置为私服地址 && 启动 npm 静默安装
RUN npm config set registry http://192.168.4.59:8081/repository/npm-all-jszx/ \
    && npm install --silent
COPY . .
RUN npm run build-${MODE-ENV}




FROM nginx:alpine
# 构建参数 MODE
ARG MODE-ENV
# 声明运行时容器提供服务端口
EXPOSE 80
COPY nginx/gzip.conf /etc/nginx/conf.d/gzip.conf
COPY --from=build /usr/src/app/nginx/default-${MODE-ENV}.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
