---
sidebar_position: 10
---

# Using simulation software

Population-genetic simulations help connect patterns in genome data to the evolutionary processes that produced them. Simulations let us explore how those patterns can arise and which statistical summaries might help distinguish between competing hypotheses.

Here we’ll explore two powerful approaches to population genetics simulation:
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

We will explore how ancestry-recording allows both forward and backward approaches to be
combined, and how this can enable biobank-scale simulation.

A particular focus be be the tree sequence toolkit ([tskit](https://tskit.dev/)), 
which is easier to use through its Python interface. To help students who are more
familiar with R, we'll develop the concepts jointly in R and Python, and gradually
move to pure Python code as we introduce simulation packages.

We'll get going by revisiting our inheritance-tracking simulation code:
