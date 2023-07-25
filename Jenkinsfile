pipline {
    agent any
    stages {
        stage("build and push docker image") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId:'dockerhub-cred', usernameVariable: 'USER', passwordVariable: 'PWD')]) {
                        sh "echo $PWD | docker login -u $USER --password-stdin"
                        sh "docker build -t akramexp/my-repo:quote-gen-1.0 ."
                        sh "docker push akramexp/my-repo:quote-gen-1.0"
                    }
                }
            }
        }
        stage("deploy app with docker on server") {
            steps {
                script {
                    def remote[:]
                    remote.name = 'ansible-server'
                    remote.host = ''
                    remote.allowAnyHost = true
                    withCredentials([sshUserPrivateKey(credentialsId: 'ansible-server-key', usernameVariable: 'root', keyFileVariable: 'keyfile')]) {
                        remote.user = root
                        remote.identityFile = keyfile
                        sshScript remote: remote, script: "server-script.sh"
                        withCredentials([usernamePassword(credentialsId:'dockerhub-cred', usernameVariable: 'USER', passwordVariable: 'PWD')]) {
                            sshCommand remote: remote, command: "docker run -p 80:80 -d akramexp/myrepo:quote-gen-1.0"
                        }
                    }
                }
            }
        }
    }
}