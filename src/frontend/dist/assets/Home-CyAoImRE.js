var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a, _client2, _currentResult2, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn2, _b;
import { P as ProtocolError, T as TimeoutWaitingForResponseErrorCode, u as utf8ToBytes, E as ExternalError, M as MissingRootKeyErrorCode, C as Certificate, l as lookupResultToBuffer, R as RequestStatusResponseStatus, U as UnknownError, a as RequestStatusDoneNoReplyErrorCode, b as RejectError, c as CertifiedRejectErrorCode, d as UNREACHABLE_ERROR, I as InputError, e as InvalidReadStateRequestErrorCode, f as ReadRequestType, g as Principal, h as IDL, i as MissingCanisterIdErrorCode, H as HttpAgent, j as encode, Q as QueryResponseStatus, k as UncertifiedRejectErrorCode, m as isV3ResponseBody, n as isV2ResponseBody, o as UncertifiedRejectUpdateErrorCode, p as UnexpectedErrorCode, q as decode, S as Subscribable, r as pendingThenable, s as resolveEnabled, t as shallowEqualObjects, v as resolveStaleTime, w as noop, x as environmentManager, y as isValidTimeout, z as timeUntilStale, A as timeoutManager, B as focusManager, D as fetchState, F as replaceData, G as notifyManager, J as hashKey, K as getDefaultState, L as reactExports, N as shouldThrowError, O as useQueryClient, V as useInternetIdentity, W as createActorWithConfig, X as jsxRuntimeExports, Y as useTranslation, Z as motion, _ as usePrefersReducedMotion, $ as useMouseParallax, a0 as Record, a1 as Vec, a2 as Opt, a3 as Service, a4 as Func, a5 as Nat, a6 as Text, a7 as Bool, a8 as Int, a9 as CONTACT_EMAIL, aa as FOCUS_RING, ab as useJourneyScroll, ac as SURFACE_SCROLL_START } from "./index-Du2rLgTg.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var MutationObserver = (_b = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client2);
    __privateAdd(this, _currentResult2);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client2, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client2).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client2).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult2);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client2).getMutationCache().build(__privateGet(this, _client2), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client2 = new WeakMap(), _currentResult2 = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult2, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn2 = function(action) {
  notifyManager.batch(() => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult2).variables;
      const onMutateResult = __privateGet(this, _currentResult2).context;
      const context = {
        client: __privateGet(this, _client2),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b2 = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b2.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult2));
    });
  });
}, _b);
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b2, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b2 = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b2.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
function GlassCard({ children, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `ocean-glass rounded-2xl backdrop-blur-xl ${className}`,
      children
    }
  );
}
function JourneyStation({
  id,
  children,
  className = "",
  compact,
  diveEntry
}) {
  const heightClass = compact ? "min-h-[90vh]" : "min-h-screen";
  const paddingClass = diveEntry ? "pt-24 sm:pt-28 pb-20 sm:pb-24" : compact ? "py-20 sm:py-24" : "py-24 sm:py-28";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id,
      className: `relative flex items-center justify-center px-[var(--section-px)] ${heightClass} ${paddingClass} ${className}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[1080px] mx-auto", children })
    }
  );
}
function InfoRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 mb-4 border-b border-white/8 last:mb-0 last:pb-0 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-[var(--ocean-text-dim)] tracking-[0.14em] uppercase mb-1.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--ocean-text)] font-medium", children: value })
  ] });
}
function JourneyAbout() {
  const { t } = useTranslation();
  const infoRows = [
    { label: t.about.fields.location, value: t.about.location },
    { label: t.about.fields.company, value: t.about.company },
    { label: t.about.fields.status, value: t.about.status },
    { label: t.about.fields.languages, value: t.about.languages },
    { label: t.about.fields.apprenticeship, value: t.about.apprenticeship }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyStation, { id: "about", diveEntry: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-10%" },
      transition: { duration: 0.75 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "journey-eyebrow", children: t.about.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "journey-title", children: [
          t.about.titleLight,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "journey-title-accent", children: t.about.titleAccent })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-[var(--section-gap)] items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-6 sm:p-7 order-2 lg:order-1", children: infoRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: row.label, value: row.value }, row.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 order-1 lg:order-2", children: [t.about.p1, t.about.p2, t.about.p3, t.about.p4].map(
            (paragraph, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: i * 0.06 },
                className: "text-[15px] text-[var(--ocean-text-muted)] leading-[1.75]",
                children: paragraph
              },
              paragraph.slice(0, 20)
            )
          ) })
        ] })
      ]
    }
  ) });
}
const HORIZON_SRC = "/assets/images/avatar_light.png";
const FALLBACK_SRC = "/assets/images/placeholder.svg";
function AvatarPortrait({ variant = "horizon" }) {
  const reducedMotion = usePrefersReducedMotion();
  const [src, setSrc] = reactExports.useState(HORIZON_SRC);
  const { ref, transform } = useMouseParallax({
    enabled: !reducedMotion,
    maxTilt: variant === "horizon" ? 5 : 6
  });
  reactExports.useEffect(() => {
    setSrc(HORIZON_SRC);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "group relative w-full transition-transform duration-200 ease-out",
      style: { transform },
      "data-ocid": "avatar.portrait",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-3 rounded-2xl bg-gradient-to-br from-[var(--ocean-sunset)]/25 to-[var(--ocean-teal)]/15 blur-xl opacity-70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.4)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src,
              alt: "Portrait of Gaetano Salonia",
              className: "relative z-10 w-full h-full object-cover object-[center_15%]",
              width: 480,
              height: 600,
              loading: "lazy",
              decoding: "async",
              onError: () => setSrc(FALLBACK_SRC)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none z-[5]",
              style: {
                background: "linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 45%)"
              },
              "aria-hidden": true
            }
          )
        ] })
      ]
    }
  );
}
const ProjectId = Nat;
const Project = Record({
  "id": ProjectId,
  "title": Text,
  "featured": Bool,
  "description": Text,
  "githubUrl": Opt(Text),
  "imageUrl": Text,
  "category": Text,
  "liveUrl": Opt(Text),
  "techStack": Vec(Text)
});
const Timestamp = Int;
const ContactSubmission = Record({
  "id": Nat,
  "name": Text,
  "email": Text,
  "message": Text,
  "timestamp": Timestamp
});
const SocialLink = Record({
  "url": Text,
  "platform": Text
});
const Profile = Record({
  "bio": Text,
  "title": Text,
  "socialLinks": Vec(SocialLink),
  "name": Text,
  "skills": Vec(Text)
});
Service({
  "addProject": Func(
    [
      Text,
      Text,
      Vec(Text),
      Text,
      Opt(Text),
      Opt(Text),
      Text,
      Bool
    ],
    [ProjectId],
    []
  ),
  "deleteProject": Func([ProjectId], [Bool], []),
  "getAllProjects": Func([], [Vec(Project)], ["query"]),
  "getContactSubmissions": Func(
    [],
    [Vec(ContactSubmission)],
    ["query"]
  ),
  "getFeaturedProjects": Func([], [Vec(Project)], ["query"]),
  "getProfile": Func([], [Opt(Profile)], ["query"]),
  "getProject": Func([ProjectId], [Opt(Project)], ["query"]),
  "setProfile": Func([Profile], [], []),
  "submitContact": Func([Text, Text, Text], [Nat], []),
  "updateProject": Func([Project], [Bool], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const ProjectId2 = IDL2.Nat;
  const Project2 = IDL2.Record({
    "id": ProjectId2,
    "title": IDL2.Text,
    "featured": IDL2.Bool,
    "description": IDL2.Text,
    "githubUrl": IDL2.Opt(IDL2.Text),
    "imageUrl": IDL2.Text,
    "category": IDL2.Text,
    "liveUrl": IDL2.Opt(IDL2.Text),
    "techStack": IDL2.Vec(IDL2.Text)
  });
  const Timestamp2 = IDL2.Int;
  const ContactSubmission2 = IDL2.Record({
    "id": IDL2.Nat,
    "name": IDL2.Text,
    "email": IDL2.Text,
    "message": IDL2.Text,
    "timestamp": Timestamp2
  });
  const SocialLink2 = IDL2.Record({ "url": IDL2.Text, "platform": IDL2.Text });
  const Profile2 = IDL2.Record({
    "bio": IDL2.Text,
    "title": IDL2.Text,
    "socialLinks": IDL2.Vec(SocialLink2),
    "name": IDL2.Text,
    "skills": IDL2.Vec(IDL2.Text)
  });
  return IDL2.Service({
    "addProject": IDL2.Func(
      [
        IDL2.Text,
        IDL2.Text,
        IDL2.Vec(IDL2.Text),
        IDL2.Text,
        IDL2.Opt(IDL2.Text),
        IDL2.Opt(IDL2.Text),
        IDL2.Text,
        IDL2.Bool
      ],
      [ProjectId2],
      []
    ),
    "deleteProject": IDL2.Func([ProjectId2], [IDL2.Bool], []),
    "getAllProjects": IDL2.Func([], [IDL2.Vec(Project2)], ["query"]),
    "getContactSubmissions": IDL2.Func(
      [],
      [IDL2.Vec(ContactSubmission2)],
      ["query"]
    ),
    "getFeaturedProjects": IDL2.Func([], [IDL2.Vec(Project2)], ["query"]),
    "getProfile": IDL2.Func([], [IDL2.Opt(Profile2)], ["query"]),
    "getProject": IDL2.Func([ProjectId2], [IDL2.Opt(Project2)], ["query"]),
    "setProfile": IDL2.Func([Profile2], [], []),
    "submitContact": IDL2.Func([IDL2.Text, IDL2.Text, IDL2.Text], [IDL2.Nat], []),
    "updateProject": IDL2.Func([Project2], [IDL2.Bool], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async addProject(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    if (this.processError) {
      try {
        const result = await this.actor.addProject(arg0, arg1, arg2, arg3, to_candid_opt_n1(this._uploadFile, this._downloadFile, arg4), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg5), arg6, arg7);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addProject(arg0, arg1, arg2, arg3, to_candid_opt_n1(this._uploadFile, this._downloadFile, arg4), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg5), arg6, arg7);
      return result;
    }
  }
  async deleteProject(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteProject(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteProject(arg0);
      return result;
    }
  }
  async getAllProjects() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllProjects();
        return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllProjects();
      return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async getContactSubmissions() {
    if (this.processError) {
      try {
        const result = await this.actor.getContactSubmissions();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getContactSubmissions();
      return result;
    }
  }
  async getFeaturedProjects() {
    if (this.processError) {
      try {
        const result = await this.actor.getFeaturedProjects();
        return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFeaturedProjects();
      return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getProfile();
        return from_candid_opt_n6(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProfile();
      return from_candid_opt_n6(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProject(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProject(arg0);
        return from_candid_opt_n7(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProject(arg0);
      return from_candid_opt_n7(this._uploadFile, this._downloadFile, result);
    }
  }
  async setProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setProfile(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setProfile(arg0);
      return result;
    }
  }
  async submitContact(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.submitContact(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitContact(arg0, arg1, arg2);
      return result;
    }
  }
  async updateProject(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updateProject(to_candid_Project_n8(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateProject(to_candid_Project_n8(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
}
function from_candid_Project_n3(_uploadFile, _downloadFile, value) {
  return from_candid_record_n4(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n5(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Project_n3(_uploadFile, _downloadFile, value[0]);
}
function from_candid_record_n4(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    featured: value.featured,
    description: value.description,
    githubUrl: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.githubUrl)),
    imageUrl: value.imageUrl,
    category: value.category,
    liveUrl: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.liveUrl)),
    techStack: value.techStack
  };
}
function from_candid_vec_n2(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Project_n3(_uploadFile, _downloadFile, x));
}
function to_candid_Project_n8(_uploadFile, _downloadFile, value) {
  return to_candid_record_n9(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_record_n9(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    featured: value.featured,
    description: value.description,
    githubUrl: value.githubUrl ? candid_some(value.githubUrl) : candid_none(),
    imageUrl: value.imageUrl,
    category: value.category,
    liveUrl: value.liveUrl ? candid_some(value.liveUrl) : candid_none(),
    techStack: value.techStack
  };
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
async function submitPortfolioContactViaForm(data) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _subject: `Portfolio contact: ${data.name}`,
      _replyto: data.email,
      _captcha: "false"
    })
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      text.trim() || "Could not send — please email me directly using the address on this page."
    );
  }
}
function useContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (actor)
        return actor.submitContact(data.name, data.email, data.message);
      await submitPortfolioContactViaForm(data);
      return void 0;
    }
  });
}
const inputClass = `w-full rounded-xl px-4 py-3.5 text-base text-[var(--ocean-text)] bg-white/5 border border-white/10 outline-none focus:border-[var(--ocean-sunset)]/40 transition-colors placeholder:text-[var(--ocean-text-dim)] ${FOCUS_RING}`;
function JourneyContact() {
  const { t } = useTranslation();
  const formId = reactExports.useId();
  const { mutate, isPending, isSuccess, isError, error } = useContact();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const [touched, setTouched] = reactExports.useState({
    name: false,
    email: false,
    message: false
  });
  const errors = {
    name: touched.name && !form.name.trim() ? t.contact.nameError : null,
    email: touched.email && !form.email.trim() ? t.contact.emailError : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? t.contact.emailInvalid : null,
    message: touched.message && !form.message.trim() ? t.contact.messageError : null
  };
  const isFormValid = form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.trim();
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isFormValid) return;
    mutate(form);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyStation, { id: "contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 48 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-10%" },
      transition: { duration: 0.85 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "journey-eyebrow", children: t.contact.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "journey-title !mb-4", children: [
          t.contact.titleLight,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "journey-title-accent", children: t.contact.titleAccent })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "journey-lead", children: t.contact.sub }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[minmax(240px,300px)_1fr] gap-[var(--section-gap)] lg:gap-16 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.94 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.8, delay: 0.1 },
              className: "mx-auto lg:mx-0 w-full max-w-xs",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarPortrait, { variant: "horizon" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-6 sm:p-8", children: isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs("output", { className: "block text-center py-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-[var(--ocean-text)] mb-3", children: t.contact.successTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[var(--ocean-text-muted)]", children: t.contact.successMessage })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              id: formId,
              onSubmit: handleSubmit,
              noValidate: true,
              className: "flex flex-col gap-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `${formId}-name`, className: "sr-only", children: t.contact.namePlaceholder }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `${formId}-name`,
                      type: "text",
                      name: "name",
                      autoComplete: "name",
                      placeholder: t.contact.namePlaceholder,
                      value: form.name,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      "aria-invalid": errors.name ? true : void 0,
                      className: inputClass
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-1", role: "alert", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `${formId}-email`, className: "sr-only", children: t.contact.emailPlaceholder }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `${formId}-email`,
                      type: "email",
                      name: "email",
                      autoComplete: "email",
                      placeholder: t.contact.emailPlaceholder,
                      value: form.email,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      "aria-invalid": errors.email ? true : void 0,
                      className: inputClass
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-1", role: "alert", children: errors.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `${formId}-message`, className: "sr-only", children: t.contact.messagePlaceholder }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: `${formId}-message`,
                      name: "message",
                      rows: 5,
                      placeholder: t.contact.messagePlaceholder,
                      value: form.message,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      "aria-invalid": errors.message ? true : void 0,
                      className: `${inputClass} resize-none`
                    }
                  ),
                  errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-1", role: "alert", children: errors.message })
                ] }),
                isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3",
                    role: "alert",
                    children: (error == null ? void 0 : error.message) ?? t.contact.errorFallback
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isPending,
                    className: `self-start font-semibold text-sm px-7 py-3 min-h-11 rounded-full bg-[var(--ocean-sunset)] text-[#1a1208] hover:bg-[var(--ocean-sunset-bright)] transition-colors disabled:opacity-50 ${FOCUS_RING}`,
                    children: isPending ? t.contact.sending : t.contact.send
                  }
                )
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-20 pt-8 border-t border-white/6 text-center font-mono text-[10px] text-[var(--ocean-text-dim)] tracking-wider", children: [
          t.footer.copy,
          " · ",
          t.footer.rights
        ] })
      ]
    }
  ) });
}
function JourneyIntro() {
  const { t } = useTranslation();
  const { experienceReady, introProgress } = useJourneyScroll();
  const hintOpacity = introProgress < SURFACE_SCROLL_START ? 1 : Math.max(0, 1 - (introProgress - SURFACE_SCROLL_START) * 1.6);
  const contentFade = Math.max(0.35, 1 - introProgress * 0.6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    JourneyStation,
    {
      id: "intro",
      className: "!min-h-0 !py-0 !items-stretch !justify-start",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[270dvh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 h-[100dvh] flex flex-col px-[var(--section-px)] pt-[calc(var(--ocean-nav-height)+1.5rem)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 flex items-center justify-center",
            style: { opacity: contentFade },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center w-full max-w-xl mx-auto space-y-6", children: experienceReady && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.15 },
                  className: "journey-eyebrow !mb-0 !text-white/55 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]",
                  children: t.intro.greeting
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.h1,
                {
                  initial: { opacity: 0, y: 28 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.3 },
                  className: "font-display font-extrabold text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.95] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5),0_0_60px_rgba(6,16,24,0.35)]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mb-1", children: t.intro.nameLine1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[var(--ocean-sunset-bright)]", children: t.intro.nameLine2 })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.5 },
                  className: "text-base sm:text-lg text-white/75 max-w-md mx-auto leading-relaxed [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]",
                  children: t.intro.tagline
                }
              )
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: experienceReady ? hintOpacity : 0 },
            transition: { duration: 0.6 },
            className: "shrink-0 pb-[12vh] sm:pb-[11vh] flex flex-col items-center gap-4",
            style: { opacity: experienceReady ? hintOpacity : 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]", children: t.intro.scrollHint }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-12 bg-gradient-to-b from-white/45 to-transparent animate-pulse" })
            ]
          }
        )
      ] }) })
    }
  );
}
function BuoyCard({ item, index }) {
  const isCurrent = item.phase === "current";
  const isFuture = item.phase === "future";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 32, x: index % 2 === 0 ? -12 : 12 },
      whileInView: { opacity: 1, y: 0, x: 0 },
      viewport: { once: true, margin: "-8%" },
      transition: { duration: 0.65, delay: index * 0.08 },
      className: `relative ${index % 2 === 0 ? "md:mr-auto md:max-w-[480px]" : "md:ml-auto md:max-w-[480px]"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute -top-3 ${index % 2 === 0 ? "left-6" : "right-6"} w-3 h-3 rounded-full ${isCurrent ? "bg-[var(--ocean-sunset)] shadow-[0_0_12px_var(--ocean-sunset)]" : isFuture ? "border-2 border-dashed border-[var(--ocean-teal)]/50 bg-transparent" : "bg-[var(--ocean-teal-dim)]"}`,
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            className: `p-6 sm:p-7 ${isFuture ? "border-dashed border-[var(--ocean-teal)]/20" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-[var(--ocean-text)]", children: item.role }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[var(--ocean-sunset)] font-semibold", children: [
                  "@ ",
                  item.company
                ] }),
                item.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--ocean-teal)]/25 text-[var(--ocean-teal)]", children: item.badge })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-[var(--ocean-text-dim)] tracking-wider mb-3", children: item.period }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--ocean-text-muted)] leading-[1.7]", children: item.description })
            ]
          }
        )
      ]
    }
  );
}
function JourneyMilestones() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyStation, { id: "milestones", compact: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 36 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.7 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "journey-eyebrow", children: t.milestones.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "journey-title", children: [
          t.milestones.titleLight,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "journey-title-accent", children: t.milestones.titleAccent })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10 md:space-y-12", children: t.journey.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BuoyCard, { item, index: i }, item.role)) })
      ]
    }
  ) });
}
function JourneySkills() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyStation, { id: "skills", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-10%" },
      transition: { duration: 0.75 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "journey-eyebrow", children: t.services.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "journey-title !mb-4", children: [
          t.services.titleLight,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "journey-title-accent", children: t.services.titleAccent })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "journey-lead", children: t.services.sub }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: t.services.categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 28 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55, delay: i * 0.07 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 sm:p-7 hover:border-[var(--ocean-sunset)]/20 transition-colors duration-300 h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-[var(--ocean-text-dim)] tracking-wider uppercase mb-2", children: t.services.cardLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-[var(--ocean-text)] mb-5", children: cat.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-2", children: cat.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "li",
                {
                  className: "font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-[var(--ocean-text-muted)]",
                  children: item
                },
                item
              )) })
            ] })
          },
          cat.title
        )) })
      ]
    }
  ) });
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.journey", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyIntro, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyAbout, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JourneySkills, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyMilestones, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyContact, {})
  ] });
}
export {
  Home as default
};
