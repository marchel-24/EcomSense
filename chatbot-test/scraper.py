from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager

import pandas as pd
import time
import random
import re


def scrape_tokopedia(query):
    options = Options()
    options.add_argument("--disable-gpu")
    options.add_argument("--log-level=3")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    url = f"https://www.tokopedia.com/search?st=product&q={query.replace(' ', '%20')}"
    driver.get(url)
    time.sleep(5)

    results = []

    cards = driver.find_elements(By.CSS_SELECTOR, 'a[data-theme="default"]')[:4]  # Ambil 4 produk
    for card in cards:
        try:
            link = card.get_attribute('href')

            try:
                toko = card.find_element(By.CSS_SELECTOR, 'span[class*="T0rpy-LEw"]').text
            except:
                toko = "Unknown"
                if link:
                    temp = link.replace("https://www.tokopedia.com/", "")
                    toko = temp.split("/", 1)[0].replace("-", " ")

            try:
                nama_produk = card.find_element(By.CSS_SELECTOR, 'span[class*="0T8-iGxMp"]').text
            except:
                nama_produk = query
                if link:
                    temp = link.replace(f"https://www.tokopedia.com/{toko}/", "")
                    nama_produk = temp.replace("-", " ")

            try:
                image = card.find_element(By.TAG_NAME, 'img').get_attribute('src')
            except:
                image = "Image"

            try:
                harga = card.find_element(By.CSS_SELECTOR, 'div[class*="67d6E1xDK"]').text
            except:
                harga = "Rp. -"

            results.append({
                'Nama Produk': nama_produk,
                'Harga': harga,
                'Toko': toko,
                'Gambar': image,
                'Link': link
            })
        except Exception as e:
            print("Error parsing card:", e)
            continue

    driver.quit()
    return results

def ambil_ulasan_dari_link(url, nama_produk):
    options = Options()
    # options.add_argument("--headless")
    options.add_argument("--log-level=3")
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    time.sleep(3)

    try:
        close_button = driver.find_element(By.CSS_SELECTOR, 
            "div.css-kl3gjj.e1nc1fa20 > article > div > div.css-11hzwo5 > button")
        close_button.click()
    except NoSuchElementException:
        pass

    driver.execute_script("window.scrollBy(0, 1000);")
    time.sleep(2)

    try:
        tab_ulasan_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 
                "#header-main-wrapper > div.css-1mbdz04.e90swyx6 > div > nav > div > div.css-1kx9443-unf-tab-wrapper.ehv0kkf0 > div > button:nth-child(2)"))
                #header-main-wrapper > div.css-1mbdz04.e90swyx6 > div > nav > div > div.css-1kx9443-unf-tab-wrapper.ehv0kkf0 > div > button:nth-child(2)
        )
        tab_ulasan_button.click()
    except TimeoutException:
        driver.quit()
        return []

    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "review-feed"))
        )
    except TimeoutException:
        driver.quit()
        return []

    articles = driver.find_elements(By.CSS_SELECTOR, "#review-feed > article")
    reviews = []
    for article in articles:
        try:
            span = article.find_element(By.CSS_SELECTOR, "p.css-cvmev1-unf-heading.e1qvo2ff8 > span")
            reviews.append({
                'Nama Produk': nama_produk,
                'Ulasan': span.text,
                'Link Produk': url
            })
        except NoSuchElementException:
            continue

    driver.quit()
    return random.sample(reviews, min(5, len(reviews)))
