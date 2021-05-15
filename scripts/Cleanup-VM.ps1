# minikube ssh -- docker run -it --rm --privileged --pid=host alpine nsenter -t 1 -m -u -n -i date -u $(date -u +%m%d%H%M%Y)
minikube ssh -- docker system prune -a -f