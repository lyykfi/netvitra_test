import { v4 as uuidv4 } from "uuid";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

import { HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";

const TEST_USER = {
    email: "test@nv.com",
    password: "tested"
};

const mockData = [
    {
        id: 1,
        isComplete: false,
        user: {
            firstName: "123123",
            lastName: "134234",
            avatar: null,
            country: "Russia",
            birthDate: "1984/11/17"
        }
    },
    {
        id: 2,
        isComplete: true,
        user: {
            firstName: "David",
            lastName: "Klotzer",
            avatar: null,
            country: "Germany",
            birthDate: null
        }
    },
    {
        id: 3,
        isComplete: true,
        user: {
            firstName: "Denic",
            lastName: "Kosticus",
            avatar: null,
            country: "Greece",
            birthDate: null
        }
    },
    {
        id: 4,
        isComplete: false,
        user: {
            firstName: "David",
            lastName: "Klotzer",
            avatar: null,
            country: "Germany",
            birthDate: null
        }
    },
    {
        id: 5,
        isComplete: true,
        user: {
            firstName: "fwer",
            lastName: "qweq",
            avatar: null,
            country: "France",
            birthDate: null
        }
    },
    {
        id: 6,
        isComplete: false,
        user: {
            firstName: "qsdfsdf",
            lastName: "qwe",
            avatar: null,
            country: "China",
            birthDate: "1984/11/17"
        }
    },
    {
        id: 7,
        isComplete: false,
        user: {
            firstName: "123123",
            lastName: "134234",
            avatar: null,
            country: "Russia",
            birthDate: "1984/11/17"
        }
    },
    {
        id: 8,
        isComplete: false,
        user: {
            firstName: "er",
            lastName: "fewer",
            avatar: null,
            country: "China",
            birthDate: "1984/11/17"
        }
    }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize() as any);

        function handleRoute() {
            switch (true) {
                case url.endsWith("/login") && method === "POST":
                    return authenticate(body);
                case url.endsWith("/cases") && method === "GET":
                    return cases();
                case url.endsWith("/cases") && method === "POST":
                    return updateCase(body);
                default:
                    return next.handle(request);
            }
        }

        function authenticate(body: any) {
            const { email, password } = body;

            if (email === TEST_USER.email && password === TEST_USER.password) {
                return ok({
                    token: uuidv4()
                });
            } else {
                return error("Username or password is incorrect");
            }
        }

        function updateCase(body: any) {
            const { item, id } = body;

            const indexOf = mockData.findIndex(data => data.id === id);
            mockData[indexOf].user = {
                ...mockData[indexOf].user,
                ...item
            };

            return ok({});
        }

        function cases() {
            return ok(mockData);
        }

        function ok(body: {}) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }
    }
}
