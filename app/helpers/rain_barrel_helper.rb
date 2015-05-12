module RainBarrelHelper
  # Based on the category, time and metric measurement options selected by the user,
  # instantiate an SQL query that retrieves the appropriate data, and then convert into JSON format
  # to display in the view.
  # @param metric_param. The chosen measurement variable.
  # @param time_param. The chosen time interval.
  # @return. JSON formatted string to workouts#analyze controller method.
  def get_metric_data(metric_param, time_period)
  	metric_param = metric_param.downcase.gsub(" ", "_")
  	puts metric_param
    determineQuery(metric_param, format_time(time_period), date_trunc(time_period), getSeriesLength(time_period));
    @total_metric.map { |r| { 
    		date: r.date.strftime("%Y-%m-%d"), 
    		load_volume: choose_metric(r, metric_param), 
    		overflowed: r.overflowed, 
    		total_load_volume: r["total_#{metric_param.downcase.gsub(" ", "_")}"] 
    	} 
    }
  end
  
  # Choose the measurement metric to display
  def choose_metric(r, params)
    params == "water_collected" ? r.water_collected :
    params == "water_used" ? r.water_used :
    params == "amount_overflown" ? r.amount_overflown :
    params == "ph" ? r.ph : r.tds
  end
  
  
  #########################
  # Begin helper functions
  ########################
  
  # Picker function which chooses the type of SQL query to run on the database
  def determineQuery(metric_param, time_window, time_period, series_length)  
  	if current_user
      user_id = MyRainBarrel.where(user_id: current_user.id).first
    else
      user_id = MyRainBarrel.where(id: 1).first
    end  

    @total_metric = DailyWaterLog.find_by_sql(["SELECT 
           DISTINCT date_trunc(?, series.date)::date as date,
           id, 
           #{metric_param.downcase.gsub(" ", "_")},
           sum(COALESCE(#{metric_param.downcase.gsub(" ", "_")}, 0)) OVER WIN as total_#{metric_param.downcase.gsub(" ", "_")},
           overflowed, water_used, amount_overflown, ph, tds
        FROM (
           SELECT generate_series(?, 0) + (current_date-13)::date as date
        ) series 
    LEFT OUTER JOIN 
           daily_water_logs on series.date = daily_water_logs.created_at::date AND 
           (daily_water_logs.created_at BETWEEN ? AND ?)
        WINDOW 
           WIN AS (PARTITION BY date_trunc(?, series.date)::date)
        ORDER BY 
           date ASC", time_period, series_length, time_window, Time.now.tomorrow.midnight, time_period])
  end

  # Format the time based on Users' input
  def format_time(time_window) 
    time_window == "One-Week" ? Time.now.midnight - 7.days :
    time_window == "Days" ? Time.now.midnight - 22.days :
    time_window == "Weeks" ? Time.now.midnight - 22.weeks :
    time_window == "Months" ? Time.now.midnight - 12.months :
    Time.now.midnight - 22.days
  end
  
  def date_trunc(time_window)
    time_window == "One-Week" ? 'day' :
    time_window == "Days" ? 'day' :
    time_window == "Weeks" ? 'week' :
    time_window == "Months" ? 'month' :
    'day'
  end
  
  def getSeriesLength(time_period)
    if time_period == "One-Week"
      -12 
    elsif time_period == 'Weeks' 
      -154
    elsif time_period == "Months"
      -365
    else 
      -22
    end
  end
  
end