# Importing Dependencies
from bs4 import BeautifulSoup as bs
from splinter import Browser
import requests
import time
import pandas as pd

# Setting Up Splinter
# For macOS users
def init_browser():
    # !which chromedriver
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    return Browser('chrome', **executable_path, headless = False)

# For Windows users
# def init_browser()
#     executable_path = {'executable_path': 'chromedriver.exe'}
#     return Browser('chrome', **executable_path, headless = False)

def scrape_info():
    browser = init_browser()

    # World Economic Forum
    wef_url = 'https://www.weforum.org/search?query=digital+economics'
    browser.visit(wef_url)
    wef_html = browser.html
    wef_soup = bs(wef_html, 'html.parser')
    time.sleep(3)

    wef_content = wef_soup.find('div', class_ = 'gs-title')

    wef = {}
    wef['link'] = wef_content.a['data-ctorig']
    wef['title'] = wef_content.text.strip()
    wef['snippet'] = wef_soup.find('div', class_ = 'gs-bidi-start-align gs-snippet').text.strip()
    wef['addr'] = 'https://www.weforum.org/'
    wef['icon'] = 'https://www.weforum.org/assets/logo-b66768797e3f785791fd157ffc33c27eeca6d5100b7f34d418f50d206f1a8004.svg'

    # McKinsey & Company
    mckinsey_url = 'https://www.mckinsey.com/search?q=digital%20economy'
    browser.visit(mckinsey_url)
    mckinsey_html = browser.html
    mckinsey_soup = bs(mckinsey_html, 'html.parser')
    time.sleep(3)

    mckinsey_body = mckinsey_soup.find('div', class_ = 'search-results')
    mckinsey_content = mckinsey_body.find('div', class_ = 'text-wrapper')

    mckinsey = {}
    mckinsey['link'] = mckinsey_content.a['href']
    mckinsey['title'] = mckinsey_content.h3.text.strip()
    mckinsey['snippet'] = mckinsey_body.find('div', class_ = 'description').text.strip()
    mckinsey['addr'] = 'https://www.mckinsey.com/'
    mckinsey['icon'] = 'https://www.mckinsey.com/~/media/Images/Global/SEOImagePlaceholder.ashx'

    # Visual Capitalist
    vc_url = 'https://www.visualcapitalist.com/?s=digital+transformation'
    browser.visit(vc_url)
    vc_html = browser.html
    vc_soup = bs(vc_html, 'html.parser')
    time.sleep(3)

    vc_content = vc_soup.find('li', class_ = 'mvp-blog-story-wrap left relative infinite-post')

    vc = {}
    vc['link'] = vc_content.a['href']
    vc['title'] = vc_content.h2.text.strip()
    vc['snippet'] = ''
    vc['addr'] = 'https://www.visualcapitalist.com/'
    vc['icon'] = 'http://www.visualcapitalist.com/wp-content/uploads/2015/12/viscap.png'

    # HBR
    hbr_url = 'https://hbr.org/search?search_type=&term=digital+economy'
    browser.visit(hbr_url)
    hbr_html = browser.html
    hbr_soup = bs(hbr_html, 'html.parser')
    time.sleep(3)

    hbr_content = hbr_soup.find('stream-item', class_ = 'stream-item overflow-hidden')

    hbr = {}
    hbr_link = hbr_content.h3.a['href']
    hbr['link'] = f'https://hbr.org{hbr_link}'
    hbr['title'] = hbr_content.h3.text.strip()
    hbr['snippet'] = hbr_content.find('div', class_ = 'dek hide-for-small').text.strip()
    hbr['addr'] = 'https://hbr.org'
    hbr['icon'] = 'https://hbr.org/resources/css/images/HBR_logo_black.svg'

    # Forbes
    forbes_url = 'https://www.forbes.com/search/?q=digital+economy'
    browser.visit(forbes_url)
    forbes_html = browser.html
    forbes_soup = bs(forbes_html, 'html.parser')
    time.sleep(3)

    forbes_content = forbes_soup.find('div', class_ = 'stream-item__text')

    forbes = {}
    forbes['link'] = forbes_content.a['href']
    forbes['title'] = forbes_content.h2.text.strip()
    forbes['snippet'] = ''
    forbes['addr'] = 'https://www.forbes.com/'
    forbes['icon'] = 'https://cdn-images-1.medium.com/max/1440/1*UMb1VBufUL8VFLhXVnUvlw@2x.png'

    # Push into object
    
    articles = [wef, mckinsey, vc, hbr, forbes]

    summary = {
        'articles': articles
    }

    browser.quit()

    return summary