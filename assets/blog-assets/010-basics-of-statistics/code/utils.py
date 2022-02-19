"""
@author: phdenzel

Utility functions for statistics snippets
"""
from math import factorial

def comb(n, k):
    return factorial(n) / factorial(k) / factorial(n-k)


def list_fmt(fmt, N=100, use_comma=False):
    if use_comma:
        divisor = ", "
    else:
        divisor = " "
    return "[ "+divisor.join(["{"+fmt+"}"]*N)+" ]"
