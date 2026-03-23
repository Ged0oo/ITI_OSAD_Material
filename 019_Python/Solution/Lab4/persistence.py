import json

def save_to_json(office):
    data = {
        "office_name": office.name,
        "employees": []
    }

    for emp in office.employees:
        data["employees"].append({
            "id": emp.id,
            "name": emp.name,
            "email": emp.email,
            "salary": emp.salary,
            "distanceToWork": emp.distanceToWork,
            "car": {
                "name": emp.car.name,
                "fuelRate": emp.car.fuelRate,
                "velocity": emp.car.velocity
            }
        })

    with open("office_data.json", "w") as f:
        json.dump(data, f, indent=4)