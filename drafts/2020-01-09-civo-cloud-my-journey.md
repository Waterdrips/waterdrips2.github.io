---
layout: post
title: Civo Cloud Kubernetes #KUBE100
description: What I have been up to on Civo Cloud's managed k3s service
date: 09-01-2020
image: civo-card.jpg
image_alt: civo cloud kube100 stickers
---

![civo-sticers](/images/civo-card.jpg)

# The World's First Managed K3s

When Civo Cloud announced they were looking for Beta testers for their new managed Kubernetes offering I obviously jumped
at the chance. Free compute - never turn that down! (Thanks Civo)

# TODO more this section

### What is K3s?

According to Rancher, who took Kubernetes and made it smaller, it's a "Certified Kubernetes distribution built for IoT &
 Edge computing". You can check out the [k3s web page here](https://k3s.io) for more information.
 
What does this actually mean though? Well, its small, really small. The master node process runs in under 500mb ram, and
worker nodes about 50mb. It's packaged for ARM64 and ARMv7 (think Raspberry Pi) and you can easily build installation 
scripts (or tools) that can detect the CPU architecture. This allows you to spin up clusters on anything from your home
raspberry pis to large bare-metal servers.

Its fast. Civo cloud can spin up a k3s cluster for you in under 2 minutes. We will explore more on this later.

Rancher do a better job at explaining all of the features and benefits in the [docs](https://rancher.com/docs/k3s/latest/en/). 
We wont dwell on this much more here, there's a lots of great resources on this already.


### How is k3s different from k8s?

That's a good question. Dont immediately expect that you can deploy your application onto k3s without having to do some 
extra work. If you're coming from a managed kubernetes service provided by one of the large cloud providers you get a 
lot of integrations out of the box.

For example, the first thing I did was to install the [gitlab helm chart](https://docs.gitlab.com/charts/), which sat in 
pending forever. This is because there was no default storage provider for the persistent volumes required by many apps.
Not to worry though, [Civo provide a 1 click Longhorn installation](https://www.civo.com/learn/cloud-native-stateful-storage-for-kubernetes-with-rancher-labs-longhorn) 
which can provide the persistent volumes required. 


# The Civo Community


# Features provided by Civo


# OpenFaaS Cloud

My main use for Civo cloud's k3s is a platform to deploy and develop [OpenFaaS Cloud](https://github.com/openfaas/openfaas-cloud)

OpenFaaS cloud is a self-hosted PaaS for serverless, with built in CI&CD, dashboards and Git Flow. 
Here are the main Features:

* Portable - self-host or use the hosted Community Cluster (SaaS)
* Multi-user - use your GitHub/GitLab identity to log into your personal dashboard
* Automates CI/CD triggered by git push (also known as GitOps)
* Onboard new git repos with a single click by adding the GitHub App or a repository tag in GitLab
* Immediate feedback on your personal dashboard and through GitHub Checks or GitLab Statuses
* Sub-domain per user or organization with HTTPS
* Runtime-logs for your functions
* Fast, non-root image builds using buildkit from Docker

I have been contributing to OpenFaaS Cloud and needed a place to run, test and develop my new features. I used Civo 
Cloud's service to deploy my changes when I implemented runtime logs in OpenFaaS Cloud, you can see them here

![Runtime logs](/images/runtime-logs.jpg)


# I have contributed to their App installers

Their kubernetes app installers are open source. When someone on slack noticed that the postgres app wasn't working 
I pulled down the [github repository](https://github.com/civo/kubernetes-marketplace) that contains the apps and 
committed a fix. This was swiftly merged and released to production, where several other people created clusters and 
verified that the app worked.

![Civo PR](/images/civo-pr.png)


# That bug [Andy](https://twitter.com/andyjeffries) fixed while at Kubecon

 
# Where I'd like to see them go

#### People

#### Community

#### Content

# Other cool k3s projects and tooling

(k3sup)
(k3d)
