import {Path, GET} from "typescript-rest";
import {resOK} from "../helpers";
import {version} from "../../package.json";

@Path('/')
class Health {
    
    @GET
    index(): {data: any} {
        return resOK({
            greeting: 'hello',
            version: version,
        });
    }
}
