FROM nginx:latest

ARG path_to_binaries="./webclient-package"
COPY $path_to_binaries/ /usr/share/nginx/html/
COPY ./nginx-webclient.conf /etc/nginx/conf.d/default.conf

EXPOSE 80