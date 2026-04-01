public class YouTubeSubscriber implements Observer {
    private String name;

    public YouTubeSubscriber(String name) {
        this.name = name;
    }


    public void update(String videoTitle) {
        System.out.println("👤 " + name + " received notification: New video uploaded - " + videoTitle);
    }


    public void requestVideo(Subject subject, String videoTitle) {
        if(subject.hasSubscriber(this)){
            System.out.println("📩 " + name + " requested a new video: " + videoTitle);
            subject.uploadVideo(videoTitle);  // Calls uploadVideo on the Observable
        }else{
            System.out.println("📩 " + name + " is not subscribed to  " + videoTitle);
        }

   }
}
