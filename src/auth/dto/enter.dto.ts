import { IsString, Length } from "class-validator";

export class EnterDto {
  @IsString()
  @Length(4, 255, {
    message: "username must be between 4 and 255 characters long",
  })
  username: string;

  @IsString()
  @Length(8, 16, { message: "the password must contain 8 to 16 characters" })
  password: string;
}
