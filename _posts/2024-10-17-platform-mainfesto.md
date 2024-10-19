---
layout: post
title: My Platform Manifesto
description: Ramblings of an opinionated technologist on building platforms and engineering organisations
date: 17-10-2024
image: platform-manifesto/headline.webp
headline_img: platform-manifesto/headline.webp
image_alt: AI generated image of a futuristic software platform interface, designed with sleek and modern elements like data charts, colorful graphs, and cloud computing icons.
length: 20
---

# My Platform Manifesto

This seems grandiose, but I've spent time working on building software teams, platforms and companies and wanted to 
share some of my thoughts on what I think makes a good technology strategy from a platform and engineering perspective.

> Note: I got this far into writing this and have disabled copilot. It keeps spewing it's AI generated bland content 
> onto the page.

I will try my best to frame this article around the human aspects of these decisions. I have worked in organisations 
that have used the following concepts to varying levels of success and wanted to bring as many of those experiences 
of how the decisions impact people and their working life.

I intend the following short(ish) article to he a set of signposts to in-depth articles on each of the topics 
exploring the history, pitfalls and model implementations of each concept.

## Caveat

Like everything, building companies and technology products is a constant game of compromises. Given limited time or 
resources you should ALWAYS prioritise shipping production software over technology for the sake of it. However, as 
we will discover there's a horrible swamp of technical debt bogging down even relatively young startups which ends 
up killing productivity and the competitive advantage of moving fast.

## Living with consequences

I'm sure many of you will have heard the saying `move fast and break things` in your technology careers. It's 
usually used to imply that the best way to get to market is to move as fast as possible without worrying about quality.

I can see where people are coming from as speed matters. A bias for getting things done or `Bias for Action` is 
important. It doesn't matter if you have the most elegant code, platform or product if you took so long making it 
that the customer no longer needs your product or your competitors have out-paced you. Speed Matters.

Amazon have a leadership principal called "Bias for Action"

> Speed matters in business. Many decisions and actions are reversible and do not need extensive study. 

This is a nuanced take on `Move fast and break things`. It calls out how important getting things done is whilst 
clarifying that this approach should be taken when the decisions or actions are reversible. 

### When to Go Slow to go Fast

As we have discussed actions have consequences. Sometimes those consequences are existential to the survival of a 
business. Usually they are not. 

## Organisation design

You may have heard the `A players are free` used in making hiring decisions. I don't know who to attribute this 
saying to (please let me know if you know where it originated). 

If somebody doesn't get the importance of the principals outlined from now on then you may need to question if they 
belong in an organisation that subscribes to the ethos and mentality that this article outlines. They may be a 
fantastic engineer who can solve the hardest of technical challenges using software but if they can't see that 
software is built, moulded, maintained and obsoleted by people. 

You have probably heard about [Conway's law](https://en.wikipedia.org/wiki/Conway's_law)

> Organizations which design systems (in the broad sense used here) are constrained to produce designs which are 
> copies of the communication structures of these organizations.
>
> — Melvin E. Conway, How Do Committees Invent?

Be deliberate in your organisation design, culture and communications. It matters!

// TODO discuss the relationship between team structure
// Complex organisations develop complex software

// There's no place for heroes 

## Psychological Safety and autonomy

There is little worse than working on a team with low levels of psychological safety. 

// Sharing ideas
// Learn to fail or fail to learn
// 

## Developer Onboarding

Those of us that are fortunate enough to have had jobs in the industry will all have gone through an onboarding 
process at some point. Once the HR stuff is out of the way yo are handed a computer and told to get cracking.

My worse experience so far has been a multi-day battle with installing, configuring, and accessing various 
portals 
all driven from a woefully out of date confluence documentation that hasn't been touched since the last person was 
onboarded. 

My best? I was committing into production within 2 hours as there was a suite of tooling to automate setup, an 
extremely high level of confidence in their testing, monitoring and rollback strategy and an ethos of rappid 
experimentation.

Engineer your developer onboarding to be fast and lightweight. Build internal tooling, don't rely on the developer 
laptop having anything but docker installed and make sure your teams deploy to production many times a day. Tie 
access to SSO and configure everything with a home-built CLI?

## Everything as code (or software)

Take "we use terraform" to the extreme. Configure your users emails with Terraform (from now on I will always use 
Terraform as your go-to Infrastructure as Code tooling, replace this with your tool of choice). Configure your 
Github/Gitlab teams, repositories and policies with code. 

Configure your own product with terraform. Write your own terraform provider to onboard your customers (Unless your 
app is self-service, which is even better)


## KISS

## Incident Management

## Test Test Test

## Testing in Production

## Shared Ownership


## Security is a force multiplier

## Backup, recover, repeat

## The rise and fall of Cloud
// Cloud --> Cloud native --> Cloud agnostic
First there came cloud. Then there came cloud bills.

## Hardware && Platformware && Software

## Abstractions

## Zero trust && Least privilege 
This one covers both people and machines. Trust nobody. Work under the assumption that you already have attackers in 
your network. 

I have seen vault policies that allow anyone coming from the VPN access to Admin AWS credentials. This is bad. Don't 
be this company.

## Push vs Pull models for deployment

## Terraform model vs Kubernetes model
