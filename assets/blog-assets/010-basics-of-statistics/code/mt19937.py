"""
@author: phdenzel

The Mersenne Twister algorithm
for generating random numbers
in Python
"""
N = 624
M = 397

L = 18
S = 7
T = 15
U = 11

A = 0x9908B0DF
B = 0x9D2C5680
C = 0xEFC60000
D = 0xFFFFFFFF

lmask = 0xFFFFFFFF
umask = 0x00000000
seed = 5489
mult = 1812433253

MT_vec = [0 for i in range(N)]
idx = N+1


def MT_seed(seed):
    MT_vec[0] = seed
    for i in range(1, N):
        temp_seed = mult * (MT_vec[i-1] ^ (MT_vec[i-1] >> 30)) + i
        MT_vec[i] = temp_seed & 0xffffffff

MT_seed(seed)


def twist():
    for i in range(0, N):
        x = (MT_vec[i] & umask) + (MT_vec[(i+1) % N] & lmask)
        xA = x >> 1
        if (x % 2) != 1:
            xA = xA ^ A
        MT_vec[i] = MT_vec[(i+M) % N] ^ xA


def extract():
    global idx
    if idx >= N:
        twist()
        idx = 0

    e = MT_vec[idx]
    e = e ^ ((e >> U) & D)
    e = e ^ ((e << T) & C)
    e = e ^ ((e << S) & B)
    e = e ^ (e >> L)

    idx += 1
    return e & 0xffffffff

def random():
    r = extract() / 4294967296.  # / 2**32
    return r

def randint(a=1, b=100):
    r = random()
    rint = int(r / (1. / (b-a)) + a)
    return rint

def shuffle(X):
    NX = list(X)
    for i in range(10*len(X)):
        a = randint(0, len(X))
        b = randint(0, len(X))
        NX[a], NX[b] = NX[b], NX[a]
    return NX

def bernoulli(p):
    return random() <= p

def binomial(n, p):
    a = [bernoulli(p) for _ in range(n)]
    return a.count(True)
    
        
if __name__ == "__main__":
    # import time
    # ini = int(time.time() * 100)
    ini = 42
    MT_seed(ini)

    print(random())
