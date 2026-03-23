from car import Car
from employee import Employee
from office import Office
from persistence import save_to_json


def main():
    fiat128 = Car("Fiat 128", fuelRate=100, velocity=60)

    samy = Employee(
        id=1,
        name="Samy",
        car=fiat128,
        email="samy@mail.com",
        salary=5000,
        distanceToWork=20
    )

    iti = Office("ITI Smart Village")
    iti.hire(samy)

    samy.drive(60)
    iti.check_lateness(1, moveHour=8)
    samy.send_mail("monagy@gmail.com", "New Mail", "Hello Mohamed, Please join the meeeting now.", "samy@iti.gov.eg")
    save_to_json(iti)


if __name__ == "__main__":
    main()