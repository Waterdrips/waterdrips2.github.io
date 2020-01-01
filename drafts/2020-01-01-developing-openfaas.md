---
layout: post
title: How To Get Started Contributing to OpenFaaS
excerpt: Sometimes it can be hard to get yourself setup to contribute to OpenSource. Especially if it requires running Kubernetes, Installing new programming languages and learning what maintainers expect.
date: 01-01-2020
---

![OpenFaaS Cloud Dashboard](/images/ofc-dashboard.png)

# New Year New You?
Don't bother with the Gym. We all know you won't keep it up. 

Why not give back to the programming community by contributing to an open source project that you use?

When I first started out it took me a while to get my IDE setup, all the dependencies installed and then once
I had this set up, picking a github issue and getting through the Pull Request (PR) process also seemed daunting. This 
still felt like a big deal even though I raise many PRs a day at work and push code into production frequently.
For some reason this "open" and new space felt very exposed.

Fortunately, I was helped through the process by [Alex](https://github.com/alexellis), who was always helpful and 
patient with my early contributions.

This post focuses mainly on code contributions. There are other types of contributions that are just as important and 
would be welcomed. Things like documentation, user guides, blog posts and helping members of the community on slack.

#### A word of warning

One thing to remember when contributing to an Open Source project is that the maintainers of the project have to
maintain your code long after your initial contribution, so its always worth checking that 
your proposed contribution is something that will benefit the project, rather than something only you will use.

The burden of maintaining these hundreds (or thousands) of contributions lies with the team (or person) because
initially there is no expectation that you will hang around after your PR is merged.

So, it's always worth picking an issue that already exists in the repository, or raising an issue for discussion, before
you get stuck into your work. If you do this, and talk to the maintainers then I'm sure they will guide you in the right
direction for a contribution with a positive impact.


# Setting up Golang

OpenFaaS is almost exclusively written in Golang. If you're not a strong Golang developer don't worry, it's quite easy to 
pick up. However, there are other contributions you could make to get started, then ease yourself into Golang at a later
date.

I like using the Goland IDE by JetBrains, but you can use VSCode or any other IDE that has Golang support, or even Vim/Emacs.

### To install Golang

This should inslall Golang 1.12 on a Macosx or Linux distribution. There's a [good section here](https://github.com/alexellis/faas-containerd#install-go-112-x86_64)
on installing Golang on other CPU Architectures. 


```sh
curl -SLsf https://dl.google.com/go/go1.12.14.linux-amd64.tar.gz > go.tgz
sudo rm -rf /usr/local/go/
sudo mkdir -p /usr/local/go/
sudo tar -xvf go.tgz -C /usr/local/go/ --strip-components=1

export GOPATH=$HOME/go/
export PATH=$PATH:/usr/local/go/bin/

# You can now test the installation with this command:
go version
```

You probably want to add these lines to your .bashrc or .zshrc so that `go` is available in new terminals and after you 
reboot.

```sh
export GOPATH=$HOME/go/
export PATH=$PATH:/usr/local/go/bin/
```

If `go version` outputs correctly then you should have setup Golang correctly.

# Docker & Kubernetes

You will probably will need access to Docker and Kubernetes while writing contributions to OpenFaaS. You can install 
Docker by following one of the many online guides. 

If you are using Kubernetes you will need to isntall `kubectl`. Best check online for the most up to date installation 
method for your Operating System.

I usually use a tool called [k3d](https://github.com/rancher/k3d) for creating Kubernetes environments, it creates a 
single node k3s cluster (Kubernetes compliant) inside a docker container. 

Once you have these tools installed you can create, connect to and delete kubernetes clusters like this

```sh
# Create a cluster
k3d create

# Connect to it
export KUBECONFIG="$(k3d get-kubeconfig --name='k3s-default')"
kunectl get nodes 


# Remove your cluster 
k3d delete
```

> Note: When using a macos I found that I needed to specify a non-default (6443) port with --api-port 6444 

You should now have the tools to deploy an OpenFaaS installation quickly, and reset things when you need a fresh start.

# Finding an issue to work on
The best way to find something to work on is to look through the various OpenFaaS Repositories for issues that have the 
`help wanted` or `good first isse` type labels. 

[This search](https://github.com/openfaas/faas/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) should show 
Issues in the main `openfaas/faas` repository that have the `help wanted` label.

There are loads of other moving parts of OpenFaaS ecosystem and projects maintained by Alex from OpenFaaS that have 
various open issues, some good places to look are:

* [faas-cli](https://github.com/openfaas/faas-cli/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) The OpenFaaS CLI
* [OpenFaaS Cloud](https://github.com/openfaas/openfaas-cloud/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) (OFC) 
* [ofc-bootstrap]() a tool for provisioning OFC Clusters
* [opwnfaas.github.io](https://github.com/openfaas/openfaas.github.io/issues) The OpenFaaS Website
* [k3sup](https://github.com/alexellis/k3sup/issues) A tool by Alex that helps manage kubernetes applications
* [inlets](https://github.com/inlets/inlets) A reverse proxy tool
* [faas-netes](https://github.com/openfaas/faas-netes/issues) The Kubernetes specific components to OpenFaaS

And many, many more...

If in doubt, you can react out in the `#contributing` channel in the [OpenFaaS Slack](https://slack.openfaas.io)

# Forking the repository

To get started contributing you need to create your own copy of the repository you want to contribute to. 

So, login to Github, and find the repository you are looking to contribute to then click the "fork" button.

![Fork a github repository](/images/github-fork.png)

# Opening your PR


