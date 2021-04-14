# frps启动方式(frpc参照下面的启动)

## 使用nohup来启动

* 这是frps的后台启动（路径写你服务器上的绝对路径），如果要查看日志的话，就直接使用`cat nohup.out`，就可以查看了。

  ```bash
  nohup /path/to/your/fprs -c-c /path/to/your/frps.ini
  ```

* 这是frpc的后台启动

  ```bash
  nohup /path/to/your/fprc -c-c /path/to/your/frpc.ini
  ```

## 使用systemctl来控制启动

编辑frps.service文件

```bahs
sudo vim /lib/systemd/system/frps.service
```

在frps.service里写入以下内容

```shell
[Unit]
Description=fraps service
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
#启动服务的命令（此处写你的frps的实际安装目录）
ExecStart=/your/path/frps -c /your/path/frps.ini

[Install]
WantedBy=multi-user.target
```

然后就启动frps

```bash
sudo systemctl start frps
```

再打开自启动

```bash
sudo systemctl enable frps
```

要重启应用

```bash
sudo systemctl restart frps
```

停止应用

```bash
sudo systemctl stop frps
```

查看应用的日志

```bash
sudo systemctl status frps
```

## 使用supervisor来控制

首先先安装supervisor

```bash
sudo apt install supervisor
```

创建 supervisor frps 配置文件,在 /etc/supervisor/conf.d 创建 frp.conf

同样是你的绝对路径。

```bash
[program:frp]
command = /your/path/frps -c /your/path/frps.ini
autostart = true
```

写完以后，要重新加载一下supervisor

```bash
# 重启supervisor
sudo systemctl restart supervisor
# 查看supervisor运行状态
sudo supervisorctl status
```



# 服务器端

## frps_full.ini文件的全部配置项

