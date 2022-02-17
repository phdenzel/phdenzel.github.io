#!/usr/bin/env python
"""
@author: phdenzel

TODO:
   - gate2 connections have to be skipped manually...
     write sanitize circuit routine to automatize
"""
import matplotlib as mpl
from matplotlib import pyplot as plt


class QCircuit(object):

    base_color = '#DEDEDE'
    point_size = 40
    lw = 2
    fontsize = 14
    horizontalalignment = 'center'
    verticalalignment = 'center_baseline'
    
    def __init__(self, N_inputs, N_components=1):
        self.N_in = N_inputs
        self.N_comp = N_components
        self.comp_chains = self.N_in*[self.length*[None]]
        self.input_labels = self.N_in*[None]
        self.output_labels = self.N_in*[None]
        self.figure = plt.figure(figsize=(self.length, self.breadth+1))
        self.ax = self.figure.add_subplot(111)

    def sanitize(self):
        pass

    def skip(self, name, lane, i):
        pass

    def connection(self, name, lane, i, length=1, fontsize=None):
        self.ax.plot([i, i+length], [lane, lane], **self.line_kw)
        if name:
            textkw = self.text_kw
            if fontsize is not None:
                textkw['fontsize'] = fontsize
            self.ax.text(i+0.5, lane+0.2, name, **textkw)

    def vertical_line(self, lane, i, length=0.5):
        self.ax.plot([i, i], [lane-length/2, lane+length/2], **self.line_kw)

    def knot(self, lane2, lane, i):
        lane2 = int(lane2)
        d_lane = lane-lane2 - 0.25*(lane-lane2)/abs(lane-lane2)
        self.vertical_line(lane-0.5*d_lane, i+0.5, length=d_lane)
        self.ax.scatter(i+0.5, lane, marker='o', **self.point_kw)
        self.connection('', lane, i, length=1)

    def text(self, name, lane, i):
        self.ax.text(i+0.5, lane, name, **self.text_kw)

    def gate(self, name, lane, i):
        self.connection('', lane, i, length=0.25)
        self.vertical_line(lane, i+0.25)
        self.connection('', lane-0.25, i+0.25, length=0.5)
        self.connection('', lane+0.25, i+0.25, length=0.5)
        self.vertical_line(lane, i+0.75)
        self.connection('', lane, i+0.75, length=0.25)
        if name:
            self.ax.text(i+0.5, lane, name, **self.text_kw)

    def wide_gate(self, name, lane, i):
        self.vertical_line(lane, i)
        self.connection('', lane-0.25, i, length=1)
        self.connection('', lane+0.25, i, length=1)
        self.vertical_line(lane, i+1)
        if name:
            self.ax.text(i+0.5, lane, name, **self.text_kw)

    def gate2(self, name, lane2, lane, i):
        if name == 'CNOT':
            self.CNOT(lane2, lane, i)
        elif name == 'CX':
            self.CNOT(lane2, lane, i)
        elif name == 'CZ':
            self.CZ(lane2, lane, i)
        elif name == 'CZX':
            self.CZX(lane2, lane, i)
        elif name == 'SWAP':
            self.SWAP(lane2, lane, i)
        elif name == 'SWAPX':
            self.SWAPX(lane2, lane, i)
        elif 'UROT' in name:
            self.UROT(name, lane2, lane, i)

    def wide_gate2(self, name, lane2, lane, i):
        self.vertical_line(0.5*(lane2+lane), i, length=.5+abs(lane-lane2))
        self.connection('', lane+0.25, i, length=1)
        self.connection('', lane2-0.25, i, length=1)
        self.vertical_line(0.5*(lane2+lane), i+1, length=.5+abs(lane-lane2))
        if name:
            self.ax.text(i+0.5, 0.5*(lane2+lane), name, **self.text_kw)

    def combine(self, name, lane2, lane, i):
        self.connection('', lane, i, length=0.5)
        d_lane = lane2-lane - 0.25*(lane2-lane)/abs(lane2-lane)
        self.vertical_line(lane+0.5*d_lane, i+0.5, length=d_lane)
        self.gate(name, lane2, i)

    def UROT(self, name, lane2, lane, i):
        self.wide_gate(name, lane, i)
        d_lane = lane-lane2 - 0.25*(lane-lane2)/abs(lane-lane2)
        self.vertical_line(lane2+0.5*d_lane, i+0.5, length=d_lane)
        self.ax.scatter(i+0.5, lane2, marker='o', **self.point_kw)
        self.connection('', lane2, i, length=1)

    def CNOT(self, lane2, lane, i):
        self.connection('', lane, i, length=1)
        self.connection('', lane2, i, length=1)
        d_lane = lane2-lane
        self.vertical_line(lane+0.5*d_lane, i+0.5, length=d_lane)
        self.ax.scatter(i+0.5, lane, marker='o', **self.point_kw)
        self.ax.scatter(i+0.5, lane2, marker='+', **self.point_kw)
        self.ax.scatter(i+0.5, lane2, marker='o', **self.hollow_point_kw)

    def CZ(self, lane2, lane, i):
        self.connection('', lane, i, length=1)
        d_lane = lane2-lane - 0.25*(lane2-lane)/abs(lane2-lane)
        self.vertical_line(lane+0.5*d_lane, i+0.5, length=d_lane)
        self.ax.scatter(i+0.5, lane, marker='o', **self.point_kw)
        self.gate('Z', lane2, i)

    def CZX(self, lane2, lane, i):
        self.connection('', lane, i, length=1)
        self.connection('', lane2, i, length=1)
        d_lane = lane2-lane
        self.vertical_line(lane+0.5*d_lane, i+0.5, length=d_lane)
        self.ax.scatter(i+0.5, lane, marker='o', **self.point_kw)
        self.ax.scatter(i+0.5, lane2, marker='o', **self.point_kw)

    def SWAP(self, lane2, lane, i):
        self.connection('', lane, i, length=0.3)
        self.connection('', lane2, i, length=0.3)
        self.ax.plot([i+0.3, i+0.7], [lane, lane2], **self.line_kw)
        self.ax.plot([i+0.3, i+0.7], [lane2, lane], **self.line_kw)
        self.connection('', lane, i+0.7, length=0.3)
        self.connection('', lane2, i+0.7, length=0.3)

    def SWAPX(self, lane2, lane, i):
        self.connection('', lane, i, length=1)
        self.connection('', lane2, i, length=1)
        d_lane = lane2-lane
        self.vertical_line(lane+0.5*d_lane, i+0.5, length=d_lane)
        self.ax.scatter(i+0.5, lane, marker='x', **self.point_kw)
        self.ax.scatter(i+0.5, lane2, marker='x', **self.point_kw)

    def gate3(self, name, lane3, lane2, lane, i):
        if name == 'TOFF':
            self.Toffoli(lane3, lane2, lane, i)
        elif name == 'CCNOT':
            self.Toffoli(lane3, lane2, lane, i)
        elif name == 'CCX':
            self.Toffoli(lane3, lane2, lane, i)
        elif name == 'Fredkin':
            self.Fredkin(lane3, lane2, lane, i)
        elif name == 'CSWAP':
            self.Fredkin(lane3, lane2, lane, i)
        self.connection('', lane, i, length=1)

    def Toffoli(self, lane3, lane2, lane, i):
        self.CZX(lane2, lane, i)
        self.CNOT(lane3, lane2, i)

    def Fredkin(self, lane3, lane2, lane, i):
        self.SWAPX(lane3, lane2, i)
        d_lane = lane2-lane
        self.vertical_line(lane+0.5*d_lane, i+0.5, length=d_lane)
        self.ax.scatter(i+0.5, lane, marker='o', **self.point_kw)

    def label_IO(self, i=None, o=None, fontsize=None):
        rtextkw = self.rtext_kw
        ltextkw = self.ltext_kw
        if fontsize is not None:
            rtextkw['fontsize'] = fontsize
            ltextkw['fontsize'] = fontsize
        if i is not None:
            self.input_labels = i
        if o is not None:
            self.output_labels = o
        for lane_idx, lane_lbl in enumerate(self.input_labels[::-1]):
            self.ax.text(-0.25, lane_idx, lane_lbl, **rtextkw)
        for lane_idx, lane_lbl in enumerate(self.output_labels[::-1]):
            self.ax.text(self.length+0.25, lane_idx, lane_lbl, **ltextkw)

    @property
    def length(self):
        if not hasattr(self, 'comp_chains'):
            return self.N_comp+2
        return len(self.comp_chains[0])

    @property
    def breadth(self):
        return self.N_in

    def set_figsize(self, width, height, forward=True):
        self.figure.set_size_inches(width, height, forward=forward)

    def graph(self, offset=1.):
        self.sanitize()
        for lane, chain in enumerate(self.comp_chains[::-1]):
            for i, component in enumerate(chain):
                if component:
                    gate = component.split(',')[0]
                    args = component.split(',')[1:]
                else:
                    gate, args = 'connection', ''
                draw = getattr(self, gate)
                if len(args) > 1:
                    args = (args[0],) + tuple(int(a) for a in args[1:])
                elif args:
                    args = (args[0],)
                else:
                    args = (args,)
                args += (lane, i)
                draw(*args)
        self.ax.set_ylim(0-offset, self.N_in-1+offset)
        plt.axis('off')
        self.ax.set_aspect('equal')
        self.figure.tight_layout()

    def save(self, savename, dpi=600,
             transparent=True, bbox_inches='tight', pad_inches=0):
        self.figure.savefig(savename,
                            dpi=dpi,
                            transparent=transparent,
                            bbox_inches=bbox_inches,
                            pad_inches=pad_inches)

    @staticmethod
    def show():
        plt.show()

    @property
    def line_kw(self):
        kw = dict(color=self.base_color,
                  lw=self.lw)
        return kw

    @property
    def text_kw(self):
        kw = dict(fontsize=self.fontsize,
                  ha=self.horizontalalignment,
                  va=self.verticalalignment,
                  color=self.base_color)
        return kw

    @property
    def rtext_kw(self):
        kw = dict(fontsize=self.fontsize,
                  ha='right',
                  va=self.verticalalignment,
                  color=self.base_color)
        return kw

    @property
    def ltext_kw(self):
        kw = dict(fontsize=self.fontsize,
                  ha='left',
                  va=self.verticalalignment,
                  color=self.base_color)
        return kw

    @property
    def point_kw(self):
        kw = dict(s=self.point_size,
                  zorder=10,
                  lw=self.lw,
                  edgecolor=self.base_color,
                  facecolor=self.base_color)
        return kw

    @property
    def hollow_point_kw(self):
        kw = dict(s=self.point_size+20,
                  zorder=10,
                  lw=self.lw,
                  edgecolor=self.base_color,
                  facecolor=(0, 0, 0, 0))
        return kw

    @staticmethod
    def bra(state):
        return r'$\langle${}$|$'.format(state)

    @staticmethod
    def ket(state):
        return r'$|${}$\rangle$'.format(state)



