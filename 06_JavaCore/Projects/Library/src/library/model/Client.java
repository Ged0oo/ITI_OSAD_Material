package library.model;

public class Client implements CrudInterface {
    private String id;
    private String name;
    private String phone;
    private String email;

    public Client(String id, String name, String phone, String email){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    public void setId(String id){this.id = id;}
    public void setName(String name){this.name = name;}
    public void setPhone(String phone){this.phone = phone;}
    public void setEmail(String email){this.email = email;}

    public String getId(){return this.id;}
    public String getName(){return this.name;}
    public String getPhone(){return this.phone;}
    public String getEmail(){return this.email;}

    public String getClientDetails() {
        return "Client [ID: " + id + ", Name: " + name + ", Email: " + email + "]";
    }

    @Override
    public void create() {

    }

    @Override
    public String read() {
        return getClientDetails();
    }

    @Override
    public void update(Object newData) {
        if (newData instanceof Client) {
            Client newClient = (Client) newData;
            this.setName(newClient.getName());
            this.setPhone(newClient.getPhone());
            this.setEmail(newClient.getEmail());
        }
    }

    @Override
    public void delete() {

    }
}