```bash
# [common] is integral section
[common]
# A literal address or host name for IPv6 must be enclosed
# in square brackets, as in "[::1]:80", "[ipv6-host]:http" or "[ipv6-host%zone]:80"
# For single "bind_addr" field, no need square brackets, like "bind_addr = ::".
bind_addr = 0.0.0.0
bind_port = 7000

# udp port to help make udp hole to penetrate nat
bind_udp_port = 7001

# udp port used for kcp protocol, it can be same with 'bind_port'
# if not set, kcp is disabled in frps
kcp_bind_port = 7000

# specify which address proxy will listen for, default value is same with bind_addr
# proxy_bind_addr = 127.0.0.1

# if you want to support virtual host, you must set the http port for listening (optional)
# Note: http port and https port can be same with bind_port
vhost_http_port = 80
vhost_https_port = 443

# response header timeout(seconds) for vhost http server, default is 60s
# vhost_http_timeout = 60

# tcpmux_httpconnect_port specifies the port that the server listens for TCP
# HTTP CONNECT requests. If the value is 0, the server will not multiplex TCP
# requests on one single port. If it's not - it will listen on this value for
# HTTP CONNECT requests. By default, this value is 0.
# tcpmux_httpconnect_port = 1337

# set dashboard_addr and dashboard_port to view dashboard of frps
# dashboard_addr's default value is same with bind_addr
# dashboard is available only if dashboard_port is set
dashboard_addr = 0.0.0.0
dashboard_port = 7500

# dashboard user and passwd for basic auth protect, if not set, both default value is admin
dashboard_user = admin
dashboard_pwd = admin

# enable_prometheus will export prometheus metrics on {dashboard_addr}:{dashboard_port} in /metrics api.
enable_prometheus = true

# dashboard assets directory(only for debug mode)
# assets_dir = ./static

# console or real logFile path like ./frps.log
log_file = ./frps.log

# trace, debug, info, warn, error
log_level = info

log_max_days = 3

# disable log colors when log_file is console, default is false
disable_log_color = false

# DetailedErrorsToClient defines whether to send the specific error (with debug info) to frpc. By default, this value is true.
detailed_errors_to_client = true

# authentication_method specifies what authentication method to use authenticate frpc with frps.
# If "token" is specified - token will be read into login message.
# If "oidc" is specified - OIDC (Open ID Connect) token will be issued using OIDC settings. By default, this value is "token".
authentication_method = token

# authenticate_heartbeats specifies whether to include authentication token in heartbeats sent to frps. By default, this value is false.
authenticate_heartbeats = false

# AuthenticateNewWorkConns specifies whether to include authentication token in new work connections sent to frps. By default, this value is false.
authenticate_new_work_conns = false

# auth token
token = 12345678

# oidc_issuer specifies the issuer to verify OIDC tokens with.
# By default, this value is "".
oidc_issuer =

# oidc_audience specifies the audience OIDC tokens should contain when validated.
# By default, this value is "".
oidc_audience =

# oidc_skip_expiry_check specifies whether to skip checking if the OIDC token is expired.
# By default, this value is false.
oidc_skip_expiry_check = false


# oidc_skip_issuer_check specifies whether to skip checking if the OIDC token's issuer claim matches the issuer specified in OidcIssuer.
# By default, this value is false.
oidc_skip_issuer_check = false

# heartbeat configure, it's not recommended to modify the default value
# the default value of heartbeat_timeout is 90
# heartbeat_timeout = 90

# user_conn_timeout configure, it's not recommended to modify the default value
# the default value of user_conn_timeout is 10
# user_conn_timeout = 10

# only allow frpc to bind ports you list, if you set nothing, there won't be any limit
allow_ports = 2000-3000,3001,3003,4000-50000

# pool_count in each proxy will change to max_pool_count if they exceed the maximum value
max_pool_count = 5

# max ports can be used for each client, default value is 0 means no limit
max_ports_per_client = 0

# tls_only specifies whether to only accept TLS-encrypted connections. By default, the value is false.
tls_only = false

# tls_cert_file = server.crt
# tls_key_file = server.key
# tls_trusted_ca_file = ca.crt

# if subdomain_host is not empty, you can set subdomain when type is http or https in frpc's configure file
# when subdomain is test, the host used by routing is test.frps.com
subdomain_host = frps.com

# if tcp stream multiplexing is used, default is true
tcp_mux = true

# custom 404 page for HTTP requests
# custom_404_page = /path/to/404.html

# specify udp packet size, unit is byte. If not set, the default value is 1500.
# This parameter should be same between client and server.
# It affects the udp and sudp proxy.
udp_packet_size = 1500

[plugin.user-manager]
addr = 127.0.0.1:9000
path = /handler
ops = Login

[plugin.port-manager]
addr = 127.0.0.1:9001
path = /handler
ops = NewProxy

```

## 最基本配置

```bash
[common]
bind_addr = 0.0.0.0 # 全世界可以访问这个frp服务器
bind_port = 7000 
```



# 客户端

## frpc_full.ini文件的全部配置项

