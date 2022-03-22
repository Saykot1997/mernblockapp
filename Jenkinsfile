node {

    stage("Git Clone"){

        git branch: 'main', url: 'https://github.com/Saykot1997/mernblockapp.git'
    }

     stage("Frontend App Docker Build"){

        sh 'docker build -t saykot/blog-frontend:latest ./client/'
    }

     stage("Backend App Docker Build"){

        sh 'docker build -t saykot/blog-backend:latest ./server/'
    }

    stage("Docker Login"){

        withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'PASSWORD')]) {
            sh 'docker login -u saykot -p $PASSWORD'
        }
    }

    stage("Frontend Image Push to Docker Hub"){

        sh 'docker push saykot/blog-frontend:latest'
    }

    stage("Backend Image Push to Docker Hub"){

        sh 'docker push saykot/blog-Backend:latest'
    }
}
 
