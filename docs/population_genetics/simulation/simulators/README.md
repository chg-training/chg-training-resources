---
sidebar_position: 10
---

# Ancestry-based simulators

Why should we care about population-genetic simulation? Well, it can help connect patterns in genome data to the evolutionary processes that produced them. In particular, simulations let us explore how genetic patterns arise, and which statistical summaries might help distinguish between competing hypotheses as to their origin and function.

In other words, different processes can affect the patterns in the genome:
e.g. natural selection, recombination, demography, and so on. It isn't easy to relate
observed patterns among a set of genomes to these biological effects. Simulations
can help you to figure out the consequences of biology on genome data. In these days of
machine learning, simulating realistic genomes under different models can also
help to train AI models.

There are, of course, lots of problems with simulating genomes:
* how simple should we make our model ("all models are wrong, but some are useful")
* what parameters do we use for simulating?
* how can we actually run a realistic simulation? (i.e. is it computationally feasible?)

In this practical we’ll explore how ancestry can be used to unite two powerful approaches to population genetics simulation:
forward-time simulation, like the [simple simulator we built earlier](../genetic_drift/),
and backward-time simulation. Each has different strengths:

<div className="simulation-options">
  <section className="simulation-option">
    <div>
      <h3>Forward-time simulation</h3>
      <p>
        Flexible enough to model natural selection and other complex processes,
        but can be slow / memory-intensive.
      </p>
      <figure className="simulation-option__example">
        <img
          src="https://raw.githubusercontent.com/MesserLab/SLiM/refs/heads/master/QtSLiM/icons/AppIcon64.svg"
          alt=""
        />
        <figcaption>
          Example: <a href="https://messerlab.org/slim/">SLiM</a>, a flexible
          forward-time simulator base on an R-like language.
        </figcaption>
      </figure>
    </div>
  </section>

  <section className="simulation-option">
    <div>
      <h3>Backward-time simulation</h3>
      <p>
        Extremely fast for many population-genetic simulations, though it
        primarily models simple, neutral evolution.
      </p>
      <figure className="simulation-option__example">
        <img
          src="https://tskit.dev/msprime/docs/stable/_static/msprime_logo.svg"
          alt=""
        />
        <figcaption>
          Example: <a href="https://tskit.dev/msprime/docs/">msprime</a>, a
          widely used backward-time simulator with C and Python interfaces.
        </figcaption>
      </figure>
    </div>
  </section>
</div>

A particular focus will be the tree sequence toolkit ([tskit](https://tskit.dev/)),
which is designed for large scale genomics. It is easiest to use via its Python
interface, but to help students who are more familiar with R,
we'll develop the concepts jointly in R and Python, and gradually
move to pure Python code as we introduce _tskit_ and _msprime_.

If you are running this on your personal computer, you'll need to install some python
packages, e.g. via

```
pip install numpy, tskit, msprime, tqdm
```

Let's first revisit how simulations track inheritance:
