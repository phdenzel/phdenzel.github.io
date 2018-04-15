---
layout: post
body: blog
type: post
tab_title: 004 | Blog | Dreamworld
title: "Space elevators? Let's build one!"
date: 2018-04-15 12:00:00 GMT+1
thumbnail: /assets/blog-assets/004-space-elevator/images/thumb.jpg
number: 004
---

With all the advances in rocket science and the talk about sending people to Mars in reuseable rockets, there is another method that could send people into space.
The space elevator is a theoretical construct that could provide a much cheaper way to transport people or cargo into Earth's orbit.
In theory, it could even act as a construction base and launch pad for rockets to facilitate long space missions.
All this sounds almost too good to be true... and it probably is.
Even though one already has quite a good idea how this space elevator should look like, there are many hurdles to overcome.
In this post I want to talk about the physical basics that make the space elevator possible.

<!--more-->

#### Ingredients

The "scientific" consensus is that a space elevator should come in four parts.
The tether provides the connection between the ground and space.
It is fixed to an anchor at the ground and a conter-weight at the other end.
Due to the centrifugal force that acts on the counter-weight, the tether is under constant tension.
A climber which is able to move up and down the tether makes the construct into an actual elevator.


#### Unsolved problems

The space elevator is far from realizable.
Many problems cannot be fixed yet with our current technological level.
Here are just a few issues to think about when building a space elevator:

- strain on the tether (atmospheric corrosion, extreme temperature gradients, radiation exposure, space debris, stretching/contracting, etc.)
- constant power support to the climber
- save anchoring
- how to find appropriate materials for the counter-weight?
- how to get the counter-weight in position?
- how does the Moon influence the gravitational state of the elevator?


#### History

The first mentioning of something like a space elevator can be found in the book of Genesis (Tower of Babel), which according to the story failed due to bad communication.
The first to theoretically think about the current image of a space elevator was Tsiolkovsky in 1895.
In 1960, the Russian physicist Artsutanov revisited the idea, and in 1975 Peason introduced the idea on the American side.
In 1978, Clarke moved the topic into the science-fiction domain with his book "The fountains of Paradise".
Sheffield pointed out that it is technologically impossibile to build the elevator due to the lack of materials for the tether strong enough to withstand the immense tension.
The discovery of carbon nanotubes in 1991 led to a resurgence of interest in the scientific community.
Since then, several companies were founded with the goal to realize such a space elevator.


#### Basic physics

To simplify the physical considerations, we introduce the idea of a "free standing tower".
A free standing tower is a tower whose weight is counter-balanced with the outwards centrifugal force.
It has constant density and cross-sectional area.
The tension propagates along its entire length such that each element of the tower is in equilibrium under the action of gravitational, centrifugal, and tension force acting on it.

$$
\begin{equation*}
 F_{G} - F_{C} + F_{\downarrow} - F_{\uparrow} = 0
\end{equation*}
$$

This simply means, the tower doesn't move anywhere.
Consequently, at the geostationary orbit, where \\(F_{G} = F_{C}\\), \\(F_{\downarrow} = F_{\uparrow}\\).
Below the geostationary oribt \\(F_{\downarrow} < F_{\uparrow}\\), whereas above we have \\(F_{\downarrow} > F_{\uparrow}\\).
This means that the tension at the ground is zero, increases as a function of height, reaches a maximum at the geostationary orbit, drops as a function of height, and goes to zero at the height of the tower.

Let's define some variables:

- \\(R\\): Earth's radius (\\(\simeq 20000\,\mathrm{km} / \pi\\))
- \\(M\\): Earth's mass
- \\(\rho_{Earth}\\): Earth's average density (\\(\simeq 5.5 \, \mathrm{g}/\mathrm{cm}^{3}\\))
- \\(\omega\\): Earth's rotational angular velocity (\\(\simeq 2\pi \, \mathrm{day}^{-1}\\))
- \\(R_{geost}\\): distance to geostationary orbit
- \\(H\\): height of the entire tower
- \\(\rho\\): the tower's density

