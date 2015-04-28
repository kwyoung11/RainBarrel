class RainBarrelController < ApplicationController
	respond_to :json, :html

  def index
    puts "HELLO"
  	@water_quality = MyRainBarrel.where(id: "1").first
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
  	@water_quality = MyRainBarrel.where(id: "1").first
  	@ph_color = "green_highlight"
  	@ph_color = "yellow_highlight" if (@water_quality.ph < 6.5 && @water_quality.ph > 6.0) || (@water_quality.ph > 7.5 && @water_quality.ph < 8.0)
  	@ph_color = "red_highlight" if (@water_quality.ph < 6.0 || @water_quality.ph > 8.0)
  	@TDS_color = "green_highlight"
  	@TDS_color = "yellow_highlight" if (@water_quality.total_dissolved_solids > 50 && @water_quality.total_dissolved_solids < 400)
  	@TDS_color = "red_highlight" if (@water_quality.total_dissolved_solids > 400);
  end

  def water_usage

  end

  def filter_life
  end

  def stats
  	respond_with MyRainBarrel.where(id: "1").first.to_json
  end

  def run_sim 	
  	pid = fork do
  		Signal.trap("TERM") { exit }
  		MyRainBarrel.simulation(params["type"])
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
end
