export const COMPANY = [
  {
    id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f',
    name: '햇살카',
    code: 'sunshine',
  },
  {
    id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14',
    name: '케이카',
    code: 'kcar',
  },
  {
    id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k',
    name: '굿모닝카',
    code: 'goodmoring',
  },
  {
    id: 'd7e8f9a1-b2c3-d4e5-f6g7-h8i9j10k11l1',
    name: '한빛오토',
    code: 'hanbit-auto',
  },
  {
    id: 'e9f1a2b3-c4d5-e6f7-g8h9-i10j11k12l13',
    name: '미래모터스',
    code: 'mirae-motors',
  },
  {
    id: 'f1a2b3c4-d5e6-f7g8-h9i10-j11k12l13m14',
    name: '하이카',
    code: 'hi-car',
  },
  {
    id: 'g2b3c4d5-e6f7-g8h9-i10j11-k12l13m14n15',
    name: '퍼스트카',
    code: 'firstcar',
  },
  {
    id: 'h3c4d5e6-f7g8-h9i10-j11k12-l13m14n15o16',
    name: '드림자동차',
    code: 'dreamauto',
  },
  {
    id: 'i4d5e6f7-g8h9-i10j11-k12l13-m14n15o16p17',
    name: '스타모터스',
    code: 'starmotors',
  },
  {
    id: 'j5e6f7g8-h9i10-j11k12-l13m14-n15o16p17q18',
    name: '스피드카',
    code: 'speedcar',
  },
];

