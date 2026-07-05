"use client";

import { useState } from "react";
import { createStudentRequest } from "@/lib/api";
import { StudentRequestPayload } from "@/types/models";

type SubmitState =
  | { status: "idle"; message?: string }
  | { status: "loading"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function useResourceRequest() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const submit = async (payload: StudentRequestPayload) => {
    try {
      setState({ status: "loading" });
      const response = await createStudentRequest(payload);
      setState({
        status: "success",
        message: response.message ?? "Your request has been submitted successfully.",
      });
      return true;
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not submit your request. Please try again.",
      });
      return false;
    }
  };

  return { state, submit };
}
