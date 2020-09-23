---
layout: post
body: blog
type: post
tab_title: 003 | Blog | Dreamworld
title: "How tall can mountains grow?"
date: 2018-03-24 00:02:00 GMT+1
thumbnail: /assets/blog-assets/003-mountains/images/thumb.jpg
number: 003
---

Ever asked yourself why mountains are as high as they are?
A short google search reveals that almost all of Earth's highest mountains are located in the Himalaya around 8000 to 8500 meters, Mount Everest being the most famous and ascended.
There is a mountain almost twice as tall though, Olympus Mons. Only thing is&#x2026; it's not a Terrestrial mountain.
Olympus Mons resides on Mars, and as far as we know, it is with 21 km the tallest mountain in the Solar System.
And it's not the only mountain taller than Mount Everest, Mars has at least 4 mountains higher than 8 km.
So why can mountains grow taller on Mars than on Earth?
As yours might be, my first thought is gravity!
Let's try to estimate the maximal height of mountains on Earth, considering the only thing they have to fight against is gravity&#x2026;

<!--more-->

#### Earths properties

For the purpose of investigating a structural property of Earth and other rocky planets/objects, let's assume interatomic forces maintain a constant density over a wide range of applied pressures.
We can estimate this density from microscopic properties, considering that atomic size is around a Bohr radius \\(r_{B} = (m_{e}\alpha)^{-1}\\), atomic weight is \\(Am_{b}\\), where \\(A\\) is a mean mass number and \\(m_{b}\\) average proton-neutron mass.
Estimating that the macroscopic density is one atom in a cube of length \\(4r_{B}\\)

$$
\begin{equation*}
 \rho = \frac{Am_{b}}{(4r_{B})^{3}} = Am_{b}\left(\frac{\alpha m_{e}}{4}\right)^{3}
\end{equation*}
$$

For sand (<sup>28</sup>Si<sup>16</sup>O<sub>2</sub>) \\(A=20\\), for Earth we assume \\(A=30\\), due to the fact that it contains also heavier elements.

The near constant density of a solid material is maintained by the bulk modulus, a sort of pressure exerted by interatomic forces.
Thus, we can interpret it as an energy per unit volume, with the characteristic energy being the bond energy (\\(m_{e}\alpha^{2}\\))

$$
\begin{equation*}
 K \approx \frac{\epsilon m_{e}\alpha^{2}}{(4r_{B})^{3}} = \frac{\epsilon}{4^{3}}m_{e}^{4}\alpha^{5}
\end{equation*}
$$

where \\(\epsilon<1\\).
For diamond this energy really is the ionization energy, but for most other materials it is sort of the energy to separate molecular dipoles, and thus 2 or 3 magnitudes smaller for rock and other materials.

<div class="src-python">
<pre class="src src-python"><span style="color: #FF0087;">import</span> planck_units <span style="color: #FF0087;">as</span> pl

<span style="color: #FFAF5F;">epsilon</span> = 10**(-3)
<span style="color: #FFAF5F;">K</span> = epsilon/(4*4*4)*pl.m_e**4*pl.alpha**5
<span style="color: #FF0087;">print</span>(<span style="color: #00875F;">"{:.3f} x 10^8 Nm^-2"</span>.<span style="color: #5FD7FF;">format</span>(K*pl.marb/pl.lap/pl.tick**2 / 10**8))

&gt;&gt; 4.609 x 10^8 Nm^-2
</pre>
</div>

#### Critical height set by gravity

For a mountain not to collapse under its own weight, both opposing pressures must reach an equilibrated state

$$
\begin{equation*}
 K \sim \rho g h
\end{equation*}
$$

where \\(h\\) is the height of the mountain and \\(R\\) the radius of the planet/object.

Putting in the expressions for \\(K\\), \\(\rho\\), and \\(g=4\rho R\\) yields

$$
\begin{align*}
 \frac{\epsilon}{4^{3}}m_{e}^{4}\alpha^{5} &= Am_{b}\left(\frac{\alpha m_{e}}{4}\right)^{3}\cdot 4\cdot Am_{b}\left(\frac{\alpha m_{e}}{4}\right)^{2} R\cdot h \\
 \epsilon &= (Am_{b})^{2} \frac{\alpha m_{e}^{2}}{4^{2}} \cdot Rh \\
 Rh &= \left(\frac{4^{2}\epsilon}{\alpha}\right) \frac{1}{(Am_{b}m_{e})^{2}}\\
\end{align*}
$$

This shows that the size of a planet is inversely proportional to the height of mountains, which finally explains why mountains on Mars are taller than on Earth (about twice the size of Mars).

Putting back the "correct" units would mean to multiply with \\(\frac{\hbar^3}{Gc}\\) (for those that distinguish between space, time, and mass).
We calculate it in Planck units with `python`

<div class="src-python">
<pre class="src src-python"><span style="color: #FF0087;">import</span> planck_units <span style="color: #FF0087;">as</span> pl

<span style="color: #FFAF5F;">R_earth</span> = 40000*500/pl.pi/pl.lap  <span style="color: #878787;"># </span><span style="color: #878787;">circumference of Earth is 40000 km</span>
<span style="color: #FFAF5F;">epsilon</span>, <span style="color: #FFAF5F;">A</span> = 10**(-3), 30
<span style="color: #FFAF5F;">h</span> = 4*4*epsilon/pl.alpha * (A*pl.m_e*pl.m_b)**(-2) * 1/R_earth
<span style="color: #FF0087;">print</span>(<span style="color: #00875F;">"{:.3f} km"</span>.<span style="color: #5FD7FF;">format</span>(h*pl.lap/1000))

&gt;&gt; 9.646 km
</pre>
</div>

#### When does an object start to become round?

This also explains why Pluto (see <a href="https://apod.nasa.gov/apod/ap170731.html">APOD170731</a>) was demoted from a planet to a minor object, not far from an asteroid.
An object stops to be round as soon as the radius and the height of a mountain become comparable \\(R \sim h\\), i.e.

$$
\begin{equation*}
 R = \sqrt{\frac{4^{2}\epsilon}{\alpha}}\frac{1}{Am_{e}m_{b}}
\end{equation*}
$$

<div class="src-python">
<pre class="src src-python"><span style="color: #FF0087;">import</span> planck_units <span style="color: #FF0087;">as</span> pl
<span style="color: #FF0087;">from</span> math <span style="color: #FF0087;">import</span> sqrt

<span style="color: #FFAF5F;">epsilon</span>, <span style="color: #FFAF5F;">A</span> = 10**(-3), 30
<span style="color: #FFAF5F;">R_potato</span> = sqrt(4*4*epsilon/pl.alpha) * (A*pl.m_e*pl.m_b)**(-1)
<span style="color: #FF0087;">print</span>(<span style="color: #00875F;">"{:.3f} km"</span>.<span style="color: #5FD7FF;">format</span>(R_potato*pl.lap/1000))

&gt;&gt; 247.813 km
</pre>
</div>

At this limit all the approximations we made break, such as constant density and more evidently/importantly spherical symmetry.

Nevertheless, we managed to understand how tall mountains can maximally get on a planet with very simple assumptions.


Btw... if you asked yourself why `import planck_units` doesn't work on your machine, it's because it's one of my own python libraries, which I appended manually to my `$PYTHONPATH`. Find it [here](https://github.com/phdenzel/pylib).
