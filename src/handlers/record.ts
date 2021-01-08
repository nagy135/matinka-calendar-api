import {Path, GET, POST, DELETE, PATCH, PathParam, QueryParam} from "typescript-rest";
import {resOK, resNOK} from "../helpers";
import { getConnection, MoreThanOrEqual} from "typeorm";
import { Record } from "../entity/Record";
import { format } from "date-fns";

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
     * gets record by its date attribute
     */
    @Path('/find-by-date')
    @GET
    async findByDate(@QueryParam('date') date: string): Promise<{}> {
        const recordRepository = getConnection().getRepository(Record)
        const record = await recordRepository.findOne({
            where: {
                date
            }
        });
        if (record)
            return resOK({
                record
            });
        else
            return resNOK('record not found');

    }


    /**
     * Returns list of all records
     */
    @GET
    async index(): Promise<{ data: any; }> {
        const recordRepository =  getConnection().getRepository(Record)
        const records = await recordRepository.find({
            where: {
                date: MoreThanOrEqual(format(new Date(), 'yyyy-MM-dd'))
            }
        });

        console.log(records);
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
     * Returns attendants for record
     * @param recordId 
     */
    @Path('/:recordId/attendants')
    @GET
    async attendants(
        @PathParam('recordId') recordId: number
    ): Promise<{}> {
        const recordRepository = getConnection().getRepository(Record)
        const record = await recordRepository.findOne(
            recordId,
            {
                relations: ["attendants"]
            }
        );
        if (record)
            return resOK({
                attendants: record.attendants
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
