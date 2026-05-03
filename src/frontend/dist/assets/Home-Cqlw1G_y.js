var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { S as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, n as notifyManager, u as useQueryClient, r as reactExports, a as noop, b as shouldThrowError, c as createLucideIcon, j as jsxRuntimeExports, d as Skeleton, e as cn, f as createSlot, D as Download, B as Button, M as Mail, L as Link, G as Github } from "./index-mRDVAQWc.js";
import { u as useProfile, a as useActor, c as createActor, B as Badge, E as ExternalLink, b as useFeaturedProjects, S as SAMPLE_PROJECTS } from "./badge-D89uCdfC.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
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
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
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
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
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
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
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
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -60px 0px",
    once = true
  } = options;
  const ref = reactExports.useRef(null);
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
  return { ref, isVisible };
}
function useStaggeredAnimation(count, baseDelay = 0.1) {
  return Array.from({ length: count }, (_, i) => ({
    style: {
      transitionDelay: `${baseDelay * i}s`
    }
  }));
}
const FALLBACK_PROFILE = {
  name: "Gaetano Salonia",
  title: "Computer Science EFZ · Application Development · Switzerland",
  bio: "I am a motivated, ambitious aspiring software engineer with a vocational background in application development. During my apprenticeship and my work at RUAG, I gained hands-on experience in software development, structured problem-solving, and collaborating in professional environments.\n\nI enjoy building applications, learning new technologies, and continuously improving my craft. I am reliable, detail-oriented, and eager to grow both personally and professionally. I am currently looking for opportunities as a Software Engineer or in IT Support.\n\nOutside of delivery work, I invest time in personal projects and experimentation — staying curious, organized, and focused on outcomes that matter to users and teams."
};
const EXPERTISE_AREAS = [
  {
    label: "Application engineering",
    icon: "⬡",
    description: "End-to-end thinking: requirements, implementation, and validation"
  },
  {
    label: "Web & interfaces",
    icon: "◈",
    description: "React, responsive layouts, and accessible UI patterns"
  },
  {
    label: "Quality & data",
    icon: "◎",
    description: "SQL fundamentals, debugging discipline, and structured testing"
  },
  {
    label: "Team delivery",
    icon: "◇",
    description: "Git workflows, code review habits, and clear communication"
  }
];
function GeometricAvatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-square max-w-[320px] mx-auto group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 rounded-3xl border border-primary/30 group-hover:border-primary/60 transition-colors duration-500",
        style: { transform: "rotate(6deg)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-2 rounded-2xl border border-primary/15 group-hover:border-primary/35 transition-colors duration-500",
        style: { transform: "rotate(3deg)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-3 rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: "100%",
          height: "100%",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          role: "presentation",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "pattern",
              {
                id: "grid",
                width: "32",
                height: "32",
                patternUnits: "userSpaceOnUse",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M 32 0 L 0 0 0 32",
                    fill: "none",
                    stroke: "oklch(var(--primary))",
                    strokeWidth: "0.5"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: {
            background: "radial-gradient(ellipse at 60% 40%, oklch(var(--primary) / 0.18) 0%, transparent 65%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "relative z-10 font-display text-6xl font-bold tracking-tighter text-gradient select-none",
          "aria-hidden": "true",
          children: initials
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-4 h-4 rounded-full bg-primary glow-primary translate-x-1 -translate-y-1" })
  ] });
}
function ExpertiseChip({
  label,
  icon,
  description,
  style
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "scroll-fade group flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4 hover:border-primary/40 hover:bg-card transition-all duration-300",
      style,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "mt-0.5 text-lg text-primary leading-none select-none flex-shrink-0",
            "aria-hidden": "true",
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground leading-tight", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: description })
        ] })
      ]
    }
  );
}
function AboutSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start",
      "data-ocid": "about.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square max-w-[320px] mx-auto w-full rounded-3xl bg-muted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5 bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mt-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl bg-muted" }, i)) })
        ] })
      ]
    }
  );
}
function AboutSection() {
  const { data: profile, isLoading } = useProfile();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.3
  });
  const { ref: avatarRef, isVisible: avatarVisible } = useScrollAnimation({
    threshold: 0.2
  });
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({
    threshold: 0.1
  });
  const displayProfile = profile ?? FALLBACK_PROFILE;
  const paragraphs = displayProfile.bio.split("\n").filter(Boolean);
  const chipStagger = useStaggeredAnimation(EXPERTISE_AREAS.length, 0.1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "about",
      ref: sectionRef,
      className: `py-24 bg-muted/20 scroll-fade ${sectionVisible ? "visible" : ""}`,
      "data-ocid": "about.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 max-w-6xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: headerRef,
            className: `mb-16 scroll-fade ${headerVisible ? "visible" : ""}`,
            "data-ocid": "about.header",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3", children: "01 / About" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground", children: "The engineer behind the commits" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px bg-primary transition-all duration-700 ease-out",
                    style: { width: headerVisible ? "80px" : "0px" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 w-1.5 rounded-full bg-primary transition-all duration-700 ease-out delay-300",
                    style: {
                      opacity: headerVisible ? 1 : 0,
                      transform: headerVisible ? "scale(1)" : "scale(0)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px bg-primary/30 flex-1 transition-all duration-700 ease-out delay-500",
                    style: { opacity: headerVisible ? 1 : 0 }
                  }
                )
              ] })
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: avatarRef,
              className: `scroll-fade ${avatarVisible ? "visible" : ""}`,
              style: { transitionDelay: "0.1s" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GeometricAvatar, { name: displayProfile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground tracking-tight", children: displayProfile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary mt-1 font-mono tracking-wide", children: displayProfile.title })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: textRef,
              className: `flex flex-col gap-6 scroll-fade ${textVisible ? "visible" : ""}`,
              style: { transitionDelay: "0.2s" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: paragraphs.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-muted-foreground leading-relaxed text-base",
                    children: para
                  },
                  para
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-4", children: "Focus areas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                      "data-ocid": "about.expertise.list",
                      children: EXPERTISE_AREAS.map((area, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `scroll-fade ${textVisible ? "visible" : ""}`,
                          style: chipStagger[i].style,
                          "data-ocid": `about.expertise.item.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ExpertiseChip,
                            {
                              label: area.label,
                              icon: area.icon,
                              description: area.description
                            }
                          )
                        },
                        area.label
                      ))
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME$1 = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a2;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a2 = props.onMouseDown) == null ? void 0 : _a2.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME$1;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function useContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ name, email, message }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.submitContact(name, email, message);
    }
  });
}
const EMAIL = "hello@gaetanosalonia.com";
const CV_URL = "/cv.pdf";
function ContactSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.08
  });
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
    name: touched.name && !form.name.trim() ? "Name is required" : null,
    email: touched.email && !form.email.trim() ? "Email is required" : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "Enter a valid email address" : null,
    message: touched.message && !form.message.trim() ? "Message is required" : null
  };
  const isFormValid = form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.trim();
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isFormValid) return;
    mutate(form);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "contact",
      ref,
      className: `scroll-fade ${isVisible ? "visible" : ""} py-24 px-6`,
      "data-ocid": "contact.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-mono text-sm tracking-widest uppercase mb-2 opacity-80", children: "Contact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold text-foreground", children: [
              "Let's ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "talk" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: CV_URL,
              download: true,
              className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-primary font-display font-medium text-sm hover:bg-primary/10 hover:border-primary/70 transition-smooth group shrink-0",
              "data-ocid": "contact.download_cv_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" }),
                "Download CV"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 px-8 rounded-2xl border border-primary/20 bg-card/50 text-center",
              "data-ocid": "contact.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Message sent!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Thanks! I'll get back to you soon." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              noValidate: true,
              className: "space-y-5",
              "data-ocid": "contact.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "contact-name",
                        className: "text-xs font-display tracking-wider uppercase text-muted-foreground",
                        children: "Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-name",
                        name: "name",
                        type: "text",
                        autoComplete: "name",
                        placeholder: "Your name",
                        value: form.name,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        className: "bg-card/60 border-border focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 h-11",
                        "data-ocid": "contact.name_input",
                        "aria-describedby": errors.name ? "contact-name-error" : void 0
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "contact-name-error",
                        className: "text-xs text-destructive mt-1",
                        "data-ocid": "contact.name.field_error",
                        children: errors.name
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "contact-email",
                        className: "text-xs font-display tracking-wider uppercase text-muted-foreground",
                        children: "Email"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-email",
                        name: "email",
                        type: "email",
                        autoComplete: "email",
                        placeholder: "you@example.com",
                        value: form.email,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        className: "bg-card/60 border-border focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 h-11",
                        "data-ocid": "contact.email_input",
                        "aria-describedby": errors.email ? "contact-email-error" : void 0
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "contact-email-error",
                        className: "text-xs text-destructive mt-1",
                        "data-ocid": "contact.email.field_error",
                        children: errors.email
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "contact-message",
                      className: "text-xs font-display tracking-wider uppercase text-muted-foreground",
                      children: "Message"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "contact-message",
                      name: "message",
                      placeholder: "Tell me about your project or opportunity…",
                      value: form.message,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      rows: 5,
                      className: "bg-card/60 border-border focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 resize-none",
                      "data-ocid": "contact.message_textarea",
                      "aria-describedby": errors.message ? "contact-message-error" : void 0
                    }
                  ),
                  errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      id: "contact-message-error",
                      className: "text-xs text-destructive mt-1",
                      "data-ocid": "contact.message.field_error",
                      children: errors.message
                    }
                  )
                ] }),
                isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3",
                    "data-ocid": "contact.error_state",
                    children: (error == null ? void 0 : error.message) ?? "Something went wrong. Please try again."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: isPending,
                    className: "w-full h-11 font-display font-semibold tracking-wide text-sm bg-primary text-primary-foreground hover:bg-primary/90 glow-primary transition-smooth",
                    "data-ocid": "contact.submit_button",
                    children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "flex items-center gap-2",
                        "data-ocid": "contact.loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" }),
                          "Sending…"
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                      "Send Message"
                    ] })
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display tracking-widest uppercase text-muted-foreground mb-3", children: "Or reach out directly" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `mailto:${EMAIL}`,
                  className: "group inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-200",
                  "data-ocid": "contact.email_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm", children: EMAIL })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display text-primary/80 tracking-wide", children: "Open to opportunities" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 pt-8 border-t border-border text-center text-muted-foreground text-xs font-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Gaetano Salonia · Switzerland"
        ] }) })
      ] })
    }
  );
}
const TIMELINE = [
  {
    icon: Building2,
    period: "Present",
    title: "RUAG",
    subtitle: "Technical / IT-related role · Switzerland",
    description: "Contributing in a professional engineering environment: collaborating on software-related work, following structured development practices, and strengthening problem-solving in real product contexts."
  },
  {
    icon: GraduationCap,
    period: "Apprenticeship",
    title: "Computer Science EFZ — Application Development",
    subtitle: "Vocational diploma (Informatiker EFZ)",
    description: "Comprehensive training in application development: requirements, implementation, testing, databases, and teamwork — with a strong foundation in software engineering principles and delivery discipline."
  }
];
function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });
  const stagger = useStaggeredAnimation(TIMELINE.length, 0.12);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "experience",
      ref,
      className: "py-24 bg-muted/15 border-t border-border/30",
      "data-ocid": "experience.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4", "aria-hidden": true }),
                "Switzerland"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold text-foreground leading-tight", children: [
                "Experience &",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Education" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-base max-w-2xl leading-relaxed", children: "A concise view of where I work, how I was trained, and the professional standards I bring to every task." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2", children: TIMELINE.map((item, i) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "article",
            {
              className: `rounded-2xl border border-border/60 bg-card/80 p-8 backdrop-blur-sm transition-all duration-700 hover:border-primary/35 hover:shadow-[0_20px_50px_oklch(var(--primary)/0.08)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
              style: stagger[i].style,
              "data-ocid": `experience.card.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6", "aria-hidden": true }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono uppercase tracking-widest text-primary/90", children: item.period }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground leading-snug", children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: item.subtitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/50", children: item.description })
                ] })
              ] })
            },
            item.title
          );
        }) })
      ] })
    }
  );
}
const NAME = "Gaetano Salonia";
const TITLE = "Software Engineer · Switzerland";
const LOCATION = "Based in Switzerland · RUAG · Open to Software Engineer & IT Support roles";
const VALUE_PROP = "I build reliable applications with clean architecture — from requirements to delivery — combining apprenticeship rigor with curiosity for modern web technology.";
function HeroSection() {
  const [mounted, setMounted] = reactExports.useState(false);
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    const particles = [];
    const PARTICLE_COUNT = 70;
    const CONNECTION_DIST = 160;
    const CYAN = "68% 0.12 200";
    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function init() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.15
        });
      }
    }
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(${CYAN} / ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(${CYAN} / ${p.opacity})`;
        ctx.fill();
      }
    }
    function tick() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      rafRef.current = requestAnimationFrame(tick);
    }
    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas.parentElement ?? canvas);
    resize();
    init();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);
  function scrollToProjects() {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
  function scrollDown() {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "hero",
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
      "data-ocid": "hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
            style: {
              backgroundImage: "url('/assets/generated/hero-mesh-bg.dim_1600x900.jpg')"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 70% 55% at 60% 45%, oklch(0.62 0.12 200 / 0.11) 0%, transparent 70%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "w-full h-full" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3",
              style: {
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                transitionDelay: "0.05s"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-8 bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono text-sm tracking-[0.2em] uppercase", children: TITLE })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-muted-foreground/90 font-mono text-xs sm:text-sm tracking-wide max-w-2xl",
              style: {
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                transitionDelay: "0.12s"
              },
              children: LOCATION
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight",
              style: {
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                transitionDelay: "0.18s"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: NAME })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed",
              style: {
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                transitionDelay: "0.34s"
              },
              children: VALUE_PROP
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-wrap items-center gap-4 pt-2",
              style: {
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                transitionDelay: "0.50s"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "lg",
                    onClick: scrollToProjects,
                    className: "font-display font-semibold tracking-wide px-8 py-6 text-base glow-primary transition-smooth hover:scale-[1.04] active:scale-[0.98]",
                    "data-ocid": "hero.primary_button",
                    children: "View selected work"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "lg",
                    asChild: true,
                    className: "font-display font-semibold tracking-wide px-8 py-6 text-base border-border hover:border-primary hover:text-primary transition-smooth hover:scale-[1.04] active:scale-[0.98]",
                    "data-ocid": "hero.secondary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/cv.pdf", download: true, "aria-label": "Download CV as PDF", children: "Download CV" })
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: scrollDown,
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth group",
            "aria-label": "Scroll down",
            "data-ocid": "hero.scroll_indicator",
            style: {
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.7s ease-out",
              transitionDelay: "0.8s"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono tracking-[0.15em] uppercase opacity-60 group-hover:opacity-100 transition-smooth", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: "animate-bounce w-5 h-5 opacity-60 group-hover:opacity-100",
                  strokeWidth: 1.5
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function ProjectCard({
  project,
  index,
  isVisible,
  animStyle
}) {
  const overlayStyles = [
    {
      backgroundImage: "linear-gradient(135deg, oklch(var(--primary) / 0.45) 0%, oklch(var(--background) / 0.7) 100%)"
    },
    {
      backgroundImage: "linear-gradient(135deg, oklch(0.38 0.14 260 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)"
    },
    {
      backgroundImage: "linear-gradient(135deg, oklch(0.35 0.16 290 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)"
    },
    {
      backgroundImage: "linear-gradient(135deg, oklch(0.32 0.14 160 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)"
    },
    {
      backgroundImage: "linear-gradient(135deg, oklch(0.35 0.12 230 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)"
    },
    {
      backgroundImage: "linear-gradient(135deg, oklch(0.32 0.12 150 / 0.65) 0%, oklch(var(--background) / 0.7) 100%)"
    }
  ];
  const overlayStyle = overlayStyles[index % overlayStyles.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "scroll-fade group",
      style: animStyle,
      "data-ocid": `projects.item.${index + 1}`,
      "data-visible": isVisible ? "true" : void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border bg-card h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_oklch(var(--primary)/0.18)] hover:border-accent-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden", children: [
          project.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: project.imageUrl,
              alt: project.title,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/project-default-bg.dim_800x450.jpg",
                alt: project.title,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-70",
                style: overlayStyle
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "bg-background/80 text-foreground backdrop-blur-sm text-xs font-mono border-border/60",
              children: project.category
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300", children: project.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1", children: project.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 pt-1", children: [
            project.techStack.slice(0, 5).map((tech) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50",
                children: tech
              },
              tech
            )),
            project.techStack.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50", children: [
              "+",
              project.techStack.length - 5
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2 border-t border-border/40 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/projects/$id",
                params: { id: project.id.toString() },
                className: "flex-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "w-full justify-between text-primary hover:bg-primary/10 hover:text-primary font-display font-medium",
                    "data-ocid": `projects.view_details.${index + 1}`,
                    children: [
                      "View Details",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1" })
                    ]
                  }
                )
              }
            ),
            project.githubUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.githubUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "GitHub repository",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "px-2 text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" })
                  }
                )
              }
            ),
            project.liveUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.liveUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Live demo",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "px-2 text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" })
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function ProjectCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-1", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded" }, i)) })
    ] })
  ] });
}
function useApplyVisibleClass(ref, isVisible) {
  reactExports.useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".scroll-fade");
    if (isVisible) {
      for (const el of items) {
        el.classList.add("visible");
      }
    }
  }, [ref, isVisible]);
}
function ProjectsSection() {
  const { data: backendProjects, isLoading } = useFeaturedProjects();
  const projects = backendProjects && backendProjects.length > 0 ? backendProjects : SAMPLE_PROJECTS;
  const displayedProjects = projects.slice(0, 3);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.05
  });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({
    threshold: 0.05
  });
  const staggered = useStaggeredAnimation(displayedProjects.length, 0.1);
  useApplyVisibleClass(
    gridRef,
    gridVisible
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "projects",
      className: "py-24 bg-muted/10 border-y border-border/30",
      "data-ocid": "projects.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: sectionRef,
            className: `mb-14 scroll-fade ${sectionVisible ? "visible" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-12 bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono text-sm tracking-widest uppercase", children: "Selected work" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4", children: [
                "Projects & ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "case studies" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl leading-relaxed", children: "Representative builds from apprenticeship, work, and personal practice — web apps, tooling, and interfaces that emphasize clear engineering and measurable outcomes." })
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            "data-ocid": "projects.loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCardSkeleton, {}, i))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: gridRef,
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            "data-ocid": "projects.list",
            children: displayedProjects.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProjectCard,
              {
                project,
                index: i,
                isVisible: gridVisible,
                animStyle: staggered[i].style
              },
              project.id.toString()
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a2;
              return (_a2 = document.getElementById("projects")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
            },
            className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-display text-sm tracking-wide group",
            "data-ocid": "projects.view_all_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View projects" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" })
            ]
          }
        ) })
      ] })
    }
  );
}
const SKILL_CATEGORIES = [
  {
    label: "Programming languages",
    accentClass: "accent-cyan",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Python" },
      { name: "C#" }
    ]
  },
  {
    label: "Frameworks & libraries",
    accentClass: "accent-violet",
    skills: [{ name: "React.js" }, { name: "Tailwind CSS" }, { name: "Vite" }]
  },
  {
    label: "Tools & technologies",
    accentClass: "accent-emerald",
    skills: [
      { name: "Git & GitHub" },
      { name: "VS Code" },
      { name: "REST APIs" },
      { name: "SQL" },
      { name: "Responsive design" },
      { name: "Debugging & testing" }
    ]
  },
  {
    label: "Professional skills",
    accentClass: "accent-amber",
    skills: [
      { name: "Problem-solving" },
      { name: "Analytical thinking" },
      { name: "Teamwork" },
      { name: "Fast learner" },
      { name: "Structured delivery" }
    ]
  },
  {
    label: "Languages",
    accentClass: "accent-rose",
    skills: [
      { name: "German (fluent)" },
      { name: "Italian (fluent)" },
      { name: "English (good)" }
    ]
  }
];
const ACCENT_DEFS = {
  "accent-cyan": { hue: 200, chroma: 0.13 },
  "accent-violet": { hue: 265, chroma: 0.14 },
  "accent-emerald": { hue: 165, chroma: 0.12 },
  "accent-amber": { hue: 78, chroma: 0.14 },
  "accent-rose": { hue: 18, chroma: 0.12 }
};
function SkillBadge({ skill, accentClass, style, visible }) {
  const def = ACCENT_DEFS[accentClass] ?? { hue: 200, chroma: 0.13 };
  const color = `oklch(0.75 ${def.chroma} ${def.hue})`;
  const borderColor = `oklch(0.72 ${def.chroma} ${def.hue} / 0.35)`;
  const bgColor = `oklch(0.72 ${def.chroma} ${def.hue} / 0.07)`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      style: {
        ...style,
        borderColor,
        backgroundColor: bgColor,
        color
      },
      className: [
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
        "border transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full shrink-0",
            style: { backgroundColor: color }
          }
        ),
        skill.name
      ]
    }
  );
}
function CategoryCard({
  category,
  sectionVisible,
  categoryIndex
}) {
  const delays = useStaggeredAnimation(category.skills.length, 0.06);
  const def = ACCENT_DEFS[category.accentClass] ?? {
    hue: 200,
    chroma: 0.13
  };
  const dotColor = `oklch(0.72 ${def.chroma} ${def.hue})`;
  const cardDelay = categoryIndex * 0.1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [
        "rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm",
        "transition-all duration-700",
        sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      ].join(" "),
      style: { transitionDelay: `${cardDelay}s` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-2 h-2 rounded-full shrink-0",
              style: { backgroundColor: dotColor }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground", children: category.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap gap-2",
            "data-ocid": `skills.${category.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.list`,
            children: category.skills.map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SkillBadge,
              {
                skill,
                accentClass: category.accentClass,
                style: {
                  ...delays[i].style,
                  transitionDelay: sectionVisible ? `${cardDelay + 0.12 + i * 0.06}s` : "0s"
                },
                visible: sectionVisible
              },
              skill.name
            ))
          }
        )
      ]
    }
  );
}
function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "skills",
      className: "py-24 bg-muted/10 border-t border-border/30",
      "data-ocid": "skills.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8", ref, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: [
              "mb-14 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 font-display", children: "Technical profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold text-foreground leading-tight", children: [
                "Skills &",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-transparent bg-clip-text",
                    style: {
                      backgroundImage: "linear-gradient(90deg, oklch(var(--accent)) 0%, oklch(0.58 0.14 200) 100%)"
                    },
                    children: "strengths"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-base max-w-xl leading-relaxed", children: "A practical toolkit shaped by vocational training, workplace delivery at RUAG, and continuous learning through personal projects." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
            "data-ocid": "skills.categories.list",
            children: SKILL_CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryCard,
              {
                category: cat,
                sectionVisible: isVisible,
                categoryIndex: i
              },
              cat.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: [
              "mt-12 flex items-center gap-4 transition-all duration-700 delay-500",
              isVisible ? "opacity-100" : "opacity-0"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-display tracking-widest uppercase", children: "Always learning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border/30" })
            ]
          }
        )
      ] })
    }
  );
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContactSection, {})
  ] });
}
export {
  Home as default
};
