package main.validation;

import java.util.Scanner;
import java.util.regex.Pattern;

public class Validation {

    public Pattern ID_PATTERN    = Pattern.compile("^\\d{6}$");
    public Pattern PHONE_PATTERN = Pattern.compile("^\\d{11}$");
    public Pattern NAME_PATTERN  = Pattern.compile("^[a-zA-Z ]+$");
    public Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

    public String getInputWithValidation(Scanner sc, String prompt, Pattern pattern, String validationMessage, boolean trim) {
        String input;
        boolean isValid;
        do {
            System.out.print(prompt);
            input = sc.nextLine();

            if (trim) input = input.trim();

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

    public boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    public Validation(){}
}
