"use client";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";


function Hydrate(props: any) {
	return <HydrationBoundary {...props} />;
}

export default Hydrate;