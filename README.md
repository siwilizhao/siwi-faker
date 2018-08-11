# siwi-faker

[![node](https://img.shields.io/node/v/siwi-faker.svg)](https://www.npmjs.com/package/siwi-faker)
[![Build Status](https://travis-ci.org/siwilizhao/siwi-faker.svg?branch=master)](https://travis-ci.org/siwilizhao/siwi-faker)
[![npm](https://img.shields.io/npm/v/siwi-faker.svg)](https://www.npmjs.com/package/siwi-faker)
[![npm](https://img.shields.io/npm/dt/siwi-faker.svg)](https://www.npmjs.com/package/siwi-faker)
[![Github file size](https://img.shields.io/github/size/siwilizhao/siwi-faker/lib/index.js.svg)](https://github.com/siwilizhao/siwi-faker/lib/index.js)

> node 假数据生成(node version > 8)

## 安装

use yarn

```shell
yarn add siwi-faker
```

use npm

```shell
npm i siwi-faker
```

## 目录结构

```shell
├── README.md
├── docs
│   └── README.md
├── index.js
├── lib
│   ├── index.js
│   ├── json
│   │   └── chinese
│   │       ├── area.json
│   │       ├── email.json
│   │       ├── phone.json
│   │       ├── telephone.json
│   │       ├── user.json
│   │       └── zipcode.json
│   └── utils
│       └── index.js
├── package.json
├── storage
│   └── design
├── test
│   ├── index.test.js
│   └── utils.test.js
└── yarn.lock
```

## 单元测试

```js
npm run test
```

> 请确保运行该指令前您的机器安装了mocha & chai 如果您未安装 运行如下指令

```js
yarn add mocha chai -D
```

## 1.4. json文件的获取

- area.json 由 siwi-area 爬取国家统计局城乡数据提供
- email.json 来自网络 可以自己扩充
- phone.json 来自网络（支持移动 联通 电信 手机号码创建） 可以自己扩充
- telephone.json  来自网络 可以自己扩充
- user.json  来自网络 可以自己扩充
- zipcode.json  来自网络 可以自己扩充

> 数据来源暂时缺少稳定支持

## api

### username

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| length | 名字长度 默认2 | 2|

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const username = await faker.username()
        console.log(username)
    }
}
```

### firstName

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const firstname = await faker.firstName()
        console.log(firstname)
    }
}
```

### lastName

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const lastname = await faker.lastName()
        console.log(lastname)
    }
}
```

### password

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const password = await faker.password()
        console.log(password)
    }
}
```

### email

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const email = await faker.email()
        console.log(email)
    }
}
```

### phone

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const phone = await faker.phone()
        console.log(phone)
    }
}
```

### telephone

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const telephone = await faker.telephone()
        console.log(telephone)
    }
}
```

### zipcode

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const zipcode = await faker.zipcode()
        console.log(zipcode)
    }
}
```

### province

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const province = await faker.province()
        console.log(province)
    }
}
```

### city

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| province | 省| 河南省 |

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const province = '河南省'
        const city = await faker.city(province)
        console.log(city)
    }
}
```

### county

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| city | 城市| 郑州市 |
| province | 省| 河南省 |

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const province = '河南省'
        const city = '周口市'
        const county = await faker.county(city, province)
        console.log(county)
    }
}
```

### address

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| city | 城市| 周口市 |
| province | 省| 河南省 |
| county | 县区| 鹿邑县 |

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const province = '河南省'
        const city = '周口市'
        const county = '鹿邑县'
        const address = await faker.address(province , city, county )
        console.log(address)
    }
}
```

### code

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| id | id| 996 |
| prefix | 前缀| POD |
| pad | 填充元素| 0 |
| length | 生成code的长度| 15 |

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const code = await faker.code(id = 100, prefix = 'POD', pad = '0', length = 15)
        console.log(code)
    }
}
```

### order

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const code = await faker.order()
        console.log(code)
    }
}
```

### randomArray

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| arr | 数据源| ['北京', '上海', '天津'] |
| length | 随机长度| 2 |
| unique | 是否重复| false |

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const arr = await faker.randomArray()
        console.log(arr)
    }
}
```

### randomStr

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const str = await faker.randomStr()
        console.log(str)
    }
}
```

### randomIndex

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| length | 数组长度| 100 |

```js{4}
const faker = require('siwi-faker')

class Example {
    construct() {

    }
    async demo() {
        const index = await faker.randomIndex()
        console.log(index)
    }
}
```

## Thanks

- siwi-area
- siwi-json
- siwi-uniquestring