export const USER = [
  {
    id: 'd1a23b45-6789-4abc-def0-1234567890aa',
    name: '관리자',
    email: 'admin@dearcarmate.com',
    phone_number: '01011112222',
    password: 'admin1234',
    role: 'ADMIN',
    user_code: 'USR001',
    createdAt: new Date('2024-01-01T09:00:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', // 햇살카
  },
  {
    id: 'e2b34c56-7890-4bcd-efa1-2345678901bb',
    name: '햇살 오너',
    email: 'admin@sunshine.com',
    phone_number: '01022223333',
    password: 'password',
    role: 'OWNER',
    user_code: 'USR002',
    createdAt: new Date('2024-01-05T10:00:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', // 햇살카
  },
  {
    id: 'f3c45d67-8901-4cde-fab2-3456789012cc',
    name: '햇살 직원',
    email: 'user1@sunshine.com',
    phone_number: '01033334444',
    password: 'password',
    role: 'EMPLOYEE',
    user_code: 'USR003',
    createdAt: new Date('2024-01-07T14:00:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', // 햇살카
  },
  {
    id: 'a4d56e78-9012-4def-abc3-4567890123dd',
    name: '케이카 오너',
    email: 'owner@kcar.com',
    phone_number: '01044445555',
    password: 'password',
    role: 'OWNER',
    user_code: 'USR004',
    createdAt: new Date('2024-01-10T11:00:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14',
  },
  {
    id: 'b5e67f89-0123-4f01-bcd4-5678901234ee',
    name: '케이카 직원',
    email: 'employee1@kcar.com',
    phone_number: '01055556666',
    password: 'password',
    role: 'EMPLOYEE',
    user_code: 'USR005',
    createdAt: new Date('2024-01-12T15:30:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14',
  },
  {
    id: 'c6f78a90-1234-4012-cde5-6789012345ff',
    name: '굿모닝 오너',
    email: 'owner@goodmoring.com',
    phone_number: '01066667777',
    password: 'password',
    role: 'OWNER',
    user_code: 'USR006',
    createdAt: new Date('2024-01-15T09:45:00Z'),
    company_id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k',
  },
  {
    id: 'd7a89b01-2345-4023-def6-7890123456aa',
    name: '굿모닝 직원',
    email: 'employee@goodmoring.com',
    phone_number: '01077778888',
    password: 'password',
    role: 'EMPLOYEE',
    user_code: 'USR007',
    createdAt: new Date('2024-01-16T13:20:00Z'),
    company_id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k',
  },
  {
    id: 'e8b90c12-3456-4034-efa7-8901234567bb',
    name: '미래모터스 대표',
    email: 'owner@mirae.com',
    phone_number: '01088889999',
    password: 'password',
    role: 'OWNER',
    user_code: 'USR008',
    createdAt: new Date('2024-01-18T10:10:00Z'),
    company_id: 'e9f1a2b3-c4d5-e6f7-g8h9-i10j11k12l13',
  },
  {
    id: 'f9c01d23-4567-4045-fab8-9012345678cc',
    name: '미래모터스 직원',
    email: 'staff@mirae.com',
    phone_number: '01099990000',
    password: 'password',
    role: 'EMPLOYEE',
    user_code: 'USR009',
    createdAt: new Date('2024-01-19T08:55:00Z'),
    company_id: 'e9f1a2b3-c4d5-e6f7-g8h9-i10j11k12l13',
  },
];

export const CUSTOMER = [
  {
    id: 'a1a1a1a1-1111-1111-1111-111111111111',
    name: '김철수',
    email: 'kimcs@example.com',
    gender: '남성',
    phone_number: '01012345678',
    age_group: 30,
    region: '서울',
    contract_count: 2,
    memo: '우수 고객',
    created_at: new Date('2024-01-10T10:00:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', // 햇살카
  },
  {
    id: 'b2b2b2b2-2222-2222-2222-222222222222',
    name: '이영희',
    email: 'leeyh@example.com',
    gender: '여성',
    phone_number: '01023456789',
    age_group: 20,
    region: '부산',
    contract_count: 1,
    memo: '',
    created_at: new Date('2024-01-11T09:30:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14', // 케이카
  },
  {
    id: 'c3c3c3c3-3333-3333-3333-333333333333',
    name: '박지성',
    email: 'parkjs@example.com',
    gender: '남성',
    phone_number: '01034567890',
    age_group: 40,
    region: '인천',
    contract_count: 0,
    memo: '시승 예약 요청',
    created_at: new Date('2024-01-12T14:00:00Z'),
    company_id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k', // 굿모닝카
  },
  {
    id: 'd4d4d4d4-4444-4444-4444-444444444444',
    name: '최미영',
    email: 'choimy@example.com',
    gender: '여성',
    phone_number: '01045678901',
    age_group: 30,
    region: '대전',
    contract_count: 3,
    memo: '리스를 선호함',
    created_at: new Date('2024-01-13T15:15:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', //햇살카
  },
  {
    id: 'e5e5e5e5-5555-5555-5555-555555555555',
    name: '정우성',
    email: 'jungws@example.com',
    gender: '남성',
    phone_number: '01056789012',
    age_group: 50,
    region: '광주',
    contract_count: 1,
    memo: '',
    created_at: new Date('2024-01-14T10:45:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14', //케이카
  },
  {
    id: 'f6f6f6f6-6666-6666-6666-666666666666',
    name: '장미란',
    email: 'jangmr@example.com',
    gender: '여성',
    phone_number: '01067890123',
    age_group: 40,
    region: '울산',
    contract_count: 0,
    memo: '첫 방문',
    created_at: new Date('2024-01-15T11:00:00Z'),
    company_id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k', //굿모닝카
  },
  {
    id: 'g7g7g7g7-7777-7777-7777-777777777777',
    name: '한예슬',
    email: 'hanys@example.com',
    gender: '여성',
    phone_number: '01078901234',
    age_group: 30,
    region: '서울',
    contract_count: 2,
    memo: '',
    created_at: new Date('2024-01-16T12:00:00Z'),
    company_id: 'e9f1a2b3-c4d5-e6f7-g8h9-i10j11k12l13', // 미래모터스
  },
  {
    id: 'h8h8h8h8-8888-8888-8888-888888888888',
    name: '오승훈',
    email: 'ohsh@example.com',
    gender: '남성',
    phone_number: '01089012345',
    age_group: 20,
    region: '대구',
    contract_count: 1,
    memo: '차량 문의 많음',
    created_at: new Date('2024-01-17T13:00:00Z'),
    company_id: 'e9f1a2b3-c4d5-e6f7-g8h9-i10j11k12l13', // 미래 모터스
  },
  {
    id: 'i9i9i9i9-9999-9999-9999-999999999999',
    name: '배수지',
    email: 'baesz@example.com',
    gender: '여성',
    phone_number: '01090123456',
    age_group: 30,
    region: '수원',
    contract_count: 0,
    memo: '',
    created_at: new Date('2024-01-18T14:30:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14', //케이카
  },
  {
    id: 'j0j0j0j0-0000-0000-0000-000000000000',
    name: '서강준',
    email: 'seokj@example.com',
    gender: '남성',
    phone_number: '01091234567',
    age_group: 20,
    region: '창원',
    contract_count: 0,
    memo: '',
    created_at: new Date('2024-01-19T16:00:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', //햇살카
  },
];

export const CAR = [
  {
    id: 'k1k1k1k1-1111-1111-1111-111111111111',
    car_number: '12가3456',
    manufactuuing_year: 2020,
    mileage: 15000,
    price: 15000000.0,
    status: 'AVAILABLE',
    accident_count: 0,
    content: '전혀 사고 없는 차량',
    accident_detail: '',
    Datetime: new Date('2024-01-10T10:00:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', // 햇살카
    car_model_id: 'm1m1m1m1-1a2b-3c4d-5e6f-7g8h9i10j11k', // 모델 1
  },
  {
    id: 'l2l2l2l2-2222-2222-2222-222222222222',
    car_number: '34나5678',
    manufactuuing_year: 2019,
    mileage: 20000,
    price: 12000000.0,
    status: 'PENDING',
    accident_count: 1,
    content: '사고 이력 있음, 수리 완료',
    accident_detail: '전면 충돌',
    Datetime: new Date('2024-01-11T11:00:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14', // 케이카
    car_model_id: 'm2m2m2m2-2b3c-4d5e-6f7g-8h9i10j11k12', // 모델 2
  },
  {
    id: 'm3m3m3m3-3333-3333-3333-333333333334',
    car_number: '56다7890',
    manufactuuing_year: 2021,
    mileage: 5000,
    price: 25000000.0,
    status: 'SOLD',
    accident_count: 0,
    content: '새 차량처럼 깨끗',
    accident_detail: '',
    Datetime: new Date('2024-01-12T12:00:00Z'),
    company_id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k', // 굿모닝카
    car_model_id: 'm3m3m3m3-3333-3333-3333-333333333333', // 모델 3
  },
  {
    id: 'n4n4n4n4-4444-4444-4444-444444444444',
    car_number: '78라9012',
    manufactuuing_year: 2018,
    mileage: 35000,
    price: 10000000.0,
    status: 'AVAILABLE',
    accident_count: 2,
    content: '사고 이력 있음, 재조정 완료',
    accident_detail: '후방 사고',
    Datetime: new Date('2024-01-13T13:00:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', // 햇살카
    car_model_id: 'm1m1m1m1-1a2b-3c4d-5e6f-7g8h9i10j11k', // 모델 1
  },
  {
    id: 'o5o5o5o5-5555-5555-5555-555555555555',
    car_number: '90마2345',
    manufactuuing_year: 2022,
    mileage: 8000,
    price: 18000000.0,
    status: 'PENDING',
    accident_count: 0,
    content: '최신 모델, 컨디션 우수',
    accident_detail: '',
    Datetime: new Date('2024-01-14T14:30:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14', // 케이카
    car_model_id: 'm2m2m2m2-2b3c-4d5e-6f7g-8h9i10j11k12', // 모델 2
  },
  {
    id: 'p6p6p6p6-6666-6666-6666-666666666666',
    car_number: '12바3456',
    manufactuuing_year: 2020,
    mileage: 12000,
    price: 16000000.0,
    status: 'AVAILABLE',
    accident_count: 0,
    content: '사고 없는 깨끗한 차량',
    accident_detail: '',
    Datetime: new Date('2024-01-15T10:30:00Z'),
    company_id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k', // 굿모닝카
    car_model_id: 'm3m3m3m3-3333-3333-3333-333333333333', // 모델 3
  },
  {
    id: 'q7q7q7q7-7777-7777-7777-777777777777',
    car_number: '34사4567',
    manufactuuing_year: 2017,
    mileage: 50000,
    price: 8500000.0,
    status: 'SOLD',
    accident_count: 3,
    content: '사고 여러 건 있음, 매매가 어려움',
    accident_detail: '전면 및 후면 충돌',
    Datetime: new Date('2024-01-16T11:15:00Z'),
    company_id: 'a3f1b1a2-4c6b-4b6a-9df7-1a2b3c4d5e6f', // 햇살카
    car_model_id: 'm1m1m1m1-1a2b-3c4d-5e6f-7g8h9i10j11k', // 모델 1
  },
  {
    id: 'r8r8r8r8-8888-8888-8888-888888888888',
    car_number: '56아5678',
    manufactuuing_year: 2019,
    mileage: 25000,
    price: 11000000.0,
    status: 'PENDING',
    accident_count: 0,
    content: '좋은 상태의 차량',
    accident_detail: '',
    Datetime: new Date('2024-01-17T12:30:00Z'),
    company_id: 'c5d6e7f8-1a2b-3c4d-5e6f-7g8h9i10j11k', // 굿모닝카
    car_model_id: 'm3m3m3m3-3333-3333-3333-333333333333', // 모델 3
  },
  {
    id: 's9s9s9s9-9999-9999-9999-999999999999',
    car_number: '78자6789',
    manufactuuing_year: 2021,
    mileage: 9000,
    price: 22000000.0,
    status: 'AVAILABLE',
    accident_count: 0,
    content: '완전 새 차량',
    accident_detail: '',
    Datetime: new Date('2024-01-18T13:45:00Z'),
    company_id: 'b4c2d3e4-5f6a-7b8c-9d10-e11f12g13h14', // 케이카
    car_model_id: 'm2m2m2m2-2b3c-4d5e-6f7g-8h9i10j11k12', // 모델 2
  },
];

export const CONTRACT = [
  {
    id: 't1t1t1t1-1111-1111-1111-111111111111',
    status: 'CONTRACT_SUCCESS',
    finalized_at: new Date('2024-01-10T14:00:00Z'),
    created_at: new Date('2024-01-10T14:00:00Z'),
    customer_id: 'a1a1a1a1-1111-1111-1111-111111111111', // 고객 1
    car_id: 'k1k1k1k1-1111-1111-1111-111111111111', // 차량 1 (같은 회사에 속하는 차량)
    user_id: 'f3c45d67-8901-4cde-fab2-3456789012cc', // 유저 1 (employee)
  },
  {
    id: 't2t2t2t2-2222-2222-2222-222222222222',
    status: 'CONTRACT_PREPARING',
    finalized_at: null,
    created_at: new Date('2024-01-11T15:00:00Z'),
    customer_id: 'd4d4d4d4-4444-4444-4444-444444444444', // 고객 2
    car_id: 'n4n4n4n4-4444-4444-4444-444444444444', // 차량 2 (같은 회사에 속하는 차량)
    user_id: 'f3c45d67-8901-4cde-fab2-3456789012cc',
  },
  {
    id: 't3t3t3t3-3333-3333-3333-333333333333',
    status: 'VEHICLE_CHECKING',
    finalized_at: null,
    created_at: new Date('2024-01-12T16:30:00Z'),
    customer_id: 'b2b2b2b2-2222-2222-2222-222222222222', // 고객 3
    car_id: 'l2l2l2l2-2222-2222-2222-222222222222', // 차량 3 (같은 회사에 속하는 차량)
    user_id: 'b5e67f89-0123-4f01-bcd4-5678901234ee', // 유저 3 (employee)
  },
  {
    id: 't4t4t4t4-4444-4444-4444-444444444444',
    status: 'PRICE_CHECKING',
    finalized_at: null,
    created_at: new Date('2024-01-13T17:00:00Z'),
    customer_id: 'e5e5e5e5-5555-5555-5555-555555555555', // 고객 4
    car_id: 'o5o5o5o5-5555-5555-5555-555555555555', // 차량 4 (같은 회사에 속하는 차량)
    user_id: 'b5e67f89-0123-4f01-bcd4-5678901234ee', // 유저 4 (employee)
  },
  {
    id: 't5t5t5t5-5555-5555-5555-555555555555',
    status: 'CONTRACT_FAILED',
    finalized_at: new Date('2024-01-14T18:15:00Z'),
    created_at: new Date('2024-01-14T18:15:00Z'),
    customer_id: 'c3c3c3c3-3333-3333-3333-333333333333', // 고객 5
    car_id: 'm3m3m3m3-3333-3333-3333-333333333334', // 차량 5 (같은 회사에 속하는 차량)
    user_id: 'd7a89b01-2345-4023-def6-7890123456aa', // 유저 5 (employee)
  },
  {
    id: 't6t6t6t6-6666-6666-6666-666666666666',
    status: 'CONTRACT_SUCCESS',
    finalized_at: new Date('2024-01-15T19:30:00Z'),
    created_at: new Date('2024-01-15T19:30:00Z'),
    customer_id: 'f6f6f6f6-6666-6666-6666-666666666666', // 고객 6
    car_id: 'p6p6p6p6-6666-6666-6666-666666666666', // 차량 6 (같은 회사에 속하는 차량)
    user_id: 'd7a89b01-2345-4023-def6-7890123456aa', // 유저 6 (employee)
  },
];

export const CONTRACTDOCUMENT = [
  {
    id: 'd1d1d1d1-1111-1111-1111-111111111111',
    file_name: 'contract_001.pdf',
    file_path: '/documents/contracts/contract_001.pdf',
    file_size: 2048,
    contract_id: 't1t1t1t1-1111-1111-1111-111111111111', // 계약 1
  },
  {
    id: 'd2d2d2d2-2222-2222-2222-222222222222',
    file_name: 'contract_002.pdf',
    file_path: '/documents/contracts/contract_002.pdf',
    file_size: 3072,
    contract_id: 't2t2t2t2-2222-2222-2222-222222222222', // 계약 2
  },
  {
    id: 'd3d3d3d3-3333-3333-3333-333333333333',
    file_name: 'contract_003.pdf',
    file_path: '/documents/contracts/contract_003.pdf',
    file_size: 4096,
    contract_id: 't3t3t3t3-3333-3333-3333-333333333333', // 계약 3
  },
  {
    id: 'd4d4d4d4-4444-4444-4444-444444444444',
    file_name: 'contract_004.pdf',
    file_path: '/documents/contracts/contract_004.pdf',
    file_size: 5120,
    contract_id: 't4t4t4t4-4444-4444-4444-444444444444', // 계약 4
  },
  {
    id: 'd5d5d5d5-5555-5555-5555-555555555555',
    file_name: 'contract_005.pdf',
    file_path: '/documents/contracts/contract_005.pdf',
    file_size: 6144,
    contract_id: 't5t5t5t5-5555-5555-5555-555555555555', // 계약 5
  },
  {
    id: 'd6d6d6d6-6666-6666-6666-666666666666',
    file_name: 'contract_006.pdf',
    file_path: '/documents/contracts/contract_006.pdf',
    file_size: 7168,
    contract_id: 't6t6t6t6-6666-6666-6666-666666666666', // 계약 6
  },
];

export const CARMODEL = [
  {
    id: 'm1m1m1m1-1a2b-3c4d-5e6f-7g8h9i10j11k',
    name: 'Sonata 2023',
    manufacturer_id: 'ma1ma1ma1-1111-1111-1111-111111111111', // 현대
    car_type_id: 'ct1ct1ct1-1111-1111-1111-111111111111', // 세단
  },
  {
    id: 'm2m2m2m2-2b3c-4d5e-6f7g-8h9i10j11k12',
    name: 'K7 2023',
    manufacturer_id: 'ma2ma2ma2-2222-2222-2222-222222222222', // 기아
    car_type_id: 'ct2ct2ct2-2222-2222-2222-222222222222', // SUV
  },
  {
    id: 'm3m3m3m3-3333-3333-3333-333333333333',
    name: 'Tucson 2023',
    manufacturer_id: 'ma3ma3ma3-3333-3333-3333-333333333333', // 현대
    car_type_id: 'ct2ct2ct2-2222-2222-2222-222222222222', // SUV
  },
  {
    id: 'm4m4m4m4-4444-4444-4444-444444444444',
    name: 'Carnival 2023',
    manufacturer_id: 'ma2ma2ma2-2222-2222-2222-222222222222', // 기아
    car_type_id: 'ct3ct3ct3-3333-3333-3333-333333333333', // 미니밴
  },
  {
    id: 'm5m5m5m5-5555-5555-5555-555555555555',
    name: 'S-Class 2023',
    manufacturer_id: 'ma4ma4ma4-4444-4444-4444-444444444444', // 벤츠
    car_type_id: 'ct1ct1ct1-1111-1111-1111-111111111111', // 세단
  },
  {
    id: 'm6m6m6m6-6666-6666-6666-666666666666',
    name: 'C-Class 2023',
    manufacturer_id: 'ma4ma4ma4-4444-4444-4444-444444444444', // 벤츠
    car_type_id: 'ct1ct1ct1-1111-1111-1111-111111111111', // 세단
  },
];

export const MEETING = [
  {
    id: 'mt1mt1mt1-1111-1111-1111-111111111111',
    time: new Date('2024-05-10T10:00:00Z'),
    contract_id: 't1t1t1t1-1111-1111-1111-111111111111', // 계약 1
  },
  {
    id: 'mt2mt2mt2-2222-2222-2222-222222222222',
    time: new Date('2024-05-11T14:00:00Z'),
    contract_id: 't2t2t2t2-2222-2222-2222-222222222222', // 계약 2
  },
  {
    id: 'mt3mt3mt3-3333-3333-3333-333333333333',
    time: new Date('2024-05-12T16:00:00Z'),
    contract_id: 't3t3t3t3-3333-3333-3333-333333333333', // 계약 3
  },
  {
    id: 'mt4mt4mt4-4444-4444-4444-444444444444',
    time: new Date('2024-05-13T09:00:00Z'),
    contract_id: 't4t4t4t4-4444-4444-4444-444444444444', // 계약 4
  },
  {
    id: 'mt5mt5mt5-5555-5555-5555-555555555555',
    time: new Date('2024-05-14T11:00:00Z'),
    contract_id: 't5t5t5t5-5555-5555-5555-555555555555', // 계약 5
  },
  {
    id: 'mt6mt6mt6-6666-6666-6666-666666666666',
    time: new Date('2024-05-15T13:00:00Z'),
    contract_id: 't6t6t6t6-6666-6666-6666-666666666666', // 계약 6
  },
];

export const MANUFACTURER = [
  {
    id: 'ma1ma1ma1-1111-1111-1111-111111111111',
    name: 'Hyundai',
  },
  {
    id: 'ma2ma2ma2-2222-2222-2222-222222222222',
    name: 'Kia',
  },
  {
    id: 'ma3ma3ma3-3333-3333-3333-333333333333',
    name: 'Mercedes-Benz',
  },
  {
    id: 'ma4ma4ma4-4444-4444-4444-444444444444',
    name: 'BMW',
  },
  {
    id: 'ma5ma5ma5-5555-5555-5555-555555555555',
    name: 'Audi',
  },
  {
    id: 'ma6ma6ma6-6666-6666-6666-666666666666',
    name: 'Toyota',
  },
];

export const CARTYPE = [
  {
    id: 'ct1ct1ct1-1111-1111-1111-111111111111',
    name: 'Sedan', // 세단
  },
  {
    id: 'ct2ct2ct2-2222-2222-2222-222222222222',
    name: 'SUV', // SUV
  },
  {
    id: 'ct3ct3ct3-3333-3333-3333-333333333333',
    name: 'Minivan', // 미니밴
  },
  {
    id: 'ct4ct4ct4-4444-4444-4444-444444444444',
    name: 'Coupe', // 쿠페
  },
  {
    id: 'ct5ct5ct5-5555-5555-5555-555555555555',
    name: 'Convertible', // 컨버터블
  },
  {
    id: 'ct6ct6ct6-6666-6666-6666-666666666666',
    name: 'Hatchback', // 해치백
  },
];
