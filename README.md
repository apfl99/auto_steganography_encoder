# auto_steganography_encoder
nft_image에 있는 이미지 파일들을 encoding.js에서 입력한 message로 인코딩하여 encoded_nft_images에 저장

이때, 이미지 파일 이름은 {index}.png여야 함 

## 1. 설치
```shell
npm i
```

## 2. 초기 설정
### 디렉터리 생성
디렉터리 생성 후, 인코딩할 이미지 파일들을 nft_images 디렉터리에 {index}.png 삽입
```shell
mkdir nft_images
mkdir encoded_nft_images
```
### 인코딩 메시지 설정
encoding.js의 main함수에 있는 message를 맛있게 변경
```js
var message = `Uniwaffle_${i}`;
```

### 범위(index) 설정
encoding.js의 전역변수 start, end를 맛나게 변경
```js
const start = 0;
const end = 728;
```

## 3. 실행
```shell
node encoding.js
```








