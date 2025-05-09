import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.1',
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
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      LoginResponseDTO: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/ResponseUserDTO' }, // ResponseUserDTO 참조
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
      CarResponseDTO: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          carNumber: { type: 'string' },
          manufacturingYear: { type: 'number' },
          mileage: { type: 'number' },
          price: { type: 'number' },
          accidentCount: { type: 'number' },
          explanation: { type: 'string' },
          accidentDetails: { type: 'string' },
        },
      },
      // ResponseCarListDTO
      ResponseCarListDTO: {
        type: 'object',
        properties: {
          currentPage: { type: 'number' },
          totalPages: { type: 'number' },
          totalItemCount: { type: 'number' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                carType: { type: 'string' },
                carName: { type: 'string' },
                carPrice: { type: 'number' },
                year: { type: 'string' },
                status: { type: 'string' },
                // 필요한 다른 CarInfo 속성들 추가
              },
            },
          },
        },
      },
      // ResponseCarModelDTO
      ResponseCarModelDTO: {
        type: 'object',
        properties: {
          manufacturer: { type: 'string' },
          model: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
      // ResponseCarModelListDTO
      ResponseCarModelListDTO: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ResponseCarModelDTO',
            },
          },
        },
      },
      // ResponseCompanyDTO
      ResponseCompanyDTO: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          companyName: { type: 'string' },
          companyCode: { type: 'string' },
          userCount: { type: 'number' },
        },
      },
      // ResponseCompanyListDTO
      ResponseCompanyListDTO: {
        type: 'object',
        properties: {
          currentPage: { type: 'number' },
          totalPages: { type: 'number' },
          totalItemCount: { type: 'number' },
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ResponseCompanyDTO',
            },
          },
        },
      },
      // ResponseDocumentIdDTO
      ResponseDocumentIdDTO: {
        type: 'object',
        properties: {
          contractDocumentId: { type: 'number' },
        },
      },
      // ResponseContractDocDTO
      ResponseContractDocDTO: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          contractName: { type: 'string' },
          resolutionDate: { type: 'string', format: 'date-time', nullable: true },
          documentsCount: { type: 'number' },
          manager: { type: 'string' },
          carNumber: { type: 'string' },
          documents: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                fileName: { type: 'string' },
              },
            },
          },
        },
      },
      // ResponseContractDocListDTO
      ResponseContractDocListDTO: {
        type: 'object',
        properties: {
          currentPage: { type: 'number' },
          totalPages: { type: 'number' },
          totalItemCount: { type: 'number' },
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ResponseContractDocDTO',
            },
          },
        },
      },
      // ResponseContractChoiceDTO
      ResponseContractChoiceDTO: {
        type: 'object',
        properties: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              contractName: { type: 'string' },
            },
          },
        },
      },
      // ResponseContractDTO
      ResponseContractDTO: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          contractPrice: { type: 'number' },
          status: { type: 'string' },
          resolutionDate: { type: 'string', format: 'date-time', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          customer: { $ref: '#/components/schemas/Customer' },
          car: { $ref: '#/components/schemas/Car' },
          user: { $ref: '#/components/schemas/User' },
          meetings: {
            type: 'array',
            items: { $ref: '#/components/schemas/Meeting' },
          },
          contractDocuments: {
            type: 'array',
            items: { $ref: '#/components/schemas/ContractDocument' },
          },
        },
      },
      // Customer
      Customer: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          phoneNumber: { type: 'string' },
        },
      },
      // Car
      Car: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          carNumber: { type: 'string' },
          model: { type: 'string' },
          manufacturer: { type: 'string' },
        },
      },
      // User
      User: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
        },
      },
      // Meeting
      Meeting: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          meetingDate: { type: 'string', format: 'date-time' },
          location: { type: 'string' },
        },
      },
      // ContractDocument
      ContractDocument: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          fileName: { type: 'string' },
          filePath: { type: 'string' },
        },
      },
      // ResponseCustomerDTO
      ResponseCustomerDTO: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          gender: { type: 'string' },
          phoneNumber: { type: 'string' },
          ageGroup: { type: 'string' },
          region: { type: 'string' },
          email: { type: 'string' },
          memo: { type: 'string', nullable: true },
          contractCount: { type: 'number' },
        },
      },
      // ResponseCustomerListDTO
      ResponseCustomerListDTO: {
        type: 'object',
        properties: {
          currentPage: { type: 'number' },
          totalPages: { type: 'number' },
          totalItemCount: { type: 'number' },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/ResponseCustomerDTO' },
          },
        },
      },
      // CarTypeCountDTO (차량 유형별 카운트 DTO)
      CarTypeCountDTO: {
        type: 'object',
        properties: {
          carType: { type: 'string' },
          count: { type: 'number' },
        },
      },
      // ResponseDashBoardDTO
      ResponseDashBoardDTO: {
        type: 'object',
        properties: {
          monthlySales: { type: 'number' },
          lastMonthSales: { type: 'number' },
          growthRate: { type: 'number' },
          proceedingContractsCount: { type: 'number' },
          completedContractsCount: { type: 'number' },
          contractsByCarType: {
            type: 'array',
            items: { $ref: '#/components/schemas/CarTypeCountDTO' },
          },
          salesByCarType: {
            type: 'array',
            items: { $ref: '#/components/schemas/CarTypeCountDTO' },
          },
        },
      },
      // CompanyDTO (회사 DTO)
      CompanyDTO: {
        type: 'object',
        properties: {
          companyCode: { type: 'string' },
          companyName: { type: 'string' },
        },
      },
      // ResponseUserDTO
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
          company: { $ref: '#/components/schemas/CompanyDTO' },
        },
      },
      // ResponseCompanyUserListDTO
      ResponseCompanyUserListDTO: {
        type: 'object',
        properties: {
          currentPage: { type: 'number' },
          totalPages: { type: 'number' },
          totalItemCount: { type: 'number' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                employeeNumber: { type: 'string' },
                phoneNumber: { type: 'string' },
                company: {
                  type: 'object',
                  properties: {
                    companyName: { type: 'string' },
                  },
                },
              },
            },
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
