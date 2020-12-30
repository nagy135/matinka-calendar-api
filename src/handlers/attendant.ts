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
            try {
            const attendantRepository = getConnection().getRepository(Attendant)
            const [attendants, attendantCount]: [Attendant[], number] = await attendantRepository.findAndCount({
                recordId: record.id
            });
            return resOK({
                attendantCount
            });
            } catch(e){
            return resNOK(
                "Record not found"
            );
            }
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
     * Returns specific attendant by given id
     * @param userId 
     */
    @Path('/:attendantId')
    @GET
    async get(
        @PathParam('attendantId') attendantId: number
    ): Promise<{}> {
        const attendantRepository = getConnection().getRepository(Attendant)
        const attendant = await attendantRepository.findOne(attendantId);
        if (attendant)
            return resOK({
                attendant
            });
        else
            return resNOK(
                "Attendant not found"
            );
    }

    /**
     * Saves new attendant to a room
     * @param user 
     */
    @POST
    async store(data: any): Promise<{}> {
        const attendantRepository = getConnection().getRepository(Attendant)

        const attendant: Attendant = new Attendant();
        attendant.userId = data.userId;
        attendant.recordId = data.recordId;

        await attendantRepository.save(attendant);
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
