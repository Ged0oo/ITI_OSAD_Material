package library.model;

public abstract class LibraryItem {
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

    public abstract String getItemDetails();
}
