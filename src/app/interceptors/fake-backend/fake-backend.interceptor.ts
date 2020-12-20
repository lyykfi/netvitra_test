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

        function ok(body: {}) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }
    }
}