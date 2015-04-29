class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  before_save { self.password_confirmation = self.password }
  
  has_many :daily_water_logs
  has_many :my_rain_barrels
	
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  # validates :password, length: { minimum: 6 }, confirmation: true
  has_secure_password 


  # Creates identificiation cookie for new users
  before_create { generate_token(:auth_token) }
  
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end

  def self.states
    return STATES
  end

  STATES = %w[
    DC MD VA AL AK AZ AR CA CO CT DE
    FL GA HI ID IL IN IA KS KY
    LA ME MA MI MN MS MO MT NE
    NV NH NJ NM NY NC ND OH OK OR PA
    RI SC SD TN TX UT VT WA WV WI WY
  ]




end
