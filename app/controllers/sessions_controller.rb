class SessionsController < ApplicationController

	def new
		redirect_to root_path
	end

 	def create
 	 user = User.find_by_email(params[:email].downcase)
 	 puts user.inspect
 	 puts params
 	 if user && user.authenticate(params[:password])
 	   cookies[:auth_token] = user.auth_token
 	   # if params[:remember_me]
 	   #   cookies.permanent[:auth_token] = user.auth_token
 	   # else
 	   #   cookies[:auth_token] = user.auth_token
 	   # end
 	   # user.last_sign_in_at = Time.now
 	   # if user.sign_in_count.nil?
 	   #   user.sign_in_count = 1 
 	   # else
 	   #   user.sign_in_count += 1
 	   # end
 	   # user.save!(validate: false)
 	   # Direct user to perform workouts on mobile, else to profile
 	   # redirect_to( mobile_device? ? performable_user_workouts_path(user) : user_path(user) )
 	   redirect_to root_url
 	 else
 	   flash.now[:notice] = "Invalid email or password"
 	   render "new"
 	 end
 	end	

 	def destroy
 	  cookies.delete(:auth_token)
 	  redirect_to root_url, :notice => "Logged out!"
 	end
end
