import {Path, GET, POST, DELETE, PathParam} from "typescript-rest";
import {resOK, resNOK} from "../helpers";
import {getConnection} from "typeorm";
import { Record } from "../entity/Record";

/**
 * REST handler for Record entity
 */
@Path('/records')
class RecordHandler {

    /**
     * counts number of records
     */
    @Path('/count')
    @GET
    async count(): Promise<{}> {
        const recordRepository = getConnection().getRepository(Record)
        const count = await recordRepository.count();
        return resOK({
            count
        })
    }
    
    /**
     * Returns list of all records
     */
    @GET
    async index(): Promise<{ data: any; }> {
        const recordRepository =  getConnection().getRepository(Record)
        const records = await recordRepository.find();
        return resOK({
            records
        });
    }

    /**
     * Returns specific record by given id
     * @param recordId 
     */
    @Path('/:recordId')
    @GET
    async get(
        @PathParam('recordId') recordId: number
    ): Promise<{}> {
        const recordRepository = getConnection().getRepository(Record)
        const record = await recordRepository.findOne(recordId);
        if (record)
            return resOK({
                record
            });
        else
            return resNOK(
                "Record not found"
            );
    }

    /**
     * Saves new record
     * @param record 
     */
    @POST
    async store(record: Record): Promise<{}> {
        const recordRepository = getConnection().getRepository(Record)
        await recordRepository.save(record);
        return resOK({
            message: 'saved successfully'
        })
    }

    /**
     * Deletes record
     * @param recordId
     */
    @Path('/:recordId')
    @DELETE
    async delete(
        @PathParam('recordId') recordId: number
    ): Promise<{}>{
        const recordRepository = getConnection().getRepository(Record)
        const record = await recordRepository.findOne(recordId);
        if (!record)
            return resNOK(
                "Record not found"
            )
        recordRepository.delete(record);
        return resOK({
            message: "Record deleted successfully"
        })
    }
}
