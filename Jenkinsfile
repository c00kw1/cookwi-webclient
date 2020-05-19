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
        stage ('Artifacts')
        {
            steps
            {
                zip zipFile: 'webclient-package.zip', archive: true, dir: OUTPUT_PATH
                zip zipFile: 'docker-config.zip', archive: true, dir: "docker/${ENVIRONMENT}"
            }
        }
    }
    post
    {
        always
        {
            deleteDir()
        }
    }
}
