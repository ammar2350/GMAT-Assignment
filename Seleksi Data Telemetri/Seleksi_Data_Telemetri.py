id_team = input()
n = int(input())

for i in range(n):
    data = input().split(',')
    if len(data) != 6:
        print("TIDAK")
        continue
    if data[0] != id_team:
        print("TIDAK")
        continue
    clock = data[1].split(':')
    if len(clock) != 3:
        print("TIDAK")
        continue
    try:
        hours = int(clock[0])
        minutes = int(clock[1])
        seconds = int(clock[2])
        if not(0 <= hours <= 23 and 0 <= minutes <= 59 and 0 <= seconds <= 59):
            print("TIDAK")
            continue
    except:
        print("TIDAK")
        continue
    for j in range(3, 5):
        if not data[j].isdigit():
            print("TIDAK")
            break
    else:
        if data[5].endswith(';'):
            print("VALID")
        else:
            print("TIDAK")