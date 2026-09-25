"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Children,
  createContext,
  Fragment,
  cloneElement,
  isValidElement,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

const AnimateOnceContext = createContext(true);
let hasAnimatedHero = false;
const HERO_ANIMATION_STORAGE_KEY = "portfolio:hero-text-animated";

function subscribeToHeroAnimation() {
  return () => undefined;
}

function getHeroAnimationSnapshot() {
  if (hasAnimatedHero) return false;

  try {
    return !window.sessionStorage.getItem(HERO_ANIMATION_STORAGE_KEY);
  } catch {
    return true;
  }
}

function getHeroAnimationServerSnapshot() {
  return true;
}

export function TextAnimateOnce({ children }: { children: ReactNode }) {
  const shouldAnimate = useSyncExternalStore(
    subscribeToHeroAnimation,
    getHeroAnimationSnapshot,
    getHeroAnimationServerSnapshot,
  );

  useLayoutEffect(() => {
    hasAnimatedHero = true;

    try {
      window.sessionStorage.setItem(HERO_ANIMATION_STORAGE_KEY, "true");
    } catch {
      // The in-memory flag still covers client-side case navigation.
    }
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
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimateOnce = useContext(AnimateOnceContext);
  const shouldAnimate = !prefersReducedMotion && (!once || shouldAnimateOnce);
  let segmentIndex = 0;

  // These props intentionally mirror the Magic UI call site used in the hero.
  void animation;
  void by;

  function animatedSegment(content: ReactNode, key: string) {
    const index = segmentIndex++;

    return (
      <motion.span
        className="inline-block"
        initial={
          !shouldAnimate
            ? false
            : { opacity: 0, y: 8, filter: "blur(6px)" }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: delay + index * stagger,
          duration: shouldAnimate ? duration : 0,
          ease: [0.23, 1, 0.32, 1],
        }}
        key={key}
      >
        {content}
      </motion.span>
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
