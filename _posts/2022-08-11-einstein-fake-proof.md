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

<!-- <h1>Albert and Grant, a Tale of Triangles</h1> -->
<div style="font-size: 10pt">
  by authors: Prasenjit Saha, Philipp Denzel
</div>

<!-- Introduction -->
<div class="intro">
  <p>
    In one of Einstein's notebooks from 2012, there is a curious
    figure with an even more curious caption.
  </p>

  <img src='/assets/blog-assets/013-einstein-fake-proof/images/ae1912_sketch.png' width='520' class='center'>

  <p>
    The caption (in German) reads
    <i> Alle Dreiecke sind gleichschenklig </i>
    meaning
    <i>All triangles are isosceles.</i>
  </p>


  <p>
    After watching 3blue1brown on
    <a href='https://www.youtube.com/watch?v=VYQVlVoWoPY' target='_blank'>
      How to lie using visual proofs.
    </a>
    There's no doubt, Albert and Grant are talking about the same
    fake proof!
  </p>

  <p>
    What was Einstein thinking?  Was he solving a little brainteaser
    from a newspaper while waiting for a train?  Was he preparing a
    lecture on how to lie with visual proofs?  Maybe there is a clue
    somewhere else in his notebooks.  Or maybe we'll just never
    know.
  </p>

  <!--more-->

  <p>
    Here we'll show how Einstein's sketch would look like without
    the mathematical sleight-of-hand in it, and explain how it leads
    to a conclusion which isn't as exciting all triangles being
    isosceles, but nonetheless somewhat interesting.  Then we'll
    explain how the sleight-of-hand works.  All sketches are
    generated using javascript and are interactive. Try moving the
    edges of the triangle.
  </p>
</div>

<h2>The correct construction</h2>

<table>
  <!-- Frame 1 -->
  <tr>
    <td>
      <canvas id="dst1" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig1.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Take a triangle that isn't isosceles, like this one.
      </p>
    </td>
  </tr>

  <!-- Frame 2 -->
  <tr>
    <td>
      <canvas id="dst2" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig2.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Take any one of the vertices, and draw a line (the light dashed
        line) bisecting its angle.
      </p>
    </td>
  </tr>

  <!-- Frame 3 -->
  <tr>
    <td>
      <canvas id="dst3" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig3.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Draw the perpendicular bisector of the opposite side (the
        other dashed line).  Mark the point where these two lines
        intersect. The point is going to outside the triangle.
      </p>
      <p>
        Remark: for an isosceles triangle the perpendicular
        bisector of the base also bisects the top angle.  There's
        no intersection point because they're the same line.
      </p>
    </td>
  </tr>

  <!-- Frame 4 -->
  <tr>
    <td>
      <canvas id="dst4" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig4.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Draw perpendiculars from marked point to the other sides.
        Here we used dashed lines again.  One of the
        perpendiculars is going to fall inside the triangle and
        the other outside.  In the latter case we extend the
        relevant side of the triangle with a dotted line.
      </p>
    </td>
  </tr>

  <!-- Frame 5 -->
  <tr>
    <td>
      <canvas id="dst5" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig5.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Join the marked point to the other two sides.
      </p>
      <p>
        We now have our full construction.  The dotted lines need
        only a ruler to draw, the dashed lines need both ruler and
        compass.  (Of course, we are using a computer, but you see
        what we mean.)
      </p>
    </td>
  </tr>
</table>

<p>
  Now we are going to find some congruent triangles in our
  construction.
</p>

<table>
  <!-- Frame 6 -->
  <tr>
    <td>
      <canvas id="dst6" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig6.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        A pair of congruent triangles.
      </p>
    </td>
  </tr>

  <!-- Frame 7 -->
  <tr>
    <td>
      <canvas id="dst7" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig7.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Another pair of congruent triangles.
      </p>
    </td>
  </tr>

  <!-- Frame 8 -->
  <tr>
    <td>
      <canvas id="dst8" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig8.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        And another.
      </p>
    </td>
  </tr>
</table>

<h2>The ruse</h2>

<table>
  <!-- Frame 9 -->
  <tr>
    <td>
      <canvas id="dst9" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig9.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        A pair of congruent triangles.
      </p>
    </td>
  </tr>
  <!-- Frame 10 -->
  <tr>
    <td>
      <canvas id="dst10" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig10.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        This pair is congruent.
      </p>
    </td>
  </tr>
  <!-- Frame 11 -->
  <tr>
    <td>
      <canvas id="dst11" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig11.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        This pair isn't congruent.
      </p>
    </td>
  </tr>
  <!-- Frame 12 -->
  <tr>
    <td>
      <canvas id="dst12" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig12.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Nor is this.
      </p>
    </td>
  </tr>
</table>

<h2>Another version of the ruse</h2>

<table>
  <!-- Frame 13 -->
  <tr>
    <td>
      <canvas id="dst13" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig13.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        A pair of congruent triangles.
      </p>
    </td>
  </tr>
  <!-- Frame 14 -->
  <tr>
    <td>
      <canvas id="dst14" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig14.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        This pair is congruent.
      </p>
    </td>
  </tr>
  <!-- Frame 15 -->
  <tr>
    <td>
      <canvas id="dst15" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig15.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        This pair isn't congruent.
      </p>
    </td>
  </tr>
  <!-- Frame 16 -->
  <tr>
    <td>
      <canvas id="dst16" width="1920px" height="1080px">
        <img src='/assets/blog-assets/013-einstein-fake-proof/images/fig16.png' width=400>
      </canvas>
    </td>
    <td>
      <p>
        Nor is this.
      </p>
    </td>
  </tr>
</table>

<h2> Reflections </h2>
<div class="outro">
  <p>
    <img src='/assets/blog-assets/013-einstein-fake-proof/images/ae1912.png' width='1280' class='center'>
    The sketch is part of a two-page section next to a famous
    calculation on gravitational lensing
    <a href='https://www.science.org/doi/10.1126/science.275.5297.184' target='_blank'>
      rediscovered in the 1990s.
    </a>
    Lots of people have studied those two pages, but nobody seems to
    have paid much attention to that little doodle about all
    triangles being isosceles.  We didn't either, until we happened
    to stare at Einstein's sketch.
  </p>
</div>

 
<canvas hidden id="dst" width="1920px" height="1080px">
  Hidden main canvas
</canvas>

<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/math.js"></script>
<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/geometry.js"></script>
<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/frames.js"></script>
<script type="text/javascript" src="/assets/blog-assets/013-einstein-fake-proof/js/interact.js"></script>
