import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { RechargeIntegrationController } from "../rechargeIntegration.controller";
import { RechargeIntegrationService } from "../rechargeIntegration.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  deliveryDate: new Date(),
  id: "exampleId",
  rechargeCustomerId: "exampleRechargeCustomerId",
  rechargeSubscriptionId: "exampleRechargeSubscriptionId",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  createdAt: new Date(),
  deliveryDate: new Date(),
  id: "exampleId",
  rechargeCustomerId: "exampleRechargeCustomerId",
  rechargeSubscriptionId: "exampleRechargeSubscriptionId",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    deliveryDate: new Date(),
    id: "exampleId",
    rechargeCustomerId: "exampleRechargeCustomerId",
    rechargeSubscriptionId: "exampleRechargeSubscriptionId",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  deliveryDate: new Date(),
  id: "exampleId",
  rechargeCustomerId: "exampleRechargeCustomerId",
  rechargeSubscriptionId: "exampleRechargeSubscriptionId",
  updatedAt: new Date(),
};

const service = {
  createRechargeIntegration() {
    return CREATE_RESULT;
  },
  rechargeIntegrations: () => FIND_MANY_RESULT,
  rechargeIntegration: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("RechargeIntegration", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: RechargeIntegrationService,
          useValue: service,
        },
      ],
      controllers: [RechargeIntegrationController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /rechargeIntegrations", async () => {
    await request(app.getHttpServer())
      .post("/rechargeIntegrations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        deliveryDate: CREATE_RESULT.deliveryDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /rechargeIntegrations", async () => {
    await request(app.getHttpServer())
      .get("/rechargeIntegrations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          deliveryDate: FIND_MANY_RESULT[0].deliveryDate.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /rechargeIntegrations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/rechargeIntegrations"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /rechargeIntegrations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/rechargeIntegrations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        deliveryDate: FIND_ONE_RESULT.deliveryDate.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /rechargeIntegrations existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/rechargeIntegrations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        deliveryDate: CREATE_RESULT.deliveryDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/rechargeIntegrations")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
