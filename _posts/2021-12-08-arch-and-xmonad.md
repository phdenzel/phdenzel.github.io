---
layout: post
body: blog
type: post
tab_title: 011 | Blog | Dreamworld
title: "Arch Linux and XMonad"
date: 2021-12-08 00:06:00 GMT+1
thumbnail: /assets/blog-assets/011-arch-and-xmonad/images/thumb.png
number: 11
---

Some people hate it, some enjoy it&#x2026; setting up a new machine, and a
new operating system. Generally speaking, the majority of the people
who enjoy this process are probably Linux users to which I count
myself. There is even a word for the process of repeatedly setting up
new machines in the Linux community&#x2026; "distro-hopping". After a while
hopping from distro to distro though, I realized that the importance
of distros is somewhat exaggerated in the community.  One of the many
advantages of Linux (at least if you are familiar with it) is the
configurability and freedom to do whatever you want with your
machine. This means you can make any distro look and feel like any
other. In this post, I explain how I configured my Arch Linux machine,
and control my desktop environment with XMonad.

<!--more-->

### Table of Contents

-   [My origin story (with Linux)](#org115ba59)
-   [Arch installation](#org4a07270)
    -   [Preparations](#orgdde75a2)
        -   [Boot mode](#org2c6cde9)
        -   [Internet connection](#orgd6a46bf)
        -   [Update the mirrorlist](#org3f799a2)
    -   [Disk partitioning and formatting](#orge16182b)
    -   [Base install](#orgb3afe8e)
    -   [`chroot` into `/mnt` and set up the host](#orgc6686f8)
        -   [Time clock, locale, and keyboard layout](#org71f3e69)
        -   [Set the hostname](#org6a913c1)
        -   [Initramfs](#org67f51b6)
    -   [Package installs](#org6d77b7c)
        -   [Add another user](#org249017b)
    -   [Boot loader](#org1a206bd)
    -   [Final touches](#orgc14af42)
        -   [`grub-btrfs`](#org3fe88f7)
        -   [Reboot](#orgd887ffe)
-   [XMonad](#org749b0d4)
    -   [Installing requirements](#org2d6cb67)
    -   [Compiling from source](#orgd645a71)
    -   [Configuring XMonad](#org2bb7e91)

\\
\\
So, before I continue, I guess this is a good point to put a
disclaimer&#x2026; this post contains reports of my personal experiences
and opinions, and as such is probably disagreeable to some. If you
feel that way, simply stop reading please. I have tried, used, and
worked with Microsoft Windows, OSX/macOS, and Linux in the past. Given
a choice today, I would choose Linux everytime, as it is simply the
operating system in which I feel most comfortable.

I built my current computer myself from individual components and like
configuring and tinkering with it (on hardware and software), which is
why I settled on the Arch Linux distribution. However, as mentioned
before, it was a long road to this point and is still a constant
adjustment to current likes, dislikes, and needs.


<a id="org115ba59"></a>

### My origin story (with Linux)

My Linux journey began on a late afternoon when I asked my dad
about what operating systems were, and about alternatives to
Windows 95 which was installed on my (now ancient) IBM ThinkPad
770 handed down by him. And before you say anything&#x2026; yes, I know
how lucky I was to receive a proper computer at that time and age!
Being a trained electrical engineer, IBM researcher, and a general
tech enthusiast, he proudly explained to a (at that time) 9 year
old boy about Linux. He spent probably hours teaching me all about
computers, from hardware all the way down to software, and as if
entranced, I listened to every word&#x2026; until mom annoyedly called
to dinner for the forth time. That day, a common hobby of ours
started.

The next day, my dad came back from work and gave me a CD. On it,
was a bootable live system of Knoppix installed, a Linux distro
designed for just such a purpose. We opened the laptop's CD drive,
inserted the disc and booted up without any problems. From that
time onwards, I would use Linux intermittently for school, or to
simply explore the system.

During my teenager years, Microsoft practically monopolized
computer gaming, and consequently made multi-booting essential to
me. Microsoft always stayed installed for the purpose of gaming on
my then computer. As for many others starting their Linux
adventures, my next distribution of Linux was Ubuntu, then
openSUSE, Linux Mint, back to Ubuntu, KDE neon, afterwards Debian
for quite a long while. At university, I finally had my first
"official" programming course for which the recommended OS was
openSUSE (in school we only had limited contact with
computers). From that point on, Linux had become the most
important OS for my studies, and later also for work as a
pre-doctoral researcher. I was granted access to the universities
own supercomputing cluster zBox4 running Red Hat Linux-based
Scientific Linux on which I spent countless hours writing,
running, and debugging code.

A few years ago, Pop!<sub>OS</sub> emerged as a very user-friendly
distribution, which finally made me switch to a full-fledged
Linux-only user. It ships with a gorgeous, self-maintained,
Rust-based, GNOME-like desktop (probably the right decision if you
know what I mean). Pop!<sub>OS</sub> finally proved to me that gaming was
now (with only a little more hardship) completely possible, even
if this was less important to me than during my teenager years. It
also introduced me to the concept of window tiling&#x2026; which
connects to the second part of this post's title.

After Pop!<sub>OS</sub>, I wanted a slightly more bare-bones distribution,
and a desktop environment which is less resource-intense when
idle. My goal was to fully customize everything about my machine,
and have everything set up just as I want it. It came down to two
options: Debian or Arch. Since I've already tried Debian, and
heard only good things about the rolling release scheme, I picked
Arch.

Many people are reluctant to give Arch a try, because the
installation process is not exactly a few mouse clicks away from
completion. In fact, Arch is typically installed from the tty, and
most things which seem to be happening automatically in the
background for other distributions, have to be done manually for
Arch. Of course, for some this seems tedious, but for me it means
full control over everything, and it teaches us about the inner
workings of the Linux system.

In the following section, I describe how I set up Arch on my machines,
step by step, command after command. For the most parts, I tried to
stick to the command-line and avoid opening a text-editor, but if
shell scripting confuses you and you prefer working in vim (or another
text-editor of your choice), skip the `echo >> ` and `sed -i` commands
and simply open the file instead.


<a id="org4a07270"></a>

### Arch installation

Before you follow my guide on how to install Arch, remember that
it has a rolling release scheme and thus, is potentially subject
to changes.  Always check the official installation guide on the
[arch wiki](https://wiki.archlinux.org/title/installation_guide) for updates, when in doubt, or for troubleshooting.

First, download an iso with the latest version of Arch

<div class="org-src-container">
<pre class="src src-bash"><span style="color: #46D9FF;">cd</span> ~/Downloads
<span style="color: #FDB760;">arch_mirror</span>=<span style="color: #44BC84;">"mirror.rackspace.com"</span>  <span style="color: #8A8A8A;"># </span><span style="color: #8A8A8A;">change depending on your location</span>
wget -c <span style="color: #44BC84;">"${arch_mirror}/archlinux/iso/latest/md5sums.txt"</span>
sed -i <span style="color: #44BC84;">'/archlinux-bootstrap/d'</span> md5sums.txt
<span style="color: #46D9FF;">read</span> md5sum arch_iso &lt;&lt;&lt; $(<span style="color: #A9A1E1;">cat</span> md5sums.txt)
wget -c <span style="color: #44BC84;">"${arch_mirror}/archlinux/iso/latest/${arch_iso}"</span>
md5sum -c md5sums.txt
</pre>
</div>


<a id="orgdde75a2"></a>

#### Preparations

Throughout this guide, I'll use `/dev/sde` as the USB device file,
and `/dev/sda` as the hard drive where we want to install
Arch. Adjust according to your hardware, for example on modern
machines you might want to install on NVMe SSDs which are
typically at `/dev/nvme0n1`, `/dev/nvme1n1`, etc.

It is easiest to install Arch from a bootable medium. On Linux,
the creation of such a medium, e.g. a USB stick, is
straight-forward.

Insert your USB stick, but do <span class="underline">not</span> mount it (or if it
auto-mounts, unmount it before proceeding).

<div class="org-src-container">
<pre class="src src-bash">cat ~/Downloads/archlinux-2022.02.01-x86_64.iso &gt; /dev/sde
</pre>
</div>

Once, the iso is copied onto the flash drive, reboot the machine,
and select the flash drive in your boot menu. You should then be
greeted with a short informational message in the shell.

If you use and choose a non-US keyboard layout, you may load a
different one before we go on. E.g., for the Swiss keyboard layout

<div class="org-src-container">
<pre class="src src-bash">localectl list-keymaps | grep CH
loadkeys de_CH-latin1
</pre>
</div>

For your eyesight, it might also be advantageous to use a bigger
font (`ter-132n` is best suited for Hi-DPI screens, if this turns
out to be too big, choose a smaller font size such as `ter-128b`,
`ter-124b`, `ter-120b`, `ter-114b` etc.)

<div class="org-src-container">
<pre class="src src-bash">setfont ter-132b
</pre>
</div>


<a id="org2c6cde9"></a>

##### Boot mode

First, we check whether we are booted in EFI mode (which most
modern machines should do on default). If the following command
creates any output, you are indeed booted in EFI mode. If not, you
may have to change some settings in your BIOS or consult the Arch
wiki for a CMS-mode installation guide.

<div class="org-src-container">
<pre class="src src-bash">ls /sys/firmware/efi/efivars
</pre>
</div>


<a id="orgd6a46bf"></a>

##### Internet connection

Then, we test for an internet connection. To make your life easy, I
recommend an ethernet connection, rather than wifi.

<div class="org-src-container">
<pre class="src src-bash">ping -c 3 archlinux.org
</pre>
</div>

If the ping doesn't work, inspect your network devices

<div class="org-src-container">
<pre class="src src-bash">ip -c link
</pre>
</div>

and if necessary activate the device of your choice.


<a id="org3f799a2"></a>

##### Update the mirrorlist

Once, the internet connection has been verified, ensure the system
clock is accurate

<div class="org-src-container">
<pre class="src src-bash">timedatectl set-ntp true
timedatectl status
</pre>
</div>

and update your package manager's mirrorlist for optimal download
speeds (change specifics for your locale)

<div class="org-src-container">
<pre class="src src-bash">pacman -Syy
reflector -c Switzerland -a 6 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
pacman -Syy
</pre>
</div>


<a id="orge16182b"></a>

#### Disk partitioning and formatting

Here, you have to make several decisions:

-   Which disk(s) should contain the installation?
    -   NVMe devices usually have `/dev/nvme0n1`, `/dev/nvme1n1`&#x2026;
    -   SATA devices usually have `/dev/sda`, `/dev/sdb`&#x2026;
-   What partitioning layout do you want to use?
    -   a root `/` and an EFI system partition `/efi` are minimally
        required
    -   it is generally advisable to have a separate `/home` partition (or
        subvolume), in order to easily reinstall or restore Arch without
        any data loss. (Note: it is still possible without a separate
        home partition, but probably comes with headaches.)
    -   a `swap` partition is always a good idea, even if you have
        enough RAM, say 64GB ;). The linux kernel moves memory pages
        that are hardly ever used to swap space to ensure that enough
        RAM is available for more frequently used ones. Alternatively,
        you can use swap on zram (see the [zramd](https://aur.archlinux.org/packages/zramd/) package on the AUR), if
        you prefer to save disk space.
-   What filesystem do you want to use?
    -   most stable and efficient filesystem probably is `ext4`
    -   a more modern (and younger) filesystem is `btrfs`. It has
        advanced features such as Copy-on-Write, self-healing, device
        pooling, and nearly-instant snapshotting capabilities (this
        is what I personally find most useful, especially for rolling
        release distributions such as Arch)


Note that for optimal long-term performance of older SSD and NVMe
drives, it is recommended to manually "over-provision" (leave
some free space, typically about 10%). Most drives these days
come OP from the factory, which is the reason why the capacity of
such drives is usually lower than advertised.

To people whose utmost priority is stability, I would probably
recommend sticking with the "classic" partitioning scheme:

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">device</th>
<th scope="col" class="org-left">filesystem</th>
<th scope="col" class="org-left">mount point</th>
<th scope="col" class="org-left">size</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">sda1</td>
<td class="org-left">ESP   (ef00)</td>
<td class="org-left">{/mnt}/boot or {/mnt}/efi</td>
<td class="org-left">+512M</td>
</tr>


<tr>
<td class="org-left">sda2</td>
<td class="org-left">swap  (8200)</td>
<td class="org-left">[SWAP]</td>
<td class="org-left">+8G</td>
</tr>


<tr>
<td class="org-left">sda3</td>
<td class="org-left">linux (8300)</td>
<td class="org-left">{<i>mnt}</i></td>
<td class="org-left">+64G</td>
</tr>


<tr>
<td class="org-left">sda4</td>
<td class="org-left">linux (8300)</td>
<td class="org-left">{/mnt}/home</td>
<td class="org-left">rest</td>
</tr>
</tbody>
</table>

This example assumes a 1 TB drive, so adjust the size of the
partitions appropriately if your device differs. The ESP needs at
least 300M and swap at least 512M. I prefer `/mnt/efi` as mount
point for the ESP, but this could create problems for some boot
managers which look in the `/boot` directory. `grub` can boot
from anywhere though (when configured correctly).

However, Arch while by no means "unstable", is probably not the
first choice for people whose highest priority is stability
anyways. Hence, my personal recommendation is a less conventional
partitioning scheme using the `btrfs` filesystem. For simplicity
and brevity, I skip drive encryption in this post altogether, but
I might post something in the future about booting from a fully
encrypted drive (or see my [arch-install.org](https://github.com/phdenzel/dotfiles/blob/master/installers/arch-install.org) guide for a less
structured introduction to encryption).

My preferred partitioning scheme for a btrfs system is

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">device</th>
<th scope="col" class="org-left">filesystem</th>
<th scope="col" class="org-left">mount point</th>
<th scope="col" class="org-left">size</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">sda1</td>
<td class="org-left">EFI   (ef00)</td>
<td class="org-left">{/mnt}/efi</td>
<td class="org-left">+512M</td>
</tr>


<tr>
<td class="org-left">sda2</td>
<td class="org-left">swap  (8200)</td>
<td class="org-left">[SWAP]</td>
<td class="org-left">+8G</td>
</tr>


<tr>
<td class="org-left">sda3</td>
<td class="org-left">linux (8300)</td>
<td class="org-left">{<i>mnt}</i></td>
<td class="org-left">rest</td>
</tr>
</tbody>
</table>

Here, we don't create a separate home partition, because we
generate individual btrfs subvolumes which can also be mounted
separately. With btrfs, we can also use device pooling to set up
RAID systems.  Snapshotting programs such as `timeshift` assume a
certain structure of `btrfs` subvolumes. By creating incompatible
subvolumes, we can selectively exclude something from snapshots
such as temporary (and unimportant) data on mount-points `/tmp`
and `/var`. If you rather prefer these included in the snapshots,
simply don't add them as subvolumes.

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">btrfs subvolume</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">@</td>
</tr>


<tr>
<td class="org-left">@home</td>
</tr>


<tr>
<td class="org-left">@var</td>
</tr>


<tr>
<td class="org-left">@tmp</td>
</tr>


<tr>
<td class="org-left">@snapshots</td>
</tr>
</tbody>
</table>

To begin the paritioning of the drive, we use `gdisk`

<div class="org-src-container">
<pre class="src src-bash">gdisk /dev/sda
<span style="color: #8A8A8A;"># </span><span style="color: #8A8A8A;">generate a GPT table</span>
&gt; o
<span style="color: #8A8A8A;"># </span><span style="color: #8A8A8A;">create a EFI partition</span>
&gt; n, 1, &lt;Enter&gt;, +512M, ef00
<span style="color: #8A8A8A;"># </span><span style="color: #8A8A8A;">create swap partition</span>
&gt; n, 2, &lt;Enter&gt;, +8G, 8200
<span style="color: #8A8A8A;"># </span><span style="color: #8A8A8A;">create root partition</span>
&gt; n, 3, &lt;Enter&gt;, &lt;Enter&gt;, &lt;Enter&gt; (or 8300)
<span style="color: #8A8A8A;"># </span><span style="color: #8A8A8A;">write scheme to disk and exit</span>
&gt; w, Y
</pre>
</div>

Confirm that the drive was correctly partitioned using

<div class="org-src-container">
<pre class="src src-bash">lsblk -o NAME,PATH,FSTYPE,FSSIZE,MOUNTPOINT
</pre>
</div>

You should now see multiple paritions on `/dev/sda`, e.g.
`/dev/sda1` for the boot partition, `/dev/sda2` for the swap
partition, and `/dev/sda3` for the root partition. Once done,
format the partitions using

<div class="org-src-container">
<pre class="src src-bash">mkfs.fat -F 32 /dev/sda1
mkswap /dev/sda2
swapon /dev/sda2
mkfs.btrfs /dev/sda3
</pre>
</div>

If you decided to go with a RAID system simply add the drives to
the last command, i.e. `mkfs.btrfs /dev/sda3 /dev/sdb /dev/sdc
     ...`

Create the subvolumes of the `btrfs` filesystem you just formatted.

<div class="org-src-container">
<pre class="src src-bash">mount /dev/sda3 /mnt
<span style="color: #46D9FF;">cd</span> /mnt
btrfs subvolume create @
btrfs subvolume create @home
btrfs subvolume create @var
btrfs subvolume create @tmp
btrfs subvolume create @snapshots
<span style="color: #46D9FF;">cd</span>
umount /mnt
</pre>
</div>

Then, create the folders and mount the partitions
accordingly. Note: if you want to create the home partition or
subvolume on a separate filesystem, you have to `cd` out of the
`/mnt` directory, unmount the previous partition, and mount the
other disk to `/mnt`. On RAID systems this doesn't matter as
multiple drives form a single filesystem.

<div class="org-src-container">
<pre class="src src-bash">mkdir -p /mnt{efi,home,var,tmp,snapshots}
mount -o noatime,<span style="color: #FDB760;">compress</span>=zstd,<span style="color: #FDB760;">space_cache</span>=v2,<span style="color: #FDB760;">discard</span>=async,<span style="color: #FDB760;">subvol</span>=@ /dev/sda3 /mnt
mount -o noatime,<span style="color: #FDB760;">compress</span>=zstd,<span style="color: #FDB760;">space_cache</span>=v2,<span style="color: #FDB760;">discard</span>=async,<span style="color: #FDB760;">subvol</span>=@home /dev/sda3 /mnt/home
mount -o noatime,<span style="color: #FDB760;">compress</span>=zstd,<span style="color: #FDB760;">space_cache</span>=v2,<span style="color: #FDB760;">discard</span>=async,<span style="color: #FDB760;">subvol</span>=@var /dev/sda3 /mnt/var
mount -o noatime,<span style="color: #FDB760;">compress</span>=zstd,<span style="color: #FDB760;">space_cache</span>=v2,<span style="color: #FDB760;">discard</span>=async,<span style="color: #FDB760;">subvol</span>=@tmp /dev/sda3 /mnt/tmp
mount -o noatime,<span style="color: #FDB760;">compress</span>=zstd,<span style="color: #FDB760;">space_cache</span>=v2,<span style="color: #FDB760;">discard</span>=async,<span style="color: #FDB760;">subvol</span>=@snapshots /dev/sda3 /mnt/snapshots
mount /dev/sda1 /mnt/efi
</pre>
</div>

Note that `space_cache=v2` is designed for large filesystems
(above TB), but it is quite new and thus may be less stable.


<a id="orgb3afe8e"></a>

#### Base install

Once everything is correctly partitioned, formatted, and mounted,
we use `pacstrap` to install the base system, linux kernel and
necessary firmware for the machine. Note, for AMD processors use
`amd-ucode` instead of the intel microcode update image. If you
chose the classic partitioning layout, there is also no need for
`btrfs-progs`.

If stability is of utmost importance, the linux-lts kernel is the
way to go. For steam and other high-performance tasks the
linux-zen kernel is optimal. If at some later point another
kernel is needed, it is always possible to install another
alongside your main kernel.

<div class="org-src-container">
<pre class="src src-bash">pacstrap /mnt base linux linux-firmware intel-ucode git vim btrfs-progs
</pre>
</div>

Once the base install has finished, we generate the filesystem table
which tells the system on reboot what drives to mount and how

<div class="org-src-container">
<pre class="src src-bash">genfstab -U /mnt &gt;&gt; /mnt/etc/fstab
cat /mnt/etc/fstab
</pre>
</div>


<a id="orgc6686f8"></a>

#### `chroot` into `/mnt` and set up the host

First chroot into the installation to finish setting up the host.

<div class="org-src-container">
<pre class="src src-bash">arch-chroot /mnt
</pre>
</div>

This changes the root and effectively replaces `/mnt` with `/`.


<a id="org71f3e69"></a>

##### Time clock, locale, and keyboard layout

Next, we have to configure the timezone, system language, and
keymap, which will be dependent on your location and preference.

For me the timezone is Zurich

<div class="org-src-container">
<pre class="src src-bash">ln -sf /usr/share/zoneinfo/Europe/Zurich /etc/localtime
hwclock --systohc
</pre>
</div>

this generates a symlink to `/etc/localtime` and a file
`/etc/adjtime` which ensures the system clock is correctly
synchronized.

For the language, I prefer english. In some rare cases, programs
(for instance steam) require the `en_US.UTF-8` locale, so it's
best to use at least that one. Note that multiple locales are
allowed. The locales are generated by uncommenting the
corresponding lines in `/etc/locale.gen` and using the
`local-gen` command.

<div class="org-src-container">
<pre class="src src-bash">sed -i <span style="color: #44BC84;">'177s/.//'</span> /etc/locale.gen  <span style="color: #8A8A8A;"># </span><span style="color: #8A8A8A;">uncomments en_US.UTF-8 UTF-8</span>
locale-gen
<span style="color: #46D9FF;">echo</span> <span style="color: #44BC84;">"LANG=en_US.UTF-8"</span> &gt;&gt; /etc/locale.conf
</pre>
</div>

Arch assumes a US keyboard layout by default, so if you choose to
use a different layout, say a Swiss keyboard, use

<div class="org-src-container">
<pre class="src src-bash"><span style="color: #46D9FF;">echo</span> <span style="color: #44BC84;">"KEYMAP=de_CH-latin1"</span> &gt;&gt; /etc/vconsole.conf
</pre>
</div>


<a id="org6a913c1"></a>

##### Set the hostname

Again, setting the hostname for the machine is a personal
choice. I tend to use names of mystical or mythological
creatures, some use names from fantasy books or movies such as
the Lord of the Rings, and others simply use the product name of
the machine.

In this example, I'll call my host `wolpertinger` ;)

<div class="org-src-container">
<pre class="src src-bash"><span style="color: #46D9FF;">echo</span> <span style="color: #44BC84;">"wolpertinger"</span> &gt;&gt; /etc/hostname
<span style="color: #46D9FF;">echo</span> <span style="color: #44BC84;">"127.0.0.1 localhost"</span> &gt;&gt; /etc/hosts
<span style="color: #46D9FF;">echo</span> <span style="color: #44BC84;">"::1       localhost"</span> &gt;&gt; /etc/hosts
<span style="color: #46D9FF;">echo</span> <span style="color: #44BC84;">"127.0.1.1 wolpertinger.localdomain wolpertinger"</span> &gt;&gt; /etc/hosts
</pre>
</div>

If you haven't already done so, this is a good time to set the
password for the root (strong(=long) and random passwords are
best from a security perspective).  Sometimes, it is more
convenient to `ssh` into a new machine and install Arch from a
remote shell, which would have required you to install `openssh`
and set the root password beforehand.

<div class="org-src-container">
<pre class="src src-bash">passwd
</pre>
</div>


<a id="org67f51b6"></a>

##### Initramfs

In case you decided to use btrfs and/or encryption, you need to
regenerate the initramfs with some modifications. In
`/etc/mkinitcpio.conf`, add `btrfs` to the `MODULES` list.
Later, we will also have to add another hook to the `HOOKS` list
to enable snapshots showing up in the grub boot menu.

In `/etc/mkinitcpio.conf` add

<div class="org-src-container">
<pre class="src src-conf"><span style="color: #FDB760;">MODULES</span>=(btrfs)
</pre>
</div>

and regenerate the initramfs image with

<div class="org-src-container">
<pre class="src src-bash">mkinitcpio -P
</pre>
</div>


<a id="org6d77b7c"></a>

#### Package installs

Installing packages is always possible at a later point, and with
time you'll install many more. However, some packages are
necessary to make the base system usable. Here is a list which I
consider minimally necessary to more or less "conveniently"
operate your desktop from the tty after reboot.

<div class="org-src-container">
<pre class="src src-bash">pacman -S grub grub-btrfs efibootmgr dosfstools mtools dialog base-devel linux-headers xdg-utils networkmanager wpa_supplicant alsa-utils pulseaudio
</pre>
</div>

this ensures you have a boot manager and basic control over your
file systems, network, and audio.  For more functionality such as
bash completion, more console fonts, ssh, bluetooth, wifi, and
printer system you may add

<div class="org-src-container">
<pre class="src src-bash">pacman -S bash-completion terminus-fonts openssh bluez bluez-utils blueman wireless_tools pulseaudio-bluetooth pavucontrol cups
</pre>
</div>

I curate a much longer list of packages which I typically use to
install all of my packages at this point (see [arch.sh](https://github.com/phdenzel/dotfiles/blob/master/installers/arch.sh) for
details).


<a id="org249017b"></a>

##### Add another user

Once you installed all the necessary packages, add yourself as
user. It is generally advisable to create at least another user
which is not root.  Add the user to any group that is required.
My username is always `phdenzel`, change accordingly in the
following commands

<div class="org-src-container">
<pre class="src src-bash">useradd -m phdenzel
passwd phdenzel
usermod -aG wheel,audio,video,optical,storage phdenzel
<span style="color: #46D9FF;">echo</span> <span style="color: #44BC84;">"phdenzel ALL=(ALL) ALL"</span> &gt;&gt; /etc/sudoers.d/phdenzel
</pre>
</div>


<a id="org1a206bd"></a>

#### Boot loader

In the previous step, you installed the `grub` package.  Now it's
time to install the boot loader and configure it.

<div class="org-src-container">
<pre class="src src-bash">grub-install --target=x86_64-efi --efi-directory=/efi --boot-directory=/efi --bootloader-id=GRUB
</pre>
</div>

Any changes to the GRUB boot menu can be made in
`/etc/defaults/grub`. In my case, I use an Nvidia card. Nvidia
drivers unfortunately don’t play well with the kernel
framebuffer, which makes setting resolutions of the tty a
nightmare. For me, the solution was to disable CSM in the UEFI
BIOS and changing/adding the following lines

<div class="org-src-container">
<pre class="src src-conf"><span style="color: #FDB760;">GRUB_CMDLINE_LINUX_DEFAULT</span>=<span style="color: #44BC84;">"loglevel=3 quiet nvidia-drm.modeset=1"</span>
<span style="color: #FDB760;">GRUB_GFXMODE</span>=2560x1440x32,1920x1080x32,auto
<span style="color: #FDB760;">GRUB_GFXPAYLOAD_LINUX</span>=keep
<span style="color: #FDB760;">GRUB_FONT</span>=/efi/grub/fonts/ter-32b.pf2
</pre>
</div>

For this to work however, we have to install the font for grub

<div class="org-src-container">
<pre class="src src-bash">grub-mkfont -o /efi/grub/fonts/ter-32b.pf2 /usr/share/fonts/misc/ter-u32b.otb
</pre>
</div>

Once all the changes to the grub defaults have been made, install
them to the ESP partition

<div class="org-src-container">
<pre class="src src-bash">grub-mkconfig -o /efi/grub/grub.cfg
</pre>
</div>


<a id="orgc14af42"></a>

#### Final touches

Before we boot into our new machine, I suggest already enabling
services which are critical for operation post-boot.

<div class="org-src-container">
<pre class="src src-bash">systemctl enable reflector.timer
systemctl enable NetworkManager
systemctl enable bluetooth
systemctl enable cups.service
systemctl enable sshd
systemctl enable fstrim.timer
</pre>
</div>

Naturally, if you skipped installing any of the above packages,
these system services cannot be enabled.

I also like the package manager to have colorized output which
can be activated by uncommenting a line in `/etc/pacman.conf`

<div class="org-src-container">
<pre class="src src-bash">sudo sed -i <span style="color: #44BC84;">'s/#Color/Color/g'</span> /etc/pacman.conf
</pre>
</div>


<a id="org3fe88f7"></a>

##### `grub-btrfs`

Additionally, if you chose to install `grub-btrfs`, you also need
to change the path of the ESP in the configuration file
`/etc/default/grub-btrfs/config`

<div class="org-src-container">
<pre class="src src-conf"><span style="color: #FDB760;">GRUB_BTRFS_GRUB_DIRNAME</span>=<span style="color: #44BC84;">"/efi/grub"</span>
</pre>
</div>

Remember to update the grub configuration with `grub-mkconfig -o
     /efi/grub/grub.cfg` and add the initramfs hook at the end to be
able to boot read-only snapshots

<div class="org-src-container">
<pre class="src src-conf"><span style="color: #FDB760;">HOOKS</span>=(... grub-btrfs-overlayfs)
</pre>
</div>

Afterwars we need to regenerate the image again with `mkinitcpio
     -P`.


<a id="orgd887ffe"></a>

##### Reboot

Once everything is installed and configured, exit the chroot,
unmount everything, and reboot.

<div class="org-src-container">
<pre class="src src-bash"><span style="color: #E83A82;">exit</span>
umount -a
reboot
</pre>
</div>

If during the unmounting you receive some warning messages,
simply ignore them.

Once rebooted, you should be able to log into a complete
installation of Arch Linux on the tty. Of course, there are steps
one can take to further set up an Arch installation (besides
installing XMonad), but we will stop here. If you are interested
in how I further configured my machines, have a look at
[arch-setup.org](https://github.com/phdenzel/dotfiles/blob/master/installers/arch-setup.org).


<a id="org749b0d4"></a>

### XMonad

On Linux you can install a complete desktop environment such as
GNOME or KDE, and you should have a graphical platform equivalent
to something macOS or Windows offers. Computers with components
from this (or the last) decade should be powerful enough to easily
handle such a desktop environment. However, there is an
alternative.

Tiling window managers are designed to complete just a single
task: managing windows. Just like desktop environments, there are
many different tiling window managers such as i3, AwesomeWM, dwm,
Qtile, XMonad, and many more&#x2026; they extend the functionality of
the Xorg window system (also called X or X11). X is the most
widely used window system on UNIX operating systems providing the
basic framework for a GUI environment. Less widely used, with less
compatibility, and still in development, Wayland is a modern
window system alternative to X. The most popular tiling window
manager for Wayland is Sway.

Most tiling window managers have to be extensively configured
either through a configuration file or through patches before
compilation. This makes them less attractive to less experienced
users. The advantage of tiling window managers however, is that
almost none are bloated, and most designed with simplicity and
efficiency in mind. They typically consume less than 300 MB of RAM
when idle, which is around 5 times less than full desktop
environments, leaving more memory for programs which actually need
it. Additionally, they provide a way to define custom keyboard
shortcuts to control different aspects of your window systems,
which - with a bit of muscle memory - makes your workflows
blazingly fast.

While I haven't tried many different tiling window managers, I am
very happy with my current implementation of XMonad written and
configured in the Haskell programming language.

Most people using tiling window managers like to pair them with a
statusbar where arbitrary information can be displayed,
e.g. window name, hardware usage, time and date, and volume. For
XMonad, XMobar is a good choice for a statusbar, but in principle
it is compatible with any other bar as well.


<a id="org2d6cb67"></a>

#### Installing requirements

Before we move on to install and configure XMonad, we have to
refresh the repositories first

<div class="org-src-container">
<pre class="src src-bash">sudo pacman -Syyu
</pre>
</div>

Next, install all necessary xorg-drivers (check all available
drivers with `sudo pacman -Ss xf86-video`; if in doubt simply
install a bunch, the system will choose the right one
automatically). My setup consists of an Intel processor and an
Nvidia GPU (proprietary drivers are a thorn in my eye, but for now
I'm stuck with what works)

<div class="org-src-container">
<pre class="src src-bash">sudo pacman -S xf86-video-intel nvidia nvidia-utils nvidia-settings
</pre>
</div>

Make sure to regenerate the initcpio everytime an update of the
nvidia-driver is installed. If you don't want to manually
regenerate it, add a pacman hook `/etc/pacman.d/hooks/nvidia.hook`
to ensure triggering the initramfs update automatically

<div class="org-src-container">
<pre class="src src-conf">[<span style="color: #FFD787;">Trigger</span>]
<span style="color: #FDB760;">Operation</span>=Install
<span style="color: #FDB760;">Operation</span>=Upgrade
<span style="color: #FDB760;">Operation</span>=Remove
<span style="color: #FDB760;">Type</span>=Package
<span style="color: #FDB760;">Target</span>=nvidia
<span style="color: #FDB760;">Target</span>=linux

[<span style="color: #FFD787;">Action</span>]
<span style="color: #FDB760;">Description</span>=Update Nvidia module in initcpio
<span style="color: #FDB760;">Depends</span>=mkinitcpio
<span style="color: #FDB760;">When</span>=PostTransaction
NeedsTargets
<span style="color: #FDB760;">Exec</span>=/bin/sh -c <span style="color: #44BC84;">'while read -r trg; do case $trg in linux) exit 0; esac; done; /usr/bin/mkinitcpio -P'</span>
</pre>
</div>

There are a few requirements XMonad and XMobar need before we can
start with the compilation

<div class="org-src-container">
<pre class="src src-bash">sudo pacman -S stack xorg-server xorg-apps xorg-xinit xterm xorg-xmessage xorg-xrandr libx11 libxft libxinerama libxrandr libxss pkgconf wireless_tools
</pre>
</div>

`stack` is strictly speaking not necessary, but provides an easy
way to compile and install XMonad and xmobar from a sandboxed
environment.


<a id="orgd645a71"></a>

#### Compiling from source

While it is technically possible to install `xmonad`,
`xmonad-contrib` (a few community-driven extensions to `xmonad`)
and `xmobar` via `pacman`, I prefer to compile them from source
myself in order to be able to update to the latest version at any
time. This may take a bit longer than simply installing it with
the package manager, but it opens up more options for
configurability.

So, first download the source code from GitHub and initialize a
stack environment

<div class="org-src-container">
<pre class="src src-bash">mkdir ~/xmonad
<span style="color: #46D9FF;">cd</span> ~/xmonad
stack setup
stack upgrade
git clone git@github.com:xmonad/xmonad.git
git clone git@github.com:xmonad/xmonad-contrib.git
git clone git@github.com:jaor/xmobar.git
stack init
</pre>
</div>

this creates the file `~/xmonad/stack.yml`. It contains all the
information (external library paths, flags, etc.) needed for the
compilation. If there are no special flags you want to use for
the compilation, there are no changes necessary before
proceeding. I use several "plugins" for the XMobar statusbar
which require additional flags. My `stack.yml` file therefore
looks like this

<div class="org-src-container">
<pre class="src src-conf">packages:
- xmobar
- xmonad
- xmonad-contrib

extra-deps:
- netlink-1.1.1.0

flags:
  xmobar:
    all_extensions: true
</pre>
</div>

Finally, we can compile and install XMonad and xmobar with

<div class="org-src-container">
<pre class="src src-bash">stack install
</pre>
</div>

This should have installed the executables `xmonad` and `xmobar`
in `~/.local/bin`.

<div class="org-src-container">
<pre class="src src-bash">sudo ln -s ~/.local/bin/xmonad /usr/bin
</pre>
</div>


<a id="org2bb7e91"></a>

#### Configuring XMonad

XMonad uses a haskell file for on-the-fly configuration. For
newer versions the configuration file is placed in
`~/.config/xmonad/`, for older versions in `~/.xmonad/`.

For now, create `xmonad.hs` in the configuration folder with the
following content

<div class="org-src-container">
<pre class="src src-haskell"><span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad</span>

<span style="color: #5F8AF7;">main</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">IO</span><span style="color: #FFD787;">()</span>
<span style="color: #5F8AF7;">main</span> <span style="color: #FDB760;">=</span> xmonad def
</pre>
</div>

this will use XMonad's default configurations.

Since we used `stack` to build XMonad, we have to tell it how to
recompile its executable with the current configuration. Place a
file with the name `build` in the configuration folder with the
following content

<div class="org-src-container">
<pre class="src src-bash"><span style="color: #8A8A8A;">#</span><span style="color: #8A8A8A;">!/bin/</span><span style="color: #E83A82;">bash</span>

<span style="color: #E83A82;">exec</span> stack --stack-yaml $<span style="color: #FDB760;">HOME</span>/xmonad/stack.yaml <span style="color: #44BC84;">\</span>
     ghc -- <span style="color: #44BC84;">\</span>
     --make xmonad.hs <span style="color: #44BC84;">\</span>
     -i <span style="color: #44BC84;">\</span>
     -ilib <span style="color: #44BC84;">\</span>
     -dynamic <span style="color: #44BC84;">\</span>
     -fforce-recomp <span style="color: #44BC84;">\</span>
     -main-is main <span style="color: #44BC84;">\</span>
     -v0 <span style="color: #44BC84;">\</span>
     -o <span style="color: #44BC84;">"$1"</span>
</pre>
</div>

If you would launch `xmonad` in the current state, you would see
a blank screen, and have only basic functionality.

To add more functionality, you will have to change the
configuration file. The best resource for this is the official
guide on the [xmonad.org](https://xmonad.org/TUTORIAL.html) website and the [haskell package
repository](https://hackage.haskell.org/package/xmonad).

First thing I changed, was to remap the mod key to the Super (or
"Windows") key instead of Alt.

<div class="org-src-container">
<pre class="src src-haskell"><span style="color: #5F8AF7;">main</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">IO</span> <span style="color: #FFD787;">()</span>
<span style="color: #5F8AF7;">main</span> <span style="color: #FDB760;">=</span> xmonad <span style="color: #FDB760;">$</span> def
   {
       modMask <span style="color: #FDB760;">=</span> mod4Mask  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Rebind Mod to the Super key</span>
   }
</pre>
</div>

My full configuration is quite lengthy, but here is a snapshot of
it anyways.  If you're interested, read through it and feel free
to copy anything you find useful. It is a work in eternal
progress&#x2026; so if you're reading this post long after it is
published, rather have a look at the current version in my
[dotfiles/.config/xmonad/xmonad.hs](https://github.com/phdenzel/dotfiles/blob/master/.config/xmonad/xmonad.hs). There you'll also find my own
color theme and xmobar configurations.

<div class="org-src-container">
<pre class="src src-haskell"><span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">XMonad configurations</span>
<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------</span>

<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Imports</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Base</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">System.IO</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">System.Exit</span>
<span style="color: #E83A82;">import</span> <span style="color: #E83A82;">qualified</span> <span style="color: #FFD787;">XMonad.StackSet</span> <span style="color: #E83A82;">as</span> <span style="color: #FFD787;">W</span>

<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Data</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">Data.Monoid</span>
<span style="color: #E83A82;">import</span> <span style="color: #E83A82;">qualified</span> <span style="color: #FFD787;">Data.Map</span> <span style="color: #E83A82;">as</span> <span style="color: #FFD787;">M</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Hooks</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Hooks.EwmhDesktops</span> (ewmh, ewmhFullscreen)
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Hooks.ManageDocks</span> (docks, manageDocks, avoidStruts,
                                 <span style="color: #FFD787;">ToggleStruts</span>(<span style="color: #FDB760;">..</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Hooks.ManageHelpers</span> (isFullscreen, isDialog,
                                   doFullFloat, doCenterFloat)
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Hooks.StatusBar</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Hooks.StatusBar.PP</span> (wrap, shorten, xmobarColor, xmobarBorder,
                                  <span style="color: #FFD787;">PP</span>(<span style="color: #FDB760;">..</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Hooks.RefocusLast</span> (refocusLastLogHook)
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Hooks.SetWMName</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Layout</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.Renamed</span> (renamed, <span style="color: #FFD787;">Rename</span>(<span style="color: #FFD787;">Replace</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.ResizableTile</span> (<span style="color: #FFD787;">ResizableTall</span>(<span style="color: #FDB760;">..</span>), <span style="color: #FFD787;">MirrorResize</span>(<span style="color: #FFD787;">MirrorShrink</span>, <span style="color: #FFD787;">MirrorExpand</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.GridVariants</span> (<span style="color: #FFD787;">Grid</span>(<span style="color: #FFD787;">Grid</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.ResizableThreeColumns</span> (<span style="color: #FFD787;">ResizableThreeCol</span>(<span style="color: #FFD787;">ResizableThreeColMid</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.NoBorders</span> (noBorders, smartBorders, withBorder)
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.Spacing</span> (spacingRaw, <span style="color: #FFD787;">Spacing</span>(<span style="color: #FDB760;">..</span>), <span style="color: #FFD787;">Border</span>(<span style="color: #FDB760;">..</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.LayoutModifier</span> (<span style="color: #FFD787;">ModifiedLayout</span>(<span style="color: #FDB760;">..</span>))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Layout.ShowWName</span>

<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Actions</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Actions.PhysicalScreens</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Actions.CycleWS</span> (moveTo, shiftTo, nextScreen, prevScreen,
                               anyWS, ignoringWSs,
                               <span style="color: #FFD787;">Direction1D</span>(<span style="color: #FFD787;">Next</span>, <span style="color: #FFD787;">Prev</span>), <span style="color: #FFD787;">WSType</span>(<span style="color: #FFD787;">WSIs</span>, (<span style="color: #FFD787;">:&amp;:</span>)))
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Actions.WithAll</span> (sinkAll, killAll)
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Utils</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">import XMonad.Util.Dmenu</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Util.EZConfig</span> (mkKeymap, checkKeymap)
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Util.Run</span> (safeSpawn, hPutStrLn)
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Util.SpawnOnce</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Util.Ungrab</span> (unGrab)
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">XMonad.Util.NamedScratchpad</span>
<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">- Customized colors</span>
<span style="color: #E83A82;">import</span> <span style="color: #FFD787;">Colors.PhDDark</span>  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">color[Trayer, Fore, Back, 01..15]</span>


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Variables</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Default programs</span>
<span style="color: #5F8AF7;">myXMobar</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myXMobar</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"xmobar"</span>
<span style="color: #5F8AF7;">myXMobarConf</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myXMobarConf</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">" ~/.config/xmobar/xmobarrc "</span>
<span style="color: #5F8AF7;">myXMobarConf2</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myXMobarConf2</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">" ~/.config/xmobar/xmobarrc2 "</span>
<span style="color: #5F8AF7;">myTerminal</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myTerminal</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"alacritty"</span>
<span style="color: #5F8AF7;">myBrowser</span>  <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myBrowser</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"brave"</span>
<span style="color: #5F8AF7;">myEmacs</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myEmacs</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"emacsclient -c --alternate-editor='emacs'"</span>
<span style="color: #5F8AF7;">myEditor</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myEditor</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"emacsclient -c --alternate-editor='emacs'"</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Style config</span>
<span style="color: #5F8AF7;">myBorderWidth</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">Dimension</span>
<span style="color: #5F8AF7;">myBorderWidth</span> <span style="color: #FDB760;">=</span> 2
<span style="color: #5F8AF7;">myFont</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myFont</span> <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"xft:Fira Mono:regular:size=9:antialias=true:hinting=true"</span>
<span style="color: #5F8AF7;">myNormalColor</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myNormalColor</span> <span style="color: #FDB760;">=</span> colorBack
<span style="color: #5F8AF7;">myFocusColor</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
<span style="color: #5F8AF7;">myFocusColor</span> <span style="color: #FDB760;">=</span> color06
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Mouse controls</span>
<span style="color: #5F8AF7;">myFocusFollowsMouse</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">Bool</span>
<span style="color: #5F8AF7;">myFocusFollowsMouse</span> <span style="color: #FDB760;">=</span> <span style="color: #FFD787;">False</span>
<span style="color: #5F8AF7;">myClickJustFocuses</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">Bool</span>
<span style="color: #5F8AF7;">myClickJustFocuses</span> <span style="color: #FDB760;">=</span> <span style="color: #FFD787;">False</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Key controls</span>
<span style="color: #5F8AF7;">myModMask</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">KeyMask</span>
<span style="color: #5F8AF7;">myModMask</span> <span style="color: #FDB760;">=</span> mod4Mask  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Super-mod4Mask | L-Alt-mod1Mask | R-Alt-mod3Mask</span>


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Main</span>
<span style="color: #5F8AF7;">main</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">IO</span> <span style="color: #FFD787;">()</span>
<span style="color: #5F8AF7;">main</span> <span style="color: #FDB760;">=</span> <span style="color: #E83A82;">do</span>
  xmonad <span style="color: #FDB760;">$</span>
    ewmhFullscreen <span style="color: #FDB760;">.</span> ewmh <span style="color: #FDB760;">.</span> docks <span style="color: #FDB760;">$</span>
    dynamicSBs xmobarSpawn myConfigs


<span style="color: #5F8AF7;">myConfigs</span> <span style="color: #FDB760;">=</span> def
    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">simple stuff</span>
  { terminal           <span style="color: #FDB760;">=</span> myTerminal
  , focusFollowsMouse  <span style="color: #FDB760;">=</span> myFocusFollowsMouse
  , clickJustFocuses   <span style="color: #FDB760;">=</span> myClickJustFocuses
  , borderWidth        <span style="color: #FDB760;">=</span> myBorderWidth
  , modMask            <span style="color: #FDB760;">=</span> myModMask
  , workspaces         <span style="color: #FDB760;">=</span> myWorkspaces
  , normalBorderColor  <span style="color: #FDB760;">=</span> myNormalColor
  , focusedBorderColor <span style="color: #FDB760;">=</span> myFocusColor

    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">key bindings</span>
  , keys               <span style="color: #FDB760;">=</span> myKeys
  , mouseBindings      <span style="color: #FDB760;">=</span> myMouseBindings

    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">hooks, layouts</span>
  , startupHook        <span style="color: #FDB760;">=</span> myStartupHook
  , layoutHook         <span style="color: #FDB760;">=</span> myLayoutHook  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">showWName' myShowWNameTheme $ </span>
  , manageHook         <span style="color: #FDB760;">=</span> myManageHook
  , handleEventHook    <span style="color: #FDB760;">=</span> myEventHook
  , logHook            <span style="color: #FDB760;">=</span> myLogHook
}


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Startup hook</span>
<span style="color: #5F8AF7;">myStartupHook</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">X</span><span style="color: #FFD787;">()</span>
<span style="color: #5F8AF7;">myStartupHook</span> <span style="color: #FDB760;">=</span> <span style="color: #E83A82;">do</span>
  spawn     <span style="color: #44BC84;">"killall trayer"</span>
  spawnOnce <span style="color: #44BC84;">"resolution_2x11 &amp;"</span>                <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">set screen resolution using xrandr</span>
  spawnOnce <span style="color: #44BC84;">"xsetroot -cursor_name left_ptr &amp;"</span> <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">set cursor</span>
  spawnOnce <span style="color: #44BC84;">"xset r rate 180 35 &amp;"</span>             <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">increase scroll speed</span>
  spawnOnce <span style="color: #44BC84;">"xrgb -merge ~/.Xresources &amp;"</span>      <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">load x resources</span>
  spawnOnce <span style="color: #44BC84;">"xmodmap ~/.Xmodmap &amp;"</span>             <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">load x modmap</span>
  spawnOnce <span style="color: #44BC84;">"picom &amp;"</span>                          <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">start compositor</span>
  spawnOnce <span style="color: #44BC84;">"~/.config/feh/fehbg &amp;"</span>            <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">set wallpaper</span>
  spawnOnce <span style="color: #44BC84;">"xscreensaver -no-splash &amp;"</span>        <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">xscreensaver daemon</span>
  spawnOnce <span style="color: #44BC84;">"/usr/bin/emacs --daemon &amp;"</span>        <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Emacs daemon</span>
  spawn     (<span style="color: #44BC84;">"sleep 2 &amp;&amp; trayer --edge top --align right --widthtype request "</span>
             <span style="color: #FDB760;">++</span> <span style="color: #44BC84;">"--padding 6 --SetDockType true --SetPartialStrut true "</span>
             <span style="color: #FDB760;">++</span> <span style="color: #44BC84;">"--expand true --transparent true --alpha 0 --height 28 "</span>
             <span style="color: #FDB760;">++</span> <span style="color: #44BC84;">"--iconspacing 12 "</span>
             <span style="color: #FDB760;">++</span> colorTrayer
             <span style="color: #FDB760;">++</span> <span style="color: #44BC84;">"&amp;"</span>
            )
  spawn     <span style="color: #44BC84;">"blueman-applet"</span>
  spawn     <span style="color: #44BC84;">"nm-applet"</span>
  spawnOnce <span style="color: #44BC84;">"volumeicon"</span>
  spawnOnce <span style="color: #44BC84;">"licht -a &amp;"</span>
  setWMName <span style="color: #44BC84;">"LG3D"</span>  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Java hack</span>
  return <span style="color: #FFD787;">()</span> <span style="color: #FDB760;">&gt;&gt;</span> checkKeymap myConfigs myKeymap


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Workspaces</span>
<span style="color: #5F8AF7;">myWorkspaces</span> <span style="color: #FDB760;">::</span> [<span style="color: #FFD787;">WorkspaceId</span>]
<span style="color: #5F8AF7;">myWorkspaces</span> <span style="color: #FDB760;">=</span> [<span style="color: #44BC84;">"wm"</span>, <span style="color: #44BC84;">"tty"</span>, <span style="color: #44BC84;">"dev"</span>, <span style="color: #44BC84;">"web"</span>, <span style="color: #44BC84;">"doc"</span>, <span style="color: #44BC84;">"mu"</span>, <span style="color: #44BC84;">"tx"</span>, <span style="color: #44BC84;">"gx"</span>, <span style="color: #44BC84;">"ls"</span>]
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">myWorkspaces    = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">myWorkspaces = ["&lt;fn=3&gt;\xf036&lt;/fn&gt;", "&lt;fn=3&gt;\xf120&lt;/fn&gt;", "&lt;fn=3&gt;\xf121&lt;/fn&gt;",</span>
<span style="color: #8A8A8A;">--                 </span><span style="color: #8A8A8A;">"&lt;fn=3&gt;\xf7a2&lt;/fn&gt;", "&lt;fn=3&gt;\xf01c&lt;/fn&gt;", "&lt;fn=3&gt;\xf1c0&lt;/fn&gt;",</span>
<span style="color: #8A8A8A;">--                 </span><span style="color: #8A8A8A;">"&lt;fn=3&gt;\xf56b&lt;/fn&gt;", "&lt;fn=3&gt;\xf441&lt;/fn&gt;", "&lt;fn=3&gt;\xf038&lt;/fn&gt;"]</span>
<span style="color: #5F8AF7;">myWorkspaceIndices</span> <span style="color: #FDB760;">=</span> M.fromList <span style="color: #FDB760;">$</span> zipWith <span style="color: #FFD787;">(,)</span> myWorkspaces [1<span style="color: #FDB760;">..</span>]

<span style="color: #5F8AF7;">myShowWNameTheme</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">SWNConfig</span>  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">for indicators when switching workspaces</span>
<span style="color: #5F8AF7;">myShowWNameTheme</span> <span style="color: #FDB760;">=</span> def
    { swn_font              <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"xft:Ubuntu:bold:size=32"</span>
    , swn_fade              <span style="color: #FDB760;">=</span> 1.0
    , swn_bgcolor           <span style="color: #FDB760;">=</span> colorBack
    , swn_color             <span style="color: #FDB760;">=</span> color07
    }

<span style="color: #5F8AF7;">windowCount</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">X</span> (<span style="color: #FFD787;">Maybe</span> <span style="color: #FFD787;">String</span>)  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">count open windows on workspaces</span>
<span style="color: #5F8AF7;">windowCount</span> <span style="color: #FDB760;">=</span> gets <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">Just</span> <span style="color: #FDB760;">.</span> show <span style="color: #FDB760;">.</span> length <span style="color: #FDB760;">.</span> W.integrate' <span style="color: #FDB760;">.</span> W.stack <span style="color: #FDB760;">.</span> W.workspace <span style="color: #FDB760;">.</span> W.current <span style="color: #FDB760;">.</span> windowset


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Layouts</span>
<span style="color: #5F8AF7;">mySpacing</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">Integer</span> <span style="color: #FDB760;">-&gt;</span> l a <span style="color: #FDB760;">-&gt;</span> <span style="color: #FFD787;">XMonad.Layout.LayoutModifier.ModifiedLayout</span> <span style="color: #FFD787;">Spacing</span> l a
<span style="color: #5F8AF7;">mySpacing</span> i <span style="color: #FDB760;">=</span> spacingRaw <span style="color: #FFD787;">True</span> (<span style="color: #FFD787;">Border</span> i i i i) <span style="color: #FFD787;">True</span> (<span style="color: #FFD787;">Border</span> i i i i) <span style="color: #FFD787;">True</span>

<span style="color: #5F8AF7;">tall</span> <span style="color: #FDB760;">=</span> renamed [<span style="color: #FFD787;">Replace</span> <span style="color: #44BC84;">"tall"</span>]
       <span style="color: #FDB760;">$</span> avoidStruts
       <span style="color: #FDB760;">$</span> smartBorders
       <span style="color: #FDB760;">$</span> mySpacing 3
       <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">ResizableTall</span> nmaster delta ratio <span style="color: #FFD787;">[]</span>
  <span style="color: #E83A82;">where</span>
    nmaster <span style="color: #FDB760;">=</span> 1   <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">number of master pane windows</span>
    ratio <span style="color: #FDB760;">=</span> 1<span style="color: #FDB760;">/</span>2   <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">area ratio of master pane</span>
    delta <span style="color: #FDB760;">=</span> 3<span style="color: #FDB760;">/</span>100 <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">percentual resizing increment</span>

<span style="color: #5F8AF7;">grid</span> <span style="color: #FDB760;">=</span> renamed [<span style="color: #FFD787;">Replace</span> <span style="color: #44BC84;">"grid"</span>]
       <span style="color: #FDB760;">$</span> avoidStruts
       <span style="color: #FDB760;">$</span> smartBorders
       <span style="color: #FDB760;">$</span> mySpacing 3
       <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">Grid</span> (aspect)
  <span style="color: #E83A82;">where</span>
    aspect <span style="color: #FDB760;">=</span> 16<span style="color: #FDB760;">/</span>10  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">desired aspect ratio of windows</span>

<span style="color: #5F8AF7;">mirr</span> <span style="color: #FDB760;">=</span> renamed [<span style="color: #FFD787;">Replace</span> <span style="color: #44BC84;">"mirr"</span>]
       <span style="color: #FDB760;">$</span> avoidStruts
       <span style="color: #FDB760;">$</span> smartBorders
       <span style="color: #FDB760;">$</span> mySpacing 3
       <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">Mirror</span>
       <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">ResizableTall</span> nmaster delta ratio <span style="color: #FFD787;">[]</span>
  <span style="color: #E83A82;">where</span>
    nmaster <span style="color: #FDB760;">=</span> 1
    ratio <span style="color: #FDB760;">=</span> 1<span style="color: #FDB760;">/</span>2
    delta <span style="color: #FDB760;">=</span> 3<span style="color: #FDB760;">/</span>100

<span style="color: #5F8AF7;">c3s</span> <span style="color: #FDB760;">=</span> renamed [<span style="color: #FFD787;">Replace</span> <span style="color: #44BC84;">"c3s"</span>]
      <span style="color: #FDB760;">$</span> avoidStruts
      <span style="color: #FDB760;">$</span> smartBorders
      <span style="color: #FDB760;">$</span> mySpacing 3
      <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">ResizableThreeColMid</span> nmaster delta ratio <span style="color: #FFD787;">[]</span>
  <span style="color: #E83A82;">where</span>
    nmaster <span style="color: #FDB760;">=</span> 1
    ratio <span style="color: #FDB760;">=</span> 1<span style="color: #FDB760;">/</span>2
    delta <span style="color: #FDB760;">=</span> 3<span style="color: #FDB760;">/</span>100

<span style="color: #5F8AF7;">full</span> <span style="color: #FDB760;">=</span> renamed [<span style="color: #FFD787;">Replace</span> <span style="color: #44BC84;">"full"</span>]
       <span style="color: #FDB760;">$</span> avoidStruts
       <span style="color: #FDB760;">$</span> noBorders
       <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">Full</span>

<span style="color: #5F8AF7;">myLayoutHook</span> <span style="color: #FDB760;">=</span> (tall <span style="color: #FDB760;">|||</span> grid <span style="color: #FDB760;">|||</span> mirr <span style="color: #FDB760;">|||</span> c3s <span style="color: #FDB760;">|||</span> full)

<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Scratchpads</span>
<span style="color: #5F8AF7;">myScratchPads</span> <span style="color: #FDB760;">::</span> [<span style="color: #FFD787;">NamedScratchpad</span>]
<span style="color: #5F8AF7;">myScratchPads</span> <span style="color: #FDB760;">=</span> [ <span style="color: #FFD787;">NS</span> <span style="color: #44BC84;">"terminal"</span> spawnTerm findTerm manageTerm
                , <span style="color: #FFD787;">NS</span> <span style="color: #44BC84;">"calculator"</span> spawnCalc findCalc manageCalc
                , <span style="color: #FFD787;">NS</span> <span style="color: #44BC84;">"ranger"</span> spawnRanger findRanger manageRanger
                ]
  <span style="color: #E83A82;">where</span>

    spawnTerm  <span style="color: #FDB760;">=</span> myTerminal <span style="color: #FDB760;">++</span> <span style="color: #44BC84;">" -t scratchpad"</span>
    findTerm   <span style="color: #FDB760;">=</span> title <span style="color: #FDB760;">=?</span> <span style="color: #44BC84;">"scratchpad"</span>
    manageTerm <span style="color: #FDB760;">=</span> customFloating <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">W.RationalRect</span> l t w h
      <span style="color: #E83A82;">where</span>
        h <span style="color: #FDB760;">=</span> 0.9
        w <span style="color: #FDB760;">=</span> 0.9
        t <span style="color: #FDB760;">=</span> 0.95 <span style="color: #FDB760;">-</span>h
        l <span style="color: #FDB760;">=</span> 0.95 <span style="color: #FDB760;">-</span>w

    spawnCalc  <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"qalculate-gtk"</span>
    findCalc   <span style="color: #FDB760;">=</span> className <span style="color: #FDB760;">=?</span> <span style="color: #44BC84;">"Qalculate-gtk"</span>
    manageCalc <span style="color: #FDB760;">=</span> customFloating <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">W.RationalRect</span> l t w h
      <span style="color: #E83A82;">where</span>
        h <span style="color: #FDB760;">=</span> 0.5
        w <span style="color: #FDB760;">=</span> 0.4
        t <span style="color: #FDB760;">=</span> 0.75 <span style="color: #FDB760;">-</span>h
        l <span style="color: #FDB760;">=</span> 0.70 <span style="color: #FDB760;">-</span>w

    spawnRanger  <span style="color: #FDB760;">=</span> myTerminal <span style="color: #FDB760;">++</span> <span style="color: #44BC84;">" --class ranger -t Ranger -e ranger"</span>
    findRanger   <span style="color: #FDB760;">=</span> appName <span style="color: #FDB760;">=?</span> <span style="color: #44BC84;">"ranger"</span>
    manageRanger <span style="color: #FDB760;">=</span> customFloating <span style="color: #FDB760;">$</span> <span style="color: #FFD787;">W.RationalRect</span> l t w h
      <span style="color: #E83A82;">where</span>
        h <span style="color: #FDB760;">=</span> 0.9
        w <span style="color: #FDB760;">=</span> 0.9
        t <span style="color: #FDB760;">=</span> 0.95 <span style="color: #FDB760;">-</span>h
        l <span style="color: #FDB760;">=</span> 0.95 <span style="color: #FDB760;">-</span>w


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Manage windows</span>
<span style="color: #5F8AF7;">myManageHook</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">XMonad.Query</span> (<span style="color: #FFD787;">Data.Monoid.Endo</span> <span style="color: #FFD787;">WindowSet</span>)
<span style="color: #5F8AF7;">myManageHook</span> <span style="color: #FDB760;">=</span> (composeAll <span style="color: #FDB760;">.</span> concat <span style="color: #FDB760;">$</span>
                <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">class-based management</span>
                [ [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">&lt;||&gt;</span> title <span style="color: #FDB760;">=?</span>
                                c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 0) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mywmShifts ]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 1) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> myttyShifts]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 2) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mydevShifts]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 3) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mywebShifts]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 4) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mydocShifts]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 5) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mymuShifts ]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 6) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mytxShifts ]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 7) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mygxShifts ]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doShift (myWorkspaces <span style="color: #FDB760;">!!</span> 8) <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mylsShifts ]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doFullFloat                 <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> myfFloats  ]
                , [className <span style="color: #FDB760;">=?</span> c <span style="color: #FDB760;">--&gt;</span> doCenterFloat               <span style="color: #FDB760;">|</span> c <span style="color: #FDB760;">&lt;-</span> mycFloats  ]
                , [resource <span style="color: #FDB760;">=?</span>  r <span style="color: #FDB760;">--&gt;</span> doIgnore                    <span style="color: #FDB760;">|</span> r <span style="color: #FDB760;">&lt;-</span> myIgnores  ]
                <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">situational management</span>
                , [ isFullscreen  <span style="color: #FDB760;">--&gt;</span> doFullFloat  ]
                , [ isDialog      <span style="color: #FDB760;">--&gt;</span> doCenterFloat]
                ])
               <span style="color: #FDB760;">&lt;+&gt;</span> namedScratchpadManageHook myScratchPads
               <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">&lt;+&gt; fullscreenManageHook</span>
               <span style="color: #FDB760;">&lt;+&gt;</span> manageDocks
               <span style="color: #FDB760;">&lt;+&gt;</span> manageHook def
  <span style="color: #E83A82;">where</span>
    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">I only use these on laptops</span>
    mywmShifts  <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    myttyShifts <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mydevShifts <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mywebShifts <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mydocShifts <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mymuShifts  <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mytxShifts  <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mygxShifts  <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mylsShifts  <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    myfFloats   <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">""</span> ]
    mycFloats   <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">"feh"</span>, <span style="color: #44BC84;">"Xmessage"</span> ]
    myIgnores   <span style="color: #FDB760;">=</span> [ <span style="color: #44BC84;">"desktop_window"</span>, <span style="color: #44BC84;">"kdesktop"</span> ]


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Event handling</span>
<span style="color: #5F8AF7;">myEventHook</span> <span style="color: #FDB760;">=</span> mempty <span style="color: #8A8A8A;">--  </span><span style="color: #8A8A8A;">mconcat [ fullscreenEventHook, handleEventHook def ]</span>


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ xmobar</span>
<span style="color: #5F8AF7;">myXMobarPP</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">PP</span>
<span style="color: #5F8AF7;">myXMobarPP</span> <span style="color: #FDB760;">=</span> def
  { ppSep     <span style="color: #FDB760;">=</span> wrap hair hair <span style="color: #FDB760;">$</span> grey <span style="color: #44BC84;">"|"</span>
  <span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">, ppWsSep   = wrap hair hair $ blue "/"</span>
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">focused workspace</span>
  , ppCurrent <span style="color: #FDB760;">=</span> red <span style="color: #FDB760;">.</span> xmobarBorder <span style="color: #44BC84;">"Bottom"</span> redHex 5
  , ppVisible <span style="color: #FDB760;">=</span> red
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">hidden workspace with windows</span>
  , ppHidden  <span style="color: #FDB760;">=</span> blue <span style="color: #FDB760;">.</span> xmobarBorder <span style="color: #44BC84;">"Top"</span> blueHex 3 <span style="color: #FDB760;">.</span> hideNSP
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">hidden windows without windows</span>
  , ppHiddenNoWindows <span style="color: #FDB760;">=</span> blue <span style="color: #FDB760;">.</span> hideNSP
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">layout format map</span>
  , ppLayout  <span style="color: #FDB760;">=</span> cyan <span style="color: #FDB760;">.</span> (<span style="color: #FDB760;">\</span>layout <span style="color: #FDB760;">-&gt;</span> <span style="color: #E83A82;">case</span> layout <span style="color: #E83A82;">of</span>
                           <span style="color: #44BC84;">"tall"</span> <span style="color: #FDB760;">-&gt;</span> <span style="color: #44BC84;">"{|}"</span>
                           <span style="color: #44BC84;">"grid"</span> <span style="color: #FDB760;">-&gt;</span> <span style="color: #44BC84;">"[#]"</span>
                           <span style="color: #44BC84;">"mirr"</span> <span style="color: #FDB760;">-&gt;</span> <span style="color: #44BC84;">"}|{"</span>
                           <span style="color: #44BC84;">"c3s"</span>  <span style="color: #FDB760;">-&gt;</span> <span style="color: #44BC84;">"|||"</span>
                           <span style="color: #44BC84;">"full"</span> <span style="color: #FDB760;">-&gt;</span> <span style="color: #44BC84;">"[X]"</span>)
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">window count</span>
  , ppExtras  <span style="color: #FDB760;">=</span> [ windowCount ] <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">xmobarColor color03 ""</span>
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">order pp fields</span>
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">, ppTitle   = xmobarColor color07 "" . shorten 25</span>
  , ppOrder   <span style="color: #FDB760;">=</span> <span style="color: #FDB760;">\</span>(ws<span style="color: #FFD787;">:</span>l<span style="color: #FFD787;">:</span>t<span style="color: #FFD787;">:</span>ex) <span style="color: #FDB760;">-&gt;</span> [ws,l] <span style="color: #FDB760;">++</span> map red ex
  }
  <span style="color: #E83A82;">where</span>
    hideNSP <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">WorkspaceId</span> <span style="color: #FDB760;">-&gt;</span> <span style="color: #FFD787;">String</span>
    hideNSP ws <span style="color: #FDB760;">=</span> <span style="color: #E83A82;">if</span> ws <span style="color: #FDB760;">/=</span> <span style="color: #44BC84;">"NSP"</span> <span style="color: #E83A82;">then</span> ws <span style="color: #E83A82;">else</span> <span style="color: #44BC84;">""</span>
    greyHex, blueHex, redHex, cyanHex <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
    greyHex <span style="color: #FDB760;">=</span> color08
    blueHex <span style="color: #FDB760;">=</span> color04
    redHex <span style="color: #FDB760;">=</span> color05
    cyanHex <span style="color: #FDB760;">=</span> color06
    blue, red, cyan, grey <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span> <span style="color: #FDB760;">-&gt;</span> <span style="color: #FFD787;">String</span>
    blue <span style="color: #FDB760;">=</span> xmobarColor blueHex <span style="color: #44BC84;">""</span>
    red <span style="color: #FDB760;">=</span> xmobarColor redHex <span style="color: #44BC84;">""</span>
    cyan <span style="color: #FDB760;">=</span> xmobarColor cyanHex <span style="color: #44BC84;">""</span>
    grey <span style="color: #FDB760;">=</span> xmobarColor greyHex <span style="color: #44BC84;">""</span>
    hair <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">String</span>
    hair <span style="color: #FDB760;">=</span> <span style="color: #44BC84;">"&lt;fn=1&gt;&#8202;&lt;/fn&gt;"</span>


<span style="color: #5F8AF7;">xmobar</span> <span style="color: #FDB760;">=</span> statusBarPropTo <span style="color: #44BC84;">"_XMONAD_LOG_1"</span> (myXMobar<span style="color: #FDB760;">++</span>myXMobarConf<span style="color: #FDB760;">++</span><span style="color: #44BC84;">"-x 0"</span>) (pure myXMobarPP)
<span style="color: #5F8AF7;">xmobar2</span> <span style="color: #FDB760;">=</span> statusBarPropTo <span style="color: #44BC84;">"_XMONAD_LOG_1"</span> (myXMobar<span style="color: #FDB760;">++</span>myXMobarConf2<span style="color: #FDB760;">++</span><span style="color: #44BC84;">"-x 1"</span>) (pure myXMobarPP)
<span style="color: #5F8AF7;">xmobarSpawn</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">ScreenId</span> <span style="color: #FDB760;">-&gt;</span> <span style="color: #FFD787;">IO</span> <span style="color: #FFD787;">StatusBarConfig</span>
<span style="color: #5F8AF7;">xmobarSpawn</span> 0 <span style="color: #FDB760;">=</span> pure <span style="color: #FDB760;">$</span> xmobar
<span style="color: #5F8AF7;">xmobarSpawn</span> 1 <span style="color: #FDB760;">=</span> pure <span style="color: #FDB760;">$</span> xmobar2
<span style="color: #5F8AF7;">xmobarSpawn</span> <span style="color: #E83A82;">_</span> <span style="color: #FDB760;">=</span> mempty  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">every additional monitor doesn't have a statusbar</span>


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Logging</span>
<span style="color: #5F8AF7;">myLogHook</span> <span style="color: #FDB760;">=</span> refocusLastLogHook
            <span style="color: #FDB760;">&gt;&gt;</span> nsHideOnFocusLoss myScratchPads


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">------------------ Keybindings</span>
<span style="color: #5F8AF7;">myKeys</span> <span style="color: #FDB760;">::</span> <span style="color: #FFD787;">XConfig</span> l <span style="color: #FDB760;">-&gt;</span> <span style="color: #FFD787;">M.Map</span> (<span style="color: #FFD787;">KeyMask</span>, <span style="color: #FFD787;">KeySym</span>) (<span style="color: #FFD787;">X</span> <span style="color: #FFD787;">()</span>)
<span style="color: #5F8AF7;">myKeys</span> conf <span style="color: #FDB760;">=</span> (mkKeymap conf myKeymap) <span style="color: #FDB760;">&lt;+&gt;</span> (defaultKeymap conf)
<span style="color: #5F8AF7;">myKeymap</span> <span style="color: #FDB760;">::</span> [(<span style="color: #FFD787;">String</span>, <span style="color: #FFD787;">X</span> <span style="color: #FFD787;">()</span>)]
<span style="color: #5F8AF7;">myKeymap</span> <span style="color: #FDB760;">=</span>
  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Launch/kill bindings</span>
  [ (<span style="color: #44BC84;">"M-&lt;Return&gt;"</span>   , spawn myTerminal)
  , (<span style="color: #44BC84;">"M-/"</span>          , spawn <span style="color: #44BC84;">"dmenu_run -c -l 15"</span>)
  , (<span style="color: #44BC84;">"M-p"</span>          , spawn <span style="color: #44BC84;">"passmenu"</span>)
  , (<span style="color: #44BC84;">"M-S-c"</span>        , kill)
  , (<span style="color: #44BC84;">"M-C-c"</span>        , kill)
  , (<span style="color: #44BC84;">"M-S-C-c"</span>      , killAll)

  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">XMonad &amp; system bindings</span>
  , (<span style="color: #44BC84;">"M-b"</span>          , sendMessage <span style="color: #FFD787;">ToggleStruts</span>)  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">toggle status bar</span>
  , (<span style="color: #44BC84;">"M-S-b"</span>        , spawn <span style="color: #44BC84;">"xmobar_toggle"</span>)     <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">kill status bar</span>
  , (<span style="color: #44BC84;">"M-q"</span>          , spawn <span style="color: #44BC84;">"xmonad_restart"</span>)    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">recompile &amp; restart xmonad</span>
  , (<span style="color: #44BC84;">"M-S-x"</span>        , io (exitWith <span style="color: #FFD787;">ExitSuccess</span>)) <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">exit XMonad</span>
  , (<span style="color: #44BC84;">"M-S-z"</span>        , spawn <span style="color: #44BC84;">"xscreensaver-command --activate"</span>)  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">suspend</span>

  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Window control</span>
  , (<span style="color: #44BC84;">"M-&lt;Tab&gt;"</span>      , windows W.focusDown)
  , (<span style="color: #44BC84;">"M-j"</span>          , windows W.focusDown)
  , (<span style="color: #44BC84;">"M-S-j"</span>        , windows W.swapDown)
  , (<span style="color: #44BC84;">"M-k"</span>          , windows W.focusUp)
  , (<span style="color: #44BC84;">"M-S-k"</span>        , windows W.swapUp)
  , (<span style="color: #44BC84;">"M-m"</span>          , windows W.focusMaster)
  , (<span style="color: #44BC84;">"M-S-m"</span>        , windows W.swapMaster)
  , (<span style="color: #44BC84;">"M-n"</span>          , refresh)
  , (<span style="color: #44BC84;">"M-h"</span>          , sendMessage <span style="color: #FFD787;">Shrink</span>)
  , (<span style="color: #44BC84;">"M-l"</span>          , sendMessage <span style="color: #FFD787;">Expand</span>)
  , (<span style="color: #44BC84;">"M-C-h"</span>        , moveTo <span style="color: #FFD787;">Prev</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-C-l"</span>        , moveTo <span style="color: #FFD787;">Next</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-S-h"</span>        , shiftTo <span style="color: #FFD787;">Prev</span> (nonNSP) <span style="color: #FDB760;">&gt;&gt;</span> moveTo <span style="color: #FFD787;">Prev</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-S-l"</span>        , shiftTo <span style="color: #FFD787;">Next</span> (nonNSP) <span style="color: #FDB760;">&gt;&gt;</span> moveTo <span style="color: #FFD787;">Next</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-&lt;Down&gt;"</span>     , windows W.focusDown)
  , (<span style="color: #44BC84;">"M-S-&lt;Down&gt;"</span>   , windows W.swapDown)
  , (<span style="color: #44BC84;">"M-&lt;Up&gt;"</span>       , windows W.focusUp)
  , (<span style="color: #44BC84;">"M-S-&lt;Up&gt;"</span>     , windows W.swapUp)
  , (<span style="color: #44BC84;">"M-&lt;Left&gt;"</span>     , sendMessage <span style="color: #FFD787;">Shrink</span>)
  , (<span style="color: #44BC84;">"M-&lt;Right&gt;"</span>    , sendMessage <span style="color: #FFD787;">Expand</span>)
  , (<span style="color: #44BC84;">"M-C-&lt;Up&gt;"</span>     , sendMessage <span style="color: #FFD787;">MirrorExpand</span>)
  , (<span style="color: #44BC84;">"M-C-&lt;Down&gt;"</span>   , sendMessage <span style="color: #FFD787;">MirrorShrink</span>)
  , (<span style="color: #44BC84;">"M-C-&lt;Left&gt;"</span>   , moveTo <span style="color: #FFD787;">Prev</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-C-&lt;Right&gt;"</span>  , moveTo <span style="color: #FFD787;">Next</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-S-&lt;Left&gt;"</span>   , shiftTo <span style="color: #FFD787;">Prev</span> (nonNSP) <span style="color: #FDB760;">&gt;&gt;</span> moveTo <span style="color: #FFD787;">Prev</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-S-&lt;Right&gt;"</span>  , shiftTo <span style="color: #FFD787;">Next</span> (nonNSP) <span style="color: #FDB760;">&gt;&gt;</span> moveTo <span style="color: #FFD787;">Next</span> (nonNSP))
  , (<span style="color: #44BC84;">"M-,"</span>          , nextScreen)
  , (<span style="color: #44BC84;">"M-."</span>          , prevScreen)

  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Toggle layouts</span>
  , (<span style="color: #44BC84;">"M-&lt;Space&gt;"</span>    , sendMessage <span style="color: #FFD787;">NextLayout</span>)
  , (<span style="color: #44BC84;">"M-S-&lt;Space&gt;"</span>  , sendMessage <span style="color: #FFD787;">FirstLayout</span>)
  , (<span style="color: #44BC84;">"M-f"</span>          , sendMessage (<span style="color: #FFD787;">JumpToLayout</span> <span style="color: #44BC84;">"bfull"</span>) <span style="color: #FDB760;">&gt;&gt;</span> sendMessage <span style="color: #FFD787;">ToggleStruts</span>)
  , (<span style="color: #44BC84;">"M-S-f"</span>        , withFocused <span style="color: #FDB760;">$</span> float)
  , (<span style="color: #44BC84;">"M-t"</span>          , withFocused <span style="color: #FDB760;">$</span> windows <span style="color: #FDB760;">.</span> W.sink)
  , (<span style="color: #44BC84;">"M-S-t"</span>        , sinkAll)

  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Program bindings</span>
  , (<span style="color: #44BC84;">"M-d"</span>          , spawn <span style="color: #44BC84;">"pcmanfm"</span>)
  , (<span style="color: #44BC84;">"M-\\"</span>         , spawn myBrowser)
  , (<span style="color: #44BC84;">"M-="</span>          , unGrab <span style="color: #FDB760;">*&gt;</span> spawn <span style="color: #44BC84;">"scrot"</span>)
  , (<span style="color: #44BC84;">"M-S-="</span>        , unGrab <span style="color: #FDB760;">*&gt;</span> spawn <span style="color: #44BC84;">"scrot -s"</span>)

  <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Scratchpads</span>
  , (<span style="color: #44BC84;">"M-S-&lt;Return&gt;"</span> , namedScratchpadAction myScratchPads <span style="color: #44BC84;">"terminal"</span>)
  , (<span style="color: #44BC84;">"M-S-y"</span>        , namedScratchpadAction myScratchPads <span style="color: #44BC84;">"calculator"</span>)
  , (<span style="color: #44BC84;">"M-S-d"</span>        , namedScratchpadAction myScratchPads <span style="color: #44BC84;">"ranger"</span>)
  ]
  <span style="color: #E83A82;">where</span>
    nonNSP <span style="color: #FDB760;">=</span> anyWS <span style="color: #FFD787;">:&amp;:</span> ignoringWSs [scratchpadWorkspaceTag]

<span style="color: #5F8AF7;">defaultKeymap</span> conf<span style="color: #FDB760;">@</span>(<span style="color: #FFD787;">XConfig</span> {XMonad.modMask <span style="color: #FDB760;">=</span> modm}) <span style="color: #FDB760;">=</span> M.fromList <span style="color: #FDB760;">$</span>
  [((m <span style="color: #FDB760;">.|.</span> modm, k), windows <span style="color: #FDB760;">$</span> f i)
        <span style="color: #FDB760;">|</span> (i, k) <span style="color: #FDB760;">&lt;-</span> zip (XMonad.workspaces conf) [xK_1 <span style="color: #FDB760;">..</span> xK_9]
        , (f, m) <span style="color: #FDB760;">&lt;-</span> [(W.greedyView, 0), (W.shift, shiftMask)]]
  <span style="color: #FDB760;">++</span>
  [((m <span style="color: #FDB760;">.|.</span> modm, key), screenWorkspace sc <span style="color: #FDB760;">&gt;&gt;=</span> flip whenJust (windows <span style="color: #FDB760;">.</span> f))
        <span style="color: #FDB760;">|</span> (key, sc) <span style="color: #FDB760;">&lt;-</span> zip [xK_w, xK_e, xK_r] [0<span style="color: #FDB760;">..</span>]
        , (f, m)    <span style="color: #FDB760;">&lt;-</span> [(W.view, 0), (W.shift, shiftMask)]]


<span style="color: #8A8A8A;">--</span><span style="color: #8A8A8A;">----------------------------------------------------------------------</span>
<span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">Mouse bindings: default actions bound to mouse events</span>
<span style="color: #5F8AF7;">myMouseBindings</span> (<span style="color: #FFD787;">XConfig</span> {XMonad.modMask <span style="color: #FDB760;">=</span> modm}) <span style="color: #FDB760;">=</span> M.fromList <span style="color: #FDB760;">$</span>

    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">mod-button1, Set the window to floating mode and move by dragging</span>
    [ ((modm, button1), (<span style="color: #FDB760;">\</span>w <span style="color: #FDB760;">-&gt;</span> focus w <span style="color: #FDB760;">&gt;&gt;</span> mouseMoveWindow w
                                       <span style="color: #FDB760;">&gt;&gt;</span> windows W.shiftMaster))
    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">, ((0, button2), (\w -&gt; focus w &gt;&gt; mouseMoveWindow w</span>
    <span style="color: #8A8A8A;">--                                 </span><span style="color: #8A8A8A;">&gt;&gt; windows W.shiftMaster))</span>

    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">mod-button2, Raise the window to the top of the stack</span>
    , ((modm, button2), (<span style="color: #FDB760;">\</span>w <span style="color: #FDB760;">-&gt;</span> focus w <span style="color: #FDB760;">&gt;&gt;</span> windows W.shiftMaster))

    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">mod-button3, Set the window to floating mode and resize by dragging</span>
    , ((modm, button3), (<span style="color: #FDB760;">\</span>w <span style="color: #FDB760;">-&gt;</span> focus w <span style="color: #FDB760;">&gt;&gt;</span> mouseResizeWindow w
                                       <span style="color: #FDB760;">&gt;&gt;</span> windows W.shiftMaster))

    <span style="color: #8A8A8A;">-- </span><span style="color: #8A8A8A;">you may also bind events to the mouse scroll wheel (button4 and button5)</span>
    ]
</pre>
</div>

