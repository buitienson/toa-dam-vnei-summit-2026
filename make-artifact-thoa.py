# Tạo bản claude.ai (không có <html>/<head>) của trang chị Thoa từ chi-thoa.html
import re, os
here = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(here, 'chi-thoa.html')).read()
head = re.sub(r'<meta[^>]*>', '', re.search(r'<head>(.*)</head>', s, re.S).group(1)).strip()
body = re.search(r'<body>(.*)</body>', s, re.S).group(1)
d = "--bg:#0A0F1F;--card:#111B36;--ink:#E8ECF7;--dim:#B8C1D9;--line:#2E3F68;--accent:#FFCC4E;--blue:#8FB0F0;color-scheme:dark"
head = head.replace("@media (prefers-color-scheme:dark){:root{"+d+"}}", "@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){"+d+"}}\n:root[data-theme=\"dark\"]{"+d+"}")
open(os.path.join(here, '..', 'kich-ban-chi-thoa.html'), 'w').write(head + "\n" + body)
