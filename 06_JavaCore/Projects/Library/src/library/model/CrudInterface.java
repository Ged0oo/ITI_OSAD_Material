package library.model;

public interface CrudInterface {
    void create();

    String read();

    void update(Object newData);

    void delete();
}
