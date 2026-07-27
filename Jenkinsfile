pipeline {
    agent any

    environment {
        DOCKER_USER  = "guilhermeacademico" 
        DOCKER_IMAGE = "minhaappweb20261"
        VERSION      = "latest"
        
        DOCKER_CREDENTIALS_ID = "dockerhub-credentials1"
    }

    stages {
        stage('Build Image') {
            steps {
                sh "docker build -t ${DOCKER_USER}/${DOCKER_IMAGE}:${VERSION} ."
            }
        }

        stage('Teste') {
            steps {
                echo "Executando a bateria de teste..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Enviando imagem da aplicação para o Docker Hub..."
                
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", 
                                                    usernameVariable: 'DOCKER_HUB_USER', 
                                                    passwordVariable: 'DOCKER_HUB_PASS')]) {

                    sh '''
                        echo "$DOCKER_HUB_PASS" | docker login -u "$DOCKER_HUB_USER" --password-stdin
                    '''
                }
                
                sh "docker push ${DOCKER_USER}/${DOCKER_IMAGE}:${VERSION}"
            }
        }
    }
}
