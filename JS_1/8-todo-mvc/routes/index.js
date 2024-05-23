import { homeGETController, userGetController,userDataGetController, userPostController,userPutController, userDeleteController } from "../controller/index.js"

let Router = {
    "/" : {
        GET : {
            "/" :  homeGETController
    }},

    "/user" : {
        GET :  {
            "/user" : userGetController,
            "/user/data" : userDataGetController

        },
        POST : {
            "/user/register" : userPostController
        },
        PUT : {
            "/user/update" : userPutController
        },
        DELETE : {
            "/user" : userDeleteController
        }
    }
}

export {Router}