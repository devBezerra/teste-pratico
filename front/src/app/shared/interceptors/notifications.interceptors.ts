import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export const notificationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && ['POST', 'PATCH', 'DELETE'].includes(req.method)) {
        messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: event.body.message,
          life: 3000,
        });
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      const detail = error?.error?.message || 'Erro inesperado.';

      messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail,
        life: 5000,
      });

      return throwError(() => error);
    })
  );
};
