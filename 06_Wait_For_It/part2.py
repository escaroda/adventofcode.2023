import os

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "input"), "r") as file:
    time, record = [int(line[9:].strip().replace(" ", "")) for line in file.readlines()]

ways = 0

for speed in range(1, time):
    distance = speed * (time - speed)

    if distance > record:
        ways += 1

print(f"The number of ways is {ways}")
