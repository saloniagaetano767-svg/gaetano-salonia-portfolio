import Types "../types/portfolio";
import PortfolioLib "../lib/portfolio";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  projects : Map.Map<Types.ProjectId, Types.Project>,
  nextProjectId : Nat,
  profile : ?Types.Profile,
  contacts : List.List<Types.ContactSubmission>,
  nextContactId : Nat,
) {
  // --- Projects ---

  public query func getProject(id : Types.ProjectId) : async ?Types.Project {
    Runtime.trap("not implemented");
  };

  public query func getAllProjects() : async [Types.Project] {
    Runtime.trap("not implemented");
  };

  public query func getFeaturedProjects() : async [Types.Project] {
    Runtime.trap("not implemented");
  };

  public func addProject(
    title : Text,
    description : Text,
    techStack : [Text],
    imageUrl : Text,
    liveUrl : ?Text,
    githubUrl : ?Text,
    category : Text,
    featured : Bool,
  ) : async Types.ProjectId {
    Runtime.trap("not implemented");
  };

  public func updateProject(project : Types.Project) : async Bool {
    Runtime.trap("not implemented");
  };

  public func deleteProject(id : Types.ProjectId) : async Bool {
    Runtime.trap("not implemented");
  };

  // --- Profile ---

  public query func getProfile() : async ?Types.Profile {
    Runtime.trap("not implemented");
  };

  public func setProfile(newProfile : Types.Profile) : async () {
    Runtime.trap("not implemented");
  };

  // --- Contact ---

  public func submitContact(name : Text, email : Text, message : Text) : async Nat {
    Runtime.trap("not implemented");
  };

  public query func getContactSubmissions() : async [Types.ContactSubmission] {
    Runtime.trap("not implemented");
  };
};
