from person import Person

class Employee(Person):
    def __init__(self, id, name, car, email, salary, distanceToWork, money=0, mood="happy", healthRate=100):
        super().__init__(name, money, mood, healthRate)

        self.id = id
        self.car = car
        self.distanceToWork = distanceToWork
        self.email = email
        self.salary = max(salary, 1000)

    def work(self, hours):
        if hours == 8:
            self.mood = "happy"
        elif hours > 8:
            self.mood = "tired"
        else:
            self.mood = "lazy"

    def drive(self, velocity):
        self.car.run(velocity, self.distanceToWork)

    def refuel(self, gasAmount=100):
        self.car.fuelRate = min(100, self.car.fuelRate + gasAmount)

    def send_mail(self, to, subject, msg, receiver_name):
        filename = "email.txt"
        with open(filename, "w") as f:
            f.write(f"From: {self.email}\n")
            f.write(f"To: {to}\n")
            f.write(f"Subject: {subject}\n")
            f.write(f"Hi, {receiver_name}\n")
            f.write(f"{msg}\n")
            f.write("Thanks\n")