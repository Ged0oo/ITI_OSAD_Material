package Liskov.WrongLiskov;
//dto
public class AuthRequests {
    public String username;
    public String password;

    AuthRequests(){

    }
    AuthRequests(String username,String password){
        this.username=username;
        this.password=password;
    }
    AuthRequests(String username){

    }
}
