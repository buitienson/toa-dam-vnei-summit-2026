#!/bin/zsh
# Dựng index.html từ ../toa-dam-vnei-summit.html, đóng dấu phiên bản, đẩy lên GitHub Pages.
# Trang đang mở trên iPad sẽ hiện pill "Có bản mới" trong vòng 1 phút.
set -e
cd "$(dirname "$0")"
V=$(date +%Y%m%d-%H%M%S)
SRC=../toa-dam-vnei-summit.html
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="robots" content="noindex">\n'
  sed '/^<\/style>$/q' "$SRC"; printf '</head>\n<body>\n'; sed '1,/^<\/style>$/d' "$SRC"; printf '\n</body>\n</html>\n'; } > index.html
sed -i '' -E "s/const APP_VERSION = \"[^\"]*\";/const APP_VERSION = \"$V\";/" index.html
printf '{"v":"%s"}\n' "$V" > version.json
git add -A
git commit -q -m "${1:-Cập nhật} ($V)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
echo "Đã đẩy phiên bản $V (Pages cần ~1 phút)"
