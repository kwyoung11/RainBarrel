require 'test_helper'

class RainBarrelControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get water_quality" do
    get :water_quality
    assert_response :success
  end

  test "should get filter_life" do
    get :filter_life
    assert_response :success
  end

end
