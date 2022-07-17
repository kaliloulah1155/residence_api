import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import  {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiParam
} from '@nestjs/swagger';

@ApiTags('Utilisateurs')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiOperation({summary:"Creation d'un utilisateur"})
  @ApiResponse({
    status:201,
    description:'Succès'
  })
  @ApiResponse({
    status:403,
    description:'Non autorisé'
  })
  @ApiResponse({
    status:500,
    description:'Erreur sur le serveur'
  })
  /*@ApiParam({
    name:'id',
    type:'integer',
    description:"Identifiant unique",
    required:true
  })*/

  @ApiBody({
    schema:{
      type:'object',
      properties:{
        id:{
          type:'integer',
          example:5,
          description:'Un identifiant unique'
        },
        name:{
          type:'string',
          example:'azerty',
          description:"Nom de l'utilisateur"
        }
      }
    }
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
