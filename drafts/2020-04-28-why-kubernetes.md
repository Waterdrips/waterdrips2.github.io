---
layout: post
title: Why Kubernetes? 
description: Exploring Kubernetes as a platform for system deployment
date: 27-04-2020
image: kubernetes-logo.svg
image_alt: kubernetes Logo
---

I get asked this a lot. My response usually starts with `"Good question. It depends"`

The next thing I need to know is do you mean to discuss why people you kubernetes, why you should move away from your 
current setup or why your team should use kubernetes on a new project? If you want to understand the answer to these 
questions you need to first understand a little about the problems we face when deploying and managing software systems.

----
## The problems we face

Delivering software has never been more complicated. Our customers (the end users of all of our software products) 
demand more than ever before. People have come to expect rock solid, user-friendly services that are both fast and 
always available. Gone ore the days when you can take a website or service offline for several hours of maintenance 
"overnight" as our users are globally distributed, never sleeping and showered with choice. If your site is down, lets 
say it's an ecommerce platform, your users will go and spend their money with your competitors.


You may be blessed with a regionally bound business to business application and can go offline from 1800-0800 and nobody 
notices, but most of us are not in that position. Plus, who wants to do out of hours upgrades and maintenance? Nobody,
that's who. 

I have broken down our problem into a bunch of broad categories, and we will dive a little deeper into each one as we go.

----

### Observability and Metrics

How can we possibly know if your software is working if we don't know if it's working? Yeah, odd question. The first 
problem with delivering an excellent service is knowing if our users are able to use our software in a way that they 
expect to be able to use it. Now, this does not mean that it is totally free from bugs and with the best UX 
on the planet, just is our application running "normally". 

What we need to know here is `Is our service running? If so, is it working based on the input provided?`. That first part 
should be simple to answer. Is our application process running and receiving the expected amount of traffic?

This is, of course, solved with logging and monitoring. All software systems should expose logs and system metrics to 
developers and operators easily, automatically and preferably somewhere outside the system. Just incase everything is on 
fire, literally or metaphorically? 

Kubernetes does not magically solve all of these problems for you. Sorry to burst that bubble. It does have some [decent 
doccumentation](https://kubernetes.io/docs/tasks/debug-application-cluster/) on how you can debug applications, manage 
logs and surface metrics. 

----

### Scalability

For this section I'm going to start with a question. 

> Have you ever seen a sudden and unexpected increase in traffic to your application?

Some of us will have, and those who have not can imagine the scenario. The country goes into lockdown due to a new and 
unexpected virus. The entire country tries to order online food deliveries all at once. Want to guess what the outcome 
is? Yep, nobody can access the website, servers are overloaded, nobody gets their delivery (Yes, I'm glossing over the
fact that there are not enough delivery slots for everyone, but that's not the point).

This is most likely due to the software platform not having enough capacity for the demand. There are 2 ways to fix this, 
and a third option which is to shrug and brush it off as a one off.

###### Option 1
Have more capacity lying in wait for the next time this happens.

Lets spend 3 seconds on the economics of that. Yeh, I agree. All that spare capacity just on the off chance that we get 
5x or 10x our normal demand? That is a lot of money (and CO2, computers use A LOT of energy). 

###### Option 2
We design a platform that can scale up when we see an increase in demand, and back down when that surge dies off. Bonus 
points if this is automatic and the services are ready to work quickly. 


It would be a shame to disappoint your users because the "solution" to scaling was paging an engineer at 3AM to 
provision a new server manually which takes 20 minutes. We really should be able to leverage a platform that can just 
manage this for us so we can get a good nights sleep knowing all of our customers are able to use our service


Kubernetes does not magically solve all of these problems for you. Sorry to burst that bubble. It does have some [decent 
doccumentation](https://kubernetes.io/docs/tutorials/kubernetes-basics/scale/scale-intro/) and
 [blog posts](https://kubernetes.io/blog/2016/07/autoscaling-in-kubernetes/)
disappointed

----


### Networking

Networking is hard. It's always hard. The more networking the harder...
 
Kubernetes adds more networking. If in doubt, it's DNS - Unless it's not. Then its [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) (Thanks Alex!)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><img alt="rbac" src="/images/rbac-issues.png" ></p>&mdash;<a href="https://twitter.com/alexellisuk/status/1253638866562662400?ref_src=twsrc%5Etfw">Alex Ellis (@alexellisuk) April 24, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Kubernetes does not magically solve networking for you. Sorry to burst that bubble. It does have some [decent 
doccumentation](https://kubernetes.io/docs/concepts/cluster-administration/networking/) on how pod networking works in 
Kubernetes.

----

### Deployment & Configuration
Unless you have to(on prem?), or are running kubernetes as a learning excersise then I reccomend using a managed 
// TODO this

----

### Service Availability
What do we mean by this? Well let's define it as `no degredation in service for a user`.

So this has a few strands we can pull at. Zero downtime deployments, application replication, application restarts and
 network configuration.
 
##### Zero Downtime deployments

Kubernetes comes with built-in support for [zero downtime rolling deployments](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/).
This comes as the default option for deployments. It works great! Your network traffic only gets routed to pods that are
ready to accept traffic. You do now need to make sure your updates are backward compatible by at least one version, 
preferably more - you may need to do multiple rollbacks?

This is a real treat when you switch to Kubernetes. You also get this functionality with other deployment platforms like 
AWS's ECS, but you get more control over things here.

##### Application replication & restarts
Kubernetes is great at running multiple sets (or pods) of your application all at once. If one of them fails for some reason,
like loosing network connectivity to a node or node failure, then kubernetes will try to start some new pods to replace 
the ones you lost. No fuss, it just does it.

You can also start to hook into metrics and events to scale your applications based on the current load to give you more
bang for your buck. 

Turns out Kubernetes is quite good here. However, many other container based application platforms give you all of this 
built-in. It's unlikely this is a massive pain point for many people? It could be though? I'm comparing this with AWS ECS 
setups on Fargate or ECS on EC2 with Autoscaling. 

### Stateful services

Kubernetes is fantastic for running stateless services. It can quite happily redistribute your containers onto healthy 
compute nodes when bad things happen (nodes die, networking to nodes is interrupted etc). 

Stateful applications however... This might be more tricky. Kubernetes does support running stateful services, with managment
of their persistent volumes. The api is even v1, so going to be stable and supported. You do have to work harder than 
when managing your stateless applications. 

I'm going to hold my hands up now and say I have never run a stateful service on kubernetes. To be perfectly honest I have
not run a stateful application for years. I have (In my opinion) been very lucky to work on applications and platforms 
where we offloaded the burden of running our stateful services like databases on to our cloud provider. So, where you can, 
pay someone else to manage it, it's just easier. 

So, you can run stateful services. Best read the [docs on StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

----

### Discoverability
Modern applications are built out of lots of small services. These services sometimes need to communicate with other 
services running in your stack.

How do you know where to send this traffic to? You could hard code a set of internal IP Addresses into your applications
. However, we have just discussed automatic scaling of our services so we would need to update these lists or DNS records
every time we deploy a new service. (Ok, there are some off the shelf tools, [concul](https://www.hashicorp.com/blog/consul-announcement/)
for example).

All of these involve writing code, doing things manually or including yet another service into the platform that yo have 
to manage.

Ok, this may shock you. Kubernetes will magically solve this for you. It provides out of the box 
[service discovery](https://kubernetes.io/docs/concepts/services-networking/service/) without any additional software or 
excessive complexity. 

----


## Why people use Kubernetes

----

## Why you might want to migrate to Kubernetes

----

## Why start a new project and use Kubernetes?

----

