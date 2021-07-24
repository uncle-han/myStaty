pipeline {
    agent {
        node {
            label 'local-dell-vm-salve-A'
        }
    }
    environment {
        ok='ok111'
    }
    options {
        timeout(time: 1, unit: 'HOURS') // 整个构建流程的超时设定
        retry(1)  // 在失败时, 重新尝试整个流水线的指定次数
    }
    parameters {
        // string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
        booleanParam(name: 'DEBUG_BUILD', defaultValue: true, description: 'define in script')
    }
    // tools {
    //     nodejs 'nodejs-latest'
    // }
    stages {
        stage('pull code') {
            steps {
                sh 'npm -v'
                sh 'node -v'
                sh 'printenv'
                sh 'echo $ok' // 使用 environment 变量
                sh 'echo $psw' // 使用 job定义的 变量
                sh 'ifconfig'
                sh 'ls /jenkins'
            }
        }
        stage('build') {
            agent {
                node {
                    label 'master'
                }
            }
            steps {
                sh 'ifconfig'
            }
        }
        stage('deploy') {
            agent {
                node {
                    label 'ali-cloud-jk-deploy'
                }
            }
            // input {
            //     message "Should we continue?"
            //     ok "Yes, I agree." // 确定案例的文案 
            //     submitter "alice,bob" // 限制谁可以kandao
            //     parameters {
            //         string(name: 'userInput', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
            //     }
            // }
            steps {
                sh 'who'
                sh 'sudo docker image list'
                sh 'ls -l /dockerWork'
                sh 'echo $env'
                // sh 'echo user is input $userInput'
            }
        }
    }
}
