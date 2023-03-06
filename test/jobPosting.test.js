import * as chai from "chai";
import chaiHttp from "chai-http";
import JobPosting from "../server/models/jobPosting.js";
import server from "../server/app.js";

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("/Data fetching and insertion", () => {});

describe("/Data deletion", () => {});
