import {Path, GET, POST, DELETE, PathParam} from "typescript-rest";
import {resOK, resNOK} from "../helpers";
import {getConnection} from "typeorm";
import { User } from "../entity/User";
import { Record } from "../entity/Record";
import { Attendant } from "../entity/Attendant";

/**
 * REST handler for User entity
 */
@Path('/attendants')
class AttendantHandler {

    /**
     * counts number of attendants of record
     */
    @Path('/:recordId/count')
    @GET
    async count(
        @PathParam('recordId') recordId: number
    ): Promise<{}> {
        const recordRepository = getConnection().getRepository(Record)
        const record: Record | undefined = await recordRepository.findOne({
            id: recordId
        });
        if (record){
            const attendantRepository = getConnection().getRepository(Attendant)
            const [attendants, attendantCount]: [Attendant[], number] = await attendantRepository.findAndCount({
                recordId: record.id
            });
            console.log(attendants);
            return resOK({
                attendantCount
            });
        } else
            return resNOK(
                "Record not found"
            );
    }
    
    /**
     * Returns list of all attendants
     */
    @GET
    async index(): Promise<{ data: any; }> {
        const attendantRepository =  getConnection().getRepository(Attendant)
        const attendants = await attendantRepository.find();
        return resOK({
            attendants
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
     * Saves new user encrypting his password
     * @param user 
     */
    @POST
    async store(data: any): Promise<{}> {
        const userRepository = getConnection().getRepository(User)

        const user: User = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.password = Buffer.from(data.password).toString('base64');

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
