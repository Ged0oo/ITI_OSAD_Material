def mario_pyramid(height):
    for i in range(1, height + 1):
        spaces = " " * (height - i)
        stars = "*" * i
        print(f"{spaces}{stars}")

mario_pyramid(4)
mario_pyramid(7)