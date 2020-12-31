import {Path, GET, POST, DELETE, PathParam} from "typescript-rest";
import {resOK, resNOK} from "../helpers";
import {getConnection} from "typeorm";
import { User } from "../entity/User";
import { Record } from "../entity/Record";
import { Attendant } from "../entity/Attendant";

type TAttendant = {
    firstName: string,
    lastName: string,
    email: string,
    recordId: number
};

/**
 * REST handler for User entity
 */
@Path('/attendants')
class AttendantHandler {

    /**
     * counts all attendants
     */
    @Path('/count')
    @GET
    async countAll(): Promise<{}> {
        const attendantRepository = getConnection().getRepository(Attendant)
        const count = await attendantRepository.count();
        return resOK({
            count
        })
    }

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
    async store(data: TAttendant): Promise<{}> {
        const attendantRepository = getConnection().getRepository(Attendant)

        const attendant: Attendant = new Attendant();
        attendant.firstName = data.firstName;
        attendant.lastName = data.lastName;
        attendant.email = data.email;
        attendant.recordId = data.recordId;

        await attendantRepository.save(attendant);
        return resOK({
            message: 'saved successfully'
        })
    }

    /**
     * Deletes attendant by id
     * @param userId
     */
    @Path('/:attendantId')
    @DELETE
    async delete(
        @PathParam('attendantId') attendantId: number
    ): Promise<{}>{
        const attendantRepository = getConnection().getRepository(Attendant)
        const attendant = await attendantRepository.findOne(attendantId);
        if (!attendant)
            return resNOK(
                "Attendant not found"
            )
            attendantRepository.delete(attendant);
            return resOK({
                message: "deleted successfully"
            })
    }
}
