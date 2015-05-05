import requests
import re
import urllib
import sys
import datetime

# Basic e-mail regexp:
# letter/number/dot/comma @ letter/number/dot/comma . letter/number
email_re = re.compile(r'([\w\.,]+@[\w\.,]+\.\w+)')

# HTML <a> regexp
# Matches href="" attribute
link_re = re.compile(r'href="(.*?)"')

def crawl(url, maxlevel):
    # Limit the recursion, we're not downloading the whole Internet
    if(maxlevel == 0):
        return []

    # Get the webpaged
    # (And catch exception if problem...)
    try: 
        req = requests.get(url)
    except requests.exceptions.RequestException:
        return []
    
    result = []

    # Check if successful
    if(req.status_code != 200):
        return []

    # Find and follow all the links
    links = link_re.findall(req.text)
    
    for link in links:
        # Get an absolute URL for a link
        link = urllib.parse.urljoin(url, link)
        result += crawl(link, maxlevel - 1)

    # Find all emails on current page
    result += email_re.findall(req.text)
    return result

emails = crawl('http://www.icao.int/safety/pbn/Lists/PBNImplementation/', 2)

now = datetime.datetime.now()
filename = "gathered_emails.txt"
emailsfile = open(filename, "a",encoding='utf-8')

for e in emails:
  emailsfile.write("%s\n" % e)

emailsfile.close()
