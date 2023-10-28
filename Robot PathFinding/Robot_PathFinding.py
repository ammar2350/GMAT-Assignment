import heapq
import math

def dijkstra(graph, awal, akhir):
    heap = [(0, awal)]
    dikunjungi = set()
    while heap:
        (biaya, node) = heapq.heappop(heap)
        if node not in dikunjungi:
            dikunjungi.add(node)
            if node == akhir:
                return biaya
            for tetangga, c in graph[node]:
                if tetangga not in dikunjungi:
                    heapq.heappush(heap, (biaya + c, tetangga))
    return math.inf

def cek_berpotongan(x1, y1, x2, y2, x3, y3, x4, y4):
    if (x1 == x2 and y1 == y2) or (x3 == x4 and y3 == y4):
        return False
    if (x1 == x3 and y1 == y3) or (x1 == x4 and y1 == y4) or (x2 == x3 and y2 == y3) or (x2 == x4 and y2 == y4):
        return False
    if ((y3 - y1) * (x2 - x1) - (x3 - x1) * (y2 - y1)) * ((y4 - y1) * (x2 - x1) - (x4 - x1) * (y2 - y1)) > 0:
        return False
    if ((y1 - y3) * (x4 - x3) - (x1 - x3) * (y4 - y3)) * ((y2 - y3) * (x4 - x3) - (x2 - x3) * (y4 - y3)) > 0:
        return False
    return True

def jarak_terpendek(Sx, Sy, Fx, Fy, T_Rintangan):
    titik = [(Sx, Sy)]
    for rintangan in T_Rintangan:
        titik.append((rintangan[0], rintangan[1]))
        titik.append((rintangan[2], rintangan[3]))
    titik.append((Fx, Fy))
    n = len(titik)
    graph = {i: [] for i in range(n)}
    for i in range(n):
        for j in range(i + 1, n):
            if not any(cek_berpotongan(titik[i][0], titik[i][1], titik[j][0], titik[j][1], rintangan[0], rintangan[1], rintangan[2], rintangan[3]) for rintangan in T_Rintangan):
                graph[i].append((j, math.sqrt((titik[j][0] - titik[i][0]) ** 2 + (titik[j][1] - titik[i][1]) ** 2)))
                graph[j].append((i, math.sqrt((titik[j][0] - titik[i][0]) ** 2 + (titik[j][1] - titik[i][1]) ** 2)))
    return dijkstra(graph, 0, n-1)

Sx, Sy = map(int, input().split())
Fx, Fy = map(int, input().split())
N = int(input())
T_Rintangan = []
for i in range(N):
    rintangan = input().split()
    rintangan = [int(x) for x in rintangan]
    T_Rintangan.append(rintangan)
print(f'{jarak_terpendek(Sx, Sy, Fx, Fy, T_Rintangan):.6f}')
