#!/usr/bin/env python
"""
@author: phdenzel

"""
import numpy as np
import matplotlib as mpl
from matplotlib import pyplot as plt
from matplotlib.patches import FancyArrowPatch
from mpl_toolkits.mplot3d import proj3d
from circuit_gx import QCircuit


class Arrow3D(FancyArrowPatch):
    def __init__(self, xs, ys, zs, *args, **kwargs):
        FancyArrowPatch.__init__(self, (0, 0), (0, 0), *args, **kwargs)
        self._verts3d = xs, ys, zs

    def draw(self, renderer):
        xs3d, ys3d, zs3d = self._verts3d
        xs, ys, zs = proj3d.proj_transform(xs3d, ys3d, zs3d, renderer.M)
        self.set_positions((xs[0], ys[0]), (xs[1], ys[1]))
        FancyArrowPatch.draw(self, renderer)


class BlochSphere(object):
    N = 100
    orig = [0, 0, 0]
    eigv = [[1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]]
    eigv_labels = ['x', 'y', 'z']
    eigv_offset = [(0.05, 0.1, 0.12), (0, 0.1, 0.18), (0, 0.1, -0.07)]
    sphere_alpha = 0.1
    lw = 1
    fontsize = 12
    base_color = '#DEDEDE'

    def __init__(self, figsize=(6, 6)):
        self.figure = plt.figure(figsize=figsize)
        self.ax = self.figure.add_subplot(111, projection='3d')
        self.ax.set_box_aspect(aspect=(1, 1, 1))

    @property
    def theta(self):
        return np.linspace(0, 2*np.pi, self.N)

    @property
    def phi(self):
        return np.linspace(0, np.pi, self.N)

    @property
    def x(self):
        return np.outer(np.sin(self.theta), np.cos(self.phi))

    @property
    def y(self):
        return np.outer(np.sin(self.theta), np.sin(self.phi))

    @property
    def z(self):
        return np.outer(np.cos(self.theta), np.ones(np.size(self.phi)))

    def plot_sphere(self, kw=None):
        if kw is None:
            kw = self.sphere_kw
        self.ax.plot_surface(self.x, self.y, self.z, **kw)

    def plot_ring(self, plane=None, theta_phi=[], dashed=False, front_only=False, kw=None):
        if kw is None:
            kw = self.ring_kw
        if dashed:
            kw['ls'] =  'dashed'
        angles = self.phi if front_only else self.theta
        if plane == 'z':
            x, y, z = np.sin(angles), np.cos(angles), np.zeros(self.N,)
        elif plane == 'y':
            x, y, z = np.sin(angles), np.zeros(self.N,), np.cos(angles)
        elif plane == 'x':
            x, y, z = np.zeros(self.N,), np.sin(angles), np.cos(angles)
        elif theta_phi:
            t, p = theta_phi
            x, y, z = np.sin(t)*np.cos(p), np.sin(t)*np.sin(p), np.cos(t)
        self.ax.plot(x, y, z, **kw)

    def plot_point(self, point, label=None, offset=[0, 0.15, -0.025],
                   color=None,
                   kw=None):
        if kw is None:
            kw = self.hollow_point_kw
        if color is not None:
            kw['color'] = color
        self.ax.scatter(*point, **kw)
        if label:
            pos = point[0]-offset[0], point[1]-offset[1], point[2]-offset[2]
            txtkw = self.text_kw
            txtkw['fontsize'] = txtkw['fontsize']-3
            if color is not None:
                txtkw['color'] = color
            self.ax.text(*pos, label, **txtkw)

    def plot_uvec_from_angles(self, theta, phi, length=1, orig=None, proj=None, label=False,
                              kw=None):
        if kw is None:
            kw = self.arrow_kw
        o = orig
        if not o:
            o = self.orig
        t, p = theta, phi
        r = np.array([o[0], o[1], o[2],
                      np.sin(t)*np.cos(p), np.sin(t)*np.sin(p), np.cos(t)])
        rproj = r.copy()
        if proj == 'z':
            rproj[3+2] = 0
        elif proj == 'y':
            rproj[3+1] = 0
        elif proj == 'x':
            rproj[3+0] = 0
        else:
            pass
        self.ax.quiver(*r, length=length, **kw)
        if any(rproj):
            if 'ls' in kw:
                kw.pop('ls')
            self.ax.quiver(*rproj, length=length, ls='dashed', **kw)
        if label:
            # change manually for non-default coordinates
            tangle = [o[0], r[3+0]], [o[1], 0.8*r[3+1]], [0.75*r[3+2], 0.75*r[3+2]]
            tarr = Arrow3D(*tangle,
                           arrowstyle="-|>", connectionstyle="arc3,rad=-0.25",
                           **self.ring_kw)
            txtkw = self.text_kw
            txtkw['fontsize'] = txtkw['fontsize'] - 3
            self.ax.text(tangle[0][1], 0.5*tangle[1][1], 0.8*tangle[2][1], label[0], **txtkw)
            self.ax.add_artist(tarr)
            pangle = [rproj[3+0], 0.5*rproj[3+0]], [o[1], 0.5*rproj[3+1]], [o[2], rproj[3+2]]
            parr = Arrow3D(*pangle,
                           arrowstyle="-|>", connectionstyle="arc3,rad=0.2",
                           **self.ring_kw)
            self.ax.text(2*pangle[0][1], 0.45*pangle[1][1], pangle[2][1], label[1], **txtkw)
            self.ax.add_artist(parr)

    def plot_axes(self, labels=True, length=[1.5, 1.25, 1.25], offset=[0, -0.05, 0.1],
                  kw=None):
        if kw is None:
            kw = self.arrow_kw
        for i, (ev, lbl) in enumerate(zip(self.eigv, self.eigv_labels)):
            v = self.orig + ev
            self.ax.quiver(*v, length=length[i], **kw)
            if labels:
                txtpos = (length[i]*ev[0]-offset[0],
                          length[i]*ev[1]-offset[1],
                          length[i]*ev[2]-offset[2])
                self.ax.text(*txtpos, lbl,
                             **self.text_kw)

    def plot_example(self):
        # sphere
        self.plot_sphere()
        self.plot_ring('z', dashed=True)
        self.plot_ring('y', dashed=True)
        self.plot_ring('z', front_only=True)
        self.plot_ring('y', front_only=True)
        # axes
        self.plot_axes()
        # state vectors
        self.plot_point([0, 0,  1], QCircuit.ket('0'))
        self.plot_point([0, 0, -1], QCircuit.ket('1'))
        self.plot_point([ 1, 0, 0], QCircuit.ket('+'))
        self.plot_point([-1, 0, 0], QCircuit.ket(r'$-$'), offset=[0, -0.05, -0.025])
        self.plot_point([0,  1, 0], QCircuit.ket('i'))
        self.plot_point([0, -1, 0], QCircuit.ket('-i'))
        # generic vectors
        self.plot_uvec_from_angles(theta=np.pi/4, phi=np.pi/4, proj='z',
                                   label=[r'$\theta$', r'$\phi$'])

    def draw(self, elev=10., azim=15):
        self.ax.view_init(elev=elev, azim=azim)
        plt.axis('off')
        self.figure.tight_layout()

    def save(self, savename, dpi=600,
             transparent=True, bbox_inches='tight', pad_inches=0):
        self.figure.savefig(savename,
                            dpi=dpi,
                            transparent=transparent,
                            bbox_inches=bbox_inches,
                            pad_inches=pad_inches
        )

    @property
    def sphere_kw(self):
        kw = dict(rstride=4, cstride=4,
                  lw=0,
                  color=self.base_color,
                  alpha=self.sphere_alpha)
        return kw

    @property
    def ring_kw(self):
        kw = dict(lw=self.lw,
                  color=self.base_color)
        return kw

    @property
    def arrow_kw(self):
        kw = dict(lw=self.lw, color=self.base_color, arrow_length_ratio=0.1)
        return kw

    @property
    def text_kw(self):
        kw = dict(fontsize=self.fontsize,
                  color=self.base_color)
        return kw

    @property
    def hollow_point_kw(self):
        kw = dict(marker='o', s=50, lw=self.lw,
                  edgecolor=self.base_color,
                  facecolor=(0, 0, 0, 0))
        return kw

    @staticmethod
    def point_from_angles(theta, phi):
        return np.sin(theta)*np.cos(phi), np.sin(theta)*np.sin(phi), np.cos(theta)

    @staticmethod
    def phase2color(phase, alpha=1):
        phase /= 2
        colors = 255*np.cos(phase), 255*np.cos(phase+2*np.pi/3), 255*np.cos(phase+4*np.pi/3)
        return '#'+''.join('{:02X}'.format(int(abs(a))) for a in colors)

    def state(self, theta, phi, color_angle, label='', kw=None, line_kw=None):
        if kw is None:
            kw = self.hollow_point_kw
        if line_kw is None:
            line_kw = self.ring_kw
        self.plot_point(self.point_from_angles(theta, phi), label=label,
                        color=self.phase2color(color_angle), **kw)
        self.ax.plot(*zip([0, 0, 0], self.point_from_angles(theta, phi)),
                     color=self.phase2color(color_angle), **line_kw)

if __name__ == "__main__":
    bs = BlochSphere()
    bs.plot_example()
    bs.draw()
    bs.save('test_bs.png')

    fig2 = plt.figure()
    fig2.add_subplot(111)
    angles = np.linspace(0, 2*np.pi, 360)
    levels = 360*[1]
    for a, l in zip(angles, levels):
        clr = bs.phase2color(a)
        print(a, clr)
        plt.scatter(a, l, marker='o', s=10, color=clr)
    plt.scatter(0, 2, marker='o', s=30, color=bs.phase2color(0))
    plt.scatter(2*np.pi/3, 2, marker='o', s=30, color=bs.phase2color(2*np.pi/3))
    plt.scatter(4*np.pi/3, 2, marker='o', s=30, color=bs.phase2color(4*np.pi/3))
    plt.scatter(np.pi, 2, marker='o', s=30, color=bs.phase2color(np.pi))
    plt.savefig('test_cl.png')
