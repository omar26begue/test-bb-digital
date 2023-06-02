import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { UsersDomain } from '@app/users/domain/users.domain';
import * as fs from 'fs';

const FILE_USERS = './public/users.json';

@Injectable()
export class UsersJsonAdapter implements UsersRepository {
    _readFile(): any {
        try {
            return JSON.parse(fs.readFileSync(FILE_USERS, { encoding: 'utf-8' }));
        } catch (e) {
            throw new BadRequestException('Recurso no disponible');
        }
    }

    _writeFile(users: UsersDomain[]): void {
        try {
            fs.writeFileSync(FILE_USERS, JSON.stringify(users), { encoding: 'utf-8' });
        } catch (e) {
            throw new BadRequestException('Recurso no disponible');
        }
    }

    /**
     * Busca un usuario dado su direccion de correo electronica
     * @param email Correo electronico
     */
    async findByEmail(email: string): Promise<UsersDomain> {
        const fileUsers: [] = this._readFile();
        const users: UsersDomain[] = fileUsers.filter((value) => value['email'] === email);

        if (users.length > 0) {
            const userDomain: UsersDomain = new UsersDomain();
            userDomain.id = users[0].id;
            userDomain.email = users[0].email;
            userDomain.rol = users[0].rol;
            userDomain.name = users[0].name;
            userDomain.password = users[0].password;
            userDomain.active = users[0].active;
            userDomain.created_at = users[0].created_at;
            userDomain.updated_at = users[0].updated_at;

            return userDomain;
        }

        return null;
    }

    /**
     * Devuelve todos los usuarios almacenados en el JSON
     */
    async getAll(): Promise<UsersDomain[]> {
        return this._readFile();
    }

    /**
     * Crea un usuario en el fichero JSON users.json
     * @param user
     */
    async create(user: UsersDomain): Promise<void> {
        const users: UsersDomain[] = await this.getAll();
        users.push(user);

        this._writeFile(users);
    }

    /**
     * Activa un usuario dado su identificador
     * @param id
     */
    async active(id: string): Promise<UsersDomain> {
        const fileUsers: UsersDomain[] = this._readFile();
        const index = fileUsers.findIndex((value) => value['id'] === id);

        fileUsers[0].active = true;
        fileUsers[0].updated_at = new Date();

        this._writeFile(fileUsers);

        return fileUsers[index];
    }
}
