public class Main {
    public static void main(String[] args) {
            // Create a YouTube channel (Subject)
            YouTubeChannel channel = new YouTubeChannel("TechWorld");

            // Create subscribers (Observers)
            YouTubeSubscriber sub1 = new YouTubeSubscriber("Alice");
            YouTubeSubscriber sub2 = new YouTubeSubscriber("Bob");

            // Subscribers subscribe to the channel
            channel.subscribe(sub1);
            channel.subscribe(sub2);

            // Upload a video and notify subscribers
            channel.uploadVideo("Observer Pattern in Java");

            // Unsubscribe a user
            channel.unsubscribe(sub2);

            // Upload another video
            channel.uploadVideo("Singleton Pattern Explained");

            // Alice requests a new video
            sub1.requestVideo(channel, "Design Patterns in Real Life");

            // Bob requests another video
            sub2.requestVideo(channel, "Java Multithreading Explained");
        }
    }
