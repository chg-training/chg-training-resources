---
sidebar_position: 10
---

# What to make of a COVID test

Let's apply Bayes formula to this question:

:::tip Problem

Suppose you test +ve for COVID using a lateral flow test.  How convinced should you be that you are infected?

:::

Like **many scientific** problems, this one can be solved by applying [Bayes' formula](./bayes.md).  Let's try now:

$$

P\left(\text{infected}|{\text{+ve test result}}\right) = \frac{P\left(\text{+ve test result}|\text{infected}\right) \cdot \text{prior}(\text{infected})}{\text{denominator}}

$$

But how can we generate those numbers?

Luckily there are huge datasets in which to estimate the quantities!  For example this [review of COVID-19 lateral flow test accuracy](https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013705.pub2/full).

It reports results as:

- "Sensitivity" i.e. $P(\text{+ve test result}|\text{infected})$ as 72% for symptomatic and 58% for asymptomatic patients
- "Specificity" i.e. $P(\text{-ve test result}|\text{not infected})$ as between 99.6% and 99.9%.

:::tip Note

There are also other estimates, such as [this study in Welsh care homes](https://pmc.ncbi.nlm.nih.gov/articles/PMC10446167/#:~:text=Using%20this%20data%2C%20overall%20sensitivity,%25CI%2099.89%2C%2099.93), or [this study](https://pubmed.ncbi.nlm.nih.gov/34242764/#:~:text=The%20overall%20sensitivity%20of%20the,%25%20CI%2099.5%2D100.0).  They suggest higher specificity more like 99.9%.  (Maybe you can find other estimates too?)

:::

Population COVID rates aren't still being reported so let's use numbers from 2023.

For example for Oxfordshire, UK the [numbers in September 2023](https://www.oxfordshire.gov.uk/council/coronavirus-covid-19/latest-figures) were around a maximum of:

* 21.8 cases per 100,000 people in under-59s
* or 57.5 cases per 100,000 in the over-60s

Given the lack of systematic testing at the time, you could reasonably assume these must be underestimated.  To be
conservative, you might want to err on the side of caution - so let's imagine the true rate to be substantially larger
than this - say at least 100 in 100,000.

**Can you use Bayes' theorem to answer the question? **

:::tip Note

Remember we can compute the denominator by **summing over the possibilities in the numerator**.
Here the possibilities are 'is infected' or 'isn't infected'.  So the denominator is:
$$

\text{denominator}
= P\left( \text{+ve}|\text{infected}\right) \cdot P\left(\text{infected} \right)
+ P\left( \text{+ve}|\text{not infected}\right)\cdot P\left(\text{not infected} \right)

$$