require "test_helper"

class Api::V1::SerchControllerTest < ActionDispatch::IntegrationTest
  test "should get posts" do
    get api_v1_serch_posts_url
    assert_response :success
  end
end
