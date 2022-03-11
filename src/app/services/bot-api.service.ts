import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BoardDetails } from "../models/board";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { VerificationData } from "../models/bot";

@Injectable({
  providedIn: 'root'
})
export class BotApiService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  verify(data: VerificationData): Observable<void> {
    return this.httpClient.patch<void>(environment.apiEndpoint + 'bot/verify', data);
  }
}
