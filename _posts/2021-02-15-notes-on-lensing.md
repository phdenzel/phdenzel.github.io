---
layout: post
body: blog
type: post
tab_title: 008 | Blog | Dreamworld
title: "Some notes on gravitational lensing"
date: 2021-02-15 00:04:00 GMT+1
thumbnail: /assets/blog-assets/008-notes-on-lensing/images/thumb.png
number: 8
---

I've recently submitted the final version of my doctoral thesis to the Turicensia archive of the Zentralbibliothek Zurich. I still have a lot of information in my head about gravitational lensing which wants to get out. So, this post acts as a release to me and an informational blurp to you.
I discuss the basics of gravitational lensing in a historical context, supported with a few mathematical excursions.


<!--more-->

#### Prelude

Newton and his contemporaries already played with the thought that light could theoretically be treated as particle-like and thereby be deflected by a gravitational field, since the gravitational acceleration is independent of the mass of a test particle, i.e. \\(a = F/m\\\).

In 1804, Johann von Soldner even estimated the deflection to be of the order of 

\begin{equation}
 \hat{\alpha}_{N} = \frac{2M}{b},
\label{eq:deflection_Newton}
\end{equation}


where \\(b\\\) is the impact parameter and \\(M\\) the mass sourcing the gravitational potential.

And even before that, Pierre-Simon Laplace noted in 1795 "that the gravitational force of a heavenly body could be so large, that light could not flow out of it", effectively taking the limit of the escape velocity \\(v_{esc}=\sqrt{2M/R}\\) to \\(1\\) (or \\(c\\) if you're using units), deriving the nowadays called Schwarzschild radius \\(R_{s}=2M\\).
By the way, we always assume Planck units with \\(c=G=k_{B}=1\\).

All these considerations were derived under the assumption that light can be considered a massive test particle, long before the concepts of photons and wave-particle dualism were introduced.


#### Enter Einstein

It turns out, only after Einstein formulated his grand theory of General Relativity in 1915, it was possible to accurately descibe the deflection of light due to a gravitational potential.
In fact, Einstein recalculated the deflection angle analoguously to von Soldner and found the formula for the deflection angle to be

\begin{equation}
 \hat{\alpha} = \frac{4M}{b} \approx 1.75'' \times \left(\frac{M}{M_\odot}\right) \, \left(\frac{R_\odot}{b}\right).
\end{equation}

Being one of the very few mathematically adept astronomers able to understand Einstein's theory of General Relativity, Sir Arthur Stanley Eddington became the chief supporter and advocate of General Relativity in the British Royal Astronomical Society.
He went so far as to organize two expeditions to Sobral in Brazil and the small island of Principe off the west coast of Africa to observe the Solar eclipse, meant as a first test of General Relativity.
During the eclipse, his team took pictures of constellations close to the region around the Sun.
When they compared their pictures with pictures of the same constellations away from the Sun, they found a slight shift within the constellations, which could only mean that the Sun acted as a deflector for the light from these constellations.
This effect was of course only detectable during a Solar eclipse, because at any other time the Sun's brightness would obscure any affected/deflected star light.
Although their observations were very-poor in quality and one of the observations seemed to be closer to the Newtonian value for the deflection angle than to the one predicted to GR, it confirmed what they expected to see and provided the first real confirmation of GR.

Soon after, Lodge (1919) was the first to use the term 'lens' in the context of gravitational light deflection due to stars.
Chwolson (1924) thought of different scenarios causing different lensing patters, one of them being the case of a spherically symmetric potential in perfect alignment with the background source giving rise to an image as a ring.
And yet again, it seems like Einstein thought of it first! In some unpublished notes from 1912 he predicts a ring could theoretically arise, if background object and lens are aligned.
Today, those images are therefore appropriately called "Einstein rings".

If the alignment is not perfect, two images of the background source would be visible, one on either side of the lensing star.
However, after being approached by a Czech engineer Rudi Mandl, Einstein wrote a paper where he considered this lensing effect due to a star, and concluded that the angular separation between the two images would be too small to be observable.
(Einstein 1936: "Of course, there is no hope of observing this phenomenon.")


#### Enter Zwicky

The Swiss astrophysicist Fritz Zwicky didn't share Einsteins pessimistic view, and instead pointed out that in order to observe this effect one should look at "extragalactic nebulae" (things we call galaxies nowadays) instead of stars.
With rough estimates on these extragalactic nebulae masses, he estimated an average image separation of \\(10 \mathrm{arcsec}\\), which is an order of magnitude too high, but still a very impressive and visionary predicition.
Moreover, he also noted that an observation of multiple images would furnish an additional test of GR, allow one to see sources at larger distances (due to the magnification effect), and measurements of the deflection angle would determine the masses of the lenses.
He even went on to estimate the probability that a distant source would be lensed to produce multiple images, and concluded that 1 out of 400 distant sources should be noticeably affected by lensing.
All these predictions, were only much later confirmed to be spot on. At the time however, Zwicky was ridiculed by his colleagues at Caltech for his ideas;
one colleague even told him, if all that would turn out to be true and a lens such like that would be observed, he'd eat a hat (this particular dietary adjustment was never adopted at Caltech according to their records though, so I guess he didn't follow through with his wager).


