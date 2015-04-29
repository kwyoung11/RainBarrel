class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  private 
  
  def current_user
    @current_user ||= User.where(auth_token: cookies[:auth_token]).first if cookies[:auth_token]
  end
  helper_method :current_user
  
  def logged_in?
   current_user != nil
  end
  helper_method :logged_in?

end
