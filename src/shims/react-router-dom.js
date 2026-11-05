"use client";
// Minimal react-router-dom compatibility layer on top of next/navigation,
// so existing screens keep working unchanged.
import NextLink from "next/link";
import {
  usePathname,
  useRouter,
  useParams as useNextParams,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { forwardRef, useCallback } from "react";

// navigate(to, { state }) -> Next has no history state, so keep it in a tiny store.
let navState = null;
let navKey = "default";
const listeners = new Set();
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getKey = () => navKey;
const emit = () => listeners.forEach((l) => l());

export const Link = forwardRef(function Link({ to, href, replace, state, ...rest }, ref) {
  const target = to ?? href ?? "#";
  return <NextLink ref={ref} href={target} replace={replace} {...rest} />;
});

export function useNavigate() {
  const router = useRouter();
  const pathname = usePathname();
  return useCallback(
    (to, opts = {}) => {
      if (typeof to === "number") {
        if (to < 0) router.back();
        else router.forward();
        return;
      }
      let target = to;
      // react-router resolves relative paths against the current route
      if (typeof target === "string" && !/^([a-z]+:|\/|\?|#)/i.test(target)) {
        target = `${pathname.replace(/\/$/, "")}/${target}`;
      }
      navState = opts.state ?? null;
      navKey = String(Date.now());
      emit();
      if (opts.replace) router.replace(target);
      else router.push(target);
    },
    [router, pathname]
  );
}

export function useLocation() {
  const pathname = usePathname();
  const key = useSyncExternalStore(subscribe, getKey, () => "default");
  const search =
    typeof window !== "undefined" ? window.location.search : "";
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  return { pathname, search, hash, state: navState, key };
}

export const useParams = useNextParams;

export function useSearchParams() {
  return [useNextSearchParams(), () => {}];
}

export function Navigate({ to, replace }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [router, to, replace]);
  return null;
}
