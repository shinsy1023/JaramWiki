var express = require('express')
var router = express.Router()
var md = require('markdown').markdown
var string = '# 자람 위키 만들기 \n\
- Node.js 기반\n\
- 페어 프로그래밍으로 Route 별로 짝을 이루어 프로그래밍\n\
## Route 구분 \n\
	1. User\n\
		- 사용자 로그인/로그아웃\n\
	2. Discuss\n\
		- 문서의 내용에 대해 토론하는 기능\n\
	3. History\n\
		- 문서의 버전 관리 기능\n\
	4. Write\n\
		- 문서 작성 및 수정 기능\n\
\n\
## 위키 문법\n\
- John Gruber의 [Markdown](https://daringfireball.net/projects/markdown) 문법으로 문서 작성\n\
- [Markdown 예제](file:///Users/kyujin/Desktop/Jaram.md)\n\
'
var md_content = md.toHTML(string)

router.get('/', function(req, res) {
	res.render('wiki', {val : md_content});
})

module.exports = router

// posts의 GET = read
// posts POST = write
// posts/:post PUT = modify
// posts/:post DELETE = delete

// DELETE delete
	//문서 삭제

// POST write
	//파일을 따로 만들거나, URL을 post name 변수를 app.js에서 wiki.js로 이동

// PUT modify

// GET read