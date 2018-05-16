# Kubernetes

## 1. Requisits previs
### 1.1 Instal·lació de docker als nodes del cluster.
A totes les màquines que formin part del cluster de Kubernetes és necessari que estigui instal·lat Docker, executem les comandes:
```sh
apt-get update
apt-get install -y docker.io
```
### 1.2 Instal·lació kubeadm, kubelet i kubectl.
- **kubeadm**: comanda per posar en marxa el cluster.
- **kubelet**: component que s'executa a tots els nodes del cluster i s'encarrega de la comunicació amb el node master.
- **kubectl**: comanda que ens permetra gestionar el nostre cluster des d'una terminal.

Instal·lem tots els components executant:
```sh
apt-get update && apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm kubectl
```
### 1.3 Configuració del driver cgroup al node master.
Al node master hem de verificar que s'utilitzi el masteix driver de cgroup que a Docker, podem veure comprova el cgroup de docker amb:
```sh
docker info | grep -i cgroup
```
Per defecte no es troba especificat i haurem de modificar el fitxer /etc/systemd/system/kubelet.service.d/10-kubeadm.conf i afegir el cgroup-driver a la configuració:

```sh
Environment="KUBELET_KUBECONFIG_ARGS=--bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf cgroup-driver=cgroupfs"
```

Reiniciem el daemon de kubelet:
```sh
systemctl daemon-reload
systemctl restart kubelet
```
### 1.4 Desactivar la partició de swap.
Afegim '#' a l'entrada coresponent a swap del fitxer /etc/fstab.

```sh
#/dev/mapper/kubernetes--master--vg-swap_1 none            swap    sw              0       0
```
## 2. Configuració del cluster

- kubernetes-master: 192.168.1.25
- kubernetes-node-01: 192.168.1.26
- kubernetes-node-02: 192.168.1.27

```sh
kubeadm init --pod-network-cidr=10.244.0.0/16
```
### 2.2 Instal·lar la xarxa dels pods.

```sh
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.10.0/Documentation/kube-flannel.yml
```

### 2.3 Afegir nodes slaves al cluster.
```sh
kubeadm join --token <token> <master-ip>:<master-port> --discovery-token-ca-cert-hash sha256:<hash>
```
Podem comprovar els nodes associats al cluster executant:
```sh
kubectl get nodes
```
### 2.4 Kubernetes Dashboard

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
```
#### 2.4.1 Token d'accés al dashboard


## Docker

### Crear token d'autorització per docker-hub

```sh
sudo kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=qonaisys --docker-password=<qonaisys-account-password> --docker-email=jorge.ferrer.rodriguez@upc.edu
```
### Consultar informació del token

```sh
kubectl get secret regcred --output=yaml
```

### Paràmetres fitxer de configuració del deployment

Una vegada disposem de les credencials del compte de docker-hub on emmagatzemaren la nostra imatge de l'aplicació, és necessari afegir els camps corresponent al fitxer de configuració per autenticar-nos a l'hora de descarregar-la.

```sh
  imagePullSecrets:
  - name: regcred
```
## Creating and ethervote deployment

```sh
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: ethervote-deployment
spec:
  selector:
    matchLabels:
      app: ethervote
  replicas: 2 # tells deployment to run 2 pods matching the template
  template: # create pods using pod definition in this template
    metadata:
      labels:
        app: ethervote
    spec:
      containers:
      - name: ethervote
        image: qonaisys/ethervote
        ports:
        - containerPort: 80
        imagePullPolicy: Always
      imagePullSecrets:
        - name: regcred
```
1. Create a Deployment based on the YAML file

```sh
kubectl create -f ./ethervote-deployment.yaml
```

2. Display information about the Deployment:
```sh
kubectl describe deployment nginx-deployment
```


## Creating a service
```sh
# kubectl expose deployment ethervote-deployment --type="NodePort" --name=ethervote-service --port=8080 --target-port=80
```
