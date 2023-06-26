// tslint:disable-next-line:interface-name
export interface ApiError {
  causes: RuleViolationCause[] | null;
  message: string;
  error_code: number;
  detail: string;
  name: string;
}

// tslint:disable-next-line:interface-name
export interface RuleViolationCause {
  description: string;
  context: string | null;
}
