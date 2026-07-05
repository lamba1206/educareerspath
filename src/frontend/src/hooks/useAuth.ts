import type { UserRole } from "@/backend";
import { useUserProfile } from "@/hooks/useQueries";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  identity: ReturnType<typeof useInternetIdentity>["identity"];
  profile: import("@/backend").UserProfile | null;
  role: UserRole | null;
  hasPassport: boolean;
  isLoadingProfile: boolean;
  login: () => void;
  logout: () => void;
}

/**
 * Top-level auth hook. Combines Internet Identity session state with the
 * backend `UserProfile` (role, passport, email verification) so pages can
 * branch on a single source of truth.
 */
export function useAuth(): AuthState {
  const { identity, isAuthenticated, isInitializing, login, clear } =
    useInternetIdentity();
  const profileQuery = useUserProfile();

  const profile = profileQuery.data ?? null;
  const role = profile?.role ?? null;
  const hasPassport = profile?.passportPurchased ?? false;

  return {
    isAuthenticated,
    isInitializing,
    identity,
    profile,
    role,
    hasPassport,
    isLoadingProfile: profileQuery.isLoading,
    login,
    logout: clear,
  };
}

/**
 * Redirect unauthenticated visitors to /sign-in. Returns the auth state so
 * callers can also read profile/role without a second hook call.
 */
export function useRequireAuth(): AuthState {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isInitializing && !auth.isAuthenticated) {
      navigate({ to: "/sign-in" });
    }
  }, [auth.isInitializing, auth.isAuthenticated, navigate]);

  return auth;
}

/**
 * Redirect non-admin authenticated users back to the dashboard.
 */
export function useRequireAdmin(): AuthState {
  const auth = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && auth.role && auth.role !== "admin") {
      navigate({ to: "/dashboard" });
    }
  }, [auth.isAuthenticated, auth.role, navigate]);

  return auth;
}

export interface PassportGateState extends AuthState {
  /** True when the user is signed in, profile loaded, and has no passport. */
  locked: boolean;
}

/**
 * Gate Career Library and Student Dashboard behind the Career Passport.
 * Does NOT redirect — returns a `locked` flag so callers can render a
 * `LockedOverlay` instead of bouncing the user away from the page.
 */
export function useRequirePassport(): PassportGateState {
  const auth = useRequireAuth();

  const locked =
    auth.isAuthenticated &&
    !auth.isLoadingProfile &&
    !!auth.profile &&
    !auth.hasPassport;

  return { ...auth, locked };
}
