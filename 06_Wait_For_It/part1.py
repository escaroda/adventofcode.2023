import os

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "input"), "r") as file:
    times, distances = [list(map(int, line[9:].strip().split())) for line in file.readlines()]

total = 1

for i in range(len(times)):
    time = times[i]
    record = distances[i]
    ways = 0

    for speed in range(1, time):
        distance = speed * (time - speed)

        if distance > record:
            ways += 1

    if ways:
        total *= ways

print(f"The number of ways multiplied together is {total}")
