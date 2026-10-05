"use client";

import {
  Children,
  createContext,
  Fragment,
  cloneElement,
  isValidElement,
  useContext,
  useLayoutEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

const AnimateOnceContext = createContext(true);
let hasAnimatedHero = false;
const HERO_ANIMATION_STORAGE_KEY = "portfolio:hero-text-animated";

export function TextAnimateOnce({ children }: { children: ReactNode }) {
  // Keep the server and first client render identical. If this session has
  // already played the hero, disable it on the next frame after hydration.
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useLayoutEffect(() => {
    let hasPlayed = hasAnimatedHero;

    try {
      hasPlayed ||= Boolean(
        window.sessionStorage.getItem(HERO_ANIMATION_STORAGE_KEY),
      );
    } catch {
      // The in-memory flag still covers client-side case navigation.
    }

    hasAnimatedHero = true;

    try {
      window.sessionStorage.setItem(HERO_ANIMATION_STORAGE_KEY, "true");
    } catch {
      // The in-memory flag still covers client-side case navigation.
    }

    if (!hasPlayed) return;

    const raf = requestAnimationFrame(() => setShouldAnimate(false));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimateOnceContext.Provider value={shouldAnimate}>
      {children}
    </AnimateOnceContext.Provider>
  );
}

type TextAnimateProps = Omit<ComponentPropsWithoutRef<"p">, "children"> & {
  children: ReactNode;
  animation?: "blurInUp";
  as?: ElementType;
  by?: "character";
  delay?: number;
  duration?: number;
  once?: boolean;
  stagger?: number;
};

export function TextAnimate({
  children,
  animation = "blurInUp",
  as: Component = "p",
  by = "character",
  delay = 0,
  duration = 0.6,
  once = false,
  stagger = 0.025,
  ...props
}: TextAnimateProps) {
  const shouldAnimateOnce = useContext(AnimateOnceContext);
  const shouldAnimate = !once || shouldAnimateOnce;
  let segmentIndex = 0;

  // These props intentionally mirror the Magic UI call site used in the hero.
  void animation;
  void by;

  function animatedSegment(content: ReactNode, key: string) {
    const index = segmentIndex++;

    return (
      <span
        className={
          shouldAnimate
            ? "text-animate-segment inline-block"
            : "inline-block"
        }
        style={
          shouldAnimate
            ? {
                animationDelay: `${delay + index * stagger}s`,
                animationDuration: `${duration}s`,
              }
            : undefined
        }
        key={key}
      >
        {content}
      </span>
    );
  }

  function animatedString(value: string, path: string) {
    const tokens = value.split(/(\s+)/);

    return (
      <Fragment key={path}>
        <span className="sr-only">{value}</span>
        <span aria-hidden="true">
          {tokens.map((token, tokenIndex) =>
            /\s+/.test(token) ? (
              token
            ) : (
              <span className="inline-block" key={`${path}-word-${tokenIndex}`}>
                {Array.from(token).map((character, characterIndex) =>
                  animatedSegment(
                    character,
                    `${path}-${tokenIndex}-${characterIndex}`,
                  ),
                )}
              </span>
            ),
          )}
        </span>
      </Fragment>
    );
  }

  function animateNode(node: ReactNode, path: string): ReactNode {
    if (typeof node === "string" || typeof node === "number") {
      return animatedString(String(node), path);
    }

    if (!isValidElement<{ children?: ReactNode }>(node)) return node;

    if (node.type === Fragment || typeof node.type === "string") {
      return cloneElement(
        node,
        undefined,
        Children.map(node.props.children, (child, index) =>
          animateNode(child, `${path}-${index}`),
        ),
      );
    }

    return animatedSegment(node, `${path}-component`);
  }

  return (
    <Component {...props}>
      {Children.map(children, (child, index) => animateNode(child, `${index}`))}
    </Component>
  );
}
