import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EnterDto {
  @ApiProperty({ example: "john.doe", description: "User's username" })
  @IsString()
  @Length(4, 255, {
    message: "username must be between 4 and 255 characters long",
  })
  username: string;

  // TODO: need a better password validation (with special ch. etc.)
  @ApiProperty({ example: "password1234", description: "User's password" })
  @IsString()
  @Length(8, 16, { message: "the password must contain 8 to 16 characters" })
  password: string;
}
