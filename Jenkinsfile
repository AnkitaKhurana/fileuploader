pipeline {
    agent any
    environment {
        registry = "ankitakhurana25/fileuploader"
        registryCredential = 'dockerhub'
        dockerImage = ''
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                bat 'npm install --registry=https://registry.npmjs.org/'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        stage ('Sonar Quality'){
           environment {
                jdk = tool name: 'JAVA_HOME'
                 JAVA_HOME = "${jdk}"
                 scannerHome = tool 'SonarQube Scanner'
           }
            steps {
                withSonarQubeEnv('SonarQube') {
                bat "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') 
                {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Publish to Nexus Artifactory') {
            steps {
                bat 'npm publish'
            }
        }
         stage('Building image') {
            steps{
                script {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('Deploy Image') {
          steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                    dockerImage.push()
                }
            }
          }
        }
        stage('Applicaion run') {
          steps{
                script {
                                   bat 'docker run -p 3000:3000 '+registry + ":$BUILD_NUMBER"
 
                //    dockerImage.withRun {c ->
                //         // bat "docker logs ${c.id}"
                //         // bat "echo ${c.id} running"
                //    }
                }
            }
          
        }
    }
         
}
