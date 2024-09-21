from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager

class WebDriverManagerLibrary:
    def __init__(self):
        self.driver = None

    def open_chrome_browser(self):
        """Opens Chrome browser with the latest version of ChromeDriver."""
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        return self.driver

    def open_firefox_browser(self):
        """Opens Firefox browser with the latest version of GeckoDriver."""
        self.driver = webdriver.Firefox(executable_path=GeckoDriverManager().install())
        return self.driver

    def close_browser(self):
        """Closes the currently open browser."""
        if self.driver:
            self.driver.quit()
