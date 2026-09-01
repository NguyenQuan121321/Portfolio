# Kiến Trúc Triển Khai & Phân Tích Backend cho Portfolio (Finn.dev)

Tài liệu này giải thích cấu trúc triển khai của Portfolio, phân tích sự khác biệt giữa Frontend SPA và Backend API thực tế, cùng hướng dẫn triển khai lên **Vercel** hoàn toàn miễn phí.

---

## 1. Portfolio này có cần tạo Backend riêng không?

### Trả lời ngắn gọn: **KHÔNG CẦN BACKEND RIÊNG CHO PORTFOLIO.**

### Lý do chi tiết:
1. **Bản chất của Portfolio:**
   - Portfolio của bạn là một ứng dụng **Single-Page Application (SPA)** viết bằng React 19 + TypeScript + Vite + Tailwind CSS.
   - Toàn bộ trang web được đóng gói thành các file tĩnh (HTML, CSS, JS) trong thư mục dist/.
   - Các dịch vụ hosting hiện đại như **Vercel**, **Cloudflare Pages**, **Netlify**, hoặc **GitHub Pages** phục vụ trực tiếp các file tĩnh này qua mạng CDN toàn cầu với tốc độ tải < 50ms và chi phí **0 VNĐ / tháng**.

2. **Dự án Backend thực tế của bạn là FinnApiGo:**
   - Backend Golang của bạn (FinnApiGo) đã được triển khai độc lập và đang chạy trên Render tại https://finnapigo.onrender.com.
   - Portfolio đóng vai trò là "Showcase / Interactive Client" kết nối trực tiếp đến kiến trúc và tài liệu API của FinnApiGo.
   - Nhà tuyển dụng khi vào Portfolio có thể trải nghiệm console trực tiếp, đọc Swagger docs hoặc clone repo Go về máy.

---

## 2. Giải thích cơ chế API Playground & Mã TOTP RFC 6238

### Tại sao lúc trước mã TOTP nhập số nào cũng được?
- Trước đó, console chỉ mô phỏng kiểm tra độ dài chuỗi (length === 6).
- **Trên thực tế (chuẩn RFC 6238 của Google Authenticator):**
  - Mã OTP 6 chữ số được tính bằng công thức toán học: HMAC-SHA1(SecretKey, floor(UnixTime / 30)) % 10^6.
  - Mã này thay đổi mỗi **30 giây** một lần.
- **Trên Portfolio hiện tại:**
  - Hệ thống đã tích hợp cơ chế kiểm thử xác thực:
    - Nếu nhập đúng mã OTP mẫu hợp lệ (839201): Trả về 200 OK + cấp Access Token đầy đủ quyền.
    - Nếu nhập mã khác (VD: 123456): Trả về 401 Unauthorized kèm thông báo lỗi RFC 6238 từ chối phiên xác thực.
    - Nếu bỏ trống hoặc sai định dạng: Trả về 400 Bad Request.
  - Có nút hỗ trợ **"Dán mã mẫu: 839201"** để nhà tuyển dụng có thể kiểm thử cả 2 trường hợp (thành công & thất bại).

---

## 3. Nếu trong tương lai muốn mở rộng Backend riêng cho Portfolio, cần làm gì?

Nếu sau này bạn muốn Portfolio có các tính năng động nâng cao (như: form gửi email trực tiếp không cần mở mail client, lưu log lượt truy cập của nhà tuyển dụng vào database, bảng tin comment...), bạn có 2 hướng tiếp cận:

### Lựa chọn A: Dùng Vercel Serverless Functions (Khuyên dùng nếu vẫn deploy trên Vercel)
- Tạo thư mục pi/ ngay trong repo này (VD: pi/contact.ts hoặc pi/contact.go).
- Vercel sẽ tự động biến các hàm trong thư mục pi/ thành API Serverless không cần quản lý máy chủ.

### Lựa chọn B: Mở rộng trực tiếp vào FinnApiGo hoặc tạo PortfolioApiGo
- Viết thêm route nhận liên hệ hoặc quản lý portfolio trực tiếp trong dự án Golang của bạn.

---

## 4. Hướng dẫn Triển khai (Deploy) Portfolio lên Vercel (1 Phút)

1. Đăng nhập vào [Vercel](https://vercel.com) bằng tài khoản GitHub của bạn: NguyenQuan121321.
2. Nhấn **"Add New..."** -> chọn **"Project"**.
3. Chọn repository **NguyenQuan121321/Portfolio** và nhấn **"Import"**.
4. Vercel sẽ tự động phát hiện cấu hình Vite:
   - **Framework Preset:** Vite
   - **Build Command:** 
pm run build
   - **Output Directory:** dist
5. Nhấn **"Deploy"**.
6. Sau khoảng 30 giây, website của bạn sẽ có tên miền trực tiếp dạng: https://portfolio-xxxx.vercel.app (bạn có thể đổi thành inn.vercel.app hoặc gắn tên miền riêng inn.dev).
