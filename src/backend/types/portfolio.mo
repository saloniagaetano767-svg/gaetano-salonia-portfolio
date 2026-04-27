import Common "common";

module {
  public type ProjectId = Common.ProjectId;
  public type Timestamp = Common.Timestamp;

  public type Project = {
    id : ProjectId;
    title : Text;
    description : Text;
    techStack : [Text];
    imageUrl : Text;
    liveUrl : ?Text;
    githubUrl : ?Text;
    category : Text;
    featured : Bool;
  };

  public type Profile = {
    name : Text;
    title : Text;
    bio : Text;
    skills : [Text];
    socialLinks : [SocialLink];
  };

  public type SocialLink = {
    platform : Text;
    url : Text;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Timestamp;
  };
};