#### After the dark ages we can see the light

For almost 30 years the topic gravitational lensing rested, until two authors reopened the field and set milestones in lensing research: Liebes (1963), and Refsdal (1964).
Liebes wrote on the possibility that stars in the Milky Way can act as lenses for stars in M31, which was the first introduction into the field of Micro Lensing.
Refsdal effectively put lensing into a cosmological context by calculating time delays - differences in travel time a light ray has to take due to the deflection by a gravitational field - for variable light sources (such as SNe).
He pointed out that time delays depend on the mass of the lens and the distances to lens and source, which allows for a determination of the Hubble constant.

It took another 15 years until the first lens system was discovered.
Walsh et al. in 1979 first observed a pair of quasars with same color, spectrum, and redshift, separated by \\(\sim 6 \mathrm{arcsec}\\).
(Quote Walsh et al. 1979: "Difficulties arise in describing them as two distinct objects and the possibility that they are two images of the same object formed by a gravitational lens is discussed.")
For astronomy in general, 1979 was a very important year.
It was then that CCD detectors made their way into professional telescopes, improving their sensitivity, dynamic range and linearity.
It is also the year when the VLA (Very Large Array), a radio interferometer with sub-arcsecond resolution went operational.
The VLA reinvestigated this quasar system QSO0957+561, and soon after a galaxy inbetween the quasar images with a redshift of 0.31 was detected, leaving little doubt about the lensing nature of this system.

Until 1990 a few other lens systems were found.
In 1988 for example, PG1115+080 the first quasar lens system to form an Einstein ring was discovered.


### The lensing basics


#### From Schwarzschild metric to deflection angle

Let's consider a very distant source sending out light on different radial trajectories.
We can expect the light rays to be travelling undisturbed on a Minkowskian metric.
However, if one of these trajetories would pass a gravitational potential, the light rays wouldn't travel on a Minkowskian metric, but a metric that includes the perturbation of the gravitational field.
We assume here, a static spherically symmetric gravitational potential from mass \\(M\\), which means the metric can be described by Schwarzschild's metric

\begin{equation}
  ds^{2} = A(r) c^2dt^{2} - B(r)dr^{2} - r^{2} d\theta^{2} - r^{2}\sin{\theta}^{2}d\phi^{2}
\end{equation}

where

$$
\begin{align}
  A(r) &= \left( 1 - \frac{2M}{r} \right) \\
  B(r) &= \left( 1 - \frac{2M}{r} \right)^{-1}
\end{align}
$$

So the scenario we want to investigate is the following: the light comes from far away, passes through the gravitational field of the lens, gets thereby deflected, and travels far away again until it is detected by an observer.
At infinity (or negative infinity), we have \\(A(r)=B(r)=1\\), and thus the Schwarzschild metric becomes Minkowskian.

![img](/assets/blog-assets/008-notes-on-lensing/images/lensing_schematics.png "Schematics of the deflection on a Schwarzschild geodesic")

If we want to figure out how light rays are precisely deflected, we can't think of light being forced by the gravitational potential.
We rather have to think of light always taking straight lines, but those lines happen to be straight in curved spacetime.
This means, to find that straight line we have to minimize the action on the Schwarzschild metric with respect to the curve parameter \\(\lambda\\).
What we recover is the geodesic equation

\begin{equation}
  \frac{d^{2}x^{\mu}}{d\lambda^{2}} + \Gamma^{\mu}_{\,\nu\rho} \frac{dx^{\nu}}{d\lambda} \frac{dx^{\rho}}{d\lambda}
\end{equation}