if __name__ == "__main__":
    c = QCircuit(2)
    c.comp_chains = [
        [None, 'gate,H', 'gate,X', None],
        [None,  None,     None,    None],
    ]
    c.graph()
    c.save('test1.png')

    c = QCircuit(1)
    c.comp_chains = [['connection,input', 'wide_gate,gate', 'connection,output']]
    c.graph()
    c.save('test2.png')

    c = QCircuit(3)
    c.comp_chains = [
        [None, 'gate2,CNOT,0', None,  None,  None],
        [None,  None,          None, 'skip', None],
        [None,  'skip',        None,  None,  None],
    ]
    c.label_IO([c.ket('x'), c.ket('y'), c.ket('z')],
               [c.ket('x'), c.ket('0'), c.ket(r'x$\otimes$z')])
    c.graph()
    c.save('test3.png')

    c = QCircuit(3)
    c.comp_chains = [
        [None, 'gate2,CZ,0', None, 'gate,X', None],
        [None,  None,        None,  None,    None],
        [None, 'skip',       None,  None,    None],
    ]
    c.graph()
    c.save('test4.png')

    c = QCircuit(3)
    c.comp_chains = [
        [None, 'gate2,SWAP,1', None, 'gate,Y', None],
        [None, 'skip',         None,  None,    None],
        [None,  None,          None,  None,    None],
    ]
    c.graph()
    c.save('test5.png')

    c = QCircuit(6)
    c.comp_chains = [
        [None, 'gate3,TOFF,1,2', None, 'gate,S', None],
        [None,  None,            None,  None,    None],
        [None,  None,            None,  None,    None],
        [None, 'skip',           None,  None,    None],
        [None, 'skip',           None,  None,    None],
        [None,  None,            None,  None,    None],
    ]
    c.graph()
    c.save('test6.png')

    c = QCircuit(6)
    c.comp_chains = [
        [None, 'gate3,CSWAP,1,2', None, r'gate,$\angle$', None],
        [None,  None,             None,  None,    None],
        [None,  None,             None,  None,    None],
        [None, 'skip',            None,  None,    None],
        [None, 'skip',            None,  None,    None],
        [None,  None,             None,  None,    None],
    ]
    c.graph()
    c.save('test7.png')

    c = QCircuit(3)
    c.set_figsize(7, 3)
    c.comp_chains = [[None, 'wide_gate2,Bell\nmeas.,1', None,   None,                   r'combine,$\sigma^i_z$,0','skip'], 
                     [None, 'skip',                     None, r'combine,$\sigma^j_x$,0', 'skip',                  'skip'],
                     [None,  None,                      None,  'skip',                   'skip',                   None]]
    c.label_IO([c.ket(r'$\phi_{S}$'), 'Alice '+c.ket(r'$\psi^{00}$'), 'Bob '+c.ket(r'$\psi^{00}$')],
               ['', '', c.ket(r'$\phi$')+r'$_{B}$'])
    c.graph()
    c.save('test8.png', transparent=True, dpi=500)
