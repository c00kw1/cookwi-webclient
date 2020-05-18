pipeline {
    agent { docker { image 'node:latest' } }
    stages {
        stage ('Install dependencies')
        {
            steps
            {
                sh 'npm install'
            }
        }
        stage ('Build')
        {
            steps
            {
                sh '$(npm bin)/ng build'
            }
        }
        // stage ('Test')
        // {
        //     steps
        //     {
        //         sh '$(npm bin)/ng test --no-watch --no-progress --browsers=ChromeHeadlessCI'
        //     }
        // }
    }
}