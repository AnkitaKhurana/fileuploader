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
                bat 'npm install'
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
    }     
}
