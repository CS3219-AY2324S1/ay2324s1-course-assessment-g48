### Basics
```
# Get current context of kubectl
kubectl config current-context

# Get <resources>
kubectl get nodes
kubectl get deployments
kubectl get services
kubectl get configmaps
kubectl get ingress

# Namespaces to isolate resources
kubectl get namespaces
kubectl get ns

# -n to specify namespace
kubectl get pods -n <namespace>

# Check the details of pods
kubectl describe pod <pod name> -n <namespace>
```

### Deployment
```
eval $(minikube docker-env)
docker build -f Dockerfile.frontend -t peerprep-frontend .
```


###
```
# Get Load Balancer Ip address
kubectl get services -o custom-columns=NAME:.metadata.name,TYPE:.spec.type,EXTERNAL-IP:.status.loadBalancer.ingress[0].ip

# Get the image of deployment
kubectl get deployment <deployment> -o=jsonpath='{.spec.template.spec.containers[0].image}' 

# Open terminal of pod
kubectl exec -it my-pod -- /bin/sh
kubectl exec -it POD_NAME -- /bin/bash
```
