# Script test Postman

## Pham vi
- Dang nhap lay JWT
- Test API `/me`
- Test API `changepassword`
- Kiem tra JWT da chuyen sang RS256
- Kiem tra 2 file khoa: `private.pem` va `public.pem`

## Phan 1: Dang nhap
### Request
- Method: `POST`
- URL: `http://localhost:3000/api/v1/auth/login`
- Body: `raw` -> `JSON`

### Tai khoan test
- Tai khoan seed trong `utils/data2.js`
- Username: `nguyenvana`
- Password: `123456`

```json
{
  "username": "nguyenvana",
  "password": "123456"
}
```

### Ky vong
- Server tra ve 1 chuoi JWT.
- JWT duoc ky bang RS256.

## Phan 2: Lay thong tin ca nhan `/me`
### Request
- Method: `GET`
- URL: `http://localhost:3000/api/v1/auth/me`
- Header:
  - `Authorization: Bearer <token_lay_tu_login>`

### Ky vong
- Server tra ve thong tin user dang dang nhap.
- Neu khong co token hoac token sai, server tra `401`.

## Phan 3: Doi mat khau `changepassword`
### Request
- Method: `POST`
- URL: `http://localhost:3000/api/v1/auth/changepassword`
- Header:
  - `Authorization: Bearer <token_lay_tu_login>`
- Body: `raw` -> `JSON`

```json
{
  "oldpassword": "123456",
  "newpassword": "NewPass@1234"
}
```

### Validate
- `oldpassword` bat buoc.
- `newpassword` bat buoc.
- `newpassword` phai manh: it nhat 8 ky tu, co chu hoa, chu thuong, so, va ky tu dac biet.

### Ky vong
- Neu `oldpassword` dung, server tra:

```json
{
  "message": "doi mat khau thanh cong"
}
```

- Neu `oldpassword` sai, server tra loi loi.
- Neu `newpassword` khong hop le, validation tra ve danh sach loi.

## Phan 4: Kiem tra RS256 va file khoa
### Canh bao
- Token login khong dung `secret` nua.
- Token phai duoc ky bang `private.pem`.
- Middleware verify phai dung `public.pem`.

### File can co
- `private.pem`
- `public.pem`

### Cach kiem tra nhanh
1. Login lay token moi.
2. Giai ma header JWT se thay `alg: RS256`.
3. Goi `/me` voi token do.
4. Goi `changepassword` voi token do.

## Mau test nhanh trong Postman
### Environment variable goi y
- `baseUrl = http://localhost:3000`
- `token = <JWT>`

### Pre-request khong can thiet lap rieng.

### Luong chay
1. Goi `/auth/login` va luu token.
2. Goi `/auth/me` voi `Authorization: Bearer {{token}}`.
3. Goi `/auth/changepassword` voi `Authorization: Bearer {{token}}`.
4. Dang nhap lai bang mat khau moi.
