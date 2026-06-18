require_relative 'events/event'

class Menu
  def initialize(router)
    @router = router
  end

  def start
    loop do
      puts "\n=== LifeTrack ==="
      puts "1. Log a work session"
      puts "2. Log a study session"
      puts "3. Log an exercise session"
      puts "4. Log a meal"
      puts "5. Exit"
      print "\nChoose an option: "
      
      choice = gets.chomp
      break if choice == '5'

      handle_choice(choice)
    end
  end

  private

  def handle_choice(choice)
    type = case choice
           when '1' then 'Work'
           when '2' then 'Study'
           when '3' then 'Exercise'
           when '4' then 'Meal'
           else
             puts "Invalid choice. Please try again."
             return
           end

    print "Description: "
    description = gets.chomp

    print "Duration (minutes): "
    duration = gets.chomp.to_i

    event = Event.new(type: type, description: description, duration: duration)
    @router.dispatch(event)
  end
end
