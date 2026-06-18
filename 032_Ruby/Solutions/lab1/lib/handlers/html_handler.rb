require_relative 'handler'

class HtmlHandler < Handler
  def initialize(filepath)
    @filepath = filepath
    @events = []
  end

  def handle(event)
    @events << event
    File.write(@filepath, dashboard_html)
  end

  private

  def dashboard_html
    <<~HTML
      <!DOCTYPE html>
      <html lang="en">
        #{head_html}
        <body>
          <div class="container">
            <h1>LifeTrack Dashboard</h1>
            #{events_html}
          </div>
        </body>
      </html>
    HTML
  end

  def head_html
    <<~HTML
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LifeTrack Dashboard</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            margin: 2rem;
            background: #f4f4f9;
            color: #333;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
          }

          .event-card {
            background: white;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          .event-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
          }

          .type {
            font-weight: bold;
            text-transform: uppercase;
            color: #0056b3;
          }

          .time {
            color: #888;
            font-size: 0.9rem;
          }

          .desc {
            font-size: 1.1rem;
          }

          .duration {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 0.2rem 0.6rem;
            background: #e9ecef;
            border-radius: 12px;
            font-size: 0.85rem;
          }
        </style>
      </head>
    HTML
  end

  def events_html
    @events.map { |event| event_card(event) }.join("\n")
  end

  def event_card(event)
    <<~HTML
      <div class="event-card">
        <div class="event-header">
          <span class="type">#{event.type}</span>
          <span class="time">#{event.formatted_time}</span>
        </div>

        <div class="desc">#{event.description}</div>

        <div class="duration">
          ⏱ #{event.duration} min
        </div>
      </div>
    HTML
  end
end