---
layout: post
title: OpenFaaS Slack App
description: Exploring OpenFaaS as a development Platform
date: 27-04-2020
image: kubernetes-logo.svg
image_alt: kubernetes Logo
---


## Getting started

Now you have decided that OpenFaaS looks like a good platform for your usecase we can go and build a small POC application
in Python to showcase some of the features.


#### Setting up

You are going to need a few things installed.
* Docker 
* [k3d](https://github.com/rancher/k3d) for local testing and CI
* [faas-cli](https://github.com/openfaas/faas-cli) for deploying stuff to OpenFaaS
* [arkade](https://github.com/alexellis/arkade) to install OpenFaaS on Kubernetes

Im going to be developing on my local machine with `k3d` and then deploying my application on the [Civo managed Kubernetes](https://www.civo.com/kube100)
platform. I'm part of the beta testing community for this, so I get some included resources. You can use any kubernetes 
cluster you want, provided it's not too out of date! 

I'm using Python, so it might help if you have python 3.7+ installed. This isn't actually a requirement, as we are going to 
be running our code in containers. If you dont have python installed you won't be able to run any tests or validate that
things work locally before deploying.

#### Our Application

Im going to build an application that listens for webhooks from Github and forwards important messages onto slack. We 
are going to deploy one service to receive the Github Webhook. This one will grab the content of the message and decide 
what to do with it.

We will then pass the message over to another function that will take any given message and post it into the pre-configured slack channel.

![architecture overview](/images/github-slack.png)

The reason we are going to separate these two bits of functionality is that we could change the destination of the message, say to email, 
without needing to change our Github webhook handler. Additionally, we can scale these two features independently. If we decided later to add
another feature to receive webhooks from Gitlab (for example) we might need to increase the number capacity of the slack message function
without needing to change our Github handler. 

####

