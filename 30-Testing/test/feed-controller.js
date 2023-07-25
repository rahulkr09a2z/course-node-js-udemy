const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const FeedController = require("../controllers/feed");

describe("Feed Controller", function () {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://rMongoCluster0:DhF78EmsKgBLNsKw@cluster0.gkvqbxw.mongodb.net/test-messages"
      )
      .then(() => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "64bb91b54930a20c3a3e0aed",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  it("should add a created post to the posts of the creator ", function (done) {
    const req = {
      body: {
        title: "Test Post",
        content: "A Test Post",
      },
      file: {
        path: "abc",
      },
      userId: "64bb91b54930a20c3a3e0aed",
    };

    const res = {
      status:function(){
        return this;
      },
      json: function(){}
    }

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
