pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
     environment {
            CI = 'true'
        }
     sonar_out =  "/tmp/sonar-${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}"
    sonar_server = "localhost:9000"
    sonar_url = "http://10.156.156.51:9000/api/qualitygates/project_status?projectKey=${env.service_name}"
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
        timeout(time: 10, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }
    }
        }     
    //     stage('Deliver') {
    //                  steps {
    //                             sh './jenkins/scripts/deliver.sh'
    //                             input message: 'Finished using the web site? (Click "Proceed" to continue)'
    //                             sh './jenkins/scripts/kill.sh'
    //                         }
    //                     }

                        

    // }
}
