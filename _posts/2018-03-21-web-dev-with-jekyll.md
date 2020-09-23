---
layout: post
body: blog
type: post
tab_title: 002 | Blog | Dreamworld
title: "Website development with Jekyll"
date: 2018-03-21 00:05:00 GMT+1
thumbnail: /assets/blog-assets/002-jekyll-web-dev/images/thumb.jpg
number: 002
---

In the previous post I talked about [Jekyll](https://jekyllrb.com/), a blog-aware, static website generator. In this posts I will talk about how I used it to create this website. 

<!--more-->

#### First things first

First things first.
To install `jekyll` we need [Ruby](https://www.ruby-lang.org/).
On most linux distributions `ruby` is not yet installed by default.
Use the following command or something equivalent to install it

<pre class="src-bash">sudo apt-get install ruby</pre>

On macOS, a very basic (and outdated) `ruby` version is already installed, but for me it was unusable.
This is why I installed it parallel to the system version over [Homebrew](https://brew.sh/).
If you don't have Homebrew installed use the latest incantation to do so

<pre class="src-bash">
/usr/bin/ruby -e <span style="color: #3DAA77;">"$(</span><span style="color: #A9A1E1;">curl</span><span style="color: #3DAA77;"> -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</span>
</pre>

and then install `ruby` with Homebrew

<pre class="src-bash">brew update
brew install ruby
</pre>

Once you have a current `ruby` version installed go ahead an summon the beast

<pre class="src-bash">gem install jekyll bundler</pre>

This installs two "ruby gems", `bundler` which manages gems' version compatibilities, and `jekyll` itself.
`bundler` is not really necessary, but recommended by the `jekyll` developers.

#### Now comes the action

Once installed you could use a few short commands, almost like you would initialize a git repository, only difference the folder doesn't have to exist yet.

<pre class="src-bash">jekyll new myblog
<span style="color: #46D9FF;">cd</span> myblog
<span style="color: #E83A82;">if</span> which bundle &amp;&gt; /dev/null; <span style="color: #E83A82;">then</span>
    bundle exec jekyll serve
<span style="color: #E83A82;">else</span>
    jekyll serve
<span style="color: #E83A82;">fi</span>
</pre>

With this command sequence you create a folder, with all the necessary configurations for Jekyll and serve it to the localhost on port [4000](http://localhost:4000) by default.
However, I like to use my own folder structure (not unsimilar to the default one, yet slightly different).
If you're searching for a skeleton project copy the `dev-std` from my [GitHub repository](https://github.com/phdenzel/dev-std).

In my projects, Jekyll was immensely helpful when I added the flag `jekyll serve --watch`, which has the consequence that changes to the source code are immediately recompiled and a quick refresh (on Chrome for macOS with ⌘R) of the browser reveals the effect of those changes.

#### Settings

Another great thing about Jekyll is, it provides the option to include YAML config files. YAML... funny acronym, right? What does it stand for? 'YAML ain't Markup Language', or is it 'Yet another Markup Language'? Be that as it may, I used several config files to bring order to the categories of settings I used for this website. The most important settings file is the `_config.yml`, which has to be placed in the root directory of the project. It contains all the information about what to compile where, with which plugins, and what not... in my `_config.yml` I point to another folder where website content-specific configurations are set, `_data/settings.yml` and `_data/design.yml`. Just have a look if you're interested to know more...

#### Markdown instead of HTML

Writing HTML might be fun the first few lines... but sooner than later all the tag definitions going like 'open Dirac-bracket' + 'tag name' + 'close Dirac-bracket' is getting really old. Yes, I know it's not really called "Dirac-bracket"", but I don't know what else to call it as a physicist ;).
Luckily, Jekyll is able to help out here too; it offers the "Markdown" alternative. Markdown is pretty much a simple text file within which simple, intuitive syntax expressions designate HTML elements. Have a look at [https://www.markdownguide.org/cheat-sheet](https://www.markdownguide.org/cheat-sheet) if you can't remember the signs.

#### Go with the flow

Liquid is the templating language Jekyll uses to process pages on your site.
It transforms Jekyll into an almost proper language with variable assignments, outputs, logic statements, loops, etc.
This is quite useful when you want to include a list of settings... just loop over all list elements, and use some programmatic way to apply the individual details.


All in all... I just wanted to say: give Jekyll a chance if you consider writing a static, bloggy website. I did and was positively surprised.
