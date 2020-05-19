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
                sh '$(npm bin)/ng build --configuration=${ENVIRONMENT} --output-path=${OUTPUT_PATH}'
            }
        }
    }
    post
    {
        success
        {
            zip zipFile: 'webclient-package.zip', archive: true, dir: OUTPUT_PATH
            sh 'rm -rf webclient-package.zip'
        }
    }
}
