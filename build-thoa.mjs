// Sinh bản đầy đủ cho chị Thoa từ CÙNG dữ liệu với trang iPad (S, REF, ROLES trong ../toa-dam-vnei-summit.html).
// Ra 2 file: chi-thoa.html (trang đọc công khai) và chi-thoa-doc.html (để tải lên Google Docs).
import fs from "fs";
const src = fs.readFileSync(new URL("../toa-dam-vnei-summit.html", import.meta.url), "utf8");
const grab = (start, end) => { const a = src.indexOf(start), b = src.indexOf(end, a); return src.slice(a, b); };
const code = grab("const S = [", "const REF = {") + grab("const REF = {", "/* ---------- state") + grab("const ROLES = [", "function coverHTML");
const { S, REF, ROLES } = new Function(code + "; return {S, REF, ROLES};")();
const START = 15*60+30, hm = m => { const t = START + m; return String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"); };
const clean = h => h.replace(/<span class="fix">[^<]*<\/span>/g, "")
  .replace(/<span class="ask">([\s\S]*?)<\/span>(?=\s*(<\/|<ul|$|`))/g, "<p><b>$1</b></p>")
  .replace(/<span class="ask">/g, "<p><b>").replace(/<\/span>\s*$/,"</b></p>")
  .replace(/\s+class="[^"]*"/g, "");
const WHO = { son:"MC 1 · Sơn nói", thoa:"MC 2 · CHỊ THOA NÓI" };
const li = a => a && a.length ? "<ul>" + a.map(x => `<li>${x}</li>`).join("") + "</ul>" : "";
let body = `<h1>Tọa đàm "Từ chính sách - đến thực thi" · VNEI Summit 2026</h1>
<p><i>Kịch bản điều phối đầy đủ · 15:30 - 16:20, thứ Bảy 3/10/2026 · Tầng 6, tòa nhà NIC, số 1 Nguyễn Hữu An, Hà Nội</i></p>
<p>Kính gửi chị Hoàng Thị Thoa, em Sơn gửi chị bản kịch bản điều phối đầy đủ, cùng nội dung với bản em dùng trên sân khấu: lời dẫn nguyên văn của hai MC theo từng phần, câu hỏi phụ, mẹo điều phối, thông tin khách mời và phương án dự phòng.</p>
<h2>Những thay đổi so với kịch bản BTC gửi 2/10</h2>
<ul>
<li>Thêm hai lượt mời sau Vòng 4 (em mời): <b>16:14 ông Đỗ Tiến Thịnh</b>, Phó Giám đốc NIC; <b>16:16 TS. Nguyễn Trung Dũng</b>, Chủ tịch VNEI.</li>
<li>Vòng 4 còn 4 phút; kết luận còn 2 phút; câu chốt nhanh 30 giây của MC 1 thành tùy chọn.</li>
<li>Gọi ông Trương Ngọc Kiểm là "ông" ở mọi chỗ (câu của chị ở Vòng 1: "Thưa ông, ĐHQGHN...").</li>
<li>Phần chị giới thiệu khách: ông Từ Minh Hiệu là <b>Quyền Trưởng phòng Khởi nghiệp sáng tạo, Cục Khởi nghiệp và Doanh nghiệp công nghệ</b>, Bộ KH&amp;CN (thay cho "Đại diện Cục...").</li>
<li>"Nghị quyết 86/2026" ghi đúng là "Nghị quyết 86/NQ-CP"; Vòng 4 ghi "Cục Khởi nghiệp và Doanh nghiệp công nghệ"; thời lượng thống nhất 50 phút.</li>
<li>Nếu dư giờ, cuối Vòng 3 có thể mời 1-2 vị giám hiệu trong hội trường phát biểu khoảng 1 phút (câu hỏi soạn sẵn ở mục "Hỏi đáp với hội trường" cuối tài liệu).</li>
<li>Hôm nay có hai ông Dũng: ông Trần Trí Dũng (SwissEP) và TS. Nguyễn Trung Dũng (Chủ tịch VNEI). Luôn gọi đủ họ tên.</li>
</ul>
<h2>Phân vai</h2>
<table border="1" cellpadding="6"><tr><th>Phần</th><th>MC 1 · Sơn</th><th>MC 2 · Thoa</th></tr>${ROLES.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>
<h2>Kịch bản chi tiết</h2>`;
for (const s of S) {
  if (s.cover) continue;
  const time = s.t[0] === s.t[1] ? `${hm(s.t[0])} (tùy chọn)` : `${hm(s.t[0])} - ${hm(s.t[1])}`;
  body += `<h3>${time} · ${s.title}</h3>`;
  if (s.banner) body += `<p><i>${s.banner[0]} · ${s.banner[1]}</i></p>`;
  for (const b of s.blocks) {
    if (b.who === "guest") { body += `@@GUEST@@${b.html}@@END@@`; continue; }
    body += `@@BOX:${b.who}@@` + clean(b.html) + `@@END@@`;
  }
  const n = s.notes || {};
  if (n.follow) body += `<p><b>Câu hỏi phụ (dùng khi cần):</b></p>` + li(n.follow);
  if (n.tips) body += `<p><b>Mẹo điều phối:</b></p>` + li(n.tips);
  if (n.facts) body += `<p><b>Số liệu cầm tay:</b></p>` + li(n.facts);
}
const tabs = [["guests","Hồ sơ khách mời"],["policy","Văn bản chính sách"],["bk","Đề án spin-off ĐH Bách khoa Hà Nội"],["qa","Hỏi đáp với hội trường"],["backup","Phương án dự phòng"]];
body += `<h2>Tra nhanh</h2>`;
for (const [k, t] of tabs) body += `<h3>${t}</h3>` + REF[k].replace(/<div class="gcard"><h4>/g,"<h4>").replace(/<\/?div[^>]*>/g,"").replace(/\s+class="[^"]*"/g,"");
body += `<p>Chị xem giúp em, có gì cần điều chỉnh chị nhắn em nhé. Em cảm ơn chị!</p><p>Em Sơn</p>`;
// Sơn-side wording -> neutral for Thoa
body = body.replace(/\(anh\)/g,"").replace(/ · đến lượt anh/g,"");
const docBody = body
  .replace(/@@BOX:(son|thoa)@@([\s\S]*?)@@END@@/g, (m, w, h) => `<table width="100%" border="1" cellpadding="10" style="border-collapse:collapse;border:2px solid ${w==="son"?"#B8860B":"#2F5DB8"}"><tr><td style="background-color:${w==="son"?"#FFF4D6":"#E3ECFF"}"><p><b>${WHO[w]}</b></p>${h}</td></tr></table><p></p>`)
  .replace(/@@GUEST@@([\s\S]*?)@@END@@/g, "<p><i>→ $1</i></p>");
fs.writeFileSync(new URL("chi-thoa-doc.html", import.meta.url), `<html><body>${docBody}</body></html>`);
const webBody = body
  .replace(/@@BOX:(son|thoa)@@([\s\S]*?)@@END@@/g, (m, w, h) => `<div class="blk ${w}"><div class="who">${WHO[w]}</div>${h}</div>`)
  .replace(/@@GUEST@@([\s\S]*?)@@END@@/g, '<div class="guest">$1</div>');
fs.writeFileSync(new URL("chi-thoa.html", import.meta.url), `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex">
<title>Kịch bản tọa đàm VNEI Summit</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;800&display=swap">
<style>
:root{--bg:#F6F7FB;--card:#FFFFFF;--ink:#14213D;--dim:#4A5675;--line:#DCE1EE;--accent:#9A6F00;--blue:#2F5DB8;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#0A0F1F;--card:#111B36;--ink:#E8ECF7;--dim:#B8C1D9;--line:#2E3F68;--accent:#FFCC4E;--blue:#8FB0F0;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:calc(17px * var(--fs,1))/1.65 'Be Vietnam Pro',Arial,sans-serif;padding:24px 16px 96px}
main{max-width:780px;margin:0 auto}
.blk{border-radius:14px;padding:12px 16px;margin:10px 0;border:2px solid}.blk p{margin:.4em 0}.blk .who{font-weight:800;font-size:.78em;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px}
.blk.son{background:rgba(255,204,78,.12);border-color:rgba(184,134,11,.55)}.blk.son .who{color:var(--accent)}
.blk.thoa{background:rgba(47,93,184,.10);border-color:var(--blue);box-shadow:0 0 0 3px rgba(47,93,184,.15)}.blk.thoa .who{color:var(--blue)}
.guest{border:1px dashed var(--line);border-radius:10px;padding:6px 12px;color:var(--dim);font-style:italic;margin:8px 0}
.legend{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}.legend span{border:2px solid;border-radius:999px;padding:4px 12px;font-weight:700;font-size:.85em}
.fsz{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));display:flex;gap:8px;z-index:9}
.fsz button{width:56px;height:56px;border-radius:50%;border:2px solid var(--blue);background:var(--card);color:var(--blue);font:800 20px 'Be Vietnam Pro',Arial,sans-serif;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25)}
.fsz button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
#upd{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:20;display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px}
#upd button.go{display:flex;align-items:center;gap:10px;border:0;border-radius:999px;background:var(--blue);color:#fff;font:800 1.05em 'Be Vietnam Pro',Arial,sans-serif;padding:16px 26px;cursor:pointer;box-shadow:0 12px 40px rgba(0,0,0,.35)}
#upd button.later{border:1px solid var(--line);background:var(--card);color:var(--dim);border-radius:999px;padding:6px 14px;font:600 .85em 'Be Vietnam Pro',Arial,sans-serif;cursor:pointer}
[hidden]{display:none!important}
.ver{color:var(--dim);font-size:.8em;margin-top:24px}h1{font-size:1.55em;line-height:1.25;text-wrap:balance}h2{font-size:1.25em;color:var(--accent);margin:32px 0 10px;border-top:1px solid var(--line);padding-top:18px}
h3{font-size:1.08em;color:var(--blue);margin:26px 0 6px}h4{margin:14px 0 2px}ul{padding-left:1.2em}li{margin:.3em 0}
table{border-collapse:collapse;width:100%;font-size:.9em}td,th{border:1px solid var(--line);padding:8px;vertical-align:top;text-align:left}.tw{overflow-x:auto}
</style></head><body><main><div class="legend"><span style="border-color:var(--blue);color:var(--blue)">Khung xanh: chị Thoa nói</span><span style="border-color:var(--accent);color:var(--accent)">Khung vàng: Sơn nói</span></div>${webBody.replace(/<table/g,'<div class="tw"><table').replace(/<\/table>/g,"</table></div>").replace(/ border="1" cellpadding="6"/g,"")}</main>
<div id="upd" hidden role="alertdialog" aria-label="Có bản mới"><button type="button" class="go" id="updGo">↻ Có bản mới · Bấm để cập nhật</button><button type="button" class="later" id="updLater">Để sau</button></div>
<p class="ver" id="ver"></p>
<div class="fsz"><button type="button" id="fsDown" aria-label="Chữ nhỏ hơn">A−</button><button type="button" id="fsUp" aria-label="Chữ to hơn">A+</button></div>
<script>(function(){var k='thoaFs',f=1;try{f=parseFloat(localStorage.getItem(k))||1}catch(e){}function a(){f=Math.min(1.8,Math.max(.8,Math.round(f*10)/10));document.documentElement.style.setProperty('--fs',f);try{localStorage.setItem(k,f)}catch(e){}}document.getElementById('fsUp').onclick=function(){f+=.1;a()};document.getElementById('fsDown').onclick=function(){f-=.1;a()};a()})();</script>
<script>(function(){var V="dev";var m=V.match(/^(\\d{4})(\\d{2})(\\d{2})-(\\d{2})(\\d{2})/);document.getElementById("ver").textContent=m?"Phiên bản "+m[3]+"/"+m[2]+" "+m[4]+":"+m[5]:"";if(location.protocol!=="https:"||V==="dev")return;var latest=null,later=0;function check(){fetch("version.json?t="+Date.now(),{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j||!j.v||j.v===V){document.getElementById("upd").hidden=true;return}latest=j.v;if(Date.now()-later<600000)return;document.getElementById("upd").hidden=false}).catch(function(){})}document.getElementById("updGo").onclick=function(){document.getElementById("upd").hidden=true;var u=new URL(location.href);u.searchParams.set("v",latest||Date.now());location.replace(u.toString())};document.getElementById("updLater").onclick=function(){document.getElementById("upd").hidden=true;later=Date.now()};check();setInterval(check,60000);document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")check()})})();</script>
</body></html>`);
console.log("ok", S.length, "slides");
