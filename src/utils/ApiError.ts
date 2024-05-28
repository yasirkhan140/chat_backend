class ApiError {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;
  errors: any;
  stack: any;
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any = [],
    stack: string = ""
  ) {
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      this.stack = "";
    }
  }
}

export { ApiError };
