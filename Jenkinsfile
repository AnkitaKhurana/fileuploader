pipeline {
     agent any
    environment {
         CI = 'true'
    }
    stages {
        // stage('Build') {
        //     steps {
        //         bat 'npm install'
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         bat 'npm test'
        //     }
        // }
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
//          
               
           
            steps {
                script {
                withCredentials([usernamePassword(credentialsId: 'nexus',
                     usernameVariable: 'Username', passwordVariable: 'Password')]) {
                // usr = "$Username"

                // pwd = "$Password"
                // echo "%Username%  %Password%"
                bat "npm login << MULTILINE $Username $Password MULTILINE"
               
                }
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
