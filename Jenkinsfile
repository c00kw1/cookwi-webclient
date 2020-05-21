pipeline {
    parameters
    {
        booleanParam(name: 'PRODUCES_ARTEFACTS', defaultValue: params.PRODUCES_ARTEFACTS ?: false)
        string(name: 'OUTPUT_PATH', defaultValue: params.OUTPUT_PATH ?: './dist')
        string(name: 'ENVIRONMENT', defaultValue: params.ENVIRONMENT ?: 'homologation')
    }
    agent
    {
        docker
        {
            image 'node:latest'
            args "--name ${env.BUILD_TAG}"
        }
    }
    stages {
        stage ('Install dependencies')
        {
            steps
            {
                sh "npm install"
            }
        }
        stage ('Build')
        {
            steps
            {
                echo "params.PRODUCES_ARTEFACTS = ${params.PRODUCES_ARTEFACTS}"
                sh "\$(npm bin)/ng build --configuration=${params.ENVIRONMENT} --output-path=${params.OUTPUT_PATH}"
            }
        }
        stage ('Artifacts')
        {
            when { expression { params.PRODUCES_ARTEFACTS == true } } // if pull_request, we don't want artifacts
            steps
            {
                zip zipFile: 'webclient-package.zip', archive: true, dir: params.OUTPUT_PATH
                zip zipFile: 'docker-config.zip', archive: true, dir: "docker/${params.ENVIRONMENT}"
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
