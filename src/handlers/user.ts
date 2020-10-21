import {Path, GET, POST, DELETE, PathParam} from "typescript-rest";
import {resOK, resNOK} from "../helpers";
import {getConnection} from "typeorm";
import { User } from "../entity/User";

/**
 * REST handler for User entity
 */
@Path('/users')
class UserHandler {

    /**
     * counts number of users
     */
    @Path('/count')
    @GET
    async count(): Promise<{}> {
        const userRepository = getConnection().getRepository(User)
        const count = await userRepository.count();
        return resOK({
            count
        })
    }
    
    /**
     * Returns list of all users
     */
    @GET
    async index(): Promise<{ data: any; }> {
        const userRepository =  getConnection().getRepository(User)
        const users = await userRepository.find();
        return resOK({
            users
        });
    }

    /**
     * Returns specific user by given id
     * @param userId 
     */
    @Path('/:userId')
    @GET
    async get(
        @PathParam('userId') userId: number
    ): Promise<{}> {
        const userRepository = getConnection().getRepository(User)
        const user = await userRepository.findOne(userId);
        if (user)
            return resOK({
                user
            });
        else
            return resNOK(
                "User not found"
            );
    }

    /**
     * Saves new user
     * @param user 
     */
    @POST
    async store(user: User): Promise<{}> {
        const userRepository = getConnection().getRepository(User)
        await userRepository.save(user);
        return resOK({
            message: 'saved successfully'
        })
    }

    /**
     * Deleted user
     * @param userId
     */
    @Path('/:userId')
    @DELETE
    async delete(
        @PathParam('userId') userId: number
    ): Promise<{}>{
        const userRepository = getConnection().getRepository(User)
        const user = await userRepository.findOne(userId);
        if (!user)
            return resNOK(
                "User not found"
            )
        userRepository.delete(user);
        return resOK({
            message: "deleted successfully"
        })
    }
}