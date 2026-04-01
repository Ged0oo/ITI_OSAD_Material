public interface Observer {
    void update(String videoTitle);
    void requestVideo(Subject subject, String videoTitle);
}
