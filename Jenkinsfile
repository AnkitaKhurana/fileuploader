pipeline {
     agent any
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
        // stage ('Sonar Quality'){
        //    environment {
        //         jdk = tool name: 'JAVA_HOME'
        //          JAVA_HOME = "${jdk}"
        //          scannerHome = tool 'SonarQube Scanner'
        //    }
        //     steps {
        //         withSonarQubeEnv('SonarQube') {
        //         bat "${scannerHome}/bin/sonar-scanner"
        //         }
        //         timeout(time: 10, unit: 'MINUTES') 
        //         {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }
        stage ('Loginto Nexus '){
           environment {
                withCredentials([usernamePassword(credentialsId: 'nexus',
                     usernameVariable: 'Username', passwordVariable: 'Password')]) {
                        Username = '$Username'
                }
           }
            steps {
                script {
                   sh 'echo $Username'
                 echo "${env.Username}"
            }
        }
            
        }
        // stage('Publish') {
        //     steps {
        //         bat 'npm publish'
        //     }
        // }
       
    }     
}
