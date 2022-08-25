
# 基于acme.sh 来安装ssl

[在线文档](https://github.com/acmesh-official/acme.sh)

[在线中文文档](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

* 安装 acme.hs

```bash
curl https://get.acme.sh | sh -s email=347343944@qq.com
```
--reloadcmd     "nginx -s reload"

```bash
[root@qqh-cloud ~] acme.sh  --issue  --dns   -d qingqingtu.com --yes-I-know-dns-manual-mode-enough-go-ahead-please # 生成相应的解析记录,然后去dns解析
[2022年 01月 17日 星期一 22:08:44 CST] Using CA: https://acme.zerossl.com/v2/DV90
[2022年 01月 17日 星期一 22:08:44 CST] Create account key ok.
[2022年 01月 17日 星期一 22:08:44 CST] No EAB credentials found for ZeroSSL, let\'s get one
[2022年 01月 17日 星期一 22:08:46 CST] Registering account: https://acme.zerossl.com/v2/DV90
[2022年 01月 17日 星期一 22:08:58 CST] Registered
[2022年 01月 17日 星期一 22:08:58 CST] ACCOUNT_THUMBPRINT='vGqgywcpiPkDAYTLWt_hLsJHcy_JEEMJ0wzm_gc18w4'
[2022年 01月 17日 星期一 22:08:58 CST] Creating domain key
[2022年 01月 17日 星期一 22:08:58 CST] The domain key is here: /root/.acme.sh/qingqingtu.com/qingqingtu.com.key
[2022年 01月 17日 星期一 22:08:58 CST] Single domain='qingqingtu.com'
[2022年 01月 17日 星期一 22:08:58 CST] Getting domain auth token for each domain
[2022年 01月 17日 星期一 22:09:12 CST] Getting webroot for domain='qingqingtu.com'
[2022年 01月 17日 星期一 22:09:12 CST] Add the following TXT record:
[2022年 01月 17日 星期一 22:09:12 CST] Domain: '_acme-challenge.qingqingtu.com'  # 这个值，拿去dns验证
[2022年 01月 17日 星期一 22:09:12 CST] TXT value: 'VEojE5KDQt-shywiYWGO5vDdOxUkwZVlQGjXvFL8qiQ' # 这个值，拿去dns验证
[2022年 01月 17日 星期一 22:09:12 CST] Please be aware that you prepend _acme-challenge. before your domain
[2022年 01月 17日 星期一 22:09:12 CST] so the resulting subdomain will be: _acme-challenge.qingqingtu.com
[2022年 01月 17日 星期一 22:09:12 CST] Please add the TXT records to the domains, and re-run with --renew.
[2022年 01月 17日 星期一 22:09:12 CST] Please add '--debug' or '--log' to check more details.
[2022年 01月 17日 星期一 22:09:12 CST] See: https://github.com/acmesh-official/acme.sh/wiki/How-to-debug-acme.sh
[root@qqh-cloud ~] acme.sh  --renew -d qingqingtu.com --yes-I-know-dns-manual-mode-enough-go-ahead-please # 去dns验证完之后，过大概5分钟，再执行这个命令进行验证
[2022年 01月 17日 星期一 22:32:30 CST] Renew: 'qingqingtu.com'
[2022年 01月 17日 星期一 22:32:35 CST] Using CA: https://acme.zerossl.com/v2/DV90
[2022年 01月 17日 星期一 22:32:35 CST] Single domain='qingqingtu.com'
[2022年 01月 17日 星期一 22:32:35 CST] Getting domain auth token for each domain
[2022年 01月 17日 星期一 22:32:35 CST] Verifying: qingqingtu.com
[2022年 01月 17日 星期一 22:32:47 CST] Processing, The CA is processing your order, please just wait. (1/30)
[2022年 01月 17日 星期一 22:32:54 CST] Success
[2022年 01月 17日 星期一 22:32:54 CST] Verify finished, start to sign.
[2022年 01月 17日 星期一 22:32:54 CST] Lets finalize the order.
[2022年 01月 17日 星期一 22:32:54 CST] Le_OrderFinalize='https://acme.zerossl.com/v2/DV90/order/pjM9Tt4CqsWmp9OPb_fk5A/finalize'
[2022年 01月 17日 星期一 22:32:59 CST] Order status is processing, lets sleep and retry.
[2022年 01月 17日 星期一 22:32:59 CST] Retry after: 15
[2022年 01月 17日 星期一 22:33:15 CST] Polling order status: https://acme.zerossl.com/v2/DV90/order/pjM9Tt4CqsWmp9OPb_fk5A
[2022年 01月 17日 星期一 22:33:20 CST] Downloading cert.
[2022年 01月 17日 星期一 22:33:20 CST] Le_LinkCert='https://acme.zerossl.com/v2/DV90/cert/GBF130HUrc2Mlj5mx-P2jQ'
[2022年 01月 17日 星期一 22:33:25 CST] Cert success.
-----BEGIN CERTIFICATE-----
MIIGajCCBFKgAwIBAgIQfx/HHhCchWnzULH9jKmAADANBgkqhkiG9w0BAQwFADBL
MQswCQYDVQQGEwJBVDEQMA4GA1UEChMHWmVyb1NTTDEqMCgGA1UEAxMhWmVyb1NT
TCBSU0EgRG9tYWluIFNlY3VyZSBTaXRlIENBMB4XDTIyMDExNzAwMDAwMFoXDTIy
MDQxNzIzNTk1OVowGTEXMBUGA1UEAxMOcWluZ3Fpbmd0dS5jb20wggEiMA0GCSqG
SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCuNUbFtyMa9NL/cUoPakVcwIC6J7hqIJ1Q
4/95Pb5i4vBDSCuDn4hbbFDDCprfzPpolyhJHkk8j3PcoaUAAEGhyeLlt89SXrPH
nb11oWtwYVo1X/ktVIG1zg6UdRu9hz1X5ocJPoLLrJxUGtD2CF1R0ctyHkE9m7dG
FCq42DOfVPZKn3Qc5249xeX9ndlTxf2423e2A/i7xJCp0gy0YQsLvEUAZcyzqXNy
R3me0YXYmjlyDh+aMeo8gz1WkQ9UAye7Xvp1O2AM+xyL3yZD+aLA/ZGa3K+RrmZp
rOYiP4xU3zl2+SXAiKVFgcSqn1Mk5BO3p/15oN+VPyVqgKI1USbbAgMBAAGjggJ6
MIICdjAfBgNVHSMEGDAWgBTI2XhootkZaNU9ct5fCj7ctYaGpjAdBgNVHQ4EFgQU
3wIYVjNNek1+seQrxIijakxC6rwwDgYDVR0PAQH/BAQDAgWgMAwGA1UdEwEB/wQC
MAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMEkGA1UdIARCMEAwNAYL
KwYBBAGyMQECAk4wJTAjBggrBgEFBQcCARYXaHR0cHM6Ly9zZWN0aWdvLmNvbS9D
UFMwCAYGZ4EMAQIBMIGIBggrBgEFBQcBAQR8MHowSwYIKwYBBQUHMAKGP2h0dHA6
Ly96ZXJvc3NsLmNydC5zZWN0aWdvLmNvbS9aZXJvU1NMUlNBRG9tYWluU2VjdXJl
U2l0ZUNBLmNydDArBggrBgEFBQcwAYYfaHR0cDovL3plcm9zc2wub2NzcC5zZWN0
aWdvLmNvbTCCAQQGCisGAQQB1nkCBAIEgfUEgfIA8AB2AEalVet1+pEgMLWiiWn0
830RLEF0vv1JuIWr8vxw/m1HAAABfmh0oSgAAAQDAEcwRQIhANPaqKnoIOKq/8mR
IWnVbBGOjLkCuYONz84cdy9j6qGPAiBvBEIivobBjnGuKZO+T0dUuo8v+hmDLO14
7cM0Q9ZQ7AB2AEHIyrHfIkZKEMahOglCh15OMYsbA+vrS8do8JBilgb2AAABfmh0
oPwAAAQDAEcwRQIhAOK6lSp3RzuhxqTqpNAOPDH/DThUxPet6Vbk8oHCjVsiAiAj
KT+/9DjsARfet/NdRCUALoZRUd64mKkoq5luyCpPbTAZBgNVHREEEjAQgg5xaW5n
cWluZ3R1LmNvbTANBgkqhkiG9w0BAQwFAAOCAgEAWd5ne3OGTkUwwfk5MnptEV48
mFuQ+OeJaYAiHEtotc1TqRucjlxdbvTwHM34uEtpf7P3QZXyYM6eGj0VNYRQwhme
iTp1ybfOe2a9PRo8JCgRb/HPGFb3TkB4fECdb6htBKuSQ3yOJBih5FipHJK5dsMk
Y4ICrO2jPNXiNjT/kwksLkN7adw9Bm/EZyYsD8QqnUyT3rhhOtD+bVnht7y9pzra
R6VoN0FmTkgrH9QMUIb4HsmjQWhW07TGZ5Od/lA0xdl4eC6OD+aFgn7xHNhmr/B+
nIdfL/A0R6a5tCMv2Vztt1G89ndBVViwq0v+unqyqSoVC453fsUBfir+OSVdWmTJ
HApo9TazD/SrpQxShGhomTsa9ncAgObHxxuL/uVTX5vmlJOC9tOn4v75RD1drOra
0F689oFqkgd3h3ieOiLWy8E+hg8Rl7xjc14H42C7GI3LfsUi7Hxc70nulGqFF2bY
Z8q4W9JmYfi6VqSXQL1I/XcxoA03tJnfV9L6Mr0gpGYwpxTragM+aKaLdj8Olg3O
mqiaihZl9a/tfuBjBzAwPQimPAVoiP4niSILZ13xL/I2pnbS3zEWnhGlXxXmpcZ0
lNOjcEBuWj3OAVADKMEU3aQB8F7AKN2lA17MJM6C2tjaIpHpB4s5ikUBWPotZaOD
wd86JuB3jGNfYkrO3vY=
-----END CERTIFICATE-----
[2022年 01月 17日 星期一 22:33:25 CST] Your cert is in: /root/.acme.sh/qingqingtu.com/qingqingtu.com.cer
[2022年 01月 17日 星期一 22:33:25 CST] Your cert key is in: /root/.acme.sh/qingqingtu.com/qingqingtu.com.key
[2022年 01月 17日 星期一 22:33:25 CST] The intermediate CA cert is in: /root/.acme.sh/qingqingtu.com/ca.cer
[2022年 01月 17日 星期一 22:33:25 CST] And the full chain certs is there: /root/.acme.sh/qingqingtu.com/fullchain.cer
```

# 配置nginx




