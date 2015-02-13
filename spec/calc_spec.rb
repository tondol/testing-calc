require 'selenium-webdriver'

describe "Google", "Chrome" do

  def click(array)
    array.each {|btn|
      @driver.find_element(:id, btn).click
    }
  end
  def result
    @driver.find_element(:id, 'result').attribute('value')
  end

  before do
    @target = File.dirname(File.expand_path(__dir__)) + "/public/index.html"
    @driver = Selenium::WebDriver.for :chrome
    @driver.navigate.to "file://" + @target
  end

  it "show correct value for user input by button" do
    click(['btn-1', 'btn-divide', 'btn-2', 'btn-plus', 'btn-2', 'btn-divide', 'btn-3'])
    expect(result).to eq "1/2+2/3"
    click(['btn-equal'])
    expect(result).to eq "7/6"
  end

  it "shows correct value for user input by keyboard" do
    
  end

  after do
    @driver.quit
  end
end
