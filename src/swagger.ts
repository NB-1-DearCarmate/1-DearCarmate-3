import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DearCarmate', // API 이름
    version: '1.0.0',
    description: '자동 생성된 Swagger 문서입니다.', // API 설명
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`, // 서버 URL
    },
  ],
  components: {
    schemas: {
      CompanyDTO: {
        type: 'object',
        properties: {
          companyCode: { type: 'string' },
        },
      },
      LoginResponseDTO: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/ResponseUserDTO', // 다른 스키마 참조
          },
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
      ResponseCompanyDTO: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          companyName: { type: 'string' },
          companyCode: { type: 'string' },
          userCount: { type: 'number' },
        },
      },
      ResponseUserDTO: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          employeeNumber: { type: 'string' },
          phoneNumber: { type: 'string' },
          imageUrl: { type: 'string' },
          isAdmin: { type: 'boolean' },
          company: {
            $ref: '#/components/schemas/CompanyDTO', // 다른 스키마 참조
          },
        },
      },
      CreateUserDTO: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          employeeNumber: { type: 'string' },
          phoneNumber: { type: 'string' },
          password: { type: 'string' },
          companyId: { type: 'number' },
          role: {
            type: 'string',
            enum: ['EMPLOYEE', 'ADMIN', 'OWNER'], // USER_ROLE에 맞춰 수정된 enum 값
          },
        },
      },
      OmittedUser: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          companyId: { type: 'number' },
          email: { type: 'string' },
          phoneNumber: { type: 'string' },
          role: {
            type: 'string',
            enum: ['EMPLOYEE', 'ADMIN', 'OWNER'], // USER_ROLE에 맞춰 수정된 enum 값
          },
          employeeNumber: { type: 'string' },
          imageUrl: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' }, // Date 타입을 Swagger에서 처리하는 방식
        },
      },
      ContractForResponse: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          contractPrice: { type: 'string', format: 'decimal' }, // Swagger에는 Decimal 지원이 없으므로 string 처리
          status: {
            type: 'string',
            enum: [
              'VEHICLE_CHECKING',
              'PRICE_CHECKING',
              'CONTRACT_PREPARING',
              'CONTRACT_SUCCESS',
              'CONTRACT_FAILED',
            ],
          },
          resolutionDate: { type: 'string', format: 'date-time', nullable: true },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
          customer: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
          car: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              carModel: {
                type: 'object',
                properties: {
                  model: { type: 'string' },
                },
              },
            },
          },
          meetings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                time: { type: 'string', format: 'date-time' },
              },
            },
          },
          contractDocuments: {
            type: 'array',
            nullable: true,
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                fileName: { type: 'string' },
                filePath: { type: 'string' },
                fileSize: { type: 'number', nullable: true },
                contractId: { type: 'number', nullable: true },
              },
            },
          },
        },
      },
      ResponseContractListDTO: {
        type: 'object',
        properties: {
          carInspection: {
            type: 'object',
            properties: {
              totalItemCount: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/ContractForResponse' },
              },
            },
          },
          priceNegotiation: {
            type: 'object',
            properties: {
              totalItemCount: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/ContractForResponse' },
              },
            },
          },
          contractDraft: {
            type: 'object',
            properties: {
              totalItemCount: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/ContractForResponse' },
              },
            },
          },
          contractSuccessful: {
            type: 'object',
            properties: {
              totalItemCount: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/ContractForResponse' },
              },
            },
          },
          contractFailed: {
            type: 'object',
            properties: {
              totalItemCount: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/ContractForResponse' },
              },
            },
          },
        },
      },
      ResponseCustomerDropdownDTO: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            data: { type: 'string' },
          },
        },
      },
      ResponseCarDropdownDTO: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            data: { type: 'string' },
          },
        },
      },
      ResponseUserDropdownDTO: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            data: { type: 'string' },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/controllers/*.ts'], // 주석 작성 위치
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
