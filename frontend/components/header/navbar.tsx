import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

function Navbar() {
  const flexStyle: React.CSSProperties = {
    padding: "1.5em 0.5em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    boxSizing: "border-box",
  };

  const boxStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const textStyle: React.CSSProperties = {
    marginLeft: "1em",
    fontSize: "1.25em",
    fontWeight: "bold",
  };

  const linkContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: "4em",
  };

  const linkStyle: React.CSSProperties = {
    marginRight: "0.5em",
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <div style={flexStyle}>
      {/* ロゴ */}
      <div style={boxStyle}>
        <img src="logo.png" alt="Logo" width={50} height={50} />
        <span style={textStyle}>Nudibranch</span>
      </div>

      {/* リンク */}
      <div style={linkContainerStyle}>
        <NextLink href="/landing" passHref legacyBehavior>
          <a style={linkStyle}>Demo</a>
        </NextLink>
        <NextLink href="/evaluate-1" passHref legacyBehavior>
          <a style={linkStyle}>Evaluate</a>
        </NextLink>
        <NextLink href="/synthesis-1" passHref legacyBehavior>
          <a style={linkStyle}>Synthesis</a>
        </NextLink>
        
      </div>

      {/* Connectボタン */}
      <ConnectButton />
    </div>
  );
}

export default Navbar;
