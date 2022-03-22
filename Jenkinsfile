node {

    stage("Git Clone"){

        url: 'https://github.com/Saykot1997/mernblockapp.git'
    }

    stage("Docker build"){
        sh 'docker version'
        sh 'docker build -t saykot/frontend:latest ./client'
        sh 'docker images'
    }

    withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'PASSWORD')]) {
        sh 'docker login -u rsaykot -p $PASSWORD'
    }

    stage("Push Image to Docker Hub"){
        sh 'docker push saykot/frontend:latest'
    }

}
 
