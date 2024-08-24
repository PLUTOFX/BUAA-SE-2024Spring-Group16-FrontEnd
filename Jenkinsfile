pipeline {
    agent any
    
    // tools {
    //     nodejs 'node'  // 使用全局工具配置中设置的名称
    //     dockerTool 'docker'
    // }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // 构建 Docker 镜像 
                    sh '''kubectl delete deployment frontend-.yaml
                    docker rmi 
                    docker build --no-cache -t group16-frontend:latest .
                    kubectl apply -f deployment_frontend.yaml
                    '''
                }
            }
        }
        
        // stage('Deploy') {
        //     steps {
        //         script {
        //             // 部署到服务器或 Kubernetes 集群
        //             sh 'docker rm -f group16-frontend-container 2>/dev/null || true '
        //             sh 'docker run -d -p 80:80 group16-frontend:latest --name group16-frontend-container' 
        //         }
        //     }
        // }
    }
}