```bash
# [common] is integral section
[common]
# A literal address or host name for IPv6 must be enclosed
# in square brackets, as in "[::1]:80", "[ipv6-host]:http" or "[ipv6-host%zone]:80"
# For single "server_addr" field, no need square brackets, like "server_addr = ::".
server_addr = 0.0.0.0
server_port = 7000

# if you want to connect frps by http proxy or socks5 proxy or ntlm proxy, you can set http_proxy here or in global environment variables
# it only works when protocol is tcp
# http_proxy = http://user:passwd@192.168.1.128:8080
# http_proxy = socks5://user:passwd@192.168.1.128:1080
# http_proxy = ntlm://user:passwd@192.168.1.128:2080

# console or real logFile path like ./frpc.log
log_file = ./frpc.log

# trace, debug, info, warn, error
log_level = info

log_max_days = 3

# disable log colors when log_file is console, default is false
disable_log_color = false

# for authentication, should be same as your frps.ini
# authenticate_heartbeats specifies whether to include authentication token in heartbeats sent to frps. By default, this value is false.
authenticate_heartbeats = false

# authenticate_new_work_conns specifies whether to include authentication token in new work connections sent to frps. By default, this value is false.
authenticate_new_work_conns = false

# auth token
token = 12345678

# oidc_client_id specifies the client ID to use to get a token in OIDC authentication if AuthenticationMethod == "oidc".
# By default, this value is "".
oidc_client_id =

# oidc_client_secret specifies the client secret to use to get a token in OIDC authentication if AuthenticationMethod == "oidc".
# By default, this value is "".
oidc_client_secret =

# oidc_audience specifies the audience of the token in OIDC authentication if AuthenticationMethod == "oidc". By default, this value is "".
oidc_audience =

# oidc_token_endpoint_url specifies the URL which implements OIDC Token Endpoint.
# It will be used to get an OIDC token if AuthenticationMethod == "oidc". By default, this value is "".
oidc_token_endpoint_url =

# set admin address for control frpc's action by http api such as reload
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_pwd = admin
# Admin assets directory. By default, these assets are bundled with frpc.
# assets_dir = ./static

# connections will be established in advance, default value is zero
pool_count = 5

# if tcp stream multiplexing is used, default is true, it must be same with frps
tcp_mux = true

# your proxy name will be changed to {user}.{proxy}
user = your_name

# decide if exit program when first login failed, otherwise continuous relogin to frps
# default is true
login_fail_exit = true

# communication protocol used to connect to server
# now it supports tcp, kcp and websocket, default is tcp
protocol = tcp

# if tls_enable is true, frpc will connect frps by tls
tls_enable = true

# tls_cert_file = client.crt
# tls_key_file = client.key
# tls_trusted_ca_file = ca.crt
# tls_server_name = example.com

# specify a dns server, so frpc will use this instead of default one
# dns_server = 8.8.8.8

# proxy names you want to start seperated by ','
# default is empty, means all proxies
# start = ssh,dns

# heartbeat configure, it's not recommended to modify the default value
# the default value of heartbeat_interval is 10 and heartbeat_timeout is 90
# heartbeat_interval = 30
# heartbeat_timeout = 90

# additional meta info for client
meta_var1 = 123
meta_var2 = 234

# specify udp packet size, unit is byte. If not set, the default value is 1500.
# This parameter should be same between client and server.
# It affects the udp and sudp proxy.
udp_packet_size = 1500

# 'ssh' is the unique proxy name
# if user in [common] section is not empty, it will be changed to {user}.{proxy} such as 'your_name.ssh'
[ssh]
# tcp | udp | http | https | stcp | xtcp, default is tcp
type = tcp
local_ip = 127.0.0.1
local_port = 22
# limit bandwidth for this proxy, unit is KB and MB
bandwidth_limit = 1MB
# true or false, if true, messages between frps and frpc will be encrypted, default is false
use_encryption = false
# if true, message will be compressed
use_compression = false
# remote port listen by frps
remote_port = 6001
# frps will load balancing connections for proxies in same group
group = test_group
# group should have same group key
group_key = 123456
# enable health check for the backend service, it support 'tcp' and 'http' now
# frpc will connect local service's port to detect it's healthy status
health_check_type = tcp
# health check connection timeout
health_check_timeout_s = 3
# if continuous failed in 3 times, the proxy will be removed from frps
health_check_max_failed = 3
# every 10 seconds will do a health check
health_check_interval_s = 10
# additional meta info for each proxy
meta_var1 = 123
meta_var2 = 234

[ssh_random]
type = tcp
local_ip = 127.0.0.1
local_port = 22
# if remote_port is 0, frps will assign a random port for you
remote_port = 0

# if you want to expose multiple ports, add 'range:' prefix to the section name
# frpc will generate multiple proxies such as 'tcp_port_6010', 'tcp_port_6011' and so on.
[range:tcp_port]
type = tcp
local_ip = 127.0.0.1
local_port = 6010-6020,6022,6024-6028
remote_port = 6010-6020,6022,6024-6028
use_encryption = false
use_compression = false

[dns]
type = udp
local_ip = 114.114.114.114
local_port = 53
remote_port = 6002
use_encryption = false
use_compression = false

[range:udp_port]
type = udp
local_ip = 127.0.0.1
local_port = 6010-6020
remote_port = 6010-6020
use_encryption = false
use_compression = false

# Resolve your domain names to [server_addr] so you can use http://web01.yourdomain.com to browse web01 and http://web02.yourdomain.com to browse web02
[web01]
type = http
local_ip = 127.0.0.1
local_port = 80
use_encryption = false
use_compression = true
# http username and password are safety certification for http protocol
# if not set, you can access this custom_domains without certification
http_user = admin
http_pwd = admin
# if domain for frps is frps.com, then you can access [web01] proxy by URL http://test.frps.com
subdomain = web01
custom_domains = web02.yourdomain.com
# locations is only available for http type
locations = /,/pic
host_header_rewrite = example.com
# params with prefix "header_" will be used to update http request headers
header_X-From-Where = frp
health_check_type = http
# frpc will send a GET http request '/status' to local http service
# http service is alive when it return 2xx http response code
health_check_url = /status
health_check_interval_s = 10
health_check_max_failed = 3
health_check_timeout_s = 3

[web02]
type = https
local_ip = 127.0.0.1
local_port = 8000
use_encryption = false
use_compression = false
subdomain = web01
custom_domains = web02.yourdomain.com
# if not empty, frpc will use proxy protocol to transfer connection info to your local service
# v1 or v2 or empty
proxy_protocol_version = v2

[plugin_unix_domain_socket]
type = tcp
remote_port = 6003
# if plugin is defined, local_ip and local_port is useless
# plugin will handle connections got from frps
plugin = unix_domain_socket
# params with prefix "plugin_" that plugin needed
plugin_unix_path = /var/run/docker.sock

[plugin_http_proxy]
type = tcp
remote_port = 6004
plugin = http_proxy
plugin_http_user = abc
plugin_http_passwd = abc

[plugin_socks5]
type = tcp
remote_port = 6005
plugin = socks5
plugin_user = abc
plugin_passwd = abc

[plugin_static_file]
type = tcp
remote_port = 6006
plugin = static_file
plugin_local_path = /var/www/blog
plugin_strip_prefix = static
plugin_http_user = abc
plugin_http_passwd = abc

[plugin_https2http]
type = https
custom_domains = test.yourdomain.com
plugin = https2http
plugin_local_addr = 127.0.0.1:80
plugin_crt_path = ./server.crt
plugin_key_path = ./server.key
plugin_host_header_rewrite = 127.0.0.1
plugin_header_X-From-Where = frp

[plugin_https2https]
type = https
custom_domains = test.yourdomain.com
plugin = https2https
plugin_local_addr = 127.0.0.1:443
plugin_crt_path = ./server.crt
plugin_key_path = ./server.key
plugin_host_header_rewrite = 127.0.0.1
plugin_header_X-From-Where = frp

[plugin_http2https]
type = http
custom_domains = test.yourdomain.com
plugin = http2https
plugin_local_addr = 127.0.0.1:443
plugin_host_header_rewrite = 127.0.0.1
plugin_header_X-From-Where = frp

[secret_tcp]
# If the type is secret tcp, remote_port is useless
# Who want to connect local port should deploy another frpc with stcp proxy and role is visitor
type = stcp
# sk used for authentication for visitors
sk = abcdefg
local_ip = 127.0.0.1
local_port = 22
use_encryption = false
use_compression = false

# user of frpc should be same in both stcp server and stcp visitor
[secret_tcp_visitor]
# frpc role visitor -> frps -> frpc role server
role = visitor
type = stcp
# the server name you want to visitor
server_name = secret_tcp
sk = abcdefg
# connect this address to visitor stcp server
bind_addr = 127.0.0.1
bind_port = 9000
use_encryption = false
use_compression = false

[p2p_tcp]
type = xtcp
sk = abcdefg
local_ip = 127.0.0.1
local_port = 22
use_encryption = false
use_compression = false

[p2p_tcp_visitor]
role = visitor
type = xtcp
server_name = p2p_tcp
sk = abcdefg
bind_addr = 127.0.0.1
bind_port = 9001
use_encryption = false
use_compression = false

[tcpmuxhttpconnect]
type = tcpmux
multiplexer = httpconnect
local_ip = 127.0.0.1
local_port = 10701
custom_domains = tunnel1
```

