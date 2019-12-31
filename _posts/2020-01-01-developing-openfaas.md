---
layout: post
title: How To Get Started Contributing to OpenFaaS
excerpt: Sometimes it can be hard to get yourself setup to contribute to OpenSource. Especially if it requires running Kubernetes, Installing new programming languages and learning what maintainers expect.
date: 01-01-2020
---

![OpenFaaS Cloud Dashboard](/images/ofc-dashboard.png)

# New Year New You?
Dont bother with the Gym. We all know you won't keep it up. 

Why not give back to the programming community by contributing to an open source project that you use?

When I first started out it took me a while to get my IDE setup, all the dependencies installed and then once
I had this setup picking a github issue and getting through the Pull Request (PR) process also seemed daunting. This 
still felt like a big deal even though I raise many PRs a day at work and push code into production frequently.
For some reason this "open" and new space felt very exposed.

Fortunately, I was helped through the process by [Alex](https://github.com/alexellis), who was always helpful and 
patent with my early contributions.


#### A word of warning

One thing to remember though when contributing to an Open Source project is that the maintainers of the project have to
consider the burden of maintaining your code long after your initial contribution, so its always worth checking that 
your proposed contribution is something that will benefit the project, rather than just something you will want.

The burden of maintaining these hundreds (or thousands) of contributions lies with the core people (or person) because
initially there is no expectation that you will hang around after your PR is merged, or hang around in the long term.

So, it's always worth picking an issue that already exists in the repository, or raising an issue for discussion, before
you get stuck into your work. If you do this, and talk to the maintainers then I'm sure they will guide you in the right
direction for a contribution with a positive impact.


# Setting up Golang

OpenFaaS is almost exclusively written in Golang. If your not a strong Golang developer don't worry, it's quite easy to 
pick up. However, there are other contributions you could make to get started, then ease yourself into Golang at a later
date.

I like using the Goland IDE by JetBrains, but you can use VSCode or any other IDE that has Golang support,or even Vim/Emacs.

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

