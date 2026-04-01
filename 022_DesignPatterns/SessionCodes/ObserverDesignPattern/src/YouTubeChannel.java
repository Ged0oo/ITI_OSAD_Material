import java.util.ArrayList;
import java.util.List;

public class YouTubeChannel implements Subject {
    private List<Observer> subscribers = new ArrayList<>();
    private String channelName;

    public YouTubeChannel(String channelName) {
        this.channelName = channelName;
    }


    public void subscribe(Observer observer) {
        subscribers.add(observer);
    }


    public void unsubscribe(Observer observer) {
        subscribers.remove(observer);
    }


    public void notifyObservers(String videoTitle) {
        for (Observer subscriber : subscribers) {
            subscriber.update(videoTitle);
        }
    }

    public void uploadVideo(String videoTitle) {
        System.out.println("📢 " + channelName + " uploaded a new video: " + videoTitle);
        notifyObservers(videoTitle);
    }


    public boolean hasSubscriber(Observer observer) {
        if(this.subscribers.contains(observer)) return true;
        else return false;
    }

}
