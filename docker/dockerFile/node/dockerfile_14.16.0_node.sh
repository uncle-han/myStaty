FROM centos:latest
RUN cd / \
	&& yum install -y wget \
	&& wget https://npm.taobao.org/mirrors/node/v14.16.0/node-v14.16.0-linux-x64.tar.xz \
	&& xz -d node-v14.16.0-linux-x64.tar.xz \
    && tar -xf node-v14.16.0-linux-x64.tar \
    && rm -rf node-v14.16.0-linux-x64.tar \
	&& ln -s /node-v14.16.0-linux-x64/bin/node /usr/bin/node \
	&& ln -s /node-v14.16.0-linux-x64/bin/npm /usr/bin/npm \
	&& ln -s /node-v14.16.0-linux-x64/bin/npx /usr/bin/npx \
	&& node -v \
	&& npm -v \
	&& npx -v \
    && npm config set registry https://registry.npm.taobao.org \
    && npm config get registry