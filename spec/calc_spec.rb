require 'selenium-webdriver'

describe "testing-calc" do

  def click(array)
    array.each {|btn|
      @driver.find_element(:id, btn).click
    }
  end
  def keypress(key)
    @driver.find_element(:tag_name, 'body').send_keys(key)
  end
  def result
    @driver.find_element(:id, 'result').attribute('value')
  end

  before(:all) do
    @target = File.dirname(File.expand_path(__dir__)) + "/public/index.html"
    @driver = Selenium::WebDriver.for :chrome
    @driver.navigate.to "file://" + @target
  end
  before(:each) do
    click(['btn-clear'])
  end

  describe "behaves correctly for button events" do
    it "shows correct results for addition and substraction" do
      click(['btn-1', 'btn-divide', 'btn-2', 'btn-plus', 'btn-3', 'btn-divide', 'btn-4'])
      expect(result).to eq "1/2+3/4"
      click(['btn-equal'])
      expect(result).to eq "5/4"
      click(['btn-minus', 'btn-5', 'btn-divide', 'btn-6'])
      expect(result).to eq "5/4-5/6"
      click(['btn-equal'])
      expect(result).to eq "5/12"
      click(['btn-clear'])
      expect(result).to eq ""
    end
    it "shows correct results for multiplication and division" do
      click(['btn-7', 'btn-divide', 'btn-8', 'btn-multiply', 'btn-9', 'btn-divide', 'btn-1', 'btn-0'])
      expect(result).to eq "7/8*9/10"
      click(['btn-equal'])
      expect(result).to eq "63/80"
      click(['btn-divide', 'btn-1', 'btn-1', 'btn-divide', 'btn-1', 'btn-2'])
      expect(result).to eq "63/80/11/12"
      click(['btn-equal'])
      expect(result).to eq "21/3520"
      click(['btn-clear'])
      expect(result).to eq ""
    end
    it "shows correct results for expression includes parentheses" do
      click(['btn-left', 'btn-1', 'btn-plus', 'btn-2', 'btn-right', 'btn-multiply', 'btn-3', 'btn-equal'])
      expect(result).to eq "9"
      click(['btn-clear'])
      expect(result).to eq ""
    end
  end

  describe "behaves correctly for keyboard events" do
    it "shows correct results for addition and substraction" do
      keypress("1/2+3/4")
      expect(result).to eq "1/2+3/4"
      keypress("=")
      expect(result).to eq "5/4"
      keypress("-5/6")
      expect(result).to eq "5/4-5/6"
      keypress("=")
      expect(result).to eq "5/12"
      click(['btn-clear'])
      expect(result).to eq ""
    end
    it "shows correct results for multiplication and division" do
      keypress("7/8*9/10")
      expect(result).to eq "7/8*9/10"
      keypress("=")
      expect(result).to eq "63/80"
      keypress("/11/12")
      expect(result).to eq "63/80/11/12"
      keypress("=")
      expect(result).to eq "21/3520"
      click(['btn-clear'])
      expect(result).to eq ""
    end
    it "shows correct results for expression includes parentheses" do
      keypress("(1+2)*3=")
      expect(result).to eq "9"
      click(['btn-clear'])
      expect(result).to eq ""
    end
    
  end

  after(:all) do
    @driver.quit
  end
end
