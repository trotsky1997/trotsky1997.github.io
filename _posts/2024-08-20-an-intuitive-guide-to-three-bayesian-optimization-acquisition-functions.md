---
layout: post
title: "An Intuitive Guide to Three Bayesian Optimization Acquisition Functions"
date: 2024-08-20
categories: [Blog]
tags: [bayesian-optimization, acquisition-functions, machine-learning]
imported_from: old-site
original_title: "通俗理解贝叶斯的三种采集函数"
excerpt: "A plain-language explanation of Knowledge Gradient, Expected Improvement, and Upper Confidence Bound in Bayesian optimization."
---

Bayesian optimization is useful when every evaluation is expensive. Instead of trying every possible option, we build a probabilistic model of the objective function and use an acquisition function to decide what to try next.

This post gives an intuitive explanation of three common acquisition functions:

- Knowledge Gradient (KG)
- Expected Improvement (EI)
- Upper Confidence Bound (UCB)

The goal is not to derive them rigorously, but to make their decision logic feel concrete.

## Knowledge Gradient

### Analogy: Looking for buried treasure

Imagine that you are a treasure hunter searching a large piece of land for buried treasure. Many locations might contain something valuable, but each dig costs time and energy. You want to find treasure efficiently instead of digging randomly or exhaustively.

In this analogy, every possible digging location corresponds to a point where we could evaluate the objective function. The value of the treasure corresponds to the value we want to optimize.

### How Knowledge Gradient works

1. **Map and model.** You start with a partially marked map of possible treasure locations. In Bayesian optimization, this is the probabilistic surrogate model, often a Gaussian process, which uses existing observations to estimate where high-value regions may be.

2. **Choosing where to dig.** Since you cannot dig everywhere, you ask: "If I dig at this location, how much useful knowledge might I gain about where the best treasure is?" This is the core idea of Knowledge Gradient. It values points by how much they are expected to improve future decision-making.

3. **Simulating possible outcomes.** By simulating what might happen if you dig at different locations, you can estimate how much each observation would improve your understanding of the landscape. In Bayesian optimization, this often corresponds to estimating the knowledge gradient with Monte Carlo simulation.

4. **Digging and updating the map.** After choosing the most valuable location to sample, you actually dig there, observe the result, and update your map. The model becomes more accurate, and the next decision becomes better informed.

### Example: Gold exploration

Suppose a mining company wants to find the region with the highest gold concentration. Its budget only allows drilling at a small number of sites. Using Knowledge Gradient, the company can estimate how much each possible drilling site would improve its knowledge of the best gold location.

In this way, every drilling decision is chosen to maximize the expected value of the information gained. Bayesian optimization and Knowledge Gradient help decision-makers navigate complex search spaces under limited budgets.

## Expected Improvement

Expected Improvement, usually abbreviated as EI, is another widely used acquisition function in Bayesian optimization. It balances exploration of uncertain regions with exploitation of regions that already look promising.

### Analogy: Looking for the highest mountain

Imagine that you are an explorer trying to find the highest peak in a mountain range. The range is covered by fog, so you can only explore step by step. You want to find the highest peak efficiently instead of wandering blindly.

1. **Known information.** You have a partial map of mountain heights. This is like the Gaussian process model's prediction of the objective function. The map tells you which areas you have already visited and which areas remain uncertain.

2. **Choosing the next move.** Before moving, you ask: "If I go to this unexplored region, how much higher than my current best peak might I get?" Expected Improvement quantifies exactly this question: the expected amount by which a new point improves over the best value observed so far.

### Formula

Expected Improvement is usually written as:

<div class="math-display">
\[
\mathrm{EI}(x) = \mathbb{E}[\max(f(x) - f(x^+), 0)]
\]
</div>

Here, \(f(x^+)\) is the best function value observed so far, and \(f(x)\) is the predicted function value at candidate point \(x\). Computing EI involves the predictive mean, predictive variance, and the current best value.

### Example: Testing a new product

Imagine a company developing a new beverage. It wants to find the recipe that produces the highest profit, but every market test costs time and money.

Using Expected Improvement, the company can evaluate each untested recipe by how much it is expected to improve over the current best recipe. It then tests recipes that have a strong chance of producing a meaningful improvement.

### Summary

Expected Improvement considers both the probability of achieving a better value and the uncertainty around unknown regions. It helps decision-makers use limited trials efficiently, especially when each experiment is expensive.

## Upper Confidence Bound

Upper Confidence Bound, or UCB, is another popular acquisition function for balancing exploration and exploitation.

### Analogy: Finding the best restaurant

Suppose you have just moved to a new city and want to find the best restaurant. You have many choices, but every meal costs time and money. You want to find excellent restaurants while also exploring enough options to avoid getting stuck with the first few decent ones.

1. **Known information.** You have already tried some restaurants and rated them. These ratings are like observed function values in an optimization problem.

2. **Choosing a strategy.** When deciding where to eat next, you consider both the restaurants with high known scores and the restaurants you have not explored much yet.

### Principle

UCB selects the next point by combining the predicted mean and the uncertainty at that point:

<div class="math-display">
\[
\mathrm{UCB}(x) = \mu(x) + \kappa \sigma(x)
\]
</div>

Here, \(\mu(x)\) is the predicted mean at point \(x\), \(\sigma(x)\) is the predicted standard deviation, and \(\kappa\) is a positive parameter controlling the balance between exploration and exploitation.

A larger \(\kappa\) encourages more exploration because uncertain points receive a larger bonus. A smaller \(\kappa\) makes the method more exploitative, favoring points with high predicted mean.

### Example: Designing scientific experiments

Imagine a research team testing different compounds to find the most effective drug candidate. Every experiment is expensive and time-consuming.

With UCB, the team chooses the next compound by considering not only compounds that already look effective, but also compounds whose effects are still uncertain and may turn out to be highly valuable.

### Summary

UCB makes decisions by naturally combining predicted value and uncertainty. It is especially useful when failure is costly and each experimental step must be chosen carefully. By using UCB, a decision-maker can ensure that each trial considers both known promise and the possibility of discovering something better.

## A compact comparison

KG asks: **Which observation will teach me the most for future decisions?**

EI asks: **Which point is expected to improve over my current best result?**

UCB asks: **Which point has the best optimistic upper estimate after accounting for uncertainty?**

All three acquisition functions are ways of answering the same practical question: when evaluations are expensive, what should we try next?
