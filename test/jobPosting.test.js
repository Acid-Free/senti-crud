import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import JobPosting from "../server/models/jobPosting.js";
import server from "../server/app.js";

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

// Empties the selected DB after executing all tests
after((done) => {
  // Add error handling on callback function
  JobPosting.deleteMany({}, () => {});
  done();
});

describe("/Data fetching, insertion, and deletion", () => {
  it("should have 0 job posting in the beginning", (done) => {
    chai
      .request(server)
      .get("/api/job-postings/")
      .end((error, response) => {
        assert.equal(response.status, 200);
        assert.typeOf(response.body, "array");
        assert.lengthOf(response.body, 0);
        done();
      });
  });

  let newObjectId;

  it("should have 1 job posting after posting", (done) => {
    const jobPosting = {
      title: "Rocksta programma 5",
      description: "Looking for best programma",
      location: "World",
      salary: "999999",
      company: {
        name: "Best Company Name",
        website: "https://best-company-name.com",
      },
    };

    chai
      .request(server)
      .post("/api/job-postings/")
      .send(jobPosting)
      .end((error, response) => {
        assert.equal(response.status, 201);

        newObjectId = response.body._id;

        done();
      });
  });

  it("should update an existing job posting", (done) => {
    const newJobPosting = {
      title: "Rockstar Programmer",
      description: "Looking for the best programmer",
    };
    chai
      .request(server)
      .put(`/api/job-postings/${newObjectId}`)
      .send(newJobPosting)
      .end((error, response) => {
        assert.equal(response.status, 200);

        done();
      });
  });

  it("should delete a job posting", (done) => {
    chai
      .request(server)
      .delete(`/api/job-postings/${newObjectId}`)
      .end((error, response) => {
        assert.equal(response.status, 204);

        done();
      });
  });
});
