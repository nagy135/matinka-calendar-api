import {Path, GET, POST, DELETE, PathParam} from "typescript-rest";
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
    async login(data: any): Promise<{ data: any }> {
        const { email, password } = data
        console.log(password);
        const encrypted = Buffer.from(password).toString('base64');
        console.log(encrypted);
        const decrypted = Buffer.from(encrypted, 'base64').toString('ascii');
        console.log(decrypted);
        // console.log(encrypted);
        // const userRepository = getConnection().getRepository(User)
        // console.log(email,password);
        // // const loggedUser = await userRepository.find({
        // //     where: {
                
        // //     }
        // // });
        return resOK({
            haha: 'all good'
        })
    }
}
