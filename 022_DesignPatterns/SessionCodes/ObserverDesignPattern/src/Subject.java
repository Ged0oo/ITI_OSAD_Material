public interface Subject {
    void subscribe(Observer observer);
    void unsubscribe(Observer observer);
    void notifyObservers(String videoTitle);
    void uploadVideo(String videoTitle);
    boolean hasSubscriber(Observer observer);
}
