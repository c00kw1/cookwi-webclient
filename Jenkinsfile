pipeline {
    agent { docker { image 'node:latest' } }
    stages {
        stage ('checkout')
        {
            steps
            {
                checkout scm
            }
        }
        stage ('install modules')
        {
            steps
            {
                sh 'npm install --verbose -d'
            }
        }
        stage ('build')
        {
            steps
            {
                sh '$(npm bin)/ng build'
            }
        }
    }
}