$$
\begin{equation*}
 R_{geost} = \left(\frac{M}{\omega^{2}}\right)^{1/3} \simeq \left(\frac{\rho_{Earth} \frac{4\pi}{3} R^{3}}{\omega^{2}}\right)^{1/3} \simeq 42200 \, \mathrm{km}
\end{equation*}
$$

Redefining \\(AdP = F_{\downarrow} - F_{\uparrow}\\) to be the differential force acting on an infinitesimal element and writing out the expressions for the gravitational and centrifugal force yields

$$
\begin{equation*}
 AdP = \frac{M\rho Adr}{r^{2}} - \rho Adr\cdot \omega^{2} r
\end{equation*}
$$

Dividing by the differential volume \\(Adr\\) gives a condition for the pressure gradient

$$
\begin{equation*}
 \frac{dP}{dr} = M\rho \left[ \frac{1}{r^{2}} - \frac{r}{R_{geost}} \right]
\end{equation*}
$$

Integrating the equation from \\(R\\) to \\(R_{geost}\\) (with boundary condition \\(P(R) = 0\\)) yields the total maximal stress at the geostationary orbit height

$$
\begin{align}
 P(R_{geost}) &= \int_{R}^{R_{geost}} M\rho \left[ \frac{1}{r^{2}} - \frac{r}{R_{geost}} \right] dr \nonumber \\
 &= M\rho \left[ \frac{1}{R} - \frac{1}{R_{geost}} - \frac{1}{2R_{geost}} + \frac{R^{2}}{2R_{geost}^{3}} \right] \nonumber \\
 &= M\rho \left[ \frac{1}{R} - \frac{3}{2R_{geost}} + \frac{R^{2}}{2R_{geost}^{3}} \right]
 \label{eq:maxP_0}
\end{align}
$$

The same integration from the other side (with the boundary condition \\(P(H) = 0\\)), yields the same maximal stress

$$
\begin{equation}
 P(R_{geost}) =  M\rho \left[ \frac{1}{H} - \frac{3}{2R_{geost}} + \frac{H^{2}}{2R_{geost}^{3}} \right]
 \label{eq:maxP_H}
\end{equation}
$$

Equating \ref{eq:maxP_0} and \ref{eq:maxP_H} results in a cubic equation in \\(H\\)

$$
\begin{equation*}
 \frac{1}{H} + \frac{H^{2}}{2R_{geost}^{3}} = \frac{1}{R} + \frac{R^{2}}{2R_{geost}^{3}} \Longleftrightarrow (H-R)(H^{2}R + HR^{2} - 2R_{geost}^{3}) = 0
\end{equation*}
$$

The tower's height from the ground therefore is \\(H-R \simeq 150000\,\mathrm{km}\\).

The other important quantity to consider is the maximal tensile stress. Of any material it is of the order of the sound speed \\(c_{s}^{2}\\)

$$
\begin{equation*}
 c_{s}^{2} \sim \frac{P}{\rho} = M \left[ \frac{1}{R} - \frac{3}{2R_{geost}} + \frac{R^{2}}{2R_{geost}^{3}} \right] \simeq 4.81 \cdot 10^{7} \, \mathrm{m}^{2}/\mathrm{s}^{2}
\end{equation*}
$$

This tensile stress is three orders of magnitudes too high compared to almost any other material tensile strength... steel has an approximate tensile strength of \\(\sim 6 \cdot 10^{4} \, \mathrm{m}^{2}/\mathrm{s}^{2}\\).
Interestingly, the tensile strength of human skin is of the same order of magnitude \\(\sim 10^{4} \, \mathrm{m}^{2}/\mathrm{s}^{2}\\).
There is only one known material worth considering, which is a tether made of carbon nanotubes with a tensile strength of \\(\sim 6.3 \cdot 10^{7} \, \mathrm{m}^{2}/\mathrm{s}^{2}\\).
So, theoretically we already have a material strong enough to create a the tether.

Of course, there are still many problems, but I think with time a space elevator might not be so far off and actually realizable. We'll see...
