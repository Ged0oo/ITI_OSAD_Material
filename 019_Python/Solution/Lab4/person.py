class Person:
    moods = ("happy", "tired", "lazy")

    def __init__(self, name, money=0, mood="happy", healthRate=100):
        self.name = name
        self.money = money
        self.mood = mood
        self.healthRate = max(0, min(healthRate, 100))

    def sleep(self, hours):
        if hours == 7:
            self.mood = "happy"
        elif hours < 7:
            self.mood = "tired"
        else:
            self.mood = "lazy"

    def eat(self, meals):
        if meals == 3:
            self.healthRate = 100
        elif meals == 2:
            self.healthRate = 75
        elif meals == 1:
            self.healthRate = 50

    def buy(self, items):
        self.money -= items * 10