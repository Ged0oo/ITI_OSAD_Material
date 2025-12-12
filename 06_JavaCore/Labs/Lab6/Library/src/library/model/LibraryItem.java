package library.model;

public abstract class LibraryItem implements CrudInterface {
    private String id;
    private String title;

    public void setId(String id){this.id = id;}
    public void setTitle(String title){this.title = title;}

    public String getId(){return this.id;}
    public String getTitle(){return this.title;}

    public LibraryItem(String id, String title){
        this.title = title;
        this.id = id;
    }

    public LibraryItem(){}

    public abstract String getItemDetails();

    @Override
    public void create() {}

    @Override
    public String read() {
        return getItemDetails();
    }

    @Override
    public void update(Object newData) {
        if (newData instanceof LibraryItem) {
            LibraryItem newItem = (LibraryItem) newData;
            this.setTitle(newItem.getTitle());
        }
    }

    @Override
    public void delete() {}
}