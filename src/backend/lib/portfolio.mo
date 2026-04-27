import Types "../types/portfolio";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

module {
  public func addProject(
    projects : Map.Map<Types.ProjectId, Types.Project>,
    nextId : Nat,
    project : { title : Text; description : Text; techStack : [Text]; imageUrl : Text; liveUrl : ?Text; githubUrl : ?Text; category : Text; featured : Bool },
  ) : Types.ProjectId {
    Runtime.trap("not implemented");
  };

  public func getProject(
    projects : Map.Map<Types.ProjectId, Types.Project>,
    id : Types.ProjectId,
  ) : ?Types.Project {
    Runtime.trap("not implemented");
  };

  public func getAllProjects(
    projects : Map.Map<Types.ProjectId, Types.Project>
  ) : [Types.Project] {
    Runtime.trap("not implemented");
  };

  public func getFeaturedProjects(
    projects : Map.Map<Types.ProjectId, Types.Project>
  ) : [Types.Project] {
    Runtime.trap("not implemented");
  };

  public func updateProject(
    projects : Map.Map<Types.ProjectId, Types.Project>,
    project : Types.Project,
  ) : Bool {
    Runtime.trap("not implemented");
  };

  public func deleteProject(
    projects : Map.Map<Types.ProjectId, Types.Project>,
    id : Types.ProjectId,
  ) : Bool {
    Runtime.trap("not implemented");
  };

  public func getProfile(
    profile : ?Types.Profile
  ) : ?Types.Profile {
    Runtime.trap("not implemented");
  };

  public func setProfile(
    newProfile : Types.Profile
  ) : Types.Profile {
    Runtime.trap("not implemented");
  };

  public func submitContact(
    contacts : List.List<Types.ContactSubmission>,
    nextId : Nat,
    name : Text,
    email : Text,
    message : Text,
  ) : Types.ContactSubmission {
    Runtime.trap("not implemented");
  };

  public func getContactSubmissions(
    contacts : List.List<Types.ContactSubmission>
  ) : [Types.ContactSubmission] {
    Runtime.trap("not implemented");
  };
};
