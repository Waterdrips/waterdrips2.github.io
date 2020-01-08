---
layout: post
title: Inlets and Inlets Pro
description: Give anything a public IP with inlets and inlets pro
date: 07-01-2020
image: inlets-home.jpg
image_alt: inlets pro headline image
---


![Street Sign with 127.0.0.1](/images/inlets-home.jpg)


# What is inlets?
Inlets is a reverse proxy written and maintained by [Alex Ellis](https://twitter.com/alexellisuk) and the github community.

This means you can use it to create inbound network tunnels to computers that dont have a public ip, are behind firewalls
or get assigned new IPs frequently. Things like your laptop when you move from the office to a coffee shop. While writing 
this post I have probably been on 5 different networks, but still been able to connect to my laptop's [k3d](https://github.com/rancher/k3d) 
cluster using the same public IP address.

## Why inlets
It's on the [CNCF](https://cncf.io) landscape in the [Service Proxy](https://landscape.cncf.io/category=service-proxy&format=card-mode&grouping=category)
section. It's cloud native!

![Inlets Cloud NAtive card](/images/cncf-inlets.png)

There are plenty of freemium services out there that will give you inbound network access to processes that dont have 
inbound connectivity, but most of these services are in control of your data, rate limit and are closed source. Inlets 
gives you back control of your data, privacy and lets you run the service in the way you want. 

With cloud VMs starting at $5 with heaps of inbound data transfer there's no need to pay 10s of dollars a month for someone else 
to run a limited service for you. 

## How it works

Inlets creates a tunnel from your local process to a public cloud instance (or anything that can accept inbound traffic).
I have been using digital ocean's smallest VMs as my exit nodes. However, you can setup inlets using anything that can be 
accessed from both the internet, and the application or process you want to expose. 

## inletsctl

There is a handy CLI for managing your inlets services called [inletsctl](https://github.com/inlets/inletsctl).
I will be using this cli throughout the post as it simplifies the process of getting things setup and configured. 


![inletsctl basic command](/images/inletsctl.png)

The creat command automates the provisioning, setup and configuration of the publicly accessible exit-node using cloud 
instances.

Currently supported providers:
* Digital Ocean
* Scaleway
* Civo
* Google Cloud
* Packet

You will need your own account, and will incur costs, with whichever provider you use if you are following along.


There are some great blog posts already about setting up inlets without the CLI

 - [HTTPS for your local endpoints with inlets and Caddy](https://blog.alexellis.io/https-inlets-local-endpoints/) - Alex Ellis
 - [Setting up an EC2 Instance as an Inlets Exit Node](https://mbacchi.github.io/2019/08/21/inlets-aws-ec2.html) - Matt Bacchi
 
Therefore I wont be focusing on this, instead we will focus on the why and the what of inlets.
## Before you get started

Its probably best to say that if you are using a corporate network, or any network you aren't responsible for, you should
ensure you have permission to start routing inbound internet traffic. It goes without saying that this exposes the network 
to extra risk and could drastically increase the network attack surface.

## inlets-operator 

I'm using Kubernetes and can't forward every process from every node... 

Not to worry, the [inlets-operator](https://github.com/inlets/inlets-operator) has your back. Using this 

The operator automates the creation of an inlets exit-node on public cloud, and runs the client as a Pod inside your 
cluster. Your Kubernetes Service will be updated with the public IP of the exit-node and you can start receiving 
incoming traffic immediately. 

I have written a separate post on the inlets operator that you should read if you are using Kubernetes somewhere where 
you dont have inbound network traffic. Like k3s/k3d/minikube/microk8s/Docker Desktop/KinD.

[You can read it here](/inlets-operator/)

# People LOVE reverse proxies

My most viewed tweet so far is this

![inlets tweet](/images/inlets-tweet.png)

# Why Inlets Pro?

Inlets Pro is a commercial extension to inlets, you can [try it out and contact OpenFaaS for more information](https://github.com/inlets/inlets-pro-pkg#getting-a-license-key--more-info)

According to the github REAMDE [inlets-pro is an L4 TCP load-balancer](https://github.com/inlets/inlets-pro-pkg/). 

OK, thanks. 

For those of us that can't remember the entire network stack and what each layer does or is (humans?), 
this roughly translates as `deliveres the correct data to the correct application process over the network`.

So putting that in the context of inlets-pro, it forwards TCP traffic over an encrypted websocket secured with TLS to 
your application process. Cool!

These are some of the [features](https://github.com/inlets/inlets-pro-pkg/#features)

* Support for any TCP protocol
* Automatic TLS encryption for tunnel and control-port
* Pass-through L4 proxy
* Automatic port detection, as announced by client
* systemd support and automatic retries
* Kubernetes compatible

What am I using that normal inlets can't do? 
* Non HTTP traffic (SSH and Postgres)
* TLS pass-through (Terminating TLS at the process rather than the exit node)
* systemd support

If you just want to expose a service for http traffic you can use inlets. I use standard inlets when proxying my draft 
blog posts, which are served from my laptop, out to the internet so my friends and family can proofread them. (I'm REALLY
bad at spelling)

But for this post we will use both standard and pro features to show off as many use cases as possible.


# What can I use this for?
(anywhere you need a public IP)
(find that tweet from alex)
(Production services, management of APIs in private VPCs, bastion hosts.   Prototyping, Demos, Home Lab, IoT)

# Enough talk - time for action

### Setup

We have already briefly looked at `inletsctl`, but we didnt discuss installation or setup. 

> All of the commands shown are for linux and will probably work on Mac too. If you are using Windows then you should probably use git bash


Download and install inlets, inlets pro and inletsctl


```sh 
# Install Inletsctl to /usr/local/bin
curl -sLSf https://inletsctl.inlets.dev | sudo s

# Install Inlets to /usr/local/bin/
curl -sLS https://get.inlets.dev | sudo sh

# Install Inlets Pro
curl -SLsf https://github.com/inlets/inlets-pro-pkg/releases/download/0.4.3/inlets-pro-linux > inlets-pro-linux
chmod +x ./inlets-pro-linux
sudo mv inlets-pro-linux /usr/local/bin/inlets-pro-linux

```

I'm using Digital Ocean for my exit nodes, you need to grab your Digital Ocean API Key if you are following along. 
I have saved mine in a file called `do-token` in my home directory.


Then we can create an exit node
```sh

inletsctl create --access-token-file ~/do-token

```

![example output from inletsctl create](/images/inletsctl-create.png)


You should have some similar output to above, this is showing that we created a node and it's ready to be configured 
to forward traffic. It's even helpfully given us the commands we need to run to get something configured.

If you have docker installed you can do a quick test to see if it's working.

```sh 
docker run -p 8080:8080 --rm nginx:latest 


export UPSTREAM=http://127.0.0.1:8080

inlets client --remote "ws://<your-public-ip>:8080" \
    --token "your-token" \
    --upstream $UPSTREAM

```

You should have some output in your terminal that shows inlets client connecting to your exit server. You can now navigate to
the public ip of your exit node. If you see the nginx splash page then we are all setup!


![nginx splash page](/images/nginx-splash.png)

(inbound webhooks)
(blog posts)
(sharing content with clients, friends, coworker)
(Home lab (non k8s))


# Have a go yourself



