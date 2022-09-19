---
layout: post
body: blog
type: post
tab_title: 013 | Blog | Dreamworld
title: "Albert and Grant - A Tale of Triangles"
date: 2022-08-11 23:59:59 GMT+1
thumbnail: /assets/blog-assets/013-einstein-fake-proof/images/thumb.png
number: 013
---
<small>
  by Philipp Denzel and Prasenjit Saha
</small>

<section>

  <!-- Introduction -->
  <div class="intro">
    <p>
      In one of Einstein's notebooks from 1912, there is a curious
      figure with an even more curious caption.
    </p>

    <img src='/assets/blog-assets/013-einstein-fake-proof/images/ae1912_sketch.png' width='520' class='center'>
    <!-- <img src='images/ae1912_sketch.png' width='520' class='center'> -->

    <p>
      The caption (in German) reads
      <i> Alle Dreiecke sind gleichschenklig </i> meaning
      <i>All triangles are isosceles.</i>
    </p>

    <p>
	    We guess a few historians of science have stared at the
	    remark, shaken their heads in disbelief, and moved on.  On
	    the other hand, if you happen to have Grant Sanderson's
	    video
      <a href='https://www.youtube.com/watch?v=VYQVlVoWoPY' target='_blank'>
        How to lie using visual proofs</a> fresh in your mind, the
      sketch will look suspiciously familiar.  There's no doubt, Albert
      and Grant are talking about the same fake proof!
    </p>

    <p>
      Here we'll explain, with the help of some interactive
      graphics, a mathematical sleight-of-hand hiding in
      Einstein's sketch.
      <i>Spoiler alert:</i>&nbsp; it will give away a punch line
      from the video.
    </p>
  </div>

<!--more-->

