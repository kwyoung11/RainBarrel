class UserMailer < ActionMailer::Base
  default from: "rainsenseapp@gmail.com"
  # add_template_helper(ApplicationHelper)

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #

  def email_alert(user, alert_reasons)
    puts "ABOUT TO SEND MAIL"

    @user = user
        puts "AFTER USER"

    alert_reasons = alert_reasons.split(',')
        puts "AFTER ALERT REASONS .split"

    @alert_reasons = alert_reasons
        puts "AFTER ALERT REASONS"

    mail(to: user.email, subject: "RainSense Alerts: #{alert_reasons}")
        puts "FINISHED"

  end

  # def deliver_invitation(user, invitation)
  #   if user == "Strengthify"
  #     user_name = "Strengthify"
  #     user_email = "activeterps@gmail.com"
  #   else
  #     user_name = user.name
  #     user_email = user.email
  #   end
  #   @user_name = user_name
  #   @invitation = invitation
  #   mail( 
  #   to: invitation.recipient_email,
  #   from: %{"#{user_name}"},
  #   reply_to: user_email, 
  #   subject: invitation.subject, 
  #   message: invitation.message
  #   )
  # end
end
