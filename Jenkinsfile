pipeline {
     agent any
    // agent {
    //     docker {
    //         image 'node:6-alpine'
    //         args '-p 3000:3000'
    //     }
    // }
    environment {
         CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage ('Sonar Quality'){
           environment {
                 scannerHome = tool 'SonarQube Scanner'
           }
            steps {
                withSonarQubeEnv('sonarqube') {
                sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') 
                {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }     
}