</section>
<section>

  <table>
    <tr>
      <td colspan='2'>
        <h3>Start with a triangle</h3>
	      <p>
	        Here's a triangle.  You can change it by dragging any of
	        the vertices.  Try it now!  (If you drag a vertex outside
	        the panel and can't get it back, just refresh the page.)
	      </p>
	      <p>
	        If you have JavaScript disabled, you should see some
	        static figures below.  Our explanations will still work
	        with those.
	      </p>
	    </td>
    </tr>
    <!-- Frame 1 -->
    <tr>
      <td>
        <canvas id="dst1" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig1.png' width=400>
          <!-- <img src='images/fig1.png' width=400> -->
        </canvas>
      </td>
    </tr>
    
    <tr>
      <td colspan='2'>
	      <h3>Two lines and their intersection point</h3>
	      <p>
	        Now we draw two lines.  One is the <i>angle bisector</i>
	        at one of the vertices (doesn't matter which one).  The
	        other is the <i>perpendicular bisector</i> of the side
	        opposite said vertex.
	      </p>
	      <p>
	        As you can verify by altering the triangle, two lines
	        coincide if the two sides (not the bisected one) have equal
	        length.  Otherwise they will intersect at some point
	        (say <i>P</i>).  As we can also verify, <i>P</i> will lie
	        outside the triangle.  Verification is not mathematical
	        proof, of course.  But proof will follow.
	      </p>
	    </td>
    </tr>
    <!-- Frame 2 -->
    <tr>
      <td>
        <canvas id="dst2" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig2.png' width=400>
          <!-- <img src='images/fig2.png' width=400> -->
        </canvas>
      </td>
      <td>
        <canvas id="dst3" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig3.png' width=400>
          <!-- <img src='images/fig3.png' width=400> -->
        </canvas>
      </td>
    </tr>

    <!-- Frame 4 -->
    <tr>
    <tr>
      <td colspan='2'>
	      <h3> A few more lines </h3>
	      <p>
	        From the intersection point <i>P</i> we now drop
	        perpendiculars to the remaining sides of the triangle.  If
	        a side is too short to reach the relevant perpendicular,
	        we just extend the side as needed.
	      </p>
	      <p>
	        Then we join the point <i>P</i> to the remaining two
	        vertices of the original triangle.  Our construction is
	        now complete.
	      </p>
	    </td>
    </tr>
    <td>
      <canvas id="dst4" width="1920" height="1080">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig4.png' width=400>
        <!-- <img src='images/fig4.png' width=400> -->
      </canvas>
    </td>
    <td>
      <canvas id="dst5" width="1920" height="1080">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig5.png' width=400>
        <!-- <img src='images/fig5.png' width=400> -->
      </canvas>
    </td>
    </tr>
    <tr>
	    <td colspan='2'>
	      <p>
	        A little detail, which you can ignore: we have used two
	        different line styles for our constructions.  All solid
	        lines simply join two points that are already known.
	        For the dotted lines you have to solve for a
	        point. (Before computer graphics, the former kind needed
	        just a ruler, the latter kind needed a ruler and a
	        compass.)</p>
	    </td>
    </tr>
    <tr>
      <td colspan='2'>
	      <h3> Some congruent triangle pairs </h3>
	      <p>
	        With all the perpendiculars we have drawn, there are
	        several right-angled triangles in our construction.  All
	        of them have the intersection point <i>P</i> as one of their
	        vertices.  Let us consider the triangles in pairs (shown
	        in turn in green).
	      </p>
	      <p>
	        First, there are the triangles involving our original
	        angle bisector and the perpendiculars we dropped
	        from <i>P</i>.  They have the bisector line itself in
	        common, the bisected half-angles are equal, and each also
	        has a right angle.  So these two triangles are congruent.
	        They are also mirror-images of each other, sharing one
	        side.
	      </p>
	      <p>
	        Then, there are the two triangles involving the
	        perpendicular bisector we drew.  They have the bisector
	        itself as a common side, and the bisected sides are equal,
	        and both are right-angled triangles.  So again these two
	        triangles are mirror-image congruent triangles.
	      </p>
	    </td>
    </tr>
    <!-- Frame 6 -->
    <tr>
      <td>
        <canvas id="dst6" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig6.png' width=400>
          <!-- <img src='images/fig6.png' width=400> -->
        </canvas>
      </td>
      <td>
        <canvas id="dst7" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig7.png' width=400>
          <!-- <img src='images/fig7.png' width=400> -->
        </canvas>
      </td>
    </tr>
    <tr>
      <td colspan='2'>
	      <p>
	        Now consider the intersection and gap formed when we
	        switch between the above two triangle pairs.  These are
	        yet two more right-angled triangles, because each
	        includes one of the perpendiculars we drew.  They also
	        share two congruent sides with the above two congruent
	        pairs.  Ergo these two triangles are congruent.  These
	        are not mirror images, but rotated versions of each
	        other.
	      </p>
	    </td>
    </tr>
    <tr>
      <td>
        <canvas id="dst8" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig8.png' width=400>
          <!-- <img src='images/fig8.png' width=400> -->
        </canvas>
      </td>
    </tr>
    <tr>
      <td colspan='2'>
	      <p>
	        One of these green triangles is partly inside the
	        original triangle, one is completely outside.  Together
	        they show the difference between the original triangle
	        and an isosceles triangle.  You can make make the
	        original triangle isosceles by transferring some length
	        from one leg to the other, and the triangles show you
	        how much.
	      </p>
	    </td>
    </tr>
  </table>
</section>

<section>  
  <table>
    <!-- Frame 9 -->
    <tr>
	    <td colspan='2'>
	      <h3>A sleight of hand</h3>
	      <p>
	        As we have seen, the intersection point <i>P</i> of the
	        angle-bisector line and the perpendicular bisector lies
	        outside the triangle.  You can make <i>P</i> appear to lie
	        inside the triangle, by drawing a fake angle bisector.
	        (You could also fake the perpendicular bisector, but
	        that's easier to spot.)
	      </p>
	      <p>
	        With a genuine perpendicular bisector, the first pair of
	        congruent triangles is still congruent.
	      </p>
	    </td>
    </tr>
    <tr>
      <td>
        <canvas id="dst9" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig9.png' width=400>
          <!-- <img src='images/fig9.png' width=400> -->
        </canvas>
      </td>
      <!-- Frame 10 -->
      <td>
        <canvas id="dst10" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig10.png' width=400>
          <!-- <img src='images/fig10.png' width=400> -->
        </canvas>
      </td>
    </tr>
    <tr>
	    <td colspan='2'>
	      <p>
	        The other two pairs of triangles, though they're still
	        right-angled, are not congruent any more.  (Unless you
	        make two sides equal.)  The fake angle bisector we used
	        to put <i>P</i> inside the triangle breaks the
	        argument.&nbsp;.&nbsp;.&nbsp;
	      </p>
	    </td>
    </tr>
    <tr>
	    <!-- Frame 11 -->
      <td>
        <canvas id="dst11" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig11.png' width=400>
          <!-- <img src='images/fig11.png' width=400> -->
        </canvas>
      </td>
      <!-- Frame 12 -->
      <td>
        <canvas id="dst12" width="1920" height="1080">
          <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig12.png' width=400>
          <!-- <img src='images/fig12.png' width=400> -->
        </canvas>
      </td>
    </tr>
    <tr>
	    <td colspan='2'>
	      <p>
	        .&nbsp;.&nbsp;.&nbsp; which is just as well, because
	        otherwise we'd have proved all triangles to be
	        isosceles!
	      </p>
	    </td>
    </tr>
  </table>
</section>

<section>
  <h3> In the background </h3>
  <div class="outro">
    <p>
	    Einstein's sketch and caption isn't on some random piece of
	    paper of doubtful authorship.  It appears next to what is
	    now a textbook calculation in astrophysics, and the notebook
	    page is
      <a href='https://www.science.org/doi/10.1126/science.275.5297.184' target='_blank'>
        well known to historians of science. </a>
	  </p>
	  
    <img src='/assets/blog-assets/013-einstein-fake-proof/images/ae1912.png' width='1280' class='center'>
    <!-- <img src='images/ae1912.png' width='800' class='center'> -->
	  <p> It is about an effect that happens when two random stars
	    at different distances from us happen to nearly align along
	    the line of sight. The light from the more distant star gets
	    focused by the gravitational field of the less distant star,
	    resulting in a characteristic apparent brightening over a
	    period of days or weeks, according to the formula Einstein
	    derives here.  It very rarely happens, and you have to monitor
	    millions of stars to pick out this effect from all the other
	    ways the apparent brightness of stars can change.  In
	    Einstein's lifetime it was only a theoretical curiosity, but
	    in the 1990s observing gravitational lensing by stars (and
	    later even exoplanets) became feasible.  Surveys like
	    <a href='https://en.wikipedia.org/wiki/Optical_Gravitational_Lensing_Experiment'
	       target='_blank'>OGLE</a> nowadays routinely discover
	    exoplanets this way.  The gravitational lensing phenomenon
	    also applies to galaxies, and on that topic there is even
	    some <a href='https://arxiv.org/abs/2007.14398'
	            target='_blank'>research by the present authors.</a>
	  </p>

    <p>
      What prompted Einstein, in the middle of solving the riddles
      of the universe, to work through this fake proof?  Was he
      solving a little brainteaser from a newspaper while waiting
      for a train?  Was he preparing a lecture on how to lie with
      visual proofs?  Maybe there is a clue somewhere else in his
      notebooks.  Or maybe we'll just never know.
    </p>
  </div>
</section>

<canvas hidden id="dst" width="1920" height="1080">
  Hidden main canvas
</canvas>

<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/math.js"></script>
<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/geometry.js"></script>
<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/frames.js"></script>
<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/interact.js"></script>
