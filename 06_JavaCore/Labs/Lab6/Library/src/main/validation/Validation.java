package main.validation;

import java.util.Scanner;
import java.util.regex.Pattern;

public class Validation {

    public Pattern ID_PATTERN    = Pattern.compile("^\\d{6}$");
    public Pattern PHONE_PATTERN = Pattern.compile("^\\d{11}$");
    public Pattern NAME_PATTERN  = Pattern.compile("^[a-zA-Z ]+$");
    public Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

    public int getIntWithValidation(Scanner sc, String prompt, String validationMessage, int min, int max) {
        int value;
        while (true) {
            try {
                System.out.print(prompt);
                value = Integer.parseInt(sc.nextLine());
                if (value >= min && value <= max) return value;
            } catch (NumberFormatException ignored) {}

            System.out.println(validationMessage);
        }
    }


    public String getInputWithValidation(Scanner sc, String prompt, Pattern pattern, String validationMessage) {
        String input;
        boolean isValid;
        do {
            System.out.print(prompt);
            input = sc.nextLine().trim();
            isValid = pattern.matcher(input).matches();
            if (!isValid) System.out.println(validationMessage);

        } while (!isValid);
        return input;
    }

    public boolean isValidName(String name) {
        return NAME_PATTERN.matcher(name).matches();
    }

    public boolean isValidPhone(String phone) {
        return PHONE_PATTERN.matcher(phone).matches();
    }

    public boolean isValidId(String id) {
        return ID_PATTERN.matcher(id).matches();
    }

    public boolean isValidCopiesCount(int count) {
        return count >= 1 && count <= 9;
    }

    public boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    public Validation(){}
}
