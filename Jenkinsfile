pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "minhaappweb20261"
        VERSION = "latest"
        CONTAINER_NAME = "${DOCKER_IMAGE}-test"
        APP_PORT = "3000"
        WORKSPACE_DIR = "/home/journey/repos/jenkins/jenkins_home/workspace/pipeline-web"
    }

    stages {
        stage('Cleanup') {
            steps {
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${VERSION} ."
            }
        }

        stage('Test') {
            steps {
                sh """
                    docker run --rm \
                      -v ${WORKSPACE_DIR}:/app \
                      -w /app \
                      node:22-alpine \
                      sh -c "rm -f package-lock.json && npm install --package-lock-only && npm ci && npm test"
                """
            }
        }

        stage('Run') {
            steps {
                sh "docker run -d --rm --name ${CONTAINER_NAME} -p ${APP_PORT}:80 ${DOCKER_IMAGE}:${VERSION}"
            }
        }

        stage('Smoke Test') {
            steps {
                sh """
                    for i in 1 2 3 4 5; do
                        if curl -sf http://localhost:${APP_PORT}/ > /dev/null; then
                            echo "Container respondendo corretamente."
                            exit 0
                        fi
                        sleep 2
                    done
                    echo "Smoke test falhou: aplicação não respondeu."
                    exit 1
                """
            }
        }

        stage('Deploy') {
            steps {
                echo "Enviando imagem da aplicação para Deploy."
            }
        }
    }

    post {
        always {
            sh "docker rm -f ${CONTAINER_NAME} || true"
        }
    }
}
