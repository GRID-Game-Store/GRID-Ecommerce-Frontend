import { useEffect } from "react";

export const useBeforeunload = (visible : boolean) => {
  const handleTabClosing = () => {};

  const alertUser = (event: any) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    if (visible) {
      window.addEventListener("beforeunload", alertUser);
      window.addEventListener("unload", handleTabClosing);
      return () => {
        window.removeEventListener("beforeunload", alertUser);
        window.removeEventListener("unload", handleTabClosing);
      };
    }
  }, [visible]);
};
