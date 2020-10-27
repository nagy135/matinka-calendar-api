import {Errors, Path, GET, POST, DELETE, PathParam} from "typescript-rest";
import {resOK, resNOK} from "../helpers";
import {getConnection} from "typeorm";
import { User } from "../entity/User";

/**
 * REST handler for User entity
 */
@Path('/login')
class LoginHandler {

    /**
     * counts number of users
     */
    @POST
    async login(data: any): Promise<{}> {
        const { email, password } = data
        const encrypted = Buffer.from(password).toString('base64');
        const userRepository = getConnection().getRepository(User)
        const loggedUser = await userRepository.findOne({
            where: {
                email,
                password: encrypted
            }
        });
        if (loggedUser)
            return resOK({
                loggedUser
            });
        else
            return resNOK('all bad');
    }
}
