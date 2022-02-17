import numpy as np
from matplotlib import pyplot as plt
from circuit_gx import QCircuit


def p2D(alpha, r=1):
    return [r*np.cos(alpha), r*np.sin(alpha)]

def plt_ovec(vec, o=[0, 0], **kw):
    kw.setdefault('color', QCircuit.base_color)
    kw.setdefault('alpha', 0.9)
    kw.setdefault('length_includes_head', True)
    kw.setdefault('head_width', 0.02)
    kw.setdefault('lw', 1)
    ovec = o+vec
    arr = plt.arrow(*ovec, **kw)
    return arr

def plt_pillar(x, y, label='', label_offset=[0, -0.05], 
               marker='o', ls='-', lw=1, fontsize=14, **kw):
    kw.setdefault('color', QCircuit.base_color)
    kw.setdefault('alpha', 0.9)
    plt.plot([x, x], [0, y], ls=ls, lw=lw, **kw)
    plt.scatter(x, y, marker=marker, **kw)
    plt.text(x+label_offset[0], label_offset[1], label, 
             fontsize=fontsize, ha='center', va='center', **kw)

def annotxt(vec, txt, offset=[0.02, 0], **kw):
    kw.setdefault('color', QCircuit.base_color)
    kw.setdefault('alpha', 0.9)
    kw.setdefault('fontsize', 14)
    kw.setdefault('ha', 'left')
    kw.setdefault('va', 'center')
    t = plt.text(vec[0]+offset[0], vec[1]+offset[1], txt, **kw)
    return t

def plt_circseg(ini, fin, r=1, N=100, **kw):
    kw.setdefault('color', QCircuit.base_color)
    kw.setdefault('alpha', 0.9)
    kw.setdefault('lw', 1)
    angles = []
    for alpha in np.linspace(ini, fin, N):
        angles.append(p2D(alpha, r))
    angles = np.asarray(angles)
    plt.plot(*angles.T, **kw)


