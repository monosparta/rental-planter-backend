<!-- Converted from API.yaml -->
<!-- Generator: Widdershins v4.0.1 -->

# Rental Planter v0.0.0
會員植物管理系統

# Header
```json
{
  "Auth": "",
  "Auth-Method": "JWT"
}
```

## Header 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|Auth|header|string|true|JWT Token Generated from /user/login|
|Auth-Method|header|string|true|Needs to be "JWT"|


# 目錄
- [使用者 API](#user-api)
  - [GET /user](#get-user)
  - [POST /user/login](#post-user-login)
  - [POST /user/register](#post-user-register)
  - [POST /user/password](#post-user-password)
  - [PUT /user/password](#put-user-password)
  - [GET /rent/list/others](#get-rent-list-others)
  - [POST /rent/register](#post-rent-register)
  - [POST /rent/plantInfo](#post-rent-plant-info)
  - [PUT /rent/plantInfo/{rentId}](#put-rent-plant-info)
- [管理員 API](#admin-api)
  - [GET /admin/rentedInfo](#get-admin-rented-info)
  - [GET /admin/waitList](#get-admin-wait-list)
  - [GET /admin/rentedAmount](#get-admin-rented-amount)
  - [PUT /admin/rent/{rentId}](#put-admin-rent)
  - [DELETE /admin/rent/{rentId}](#delete-admin-rent)
  - [GET /admin/members](#get-admin-members)
  - [PUT /admin/members](#put-admin-members)
  - [PUT /admin/member/{userId}](#put-admin-member)
  - [DELETE /admin/member/{userId}](#delete-admin-member)
  - [GET /admin/admin](#get-admin-admin)
  - [POST /admin/admin](#post-admin-admin)
  - [DELETE /admin/admin/{userId}](#delete-admin-admin)
  - [GET /admin/config](#get-admin-config)
  - [PUT /admin/config](#put-admin-config)

<span id="user-api"></span>

# 使用者 API

<span id="get-user"></span>

## `GET /user`
*Get User from token*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|[UserResponse](#schemauserresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

---
<span id="post-user-login"></span>

## `POST /user/login`
*Login*

### Body
> Content Type: `application/json`

```json
{
  "email": "string",
  "password": "string"
}
```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[AuthRequest](#schemaauthrequest)|true|登入資訊|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Login success|[LoginSuccessResponse](#schemaloginsuccessresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid body|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid user or password!|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "token": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid body"
}
```

> 401 Response

```json
{
  "message": "Invalid user or password!"
}
```

---
<span id="post-user-register"></span>

## `POST /user/register`
*Register*

### Body
> Content Type: `application/json`

```json
{
  "email": "string"
}
```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserRegisterRequest](#schemauserregisterrequest)|true|註冊資訊|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Registration success|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid body|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Registration failure|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|User already exist|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Registration success"
}
```

> 400 Response

```json
{
  "message": "Invalid body"
}
```

> 404 Response

```json
{
  "message": "Membership not found"
}
```

> 409 Response

```json
{
  "message": "User already exist"
}
```

---
<span id="post-user-password"></span>

## `POST /user/password`
*Reset Password Request*

### Body
> Content Type: `application/json`

```json
{
  "email": "string"
}
```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserRegisterRequest](#schemauserregisterrequest)|true|註冊資訊|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request success|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid body|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Unknown User|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Request success"
}
```

> 400 Response

```json
{
  "message": "Invalid body"
}
```

> 404 Response

```json
{
  "message": "User not found"
}
```

---
<span id="put-user-password"></span>

## `PUT /user/password`
*Change the password*

> 需要 [Header](#header)

### Body
> Content Type: `application/json`

```json
{
  "password": "string"
}
```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Password updated|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header/body|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Password updated"
}
```

> 400 Response

```json
{
  "message": "Invalid header/body"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

---
<span id="get-rent-list-others"></span>

## `GET /rent/list/others`
*Get other user's plant information*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Send other's information|[OtherUserPlantResponse](#schemaotheruserplantresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "data": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

---
<span id="post-rent-register"></span>

## `POST /rent/register`
*Rent registration*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Registration successful|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Too many rents|[GenericResponse](#schemagenericresponse)|

#### 200 回應參數

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» waiting|boolean|false|none|none|

#### 範例回應：

> 200 Response

```json
{
  "message": "Registration successful",
  "waiting": true
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 409 Response

```json
{
  "message": "Too many rents"
}
```

---
<span id="post-rent-plant-info"></span>

## `POST /rent/plantInfo`
*Add plant information*

> 需要 [Header](#header)

### Body
> Content Type: `multipart/form-data`

```yaml
rent: 0
name: string
intro: string
image: file
nickname: string
minHumid: 0

```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» rent|body|integer(int32)|false|none|
|» name|body|string|false|none|
|» intro|body|string|false|none|
|» image|body|string(binary)|false|none|
|» nickname|body|string|false|none|
|» minHumid|body|integer(int32)|false|none|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Requested rent not found|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Plant already exist|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 404 Response

```json
{
  "message": "Requested rent not found"
}
```

> 409 Response

```json
{
  "message": "Plant already exist"
}
```

---
<span id="put-rent-plant-info"></span>

## `PUT /rent/plantInfo/{rentId}`
*Modify plant information*

> 需要 [Header](#header)

#### 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|rentId|path|integer(int64)|true|ID of rent|

### Body
> Content Type: `multipart/form-data`

```yaml
name: string
intro: string
image: file
nickname: string
minHumid: 0

```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|
|» intro|body|string|false|none|
|» image|body|string(binary)|false|none|
|» nickname|body|string|false|none|
|» minHumid|body|integer(int32)|false|none|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Requested rent not found|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 404 Response

```json
{
  "message": "Requested rent not found"
}
```

<span id="admin-api"></span>

# 管理員 API

<span id="get-admin-rented-info"></span>

## `GET /admin/rentedInfo`
*Get rented list*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

#### 200 回應參數

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|[[AdminRent](#schemaadminrent)]|false|none|none|
|»» id|integer(int32)|false|none|none|
|»» owner|[User](#schemauser)|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» name|string|false|none|none|
|»»» email|string|false|none|none|
|»»» isDefaultPassword|boolean|false|none|none|
|»»» role|integer|false|none|none|
|»» plant|[Plant](#schemaplant)|false|none|none|
|»»» name|string|false|none|none|
|»»» intro|string|false|none|none|
|»»» imgPath|string|false|none|none|
|»»» nickName|string|false|none|none|
|»»» minHumid|integer(int32)|false|none|none|
|»» container|integer(int32)|false|none|none|

#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "data": [
    {
      "id": 0,
      "owner": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string",
        "email": "string",
        "isDefaultPassword": true,
        "role": 0
      },
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

---
<span id="get-admin-wait-list"></span>

## `GET /admin/waitList`
*Get rents waiting for container*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Rent not found|[GenericResponse](#schemagenericresponse)|

#### 200 回應參數

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|[object]|false|none|none|
|»» name|string|false|none|none|
|»» email|string|false|none|none|

#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "data": [
    {
      "name": "string",
      "email": "string"
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 404 Response

```json
{
  "message": "Rent not found"
}
```

---
<span id="get-admin-rented-amount"></span>

## `GET /admin/rentedAmount`
*Get rented amount*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

#### 回應參數

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» rented|integer|false|none|none|
|»» remain|integer|false|none|none|

#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "data": {
    "rented": 0,
    "remain": 0
  }
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

---
<span id="put-admin-rent"></span>

## `PUT /admin/rent/{rentId}`
*Set container of rent as taken*

> 需要 [Header](#header)

#### 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|rentId|path|integer(int64)|true|ID of rent|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Rent not found|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Rent already taken|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 404 Response

```json
{
  "message": "Rent not found"
}
```

> 409 Response

```json
{
  "message": "Rent already taken"
}
```

---
<span id="delete-admin-rent"></span>

## `DELETE /admin/rent/{rentId}`
*Remove rent by id*

> 需要 [Header](#header)

#### 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|rentId|path|integer(int64)|true|ID of rent|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Delete successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Rent not found|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Delete successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 404 Response

```json
{
  "message": "Rent not found"
}
```

---
<span id="get-admin-members"></span>

## `GET /admin/members`
*Get cached and registered member list*

> 需要 [Header](#header)

### 回應


|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
#### 回應參數

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» registeredMembers|[[Member](#schemamember)]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» name|string|false|none|none|
|»»» updatedName|string|false|none|none|
|»»» email|string|false|none|none|
|»»» updatedEmail|string|false|none|none|
|»» cachedMembers|[[Member](#schemamember)]|false|none|none|
|»» notMemberAccounts|[[Member](#schemamember)]|false|none|none|

#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "data": {
    "registeredMembers": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string",
        "email": "string",
        "updatedEmail": "string"
      }
    ],
    "cachedMembers": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string",
        "email": "string",
        "updatedEmail": "string"
      }
    ],
    "notMemberAccounts": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string",
        "email": "string",
        "updatedEmail": "string"
      }
    ]
  }
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```
---
<span id="put-admin-members"></span>

## `PUT /admin/members`
*Update member list from member api*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```
---
<span id="put-admin-member"></span>

## `PUT /admin/member/{userId}`
*Update member from member API*

> 需要 [Header](#header)

#### 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string(uuid)|true|ID of user|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 404 Response

> User not found
```json
{
  "message": "User not found"
}
```
> Member not found
```json
{
  "message": "Member not found"
}
```
---
<span id="delete-admin-member"></span>

## `DELETE /admin/member/{userId}`
*Delete member by id*

> 需要 [Header](#header)

#### 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string(uuid)|true|ID of user|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Delete successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Delete successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 404 Response

```json
{
  "message": "User not found"
}
```

---
<span id="get-admin-admin"></span>

## `GET /admin/admin`
*Get admin list*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

#### 回應參數

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|[[User](#schemauser)]|false|none|none|


#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "name": "string",
      "email": "string",
      "isDefaultPassword": true,
      "role": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```
---
<span id="post-admin-admin"></span>

## `POST /admin/admin`
*Add admin account*

> 需要 [Header](#header)

### Body
> Content Type: `application/json`
```json
{
  "name": "string",
  "email": "string"
}
```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|
|» email|body|string|false|none|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Add Success|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|User already exist|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Add Success"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 409 Response

```json
{
  "message": "User already exist"
}
```

---
<span id="delete-admin-admin"></span>

## `DELETE /admin/admin/{userId}`
*Delete admin*

> 需要 [Header](#header)

#### 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string(uuid)|true|ID of user|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Delete successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied or could not delete this admin|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Delete successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response  

> Permission Denied:

```json
{
  "message": "Permission denied"
}
```

> Could not delete this admin:

```json
{
  "message": "Could not delete this admin"
}
```

> You are deleting yourself!:

```json
{
  "message": "You are deleting yourself!"
}
```

> 404 Response

```json
{
  "message": "User not found"
}
```

---
<span id="get-admin-config"></span>

## `GET /admin/config`
*Get config*

> 需要 [Header](#header)

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|[ConfigResponse](#schemaconfigresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "string",
  "data": {
    "current": {
      "deadline": 0,
      "rentLimit": 0
    },
    "history": [
      {
        "deadline": 0,
        "rentLimit": 0,
        "updatedBy": "string",
        "updatedAt": "2019-08-24T14:15:22Z"
      }
    ]
  }
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```
---
<span id="put-admin-config"></span>

## `PUT /admin/config`
*Modify config*

> 需要 [Header](#header)

### Body
> Content Type: `application/json`

```json
{
  "deadline": 0,
  "rentLimit": 0
}
```

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Config](#schemaconfig)|false|none|

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

#### 範例回應：

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Invalid request

> Invalid header
```json
{
  "message": "Invalid header"
}
```

> Invalid body
```json
{
  "message": "Invalid body"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```


# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "email": "string",
  "isDefaultPassword": true,
  "role": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|name|string|false|none|none|
|email|string|false|none|none|
|isDefaultPassword|boolean|false|none|none|
|role|integer|false|none|none|

<h2 id="tocS_Member">Member</h2>
<!-- backwards compatibility -->
<a id="schemamember"></a>
<a id="schema_Member"></a>
<a id="tocSmember"></a>
<a id="tocsmember"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "updatedName": "string",
  "email": "string",
  "updatedEmail": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|name|string|false|none|none|
|updatedName|string|false|none|none|
|email|string|false|none|none|
|updatedEmail|string|false|none|none|

<h2 id="tocS_Rent">Rent</h2>
<!-- backwards compatibility -->
<a id="schemarent"></a>
<a id="schema_Rent"></a>
<a id="tocSrent"></a>
<a id="tocsrent"></a>

```json
{
  "plant": {
    "name": "string",
    "intro": "string",
    "imgPath": "string",
    "nickName": "string",
    "minHumid": 0
  },
  "container": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|plant|[Plant](#schemaplant)|false|none|none|
|container|integer(int32)|false|none|none|

<h2 id="tocS_AdminRent">AdminRent</h2>
<!-- backwards compatibility -->
<a id="schemaadminrent"></a>
<a id="schema_AdminRent"></a>
<a id="tocSadminrent"></a>
<a id="tocsadminrent"></a>

```json
{
  "id": 0,
  "owner": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "plant": {
    "name": "string",
    "intro": "string",
    "imgPath": "string",
    "nickName": "string",
    "minHumid": 0
  },
  "container": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int32)|false|none|none|
|owner|[User](#schemauser)|false|none|none|
|plant|[Plant](#schemaplant)|false|none|none|
|container|integer(int32)|false|none|none|

<h2 id="tocS_Plant">Plant</h2>
<!-- backwards compatibility -->
<a id="schemaplant"></a>
<a id="schema_Plant"></a>
<a id="tocSplant"></a>
<a id="tocsplant"></a>

```json
{
  "name": "string",
  "intro": "string",
  "imgPath": "string",
  "nickName": "string",
  "minHumid": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|intro|string|false|none|none|
|imgPath|string|false|none|none|
|nickName|string|false|none|none|
|minHumid|integer(int32)|false|none|none|

<h2 id="tocS_Config">Config</h2>
<!-- backwards compatibility -->
<a id="schemaconfig"></a>
<a id="schema_Config"></a>
<a id="tocSconfig"></a>
<a id="tocsconfig"></a>

```json
{
  "deadline": 0,
  "rentLimit": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|deadline|integer|false|none|none|
|rentLimit|integer|false|none|none|

<h2 id="tocS_ConfigHistory">ConfigHistory</h2>
<!-- backwards compatibility -->
<a id="schemaconfighistory"></a>
<a id="schema_ConfigHistory"></a>
<a id="tocSconfighistory"></a>
<a id="tocsconfighistory"></a>

```json
{
  "deadline": 0,
  "rentLimit": 0,
  "updatedBy": "string",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|deadline|integer|false|none|none|
|rentLimit|integer|false|none|none|
|updatedBy|string|false|none|none|
|updatedAt|string(date-time)|false|none|none|

<h2 id="tocS_ConfigData">ConfigData</h2>
<!-- backwards compatibility -->
<a id="schemaconfigdata"></a>
<a id="schema_ConfigData"></a>
<a id="tocSconfigdata"></a>
<a id="tocsconfigdata"></a>

```json
{
  "current": {
    "deadline": 0,
    "rentLimit": 0
  },
  "history": [
    {
      "deadline": 0,
      "rentLimit": 0,
      "updatedBy": "string",
      "updatedAt": "2019-08-24T14:15:22Z"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|current|[Config](#schemaconfig)|false|none|none|
|history|[[ConfigHistory](#schemaconfighistory)]|false|none|none|

<h2 id="tocS_AuthRequest">AuthRequest</h2>
<!-- backwards compatibility -->
<a id="schemaauthrequest"></a>
<a id="schema_AuthRequest"></a>
<a id="tocSauthrequest"></a>
<a id="tocsauthrequest"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_UserRegisterRequest">UserRegisterRequest</h2>
<!-- backwards compatibility -->
<a id="schemauserregisterrequest"></a>
<a id="schema_UserRegisterRequest"></a>
<a id="tocSuserregisterrequest"></a>
<a id="tocsuserregisterrequest"></a>

```json
{
  "email": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|

<h2 id="tocS_LoginSuccessResponse">LoginSuccessResponse</h2>
<!-- backwards compatibility -->
<a id="schemaloginsuccessresponse"></a>
<a id="schema_LoginSuccessResponse"></a>
<a id="tocSloginsuccessresponse"></a>
<a id="tocsloginsuccessresponse"></a>

```json
{
  "message": "string",
  "token": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|
|token|string|false|none|none|
|user|[User](#schemauser)|false|none|none|
|rents|[[Rent](#schemarent)]|false|none|none|

<h2 id="tocS_GenericResponse">GenericResponse</h2>
<!-- backwards compatibility -->
<a id="schemagenericresponse"></a>
<a id="schema_GenericResponse"></a>
<a id="tocSgenericresponse"></a>
<a id="tocsgenericresponse"></a>

```json
{
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|

<h2 id="tocS_UserResponse">UserResponse</h2>
<!-- backwards compatibility -->
<a id="schemauserresponse"></a>
<a id="schema_UserResponse"></a>
<a id="tocSuserresponse"></a>
<a id="tocsuserresponse"></a>

```json
{
  "message": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|
|user|[User](#schemauser)|false|none|none|
|rents|[[Rent](#schemarent)]|false|none|none|

<h2 id="tocS_OtherUserPlantResponse">OtherUserPlantResponse</h2>
<!-- backwards compatibility -->
<a id="schemaotheruserplantresponse"></a>
<a id="schema_OtherUserPlantResponse"></a>
<a id="tocSotheruserplantresponse"></a>
<a id="tocsotheruserplantresponse"></a>

```json
{
  "data": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[Rent](#schemarent)]|false|none|none|

<h2 id="tocS_ConfigResponse">ConfigResponse</h2>
<!-- backwards compatibility -->
<a id="schemaconfigresponse"></a>
<a id="schema_ConfigResponse"></a>
<a id="tocSconfigresponse"></a>
<a id="tocsconfigresponse"></a>

```json
{
  "message": "string",
  "data": {
    "current": {
      "deadline": 0,
      "rentLimit": 0
    },
    "history": [
      {
        "deadline": 0,
        "rentLimit": 0,
        "updatedBy": "string",
        "updatedAt": "2019-08-24T14:15:22Z"
      }
    ]
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|
|data|[ConfigData](#schemaconfigdata)|false|none|none|

