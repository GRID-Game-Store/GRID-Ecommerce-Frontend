import React from "react";
/* eslint-disable no-unused-vars */

export interface IFadeProps {
    isShowMenu: boolean;
    setShowMenu: (state: boolean) => void;
  }
export interface IMenuProps {
    setShowMenu: (state: boolean) => void;
    style: React.CSSProperties;
  }
export interface IMenuItemsProps {
    setShowMenu: (state: boolean) => void;
  }