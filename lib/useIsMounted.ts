import { useEffect, useRef } from "react";

/**
 * Custom hook to determine if the component is mounted.
 *
 * @returns A boolean indicating whether the component is mounted.
 */
const useIsMounted = (): boolean => {
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef.current;
};

export default useIsMounted;
