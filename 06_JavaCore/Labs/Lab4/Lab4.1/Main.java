public class Main {
    class MyException extends Exception {
        MyException() {
            super("This is my Own Exception Class.");
        }
    }

    class Car {
        private String carModel;
        
        Car() { 
            this.carModel = "BMW"; 
        }
        
        Car(String car) {
            this.carModel = car;
        }
        
        void checkCarModel(String carName) throws MyException {
            if (!carName.equals(carModel)) {
                throw new MyException();
            }
        }
    }

    class Customer {
        Customer() {}
        void checkCustomerCar(String carModel) {
            try {
                Car myCar = new Car();
                myCar.checkCarModel(carModel);
            } catch (MyException e) {
                System.out.println("Error Model Name.");
            }
        }
    }

    public static void main(String[] args) {
        Main m = new Main();
        Customer cus = m.new Customer();
        cus.checkCustomerCar("Nissan");
    }
}
