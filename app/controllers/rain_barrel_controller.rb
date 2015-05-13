class RainBarrelController < ApplicationController
	respond_to :json
  skip_before_filter :verify_authenticity_token, only: :receive_arduino
  include RainBarrelHelper

  def index
  	if current_user
      @water_quality = MyRainBarrel.where(user_id: current_user.id).first
    else
      @water_quality = MyRainBarrel.where(id: 1).first
    end

    @check_current_user = current_user
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

  def get_history
    respond_to do |format|
      format.json { render json: get_metric_data(params[:metric], params[:time]) }
    end
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
    UserMailer.email_alert(current_user, params["alerts"]).deliver
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
    rb = MyRainBarrel.where(id: 1).first
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

  def receive_arduino
	json = params[:rain_barrel]
	
  puts "HELLOOOOOOOO"


	if current_user
		@water_quality = MyRainBarrel.where(user_id: current_user.id).first
	else
		@water_quality = MyRainBarrel.where(id: 1).first
	end

	# converting curr height of water in barrel to cm^3 (ml) then to gallons
	current_vol = ((14.2875**2)*Math::PI*json[:current_volume])*0.000264172 


	@water_quality.update(temperature: json[:temperature], ph: json[:ph], total_dissolved_solids: json[:tds], current_volume: current_vol, capacity_in_gallons: 4.94) 
	
  File.open("posts.json", "a") do |s|
		s.puts params
	end
  
  respond_with @water_quality.to_json
  end
end
