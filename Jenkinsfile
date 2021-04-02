node{
    stage('Initialize'){
        def dockerHome = tool 'myDocker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }
    
    stage('Run container on Dev Server'){
        docker.withRegistry('tcp://host.docker.internal:2375') {
            docker.build('capablanca4/edt:1.0.0')
            sh 'docker run -d -p 8081:80 capablanca4/edt:1.0.0'
        }
        
    }
}
