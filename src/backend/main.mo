import Types "types/portfolio";
import PortfolioMixin "mixins/portfolio-api";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  let projects = Map.empty<Types.ProjectId, Types.Project>();
  var nextProjectId : Nat = 0;
  var profile : ?Types.Profile = null;
  let contacts = List.empty<Types.ContactSubmission>();
  var nextContactId : Nat = 0;

  include PortfolioMixin(projects, nextProjectId, profile, contacts, nextContactId);
};
