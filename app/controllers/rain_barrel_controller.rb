class RainBarrelController < ApplicationController
	respond_to :json

  def index
  	if current_user
      @water_quality = MyRainBarrel.where(user_id: current_user.id).first
    else
      @water_quality = MyRainBarrel.where(id: 1).first
    end
  	@ph_color = "green_highlight"
  	@ph_color = "yellow_highlight" if (@water_quality.ph < 6.5 && @water_quality.ph > 6.0) || (@water_quality.ph > 7.5 && @water_quality.ph < 8.0)
  	@ph_color = "red_highlight" if (@water_quality.ph < 6.0 || @water_quality.ph > 8.0)
  	@TDS_color = "green_highlight"
  	@TDS_color = "yellow_highlight" if (@water_quality.total_dissolved_solids > 50 && @water_quality.total_dissolved_solids < 400)
  	@TDS_color = "red_highlight" if (@water_quality.total_dissolved_solids > 400);
  	@alerts = []
  	@alerts << "pH is too high" if (@water_quality.ph < 6.0 || @water_quality.ph > 8.0)
  	@alerts << "TDS is too high" if (@water_quality.total_dissolved_solids > 400)
  end

  def water_quality
  	if current_user
      @water_quality = MyRainBarrel.where(user_id: current_user.id).first
    else
      @water_quality = MyRainBarrel.where(id: 1).first
    end
  	@ph_color = "green_highlight"
  	@ph_color = "yellow_highlight" if (@water_quality.ph < 6.5 && @water_quality.ph > 6.0) || (@water_quality.ph > 7.5 && @water_quality.ph < 8.0)
  	@ph_color = "red_highlight" if (@water_quality.ph < 6.0 || @water_quality.ph > 8.0)
  	@TDS_color = "green_highlight"
  	@TDS_color = "yellow_highlight" if (@water_quality.total_dissolved_solids > 50 && @water_quality.total_dissolved_solids < 400)
  	@TDS_color = "red_highlight" if (@water_quality.total_dissolved_solids > 400);
  end

  # update current users rain barrel stats when arduino sends the data
  def update
    # user = User.where(product_id: params[:product_id])
    # rb = MyRainBarrel.where(user_id: user.id).first
    # rb.update ...
  end

  def reset_filter_life_remaining
    if current_user
      rb = MyRainBarrel.where(user_id: current_user.id).first
    else
      rb = MyRainBarrel.where(id: 1).first
    end

    rb.filter_life_remaining = params[:days]
    rb.save
    respond_with rb.to_json
  end

  def water_usage

  end

  def filter_life
    if current_user
      @filter = MyRainBarrel.where(user_id: current_user.id).first
    else
      @filter = MyRainBarrel.where(id: 1).first
    end
  end

  def email_alert
    puts "HELLOOOOOOO"
    UserMailer.email_alert(current_user, params["alerts"]).deliver
    puts "SUPER FINISHED"
    msg = {:pid => "hello"}
    # respond_to do |format|
    #   format.json { render json: MyRainBarrel.where(id: "1").first.to_json }
    # end
    respond_with msg.to_json
  end

  def filter_reset
    if current_user
      rb = MyRainBarrel.where(user_id: current_user.id).first
    else
      rb = MyRainBarrel.where(id: 1).first
    end
  
    rb.filter_life_remaining = rb.filter_life
    rb.save
    redirect_to rain_barrel_filter_life_path
  end

  def stats
    if current_user
      rb = MyRainBarrel.where(user_id: current_user.id).first
    else
      rb = MyRainBarrel.where(id: 1).first
    end
  	respond_with rb.to_json
  end

  def run_sim 	
    pid = fork do
  		Signal.trap("TERM") { exit }

      if current_user
  		  MyRainBarrel.simulation(current_user.id, params["type"]) 
      else 
        MyRainBarrel.simulation("none", params["type"]) 
      end

  		exit
  	end	
  	flash[:notice] = 'The simulation has started.'
  	msg = {:pid => "#{pid}"}
  	if params["type"]
  		redirect_to "/"
  	else
  		respond_with msg.to_json
  	end
  end

  def end_sim
  	Process.kill("TERM", params["pid"].to_i)
  	Process.wait 
  	msg = {:status => "ending sim"}
  	respond_with msg.to_json
  end

  def print_sensor
	 somefile = File.open("testfile.txt", "w")
	 somefile.puts "Hello World"
	 puts "Hello World"
   

  end
end
