pipeline {
     agent any
    environment {
         CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                bat 'npm install --registry=https://www.npmjs.com/package/repository/'
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
       stage('Create Docker image') {
            steps {
                bat 'docker build  -t ankitakhurana25/fileuploader .'
            }
        }
    }     
}
