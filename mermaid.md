```mermaid

erDiagram
USER {
UUID id PK
Varchar name
Varchar email
Varchar phone_number
Varchar password
UUID company_id FK
UUID user_code FK
Datetime created_at
}

CUSTOMER{
  UUID id PK
  Varchar name
  Varchar email
  Varchar gender
  Varchar phone_number
  Int age_group
  Varchar region
  Int contract_count
  Text memo
  Datetime created_at
}

CAR{
  UUID id PK
  UUID car_category_id FK
  Varchar car_number
  Varchar car_type
  Varchar manufacturer
  Int manufacturing_year
  Int mileage
  Decimal price
  Varchar status
  Int accident_count
  Varchar content
  Varchar accident_details
  Datetime created_at
  UUID company_id FK
}

CONTRACT{
  UUID id PK
  Varchar status
  Datetime finalized_at
  Datetime created_at
  UUID customer_id FK
  UUID car_id FK
  UUID user_id FK
}

CONTRACTDOCUMENT{
  UUID id PK
  Varchar file_name
  Varchar file_path
  Int     file_size
  UUID contract_id FK
}

CARCATEGORY{
  UUID id PK
  Varchar type
}

ALARM{
  UUID id
  Datetime time
  UUID meeting_id FK
}

MEETING{
  UUID id
  Datetime time
  UUID contract_id FK
}

COMPANY{
  UUID id
  Varchar name
  Varchar code
  Varchar passcode
}

USERCODE{
  UUID id PK
  Varchar code
  UUID company_id FK
}


    USER ||--o{ COMPANY : "소속회사"
    USER ||--o{ CONTRACT : "담당계약"
    CUSTOMER ||--o{ CONTRACT : "구매계약"
    COMPANY ||--o{ CUSTOMER  : "계약하려는 고객"
    CAR ||--o{ CONTRACT : "계약된 차량"
    COMPANY ||--o{ CAR : "회사에 소속된 차량"
    CARCATEGORY ||--o{ CAR : "차량종류 정보제공"
    CONTRACT ||--o{ MEETING : "계약관련 미팅"
    MEETING ||--o{ ALARM : "미팅 알람"
    CONTRACT ||--o{ CONTRACTDOCUMENT : "계약서류 디렉토리경로"
    COMPANY ||--o{ CONTRACT : "회사에 소속된 계약"
    COMPANY ||--o{ USERCODE : "회사에 소속된 사원들의 코드"
    USERCODE ||--|| USER : "회사에서 발급된 사원코드"

```
