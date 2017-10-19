# Using Kubeless UI with Kubeless

## In-Cluster Installation

### New installation
To run the UI inside your Kubernetes cluster as a Deployment and Service you can run the following:

```bash
kubectl create -f https://raw.githubusercontent.com/kubeless/kubeless-ui/master/k8s.yaml
```

These are known to work on minikube, they may need a few tweaks if you have RBAC turned on (docs coming soon).

### Install new updates for Kubeless UI

- Delete the existing services and deployments of Kubeless UI

```bash
kubectl delete deployment ui
kubectl delete svc ui
```

- Install latest version of Kubeless UI

```bash
kubectl create -f https://raw.githubusercontent.com/kubeless/kubeless-ui/master/k8s.yaml
```

### Kubeless UI on Minikube

To see the UI come up in minikube

```bash
minikube service ui -n kubeless
```
Alternatively,
```bash
kubectl get svc ui -n kubeless
NAME      CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE
ui        10.0.0.151   <pending>     3000:31172/TCP   12m
```
and access the UI at
```bash
$(minikube ip):31172
```