where \\(x=(t, r, \theta, \phi)\\) is the coordinate four-vector and \\(\Gamma^{\mu}_{\,\nu\rho}\\) the Christoffel symbols.
We choose the trajectory here such that it travels on the \\(\theta=\pi/2\\) equatorial plane.
Of course, the deflection of a light ray can be generalized to have \\(\theta\\) as a dynamical variable, but the final results will not be changed by choosing \\(\theta\\) (remember we're considering a spherically symmetric mass distribution or point mass).
Solving the geodesic equation for constants of motion, we recover the angular momentum \\(J\\) and energy per unit mass \\(E\\)

$$
\begin{align}
  r^{2}\frac{d\phi}{d\lambda} &= \enspace J\,(\text{constant}) \\
  B(r) \left(\frac{dr}{d\lambda}\right)^{2} + \frac{J^{2}}{r^{2}} - \frac{1}{A(r)} &= -E\,(\text{constant})
\end{align}
$$

In the weak field approximation those equations are the same as would hold in Newton's theory.
In this scenario, we are not really as interested in the quantities' temporal history as we are in the shape of the light ray's orbits, i.e. we are looking for \\(r(\phi)\\) or \\(\phi(r)\\).
With both equation above, we can eliminate \\(\lambda\\) which yields

\begin{equation}
  \frac{B(r)}{r^{4}} \left(\frac{dr}{d\phi}\right)^{2} + \frac{1}{r^{2}} - \frac{1}{J^{2}A(r)} = -\frac{E}{J^{2}}
\end{equation}

Integration of this differential equation yields \\(\phi(r)\\) as a function of \\(r\\)

\begin{equation}
  \phi(r) = \phi_{\infty} \pm \int_{r}^{\infty} \frac{\sqrt{B(r)}dr}{r^{2}\left( \frac{1}{J^{2}A(r)} - \frac{E}{J^{2}} - \frac{1}{r^{2}} \right)^{1/2}}
\end{equation}

For light \\(E=0\\) and \\(J\\) can be expressed in terms in \\(R_{0}\\), that is \\(J = \sqrt{R_{0}/A(R_{0})}\\).
The total change in \\(\phi\\) as \\(r\\) decreases from infinity to a minimum value \\(R_{0}\\) and then increases again to infinity is twice its change from \\(\infty\\) to \\(r\\).
If the trajectory were just a straight line, this change would be simply \\(\pi\\).
In lensing we are more interested in the *deflection* from that straight line \\(\alpha = 2|\phi(R_{0}) - \phi_{\infty}| - \pi\\).

$$
\begin{equation}
  \hat{\alpha} = 2\cdot \int^{R_{0}}_{\infty} \frac{\sqrt{B(r)}dr}{r\sqrt{\left(\frac{r}{R_{0}}\right)^{2} \left(\frac{A(R_{0})}{A(r)}\right) - 1}} - \pi
\end{equation}
$$

Using \\(A(r)\\) and \\(B(r)\\) from the Schwarzschild metric, gives elliptic integrals which could be simply solved numerically.
However, since we want an (easy) analytic expression for the deflection angle, we have to approximate with a Taylor expansion

$$
\begin{align}
  \left(\frac{r}{R_{0}}\right)^{2} \left(\frac{A(R_{0})}{A(r)}\right) - 1 &\simeq \left(\frac{r}{R_{0}}\right)^{2} \left[ 1 + 2M\left(\frac{1}{r}-\frac{1}{R_{0}}\right) \right] - 1 \nonumber \\
  &= \left[ \left(\frac{r}{R_{0}}\right)^{2} - 1 \right] \left[ 1 - \frac{2Mr}{R_{0}(r+R_{0})} \right]
\end{align}
$$

The deflection angle finally becomes an solvable integral

$$
\begin{align}
  \hat{\alpha} &= 2 \cdot \int^{R_{0}}_{\infty} \frac{ dr }{ r \sqrt{\left(\frac{r}{R_{0}}\right)^{2}  - 1} } \left[ 1 + \frac{M}{r} + \frac{Mr}{R_{0}(r+R_{0})} \right] - \pi \nonumber \\
  &= \left[ 2 \cdot \sin^{-1}{\left(\frac{R_{0}}{r}\right)} + \frac{2M}{R_{0}} \left( 1 + 1 - \sqrt{1-\left(\frac{R_{0}}{r}\right)^{2}} - \sqrt{\frac{r-R_{0}}{r+R_{0}}} \right) \right]^{R_{0}}_{\infty} - \pi \nonumber \\
  &= 2 \cdot \frac{\pi}{2} + \frac{4M}{R_{0}} - \pi \nonumber \\
  &= \frac{4M}{R_{0}} \sim \frac{4M}{b}
\label{eq:deflection_Schwarzschild}
\end{align}
$$

To this order, the minimal distance to the trajectory can be approximated with the impact parameter \\(b\\) (even though it is indeed a bit smaller), and we recover twice the angle we would with semi-classical arguments (see \ref{eq:deflection_Newton}).

But remember&#x2026; this result is only valid for the deflection of a light ray by the exterior of a spherically symmetric mass M.
That means the impact parameter \\(b\\) and minimal distance \\(R_{0}\\) are much larger than the Schwarzschild radius \\(b>>2M\\), or in other words the deflection angle is small \\(a<< 1\\).
This also implies that the Newtonian gravitational field strength is small \\(\Phi_{N} << 1\\).


#### Beyond point masses

The field equations of General Relativity can be linearized if the gravitational field is weak.
Then, the deflection angle of a three-dimensional density distribution (opposed to a point mass \\(M\\)) can be described by the vectorial sum of the deflections of the individual mass components \\(\mathrm{d}m = \rho(\mathbf{r}) \mathrm{d}V\\).
If the deflection angle is small, we can also assume that the trajectory can be approximated by straight lines; this is commonly referred to as the *Born approximation*.
Lens mass distributions for which this condition is satisfied are called *thin lenses*.

Let's choose the coordinates such that the spatial trajectory lies on \\((b_{1}(\lambda), b_{2}(\lambda), l_{3}(\lambda))\\), where the incident light ray propagates along \\(l_{3}\\).
Note that the impact parameter vector \\(\mathbf{b} - \mathbf{b'}\\) relative to the mass element \\(\mathrm{d}m\\) at \\( \mathbf{r'} = (b_{1}', b_{2}', l_{3}')\\) is independent of \\(l_{3}\\).
The differential deflection angle is then a function dependent on the two-dimensional impact parameter

\begin{equation}
  \mathrm{d}\hat{\pmb{\alpha}} = \frac{4\mathrm{d}m(\mathbf{r'})}{|\mathbf{b}-\mathbf{b'}|}
\end{equation}

Additionally, with the *thin lens* approximation we can assume that the lens can be treated as an infinitely thin mass distribution (surface mass density), a *mass sheet*, perpendicular to the line-of-sight \\(\Sigma(b) = \int \rho(b_{1}, b_{2}, l_{3}) \mathrm{d}l_{3}\\).
To get the total deflection angle we integrate over the whole volume \\(\mathrm{d}V=\mathrm{d}b_{1}\mathrm{d}b_{2}\mathrm{d}l_{3}\\), and we have to do so over the vectorial form of the deflection angle, to take into account that mass elements on opposite sites of the trajectory might cancel out their contributions.

$$
\begin{align}
  \hat{\pmb{\alpha}}(\mathbf{b}) &= \int \frac{4\mathrm{d}m(\mathbf{r'})}{|\mathbf{b}-\mathbf{b'}|} \nonumber \\
  &= 4 \iiint \rho(\mathbf{r'}) \frac{(\mathbf{b}-\mathbf{b'})}{|\mathbf{b}-\mathbf{b'}|^{2}} \mathrm{d}b_{1}'\mathrm{d}b_{2}'\mathrm{d}l_{3}' \nonumber \\
  &= 4 \iint \Sigma(\mathbf{b'}) \frac{(\mathbf{b}-\mathbf{b'})}{|\mathbf{b}-\mathbf{b'}|^{2}}\mathrm{d}^{2}b'
\end{align}
$$

If the lensing surface mass distribution is axially symmetric, the second component of the deflection angle becomes null,

$$
\begin{align}
  \hat{\pmb{\alpha}}(\mathbf{b}) &= 4 \int_{0}^{\infty} \mathrm{d}b' b' \Sigma(b')  \int_{0}^{2\pi} \mathrm{d}\theta \frac{1}{b^{2}+b'^{2}-2bb'\cos{\theta}} \begin{pmatrix}b - b'\cos{\theta} \\ -b'\sin{\theta} \end{pmatrix} \nonumber \\
  &= 4 \int_{0}^{\infty} \mathrm{d}b' b' \Sigma(b')  \cdot \left[\frac{2\tan^{-1}{\left(\frac{-(b-b')\cot{\left(\frac{\theta}{2}\right)}}{b+b'}\right)} + \theta}{2b} \right]_{0}^{2\pi} \hat{\mathbf{e}}_{1} \nonumber \\
  &= 4 \int_{0}^{\infty} \mathrm{d}b' b' \Sigma(b')  \cdot \left[ \frac{\frac{\pi}{2}+\pi}{b}-\frac{-\frac{\pi}{2}}{b} \right] \hat{\mathbf{e}}_{1} \nonumber \\
  &= \frac{4}{b} 2\pi \int_{0}^{\infty} \mathrm{d}b' b' \Sigma(b') \hat{\mathbf{e}}_{1} \nonumber \\
  &\equiv \frac{4M(< b)}{b} \hat{\mathbf{e}}_{1}
\end{align}
$$

and therefore it can be reduced to 1D. We yield a scalar deflection

\begin{equation}
  \hat{\alpha}(b) = \frac{4M(< b)}{b}
\label{eq:deflection_spherical}
\end{equation}

This looks almost like \eqref{eq:deflection_Schwarzschild}, however here we determine the deflection by the mass enclosed by a circle of radius \\(b\\).


#### The lens equation

The typical lensing situation is sketched in the following image.
We have a source (at redshift \\(z_{S}\\) or distance \\(D_{S}\\)) behind a lens (at redshift \\(z_{L}\\) or distance \\(D_{L}\\)) sending out light which is deflected by the lens, redirecting it to an observer.
Thus, for the observer the source appears to be coming from another direction extending straight from the deflected light ray.

![img](/assets/blog-assets/008-notes-on-lensing/images/lensing_schematics_2.png "Schematics of the first order lensing effect")

The lens equation is actually pretty simple and easily recognized in a standard lensing schematic, since it's only a (vector) addition of angles arising from pure geometry

\begin{equation}
  \pmb{\beta} = \pmb{\theta} - \pmb{\alpha}
\label{eq:lens_eq}
\end{equation}

One can also read off another geometric equality, assuming again the angles are small such that \\(\sin{\alpha} \approx \alpha\\) and \\(\sin{\hat{\alpha}} \approx \hat{\alpha}\\)

\begin{equation}
  D_{LS} \cdot \hat{\pmb{\alpha}} = D_{S} \cdot \pmb{\alpha}
  \label{eq:source_shift}
\end{equation}
\begin{equation}
  \mathbf{b} = D_{L} \cdot \pmb{\theta} 
  \label{eq:impact_theta}
\end{equation}

Note that the equations above describe separations as a product of angles and distances.
This is true for small angles in flat space, but is also how we define angular diameter distances in cosmology, so they hold in a more general context (as long as \\(D_{LS}\\), \\(D_{L}\\), and \\(D_{S}\\) are angular diameter distances).
Also note that in general \\(D_{LS}\neq D_{S}-D_{L}\\).
Substituting \eqref{eq:deflection_spherical}, \eqref{eq:source_shift}, and \eqref{eq:impact_theta} into \eqref{eq:lens_eq} gives

$$
\begin{align}
  \pmb{\beta} &= \pmb{\theta} - \frac{D_{LS}}{D_{S}} \hat{\pmb{\alpha}}(D_{L}\theta) \nonumber \\
  &= \pmb{\theta} - \frac{D_{LS}}{D_{L}D_{S}} \frac{4M(< D_{L}\theta)}{\left|\pmb{\theta}\right|^{2}}\pmb{\theta}
\end{align}
$$

The interpretation of the lens equation is straightforward.
We have a source at true angular position \\(\beta\\) behind the lens, but see it at \\(\theta\\).
All the physically interesting stuff happens in \\(\alpha\\), which depends on the lensing mass and \\(\theta\\).
Only if we find \\(\alpha\\) and correct \\(\theta\\) with it, we know where the source originally was.

The lens equation \ref{eq:lens_eq} is a mapping \\(\pmb{\theta} \rightarrow \pmb{\beta}\\) from the lens plane to the source plane.
For any mass distribution \\(\Sigma(\pmb{\theta})\\) this mapping can in principle be calculated.
In lensing theory the problem is the inversion of the lens equation, that is to find all the image positions given a true source position.
In general, the mapping \\(\pmb{\theta} \rightarrow \pmb{\beta}\\) is non-linear, which means a numerical inversion is non-trivial.


#### Rings? How?

So&#x2026; now we know what the lens equation means, but how can a single source produce multiple images or even a ring?
Let's look at the special (simple) case in which the source is at \\(\beta=0\\), lensed by a spherically symmetric mass distribution:

$$
\begin{align}
  0 &= \theta - \frac{D_{LS}}{D_{L}D_{S}} \frac{4M(< D_{L}\theta)}{\theta} \\
  \Rightarrow\quad \theta_{\text{E}} &= \sqrt{\frac{4M(< D_{L}\theta_{\text{E}})D_{LS}}{D_{L}D_{S}}} \nonumber
\end{align}
$$

The solution \\(\theta_{\text{E}}\\) is called *Einstein radius*.
Due to rotational invariance of the lensing system along the line of sight, a source which lies exactly on the optical axis, is imaged at the Einstein radius as a ring, the infamous *Einstein ring*.


#### Multiple images? How?

With simple lens models the full lens equation (\\(\beta \neq 0\\)) can also be analytically solved.
Let's consider a source a bit offset from the optical axis and an extended axially symmetric lens.
The lens equation (\ref{eq:lens_eq}) can then be written as

\begin{equation}
  \pmb{\beta} = \pmb{\theta} - \theta_{\text{E}}^{2} \frac{\pmb{\theta}}{\left|\pmb{\theta}\right|^{2}}  
\end{equation}

The symmetry of the lensing system forces the lens, source, and its images to lie on the same line.
Thus, we can write the equation in its scalar form and solve for \\(\theta\\)

$$
\begin{align}
  \theta_{\pm} &= \frac{1}{2}\left(\beta \pm \sqrt{\beta^{2}-4\theta_{\text{E}}^{2}}\right) \nonumber \\
  \theta_{\text{E}}^{2} &\sim \theta_{+}\theta_{-}
\end{align}
$$

This time we only have two solutions \\(\theta_{+}\\) and \\(\theta_{-}\\), not an entire ring.
If \\(\beta \rightarrow \infty\\) one of the two solutions \\(\theta_{-}\\) goes to zero, whereas the \\(\theta_{+}\\) tends to \\(\beta\\).
This means for \\(\theta_{\text{E}} > \beta\\), we have *strong lensing* producing rings (for \\(\beta\sim 0\\)), or multiple images, however if \\(\theta_{\text{E}} < \beta\\), there is no multiple imaging only distortion at best, and we move into the regime of *weak lensing*.

The Einstein radius thus provides a characteristic scale that determines the strength of the lens.
To demonstrate this, let's rewrite the Einstein radius as a circular area

$$
\begin{align}
  &\pi(D_{L}\theta_{\text{E}})^{2} = \frac{4\pi M(< \theta_{\text{E}}D_{L})D_{LS}D_{L}^{2}}{D_{L}D_{S}} \\
  \Leftrightarrow\quad &\Sigma_{cr} \equiv \frac{D_{S}}{4\pi D_{LS}D_{L}} = \frac{M(< \theta_{\text{E}}D_{L})}{\pi(\theta_{\text{E}}D_{L})^{2}}
\end{align}
$$

The area within the Einstein radius leads to the definition of the *critical surface density* \\(\Sigma_{cr}\\).
It represents the mass homogenously smeared out over an area with Einstein radius, which sets a threshold:
if the lens' surface density \\(\Sigma\\) exceeds the critical surface density at any point \\(\Sigma(D_{L}\pmb{\theta}) > \Sigma_{cr}\\), the source is multiply imaged.

We can use these characteristic scales to define a dimensionless surface density or how we call it *convergence* 

\begin{equation}
  \kappa(\pmb{\theta}) \equiv \Sigma(D_{L}\pmb{\theta})/\Sigma_{cr}
\label{eq:convergence}
\end{equation}

The (unscaled) deflection angle then becomes

\begin{equation}
  \pmb{\alpha}(\pmb{\theta}) = \frac{1}{\pi}\iint \mathrm{d}^{2}\theta' \kappa(\pmb{\theta}') \frac{\pmb{\theta} - \pmb{\theta}'}{\left|\pmb{\theta}-\pmb{\theta}'\right|^{2}}
\end{equation}

and the strong-lensing condition \\(\kappa \geq 1\\).


#### Experiments at home

While "gravitational" lensing is almost impossible to achieve at home (unless you know of a way of compressing something with the mass of the Earth into a tiny 1cm ball&#x2026;), "optical" lensing can behave
identically on a much smaller scale.
Take for example a wine glass and hold it in front of a laser&#x2026; can you see the ring forming?

If watching a video of the effect is not enough hands-on for you, but you don't have a wine glass to spare, check out my `lensing.js` app demo on github:
- [zurich-lens](https://phdenzel.github.io/zurich-lens)
