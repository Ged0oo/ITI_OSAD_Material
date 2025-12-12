package main.controller;

import main.ui.Ui;
import main.validation.Validation;
import library.service.Library;
import library.service.ClientManager;
import java.util.Scanner;

public abstract class BaseController {
    protected final Scanner sc;
    protected final Library library;
    protected final ClientManager clientManager;
    protected final Ui ui;
    protected final Validation valid;

    public BaseController(Scanner sc, Library library, ClientManager clientManager, Ui ui, Validation valid) {
        this.sc = sc;
        this.library = library;
        this.clientManager = clientManager;
        this.ui = ui;
        this.valid = valid;
    }

    public abstract void runMenu();
}