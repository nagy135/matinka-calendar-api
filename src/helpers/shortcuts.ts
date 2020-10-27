import {Errors} from "typescript-rest";

export const resOK = (data: object) => ({
    status: 'ok',
    data
});

export const resNOK = (message: string) => {
    throw new Errors.BadRequestError(message);
};
