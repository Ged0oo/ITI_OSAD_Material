package library.model;

public class Magazine extends LibraryItem{
    private int issueNumber;

    public Magazine(String id, String title, int issueNumber) {
        super(id, title);
        this.issueNumber = issueNumber;
    }

    public Magazine(){}

    public void setIssueNumber(int issueNumber){this.issueNumber = issueNumber;}
    public int getIssueNumber(){return  this.issueNumber;}

    @Override
    public String getItemDetails() {
        return "Magazine [ID: " + getId() + ", Title: " + getTitle() + ", Issue: " + issueNumber + "]";
    }

    @Override
    public void update(Object newData) {
        super.update(newData);
        if (newData instanceof Magazine) {
            Magazine newMagazine = (Magazine) newData;
            this.setIssueNumber(newMagazine.getIssueNumber());
        }
    }
}