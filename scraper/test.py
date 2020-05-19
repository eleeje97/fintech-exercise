# -*- coding: utf-8 -*-
import sys
import re
from selenium import webdriver
from selenium.webdriver.support.ui import Select

driver = webdriver.Chrome('./scraper/chromedriver')

driver.get('https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=101&oid=055&aid=0000815298')
driver.implicitly_wait(5) # 페이지 로딩 시간 5초를 기다린다.

title = driver.find_element_by_xpath('//*[@id="articleTitle"]')
body = driver.find_element_by_xpath('//*[@id="articleBodyContents"]')
print(title.text)
print(body.text)
