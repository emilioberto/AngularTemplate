import { Injectable } from '@angular/core';

import { BaseHttpService } from '@app/core/services/base-http.service';

@Injectable()
export class BaseService {

  public constructor(protected http: BaseHttpService, protected apiPath: string) { }

}
